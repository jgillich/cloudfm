use std::collections::HashMap;
use iron::{Handler, Request, Response, IronResult, status};
use mount::Mount;
use chill;

pub use self::dropbox::Dropbox;
pub use self::fs::Fs;
pub use super::Error;
pub use super::models::*;
use std::env;

pub struct Providers {
    pub mount: Mount,
    providers: HashMap<String, Box<Provider>>,
}

impl Providers {
    pub fn new() -> Providers {
        let mut mount = Mount::new();
        let mut providers: HashMap<String, Box<Provider>> = HashMap::new();

        providers.insert("fs".to_string(), Box::new(Fs::new()));

        //for provider in providers.into_iter() {
        //    //mount.mount(format!("/{}", provider.name()), provider);
        //}

        Providers {
            mount: mount,
            providers: providers,
        }
    }

    pub fn index(&self) -> Result<(), Error> {
        let db = db!();

        for provider in self.providers.values() {
            provider.index(&db);
        }

        Ok(())
    }
}

impl Handler for Providers {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        self.mount.handle(req)
    }
}

trait Provider: Send + Sync + 'static {
    //fn name() -> &'static str;

    fn index(&self, &chill::Client) -> Result<(), Error>;
}

mod fs;
mod dropbox;
