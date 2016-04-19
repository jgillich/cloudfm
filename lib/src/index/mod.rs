use chill;
use {Track, User, Artist, Album, Error};

mod fs;
mod jamendo;

pub struct Index;

pub trait Indexer<T> {
    fn index(&chill::Client, &User, &T) -> Result<(), Error>;
}

