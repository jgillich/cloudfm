use super::{Error, Resource};

// http://jsonapi.org/format/#document
#[derive(Serialize, Deserialize, Debug)]
pub struct Document<T> {
    pub data: Option<Vec<Resource<T>>>,
    pub errors: Option<Vec<Error>>
    //pub meta:
}

//impl Document {
//    pub fn to_string(&self) -> &str {

//    }
//}
