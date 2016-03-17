use super::{Error, Resource};
use serde::Serialize;
use serde_json;

// http://jsonapi.org/format/#document
#[derive(Serialize, Deserialize, Debug)]
pub struct Document<T, R> {
    pub data: Option<Vec<Resource<T, R>>>,
    pub errors: Option<Vec<Error>>,
    pub meta: Option<String>
}

impl<T: Serialize, R> Document<T, R> {
    pub fn to_json(&self) -> String {
        serde_json::to_string(&self).unwrap()
    }
}
