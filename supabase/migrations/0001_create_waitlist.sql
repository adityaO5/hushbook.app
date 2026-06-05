-- ============================================================
-- HushBook waitlist — create table + Row Level Security
-- Applied via `supabase db push` or by pasting into the
-- Supabase SQL editor (Dashboard -> SQL Editor -> New query).
-- ============================================================

-- gen_random_uuid() is built into Supabase Postgres, but pgcrypto
-- guarantees it exists on any Postgres in case this is run elsewhere.
create extension if not exists pgcrypto;

-- ---- table -------------------------------------------------
create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now(),
  source text,
  user_agent text,
  referrer text
);

-- Case-insensitive dedupe: "Foo@x.com" and "foo@x.com" collide.
-- A duplicate INSERT then returns 409, which the client treats as a
-- friendly "you're already on the list" success.
create unique index if not exists waitlist_signups_email_lower_idx
  on public.waitlist_signups (lower(email));

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.waitlist_signups enable row level security;

-- Allow anonymous (anon) and authenticated visitors to INSERT a
-- signup, nothing else.
create policy "waitlist_anon_insert"
  on public.waitlist_signups
  for insert
  to anon, authenticated
  with check (true);

-- Intentionally NO select/update/delete policy for anon:
-- with RLS enabled and no SELECT policy, the public anon key cannot
-- read the email list. Read access stays server-side via the
-- service_role key only (which bypasses RLS).
