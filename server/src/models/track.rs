use id3::Tag;
use couchdb;
use uuid::Uuid;
use super::super::Error;

#[derive(Serialize, Deserialize, Debug)]
pub struct Track {
    pub id: String,
    pub rev: String,
    pub title: String,
    pub number: u32,
    pub artist: String,
    pub album: String,
}


impl Track {
    pub fn get(id: &str, client: couchdb::Client) -> Result<Track, Error> {
        // unwrap if safe since value may only be None if revision is specified
        Ok(try!(try!(client.get_document(&*format!("/tracks/{}", id)).run()).unwrap().into_content()))
    }

    pub fn from_tag(tag: Tag) -> Track {
        Track {
            id: Uuid::new_v4().to_simple_string(),
            rev: "".to_string(),
            artist: tag.artist().unwrap_or("Unkown Artist").to_string(),
            album: tag.album().unwrap_or("Unknown Album").to_string(),
            title: tag.title().unwrap_or("Unknown Title").to_string(),
            number: tag.track().unwrap_or(0),
        }
    }

    pub fn put(mut self, client: couchdb::Client) -> Result<Track, Error> {
        self.rev = format!("{}", try!(client.put_document(&*format!("/tracks/{}", self.id), &self).run()));
        Ok(self)
    }

}
