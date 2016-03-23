use id3::Tag;
use chill;
use uuid::Uuid;
use super::super::Error;

#[derive(Serialize, Deserialize, Debug)]
pub struct Track {
    pub title: String,
    pub number: u32,
    pub artist: String,
    pub album: String,
    pub uri: String,
}


impl Track {
    pub fn from_id(id: &str, db: &chill::Client) -> Result<Track, Error> {
        let document = try!(db.read_document(("/tracks", id)).run());
        Ok(try!(document.get_content()))
    }

    pub fn from_tag(uri: String, tag: Tag) -> Track {
        Track {
            artist: tag.artist().unwrap_or("Unkown Artist").to_string(),
            album: tag.album().unwrap_or("Unknown Album").to_string(),
            title: tag.title().unwrap_or("Unknown Title").to_string(),
            number: tag.track().unwrap_or(0),
            uri: uri,
        }
    }

    pub fn create(mut self, db: &chill::Client) -> Result<(chill::DocumentId, chill::Revision), Error> {
        db.create_document("/tracks", &self).run().map_err(Error::from)
    }

}
