FROM nginx:1.10
COPY . /src
RUN apt-get update && apt-get install curl git -y && \
    curl -sSf https://raw.githubusercontent.com/tj/n/master/bin/n | bash -s -- lts && \
    cd /src && npm run init && npm run build && \
    mv target/* /usr/share/nginx/html && rm -rf /src
