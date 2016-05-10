extern crate cloudfm;
extern crate chill;
extern crate iron;
extern crate router;
extern crate logger;
extern crate dotenv;
extern crate serde;

use std::env;
use iron::Iron;
use iron::{IronResult, Request, Response};
use iron::middleware::Chain;
use router::Router;
use logger::Logger;
use dotenv::dotenv;
use cloudfm::{Uri, Proxy, ProxyHandler};

pub fn main() {
    dotenv().ok();

    let (logger_before, logger_after) = Logger::new(None);

    let mut router = Router::new();
    router.get("/tracks/:uri", handle);

    let mut chain = Chain::new(router);
    chain.link_before(logger_before);
    chain.link_after(logger_after);

    let addr = env::var("PROXYD_ADDR").unwrap_or("127.0.0.1:8423".into());
    println!("proxyd starting on {}", addr);

    Iron::new(chain).http(addr.parse::<std::net::SocketAddr>().unwrap()).unwrap();
}

fn handle(req: &mut Request) -> IronResult<Response> {
    let ref uri = req.extensions.get::<Router>().unwrap().find("uri").unwrap();

    // FIXME proper format handling
    let uri = uri.replace(".mp3", "");
    let uri = uri.parse::<Uri>().unwrap();

    match uri {
        Uri::File(u) => Proxy::handle(u),
        Uri::Jamendo(u) => Proxy::handle(u),
        Uri::Webdav(u) => Proxy::handle(u),
    }
}
