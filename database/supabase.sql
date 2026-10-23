-- CETPRO HUARMEY 2026 | Instalar UNA SOLA VEZ desde Supabase > SQL Editor.
-- No contiene contraseñas ni datos personales. No publiques service_role en GitHub.
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.admin_users (
 user_id uuid primary key references auth.users(id) on delete cascade,
 created_at timestamptz not null default now()
);
create table if not exists public.site_content (
 id text primary key check (id = 'main'),
 content jsonb not null default '{}'::jsonb check (jsonb_typeof(content)='object'),
 updated_at timestamptz not null default now()
);
insert into public.site_content(id, content) values ('main','{}'::jsonb) on conflict (id) do nothing;

create table if not exists public.enrollments (
 id uuid primary key default gen_random_uuid(),
 full_name text not null check (length(trim(full_name)) between 5 and 110),
 dni text not null check (dni ~ '^[0-9]{8}$'),
 phone text not null check (phone ~ '^9[0-9]{8}$'),
 email text not null default '' check(length(email) <= 130),
 program_id text not null check(program_id in ('p1','p2','p3','p4')),
 notes text not null default '' check(length(notes)<=500),
 cycle text not null check(length(cycle) between 3 and 120),
 privacy_consent boolean not null check (privacy_consent is true),
 status text not null default 'Pendiente' check (status in ('Pendiente','En revisión','Aceptada','Rechazada')),
 created_at timestamptz not null default now(),
 unique(dni,cycle)
);
create table if not exists public.contact_messages (
 id uuid primary key default gen_random_uuid(),
 full_name text not null check (length(trim(full_name)) between 3 and 110),
 email text not null check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' and length(email)<=130),
 subject text not null check (length(trim(subject)) between 3 and 160),
 message text not null check (length(trim(message)) between 5 and 1200),
 privacy_consent boolean not null check(privacy_consent is true),
 read boolean not null default false,
 created_at timestamptz not null default now()
);
create index if not exists cetpro_enroll_created_at on public.enrollments(created_at desc);
create index if not exists cetpro_messages_created_at on public.contact_messages(created_at desc);

alter table public.admin_users enable row level security;
alter table public.site_content enable row level security;
alter table public.enrollments enable row level security;
alter table public.contact_messages enable row level security;

-- Administradores creados exclusivamente por el responsable desde Supabase (nunca registro público).
create or replace function public.is_cetpro_admin() returns boolean
language sql stable security definer set search_path=public,pg_temp as $$
 select exists (select 1 from public.admin_users where user_id=(select auth.uid()));
$$;
revoke all on function public.is_cetpro_admin() from public;
grant execute on function public.is_cetpro_admin() to authenticated;

create policy cetpro_admin_self_read on public.admin_users for select to authenticated
 using (user_id=(select auth.uid()));
create policy cetpro_public_content_read on public.site_content for select to anon,authenticated
 using(id='main');
create policy cetpro_admin_content_write on public.site_content for update to authenticated
 using(public.is_cetpro_admin()) with check (public.is_cetpro_admin());
create policy cetpro_admin_enrollments_read on public.enrollments for select to authenticated
 using(public.is_cetpro_admin());
create policy cetpro_admin_enrollments_update on public.enrollments for update to authenticated
 using(public.is_cetpro_admin()) with check(public.is_cetpro_admin());
create policy cetpro_admin_enrollments_delete on public.enrollments for delete to authenticated
 using(public.is_cetpro_admin());
create policy cetpro_admin_messages_read on public.contact_messages for select to authenticated
 using(public.is_cetpro_admin());
create policy cetpro_admin_messages_update on public.contact_messages for update to authenticated
 using(public.is_cetpro_admin()) with check(public.is_cetpro_admin());
create policy cetpro_admin_messages_delete on public.contact_messages for delete to authenticated
 using(public.is_cetpro_admin());
create policy cetpro_public_contact_insert on public.contact_messages for insert to anon,authenticated
 with check(privacy_consent is true and read is false);

