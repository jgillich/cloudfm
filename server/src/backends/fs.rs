use std::fs::File;
use iron::{IronResult, Response, status};
use walkdir::{DirEntry, WalkDir};
use id3::Tag;
use chill;
use base64;
use machine_id::MachineId;
use super::Backend;
use {Error, Track, TrackUri};

pub struct Fs {
    machine_id: String,
}

impl Fs {
    pub fn new() -> Self {
        Fs {
            machine_id: format!("{}", MachineId::get())
        }
    }
}

impl Backend for Fs {

    fn name(&self) -> &'static str {
        "fs"
    }

    fn index(&self, db: &chill::Client) -> Result<(), Error> {


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

    fn get_track(&self, uri: TrackUri) -> IronResult<Response> {
        let path = itry!(base64::decode(&uri.id));
        let file = itry!(File::open(path));
        Ok(Response::with((status::Ok, file)))
    }
}
