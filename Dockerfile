FROM debian:jessie
ADD server/target/debug/cloudfm-server /server
ADD app/target /static
RUN apt update && apt install openssl -y
CMD /server
