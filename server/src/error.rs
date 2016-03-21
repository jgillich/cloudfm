use couchdb;

#[derive(Debug)]
pub enum Error {
    CouchDB(couchdb::Error),
}


impl From<couchdb::Error> for Error {
    fn from(err: couchdb::Error) -> Error {
        Error::CouchDB(err)
    }
}
