use chill;
use super::Error;
use std::path::Path;

pub use self::dropbox::Dropbox;
pub use self::fs::Fs;
pub use self::spotify::Spotify;

pub type Backends = Vec<Box<Backend>>;

pub trait Backend: Send + Sync {
    fn name(&self) -> &'static str;

    fn index(&self, &chill::Client) -> Result<(), Error>;

    fn get_file(&self, &str) -> Result<&Path, Error>;
}

mod dropbox;
mod fs;
mod spotify;
