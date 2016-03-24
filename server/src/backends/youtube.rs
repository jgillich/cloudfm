use chill;
use std::path::Path;
use super::Backend;
use super::super::{Error, Track};

pub struct Youtube {

}

impl Youtube {
    pub fn new() -> Youtube {
        Youtube {
        }
    }
}

impl Backend for Youtube {

    fn name(&self) -> &'static str {
        "youtube"
    }

    fn index(&self, db: &chill::Client) -> Result<(), Error> {
        Ok(())
    }

    fn get_file(&self, uri: &str) -> Result<&Path, Error> {
        panic!("not implemented");
    }
}
