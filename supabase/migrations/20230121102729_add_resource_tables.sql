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

create table halfleap.notes
(
    id         uuid primary key     default gen_random_uuid(),
    content    text        not null default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    is_private boolean     not null default true,
    event_id   uuid references halfleap.events (eid)
);

create table halfleap.resources
(
    id         uuid primary key     default gen_random_uuid(),
    url        text        not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    is_private boolean     not null default true,
    event_id   uuid references halfleap.events (eid)
);


-- Tables for managing shared data.

create table halfleap.shared_locations
(
    location_id uuid references halfleap.locations (id),
    contact_id  uuid references halfleap.contacts (id),
    primary key (location_id, contact_id)
);
comment on table halfleap.shared_locations is 'Contacts who are allowed to see a location.';

create table halfleap.shared_notes
(
    note_id    uuid references halfleap.notes (id),
    contact_id uuid references halfleap.contacts (id),
    primary key (note_id, contact_id)
);
comment on table halfleap.shared_notes is 'Contacts who are allowed to see a note.';


create table halfleap.shared_resources
(
    resource_id uuid references halfleap.resources (id),
    contact_id  uuid references halfleap.contacts (id),
    primary key (resource_id, contact_id)
);
comment on table halfleap.shared_resources is 'Contacts who are allowed to see a resource.';


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
    insert
    into halfleap.contacts (first_name, last_name, email, event_id)
    values ((coalesce((string_to_array(new.raw_user_meta_data ->> 'full_name', ' '))[1],
                      '')),
            (coalesce((string_to_array(new.raw_user_meta_data ->> 'full_name', ' '))[2],
                      '')),
            new.email,
            (select eid from event));
    return new;
end;
$$ language plpgsql;
comment on function halfleap.create_new_contact is 'Creates a new event and contact when a new auth user is created.';

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


create trigger notes_updated_at_timestamptz
    before update
    on halfleap.notes
    for each row
execute procedure
    update_timestamptz();


create trigger resources_updated_at_timestamptz
    before update
    on halfleap.resources
    for each row
execute procedure
    update_timestamptz();

