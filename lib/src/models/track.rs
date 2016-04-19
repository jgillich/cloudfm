use {DocumentId};

#[derive(Serialize, Deserialize, Debug)]
pub struct Track {
    pub name: String,
    pub number: u32,
    pub artist: DocumentId,
    pub album: DocumentId,
    pub uri: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct DecodedTrack {
    pub name: String,
    pub number: u32,
    pub artist: String,
    pub album: String,
    pub uri: String,
}
