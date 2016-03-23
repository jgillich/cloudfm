with import <nixpkgs> { };
let
  self = import ./default.nix;
in rustPlatform.buildRustPackage {
  inherit (self) name src shellHook;
  buildInputs = [ openssl postgresql sqlite pkgconfig ];
  buildPhase = "cargo build --release --features stable --no-default-features";
  depsSha256 = "1qfpdbj45cqy1ppwnzp763qgks5afw9yy467z4smml6x1sd78pip";
}
