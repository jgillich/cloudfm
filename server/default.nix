with import <nixpkgs> { };

let
  mp = import ../.;
in rustUnstable.buildRustPackage rec {
  name = "mp-server-${mp.version}";
  src = ./.;
  buildInputs = mp.serverBuildInputs;
  depsSha256 = "0p6z8pkcmrfjpp48lkqf1s5x3a9sp1y1widlvl3njhfdkpwmrqg2";
  shellHook = mp.shellHook;
}
