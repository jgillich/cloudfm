extern crate cloudfm;
extern crate chill;

use cloudfm::{views};
use std::env;

pub fn main() {
    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let db = chill::Client::new(&db_url).expect("DATABASE_URL must be a valid URL");

    //views::apply(user, db);
}
