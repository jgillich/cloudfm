use id3::Tag;
use chill;
use super::Indexer;
use walkdir::{DirEntry, WalkDir};
use {Track, User, Artist, Album};

pub struct Fs;

impl Indexer for Fs {
    pub fn index(user: &User, db: &chill::Client) -> Result<(), Error> {

        let artists: Vec<Artist> = Vec::new();
        let albums: Vec<Album> = Vec::new();
        let tracks: Vec<Track> = Vec::new();

        fn put_album(artist: Artist, album: Album, tag: Tag) {
        }

        fn put_artist(artist: Artist, tag: Tag) {
            db.create_document(user.db, artist).run();
            if let Ok(album) = tag.album() {
                put_album(artist, tag);
            }
        }

        fn put_tag(tag: Tag) {
            if let Ok(artist) = tag.artist() {
                put_artist(artist, tag);
            }
        }

        Ok(())
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
}
