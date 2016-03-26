use iron::{IronResult, Request, Response, Handler};
use router::Router;

pub struct Routes {
    router: Router,
}

impl Routes {
    pub fn new() -> Routes {
        let mut router = Router::new();

        router.get("/tracks/:uri", get_track::GetTrack);

        Routes {
            router: router,
        }
    }

}

impl Handler for Routes {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        self.router.handle(req)
    }
}

 mod get_track;
