with import <nixpkgs> { };

let
  cloudfm = import ../.;
in rustUnstable.buildRustPackage rec {
  name = "cloudfm-auth-${cloudfm.version}";
  src = ./.;
  buildInputs = cloudfm.serverBuildInputs;
  depsSha256 = "0p6z8pkcmrfjpp48lkqf1s5x3a9sp1y1widlvl3njhfdkpwmrqg2";
  shellHook = cloudfm.shellHook;
}
