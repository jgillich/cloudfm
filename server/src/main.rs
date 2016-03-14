extern crate iron;
extern crate mount;
extern crate router;
extern crate walkdir;
extern crate id3;

use iron::prelude::*;
use iron::status;
use mount::Mount;
use providers::Providers;

fn main() {
    let mut mount = Mount::new();
    let providers = Providers::new();

    mount.mount("/v1", providers);

    Iron::new(mount).http("localhost:3000").unwrap();
}

mod models;
mod providers;
