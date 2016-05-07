FROM debian:8
RUN apt update && apt upgrade -y && apt install curl file sudo gcc libssl-dev -y && \
    curl -sSf https://static.rust-lang.org/rustup.sh | sh -s -- --channel=nightly && \
    groupadd -r cloudfm && useradd -r -g cloudfm cloudfm
COPY . /src
ENV PATH /usr/local/bin:$PATH
RUN cd /src && cargo build --bin indexd --release && cp /src/target/release/indexd /usr/local/bin && \
    rm -rf /src
USER cloudfm
CMD indexd
