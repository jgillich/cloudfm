#![feature(custom_derive, plugin)]
#![plugin(serde_macros)]

extern crate iron;
extern crate mount;
extern crate router;
extern crate walkdir;
extern crate id3;
extern crate crypto;
extern crate chill;
extern crate dotenv;
extern crate uuid;
extern crate serde;
extern crate serde_json;
extern crate dbox;

use dotenv::dotenv;
use server::Server;

pub use error::Error;
pub use models::*;

fn main() {
    dotenv().ok();
    Server::new().start();
}

mod models;
mod backends;
mod error;
mod server;
