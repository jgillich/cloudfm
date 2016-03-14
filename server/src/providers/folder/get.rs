use iron::{Handler, Request, Response, IronResult, status};
use walkdir::{DirEntry, WalkDir, WalkDirIterator};
use id3::Tag;

pub struct Get;


impl Handler for Get {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
      Ok(Response::with((status::Ok, index_files("/home/jakob/Downloads").into_iter().last().unwrap().artist().unwrap())))
    }
}


fn index_files(path: &str) -> Vec<Tag> {
    WalkDir::new(path)
      .into_iter()
      .filter_entry(|e| e.metadata().unwrap().is_dir() || e.file_name().to_str().unwrap().ends_with(".mp3")) // ugh
      .map(|e| e.unwrap())
      .filter(|e| !e.metadata().unwrap().is_dir())
      .map(|e| Tag::read_from_path(e.path()).unwrap())
      .collect()
}

