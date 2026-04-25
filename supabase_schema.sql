/*
  SUPABASE SQL SCHEMA
  Run these commands in the Supabase SQL Editor.
*/

-- BOOKINGS TABLE
create table bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  full_name text not null,
  email text not null,
  whatsapp text not null,
  english_level text check (
    english_level in ('Beginner','Intermediate','Advanced')
  ),
  preferred_date date not null,
  preferred_time text not null,
  goals text,
  status text default 'pending' check (
    status in ('pending','confirmed','completed','cancelled')
  )
);

-- STUDENTS TABLE
create table students (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  full_name text not null,
  email text not null,
  whatsapp text,
  plan text check (plan in ('Starter','Growth','Intensive')),
  status text default 'active'
);

-- PAYMENTS TABLE
create table payments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  student_id uuid references students(id),
  amount integer not null,
  currency text default 'PHP',
  plan text not null,
  paymongo_id text,
  status text default 'pending' check (
    status in ('pending','paid','failed','refunded')
  )
);

-- SESSION MEDIA TABLE
create table session_media (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  title text not null,
  description text,
  type text check (type in ('image','audio','video')),
  storage_path text not null,
  public_url text not null,
  thumbnail_url text,
  is_published boolean default false
);

-- TESTIMONIALS TABLE
create table testimonials (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  student_name text not null,
  country text,
  flag_emoji text,
  rating integer check (rating between 1 and 5),
  quote text not null,
  photo_url text,
  is_published boolean default true
);

-- ROW LEVEL SECURITY
alter table bookings enable row level security;
alter table students enable row level security;
alter table payments enable row level security;
alter table session_media enable row level security;
alter table testimonials enable row level security;

-- Public can insert bookings (for trial form)
create policy "Anyone can book" on bookings
  for insert with check (true);

-- Only authenticated admin can read/update bookings
create policy "Admin reads bookings" on bookings
  for select using (auth.role() = 'authenticated');

create policy "Admin updates bookings" on bookings
  for update using (auth.role() = 'authenticated');

-- Public can view published media
create policy "Public reads published media" on session_media
  for select using (is_published = true);

-- Admin can do everything on media
create policy "Admin manages media" on session_media
  for all using (auth.role() = 'authenticated');

-- Public can view published testimonials
create policy "Public reads testimonials" on testimonials
  for select using (is_published = true);
