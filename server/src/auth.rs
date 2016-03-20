use iron::{Handler, Request, Response, IronResult, status};
use mount::Mount;

pub struct Auth;

impl Auth {
    fn register(req: &mut Request) -> IronResult<Response> {
        Ok(Response::with((status::Ok, "get folder")))
    }
}

impl Handler for Auth {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        let mut router = Router::new();

        router.post("/register", Auth::register);

        router.handle(req)
    }
}
