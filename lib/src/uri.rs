use std::{fmt, error};
use std::str::FromStr;
use serde;
use hex::{ToHex, FromHex};
use std::error::Error;

#[derive(Debug, PartialEq)]
pub enum Uri {
    File(FileUri),
    Jamendo(JamendoUri),
}

impl fmt::Display for Uri {
    fn fmt(&self, formatter: &mut fmt::Formatter) -> Result<(), fmt::Error> {
         match self {
            &Uri::File(ref uri) => write!(formatter, "file:{}:{}", uri.machine_id, uri.file_path.to_hex()),
            &Uri::Jamendo(ref uri) => write!(formatter, "jamendo:{}", uri.jamendo_id),
        }
    }
}

impl FromStr for Uri {

    type Err = UriParseError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let parts: Vec<&str> = s.split(':').collect();
            match &parts[..] {
                ["file", machine_id, file_path] => Ok(Uri::File(FileUri {
                    machine_id: machine_id.into(),
                    file_path: String::from_utf8(
                            Vec::from_hex(file_path).map_err(|_| UriParseError::UnknownFilePathEncoding)?
                        ).map_err(|_| UriParseError::UnknownFilePathEncoding)?,
                })),
                ["jamendo", jamendo_id] => Ok(Uri::Jamendo(JamendoUri {
                    jamendo_id: jamendo_id.parse().map_err(|_| UriParseError::InvalidFormat)?,
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
        match self {
            &UriParseError::UnknownFilePathEncoding => "file_path is not hex encoded or invalid UTF8",
            &UriParseError::InvalidFormat => "Invalid uri format",
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
    pub machine_id: String,
    pub file_path: String,
}

impl FileUri {
    pub fn new(machine_id: &str, file_path: &str) -> Self {
        FileUri {
            machine_id: machine_id.into(),
            file_path: file_path.into(),
        }
    }
}

#[derive(Debug, PartialEq)]
pub struct JamendoUri {
    pub jamendo_id: i32,
}

#[cfg(test)]
mod test {
    use super::*;
    use serde_json;

    #[test]
    fn file() {
        let uri = Uri::File(FileUri { machine_id: "foo-bar".into(), file_path: "/home/baz".into() });
        assert_eq!(uri.to_string(), "file:foo-bar:2f686f6d652f62617a");

        let uri = Uri::Jamendo(JamendoUri { jamendo_id: 1 });
        assert_eq!(uri.to_string(), "jamendo:1");
    }

    #[test]
    fn deserialize_uri() {
        let got: Uri = "file:foo-bar:2f686f6d652f62617a".parse().unwrap();
        let expected = Uri::File(FileUri { machine_id: "foo-bar".into(), file_path: "/home/baz".into() });
        assert_eq!(got, expected);

        let got: Uri = "jamendo:1".parse().unwrap();
        let expected = Uri::Jamendo(JamendoUri { jamendo_id: 1 });
        assert_eq!(got, expected);
    }
}
