with import <nixpkgs> { };

let
  cloudfm = import ../.;
in stdenv.mkDerivation rec {
  name = "cloudfm-app-${cloudfm.version}";
  src = ./.;
  buildInputs = cloudfm.appBuildInputs;
  shellHook = cloudfm.shellHook;
}
