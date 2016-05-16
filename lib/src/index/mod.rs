use std::{error, fmt};
use chill;
use chill::IntoDatabasePath;
use {views, DecodedTrack, User, Error, Artist, Album, Track};

mod file;
mod jamendo;
mod webdav;

pub struct Index;

impl Index {
    pub fn take_result<'a, P>(db: &'a chill::Client,
                              db_path: P,
                              result: Vec<DecodedTrack>)
                              -> Result<(), Error>
        where P: IntoDatabasePath<'a>
    {
        let db_path = db_path.into_database_path()?;

        let mut tracks = views::all_tracks(db, db_path)?;
        let mut albums = views::all_albums(db, db_path)?;
        let mut artists = views::all_artists(db, db_path)?;

        for track in result {

            // Find or create artists
            let artist_id = match artists.iter().find(|&&(_, ref a)| a == &track.artist) {
                Some(&(ref id, _)) => Some(id.clone()),
                None => None,
            };
            let artist_id = match artist_id {
                Some(id) => id,
                None => {
                    let artist = Artist::new(&track.artist);
                    let (id, _) = db.create_document(db_path, &artist)?.run()?;
                    artists.push((id.clone(), track.artist.clone()));
                    id
                }
            };

            // Find or create album
            let album_id = {
                let mut id = None;
                let matches = albums.iter().filter(|&&(_, ref a)| a == &track.album);
                for &(ref doc_id, _) in matches {
                    let doc = db.read_document((db_path, doc_id))?.run()?;
                    let album: Album = doc.get_content()?;
                    if album.artist == artist_id {
                        id = Some(doc_id.clone());
                        break; // this should never be needed, maybe add a panic?
                    };
                }
                id
            };
            let album_id = match album_id {
                Some(id) => id.clone(),
                None => {
                    let album = Album::new(&track.album, artist_id.clone());
                    let (id, _) = db.create_document(db_path, &album)?.run()?;
                    albums.push((id.clone(), track.album.clone()));
                    id
                }
            };

            // Find or create track
            let track_id = {
                let mut id = None;
                let matches = tracks.iter().filter(|&&(_, ref a)| a == &track.name);
                for &(ref doc_id, _) in matches {
                    let doc = db.read_document((db_path, doc_id))?.run()?;
                    let track: Track = doc.get_content()?;
                    if track.artist == artist_id && track.album == album_id {
                        id = Some(doc_id.clone());
                        break; // this should never be needed, maybe add a panic?
                    };
                }
                id
            };
            match track_id {
                Some(_) => (),
                None => {
                    let track = Track::new(&track.name,
                                           track.number,
                                           artist_id,
                                           album_id,
                                           vec![track.uri]);
                    let (id, _) = db.create_document(db_path, &track)?.run()?;
                    tracks.push((id, track.name));
                }
            };
        }

        Ok(())
    }
}

pub trait Indexer<T> {
    fn index(&chill::Client, &User, &T) -> Result<(), Error>;
}

#[derive(Debug)]
pub enum IndexError {
    UserNotFound,
}

impl error::Error for IndexError {
    fn description(&self) -> &str {
        match *self {
            IndexError::UserNotFound => "user was not found",
        }
    }

    fn cause(&self) -> Option<&error::Error> {
        None
    }
}

impl fmt::Display for IndexError {
    fn fmt(&self, f: &mut fmt::Formatter) -> Result<(), fmt::Error> {
        write!(f, "{}", error::Error::description(self))
    }
}
