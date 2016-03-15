use iron::{Handler, Request, Response, IronResult, status};
use walkdir::{DirEntry, WalkDir, WalkDirIterator};
use id3::Tag;
use models::{Document, Song};


pub struct Get;

impl Handler for Get {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        Ok(Response::with((status::Ok, Document::<Song>::from_tags(walk_dir("/home/jakob/Downloads")).to_json())))
    }
}

fn walk_dir(path: &str) -> Vec<Tag> {
    WalkDir::new(path)
        .into_iter()
        .filter_entry(|e| {
            e.metadata().unwrap().is_dir() || e.file_name().to_str().unwrap().ends_with(".mp3")
        })
        .filter_map(|e| e.ok())
        .filter(|e| !e.metadata().unwrap().is_dir())
        .map(|e| Tag::read_from_path(e.path()))
        .filter_map(|t| t.ok())
        .collect()
}
