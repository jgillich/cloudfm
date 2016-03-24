use chill;
use std::path::Path;
use super::Backend;
use super::super::{Error, Track};

pub struct Spotify {

}

impl Spotify {
    pub fn new() -> Spotify {
        Spotify {
        }
    }
}

impl Backend for Spotify {

    fn name(&self) -> &'static str {
        "spotify"
    }

    fn index(&self, db: &chill::Client) -> Result<(), Error> {
        Ok(())
    }

    fn get_file(&self, uri: &str) -> Result<&Path, Error> {
        panic!("not implemented");
    }
}
