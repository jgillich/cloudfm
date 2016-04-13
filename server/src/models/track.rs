#[derive(Serialize, Deserialize, Debug)]
pub struct Track {
    pub title: String,
    pub number: u32,
    pub artist: String,
    pub album: String,
}
