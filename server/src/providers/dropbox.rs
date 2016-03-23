use chill;
use super::{Provider, Error};

pub struct Dropbox {
    name: String,
}

impl Dropbox {
    pub fn new() -> Dropbox {
        Dropbox {
            name: "dropbox".to_string()
        }
    }
}
impl Provider for Dropbox {
    //fn name() -> &'static str {
    //    "dropbox"
    //}

    fn index(&self, chill: &chill::Client) -> Result<(), Error> {

        Ok(())
    }
}
