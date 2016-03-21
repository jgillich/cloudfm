use iron::{Handler, Request, Response, IronResult, status};
use mount::Mount;
use couchdb;

pub use self::dropbox::Dropbox;
pub use self::fs::Fs;
pub use super::Error;
pub use super::models::*;


pub struct Providers {
    pub mount: Mount,
}


impl Providers {
    pub fn new() -> Providers {
        let mut mount = Mount::new();

        mount.mount("/dropbox", Dropbox);
        mount.mount("/fs", Fs);

        Providers { mount: mount }
    }
}

impl Handler for Providers {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        self.mount.handle(req)
    }
}

trait Indexer {
    fn index(&self, couchdb::Client) -> Result<(), Error>;
}


mod fs;
mod dropbox;
