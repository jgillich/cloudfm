use iron::{Handler, Request, Response, IronResult, status};

pub struct Get;


impl Handler for Get {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
      Ok(Response::with((status::Ok, "Get Dropbox!")))
    }
}
