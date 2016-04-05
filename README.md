# cloudfm

The cloud-aware music player.

[![Travis](https://img.shields.io/travis/cloudfm/cloudfm.svg?style=flat-square)](https://travis-ci.org/cloudfm/cloudfm)

### Hacking

The server is written in Rust and requires a recent nightly version of the
Rust compiler. See [server/README.md](server/README.md) for further instructions.

The app requires Node.js 4 or newer. See [app/README.md](app/README.md)
for further instructions.

In order to run either, you need a CouchDB instance that is configured
with `enable_cors = true` under the `httpd` section. Next, create a `.env` file
at the project root with the database URL:

```
DATABASE_URL=http://localhost:5984
```

This file is read by both the app and the server. Alternatively, you can also
set this as an environment variable.
