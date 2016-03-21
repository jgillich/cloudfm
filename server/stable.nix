with import <nixpkgs> { };

rustPlatform.buildRustPackage rec {
  name = "cloudfm-server-${version}";
  version = "0.1";
  src = ./.;
  buildInputs = [ openssl postgresql sqlite pkgconfig ];
  depsSha256 = "160ar8jfzhhrg5rk3rjq3sc5mmrakysynrpr4nfgqkbq952il2zk";
  shellHook = (import ../shell.nix).shellHook;
}
