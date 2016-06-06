use iron::{IronResult, Response, status};
use iron::headers::{ContentType, ContentLength};
use hyper::mime::{Mime, TopLevel, SubLevel};
use std::fs::File;
use FileUri;
use super::{ProxyHandler, Proxy};

impl ProxyHandler<FileUri> for Proxy {
    fn handle(uri: FileUri) -> IronResult<Response> {
        match File::open(uri.file_path) {
            Ok(file) => {
                let length = file.metadata().unwrap().len();
                let mut res = Response::with((status::Ok, file));
                res.headers.set(ContentLength(length));
                res.headers
                    .set(ContentType(Mime(TopLevel::Audio, SubLevel::Ext("mpeg".into()), vec![])));
                Ok(res)
            }
            // TODO better error handling
            Err(_) => Ok(Response::with((status::NotFound, "file not found"))),
        }
    }
}
