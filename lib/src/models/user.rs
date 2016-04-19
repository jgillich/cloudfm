use chill::DatabaseName;
use hex::ToHex;

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub name: String,
    pub email: Option<String>,
}

impl User {
    pub fn db_name<'a>(&self) -> DatabaseName {
        let db_name = format!("userdb-{}", (&self.name).as_bytes().to_hex());
        DatabaseName::from(db_name)
    }
}
