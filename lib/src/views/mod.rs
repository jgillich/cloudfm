use serde_json;
use chill;
use std::error::Error as StdError;
use Error;

mod track;

// IMPORTANT!
// if you touch any of the views, increase this by one
const VIEW_REV: i32 = 1;

pub fn apply(db_path: chill::DatabaseNameRef, db: &chill::Client) -> Result<(), Error> {
    let view_id = chill::DocumentIdRef::from("_design/server");

    match db.read_document((db_path, view_id))?.run() {
        Ok(mut doc) => {
            // TODO
            // only update if rev < VIEW_REV
            // panic if view is rev > VIEW_REV
            // do nothing if rev == VIEW_REV
            doc.set_content(&view_doc())?;
            db.update_document(&doc)?.run()?;
            Ok(())
        },
        Err(chill::Error::NotFound(_)) => {
            db.create_document(db_path, &view_doc())?.with_document_id(view_id).run()?;
            Ok(())
        },
        Err(e) => {
            Err(Error::from(e))
        }
    }

}

fn view_doc() -> serde_json::value::Value {
    serde_json::builder::ObjectBuilder::new()
        .insert_object("views", |builder| {
            let mut b = builder;
            for view in track::TRACK_VIEWS {
                b = b.insert_object("views", |builder| {
                    builder.insert("map", view.map)
                });
            }
            b
        }
    ).unwrap()
}

pub struct View {
    name: &'static str,
    map: &'static str,
}
