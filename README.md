# Halfleap

Halfleap is a data store for your personal data. It is a platform to store
personal data in the most generic form possible. The goal here is **not to
create a knowledge management system**, but a system to store information you
care about and make it easy to share it with others.

## Roadmap:

- [ ] Send unstructured data (events) to db as text message
- [ ] Adapters to transform data into structured
  - [ ] DB adapter that define the schema of the data
  - [ ] API adapters that transform the incoming events into the schema or send
        them to another service
- [ ] Default API adapter to accompany each DB adapter. If the users adds custom
      API adapters that request access to the DB adapter, the default should be
      removed.
- [ ] Inbuilt support for contacts.
- [ ] Each contact should be verified through authenticating with their Oauth
      Provider.
  - [ ] This implies that each db will have a users table for all contacts. This
        should contain as little information as possible.
  - [ ] Unique de-duplicated identity for each contact
  - [ ] Option for multiple phone numbers, emails etc.
  - [ ] Inbuilt Row Level Security (RLS) for all data that can be easily
        configured from the contacts adapter.
- [ ] Integrated AI for parsing and searching.
- [ ] Temporary signed URL for each data entry
- [ ] Auto-generation of clients to query DB (should be doable through
      PostgREST)

## Events

Data is stored generically.

## Adapters:

Basic classification:

- Web based

There are two types of Adapters:

- DB Adapters
- API Adapters

### DB Adapters

The DB adapter is offered by the platform. i.e. the type of new tables you can
add is tightly controlled. This will form the fundamental abstraction layer for
the platform. You should think about the exact type of abstraction clearly
before adding it.

Each individual account owner should have the option to add a custom DB Adapter
if they like. However, this will not be officially supported.

Prospective DB Adapters:

- events (default)
- locations (default)
- contacts (default)
- notes (default) - these can be used to publish a blog post
- resources (default) - stores generic uris - these could be to webpages, files,
  images etc.
- books
- media
- recipes

We can add more later but these should be carefully considered to be as generic
as possible. Each Adapter should have `tags` that allow further specification
and filtering of the data.

All columns that are not default have a dependency on one or more of the default
adapters in addition to the `events` adapter. For example, the `books`, `media`
and `locations` adapters will have a dependency on the `events` and the
`resources` adapters. The recipes adapter will have a dependency on the `events`
and `notes` adapters.

The idea is that you separate the presentation of the data from its storage. You
can then combine the above table the desired UI. For example, you could query
your `resources` adapter and left join it on `books` to creates list of your
favorite books. You could also filter on the tags column in addition to include
git repos, youtube videos etc.

Movies to create a Bookmarks table. If you want to then add a github repo to
your bookmarks, you can just

### API Adapters

API providers do not get the option to add a new DB adapter. They can consume
data from the existing DB adapters and transform it as they like.

## Example

- Send an imdb link to the bot from telegram
- Default case
  - Bot will store the data in an events table. It will parse same basics like
    - URLs included in message
    - Source of message (telegram, whatsapp, chrome extension, email, manual,
      etc)
    - Location it was sent from
    - Timestamp
    - AI classification: (movie, tv show, book, etc)
- If no adapter is configured, execution stops here.
- An trigger is fired to send the new data (raw and parsed) to each of the
  configured API adapters. These adapters can do what they like with the data.
  They can add them to another table through an existing DB adapter or send them
  to another service. They can also
  \
  transform the data as they like.

For each DB adapter

- If you include the name of the table in the message, it will be stored in that
  table
  - eg. `#movies` will store the data in the movies table.
  - The db adapter is responsible for parsing the data and storing it in the
    correct format.

## Implementation

This is the v1 implementation. In the future, it would be great to write the API
in Rust allow the adapters to be written in any language as long as it compiles
to WASM. That way, we can run the entire platform anywhere. For now, here is the
implementation plan:

DB:

- Supabase (Postgres + PostgREST). This will almost certainly **not** change.

API:

- Serverless functions (Deno)

Adapters:

- Serverless functions (Deno)
