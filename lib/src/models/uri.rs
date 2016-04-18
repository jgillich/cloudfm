pub enum Uri {
    FsUri(FsUri),
    JamendoUri(JamendoUri),
}

impl Uri {

}

pub struct FsUri {
    machine_id: String,
    file_path: String,
}

pub struct JamendoUri {
    jamendo_id: String,
}
