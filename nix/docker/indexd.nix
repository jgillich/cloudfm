{ pkgs ? import <nixpkgs> {} }:

with pkgs;
let
  cloudfm = callPackage ../cloudfm.nix { };
  entrypoint = writeScript "entrypoint.sh" ''
    #!${stdenv.shell}
    set -e
    exec "$@"
  '';
in
dockerTools.buildImage {
  name = "proxyd";
  runAsRoot = ''
    #!${stdenv.shell}
    ${dockerTools.shadowSetup}
  '';

  contents = [ cloudfm ];

  config = {
    Cmd = [ "/bin/indexd" ];
    Entrypoint = [ entrypoint ];
  };
}
