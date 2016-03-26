use iron::{Handler, Request, Response, IronResult, status};
use router::Router;
use super::super::models::TrackUri;

pub struct GetTrack;

impl Handler for GetTrack {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        let ref uri_str = req.extensions.get::<Router>().unwrap().find("uri").unwrap_or("");
         match uri_str.parse::<TrackUri>() {
             Ok(uri) => Ok(Response::with((status::Ok, "Hello World!"))),
             Err(e) => Ok(Response::with((status::BadRequest, "track uri missing or invalid")))
         }

    }
}
