use std::path::PathBuf;
use walkdir::{DirEntry, WalkDir};
use id3::Tag;
use chill;
use base64;
use super::Backend;
use super::super::{Error, Track, TrackUri};

pub struct Fs {
    machine_id: String,
}

impl Fs {
    pub fn new() -> Fs {
        Fs {
            machine_id: "notYetUniqueMachineId".to_string() // FIXME
        }
    }
}

impl Backend for Fs {

    fn name(&self) -> &'static str {
        "fs"
    }

    fn index(&self, db: &chill::Client) -> Result<(), Error> {
        fn is_file_type(e: &DirEntry, ext: &str) -> bool {
            let p = e.path();
            p.is_file() && p.extension().map(|s| s == ext).unwrap_or(false)
        }


        fn is_music(e: &DirEntry) -> bool {
            is_file_type(e, "mp3") || is_file_type(e, "ogg")
        }

        fn walk_path(path: &str) -> Vec<DirEntry> {
            WalkDir::new(path)
                .into_iter()
                .filter_map(|e| e.ok())
                .filter(|e| is_music(e))
                .collect()
        }

        let paths = vec!["/home/jakob/Downloads"]; // TODO fetch from db

        for path in paths {
            for entry in walk_path(path) {
                if let Ok(tag) = Tag::read_from_path(entry.path()) {
                    let id = base64::encode(entry.path().to_str().unwrap()).unwrap();
                    let uri = TrackUri::new("fs", &self.machine_id, &id);
                    try!(Track::from_tag(uri, tag).create(db));
                }
            }
        }

        Ok(())
    }

    fn get_track(&self, uri: TrackUri) -> Result<PathBuf, Error> {
        let path = base64::decode(uri.id()).unwrap();
        Ok(PathBuf::from(path))
    }
}
