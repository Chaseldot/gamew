#!/usr/bin/env python3
"""Audit GameW art asset coverage against ground-truth map design."""

from __future__ import annotations

import argparse
import re
import struct
import sys
from pathlib import Path


REGION_TO_CHAPTER = {
    "山水县境": ("01-第一章-山水县境", "第一章"),
    "槐安古道": ("02-第二章-槐安古道", "第二章"),
    "照影城": ("03-第三章-照影城", "第三章"),
}


def png_size(path: Path) -> tuple[int, int] | None:
    with path.open("rb") as handle:
        if handle.read(8) != b"\x89PNG\r\n\x1a\n":
            return None
        length = struct.unpack(">I", handle.read(4))[0]
        chunk = handle.read(4)
        if chunk != b"IHDR" or length < 8:
            return None
        width, height = struct.unpack(">II", handle.read(8))
        return width, height


def jpg_size(path: Path) -> tuple[int, int] | None:
    with path.open("rb") as handle:
        if handle.read(2) != b"\xff\xd8":
            return None
        while True:
            marker_start = handle.read(1)
            if not marker_start:
                return None
            if marker_start != b"\xff":
                continue
            marker = handle.read(1)
            while marker == b"\xff":
                marker = handle.read(1)
            if marker in {b"\xd8", b"\xd9"}:
                continue
            length_bytes = handle.read(2)
            if len(length_bytes) != 2:
                return None
            length = struct.unpack(">H", length_bytes)[0]
            if marker in {bytes([value]) for value in range(0xC0, 0xCF)} - {b"\xc4", b"\xc8", b"\xcc"}:
                data = handle.read(length - 2)
                if len(data) < 5:
                    return None
                height, width = struct.unpack(">HH", data[1:5])
                return width, height
            handle.seek(length - 2, 1)


def image_size(path: Path) -> tuple[int, int] | None:
    suffix = path.suffix.lower()
    if suffix == ".png":
        return png_size(path)
    if suffix in {".jpg", ".jpeg"}:
        return jpg_size(path)
    return None


def read_locations(repo: Path) -> list[tuple[str, str]]:
    map_design = repo / "docs/ground-truth/03-map-design.md"
    rows: list[tuple[str, str]] = []
    pattern = re.compile(r"^\|\s*(山水县境|槐安古道|照影城)\s*\|\s*([^|]+?)\s*\|")
    for line in map_design.read_text(encoding="utf-8").splitlines():
        match = pattern.match(line)
        if match:
            rows.append((match.group(1), match.group(2).strip()))
    return rows


def expected_path(repo: Path, region: str, location: str) -> Path:
    chapter_dir, chapter_name = REGION_TO_CHAPTER[region]
    return repo / "art-assets" / chapter_dir / "02-地点概念图" / f"{chapter_name}-地点概念-{location}.png"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", default=".", help="GameW repository root")
    parser.add_argument("--width", type=int, default=3840)
    parser.add_argument("--height", type=int, default=2160)
    args = parser.parse_args()

    repo = Path(args.repo).resolve()
    rows = read_locations(repo)
    failures: list[str] = []

    for region, location in rows:
        path = expected_path(repo, region, location)
        if not path.exists():
            failures.append(f"MISSING {region} / {location}: {path}")
            continue
        size = image_size(path)
        if size != (args.width, args.height):
            failures.append(f"BAD_SIZE {region} / {location}: {path} -> {size}")

    print(f"locations: {len(rows)}")
    print(f"expected size: {args.width}x{args.height}")
    if failures:
        print("\n".join(failures))
        return 1
    print("all location concept assets present and correctly sized")
    return 0


if __name__ == "__main__":
    sys.exit(main())
