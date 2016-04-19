# cloudfm

**cloudfm** is a music player that combines multiple music sources, like
YouTube and Spotify, in a single app that works on any web browser or mobile
phone, even offline.


[![Travis](https://img.shields.io/travis/cloudfm/cloudfm.svg?style=flat-square)](https://travis-ci.org/cloudfm/cloudfm)

### Hacking

The server is written in Rust and requires a recent nightly version of the
Rust compiler. See [server/README.md](server/README.md) for further instructions.

The app requires Node.js 4 or newer. See [app/README.md](app/README.md)
for further instructions.

In order to run either, you need a CouchDB instance that is configured
with cors enabled:
```
[httpd]
enable_cors = true
[cors]
origins = *
credentials = true
methods = GET,PUT,POST,HEAD,DELETE
headers = accept, authorization, content-type, origin
```
Next, create a `.env` file at the project root with the database and server URL:

```
DATABASE_URL=http://localhost:5984
SERVER_URL=http://localhost:8423
SERVER_ADDR=127.0.0.1:8423
```

### Configuration

* `DATABASE_URL`: Public URL to the database
* `SERVER_URL`: Public URL to the server
* `SERVER_ADDR`: Server bind address
