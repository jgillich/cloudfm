use iron::{Handler, Request, Response, IronResult, status};
use router::Router;


use self::get::Get;

pub struct Folder;

impl Handler for Folder {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        let mut router = Router::new();

        router.get("/", Get);

        router.handle(req)
    }
}

mod get;
