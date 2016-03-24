use std::env;
use error::Error;
use router::Router;
use mount::Mount;
use chill;
use iron::Iron;
use super::backends::{Dropbox, Fs, Spotify, Backend};

pub struct Server {
    mount: Mount,
    db: chill::Client,
    backends: Vec<Box<Backend>>
}

impl Server {

    pub fn new() -> Server {
        let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

        let backends: Vec<Box<Backend>> = vec![
            Box::new(Dropbox::new()),
            Box::new(Fs::new()),
            Box::new(Spotify::new()),
        ];

        Server {
            mount: Mount::new(),
            db: chill::Client::new(&db_url).expect("DATABASE_URL must be a valid URL"),
            backends: backends,
        }
    }

    pub fn start(mut self) {
        self.init_db().expect("failed to initialize database");
        self.init_routes().expect("failed to initialize routes");

        Iron::new(self.mount).http("localhost:3000").unwrap();
    }

    fn init_db(&mut self) -> Result<(), Error> {
        let paths = vec![ "/tracks" ];

        for path in paths {
            if let Err(e) = self.db.create_database("/tracks").run() {
                match e {
                    chill::Error::DatabaseExists(err) => (),
                    _ => return Err(Error::from(e))
                }
            }
        }

        Ok(())
    }

    fn init_routes(&mut self) -> Result<(), Error> {
        let router = Router::new();

        //router.get("/tracks/:uri", )

        self.mount.mount("/v1", router);
        Ok(())
    }

    fn index(&mut self) -> Result<(), Error> {
        for backend in self.backends.iter() {
            if let Err(err) = backend.index(&self.db) {
                // TODO log error
            }
        }

        Ok(())
    }

}
