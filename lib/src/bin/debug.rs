extern crate cloudfm;

pub fn main() {
    println!("machine_id: {}", cloudfm::MACHINE_ID.to_string());
}
