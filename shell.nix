with import <nixpkgs> { };

rec {
  configFile = writeText "couchdb.ini" ''
    [couchdb]
    database_dir = /tmp/cloudfm/data
    uri_file = /tmp/cloudfm/couchdb.uri
    view_index_dir = /tmp/cloudfm/data
    [httpd]
    port = 15984
    bind_address = 127.0.0.1
    [log]
    file = /tmp/cloudfm/couchdb.log
  '';

  shellHook = ''
    set -e
    export DATABASE_URL="http://localhost:15984"

    function dirs {
      APP=`pwd`
      while [[ ! -f "$APP/LICENSE" ]]; do APP+="/.."; done
      APP+="/app"

      SERVER=`pwd`
      while [[ ! -f "$SERVER/LICENSE" ]]; do SERVER+="/.."; done
      SERVER+="/server"
    }

    function migrate {
      dirs; pushd $SERVER; diesel migration run; popd
    }

    function build {
      dirs
      pushd $APP; elm-package install -y && elm-make --yes src/App.elm; popd
      pushd $SERVER; cargo build; popd
    }

    function test {
      dirs
      pushd $SERVER; cargo test; popd
    }

    function ci {
      couchdb
      build; test
      kill $COUCH_PID
    }

    function run {
      dirs
      couchdb
      pushd $SERVER; cargo run; popd
      echo "killing $COUCH_PID"
      kill $COUCH_PID
    }

    function couchdb {
      rm -rf /tmp/cloudfm
      mkdir -p /tmp/cloudfm/data
      touch /tmp/cloudfm/couchdb.ini
      ${couchdb}/bin/couchdb -a ${configFile} -a /tmp/cloudfm/couchdb.ini &
      COUCH_PID=$!
    }
  '';
}
