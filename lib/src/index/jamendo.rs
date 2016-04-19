
use id3::Tag;
use chill;
use super::{Index, Indexer};
use {Track, User, Artist, Album, Error, JamendoBackend};

impl Indexer<JamendoBackend> for Index {
    fn index(db: &chill::Client, user: &User, backend: &JamendoBackend) -> Result<(), Error> {
        Ok(())
    }
}
