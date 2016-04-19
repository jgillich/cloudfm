use chill;
use chill::{IntoDatabasePath, IntoViewPath};
use {DecodedTrack, User, Error, ImpossibleError};

mod fs;
mod jamendo;

pub struct Index;

impl Index {
    pub fn take_result<'a, P>(db: &'a chill::Client, db_path: P, result: Vec<DecodedTrack>) -> Result<(), Error> where P: IntoDatabasePath<'a> {
        let db_path = db_path.into_database_path()?;

        let res = db.execute_view::<String, Option<String>, _>((db_path, "cloudfm", "all_tracks"))?.run()?;
        let res = res.as_unreduced().ok_or(ImpossibleError::ViewReduced)?;
        let tracks = res.rows();

        let res = db.execute_view::<String, Option<String>, _>((db_path, "cloudfm", "all_albums"))?.run()?;
        let res = res.as_unreduced().ok_or(ImpossibleError::ViewReduced)?;
        let albums = res.rows();

        let res = db.execute_view::<String, Option<String>, _>((db_path, "cloudfm", "all_artists"))?.run()?;
        let res = res.as_unreduced().ok_or(ImpossibleError::ViewReduced)?;
        let artists = res.rows();

        for track in result {

        }

        Ok(())
    }
}

pub trait Indexer<T> {
    fn index(&chill::Client, &User, &T) -> Result<(), Error>;
}
