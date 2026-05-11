create table if not exists public.users (
  id text primary key,
  name text not null,
  email text not null unique,
  password text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.admins (
  id text primary key,
  name text not null,
  email text not null unique,
  password text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  name text not null,
  price numeric not null,
  description text,
  image text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id text primary key,
  user_id text not null references public.users (id),
  product_id text not null references public.products (id),
  quantity integer not null,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id text primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_orders_user_id on public.orders (user_id);
create index if not exists idx_orders_product_id on public.orders (product_id);
create index if not exists idx_messages_created_at on public.messages (created_at);
