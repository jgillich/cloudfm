use id3::Tag;
use super::{Document, Resource};
#[derive(Serialize, Deserialize, Debug)]
pub struct Song {
    pub artist: String,
    pub album: String,
    pub title: String,
    pub track: u32,
}

impl Song {
    pub fn from_tag(tag: Tag) -> Song {
        Song {
            artist: tag.artist().unwrap_or("Unkown Artist").to_string(),
            album: tag.album().unwrap_or("Unknown Album").to_string(),
            title: tag.title().unwrap_or("Unknown Title").to_string(),
            track: tag.track().unwrap_or(0),
        }
    }
}

impl Resource<Song> {
    pub fn from_tag(tag: Tag) -> Resource<Song> {
        Resource {
            type_: "song".to_string(),
            id: "1".to_string(),
            attributes: Song::from_tag(tag),
        }
    }
}

impl Document<Song> {
    pub fn from_tags(tags: Vec<Tag>) -> Document<Song> {
        Document {
            data: Some(tags.into_iter().map(|t| Resource::<Song>::from_tag(t)).collect()),
            errors: None,
        }
    }
}
