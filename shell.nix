{
  shellHook = ''
    set -e

    APP=`pwd`/app
    SERVER=`pwd`/server

    function migrate {
      pushd $SERVER; diesel migration run; popd
    }

    function build {
      pushd $APP; elm-package install -y && elm-make --yes src/App.elm; popd
      pushd $SERVER; cargo build; popd
    }

    function test {
      pushd $SERVER; cargo test; popd
    }

    function ci {
      build; test
    }

    function run {
      pushd $SERVER; cargo run; popd
    }
  '';
}
