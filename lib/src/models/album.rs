use chill::DocumentId;

#[derive(Serialize, Deserialize, Debug)]
pub struct Album {
    #[serde(rename="type")]
    _type: String,
    pub name: String,
    pub artist: DocumentId,
}

impl Album {
    pub fn new(name: &str, artist: DocumentId) -> Self {
        Album {
            _type: "album".into(),
            name: name.into(),
            artist: artist,
        }
    }
}
