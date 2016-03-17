use iron::{Handler, Request, Response, IronResult, status};
use router::Router;

pub struct Fs;

impl Fs {
    fn get(req: &mut Request) -> IronResult<Response> {
        Ok(Response::with((status::Ok, "get folder")))
    }
}

impl Handler for Fs {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        let mut router = Router::new();

        router.get("/", Fs::get);

        router.handle(req)
    }
}
