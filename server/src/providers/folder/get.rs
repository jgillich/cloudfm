use iron::{Handler, Request, Response, IronResult, status};
use walkdir::{DirEntry, WalkDir, WalkDirIterator};
use id3::Tag;
use models::{Document, Resource, Song};
use serde_json;

pub struct Get;

impl Handler for Get {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        let songs = index_files("/home/jakob/Downloads");
        let doc = Document::<Song>::from_tags(songs);

        // Ok(Response::with((status::Ok, song.artist)))
        Ok(Response::with((status::Ok, serde_json::to_string(&doc).unwrap())))
    }
}

fn index_files(path: &str) -> Vec<Tag> {
    WalkDir::new(path)
        .into_iter()
        .filter_entry(|e| {
            e.metadata().unwrap().is_dir() || e.file_name().to_str().unwrap().ends_with(".mp3")
        })
        .filter(|e| e.is_ok())
        .map(|e| e.unwrap())
        .filter(|e| !e.metadata().unwrap().is_dir())
        .map(|e| Tag::read_from_path(e.path()))
        .filter(|t| t.is_ok())
        .map(|t| t.unwrap())
        .collect()
}
