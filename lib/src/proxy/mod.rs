use iron::{IronResult, Response};

mod file;

pub struct Proxy;

pub trait ProxyHandler<T> {
    fn handle(T) -> IronResult<Response>;
}