-- No hay política de inserción anónima en matrículas: SOLO el procedimiento seguro
-- valida convocatoria, cupos y duplicados. Bloqueo de fila serializa solicitudes.
create or replace function public.submit_cetpro_enrollment(
 p_full_name text,p_dni text,p_phone text,p_email text,p_program_id text,
 p_notes text,p_cycle text,p_privacy_consent boolean
) returns void language plpgsql security definer set search_path=public,pg_temp as $$
declare doc jsonb; off jsonb; available_slots integer; occupied integer;
begin
 if not coalesce(p_privacy_consent,false) then raise exception 'Debe aceptar la política de privacidad';end if;
 select content into doc from public.site_content where id='main' for update;
 if doc is null or doc #>> '{settings,enrollmentOpen}' is distinct from 'true' then
  raise exception 'La matrícula se encuentra cerrada';
 end if;
 if p_cycle is distinct from doc #>> '{settings,enrollmentCycle}' then
  raise exception 'La convocatoria cambió; actualiza la página';
 end if;
 select x.value into off from jsonb_array_elements(coalesce(doc->'offers','[]'::jsonb)) as x(value)
 where x.value->>'programId'=p_program_id limit 1;
 if off is null or off->>'published' is distinct from 'true' or off->>'open' is distinct from 'true' then
  raise exception 'Esta especialidad no acepta solicitudes';
 end if;
 if coalesce(off->>'start','')<>'' and current_date < (off->>'start')::date then
  raise exception 'La convocatoria todavía no comienza';
 end if;
 if coalesce(off->>'end','')<>'' and current_date > (off->>'end')::date then
  raise exception 'La convocatoria ha terminado';
 end if;
 if coalesce(off->>'vacancies','') ~ '^[0-9]+$' then
  available_slots:=(off->>'vacancies')::integer;
  select count(*) into occupied from public.enrollments
  where cycle=p_cycle and program_id=p_program_id and status<>'Rechazada';
  if occupied>=available_slots then raise exception 'No quedan vacantes para esta especialidad';end if;
 end if;
 insert into public.enrollments(full_name,dni,phone,email,program_id,notes,cycle,privacy_consent,status)
 values (trim(p_full_name),trim(p_dni),trim(p_phone),trim(coalesce(p_email,'')),
         p_program_id,trim(coalesce(p_notes,'')),p_cycle,p_privacy_consent,'Pendiente');
end;
$$;
revoke all on function public.submit_cetpro_enrollment(text,text,text,text,text,text,text,boolean) from public;
grant execute on function public.submit_cetpro_enrollment(text,text,text,text,text,text,text,boolean) to anon,authenticated;

-- Almacenamiento de fotografías y PDF públicos. Solo administradores pueden subir.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('cetpro-public','cetpro-public',true,5242880,
 array['image/jpeg','image/png','image/webp','application/pdf'])
on conflict (id) do update set public=excluded.public,
 file_size_limit=excluded.file_size_limit, allowed_mime_types=excluded.allowed_mime_types;
create policy cetpro_public_assets_read on storage.objects for select to anon,authenticated
 using (bucket_id='cetpro-public');
create policy cetpro_admin_assets_upload on storage.objects for insert to authenticated
 with check (bucket_id='cetpro-public' and public.is_cetpro_admin());
create policy cetpro_admin_assets_delete on storage.objects for delete to authenticated
 using (bucket_id='cetpro-public' and public.is_cetpro_admin());

-- Permisos mínimos (las políticas RLS siguen aplicándose).
grant usage on schema public to anon,authenticated;
grant select on public.site_content to anon,authenticated;
grant update on public.site_content to authenticated;
grant select on public.admin_users to authenticated;
grant select,update,delete on public.enrollments to authenticated;
grant select,update,delete on public.contact_messages to authenticated;
grant insert on public.contact_messages to anon,authenticated;
-- No conceder INSERT directo sobre enrollments a anon.

-- DESPUÉS de ejecutar este archivo, en Authentication > Users crea al administrador.
-- Sustituye el correo por el correo REAL y ejecuta esta sentencia POR SEPARADO:
-- INSERT INTO public.admin_users(user_id)
-- SELECT id FROM auth.users WHERE email='correo-administrador@ejemplo.com'
-- ON CONFLICT (user_id) DO NOTHING;
