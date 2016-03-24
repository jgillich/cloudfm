use std::env;
use chill;
use dbox;

#[derive(Debug)]
pub enum Error {
    Env(env::VarError),
    Chill(chill::Error),
    Dropbox(dbox::ApiError),
}

impl From<env::VarError> for Error {
    fn from(err: env::VarError) -> Error {
        Error::Env(err)
    }
}

impl From<chill::Error> for Error {
    fn from(err: chill::Error) -> Error {
        Error::Chill(err)
    }
}

impl From<dbox::ApiError> for Error {
    fn from(err: dbox::ApiError) -> Error {
        Error::Dropbox(err)
    }
}
