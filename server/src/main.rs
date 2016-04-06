#![feature(custom_derive, plugin, question_mark)]
#![plugin(serde_macros)]

extern crate hyper;
#[macro_use] extern crate iron;
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
extern crate base64;
extern crate machine_id;
extern crate jamendo;
extern crate logger;
extern crate staticfile;

mod models;
mod backends;
mod error;
mod server;
mod routes;

pub use error::Error;
pub use models::*;

fn main() {
    server::Server::new().start();
}
