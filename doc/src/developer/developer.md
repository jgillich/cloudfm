# Developer documentation


## Quickstart

* Install Node.js 4 or newer
* Install Rust nightly

        $ curl -sSf https://static.rust-lang.org/rustup.sh | sh -s -- --channel=nightly

* Start CouchDB with the couchperuser extension

        docker-compose up -d db

* Enable CORS

        npm i -g add-cors-to-couchdb
        add-cors-to-couchdb

* Start the app

        cd app
        npm i -g webpack webpack-dev-server typings
        typings i
        webpack-dev-server

* Start the indexing service

        cd lib
        cargo run --bin indexd

Go to `http://localhost:8080`.
