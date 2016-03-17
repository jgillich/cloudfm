use std::path::Path;
use super::Indexer;

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
    pub fn index(&self) {

    }
}
