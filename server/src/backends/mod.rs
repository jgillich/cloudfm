use iron::{IronResult, Response};
use chill;
use {Error, TrackUri};

//mod dropbox;
mod fs;
mod jamendo;
//mod spotify;

//pub use self::dropbox::Dropbox;
pub use self::fs::Fs;
pub use self::jamendo::Jamendo;
//pub use self::spotify::Spotify;

pub type Backends = Vec<Box<Backend>>;

pub trait Backend: Send + Sync {
    fn name(&self) -> &'static str;

    fn index(&self, &chill::Client) -> Result<(), Error>;

    fn get_track(&self, TrackUri) -> IronResult<Response>;
}
