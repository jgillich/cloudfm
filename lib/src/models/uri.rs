use serde;
use hex::{ToHex, FromHex};
use serde::de::Error;

#[derive(Debug, PartialEq)]
pub enum Uri {
    Fs(FsUri),
    Jamendo(JamendoUri),
}

impl serde::Serialize for Uri {
    fn serialize<S>(&self, serializer: &mut S) -> Result<(), S::Error>
        where S: serde::Serializer
    {
        match self {
            &Uri::Fs(ref uri) => serializer.serialize_str(&format!("fs:{}:{}", uri.machine_id, uri.file_path.to_hex())),
            &Uri::Jamendo(ref uri) => serializer.serialize_str(&format!("jamendo:{}", uri.jamendo_id)),
        }
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
                where E: Error,
            {
                let parts: Vec<&str> = value.split(':').collect();
                match &parts[..] {
                    ["fs", machine_id, file_path] => Ok(Uri::Fs(FsUri {
                        machine_id: machine_id.into(),
                        file_path: String::from_utf8(
                                Vec::from_hex(file_path).map_err(|_| serde::de::Error::custom("file_path must be hex-encoded"))?
                            ).map_err(|_| serde::de::Error::custom("file_path must be valid utf8"))?,
                    })),
                    ["jamendo", jamendo_id] => Ok(Uri::Jamendo(JamendoUri {
                        jamendo_id: jamendo_id.into(),
                    })),
                    _ => Err(serde::de::Error::custom("not a valid uri")),
                }

            }

        }

        deserializer.deserialize(Visitor)
    }
}

#[derive(Debug, PartialEq)]
pub struct FsUri {
    machine_id: String,
    file_path: String,
}

#[derive(Debug, PartialEq)]
pub struct JamendoUri {
    jamendo_id: String,
}

#[cfg(test)]
mod test {
    use super::*;
    use serde_json;

    #[test]
    fn serialize_uri() {
        let uri = Uri::Fs(FsUri { machine_id: "foo-bar".into(), file_path: "/home/baz".into() });
        assert_eq!(serde_json::to_string(&uri).unwrap(), "\"fs:foo-bar:2f686f6d652f62617a\"");

        let uri = Uri::Jamendo(JamendoUri { jamendo_id: "foo".into() });
        assert_eq!(serde_json::to_string(&uri).unwrap(), "\"jamendo:foo\"");
    }

    #[test]
    fn deserialize_uri() {
        let got: Uri = serde_json::from_str("\"fs:foo-bar:2f686f6d652f62617a\"").unwrap();
        let expected = Uri::Fs(FsUri { machine_id: "foo-bar".into(), file_path: "/home/baz".into() });
        assert_eq!(got, expected);

        let got: Uri = serde_json::from_str("\"jamendo:foo\"").unwrap();
        let expected = Uri::Jamendo(JamendoUri { jamendo_id: "foo".into() });
        assert_eq!(got, expected);
    }
}
