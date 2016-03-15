// http://jsonapi.org/format/#errors
#[derive(Serialize, Deserialize, Debug)]
pub struct Error {
    status: u32, // ...
}
