use std::path::Path;
use super::Indexer;

pub struct Dropbox {
    paths: Vec<Path>
}

impl Dropbox {
    pub fn new() -> Dropbox {
        Dropbox {
            paths: Vec::<Path>::new()
        }
    }
}

impl Indexer for Dropbox {
    pub fn index(&self) {

    }
}
