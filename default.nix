let
  nixpkgs = fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-23.11";
  pkgs = import nixpkgs { config = {}; overlays = []; };
in

pkgs.mkShellNoCC {
  packages = with pkgs; [
   hugo
   go_1_21
   nodejs_20
   asciidoctor
   imagemagick
  ];
  shellHook = ''
    npm install -D postcss postcss-cli autoprefixer
  '';
}
