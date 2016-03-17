
#[derive(Queryable, Serialize, Deserialize, Debug)]
pub struct Album {
    pub name: String,
}

pub struct AlbumRelationships {
    pub artist: Resource<Empty, Empty>,
}
