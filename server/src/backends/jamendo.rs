use iron::response::BodyReader;
use iron::{IronResult, Response, status};
use iron::headers::ContentType;
use hyper::mime::{Mime, TopLevel, SubLevel};
use chill;
use hyper;
use jamendo::{self, Client};
use super::Backend;
use {Error, Track, TrackUri};

pub struct Jamendo {
    client: Client,
    hyper_client: hyper::Client,
}

impl Jamendo {
    pub fn new() -> Self {
        Jamendo {
            client: Client::new(jamendo::TEST_ID),
            hyper_client: hyper::Client::new(),
        }
    }
}

impl Backend for Jamendo {

    fn name(&self) -> &'static str {
        "jamendo"
    }

    fn index(&self, db: &chill::Client) -> Result<(), Error> {
        // just insert some random tracks
        let tracks = self.client.get_tracks().run()?;

        for track in tracks {
            let model = Track {
                title: track.name,
                number: 0,
                artist: track.artist_name,
                album: track.album_name,
                uri: TrackUri::new(self.name(), "TODO", &track.id),
            };

            try!(model.create(db));
        }

        Ok(())
    }

    fn get_track(&self, uri: TrackUri) -> IronResult<Response> {
        let id = itry!(uri.id.parse::<i32>());
        let tracks = itry!(self.client.get_tracks().id(id).run());
        let track = iexpect!(tracks.first());

        let track = itry!(self.hyper_client.get(&track.audiodownload).send());
        let mut res = Response::with((status::Ok, BodyReader(track)));
        res.headers.set(ContentType(Mime(TopLevel::Audio, SubLevel::Ext("mp3".into()), vec![])));

        Ok(res)
    }
}
