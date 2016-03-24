use std::env;
use std::path::Path;
use chill;
use dbox::client::Client;
use dbox::files;
use super::Backend;
use super::super::Error;

pub struct Dropbox {

}

impl Dropbox {
    pub fn new() -> Dropbox {
        Dropbox {
        }
    }
}

impl Backend for Dropbox {
    fn name(&self) -> &'static str {
        "dropbox"
    }

    fn index(&self, chill: &chill::Client) -> Result<(), Error> {
        // TODO fetch from db for user
        let client = try!(Client::new(&env::var("DROPBOX_TOKEN").unwrap()));

        // FIXME SIGSEGV: invalid memory reference
        //let folder_list = try!(files::list_folder(&client, "")); // TODO make folder configurable

        //for metadata in folder_list.entries.iter() {
        //    println!("{}", metadata.name);
        //}
        Ok(())
    }

    fn get_file(&self, uri: &str) -> Result<&Path, Error> {
        panic!("not implemented");
    }
}
