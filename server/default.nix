with import <nixpkgs> { };

rustUnstable.buildRustPackage rec {
  name = "cloudfm-server-${version}";
  version = "0.1";
  src = ./.;
  buildInputs = [ openssl postgresql sqlite pkgconfig ];
  depsSha256 = "0x654m5l77dcz4dbhgdn80scgyjsbmgzg6rfg4bakm6s44bm5x5x";
  shellHook = (import ../shell.nix).shellHook;
}
