with import <nixpkgs> { };

rustUnstable.buildRustPackage rec {
  name = "cloudfm-server-${version}";
  version = "0.1";
  src = ./.;
  buildInputs = [ openssl postgresql sqlite pkgconfig ];
  depsSha256 = "16mz099j0cx2x169igswm03x570mspdpz9ac2vrqxfcla1msdmby";
  shellHook = (import ../shell.nix).shellHook;
}
