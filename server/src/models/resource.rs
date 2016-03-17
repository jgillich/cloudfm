#[derive(Serialize, Deserialize, Debug)]
pub struct Resource<T, R> {
    #[serde(rename="type")]
    pub type_: String,
    pub id: String,
    pub attributes: Option<T>,
    pub relationships: Option<R>
}
