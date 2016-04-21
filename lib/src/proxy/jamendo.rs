use iron::{IronResult, Response, status};
use {JamendoUri};
use super::{ProxyHandler, Proxy};
use hyper;
use iron::headers::ContentType;
use hyper::mime::{Mime, TopLevel, SubLevel};
use iron::response::BodyReader;
use jamendo;
use std::error::Error;

impl ProxyHandler<JamendoUri> for Proxy {
    fn handle(uri: JamendoUri) -> IronResult<Response> {
        // TODO make id configurable
        let jamendo_client = jamendo::Client::new(jamendo::TEST_ID);

        let tracks = match jamendo_client.get_tracks().id(uri.jamendo_id).run() {
            Ok(tracks) => tracks,
            Err(err) => return Ok(Response::with((status::InternalServerError, err.description()))),
        };

        let track = match tracks.first() {
            Some(track) => track,
            None => return Ok(Response::with((status::NotFound, "file not found"))),
        };

        let track = match hyper::Client::new().get(&track.audiodownload).send() {
            Ok(track) => track,
            Err(err) => return Ok(Response::with((status::InternalServerError, err.description()))),
        };

        let mut res = Response::with((status::Ok, BodyReader(track)));
        res.headers.set(ContentType(Mime(TopLevel::Audio, SubLevel::Ext("mpeg".into()), vec![])));
        Ok(res)
    }
}
