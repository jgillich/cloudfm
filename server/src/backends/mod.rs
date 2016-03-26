use chill;
use std::path::PathBuf;
use super::Error;
use super::models::TrackUri;

pub use self::dropbox::Dropbox;
pub use self::fs::Fs;
pub use self::spotify::Spotify;

pub type Backends = Vec<Box<Backend>>;

pub trait Backend: Send + Sync {
    fn name(&self) -> &'static str;

    fn index(&self, &chill::Client) -> Result<(), Error>;

    fn get_track(&self, TrackUri) -> Result<PathBuf, Error>;
}

mod dropbox;
mod fs;
mod spotify;
