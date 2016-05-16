use std::{error, fmt, default};
use serde_json;
use chill;
use chill::{DocumentId, IntoDatabasePath};
use Error;

// IMPORTANT!
// if you touch any of the views, increase this by one
// TODO replace with crate version, always update in debug mode
const VIEW_REV: i32 = 6;

pub fn apply<'a, P>(db: &'a chill::Client, db_path: P) -> Result<(), Error>
    where P: IntoDatabasePath<'a>
{
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
                Err(Error::View(ViewError::NewerRevision))
            } else {
                Ok(())
            }
        }
        Err(chill::Error::NotFound(_)) => {
            db.create_document(db_path, &ViewDocument::new())?.with_document_id(view_id).run()?;
            Ok(())
        }
        Err(e) => Err(Error::from(e)),
    }
}

pub fn all_artists<'a, P>(db: &'a chill::Client,
                          db_path: P)
                          -> Result<Vec<(DocumentId, String)>, Error>
    where P: IntoDatabasePath<'a>
{
    let res = db.execute_view::<String, Option<i32>, _>((db_path, "cloudfm", "all_artists"))?
        .run()?;
    let res = res.as_unreduced().ok_or(ViewError::ViewReduced)?;
    Ok(res.rows()
        .iter()
        .map(|a| (DocumentId::from(a.document_path().document_id()), a.key().clone()))
        .collect())
}

pub fn all_albums<'a, P>(db: &'a chill::Client,
                         db_path: P)
                         -> Result<Vec<(DocumentId, String)>, Error>
    where P: IntoDatabasePath<'a>
{
    let res = db.execute_view::<String, Option<i32>, _>((db_path, "cloudfm", "all_albums"))?.run()?;
    let res = res.as_unreduced().ok_or(ViewError::ViewReduced)?;
    Ok(res.rows()
        .iter()
        .map(|a| (DocumentId::from(a.document_path().document_id()), a.key().clone()))
        .collect())
}

pub fn all_tracks<'a, P>(db: &'a chill::Client,
                         db_path: P)
                         -> Result<Vec<(DocumentId, String)>, Error>
    where P: IntoDatabasePath<'a>
{
    let res = db.execute_view::<String, Option<i32>, _>((db_path, "cloudfm", "all_tracks"))?.run()?;
    let res = res.as_unreduced().ok_or(ViewError::ViewReduced)?;
    Ok(res.rows()
        .iter()
        .map(|a| (DocumentId::from(a.document_path().document_id()), a.key().clone()))
        .collect())
}

// TODO make views static
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
        builder = builder.insert_object(view.name.clone(),
                                        |builder| builder.insert("map", view.map.clone()));
    }

    builder.unwrap()
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ViewDocument {
    pub view_rev: i32,
    pub views: serde_json::value::Value,
}

impl default::Default for ViewDocument {
    fn default() -> Self {
        ViewDocument {
            view_rev: VIEW_REV,
            views: views(),
        }
    }
}

impl ViewDocument {
    pub fn new() -> Self {
        Self::default()
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct View {
    name: String,
    map: String,
}

#[derive(Debug)]
pub enum ViewError {
    NewerRevision,
    ViewReduced,
}

impl error::Error for ViewError {
    fn description(&self) -> &str {
        match *self {
            ViewError::NewerRevision => "Database view revision is higher than ours",
            ViewError::ViewReduced => "View is reduced",
        }
    }

    fn cause(&self) -> Option<&error::Error> {
        None
    }
}

impl fmt::Display for ViewError {
    fn fmt(&self, f: &mut fmt::Formatter) -> Result<(), fmt::Error> {
        write!(f, "{}", error::Error::description(self))
    }
}
