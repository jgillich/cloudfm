use chill;
use std::path::PathBuf;
use super::Backend;
use super::super::{Error, Track, TrackUri};

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

    fn get_track(&self, uri: TrackUri) -> Result<PathBuf, Error> {
        panic!("not implemented");
    }
}
