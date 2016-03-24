use iron::prelude::*;
use iron::status;
use router::Router;
use super::models::TrackUri;

fn get_track(_: &mut Request) -> IronResult<Response> {
    let ref uri_str = req.extensions.get::<Router>().unwrap().find("uri").unwrap_or("");
    //let uri
    Ok(Response::with((status::Ok, "Hello World!")))
}
