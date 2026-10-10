#!/usr/bin/env python3
"""Optional asset preparation. Requires Pillow; the website itself needs no build.

Run from any directory: python3 scripts/prepare_images.py
Original downloads are kept locally in assets/originals (ignored by Git).
All original images get a portable WebP copy in assets/library.
Selected site images and responsive variants go in assets/images.
"""

import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent


def export(source, destination, width, quality=83):
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        image = image.convert('RGBA' if 'A' in image.getbands() else 'RGB')
        if image.width > width:
            image = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
        destination.parent.mkdir(parents=True, exist_ok=True)
        image.save(destination, 'WEBP', quality=quality, method=6)


def main():
    sources_path = ROOT / 'assets/sources.json'
    sources = json.loads(sources_path.read_text())
    for source in sources:
        original = ROOT / source['local']
        source['optimized'] = f'assets/library/{original.stem}.webp'
        destination = ROOT / source['optimized']
        # A clone can reuse the committed library without the large originals.
        if original.exists():
            export(original, destination, 1600)
        elif not destination.exists():
            raise FileNotFoundError(f'Missing source and optimized copy: {original}')
    sources_path.write_text(json.dumps(sources, ensure_ascii=False, indent=2) + '\n')

    by_original = {source['local']: source['optimized'] for source in sources}
    selected = json.loads((ROOT / 'assets/image-map.json').read_text())
    for name, source in selected.items():
        original = ROOT / source
        if not original.exists():
            original = ROOT / by_original[source]
        for width, suffix in [(1280, ''), (640, '-640')]:
            export(original, ROOT / f'assets/images/{name}{suffix}.webp', width)
    print(f'Prepared {len(sources)} library images and {len(selected) * 2} responsive site images.')


if __name__ == '__main__':
    main()
