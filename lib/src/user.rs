use serde;
use chill::DatabaseName;
use hex::ToHex;
use serde::de::Error;

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub name: String,
    pub email: Option<String>,
    pub backends: Option<Vec<Backend>>,
}

impl User {
    pub fn db_name<'a>(&self) -> DatabaseName {
        let db_name = format!("userdb-{}", self.name.to_hex());
        DatabaseName::from(db_name)
    }
}

#[derive(Debug)]
pub enum Backend {
    File(FileBackend),
    Jamendo(JamendoBackend),
}

impl serde::Serialize for Backend {
    fn serialize<S>(&self, serializer: &mut S) -> Result<(), S::Error>
        where S: serde::Serializer
    {
        match self {
            &Backend::File(ref backend) => backend.serialize::<S>(serializer),
            &Backend::Jamendo(ref backend) => backend.serialize::<S>(serializer),
        }
    }
}

// FIXME parse type field
impl serde::Deserialize for Backend {
    fn deserialize<D>(deserializer: &mut D) -> Result<Self, D::Error>
        where D: serde::Deserializer
    {
        if let Ok(file) = FileBackend::deserialize::<D>(deserializer) {
            Ok(Backend::File(file))
        } else if let Ok(jamendo) = JamendoBackend::deserialize::<D>(deserializer) {
            Ok(Backend::Jamendo(jamendo))
        } else {
            Err(D::Error::unknown_variant(""))
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct FileBackend {
    #[serde(rename="type")]
    pub _type: String,
    pub machine_id: String,
    pub paths: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct JamendoBackend {
    #[serde(rename="type")]
    pub _type: String,
}
