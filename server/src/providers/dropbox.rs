use iron::{Handler, Request, Response, IronResult, status};
use router::Router;

pub struct Dropbox {
    user: String
}

impl Dropbox {
    pub fn new(user: &str) -> Dropbox {
        Dropbox {
            user: user.to_string()
        }
    }
}

impl Handler for Dropbox {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        Ok(Response::with((status::Ok, "Hello Dropbox!")))
    }
}
