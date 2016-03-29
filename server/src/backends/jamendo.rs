use std::path::PathBuf;
use walkdir::{DirEntry, WalkDir};
use id3::Tag;
use chill;
use base64;
use machine_id::MachineId;
use jamendo::{self, Client};
use super::Backend;
use Error;
use Track;
use TrackUri;

pub struct Jamendo {
    client: Client,
}

impl Jamendo {
    pub fn new() -> Self {
        Jamendo {
            client: Client::new(jamendo::TEST_ID),
        }
    }
}

impl Backend for Jamendo {

    fn name(&self) -> &'static str {
        "jamendo"
    }

    fn index(&self, db: &chill::Client) -> Result<(), Error> {
        // just insert some random tracks
        let tracks = self.client.get_tracks().run()?;

        for track in tracks {
            let model = Track {
                title: track.name,
                number: 0,
                artist: track.artist_name,
                album: track.album_name,
                uri: TrackUri::new(self.name(), "nop", &track.id),
            };

            model.create(db);
        }

        Ok(())
    }

    fn get_track(&self, uri: TrackUri) -> Result<PathBuf, Error> {
        panic!("not implemented");
    }
}
