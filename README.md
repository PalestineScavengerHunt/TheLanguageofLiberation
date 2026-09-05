# Palestinian Resistance Scavenger Hunt

A static, GitHub Pages-ready scavenger hunt. No build process is required.

## Main files

- index.html — page structure
- style.css — design and responsive layout
- script.js — station content, QR scanning, letter reveals, and saved progress
- assets/images/ — place final clue images here
- assets/videos/ — place the two final videos here
- vendor/qr-scanner/ — locally stored QR scanner dependency

## GitHub Pages

1. Create a GitHub repository.
2. Upload this folder's contents to the repository root.
3. Open Settings → Pages.
4. Select Deploy from a branch.
5. Choose the main branch and / (root), then save.

Station QR codes should point to the published address plus a station fragment:

    https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/#station7

## Adding media

Place a file in assets/images or assets/videos, then set the corresponding
station's mediaFile value near the top of script.js.

    mediaFile: "assets/images/station-1.jpg"
    mediaFile: "assets/videos/station-9.mp4"

Opening index.html directly previews most features. Camera access requires a
secure web address, so test the in-page scanner on GitHub Pages or localhost.
