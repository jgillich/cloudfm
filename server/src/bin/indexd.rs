extern crate cloudfm;
extern crate chill;
extern crate dotenv;

use cloudfm::{views};
use std::env;
use dotenv::dotenv;

pub fn main() {
    dotenv().ok();

    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let db = chill::Client::new(&db_url).expect("DATABASE_URL must be a valid URL");

    //let users = db.read_all_documents("_users");
    //for user in users {
    //    views::apply(user, db);
    //}

}
