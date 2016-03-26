use chill;
use super::Error;
use std::path::Path;

pub use self::dropbox::Dropbox;
pub use self::fs::Fs;
pub use self::spotify::Spotify;

pub type Backends = Vec<Box<Backend>>;

impl Constructable<Backends> for Backends {
    fn new() -> Backends {
        vec![
            Box::new(Dropbox::new()),
            Box::new(Fs::new()),
            Box::new(Spotify::new()),
        ]
    }
}

pub trait Constructable<T> {
    fn new() -> T;
}

pub trait Backend: Send + Sync {
    fn name(&self) -> &'static str;

    fn index(&self, &chill::Client) -> Result<(), Error>;

    fn get_file(&self, &str) -> Result<&Path, Error>;
}

mod dropbox;
mod fs;
mod spotify;
