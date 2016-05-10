use id3::Tag;
use chill;
use hyperdav::webdav;
use super::{Index, Indexer};
use {DecodedTrack, WebdavUri, Uri, User, Error, WebdavBackend};

impl Indexer<WebdavBackend> for Index {
    fn index(db: &chill::Client, user: &User, backend: &WebdavBackend) -> Result<(), Error> {
        let client = webdav::Client::new();
        let mut tracks: Vec<DecodedTrack> = Vec::new();

        for e in client.ls(backend.webdav_url.clone())? {
            if e.href.ends_with(".mp3") || e.href.ends_with("ogg") {
                if let Ok(mut res) = client.get(&e.href) {
                    if let Ok(tag) = Tag::read_from(&mut res) {
                        let uri = Uri::Webdav(WebdavUri::new(&backend.id, &e.href));

                        if let Some(track) = DecodedTrack::from_tag(tag, uri) {
                            tracks.push(track);
                        }
                    }
                }
            }
        }


        Index::take_result(db, &user.db_name(), tracks)?;
        Ok(())
    }
}
