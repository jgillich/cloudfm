#![feature(custom_derive, custom_attribute, plugin)]
#![plugin(serde_macros, diesel_codegen, dotenv_macros)]

extern crate iron;
extern crate mount;
extern crate router;
extern crate walkdir;
extern crate id3;
extern crate serde;
extern crate serde_json;
extern crate crypto;
extern crate base64;
extern crate dotenv;
#[macro_use]
extern crate diesel;

use iron::prelude::*;
use diesel::prelude::*;
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
mod db;
mod schema;
