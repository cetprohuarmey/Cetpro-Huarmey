(function(){
'use strict';
const KEY = 'cetpro_erz_huarmey_bs5_v3';
const PREVIOUS_KEY = 'cetpro_erz_huarmey_bs5_v2';
const assets = 'assets/img/';
const defaults = {
  settings: {
    institution:'Ernesto Reyna Zegarra', location:'Huarmey, Áncash', tagline:'Educación que transforma tu futuro',
    heroTitle:'Tu talento tiene futuro.', heroAccent:'¡Aprende y transforma tu vida!',
    heroText:'Descubre nuevas habilidades, desarrolla tu talento y prepárate para emprender o integrarte al mundo laboral con formación práctica.',
    aboutTitle:'Formamos talento que transforma su comunidad',
    aboutText:'Somos una institución de educación técnico-productiva orientada al desarrollo de capacidades prácticas, el emprendimiento y las oportunidades de crecimiento en Huarmey.',
    mission:'Brindar formación técnico-productiva práctica y pertinente, contribuyendo al desarrollo de habilidades para el trabajo y el emprendimiento.',
    vision:'Ser un centro referente de formación técnica que impulse oportunidades de desarrollo en nuestra comunidad.',
    phone:'', email:'', address:'Huarmey, Áncash, Perú', facebook:'',
    announcement:'Bienvenidos al CETPRO Ernesto Reyna Zegarra · Huarmey 2026',
    popup:{enabled:false,eyebrow:'EVENTO DE EJEMPLO · EDITABLE',title:'¡Expo Talento CETPRO 2026!',body:'Presentación de demostración: talleres, creatividad y formación para el futuro. El administrador puede reemplazar este anuncio por una actividad real con su afiche y fechas oficiales.',image:'afiche-demo-expo-cetpro.svg',button:'Conocer especialidades',destination:'#programas',start:'',end:'',oncePerSession:true},
    enrollmentOpen:false, enrollmentCycle:'Convocatoria 2026', enrollmentInfo:'Completa la solicitud de inscripción cuando se habilite la convocatoria. El CETPRO verificará la información y confirmará los siguientes pasos.',
    heroImage:'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=950&q=80', aboutImage:'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=950&q=80', logo:'logo-cetpro.png',
    footerText:'Formación técnico-productiva para avanzar, aprender y emprender.',
    whatsapp:{enabled:false,number:'',greeting:'Hola, deseo información sobre las especialidades y matrículas del CETPRO.',label:'¿Necesitas orientación?'},
    admission:{requirements:'Los requisitos de matrícula serán publicados y confirmados por la institución.',notes:'Los horarios, turnos y vacantes están sujetos a confirmación institucional.'},
    community:{activeYear:2026,history:'Nuestra historia se construye a través de la enseñanza técnico-productiva, el compromiso de nuestra comunidad educativa y el aprendizaje práctico en Huarmey. Actualiza aquí las reseñas y fechas institucionales verificadas.',values:'Compromiso · Respeto · Responsabilidad · Creatividad · Trabajo en equipo',staffIntro:'Conoce a las personas que acompañan la formación de nuestros estudiantes en cada especialidad.',workshopsIntro:'Espacios para aprender haciendo: Electricidad, Industria del Vestido, Carpintería y Soldadura.',galleryIntro:'Recuerdos institucionales organizados por año académico. Publica fotografías oficiales con autorización.'},
    pageText:{
      'Nosotros':{title:'Conoce nuestro CETPRO',desc:'Educación técnica con vocación, compromiso y mirada al futuro.'},
      'Programas':{title:'Tu talento tiene muchas posibilidades',desc:'Descubre las especialidades disponibles en nuestro portal.'},
      'Matrícula':{title:'Da el siguiente paso',desc:'Información de postulación para las próximas oportunidades de formación.'},
      'Noticias':{title:'Noticias y avisos',desc:'Actividades, anuncios y novedades del CETPRO.'},
      'Galería':{title:'Momentos para compartir',desc:'Un espacio visual para mostrar actividades y formación.'},
      'Documentos':{title:'Documentos institucionales',desc:'Información y archivos que el administrador decida publicar.'},
      'Bolsa de trabajo':{title:'Oportunidades laborales',desc:'Convocatorias verificadas y comunicados que publique el CETPRO.'},
      'Contacto':{title:'Estamos para orientarte',desc:'Escríbenos para conocer más sobre formación y matrícula.'},
      'Privacidad':{title:'Privacidad de datos',desc:'Protección de datos y derechos de los usuarios.'}
    }
  },
  programs:[
    {id:'p3',title:'Electricidad',category:'Instalaciones y mantenimiento',description:'Aprende instalaciones eléctricas, circuitos básicos, uso de herramientas y medidas de seguridad en el trabajo.',schedule:'Consultar horario vigente',skills:'Instalaciones eléctricas domiciliarias\nCircuitos y conexiones\nMantenimiento preventivo\nSeguridad eléctrica',image:'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=950&q=80',active:true},
    {id:'p4',title:'Industria del Vestido',category:'Confección textil',description:'Desarrolla habilidades de corte, patronaje, manejo de máquinas de coser y confección de prendas.',schedule:'Consultar horario vigente',skills:'Patronaje\nCorte y confección\nManejo de máquinas\nAcabados textiles',image:'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=950&q=80',active:true},
    {id:'p2',title:'Carpintería',category:'Trabajos en madera',description:'Domina medición, trazado, corte, armado y acabado de muebles y otros trabajos en madera.',schedule:'Consultar horario vigente',skills:'Medición y trazado\nUso seguro de herramientas\nCorte y ensamblaje\nAcabados en madera',image:'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=950&q=80',active:true},
    {id:'p1',title:'Soldadura',category:'Construcciones metálicas',description:'Aprende técnicas básicas de soldadura, seguridad en el taller y elaboración de estructuras metálicas.',schedule:'Consultar horario vigente',skills:'Seguridad en soldadura\nPreparación de materiales\nUniones metálicas\nFabricación de estructuras',image:'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=950&q=80',active:true}
  ],
  news:[
    {id:'n1',title:'Descubre nuestras especialidades técnico-productivas',category:'Institucional',body:'Conoce nuestras especialidades: Electricidad, Industria del Vestido, Carpintería y Soldadura. Las vacantes y horarios deben confirmarse directamente con la institución.',date:'2026-10-01',image:'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=950&q=80',published:false},
    {id:'n2',title:'Aprender haciendo: construimos oportunidades',category:'Comunidad',body:'La formación técnico-productiva promueve el trabajo práctico, la creatividad, la innovación y el emprendimiento en nuestra comunidad.',date:'2026-09-25',image:'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=950&q=80',published:false},
    {id:'n3',title:'Talento, práctica y creatividad',category:'Educación',body:'Conoce cómo las habilidades técnicas pueden abrir puertas a nuevas oportunidades de trabajo y emprendimiento.',date:'2026-09-12',image:'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=960&q=80',published:false}
  ],
  gallery:[
    {id:'g3',title:'Electricidad',description:'Fotografía ilustrativa de instalaciones eléctricas; no es una imagen oficial del CETPRO.',image:'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1100&q=83',published:true},
    {id:'g4',title:'Industria del Vestido',description:'Fotografía ilustrativa de confección de prendas; no es una imagen oficial del CETPRO.',image:'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1100&q=83',published:true},
    {id:'g2',title:'Carpintería',description:'Fotografía ilustrativa de trabajos en madera; no es una imagen oficial del CETPRO.',image:'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1100&q=83',published:true},
    {id:'g1',title:'Soldadura',description:'Fotografía ilustrativa de trabajos de soldadura; no es una imagen oficial del CETPRO.',image:'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1100&q=83',published:true}
  ],
  staffYears:[{id:'sy2026',title:'Nuestra comunidad educativa · 2026',year:'2026',caption:'Espacio reservado para la foto grupal oficial de docentes y directivos. Sube la fotografía desde el panel.',image:'ilustracion-campus.svg',published:true}],
  teachers:[
   {id:'dt1',title:'Docente de Electricidad (ejemplo)',specialty:'Electricidad',position:'Docente de formación técnica',profession:'Por completar',education:'Por completar',experience:'',bio:'Ficha de demostración. Sustituir por datos autorizados del docente.',years:'2026',order:'1',image:'ilustracion-electricidad.svg',active:false,demo:true},
   {id:'dt2',title:'Docente de Industria del Vestido (ejemplo)',specialty:'Industria del Vestido',position:'Docente de formación técnica',profession:'Por completar',education:'Por completar',experience:'',bio:'Ficha de demostración. Sustituir por datos autorizados del docente.',years:'2026',order:'2',image:'ilustracion-vestido.svg',active:false,demo:true},
   {id:'dt3',title:'Docente de Carpintería (ejemplo)',specialty:'Carpintería',position:'Docente de formación técnica',profession:'Por completar',education:'Por completar',experience:'',bio:'Ficha de demostración. Sustituir por datos autorizados del docente.',years:'2026',order:'3',image:'ilustracion-carpinteria.svg',active:false,demo:true},
   {id:'dt4',title:'Docente de Soldadura (ejemplo)',specialty:'Soldadura',position:'Docente de formación técnica',profession:'Por completar',education:'Por completar',experience:'',bio:'Ficha de demostración. Sustituir por datos autorizados del docente.',years:'2026',order:'4',image:'ilustracion-soldadura.svg',active:false,demo:true}
  ],
  directors:[{id:'dir1',title:'Equipo directivo (ejemplo)',position:'Dirección institucional',profession:'Por completar',bio:'Registra el nombre, cargo y fotografía oficial del personal directivo.',years:'2026',order:'1',image:'ilustracion-about.svg',active:false,demo:true}],
  historyGallery:[
   {id:'hg1',title:'Taller de Electricidad · muestra',category:'Talleres',description:'Fotografía referencial, no es un registro del CETPRO.',year:'2026',image:'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=950&q=80',published:false,demo:true},
   {id:'hg2',title:'Industria del Vestido · muestra',category:'Talleres',description:'Fotografía referencial, no es un registro del CETPRO.',year:'2026',image:'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=950&q=80',published:false,demo:true},
   {id:'hg3',title:'Carpintería · muestra',category:'Talleres',description:'Fotografía referencial, no es un registro del CETPRO.',year:'2026',image:'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=950&q=80',published:false,demo:true},
   {id:'hg4',title:'Soldadura · muestra',category:'Talleres',description:'Fotografía referencial, no es un registro del CETPRO.',year:'2026',image:'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=950&q=80',published:false,demo:true}
  ],
  achievements:[], partners:[],
  offers:[
   {id:'of_p3',programId:'p3',title:'Electricidad',shift:'Horario por confirmar',schedule:'Por confirmar',vacancies:'',start:'',end:'',requirements:'',published:true,open:true},
   {id:'of_p4',programId:'p4',title:'Industria del Vestido',shift:'Horario por confirmar',schedule:'Por confirmar',vacancies:'',start:'',end:'',requirements:'',published:true,open:true},
   {id:'of_p2',programId:'p2',title:'Carpintería',shift:'Horario por confirmar',schedule:'Por confirmar',vacancies:'',start:'',end:'',requirements:'',published:true,open:true},
   {id:'of_p1',programId:'p1',title:'Soldadura',shift:'Horario por confirmar',schedule:'Por confirmar',vacancies:'',start:'',end:'',requirements:'',published:true,open:true}
  ],
  projects:[
   {id:'demo_proj_elec',title:'Circuito eléctrico seguro · muestra',specialty:'Electricidad',year:'2026',description:'EJEMPLO VISUAL, no es un trabajo real documentado del CETPRO. Reemplaza esta publicación por fotos autorizadas de un proyecto de Electricidad.',image:'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=950&q=80',video:'',published:false,demo:true},
   {id:'demo_proj_vestido',title:'Prenda confeccionada · muestra',specialty:'Industria del Vestido',year:'2026',description:'EJEMPLO VISUAL, no es un trabajo real documentado del CETPRO. Reemplaza esta publicación por fotos autorizadas de prendas estudiantiles.',image:'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=950&q=80',video:'',published:false,demo:true},
   {id:'demo_proj_carp',title:'Mueble de madera · muestra',specialty:'Carpintería',year:'2026',description:'EJEMPLO VISUAL, no es un trabajo real documentado del CETPRO. Publica posteriormente proyectos de Carpintería confirmados.',image:'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=950&q=80',video:'',published:false,demo:true},
   {id:'demo_proj_sold',title:'Estructura metálica · muestra',specialty:'Soldadura',year:'2026',description:'EJEMPLO VISUAL, no es un trabajo real documentado del CETPRO. Sustituye este ejemplo por trabajos autorizados de Soldadura.',image:'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=950&q=80',video:'',published:false,demo:true}
  ],calendarEvents:[],alumni:[],
  faqs:[
   {id:'faq1',title:'¿Cuáles son las especialidades que ofrece el CETPRO?',answer:'En este portal se presentan cuatro especialidades: Electricidad, Industria del Vestido, Carpintería y Soldadura. Consulta directamente sus horarios y la convocatoria vigente.',order:'1',published:true},
   {id:'faq2',title:'¿Cómo puedo conocer los requisitos de matrícula?',answer:'Revisa la sección Matrícula para verificar los requisitos y las fechas oficiales cuando la institución los publique.',order:'2',published:true},
   {id:'faq3',title:'¿Cuánto duran los estudios?',answer:'La duración depende de la programación académica y los módulos. Solicita la información oficial al CETPRO antes de inscribirte.',order:'3',published:true},
   {id:'faq4',title:'¿Dónde puedo consultar los horarios y vacantes?',answer:'En Matrícula encontrarás los turnos y las vacantes que el administrador confirme para cada especialidad.',order:'4',published:true},
   {id:'faq5',title:'¿Dónde obtengo información sobre certificaciones?',answer:'La institución puede orientarte sobre sus módulos, certificaciones y requisitos vigentes a través de sus canales oficiales.',order:'5',published:true}
  ],
  tours:[
   {id:'tw_p3',title:'Taller de Electricidad',specialty:'Electricidad',description:'Explora una muestra ilustrativa de los espacios y las actividades de formación en instalaciones eléctricas.',image:'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=950&q=80',video:'',published:false,demo:true},
   {id:'tw_p4',title:'Taller de Industria del Vestido',specialty:'Industria del Vestido',description:'Conoce de manera ilustrativa las actividades de corte, confección y manejo de máquinas.',image:'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=950&q=80',video:'',published:false,demo:true},
   {id:'tw_p2',title:'Taller de Carpintería',specialty:'Carpintería',description:'Una vista ilustrativa del trabajo de medición, corte, ensamblaje y acabado en madera.',image:'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=950&q=80',video:'',published:false,demo:true},
   {id:'tw_p1',title:'Taller de Soldadura',specialty:'Soldadura',description:'Muestra ilustrativa de procesos de unión y fabricación de estructuras metálicas.',image:'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=950&q=80',video:'',published:false,demo:true}
  ],
  documents:[], jobs:[], enrollments:[], messages:[]
};
const images=['afiche-demo-expo-cetpro.svg','ilustracion-hero.svg','ilustracion-campus.svg','ilustracion-about.svg','ilustracion-electricidad.svg','ilustracion-vestido.svg','ilustracion-carpinteria.svg','ilustracion-soldadura.svg',
'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1400&q=84',
'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=950&q=80',
'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=950&q=80',
'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=950&q=80',
'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=950&q=80',
'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=950&q=80',
'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=950&q=80'];
const imageLabel=value=> /^data:image\//i.test(value)?'Imagen subida al navegador': /^https:/i.test(value)?'Foto ilustrativa · '+(value.match(/photo-([a-z0-9-]+)/)||[])[1]?.slice(-8):value;
const fallbackFor=(value)=>{
 const raw=String(value||'').toLowerCase();
 if(raw.includes('150491759')||raw.includes('soldadura')||raw.includes('mecanica'))return assets+'ilustracion-soldadura.svg';
 if(raw.includes('150414845')||raw.includes('carpinteria'))return assets+'ilustracion-carpinteria.svg';
 if(raw.includes('162190525')||raw.includes('electricidad'))return assets+'ilustracion-electricidad.svg';
 if(raw.includes('155690505')||raw.includes('vestido'))return assets+'ilustracion-vestido.svg';
 if(raw.includes('149736681')||raw.includes('about'))return assets+'ilustracion-about.svg';
 if(raw.includes('152305085')||raw.includes('campus'))return assets+'ilustracion-campus.svg';
 return assets+'ilustracion-hero.svg';
};
const picture=(value)=>{
 const raw=String(value||'').trim();
 if(/^https:\/\//i.test(raw))return raw;
 if(/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(raw))return raw;
 if(/^[a-z0-9_.-]+\.(svg|jpg|jpeg|png|webp)$/i.test(raw))return assets+raw;
 return assets+'ilustracion-campus.svg';
};
const safeUrl=(value)=>{const u=String(value||'');return /^https:\/\//i.test(u)||/^data:application\/pdf;base64,[A-Za-z0-9+/=]+$/.test(u)?u:'';};
const esc=(input='')=>String(input??'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=(prefix='id')=>prefix+'_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,7);
function read(){
 const remote=window.CETPRO_CLOUD;
 const stored=remote?.ready&&remote.data?remote.data:{};
 const o=structuredClone(defaults);
 o.settings={...o.settings,...(stored.settings||{})};
 for(const sub of ['popup','whatsapp','admission','community','pageText'])o.settings[sub]={...o.settings[sub],...(stored.settings?.[sub]||{})};
 for(const key of ['news','gallery','documents','jobs','staffYears','teachers','directors','historyGallery','achievements','partners','projects','calendarEvents','alumni','faqs','tours']){
   if(Array.isArray(stored[key]))o[key]=stored[key];
 }
 if(Array.isArray(stored.offers))o.offers=defaults.offers.map(base=>({...base,...(stored.offers.find(x=>x.programId===base.programId)||{})}));
 if(Array.isArray(stored.programs))o.programs=defaults.programs.map(base=>({...base,...(stored.programs.find(x=>x.id===base.id)||{})}));
 // Nunca se guardan inscripciones o consultas en archivos, localStorage ni contenido público.
 o.enrollments=window.location.pathname.endsWith('/admin.html')?(remote?.enrollments||[]):[];
 o.messages=window.location.pathname.endsWith('/admin.html')?(remote?.messages||[]):[];
 if(!remote?.ready)o.settings.enrollmentOpen=false;
 return o;
}
function save(next){if(!window.CETPRO_CLOUD?.ready)return false;window.CETPRO_CLOUD.saveContent(next).catch(err=>console.error('No se guardó el contenido:',err));return true;}
const stamp=()=>new Date().toLocaleDateString('es-PE',{day:'2-digit',month:'short',year:'numeric'});
const niceDate=(str)=>{try{return new Date(str+'T12:00:00').toLocaleDateString('es-PE',{day:'2-digit',month:'long',year:'numeric'});}catch{return String(str||'');}};

window.CETPRO={KEY,assets,defaults,images,imageLabel,fallbackFor,picture,safeUrl,esc,uid,read,save,stamp,niceDate};
})();
