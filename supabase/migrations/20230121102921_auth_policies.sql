-- Privileges and Policies

-- Enable RLS to deny access by default.
alter table halfleap.events
    enable row level security;
alter table halfleap.adapters
    enable row level security;
alter table halfleap.contacts
    enable row level security;
alter table halfleap.locations
    enable row level security;
alter table halfleap.notes
    enable row level security;
alter table halfleap.resources
    enable row level security;
alter table halfleap.shared_resources
    enable row level security;
alter table halfleap.shared_notes
    enable row level security;
alter table halfleap.shared_locations
    enable row level security;


-- Policies

create function is_me(email text) returns bool as
$$
select exists(select 1 from halfleap.contacts where contacts.email = $1);
$$ language sql security definer;

-- Give user full access on all of their own data (except for events - only select).

create policy "Allow the account owner read access to their events" on halfleap.events
    for select
    using (is_me(auth.email()));

create policy "Allow the account owner full access to their adapters" on halfleap.adapters
    for all
    using (is_me(auth.email()));

create policy "Allow the account owner full access to their contacts" on halfleap.contacts
    for all
    using (is_me(auth.email()));

create policy "Allow the account owner full access to their locations" on halfleap.locations
    for all
    using (is_me(auth.email()));

create policy "Allow the account owner full access to their notes" on halfleap.notes
    for all
    using (is_me(auth.email()));

create policy "Allow the account owner full access to their resources" on halfleap.resources
    for all
    using (is_me(auth.email()));


-- Add permissions for public and shared data

create policy "Enable open access to public locations" on halfleap.locations
    for select
    using (is_private = false);

create policy "Enable contacts to see locations shared with them" on halfleap.locations
    for select
    using (auth.email() = (select contacts.email
                           from halfleap.shared_locations
                                    join halfleap.contacts
                                         on shared_locations.contact_id = contacts.id));

create policy "Enable open access to public notes" on halfleap.notes
    for select
    using (is_private = false);

create policy "Enable contacts to see notes shared with them" on halfleap.notes
    for select
    using (auth.email() = (select contacts.email
                           from halfleap.shared_locations
                                    join halfleap.contacts
                                         on shared_locations.contact_id = contacts.id));

create policy "Enable open access to public resources" on halfleap.resources
    for select
    using (is_private = false);

create policy "Enable contacts to see resources shared with them" on halfleap.resources
    for select
    using (auth.email() = (select contacts.email
                           from halfleap.shared_locations
                                    join halfleap.contacts
                                         on shared_locations.contact_id = contacts.id));


