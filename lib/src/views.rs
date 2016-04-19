use serde_json;
use chill;
use chill::{IntoDatabasePath};
use {Error, ViewError};

// IMPORTANT!
// if you touch any of the views, increase this by one
// TODO replace with crate version, always update in debug mode
const VIEW_REV: i32 = 6;

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


fn views() -> serde_json::value::Value {
    let mut builder = serde_json::builder::ObjectBuilder::new();

    let views = vec![
        View {
            name: "all_albums".into(),
            map: "
                function (doc) {
                    if(doc.type == \"album\") {
                        emit(doc.name);
                    }
                }
            ".replace("\n", "").into(),
        },
        View {
            name: "all_artists".into(),
            map: "
                function (doc) {
                    if(doc.type == \"artist\") {
                        emit(doc.name);
                    }
                }
            ".replace("\n", "").into(),
        },
        View {
            name: "all_tracks".into(),
            map: "
                function (doc) {
                    if(doc.type == \"track\") {
                        emit(doc.name);
                    }
                }
            ".replace("\n", "").into(),
        },
    ];


    for view in views {
        builder = builder.insert_object(view.name.clone(), |builder| {
            builder.insert("map", view.map.clone())
        });
    }

    builder.unwrap()
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ViewDocument {
    pub view_rev: i32,
    pub views: serde_json::value::Value,
}

impl ViewDocument {
    pub fn new() -> Self {
        ViewDocument {
            view_rev: VIEW_REV,
            views: views(),
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct View {
    name: String,
    map: String,
}
