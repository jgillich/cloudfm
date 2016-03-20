extern crate hyper;

use std::error::Error;
use std::io::Read;
use hyper::Client;


pub use db::Db;

pub struct CouchDB {
    server: Server,
}


impl CouchDB {

    pub fn new(host: &str) -> CouchDB {
        CouchDB {
            host: host.to_string()
        }
    }

    // get /_all_dbs -> ["_replicator","_users"]
    pub fn get_all_dbs(&self) -> Result<Vec<Db>, Error> {
        let mut res = client.get("/_all_dbs")
          .send().unwrap();


        let mut body = String::new();
        res.read_to_string(&mut body).unwrap();
    }

    pub fn get_db(&self, name: &str) -> Result<Db, Error> {

    }


    pub fn create_db(&self, name: &str) -> Result<Db, Error> {
      // put /name -> {"ok":true}
    }
}



pub mod db;
