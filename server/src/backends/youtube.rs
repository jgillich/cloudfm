use chill;
use std::path::PathBuf;
use super::Backend;
use super::super::{Error, Track, TrackUri};

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

    fn get_track(&self, uri: TrackUri) -> Result<PathBuf, Error> {
        panic!("not implemented");
    }
}
