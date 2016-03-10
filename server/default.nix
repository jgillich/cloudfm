with import <nixpkgs> { };

with rustPlatform;

buildRustPackage rec {
  name = "mp-server";

  src = ./.;

  buildInputs = [ openssl ];

  depsSha256 = "1nx2vvwhkiaq6byb56l01x3dndaahfy3c1jwlh8f1yka1a89ihai";

}
