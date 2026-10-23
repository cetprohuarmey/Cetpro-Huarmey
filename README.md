# CETPRO Ernesto Reyna Zegarra — GitHub Pages + Supabase

Proyecto para alojar **gratis** el sitio web en GitHub Pages con URL predeterminada y utilizar Supabase como base de datos, autenticación de administradores y almacenamiento de imágenes/PDF. **No necesitas contratar hosting, dominio o instalar PHP/MySQL.**

> **Estado de entrega**: código y estructura preparados. **No está publicado, no hay backend conectado y no se ha certificado funcionamiento en producción.** Antes de recibir datos personales, configura y verifica Supabase, prueba todos los flujos en línea, revisa requisitos de seguridad y aprueba la política institucional de privacidad.

## 1. Crear y configurar Supabase (plan gratuito disponible, sujeto a límites)

1. Abre https://supabase.com/dashboard e inicia sesión. Crea un proyecto y conserva tu contraseña de Supabase solo en tu cuenta.
2. Ve a **SQL Editor** > **New query**, pega íntegro `database/supabase.sql`, ejecútalo y verifica que termine sin error. Las tablas son `site_content`, `enrollments`, `contact_messages`, `admin_users`, y el bucket público `cetpro-public`.
3. En **Project Settings** > **API** (o **Connect**) copia `Project URL` y **Publishable key** (puede verse como `sb_publishable_...` o la clave heredada `anon`).
4. Abre `js/config.js` con VS Code o el editor de GitHub y completa exclusivamente esos **dos valores públicos**:
   ```javascript
   window.CETPRO_CONFIG = {
     supabaseUrl: "https://TU-PROYECTO.supabase.co",
     supabasePublishableKey: "sb_publishable_TU_CLAVE_PUBLICA"
   };
   ```
5. **NUNCA publiques `service_role`, `sb_secret_...`, contraseñas de usuarios, tokens privados o claves API secretas** en el ZIP, GitHub, JavaScript o HTML. La clave publicable puede estar en JavaScript **porque las políticas RLS del SQL restringen los permisos**.
6. En **Authentication > Users**, crea tu usuario administrador con un correo electrónico real y una contraseña fuerte. Es recomendable deshabilitar el registro público no autorizado desde Authentication > Providers > Email/Settings. **No hay contraseña por defecto en este proyecto.**
7. Desde Supabase SQL Editor ejecuta **una sola vez**, modificando el correo:
   ```sql
   insert into public.admin_users(user_id)
   select id from auth.users where email='TU_CORREO_ADMINISTRADOR'
   on conflict (user_id) do nothing;
   ```
8. Comprueba que en `admin_users` haya una fila que corresponda al usuario autenticado. El acceso a `admin.html` usa ese correo y contraseña.

## 2. Publicar con la dirección gratis de GitHub Pages

1. Abre https://github.com, crea un **repositorio público** llamado, por ejemplo, `cetpro-huarmey`.
2. Extrae el ZIP. Usa **Add file > Upload files** y sube el **contenido de esta carpeta a la raíz** del repositorio (no subas el ZIP solamente ni una carpeta contenedora). Deben verse `index.html`, `admin.html`, `js/`, `assets/`, etc.
3. Pulsa **Commit changes**.
4. En el repositorio, ve a **Settings > Pages > Build and deployment > Deploy from a branch**. Elige `main` y `/(root)` y guarda.
5. La URL pública será `https://TU_USUARIO.github.io/cetpro-huarmey/`. El administrador: `https://TU_USUARIO.github.io/cetpro-huarmey/admin.html`.
6. No registres un dominio personalizado. El servicio GitHub Pages publica los archivos, pero Supabase es quien gestiona los datos en línea.

## 3. Cómo funciona

