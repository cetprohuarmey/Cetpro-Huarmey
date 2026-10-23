(function(){
'use strict';
let permitted=false;
const cloud=window.CETPRO_CLOUD;
async function restore(){
 try{permitted=await cloud.isAdmin();if(permitted)await cloud.loadPrivate(true);return permitted}
 catch(err){console.error('No se pudo verificar el usuario administrador:',err);permitted=false;return false}
}
function sessionValid(){return permitted}
async function signIn(email,password){
 if(!cloud.ready)throw Error('Conexión a la base de datos no disponible.');
 const result=await cloud.client.auth.signInWithPassword({email:String(email).trim(),password:String(password)});
 if(result.error)throw Error('Correo electrónico o contraseña incorrectos.');
 permitted=await cloud.isAdmin();
 if(!permitted){await cloud.client.auth.signOut();return false;}
 await cloud.loadPrivate(true);return true;
}
async function signOut(){permitted=false;cloud.enrollments=[];cloud.messages=[];await cloud.client?.auth.signOut()}
async function updatePassword(current,next,repeat){
 if(!permitted)throw Error('Acceso no autorizado');
 const {data,error}=await cloud.client.auth.getUser();if(error||!data.user?.email)throw Error('Sesión vencida.');
 const confirmation=await cloud.client.auth.signInWithPassword({email:data.user.email,password:current});
 if(confirmation.error)throw Error('La contraseña actual es incorrecta.');
 if(next.length<12||next.length>128||!/[A-Z]/.test(next)||!/[a-z]/.test(next)||!/[0-9]/.test(next)||!/[^A-Za-z0-9]/.test(next))throw Error('Usa entre 12 y 128 caracteres, mayúsculas, minúsculas, números y símbolos.');
 if(next!==repeat)throw Error('Las contraseñas nuevas no coinciden.');
 if(current===next)throw Error('La nueva contraseña debe ser distinta.');
 const updated=await cloud.client.auth.updateUser({password:next});if(updated.error)throw Error(updated.error.message);
 return true;
}
window.CETPRO_AUTH={restore,sessionValid,signIn,signOut,updatePassword,ACCOUNT_KEY:null};
})();
