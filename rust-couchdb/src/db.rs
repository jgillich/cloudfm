pub struct Db<T> {
    name: String
}

impl<T> Db<T> {

    pub fn new(name: &str) -> Db {
        Db {
           name: name.to_string()
        }
    }

    pub fn get(&self, id: &str) -> Result<T, Error> {

    }

    pub fn put(&self, id: &str, document: T) -> Option<Error> {

    }

    pub fn name(&self) -> &str {
        self.name.as_slice()
    }

}
