FROM debian:8
RUN apt update && apt upgrade -y && apt install curl file sudo gcc libssl-dev -y && \
    curl -sSf https://static.rust-lang.org/rustup.sh | sh -s -- --channel=nightly && \
    groupadd -r proxyd && useradd -r -g proxyd proxyd
COPY . /src
RUN cd /src && /usr/local/bin/cargo build --release && cd / && \
    cp /src/target/release/proxyd /proxyd && rm -rf /src && chown proxyd:proxyd /proxyd
USER proxyd
CMD /proxyd
