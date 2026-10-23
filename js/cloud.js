(function(){
'use strict';
const cfg=window.CETPRO_CONFIG||{};
const url=String(cfg.supabaseUrl||'').trim();
const key=String(cfg.supabasePublishableKey||'').trim();
const configured=/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(url) && (/^sb_publishable_[a-zA-Z0-9_-]+$/.test(key)||/^eyJ[a-zA-Z0-9_.-]+$/.test(key));
const client=configured && window.supabase?.createClient(url,key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});
const PUBLIC=['settings','programs','news','gallery','documents','jobs','staffYears','teachers','directors','historyGallery','achievements','partners','offers','projects','calendarEvents','alumni','faqs','tours'];
const state={configured,ready:false,error:'',data:null,enrollments:[],messages:[],client};
function check(result){if(result.error)throw new Error(result.error.message||'Error al consultar Supabase');return result.data;}
function publicOnly(v){return Object.fromEntries(PUBLIC.map(k=>[k,v[k]]).filter(([,v])=>v!==undefined));}
async function loadPublic(){
 if(!client)throw Error('Configura Supabase en js/config.js para activar las funciones reales.');
 const doc=check(await client.from('site_content').select('content').eq('id','main').single());
 if(!doc||!doc.content||typeof doc.content!=='object')throw Error('Falta la fila main en site_content. Ejecuta database/supabase.sql.');
 state.data=doc.content;state.ready=true;state.error='';return state.data;
}
async function saveContent(next){
 if(!state.ready)throw Error('La conexión a Supabase no está lista.');
 const payload=publicOnly(next);
 const changed=check(await client.from('site_content').update({content:payload,updated_at:new Date().toISOString()}).eq('id','main').select('id'));
 if(!Array.isArray(changed)||changed.length!==1)throw Error('No se guardó el contenido: verifica que tu usuario tenga permisos de administrador.');
 state.data=structuredClone(payload);
 return true;
}
async function isAdmin(){
 if(!client)return false;
 const {data,error}=await client.auth.getUser();if(error||!data.user)return false;
 const record=check(await client.from('admin_users').select('user_id').eq('user_id',data.user.id).maybeSingle());
 return Boolean(record);
}
async function loadPrivate(){
 if(!await isAdmin())throw Error('Tu usuario no está autorizado como administrador.');
 const [en,ms]=await Promise.all([client.from('enrollments').select('*').order('created_at',{ascending:false}).limit(1000),client.from('contact_messages').select('*').order('created_at',{ascending:false}).limit(1000)]);
 state.enrollments=check(en).map(x=>({...x,programId:x.program_id,createdAt:x.created_at}));
 state.messages=check(ms).map(x=>({...x,createdAt:x.created_at}));
 return true;
}
async function submitEnrollment(input){
 if(!state.ready)throw Error('El sistema de inscripción no está disponible.');
 const {full_name,dni,phone,email,programId,notes,cycle,consent}=input;
 check(await client.rpc('submit_cetpro_enrollment',{p_full_name:full_name,p_dni:dni,p_phone:phone,p_email:email,p_program_id:programId,p_notes:notes,p_cycle:cycle,p_privacy_consent:consent}));
 return true;
}
async function sendMessage(input){
 if(!state.ready)throw Error('El formulario de contacto no está disponible.');
 check(await client.from('contact_messages').insert(input));return true;
}
async function status(id,status){check(await client.from('enrollments').update({status}).eq('id',id));await loadPrivate()}
async function deleteEnrollment(id){check(await client.from('enrollments').delete().eq('id',id));await loadPrivate()}
async function markRead(id){check(await client.from('contact_messages').update({read:true}).eq('id',id));await loadPrivate()}
async function deleteMessage(id){check(await client.from('contact_messages').delete().eq('id',id));await loadPrivate()}
async function uploadFile(file,type){
 if(!await isAdmin())throw Error('Acceso administrativo no autorizado.');
 const mime=type==='pdf'?'application/pdf':file.type;
 if(type==='pdf'&&mime!=='application/pdf')throw Error('Archivo PDF no válido.');
 if(type!=='pdf'&&!['image/jpeg','image/png','image/webp'].includes(mime))throw Error('Formato de imagen no permitido.');
 if(file.size>5*1024*1024)throw Error('Archivo demasiado grande (máximo 5 MB).');
 const ext=type==='pdf'?'pdf':{'image/jpeg':'jpg','image/png':'png','image/webp':'webp'}[mime];
 const path='publicados/'+crypto.randomUUID()+'.'+ext;
 check(await client.storage.from('cetpro-public').upload(path,file,{contentType:mime,upsert:false}));
 const {data}=client.storage.from('cetpro-public').getPublicUrl(path);
 return data.publicUrl;
}
async function uploadDataURL(dataURL,type){
 const m=/^data:([^;]+);base64,(.+)$/s.exec(dataURL);
 if(!m)throw Error('Imagen o PDF no válido.');
 const raw=atob(m[2]),buf=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)buf[i]=raw.charCodeAt(i);
 return uploadFile(new Blob([buf],{type:m[1]}),type);
}
Object.assign(state,{loadPublic,saveContent,isAdmin,loadPrivate,submitEnrollment,sendMessage,status,deleteEnrollment,markRead,deleteMessage,uploadFile,uploadDataURL,publicOnly});
window.CETPRO_CLOUD=state;
})();
