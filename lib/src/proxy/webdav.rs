use iron::{IronResult, Response};
use WebdavUri;
use super::{ProxyHandler, Proxy};

impl ProxyHandler<WebdavUri> for Proxy {
    fn handle(uri: WebdavUri) -> IronResult<Response> {
        unimplemented!();
    }
}
