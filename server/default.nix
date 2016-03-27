with import <nixpkgs> { };

rustUnstable.buildRustPackage rec {
  name = "cloudfm-server-${version}";
  version = "0.1";
  src = ./.;
  buildInputs = [ openssl postgresql sqlite pkgconfig ];
  depsSha256 = "0g1fzs1b7rrbs07cnm6qi6jrzqm0kmnxb2ykjf62zawr0392l4g9";
  shellHook = (import ../shell.nix).shellHook;
}
