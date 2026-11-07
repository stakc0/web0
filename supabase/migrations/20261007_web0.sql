create table if not exists public.web0_launches (
  mint text primary key, creator_wallet text not null, token_name text not null,
  ticker text not null, description text default '', image_url text default '',
  website text default '', twitter text default '', signature text not null,
  status text not null default 'submitted', created_at timestamptz not null default now()
);
create table if not exists public.web0_routes (
  mint text primary key references public.web0_launches(mint) on delete cascade,
  vault_address text not null, cadence_minutes integer not null, duration_hours integer not null,
  status text not null default 'draft', fee_route_signature text,
  total_deployed_sol numeric not null default 0, total_claimed_sol numeric not null default 0,
  gas_funded_sol numeric not null default 0, last_claim_at timestamptz,
  last_claim_signature text, last_execution_at timestamptz, next_execution_at timestamptz,
  created_at timestamptz not null default now()
);
create table if not exists public.web0_trades (
  id text primary key, mint text not null, wallet text, side text, sol numeric,
  amount numeric, signature text, created_at timestamptz not null
);
create table if not exists public.web0_events (
  id text primary key, kind text not null, mint text, wallet text, side text,
  sol numeric, amount numeric, signature text, ticker text, chunk_sol numeric,
  created_at timestamptz not null, url text
);
create index if not exists web0_launches_created_idx on public.web0_launches(created_at desc);
create index if not exists web0_routes_status_next_idx on public.web0_routes(status,next_execution_at);
create index if not exists web0_trades_mint_time_idx on public.web0_trades(mint,created_at desc);
create index if not exists web0_events_mint_time_idx on public.web0_events(mint,created_at desc);
create index if not exists web0_events_time_idx on public.web0_events(created_at desc);
alter table public.web0_launches enable row level security;
alter table public.web0_routes enable row level security;
alter table public.web0_trades enable row level security;
alter table public.web0_events enable row level security;
