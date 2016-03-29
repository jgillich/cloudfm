use std::env;
use std::path::PathBuf;
use chill;
use super::Backend;
use super::super::{Error, TrackUri};

pub struct Dropbox {

}

impl Dropbox {
    pub fn new() -> Dropbox {
        Dropbox {
        }
    }
}

impl Backend for Dropbox {
    fn name(&self) -> &'static str {
        "dropbox"
    }

    fn index(&self, chill: &chill::Client) -> Result<(), Error> {
        Ok(())
    }

    fn get_track(&self, uri: TrackUri) -> Result<PathBuf, Error> {
        panic!("not implemented");
    }
}
