use iron::response::WriteBody;
use chill;
use std::path::PathBuf;
use super::Backend;
use {Error, Track, TrackUri};

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

    fn get_track(&self, uri: TrackUri) -> Result<&WriteBody, Error> {
        panic!("not implemented");
    }
}
