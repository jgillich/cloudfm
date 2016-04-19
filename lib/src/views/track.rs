use super::{View};

pub fn views() -> Vec<View> {
    vec!(
        View {
            name: "all".into(),
            map: "
                function (doc) {
                    if(doc.type == \"track\") {
                        emit(doc.name);
                    }
                }
            ".into(),
        }
    )
}
