use std::{fmt, error};
use std::str::FromStr;
use serde;
use hex::{ToHex, FromHex};
use std::error::Error;

#[derive(Debug, PartialEq)]
pub enum Uri {
    File(FileUri),
    Jamendo(JamendoUri),
    Webdav(WebdavUri),
}

impl fmt::Display for Uri {
    fn fmt(&self, formatter: &mut fmt::Formatter) -> Result<(), fmt::Error> {
         match *self {
            Uri::File(ref uri) => write!(formatter, "file:{}:{}", uri.backend_id, uri.file_path.to_hex()),
            Uri::Jamendo(ref uri) => write!(formatter, "jamendo:{}:{}", uri.backend_id, uri.jamendo_id),
            Uri::Webdav(ref uri) => write!(formatter, "webdav:{}:{}", uri.backend_id, uri.file_path.to_hex()),
        }
    }
}

impl FromStr for Uri {

    type Err = UriParseError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let parts: Vec<&str> = s.split(':').collect();
            match &parts[..] {
                ["file", backend_id, file_path] => Ok(Uri::File(FileUri {
                    backend_id: backend_id.into(),
                    file_path: String::from_utf8(
                            Vec::from_hex(file_path).map_err(|_| UriParseError::UnknownFilePathEncoding)?
                        ).map_err(|_| UriParseError::UnknownFilePathEncoding)?,
                })),
                ["jamendo", backend_id, jamendo_id] => Ok(Uri::Jamendo(JamendoUri {
                    backend_id: backend_id.into(),
                    jamendo_id: jamendo_id.parse().map_err(|_| UriParseError::InvalidFormat)?,
                })),
                ["webdav", backend_id, file_path] => Ok(Uri::Webdav(WebdavUri {
                    backend_id: backend_id.into(),
                    file_path: String::from_utf8(
                            Vec::from_hex(file_path).map_err(|_| UriParseError::UnknownFilePathEncoding)?
                        ).map_err(|_| UriParseError::UnknownFilePathEncoding)?,
                })),
                _ => Err(UriParseError::InvalidFormat),
            }
    }
}

#[derive(Debug)]
pub enum UriParseError {
    UnknownFilePathEncoding,
    InvalidFormat,
}

impl error::Error for UriParseError {
    fn description(&self) -> &str {
        match *self {
            UriParseError::UnknownFilePathEncoding => "file_path is not hex encoded or invalid UTF8",
            UriParseError::InvalidFormat => "Invalid uri format",
        }
    }

    fn cause(&self) -> Option<&error::Error> { None }
}

impl fmt::Display for UriParseError {
    fn fmt(&self, f: &mut fmt::Formatter) -> Result<(), fmt::Error> {
        write!(f, "{}", error::Error::description(self))
    }
}


impl serde::Serialize for Uri {
    fn serialize<S>(&self, serializer: &mut S) -> Result<(), S::Error>
        where S: serde::Serializer
    {
        serializer.serialize_str(&self.to_string())
    }
}

impl serde::Deserialize for Uri {
    fn deserialize<D>(deserializer: &mut D) -> Result<Self, D::Error>
        where D: serde::Deserializer
    {
        struct Visitor;

        impl serde::de::Visitor for Visitor {
            type Value =  Uri;

            fn visit_str<E>(&mut self, value: &str) -> Result<Uri, E>
                where E: serde::de::Error,
            {
                value.parse::<Uri>().map_err(|e| E::custom(e.description()))
            }

        }

        deserializer.deserialize(Visitor)
    }
}

#[derive(Debug, PartialEq)]
pub struct FileUri {
    pub backend_id: String,
    pub file_path: String,
}

impl FileUri {
    pub fn new(backend_id: &str, file_path: &str) -> Self {
        FileUri {
            backend_id: backend_id.into(),
            file_path: file_path.into(),
        }
    }
}

#[derive(Debug, PartialEq)]
pub struct JamendoUri {
    pub backend_id: String,
    pub jamendo_id: u32,
}

impl JamendoUri {
    pub fn new(backend_id: &str, jamendo_id: u32) -> Self {
        JamendoUri {
            backend_id: backend_id.into(),
            jamendo_id: jamendo_id,
        }
    }
}

#[derive(Debug, PartialEq)]
pub struct WebdavUri {
    pub backend_id: String,
    pub file_path: String,
}

impl WebdavUri {
    pub fn new(backend_id: &str, file_path: &str) -> Self {
        WebdavUri {
            backend_id: backend_id.into(),
            file_path: file_path.into(),
        }
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn file_uri() {
        let uri = Uri::File(FileUri { backend_id: "foo-bar".into(), file_path: "/home/baz".into() });
        let uri_str = uri.to_string();
        assert_eq!(uri_str, "file:foo-bar:2f686f6d652f62617a");
        assert_eq!(uri, uri_str.parse::<Uri>().unwrap());
    }

    #[test]
    fn jamendo_uri() {
        let uri = Uri::Jamendo(JamendoUri { backend_id: "foo-bar".into(), jamendo_id: 123 });
        let uri_str = uri.to_string();
        assert_eq!(uri_str, "jamendo:foo-bar:123");
        assert_eq!(uri, uri_str.parse::<Uri>().unwrap());
    }

    #[test]
    fn webdav_uri() {
        let uri = Uri::Webdav(WebdavUri { backend_id: "foo-bar".into(), file_path: "/home/baz".into() });
        let uri_str = uri.to_string();
        assert_eq!(uri_str, "webdav:foo-bar:2f686f6d652f62617a");
        assert_eq!(uri, uri_str.parse::<Uri>().unwrap());
    }
}
