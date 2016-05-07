FROM nginx:1.10
COPY . /src
RUN apt-get update && apt-get install curl git -y && \  
    curl -sSf https://raw.githubusercontent.com/tj/n/master/bin/n | bash -s -- lts && \ 
    npm i -g webpack typings && cd /src && npm i && typings i && webpack -p && \
    cp -r target/* /usr/share/nginx/html
