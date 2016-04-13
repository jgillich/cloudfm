use std::env;
use error::Error;
use mount::Mount;
use chill;
use iron::Iron;
use std::sync::Arc;
use logger::Logger;
use iron::middleware::Chain;
use dotenv::dotenv;
use std::net::SocketAddr;
use std::path::Path;
use staticfile::Static;

pub struct Server {
    routes: Routes,
    db: chill::Client
}

impl Server {

    pub fn new() -> Server {
        dotenv().ok();

        let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let db = chill::Client::new(&db_url).expect("DATABASE_URL must be a valid URL");

        Server {
            db: db,
        }
    }

    pub fn start(mut self) {
        index::index_all();

        let (logger_before, logger_after) = Logger::new(None);

        let mut mount = Mount::new();
        mount.mount("/v1", self.routes);
        mount.mount("/", Static::new(Path::new("static/")));

        let mut chain = Chain::new(mount);
        chain.link_before(logger_before);
        chain.link_after(logger_after);

        let addr = env::var("SERVER_ADDR").unwrap_or("127.0.0.1:8423".into());
        println!("Starting server on {}", addr);

        Iron::new(chain).http(addr.parse::<SocketAddr>().unwrap()).unwrap();
    }

}
