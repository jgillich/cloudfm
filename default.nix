with import <nixpkgs> { };

stdenv.mkDerivation rec {
  name = "cloudfm-${version}";

  version = "0.1";

  buildInputs = [ (import ./app) (import ./server) ];

  shellHook = (import ./shell.nix).shellHook;

}
