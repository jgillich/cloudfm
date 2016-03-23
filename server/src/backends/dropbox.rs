use chill;
use super::{Backend, Error};

pub struct Dropbox {

}

impl Dropbox {
    pub fn new() -> Dropbox {
        Dropbox {
        }
    }
}

impl Backend for Dropbox {
    fn name(&self) -> &'static str {
        "dropbox"
    }

    fn index(&self, chill: &chill::Client) -> Result<(), Error> {

        Ok(())
    }
}
