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
    name       text unique not null,
    added_at   timestamptz not null default now(),
    token_hash text
);


comment on column halfleap.adapters.token_hash is
    'The SHA256 hash of the secret token that each adapter must provide in order for the request
    to proceed. To disable an adapter, this can be set to null.';


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


create table halfleap.locations
(
    id          uuid primary key default gen_random_uuid(),
    coordinates point   not null,
    is_exact    boolean not null,
    is_private  boolean not null default true,
    event_id    uuid references halfleap.events (eid)
);


create table halfleap.contacts
(
    id             uuid primary key     default gen_random_uuid(),
    first_name     text        not null,
    last_name      text        not null,
    email          text unique not null,
    disambiguation text unique,
    met_at_id      uuid references halfleap.locations (id),
    lives_in_id    uuid references halfleap.locations (id),
    birth_date     date,
    nationality    text,
    created_at     timestamptz not null default now(),
    event_id       uuid references halfleap.events (eid),

    -- This is a special column that's used to identify the owner of the Halfleap account.
    is_me          boolean     not null default true,

    unique (first_name, last_name, birth_date, nationality, disambiguation)
);
create unique index only_one_owner on halfleap.contacts (is_me) where is_me;
comment on index halfleap.only_one_owner is 'Only one contact can be the owner of the Halfleap account.';


create type halfleap.authenticator_type as enum ('human', 'robot');
create table halfleap.authenticators
(
    id         uuid primary key                     default gen_random_uuid(),
    auth_id    text                        not null unique,
    type       halfleap.authenticator_type not null,
    is_allowed bool                        not null default false,
    contact_id uuid references halfleap.contacts (id),
    meta       jsonb
);
comment on table halfleap.authenticators is
    'Authentication identities for human or robots to use when sending requests to halfleap. This
    table is as an access list for services messaging halfleap through adapters. The adapters are
    responsible for parsing the auth_id from a request. Halfleap compares the parsed auth_id against
    this table to determine whether to allow access into halfleap.';
comment on column halfleap.authenticators.auth_id is 'The authenticator specific id that is compared.';
comment on column halfleap.authenticators.contact_id is 'Is the optional contact associated with the authenticator.';



-- Functions & Triggers

create function halfleap.create_new_contact() returns trigger as
$$
begin
    with event as (
        insert into halfleap.events (type, source, data)
            values ('ingress'::halfleap.event_type,
                    (select id
                     from halfleap.adapters
                     where name = 'hl_auth_contact'),
                    new.raw_user_meta_data)
            returning eid)
       , contact as (
        insert
            into halfleap.contacts (first_name, last_name, email, event_id)
                values ((coalesce((string_to_array(new.raw_user_meta_data ->> 'full_name', ' '))[1],
                                  '')),
                        (coalesce((string_to_array(new.raw_user_meta_data ->> 'full_name', ' '))[2],
                                  '')),
                        new.email,
                        (select eid from event))
                returning id, email)
    insert
    into halfleap.authenticators (auth_id, type, contact_id, meta)
    values ((select email from contact),
            'human',
            (select id from contact),
            new.raw_user_meta_data);

    return new;
end;
$$ language plpgsql security definer;

comment on function halfleap.create_new_contact is
    'Creates a new event, authenticator and contact when a new auth user is created.
    This only works for providers that provide the full_name field in the raw_user_meta_data.';

create trigger on_auth_user_created
    after insert
    on auth.users
    for each row
execute procedure halfleap.create_new_contact();


create or replace function update_timestamptz()
    returns trigger as
$$
begin
    NEW.updated_at = now();
    return NEW;
end;
$$ language 'plpgsql';


-- Default adapter to auto insert new contact on auth signup/verification
insert into halfleap.adapters (name)
values ('hl_auth_contact');


create table halfleap.ingress_allow_list
(
    id         uuid primary key     default gen_random_uuid(),
    contact_id uuid references halfleap.contacts (id),
    added_at   timestamptz not null default now()
);