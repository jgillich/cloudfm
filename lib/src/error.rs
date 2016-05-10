use std::env;
use std::error::Error as StdError;
use chill;
use jamendo;
use uri;
use views;
use index;
use hyperdav;

trait_enum! {
    enum Error: StdError {
        Env(env::VarError),
        Chill(chill::Error),
        Jamendo(jamendo::Error),
        View(views::ViewError),
        UriParse(uri::UriParseError),
        Index(index::IndexError),
        Webdav(hyperdav::Error),
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

impl From<index::IndexError> for Error {
    fn from(err: index::IndexError) -> Error {
        Error::Index(err)
    }
}

impl From<hyperdav::Error> for Error {
    fn from(err: hyperdav::Error) -> Error {
        Error::Webdav(err)
    }
}
