#![feature(custom_derive, custom_attribute, plugin)]

extern crate iron;
extern crate mount;
extern crate router;
extern crate walkdir;
extern crate id3;
extern crate serde;
extern crate serde_json;
extern crate crypto;
extern crate couchdb;

use dotenv::dotenv;
use iron::prelude::*;
use diesel::prelude::*;
use mount::Mount;
use providers::Providers;
use auth::Auth;

fn main() {
    dotenv().ok();

    let mut mount = Mount::new();
    let providers = Providers::new();
    let auth = Auth::new();

    mount.mount("/v1/providers", providers);
    mount.mount("/v1/auth", auth);

    Iron::new(mount).http("localhost:3000").unwrap();
}

mod models;
mod providers;
mod db;
mod schema;
mod auth;
