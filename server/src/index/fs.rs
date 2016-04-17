use id3::Tag;
use chill;
use super::Indexer;
use walkdir::{DirEntry, WalkDir};
use {Track, User, Artist, Album, Error};

pub struct Fs;

impl Indexer for Fs {
    fn index(user: &User, db: &chill::Client) -> Result<(), Error> {

        Ok(())
    }
}


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
