use iron::{IronResult, Response, status};
use std::fs::File;
use {FileUri};
use super::{ProxyHandler, Proxy};

impl ProxyHandler<FileUri> for Proxy {
    fn handle(uri: FileUri) -> IronResult<Response> {
        // TODO check machine
        println!("{:?}", uri);
        match File::open(uri.file_path) {
            Ok(file) => Ok(Response::with((status::Ok, file))),
            // TODO better error handling
            Err(_) => Ok(Response::with((status::NotFound, "file not found"))),
        }

    }
}
