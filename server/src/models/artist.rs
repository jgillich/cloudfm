use diesel;
use diesel::prelude::*;
use diesel::result::Error;
use diesel::pg::PgConnection;
use super::super::schema::artists;

#[derive(Queryable, Serialize, Deserialize, Debug)]
#[insertable_into(artists)]
pub struct Artist {
    pub name: String,
    #[serde(skip_serializing)]
    pub id: i32
}

impl Artist {
    fn find_or_create(conn: &PgConnection, name: &str) -> Artist {
        match artists::table.filter(artists::name.eq(name)).first(conn) {
            Ok(artist) => artist,
            Err(_) => Artist::create(conn, name).unwrap()
        }
    }

    fn create(conn: &PgConnection, name: &str) -> Result<Artist, Error> {
        diesel::insert(Artist { name: name.to_string(), id: 0 })
            .into(artists::table)
            .get_result(conn)
    }
}