- Los visitantes consultan las páginas y su contenido publicado desde la tabla `site_content` de Supabase.
- Solo los usuarios registrados en `admin_users` pueden modificar publicaciones y ver datos privados, según RLS.
- El administrador actualiza desde `admin.html`: noticias, programas, docentes, galería, vacantes, anuncios, galerías históricas, etc. Una actualización correcta se guarda en Supabase, sin exportar JS para publicar.
- Fotos y PDF subidos desde el panel se guardan en Supabase Storage (bucket público). **No subas archivos confidenciales** a ese bucket.
- La matrícula solo puede enviarse cuando la administración la habilita y la oferta correspondiente está abierta. Una función SQL verifica convocatoria y cupos de forma transaccional. Un formulario recibido es **solicitud**, nunca matrícula confirmada automáticamente.
- El formulario de contacto registra consultas privadas. La base de datos **no concede SELECT público** sobre estas tablas. Los usuarios administrativos pueden marcar mensajes leídos, revisar y exportar solicitudes, cambiar estados y eliminarlas.
- Los visitantes solo ven información pública; los registros privados **no se almacenan en `localStorage` ni se exportan a archivos públicos**.

## 4. Antes de lanzar el servicio institucional real

- [ ] Publicar y aprobar la política de privacidad institucional completa: responsable de datos, domicilio y contacto, finalidad, base legal, conservación, derechos del titular y procedimientos de ejercicio de esos derechos (normativa peruana). El texto incluido es un borrador/instructivo, **no constituye aprobación legal**.
- [ ] No habilitar formularios para personas reales hasta revisar consentimiento, tratamiento de DNI, seguridad, acceso a menores y eliminación/retención de datos.
- [ ] Revisar la configuración de Auth: registro no autorizado desactivado, credenciales personales y restablecimiento de contraseña.
- [ ] Probar permisos **sin iniciar sesión**: no se debe poder leer, actualizar ni borrar `enrollments`, `contact_messages` o `site_content`; el permiso público sobre contenido debe ser solo lectura. Probar autenticación y actualización con un administrador autorizado.
- [ ] Comprobar matrícula abierta/cerrada, rechazo de DNI repetido, fechas, cupos y actualización de estados desde dos navegadores distintos.
- [ ] Activar medidas antispam, protección contra abuso (por ejemplo captcha validado en un backend/Edge Function), y definir procedimientos de respuesta, monitoreo y copias de seguridad. Las inserciones de contacto públicas sin control anti-bot adicional son susceptibles de spam.
- [ ] Cambiar fotos, publicaciones, empleados y materiales ilustrativos por información oficial y autorizada. No compartir fotografías privadas.
- [ ] Configurar un correo electrónico y teléfono institucional en el panel y revisar horarios y vacantes.
- [ ] Tener presente los límites del plan gratis y las pausas por inactividad. Este proyecto no ofrece garantías de disponibilidad, copias automáticas ni pruebas de penetración.

## 5. Solución de problemas

- **“Falta conectar Supabase”**: revisa `js/config.js` y que hayas subido el archivo modificado a GitHub.
- **“No se pudo conectar”**: comprueba `Project URL`, `Publishable key`, ejecución correcta de SQL y acceso a la red. Comprueba los errores del navegador (F12 > Console).
- **Acceso denegado**: confirma que el usuario existe en Authentication > Users y su UUID está en `admin_users`.
- **No se guardan publicaciones**: verifica que hayas iniciado sesión con un administrador, tabla `site_content` con fila `main` y políticas RLS aplicadas.
- **Solicitudes no se envían**: la convocatoria debe estar abierta, el programa debe tener oferta publicada, estar habilitado y tener plazas si se fijó un número. Antes de abrirla, revisa la política de privacidad.
- **Imágenes no se suben**: verifica bucket `cetpro-public`, permisos de inserción, tipo permitido y límite de 5 MB.
- **Contraseña olvidada**: restablécela desde el panel Supabase Authentication o mediante el proceso de restablecimiento habilitado para la cuenta. No existe credencial maestra en el código.

**Importante**: Supabase en el plan gratuito puede pausar proyectos tras inactividad. Para una institución que requiere disponibilidad y protección de datos personales, revisa si esa limitación es aceptable y prepara respaldos externos periódicos. Consulta siempre condiciones vigentes en https://supabase.com/pricing.
