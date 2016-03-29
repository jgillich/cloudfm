/*use uuid::Uuid;


#[derive(Serialize, Deserialize, Debug)]
pub struct Settings {
    pub id: String,
    pub rev: String,
    pub fs_folders: Vec<String>

}

impl Settings {
    pub fn new() -> Settings {
        Settings {
            id: Uuid::new_v4(),
            rev: "".to_string(),
            fs_folders: Vec::new(),
        }
    }

    pub fn put(&self, client: couchdb::Client) -> Result<Track, Error> {
        self.rev = try!(client.put(("settings", self.id.as_slice()), self).run());
        self
    }

}
*/
