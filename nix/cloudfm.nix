{ pkgs ? import <nixpkgs> {} }:

with pkgs;
rustUnstable.buildRustPackage rec {
  name = "cloudfm-${version}";
  version = "0.1";
  src = ../lib;
  buildInputs = [ openssl pkgconfig ];
  depsSha256 = "0g1fzs1b7rrbs07cnm6qi6jrzqm0kmnxb2ykjf62zawr0392l4g9";
}
