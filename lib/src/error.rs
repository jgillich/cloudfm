use std::env;
use std::error::Error as StdError;
use chill;
use jamendo;
use uri;
use views;

trait_enum! {
    enum Error: StdError {
        Env(env::VarError),
        Chill(chill::Error),
        Jamendo(jamendo::Error),
        View(views::ViewError),
        UriParse(uri::UriParseError),
    }
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

impl From<views::ViewError> for Error {
    fn from(err: views::ViewError) -> Error {
        Error::View(err)
    }
}

impl From<uri::UriParseError> for Error {
    fn from(err: uri::UriParseError) -> Error {
        Error::UriParse(err)
    }
}
