#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub name: String,
    pub email: Option<String>,
}

impl User {
    pub fn db_name() -> String {
        unimplemented!()
    }
}
