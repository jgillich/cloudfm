with import <nixpkgs> { };

with rustUnstable;

buildRustPackage rec {
  name = "mp-server";
  src = ./.;
  buildInputs = [ openssl ];
  depsSha256 = "0p6z8pkcmrfjpp48lkqf1s5x3a9sp1y1widlvl3njhfdkpwmrqg2";
}
