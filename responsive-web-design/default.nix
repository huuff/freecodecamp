{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  nativeBuildInputs = [ pkgs.nodePackages.npm pkgs.nodejs ]; 
}
