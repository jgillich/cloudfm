use chill;
use chill::{IntoDatabasePath, DocumentId};
use {DecodedTrack, User, Error, Artist, Album, Track, ImpossibleError};

mod file;
mod jamendo;

pub struct Index;

impl Index {
    pub fn take_result<'a, P>(db: &'a chill::Client, db_path: P, result: Vec<DecodedTrack>) -> Result<(), Error> where P: IntoDatabasePath<'a> {
        let db_path = db_path.into_database_path()?;

        let res = db.execute_view::<String, Option<i32>, _>((db_path, "cloudfm", "all_tracks"))?.run()?;
        let res = res.as_unreduced().ok_or(ImpossibleError::ViewReduced)?;
        let mut tracks: Vec<(DocumentId, String)> = res.rows().iter()
            .map(|a| (DocumentId::from(a.document_path().document_id()), a.key().clone())).collect();

        let res = db.execute_view::<String, Option<i32>, _>((db_path, "cloudfm", "all_albums"))?.run()?;
        let res = res.as_unreduced().ok_or(ImpossibleError::ViewReduced)?;
        let mut albums: Vec<(DocumentId, String)> = res.rows().iter()
            .map(|a| (DocumentId::from(a.document_path().document_id()), a.key().clone())).collect();

        let res = db.execute_view::<String, Option<i32>, _>((db_path, "cloudfm", "all_artists"))?.run()?;
        let res = res.as_unreduced().ok_or(ImpossibleError::ViewReduced)?;
        let mut artists: Vec<(DocumentId, String)> = res.rows().iter()
            .map(|a| (DocumentId::from(a.document_path().document_id()), a.key().clone())).collect();

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
