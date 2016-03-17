use self::diesel::prelude::*;
use diesel::result::Error;

#[derive(Queryable, Serialize, Deserialize, Debug)]
pub struct Artist {
    pub name: String,
    #[serde(skip_serializing)]
    pub id: i32
}

impl Artist {
    fn find_or_create(conn: &SqliteConnection, search_name: &str) -> Artist {
        use super::schema::artists::dsl::*;

        match artists.where(name.eq(search_name)).first(conn) {
            Ok(artist) => artist,
            Err(_) => Artist::create(conn, search_name).unwrap()
        }
    }

    fn create(conn: &SqliteConnection, new_name) -> Result<Artist, Error> {
        use super::schema::artists::dsl::*;

        let new_artist = Artist {
            name: new_name,
            id: 0
        };

        diesel::insert(&new_artist).into(artists::table).get_result(conn)
    }
}
