use super::{Resource, Empty};
use diesel::pg::PgConnection;

#[derive(Queryable, Serialize, Deserialize, Debug)]
pub struct Album {
    pub name: String,
}

pub struct AlbumRelationships {
    pub artist: Resource<Empty, Empty>,
}
