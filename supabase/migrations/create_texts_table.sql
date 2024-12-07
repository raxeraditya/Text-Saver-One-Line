-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Create the texts table
create table if not exists texts (
    id uuid default uuid_generate_v4() primary key,
    text text not null,
    user_id text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for faster user-specific queries
create index if not exists idx_texts_user_id on texts(user_id);

-- Create helper function for table creation (used by the application)
create or replace function create_texts_table()
returns void as $$
begin
    -- This function is called by the application to ensure the table exists
    -- It's a no-op if the table already exists
    if not exists (select from pg_tables where schemaname = 'public' and tablename = 'texts') then
        create table texts (
            id uuid default uuid_generate_v4() primary key,
            text text not null,
            user_id text not null,
            created_at timestamp with time zone default timezone('utc'::text, now()) not null
        );
        
        create index idx_texts_user_id on texts(user_id);
    end if;
end;
$$ language plpgsql security definer;