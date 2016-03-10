use iron::{Handler, Request, Response, IronResult, status};
use router::Router;

pub struct Folder {
    path: String
}

impl Folder {
    pub fn new(path: &str) -> Folder {
        Folder {
            path: path.to_string()
        }
    }
}

impl Handler for Folder {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        Ok(Response::with((status::Ok, "Hello Folder!")))
    }
}
