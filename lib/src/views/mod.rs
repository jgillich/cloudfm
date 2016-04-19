use serde_json;
use chill;
use chill::{IntoDatabasePath};
use std::error::Error as StdError;
use {Error, ViewError};

mod track;

// IMPORTANT!
// if you touch any of the views, increase this by one
const VIEW_REV: i32 = 1;

pub fn apply<'a, P>(db: &'a chill::Client, db_path: P) -> Result<(), Error> where P: IntoDatabasePath<'a> {
    let db_path = db_path.into_database_path()?;
    let view_id = chill::DocumentIdRef::from("_design/cloudfm");

    match db.read_document((db_path, view_id))?.run() {
        Ok(mut doc) => {
            let view_doc: ViewDocument = doc.get_content()?;

            if view_doc.view_rev < VIEW_REV {
                doc.set_content(&ViewDocument::new())?;
                db.update_document(&doc)?.run()?;
                Ok(())
            } else if view_doc.view_rev > VIEW_REV {
                Err(Error::from(ViewError::NewerRevision))
            } else {
                Ok(())
            }
        },
        Err(chill::Error::NotFound(_)) => {
            db.create_document(db_path, &ViewDocument::new())?.with_document_id(view_id).run()?;
            Ok(())
        },
        Err(e) => {
            Err(Error::from(e))
        }
    }

}

#[derive(Serialize, Deserialize, Debug)]
pub struct ViewDocument {
    pub view_rev: i32,
    pub views: Vec<View>,
}

impl ViewDocument {
    pub fn new() -> Self {
        let mut views = Vec::new();
        views.append(&mut track::views());

        ViewDocument {
            view_rev: VIEW_REV,
            views: views,
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct View {
    name: String,
    map: String,
}
