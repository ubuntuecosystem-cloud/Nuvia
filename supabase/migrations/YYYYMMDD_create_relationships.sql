create table public.relationships (

  id uuid primary key default gen_random_uuid(),

  from_person_id uuid not null
    references public.persons(id)
    on delete cascade,

  to_person_id uuid not null
    references public.persons(id)
    on delete cascade,

  state text not null
    default 'initiated',

  created_at timestamptz not null
    default now(),


  constraint different_people
    check (
      from_person_id <> to_person_id
    )

);


alter table public.relationships
enable row level security;


create policy "Users can view relationships involving them"

on public.relationships

for select

using (

  from_person_id in (
    select id
    from public.persons
    where identity_id = auth.uid()
  )

  OR

  to_person_id in (
    select id
    from public.persons
    where identity_id = auth.uid()
  )

);


create policy "Users can create relationships from themselves"

on public.relationships

for insert

with check (

  from_person_id in (
    select id
    from public.persons
    where identity_id = auth.uid()
  )

);
