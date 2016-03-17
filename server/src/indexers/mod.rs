use std::error::Error;

pub use self::fs::Fs;

trait Indexer {
    fn index(&self) -> Error;
}

pub mod fs;
