use id3::Tag;
use chill;
use super::{Index, Indexer};
use walkdir::{DirEntry, WalkDir};
use {DecodedTrack, User, Error, FileBackend, Uri, FileUri, MACHINE_ID};

impl Indexer<FileBackend> for Index {
    fn index(db: &chill::Client, user: &User, backend: &FileBackend) -> Result<(), Error> {

        let mut tracks: Vec<DecodedTrack> = Vec::new();

        for path in &backend.paths {
            for entry in walk_path(&path) {
                if let Ok(tag) = Tag::read_from_path(entry.path()) {
                    if let Some(file_path) = entry.path().to_str() {
                        let uri = FileUri::new(&MACHINE_ID.to_string(), file_path);

                        tracks.push(DecodedTrack {
                            artist: tag.artist().unwrap_or("").into(),
                            album: tag.album().unwrap_or("").into(),
                            name: tag.title().unwrap_or("").into(),
                            number: tag.track().unwrap_or(0),
                            uri: Uri::File(uri),
                        });
                    }
                }
            }
        }

        Index::take_result(db, &user.db_name(), tracks)?;
        Ok(())
    }
}

fn is_file_type(e: &DirEntry, ext: &str) -> bool {
    let p = e.path();
    p.is_file() && p.extension().map_or(false, |s| s == ext)
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
