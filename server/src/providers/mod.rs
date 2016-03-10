use iron::{Handler, Request, Response, IronResult, status};
use mount::Mount;

pub use self::dropbox::Dropbox;
pub use self::folder::Folder;


pub struct Providers {
    mount: Mount
}


impl Providers {
    pub fn new() -> Providers {
        let mut mount = Mount::new();

        let dropbox = Dropbox::new(&"john");
        let folder = Folder::new(&"/");

        mount.mount("/dropbox", dropbox);
        mount.mount("/folder", folder);

        Providers {
            mount: mount
        }
    }
}

impl Handler for Providers {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        self.mount.handle(req)
    }
}


mod folder;
mod dropbox;
