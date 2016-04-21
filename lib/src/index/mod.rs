use chill;
use chill::{IntoDatabasePath, DocumentId};
use {views, DecodedTrack, User, Error, Artist, Album, Track};

mod file;
mod jamendo;

pub struct Index;

impl Index {
    pub fn take_result<'a, P>(db: &'a chill::Client, db_path: P, result: Vec<DecodedTrack>) -> Result<(), Error> where P: IntoDatabasePath<'a> {
        let db_path = db_path.into_database_path()?;

        let mut tracks = views::all_tracks(db, db_path)?;
        let mut albums = views::all_albums(db, db_path)?;
        let mut artists = views::all_artists(db, db_path)?;

        for track in result {

            // is_new works around https://github.com/rust-lang/rfcs/issues/811
            // vec can't be mutated inside match block
            let (artist_id, is_new) = match artists.iter().find(|&&(_, ref a)| a == &track.artist) {
                Some(&(ref i, _)) => (i.clone(), false),
                None => {
                    let (id, _) = db.create_document(db_path, &Artist::new(&track.artist))?.run()?;
                    (id, true)
                }
            };
            if is_new {
                artists.push((artist_id.clone(), track.artist.clone()));
            };

            let (album_id, is_new) = match albums.iter().find(|&&(_, ref a)| a == &track.album) { // TODO compare artist
                Some(&(ref i, _)) => (i.clone(), false),
                None => {
                    let (id, _) = db.create_document(db_path, &Album::new(&track.album, artist_id.clone()))?.run()?;
                    (id, true)
                }
            };
            if is_new {
                albums.push((album_id.clone(), track.album.clone()));
            };

            let new_track = match tracks.iter().find(|&&(_, ref t)| t == &track.name) { // TODO compare album, artist
                Some(&(_, _)) => None, // TODO read track, compare uris
                None => {
                    let track = Track::new(&track.name, track.number, artist_id, album_id, vec![track.uri]);
                    let (id, _) = db.create_document(db_path, &track)?.run()?;
                    Some((id, track.name))
                }
            };
            if let Some(t) = new_track {
                tracks.push(t);
            }

        }

        Ok(())
    }
}

pub trait Indexer<T> {
    fn index(&chill::Client, &User, &T) -> Result<(), Error>;
}
