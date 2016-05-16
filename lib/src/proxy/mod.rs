use iron::{IronResult, Response};

mod file;
mod jamendo;
mod webdav;

pub struct Proxy;

pub trait ProxyHandler<T> {
    fn handle(T) -> IronResult<Response>;
}
