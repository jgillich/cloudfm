use couchdb;

#[derive(Debug)]
pub enum Error {
    CouchDB(couchdb::Error),
}
