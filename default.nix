with import <nixpkgs> { };

stdenv.mkDerivation rec {
  name = "mp-${version}";

  version = "0.1";

  buildInputs = [ git rustUnstable.cargo rustUnstable.cargo.rustc ] ++ serverBuildInputs; # ++ appBuildInputs;

  #appBuildInputs = [ elmPackages.elm ];

  serverBuildInputs = [ openssl postgresql sqlite pkgconfig ];

  shellHook = ''
    APP=`pwd`/app
    SERVER=`pwd`/server

    function build {
      pushd $APP; elm-package install -y && elm-make --yes src/App.elm; popd
      pushd $SERVER; cargo build; popd
    }

    function test {
      pushd $SERVER; cargo test; popd
    }

    function ci {
      cargo install diesel_cli
      pushd server; $HOME/.cargo/bin/diesel migration run; popd
      build
      test
    }

    function run {
      pushd $SERVER; cargo run; popd
    }
  '';

}
