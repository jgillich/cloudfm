use std::path::Path;
use iron::{Handler, Request, Response, IronResult, status};
use walkdir::{DirEntry, WalkDir, WalkDirIterator};
use id3::Tag;
use models::{Document, Song};
use base64;


pub struct Get;

impl Handler for Get {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        Ok(Response::with((status::Ok, Document::<Song>::from_tags(walk_dir("/home/jakob/Downloads")).to_json())))
    }
}

fn walk_dir(path: &str) -> Vec<(String, Tag)> {
    WalkDir::new(path)
        .into_iter()
        .filter_map(|e| e.ok())
        .filter_map(|e| filter_music(e))
        .collect()
}

fn filter_music(entry: DirEntry) -> Option<(String, Tag)> {
    match entry.metadata() {
        Ok(metadata) => {
            if !metadata.is_dir() && matches_extension(entry.path()) {
                match Tag::read_from_path(entry.path()) {
                    Ok(tag) => Some((generate_id(entry.path()), tag)),
                    Err(_) => None
                }
            } else {
                None
            }
        },
        Err(_) => None
    }
}

fn matches_extension(path: &Path) -> bool {
    match path.extension() {
        Some(ext) => {
            ext == "mp3"
            // TODO how to use match with OsStr?
            //match ext {
            //    "mp3" => true,
            //    "ogg" => true,
            //    _ => false
            //}
        }
        None => false
    }

}

fn generate_id(path: &Path) -> String {
    base64::encode(path.to_str().unwrap()).unwrap()
}
