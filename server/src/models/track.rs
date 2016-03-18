use id3::Tag;
use super::{Document, Resource, Relationship};

#[derive(Queryable, Serialize, Deserialize, Debug)]
pub struct Track {
    #[serde(skip_serializing)]
    pub id: i32,
    pub title: String,
    pub number: u32,
    #[serde(skip_serializing)]
    pub artist: String,
    #[serde(skip_serializing)]
    pub album: String,
}

pub struct TrackRelationships {
    pub artist: Relationship,
    pub album: Relationship,
}

/*
impl Track {
    pub fn from_tag(tag: Tag) -> Track {
        Track {
            artist: tag.artist().unwrap_or("Unkown Artist").to_string(),
            album: tag.album().unwrap_or("Unknown Album").to_string(),
            title: tag.
            title().unwrap_or("Unknown Title").to_string(),
            number: tag.track().unwrap_or(0),
        }
    }
}

impl Resource<Track> {
    pub fn from_tag(id: String, tag: Tag) -> Resource<Track> {
        Resource {
            type_: "track".to_string(),
            id: id,
            attributes: Song::from_tag(tag),
        }
    }
}

impl Document<Track, TrackRelationships> {
    pub fn merge(tags: Vec<(String, Tag)>) {
        Document {
            data: Some(tags.into_iter().map(|(i, t)| Resource::<Song>::from_tag(i, t)).collect()),
            errors: None,
        }
    }
}
*/
