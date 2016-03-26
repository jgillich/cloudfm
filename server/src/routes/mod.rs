use iron::{IronResult, Request, Response, Handler};
use router::Router;
use std::sync::Arc;
use super::backends::Backends;
use self::get_track::GetTrack;

pub struct Routes {
    router: Router,
    backends: Arc<Backends>,
}

impl Routes {
    pub fn new(backends: Arc<Backends>) -> Routes {
        let mut router = Router::new();

        router.get("/tracks/:uri", GetTrack::new(backends.clone()));

        Routes {
            router: router,
            backends: backends
        }
    }

}

impl Handler for Routes {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        self.router.handle(req)
    }
}

 mod get_track;
