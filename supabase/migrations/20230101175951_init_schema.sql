-- We want to disable most privileges for public users. The halfleap schema is where most
-- of the data lives. This makes it easier to limit permissions and also allows us to use
-- the public schema for views only, which can be programmatically created and dropped.
create schema if not exists halfleap;

-- Finer-grained permissions for the halfleap schema are set below.
grant usage on schema halfleap to authenticated, postgres, service_role, supabase_auth_admin;
alter default privileges in schema halfleap grant select, insert, update, delete on tables to authenticated, postgres, service_role, supabase_auth_admin;


create table halfleap.adapters
(
    id         uuid primary key     default gen_random_uuid(),
    owner      text        not null,
    name       text        not null,
    version    int         not null default 0,
    token_hash text,
    code       jsonb,
    added_at   timestamptz not null default now(),

    unique (owner, name),
    unique (owner, name, version)
);
comment on column halfleap.adapters.token_hash is
    'The SHA256 hash of the secret token that each adapter must provide in order for the request
    to proceed. To disable an adapter, this can be set to null.';


create type halfleap.event_type as enum ('ingest', 'transform', 'publish');
create table halfleap.events
(
    id         bigint primary key generated always as identity,
    eid        uuid unique                  default gen_random_uuid(),
    type       halfleap.event_type not null,
    source     uuid                not null references halfleap.adapters (id),
    data       jsonb               not null,
    created_at timestamptz         not null default now()
);

create table halfleap.leapers
(
    username text unique not null,
    email    text unique not null,
    is_me    boolean     not null default false
);
create unique index only_one_owner on halfleap.leapers (is_me) where is_me;
comment on index halfleap.only_one_owner is 'Only one contact can be the owner of the Halfleap account.';

create function init_account() returns trigger as
$$
begin
    if (select count(*) = 0 from halfleap.leapers) then
        update halfleap.leapers set is_me = true where email = new.email;
    end if;
end
$$ language plpgsql
    security definer;

create trigger init_account
    after insert
    on halfleap.leapers
    for each row
execute procedure init_account();
comment on trigger init_account on halfleap.leapers is 'The first person to sign in is the owner of the Halfleap account.';

-- Security

alter table halfleap.adapters
    enable row level security;
alter table halfleap.events
    enable row level security;
alter table halfleap.leapers
    enable row level security;
