use {DocumentId};

#[derive(Serialize, Deserialize, Debug)]
pub struct Track {
    pub name: String,
    pub number: u32,
    pub artist: DocumentId,
    pub album: DocumentId,
    pub uri: String,
}
