use std::{fmt, env, error};
use chill;
use jamendo;
use uri;
use views;

#[derive(Debug)]
pub enum Error {
    Env(env::VarError),
    Chill(chill::Error),
    Jamendo(jamendo::Error),
    View(views::ViewError),
    UriParse(uri::UriParseError),
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

impl error::Error for Error {
    fn description(&self) -> &str {
        match self {
            &Error::Env(ref e) => e.description(),
            &Error::Chill(ref e) => e.description(),
            &Error::Jamendo(ref e) => e.description(),
            &Error::View(ref e) => e.description(),
            &Error::UriParse(ref e) => e.description(),
        }
    }

    fn cause(&self) -> Option<&error::Error> { None }
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter) -> Result<(), fmt::Error> {
        write!(f, "{}", error::Error::description(self))
    }
}
