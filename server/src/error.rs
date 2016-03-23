use std::env;
use chill;

#[derive(Debug)]
pub enum Error {
    Env(env::VarError),
    Chill(chill::Error),
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
