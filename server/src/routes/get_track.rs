use iron::{Handler, Request, Response, IronResult, status};
use router::Router;
use base64;
use std::sync::Arc;
use std::path::Path;
use super::super::backends::Backends;
use super::super::models::TrackUri;

pub struct GetTrack {
    backends: Arc<Backends>
}

impl GetTrack {
    pub fn new(backends: Arc<Backends>) -> GetTrack {
        GetTrack {
            backends: backends,
        }
    }
}

impl Handler for GetTrack {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        let ref uri_str = req.extensions.get::<Router>().unwrap().find("uri").unwrap_or("");
        match uri_str.parse::<TrackUri>() {
            Ok(uri) => {
                // TODO maybe storing them in a HashMap would be smarter..
                for backend in self.backends.iter() {
                    if backend.name() == uri.backend {
                        return backend.get_track(uri);
                    }
                }
                Ok(Response::with((status::BadRequest, "unknown backend")))
            },
            Err(e) => Ok(Response::with((status::BadRequest, "track uri missing or invalid")))
        }

    }
}
