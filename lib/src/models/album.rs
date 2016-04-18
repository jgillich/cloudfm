use {DocumentId};

#[derive(Serialize, Deserialize, Debug)]
pub struct Album {
    pub name: String,
    pub artist: DocumentId,
}
