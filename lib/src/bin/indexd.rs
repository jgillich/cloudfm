#![feature(question_mark)]

extern crate cloudfm;
extern crate chill;
extern crate dotenv;

use std::{error};
use cloudfm::{views, User, Error};
use chill::{UnreducedView, ViewRow, DocumentId, AllDocumentsViewValue};
use std::env;
use dotenv::dotenv;

pub fn main() {
    dotenv().ok();

    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let db = chill::Client::new(&db_url).expect("DATABASE_URL must be a valid URL");

    let errors = index_all(db);
    println!("index_all done. error count: {}", errors.len());
    for error in errors {
        println!("error: {}", error);
    }
}

pub fn index_all(db: chill::Client) -> Vec<Error> {
    let mut errors: Vec<Error> = Vec::new();

    let action = match db.read_all_documents("/_users") {
        Ok(action) => action,
        Err(error) => return vec![Error::from(error)]
    };

    let res = match action.run() {
        Ok(res) => res,
        Err(error) => return vec![Error::from(error)]
    };

    let view = match res.as_unreduced() {
        Some(view) => view,
        None => unimplemented!()
    };

    for row in view.rows() {
        if let Err(e) = index_user(&db, row) {
            errors.push(e);
        }
    }

    errors
}


pub fn index_user(db: &chill::Client, row: &ViewRow<DocumentId, AllDocumentsViewValue>) -> Result<(), Error> {
    let doc = db.read_document(("/_users", row.key()))?.run()?; // TODO use include_docs
    let user: User = doc.get_content()?;
    views::apply(db, &user.db_name())?;
    Ok(())
}
