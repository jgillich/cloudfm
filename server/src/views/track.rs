use super::{View};

pub const TRACK_VIEWS: &'static [ &'static View ] = &[
    &View {
        name: "all",
        map: "
            function (doc) {
                if(doc.type == \"track\") {
                    emit(doc.title);
                }
            }
        ",
  }
];
