use chill::DocumentId;
use {Uri};

#[derive(Serialize, Deserialize, Debug)]
pub struct Track {
    #[serde(rename="type")]
    _type: String,
    pub name: String,
    pub number: u32,
    pub artist: DocumentId,
    pub album: DocumentId,
    pub uris: Vec<Uri>,
}

impl Track {
    pub fn new(name: &str, number: u32, artist: DocumentId, album: DocumentId, uris: Vec<Uri>) -> Self {
        Track {
            _type: "track".into(),
            name: name.into(),
            number: number,
            artist: artist,
            album: album,
            uris: uris,
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct DecodedTrack {
    pub name: String,
    pub number: u32,
    pub artist: String,
    pub album: String,
    pub uri: Uri,
}
