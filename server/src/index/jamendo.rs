
use id3::Tag;
use chill;
use super::Indexer;
use {Track, User, Artist, Album, Error};

pub struct Jamendo;

impl Indexer for Jamendo {
    fn index(user: &User, db: &chill::Client) -> Result<(), Error> {
        Ok(())
    }
}
