use std::collections::HashMap;
use iron::{Handler, Request, Response, IronResult, status};
use mount::Mount;
use chill;

pub use self::dropbox::Dropbox;
pub use self::fs::Fs;
pub use super::Error;
pub use super::models::*;
use std::env;

pub struct Backends {
    pub mount: Mount,
    backends: HashMap<String, Box<Backend>>,
}

impl Backends {
    pub fn new() -> Backends {
        let mut mount = Mount::new();
        let mut backends: HashMap<String, Box<Backend>> = HashMap::new();

        backends.insert("fs".to_string(), Box::new(Fs::new()));

        //for Backend in Backends.into_iter() {
        //    //mount.mount(format!("/{}", Backend.name()), Backend);
        //}

        Backends {
            mount: mount,
            backends: backends,
        }
    }

    pub fn index(&self) -> Result<(), Error> {
        let db = db!();

        for backend in self.backends.values() {
            backend.index(&db);
        }

        Ok(())
    }
}

impl Handler for Backends {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        self.mount.handle(req)
    }
}

trait Backend: Send + Sync + 'static {
    //fn name() -> &'static str;

    fn index(&self, &chill::Client) -> Result<(), Error>;
}

mod fs;
mod dropbox;
