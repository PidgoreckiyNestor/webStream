create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role text,
  plan_intent text,
  os text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,
  created_at timestamptz not null default now(),
  constraint waitlist_email_key unique (email),
  constraint waitlist_role_check check (role is null or role in ('research', 'build', 'teach')),
  constraint waitlist_plan_check check (
    plan_intent is null or plan_intent in ('trial', 'plus', 'lab', 'research')
  )
);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);

alter table public.waitlist enable row level security;
