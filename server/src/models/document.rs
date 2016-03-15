use super::{Error, Resource};
use serde::Serialize;
use serde_json;

// http://jsonapi.org/format/#document
#[derive(Serialize, Deserialize, Debug)]
pub struct Document<T> {
    pub data: Option<Vec<Resource<T>>>,
    pub errors: Option<Vec<Error>>, // pub meta:
}

impl<T: Serialize> Document<T> {
    pub fn to_json(&self) -> String {
        serde_json::to_string(&self).unwrap()
    }
}
