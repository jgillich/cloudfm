use std::path::Path;
use std::error::Error;
use super::Indexer;
use super::super::db;

pub struct Fs {
    paths: Vec<Path>
}

impl Fs {
    pub fn new() -> Fs {
        Fs {
            paths: Vec::<Path>::new()
        }
    }
}

impl Indexer for Fs {
    pub fn index(&self) -> Option<Error> {
        let con = db::establish_connection();


    }
}
