with import <nixpkgs> { };

stdenv.mkDerivation rec {
  name = "cloudfm-app-${version}";
  version = "0.1";
  src = ./.;
  buildInputs = [ elmPackages.elm ];
  shellHook = (import ../shell.nix).shellHook;
}
