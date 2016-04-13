use serde_json;
use chill;

mod track;

// IMPORTANT!
// if you touch any of the views, increase this by one
const VIEW_REV: i32 = 1;

const VIEW_ID: &'static str = "_design/server";

/* Example doc:
{
  "_id": "_design/application",
  "_rev": "1-C1687D17",
  "views": {
    "viewname": {
      "map": "function(doc) { ... }",
      "reduce": "function(keys, values) { ... }"
    }
  }
}
*/

pub fn apply(db_name: &str, db: &chill::Client) {
    let doc_path = (chill::DatabaseNameRef::from(db_name), chill::DocumentIdRef::from(VIEW_ID));

    match db.read_document(doc_path).unwrap().run() {
        Ok(doc) => {
            // if doc rev != VIEW_REV -> UPDATE
        },
        Err(chill::Error::NotFound(_)) => {

        },
        Err(_) => {
            panic!("unexpected error"); // TODO
        }
    }

}

fn doc() -> serde_json::value::Value {
    serde_json::builder::ObjectBuilder::new()
        .insert("_id", VIEW_ID)
        .insert("_rev", VIEW_REV)
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
