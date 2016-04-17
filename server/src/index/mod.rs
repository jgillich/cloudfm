use chill;
use {Track, User, Artist, Album, Error};

mod fs;

pub use fs::Fs;

pub struct Index;

pub trait Indexer {
    fn index(&User, &chill::Client) -> Result<IndexResult, Error>;
}

pub struct IndexResult {
    pub albums: Vec<Album>,
    pub artists: Vec<Artist>,
    pub tracks: Vec<Track>,
}

impl IndexResult {
    pub fn new() -> Self {
        Default::default()
    }
}
