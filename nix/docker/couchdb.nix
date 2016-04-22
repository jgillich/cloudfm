{ pkgs ? import <nixpkgs> {} }:

with pkgs;
dockerTools.pullImage {
  imageName = "couchdb";
  imageTag = "1.6-couchperuser";
  sha256 = "06qlxjg5i66h72dspcrf2blypsyr3kw2pdgx9v1n0bbrdz03iqmm";
}
