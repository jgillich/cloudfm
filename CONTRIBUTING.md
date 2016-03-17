# Contributing

### Building

If you have [Nix](http://nixos.org/nix/), type `nix-shell .` to get a shell with
all prerequisites installed. On other systems, make sure you have the following:

* Somewhat recent Rust nightly
* OpenSSL
* SQLite
* Postgres (libpq)

To build the server, Diesel needs to connect to the database in order to
generate the schema. Put the following in a `.env` file (or just set it as
environment variable):

    DATABASE_URL=/tmp/mp.sqlite

Now you can build the server with `cargo` as usual.
