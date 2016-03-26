with import <nixpkgs> { };

rustUnstable.buildRustPackage rec {
  name = "cloudfm-server-${version}";
  version = "0.1";
  src = ./.;
  buildInputs = [ openssl postgresql sqlite pkgconfig ];
  depsSha256 = "05z9d13rbym7nmmc11rmy5gmxs8hjw659g1j7pgns7rz9m6prkkz";
  shellHook = (import ../shell.nix).shellHook;
}
