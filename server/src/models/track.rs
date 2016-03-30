use id3::Tag;
use chill;
use std::str;
use std::fmt;
use Error;

#[derive(Serialize, Deserialize, Debug)]
pub struct Track {
    pub title: String,
    pub number: u32,
    pub artist: String,
    pub album: String,
    pub uri: TrackUri,
}

impl Track {
    pub fn from_tag(uri: TrackUri, tag: Tag) -> Track {
        Track {
            artist: tag.artist().unwrap_or("Unkown Artist").to_string(),
            album: tag.album().unwrap_or("Unknown Album").to_string(),
            title: tag.title().unwrap_or("Unknown Title").to_string(),
            number: tag.track().unwrap_or(0),
            uri: uri,
        }
    }

    pub fn create(self, db: &chill::Client) -> Result<(chill::DocumentId, chill::Revision), Error> {
        db.create_document("/tracks", &self)?.run().map_err(Error::from)
    }

}

#[derive(Serialize, Deserialize, Debug)]
pub struct TrackUri {
    pub backend: String,
    pub owner: String,
    pub id: String,
}

impl TrackUri {
    pub fn new(backend: &str, owner: &str, id: &str) -> TrackUri {
        TrackUri {
            backend: backend.to_string(),
            owner: owner.to_string(),
            id: id.to_string(),
        }
    }

    pub fn to_string(&self) -> String {
        format!("{}", self)
    }
}

impl str::FromStr for TrackUri {
    type Err = ParseTrackUriError;

    fn from_str(s: &str) -> Result<TrackUri, ParseTrackUriError> {
        let parts = s.split(":").collect::<Vec<&str>>();
        if parts.len() != 3 {
            Err(ParseTrackUriError {})
        } else {
            let uri = TrackUri {
                backend: parts[0].to_string(),
                owner: parts[1].to_string(),
                id: parts[2].to_string(),
            };
            Ok(uri)
        }
    }
}

pub struct ParseTrackUriError;

impl fmt::Display for TrackUri {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}:{}:{}", self.backend, self.owner, self.id)
    }
}
