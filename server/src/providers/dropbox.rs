use iron::{Handler, Request, Response, IronResult, status};
use router::Router;

pub struct Dropbox;

impl Dropbox {
    fn get(req: &mut Request) -> IronResult<Response> {
        Ok(Response::with((status::Ok, "get dropbox")))
    }
}

impl Handler for Dropbox {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        let mut router = Router::new();

        router.get("/", Dropbox::get);

        router.handle(req)
    }
}
