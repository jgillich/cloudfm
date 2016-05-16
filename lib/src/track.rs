use chill::DocumentId;
use id3::Tag;
use Uri;

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
    pub fn new(name: &str,
               number: u32,
               artist: DocumentId,
               album: DocumentId,
               uris: Vec<Uri>)
               -> Self {
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

impl DecodedTrack {
    pub fn from_tag(tag: Tag, uri: Uri) -> Option<DecodedTrack> {

        let artist = match tag.artist() {
            Some(artist) => artist,
            None => return None,
        };

        let album = match tag.album() {
            Some(album) => album,
            None => return None,
        };

        let name = match tag.title() {
            Some(name) => name,
            None => return None,
        };

        let number = match tag.track() {
            Some(number) => number,
            None => return None,
        };

        Some(DecodedTrack {
            artist: artist.into(),
            album: album.into(),
            name: name.into(),
            number: number,
            uri: uri,
        })
    }
}
