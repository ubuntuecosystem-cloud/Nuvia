create table public.persons (

  id uuid primary key default gen_random_uuid(),

  identity_id uuid not null
    references public.identities(id)
    on delete cascade,

  state text not null
    default 'active',

  created_at timestamptz not null
    default now(),

  unique(identity_id)

);


alter table public.persons
enable row level security;


create policy "Users can view their own person record"

on public.persons

for select

using (
  identity_id = auth.uid()
);


create policy "Users can create their own person record"

on public.persons

for insert

with check (
  identity_id = auth.uid()
);
