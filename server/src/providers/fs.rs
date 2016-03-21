use iron::{Handler, Request, Response, IronResult, status};
use router::Router;
use walkdir::{DirEntry, WalkDir, WalkDirIterator};
use id3::Tag;
use couchdb;
use super::Track;
use super::Error;
use super::Indexer;

pub struct Fs;

impl Fs {
    fn get(req: &mut Request) -> IronResult<Response> {
        Ok(Response::with((status::Ok, "get folder")))
    }
}

impl Handler for Fs {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        let mut router = Router::new();

        router.get("/", Fs::get);

        router.handle(req)
    }
}

impl Indexer for Fs {
    fn index(&self, client: couchdb::Client) -> Option<Error> {
        fn is_file_type(e: DirEntry, ext: &str) -> bool {
            let p = e.path();
            p.is_file() && p.extension().map(|s| s == "mp3").unwrap_or(false)
        }


        fn is_music(e: DirEntry) -> bool {
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
                try!(Track::from_tag().put(client))
            }
        }

        None
    }
}
