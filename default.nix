with import <nixpkgs> { };

stdenv.mkDerivation rec {
  name = "mp-${version}";

  version = "0.1";

  buildInputs = serverBuildInputs ++ appBuildInputs;

  appBuildInputs = [ elmPackages.elm ];

  serverBuildInputs = [ openssl postgresql sqlite pkgconfig ];

  shellHook = ''
    APP=`cwd`/app
    SERVER=`cwd`/server

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
