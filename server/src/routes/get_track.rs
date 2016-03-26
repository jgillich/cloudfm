use iron::{Handler, Request, Response, IronResult, status};
use router::Router;
use base64;
use std::path::Path;
use super::super::models::TrackUri;

pub struct GetTrack;

impl Handler for GetTrack {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        let ref uri_str = req.extensions.get::<Router>().unwrap().find("uri").unwrap_or("");
        match uri_str.parse::<TrackUri>() {
            // TODO call backend get_track instead
            Ok(uri) => match uri.backend() {
                "fs" => {
                    let path = base64::decode(uri.id()).unwrap();
                    Ok(Response::with((status::Ok, Path::new(&path))))
                },
                _ => Ok(Response::with((status::BadRequest, format!("backend {} does not support get_track", uri.backend()))))
            },
            Err(e) => Ok(Response::with((status::BadRequest, "track uri missing or invalid")))
        }

    }
}
