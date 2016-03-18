with import <nixpkgs> { };

let
  mp = import ../.;
in stdenv.mkDerivation rec {
  name = "mp-app-${mp.version}";
  src = ./.;
  buildInputs = mp.appBuildInputs;
  shellHook = mp.shellHook;
}
