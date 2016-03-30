use std::env;
use error::Error;
use router::Router;
use mount::Mount;
use chill;
use iron::Iron;
use std::sync::Arc;
use super::backends::{Backends, Fs, Jamendo, Backend};
use super::routes::Routes;

pub struct Server {
    routes: Routes,
    db: chill::Client,
    backends: Arc<Backends>
}

impl Server {

    pub fn new() -> Server {
        let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let db = chill::Client::new(&db_url).expect("DATABASE_URL must be a valid URL");

        let backends: Arc<Backends> = Arc::new(vec![
            //Box::new(Fs::new()),
            Box::new(Jamendo::new()),
        ]);

        // create databases
        for path in vec![ "/tracks" ] {
            if let Err(e) = db.create_database("/tracks").unwrap().run() {
                match e {
                    chill::Error::DatabaseExists(err) => (),
                    _ => Err(Error::from(e)).unwrap()
                }
            }
        }

        Server {
            backends: backends.clone(),
            routes: Routes::new(backends),
            db: db,

        }
    }

    pub fn start(mut self) {
        self.index(); // TODO move somewhere else
        let mut mount = Mount::new();
        mount.mount("/v1", self.routes);
        Iron::new(mount).http("localhost:3000").unwrap();
    }

    fn index(&mut self) -> Result<(), Error> {
        for backend in self.backends.iter() {
            backend.index(&self.db).unwrap();
            if let Err(err) = backend.index(&self.db) {
                // TODO log error
            }
        }

        Ok(())
    }

}
