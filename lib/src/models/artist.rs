#[derive(Serialize, Deserialize, Debug)]
pub struct Artist {
    #[serde(rename="type")]
    _type: String,
    pub name: String,
}

impl Artist {
    pub fn new(name: &str) -> Self {
        Artist {
            _type: "artist".into(),
            name: name.into(),
        }
    }
}
