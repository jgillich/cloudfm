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
        let db_name = format!("userdb-{}", (&self.name).as_bytes().to_hex());
        DatabaseName::from(db_name)
    }
}

#[derive(Debug)]
pub enum Backend {
    Fs(FsBackend),
    Jamendo(JamendoBackend),
}

impl serde::Serialize for Backend {
    fn serialize<S>(&self, serializer: &mut S) -> Result<(), S::Error>
        where S: serde::Serializer
    {
        match self {
            &Backend::Fs(ref backend) => backend.serialize::<S>(serializer)?,
            &Backend::Jamendo(ref backend) => backend.serialize::<S>(serializer)?,
        };
        Ok(())
    }
}

impl serde::Deserialize for Backend {
    fn deserialize<D>(deserializer: &mut D) -> Result<Self, D::Error>
        where D: serde::Deserializer
    {
        if let Ok(fs) = FsBackend::deserialize::<D>(deserializer) {
            Ok(Backend::Fs(fs))
        } else if let Ok(jamendo) = JamendoBackend::deserialize::<D>(deserializer) {
            Ok(Backend::Jamendo(jamendo))
        } else {
            Err(D::Error::unknown_variant(""))
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct FsBackend {
    #[serde(rename="type")]
    pub _type: String,
    pub machine_id: String,
}



impl FsBackend {
    pub fn new(machine_id: &str) -> Self {
        FsBackend {
            _type: "fs".into(),
            machine_id: machine_id.into(),
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct JamendoBackend {
    #[serde(rename="type")]
    pub _type: String,
}

impl JamendoBackend {
    pub fn new() -> Self {
        JamendoBackend {
            _type: "jamendo".into(),
        }
    }
}
