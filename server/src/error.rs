use std::env;
use chill;
use jamendo;

#[derive(Debug)]
pub enum Error {
    Env(env::VarError),
    Chill(chill::Error),
    Jamendo(jamendo::Error),
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

impl From<jamendo::Error> for Error {
    fn from(err: jamendo::Error) -> Error {
        Error::Jamendo(err)
    }
}
