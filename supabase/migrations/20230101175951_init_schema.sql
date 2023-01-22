-- We want to disable most privileges for public users. The halfleap schema is where most
-- of the data lives. This makes it easier to limit permissions and also allows us to use
-- the public schema for views only, which can be programmatically created and dropped.
create schema if not exists halfleap;

-- Finer-grained permissions for the halfleap schema are set below.
grant usage on schema halfleap to authenticated, postgres, service_role;
alter default privileges in schema halfleap grant select, insert, update, delete on  tables to postgres, service_role;

create table halfleap.adapters
(
    id       uuid primary key     default gen_random_uuid(),
    name     text unique not null,
    added_at timestamptz not null default now()
);

create type halfleap.event_type as enum ('ingress', 'transform', 'publish');
create table halfleap.events
(
    id         bigint primary key generated always as identity,
    eid        uuid unique                  default gen_random_uuid(),
    type       halfleap.event_type not null,
    source     uuid                not null references halfleap.adapters (id),
    data       jsonb               not null,
    created_at timestamptz         not null default now()
);

-- Default adapter to auto insert new contact on auth signup/verification
insert into halfleap.adapters (name)
values ('hl_auth_contact');
