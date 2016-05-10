#![feature(custom_derive, plugin, question_mark, slice_patterns)]
#![plugin(serde_macros)]

// https://github.com/Manishearth/rust-clippy/issues/852
#![allow(used_underscore_binding)]

#![feature(type_ascription)]

extern crate hyper;
extern crate url;
extern crate iron;
extern crate logger;
extern crate router;
extern crate walkdir;
extern crate id3;
extern crate chill;
extern crate dotenv;
extern crate uuid;
extern crate serde;
extern crate serde_json;
extern crate jamendo;
extern crate hyperdav;
extern crate hex;
#[macro_use]
extern crate lazy_static;

// TODO support visibility modifier instead of using pub
macro_rules! trait_enum {

    (enum $name:ident: $_trait:ident { $($var:ident($ty:ty)),*, }) => {
        #[derive(Debug)]
        pub enum $name {
            $(
                $var($ty),
            )*
        }

        use std::ops::Deref;
        impl<'a> Deref for $name {
		    type Target = ($_trait + 'a);
		    fn deref(&self) -> &$_trait {
		        match *self {
                    $($name::$var(ref x) => x,)*
                }
		    }
		}
    }
}

lazy_static! {
    pub static ref MACHINE_ID: uuid::Uuid = {
        let file = std::fs::File::open("/etc/machine-id").unwrap();
        let mut line = std::io::BufRead::lines(std::io::BufReader::new(file)).next().unwrap().unwrap();
        line.truncate(32);
        uuid::Uuid::parse_str(&line).unwrap()
    };
}


pub mod index;
pub mod proxy;
pub mod album;
pub mod artist;
pub mod error;
pub mod track;
pub mod uri;
pub mod user;
pub mod views;

pub use index::{Index, Indexer};
pub use proxy::{Proxy, ProxyHandler};
pub use album::Album;
pub use artist::Artist;
pub use error::*;
pub use track::{Track, DecodedTrack};
pub use uri::{Uri, FileUri, JamendoUri, WebdavUri};
pub use user::{User, Backend, FileBackend, JamendoBackend, WebdavBackend};
