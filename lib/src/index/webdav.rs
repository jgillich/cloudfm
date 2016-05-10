use chill;
use hyperdav::webdav;
use super::{Index, IndexError, Indexer};
use {DecodedTrack, WebdavUri, Uri, User, Error, WebdavBackend};

impl Indexer<WebdavBackend> for Index {
    fn index(db: &chill::Client, user: &User, backend: &WebdavBackend) -> Result<(), Error> {
        Ok(())
    }
}
