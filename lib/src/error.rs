use std::{env, fmt, error};
use chill;
use jamendo;

#[derive(Debug)]
pub enum Error {
    Env(env::VarError),
    Chill(chill::Error),
    Jamendo(jamendo::Error),
    View(ViewError),
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

impl From<ViewError> for Error {
    fn from(err: ViewError) -> Error {
        Error::View(err)
    }
}

impl error::Error for Error {
    fn description(&self) -> &str {
        match self {
            &Error::Env(ref e) => e.description(),
            &Error::Chill(ref e) => e.description(),
            &Error::Jamendo(ref e) => e.description(),
            &Error::View(ref e) => match e {
                &ViewError::NewerRevision => "Database view revision is higher than ours"
            }
        }
    }

    fn cause(&self) -> Option<&error::Error> { None }
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter) -> Result<(), fmt::Error> {
        write!(f, "{}", error::Error::description(self))
    }
}

#[derive(Debug)]
pub enum ViewError {
    NewerRevision,
}
