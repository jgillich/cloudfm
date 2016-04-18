extern crate cloudfm;
extern crate chill;
extern crate iron;
extern crate router;
extern crate logger;
extern crate dotenv;

use std::env;
use iron::Iron;
use iron::{IronResult, Request, Response, status};
use iron::middleware::Chain;
use router::Router;
use logger::Logger;
use dotenv::dotenv;


pub fn main() {
    dotenv().ok();

    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let db = chill::Client::new(&db_url).expect("DATABASE_URL must be a valid URL");


    let (logger_before, logger_after) = Logger::new(None);

    let mut router = Router::new();
    router.get("/tracks/:id", handle);

    let mut chain = Chain::new(router);
    chain.link_before(logger_before);
    chain.link_after(logger_after);

    let addr = env::var("PROXYD_ADDR").unwrap_or("127.0.0.1:8423".into());
    println!("proxyd starting on {}", addr);

    Iron::new(chain).http(addr.parse::<std::net::SocketAddr>().unwrap()).unwrap();
}

fn handle(req: &mut Request) -> IronResult<Response> {
    let ref id = req.extensions.get::<Router>().unwrap().find("id").unwrap();
    //let doc =
    Ok(Response::with((status::Ok, "TODO")))
}
