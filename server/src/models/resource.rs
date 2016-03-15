#[derive(Serialize, Deserialize, Debug)]
pub struct Resource<T> {
    #[serde(rename="type")]
    pub type_: String,
    pub id: String,
    pub attributes: T,
}
