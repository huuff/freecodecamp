{
  description = "A very basic flake";

  inputs.nixpkgs.url = github:NixOS/nixpkgs;  
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils, ...}:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs { inherit system; };
    in with pkgs; rec {
    
      devShell =
        mkShell {
          nativeBuildInputs = [ nodejs nodePackages.eslint ];
        };

  });
}
