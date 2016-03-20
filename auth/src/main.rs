extern crate iron;
extern crate router;

use iron::prelude::*;
use iron::status;
use router::Router;

fn main () {
    let mut router = Router::new();

    router.post("/v1/register", register);

    Iron::new(router).http("localhost:3001").unwrap();
}


fn register(req: &mut Request) -> IronResult<Response> {
    Ok(Response::with((status::Ok, "register")))
}
