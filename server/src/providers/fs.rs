use walkdir::{DirEntry, WalkDir, WalkDirIterator};
use id3::Tag;
use chill;
use super::Track;
use super::{Error, Provider};

pub struct Fs {
    name: String,
}

impl Fs {
    pub fn new() -> Fs {
        Fs {
            name: "fs".to_string()
        }
    }
}

impl Provider for Fs {

    //fn name() -> &'static str {
    //    "fs"
    //}

    fn index(&self, db: &chill::Client) -> Result<(), Error> {
        fn is_file_type(e: &DirEntry, ext: &str) -> bool {
            let p = e.path();
            p.is_file() && p.extension().map(|s| s == "mp3").unwrap_or(false)
        }


        fn is_music(e: &DirEntry) -> bool {
            is_file_type(e, "mp3") || is_file_type(e, "ogg")
        }

        fn walk_path(path: &str) -> Vec<Tag> {
            WalkDir::new(path)
                .into_iter()
                .filter_map(|e| e.ok())
                .filter(|e| is_music(e))
                .filter_map(|e| Tag::read_from_path(e.path()).ok())
                .collect()
        }

        // TODO fetch from db
        let paths = vec!["/home/jakob/Downloads"];

        for path in paths {
            for tag in walk_path(path) {
                try!(Track::from_tag(tag).create(db));
            }
        }

        Ok(())
    }
}
