create table halfleap.contact_methods
(
    id         uuid primary key default gen_random_uuid(),
    contact_id uuid  not null references halfleap.contacts,
    method     text  not null,
    details    jsonb not null
);
comment on table halfleap.contact_methods is 'Details of all the ways of reaching a contact';

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

