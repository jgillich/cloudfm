use chill;
use {Track, User, Artist, Album, Error};

mod fs;
mod jamendo;

pub use self::fs::Fs;
pub use self::jamendo::Jamendo;

pub struct Index;

pub trait Indexer {
    fn index(&User, &chill::Client) -> Result<(), Error>;
}

