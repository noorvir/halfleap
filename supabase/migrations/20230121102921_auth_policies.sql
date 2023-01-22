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


create policy "Allow the account owner full access to their adapters" on halfleap.adapters
    for all
    using (auth.uid() = (select id
                         from halfleap.contacts
                         where is_me = true));

create policy "Allow the account owner full access to their contacts" on halfleap.contacts
    for all
    using (auth.uid() = (select id
                         from halfleap.contacts
                         where is_me = true));

create policy "Allow the account owner full access to their locations" on halfleap.locations
    for all
    using (auth.uid() = (select id
                         from halfleap.contacts
                         where is_me = true));

create policy "Allow the account owner full access to their notes" on halfleap.notes
    for all
    using (auth.uid() = (select id
                         from halfleap.contacts
                         where is_me = true));

create policy "Allow the account owner full access to their resources" on halfleap.resources
    for all
    using (auth.uid() = (select id
                         from halfleap.contacts
                         where is_me = true));
