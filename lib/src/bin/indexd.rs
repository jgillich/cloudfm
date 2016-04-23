#![feature(question_mark)]

extern crate cloudfm;
extern crate chill;
extern crate dotenv;
extern crate serde_json;

use cloudfm::{Index, Indexer, views, User, Error, Backend};
use chill::{ViewRow, DocumentId, AllDocumentsViewValue};
use std::env;
use dotenv::dotenv;

pub fn main() {
    dotenv().ok();

    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let db = chill::Client::new(&db_url).expect("DATABASE_URL must be a valid URL");

    let (count, errors) = index_all(db);
    println!("index_all done. success: {}, failed: {}", count - errors.len(), errors.len());
    for error in errors {
        println!("error: {:#?}", error);
    }
}

pub fn index_all(db: chill::Client) -> (usize, Vec<Error>) {
    let mut errors: Vec<Error> = Vec::new();

    // skips design docs
    let start_key = &DocumentId::from("org.couchdb.user:");

    let action = match db.read_all_documents("/_users") {
        Ok(action) => action.with_start_key(start_key),
        Err(error) => return (1, vec![Error::from(error)])
    };

    let res = match action.run() {
        Ok(res) => res,
        Err(error) => return (1, vec![Error::from(error)])
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

    (view.rows().len(), errors)
}


pub fn index_user(db: &chill::Client, row: &ViewRow<DocumentId, AllDocumentsViewValue>) -> Result<(), Error> {
    let doc = db.read_document(("/_users", row.key()))?.run()?;
    let user: User = doc.get_content()?;

    views::apply(db, &user.db_name())?;

    if let Some(ref backends) = user.backends {
        for backend in backends {
            match backend {
                &Backend::File(ref backend) => Index::index(db, &user, backend)?,
                &Backend::Jamendo(ref backend) => Index::index(db, &user, backend)?,
            }
        }
    }

    Ok(())
}
