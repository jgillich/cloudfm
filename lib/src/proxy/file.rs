use iron::{IronResult, Response, status};
use std::fs::File;
use {FileUri, MACHINE_ID};
use super::{ProxyHandler, Proxy};

impl ProxyHandler<FileUri> for Proxy {
    fn handle(uri: FileUri) -> IronResult<Response> {
        if uri.machine_id != MACHINE_ID.to_string() {
            return Ok(Response::with((status::BadRequest, "machine_id does not match")));
        };

        match File::open(uri.file_path) {
            Ok(file) => Ok(Response::with((status::Ok, file))),
            // TODO better error handling
            Err(_) => Ok(Response::with((status::NotFound, "file not found"))),
        }
    }
}
