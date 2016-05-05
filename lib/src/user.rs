use std::collections::BTreeMap;
use serde;
use serde_json;
use chill::DatabaseName;
use hex::ToHex;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct User {
    pub name: String,
    pub email: Option<String>,
    pub backends: Option<Vec<Backend>>,
}

impl User {
    pub fn db_name(&self) -> DatabaseName {
        let db_name = format!("userdb-{}", self.name.to_hex());
        DatabaseName::from(db_name)
    }
}

#[derive(Debug, PartialEq)]
pub enum Backend {
    File(FileBackend),
    Jamendo(JamendoBackend),
}

impl serde::Serialize for Backend {
    fn serialize<S>(&self, serializer: &mut S) -> Result<(), S::Error>
        where S: serde::Serializer
    {
        match *self {
            Backend::File(ref backend) => backend.serialize::<S>(serializer),
            Backend::Jamendo(ref backend) => backend.serialize::<S>(serializer),
        }
    }
}

impl serde::Deserialize for Backend {

    fn deserialize<D>(de: &mut D) -> Result<Self, D::Error>
        where D: serde::de::Deserializer,
    {
        let mut object: BTreeMap<String, serde_json::Value> = serde::de::Deserialize::deserialize(de)?;

        let object_type = match object.remove("type") {
            Some(v) => {
                match v.as_string() {
                    Some(object_type) => object_type.to_string(),
                    None => { return Err(serde::de::Error::invalid_value("type is not a string")); }
                }
            }
            None => { return Err(serde::de::Error::missing_field("type")); }
        };

        match object_type.as_ref() {
            "file" => {
                let machine_id = match object.remove("machine_id") {
                    Some(v) => {
                        match v.as_string() {
                            Some(machine_id) => machine_id.to_string(),
                            None => { return Err(serde::de::Error::invalid_value("machine_id is not a string")); }
                        }
                    }
                    None => { return Err(serde::de::Error::missing_field("machine_id")); }
                };

                let paths = match object.remove("paths") {
                    Some(paths) => serde_json::value::from_value(paths).map_err(|_| serde::de::Error::invalid_value("paths is not a string array"))?,
                    None => { return Err(serde::de::Error::missing_field("paths")); }
                };

                Ok(Backend::File(FileBackend {
                    _type: "file".to_string(),
                    machine_id: machine_id.into(),
                    paths: paths,
                }))
            },
            "jamendo" => {
                let user_name = match object.remove("user_name") {
                    Some(v) => {
                        match v.as_string() {
                            Some(user_name) => user_name.to_string(),
                            None => { return Err(serde::de::Error::invalid_value("user_name is not a string")); }
                        }
                    }
                    None => { return Err(serde::de::Error::missing_field("user_name")); }
                };

                Ok(Backend::Jamendo(JamendoBackend {
                    _type: "jamendo".to_string(),
                    user_name: user_name,
                }))
            },
            _ => Err(serde::de::Error::invalid_value("unkown type"))
        }
    }
}


// TODO implement custom serializer to get rid of _type
#[derive(Serialize, Debug, PartialEq)]
pub struct FileBackend {
    #[serde(rename="type")]
    pub _type: String,
    pub machine_id: String,
    pub paths: Vec<String>,
}

// TODO implement custom serializer to get rid of _type
#[derive(Serialize, Debug, PartialEq)]
pub struct JamendoBackend {
    #[serde(rename="type")]
    pub _type: String,
    pub user_name: String,
}

#[cfg(test)]
mod test {
    use super::*;
    use serde_json;

    #[test]
    fn file_backend() {
        let uri = Backend::File(FileBackend { machine_id: "foo-bar".into(), paths: Vec::new(), _type: "file".into() });
        let uri_str = serde_json::to_string(&uri).unwrap();
        assert_eq!(uri_str, "{\"type\":\"file\",\"machine_id\":\"foo-bar\",\"paths\":[]}");
        assert_eq!(serde_json::from_str::<Backend>(&uri_str).unwrap(), uri);
    }

    #[test]
    fn jamendo_backend() {
        let uri = Backend::Jamendo(JamendoBackend { user_name: "foo".into(), _type: "jamendo".into() });
        let uri_str = serde_json::to_string(&uri).unwrap();
        assert_eq!(uri_str, "{\"type\":\"jamendo\",\"user_name\":\"foo\"}");
        assert_eq!(serde_json::from_str::<Backend>(&uri_str).unwrap(), uri);
    }

}
