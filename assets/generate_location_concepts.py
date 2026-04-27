#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "openai>=1.55",
#     "python-dotenv>=1.0",
# ]
# ///
"""Generate strict ground-truth location concept art for GameW.

Run from the repository root:

    uv run assets/generate_location_concepts.py

The script reads OPENAI_API_KEY from the environment or a local .env file.
"""

from __future__ import annotations

import argparse
import base64
import os
import sys
import urllib.request
from dataclasses import dataclass
from pathlib import Path

ASSET_ROOT = Path(__file__).resolve().parent


@dataclass(frozen=True)
class LocationConcept:
    chapter: str
    region: str
    location: str
    output: str
    reference: str
    prompt: str


STYLE_RULES = """Create one high-end wuxia CRPG environment concept art image.
Use the attached chapter key visual only as style reference for palette, lighting, atmosphere, brushwork, and production value.
This is a location-level establishing concept, not an interior room, not a battle scene, not a UI mockup.
4K landscape composition, 16:9, cinematic wide shot, rich environmental storytelling, readable silhouette, high detail, polished AAA game concept art.
No visible text, no labels, no captions, no watermark, no logo."""


CONCEPTS: list[LocationConcept] = [
    LocationConcept(
        "1",
        "山水县境",
        "清河渡",
        "01-第一章-山水县境/02-地点概念图/第一章-地点概念-清河渡.png",
        "01-第一章-山水县境/01-章节主视觉/第一章-章节主视觉-山水县境远景.png",
        "Depict Qinghe Ferry, a misty river crossing in the sealed Shanshui county border: ferry docks, bamboo boats, wet stone steps, reeds, river fog, lanterns reflected on dark water, traces of a violent night on the road nearby, restrained martial-arts mystery mood.",
    ),
    LocationConcept(
        "1",
        "山水县境",
        "山水县城",
        "01-第一章-山水县境/02-地点概念图/第一章-地点概念-山水县城.png",
        "01-第一章-山水县境/01-章节主视觉/第一章-章节主视觉-山水县境远景.png",
        "Depict Shanshui County Town after rain: sealed city walls, grey tiled roofs, county yamen silhouette, wine houses and medicine shops tucked along wet lanes, lanterns under eaves, mountains and river mist behind the town, a quiet sense of hidden ledgers and martial intrigue.",
    ),
    LocationConcept(
        "1",
        "山水县境",
        "疫村",
        "01-第一章-山水县境/02-地点概念图/第一章-地点概念-疫村.png",
        "01-第一章-山水县境/01-章节主视觉/第一章-章节主视觉-山水县境远景.png",
        "Depict the Plague Village: an isolated riverside village under quarantine, muddy lanes, white cloth markers, herb smoke, shuttered homes, fields fading into damp hills, desperate but dignified atmosphere, wuxia medical mystery without gore.",
    ),
    LocationConcept(
        "1",
        "山水县境",
        "山神寨",
        "01-第一章-山水县境/02-地点概念图/第一章-地点概念-山神寨.png",
        "01-第一章-山水县境/01-章节主视觉/第一章-章节主视觉-山水县境远景.png",
        "Depict Mountain God Stockade: a martial mountain stronghold on pine cliffs, timber gates, watchtowers, rope bridges, training yard glimpsed inside the palisade, shrine flags in wet mountain wind, half righteous refuge and half hidden account book.",
    ),
    LocationConcept(
        "1",
        "山水县境",
        "旧镖道",
        "01-第一章-山水县境/02-地点概念图/第一章-地点概念-旧镖道.png",
        "01-第一章-山水县境/01-章节主视觉/第一章-章节主视觉-山水县境远景.png",
        "Depict the Old Escort Road: an abandoned courier road through dense green ridges, broken waystones, rain-soaked ruts, an overturned escort cart, old banners tangled in branches, an unresolved cold case lingering in the wind.",
    ),
    LocationConcept(
        "1",
        "山水县境",
        "废书院",
        "01-第一章-山水县境/02-地点概念图/第一章-地点概念-废书院.png",
        "01-第一章-山水县境/01-章节主视觉/第一章-章节主视觉-山水县境远景.png",
        "Depict the Ruined Academy: overgrown courtyards, collapsed lecture halls, mossy walls, scattered paper and broken lamp arrays, mist between old pines, scholarly elegance turned into a haunted wuxia investigation site.",
    ),
    LocationConcept(
        "1",
        "山水县境",
        "清河黑市",
        "01-第一章-山水县境/02-地点概念图/第一章-地点概念-清河黑市.png",
        "01-第一章-山水县境/01-章节主视觉/第一章-章节主视觉-山水县境远景.png",
        "Depict Qinghe Black Market: a hidden waterside night market beneath bridges and dock warehouses, lantern boats, rain tarps, narrow planks, shadowed stalls, river mist and secret documents changing hands, grounded Jiangnan wuxia noir.",
    ),
    LocationConcept(
        "1",
        "山水县境",
        "龙王庙水闸",
        "01-第一章-山水县境/02-地点概念图/第一章-地点概念-龙王庙水闸.png",
        "01-第一章-山水县境/01-章节主视觉/第一章-章节主视觉-山水县境远景.png",
        "Depict Dragon King Temple Sluice: an old river god temple fused with massive wooden floodgates, storm clouds, swollen water, bronze bells and talisman traces, cliffs and county river converging into a dramatic chapter finale location.",
    ),
    LocationConcept(
        "2",
        "槐安古道",
        "龙门驿",
        "02-第二章-槐安古道/02-地点概念图/第二章-地点概念-龙门驿.png",
        "02-第二章-槐安古道/01-章节主视觉/第二章-章节主视觉-槐安古道黄沙边关远景.png",
        "Depict Longmen Relay Station at the mouth of the desert road: wind-scoured gates, courier stables, caravan flags, cliff pass, sand haze, martial factions arriving under harsh border light.",
    ),
    LocationConcept(
        "2",
        "槐安古道",
        "黄沙客栈",
        "02-第二章-槐安古道/02-地点概念图/第二章-地点概念-黄沙客栈.png",
        "02-第二章-槐安古道/01-章节主视觉/第二章-章节主视觉-槐安古道黄沙边关远景.png",
        "Depict Yellow Sand Inn: a lone frontier inn half buried by dunes, tethered horses, wind bells, storm shutters, warm lantern glow against cold desert night, a sealed-door wuxia suspense mood.",
    ),
    LocationConcept(
        "2",
        "槐安古道",
        "镜湖书院",
        "02-第二章-槐安古道/02-地点概念图/第二章-地点概念-镜湖书院.png",
        "02-第二章-槐安古道/01-章节主视觉/第二章-章节主视觉-槐安古道黄沙边关远景.png",
        "Depict Mirror Lake Academy: an oasis academy beside a still lake in the ancient road, white walls, stone bridges, book pavilions, reeds and desert cliffs reflected in water, elegant scholarship hiding dangerous old records.",
    ),
    LocationConcept(
        "2",
        "槐安古道",
        "百工坞",
        "02-第二章-槐安古道/02-地点概念图/第二章-地点概念-百工坞.png",
        "02-第二章-槐安古道/01-章节主视觉/第二章-章节主视觉-槐安古道黄沙边关远景.png",
        "Depict Baigong Craft Fort: a fortified artisan settlement in desert rock, waterwheels, cranes, bronze mechanisms, workshops embedded in cliffs, sparks in wind, the origin of dangerous arrays and devices.",
    ),
    LocationConcept(
        "2",
        "槐安古道",
        "鬼市",
        "02-第二章-槐安古道/02-地点概念图/第二章-地点概念-鬼市.png",
        "02-第二章-槐安古道/01-章节主视觉/第二章-章节主视觉-槐安古道黄沙边关远景.png",
        "Depict the Ghost Market under the sands: a concealed night bazaar inside wind-carved caverns and buried streets, masked lanterns, hidden stairs, cloth awnings, dust shafts, illicit identities and records moving in silence.",
    ),
    LocationConcept(
        "2",
        "槐安古道",
        "千佛石窟",
        "02-第二章-槐安古道/02-地点概念图/第二章-地点概念-千佛石窟.png",
        "02-第二章-槐安古道/01-章节主视觉/第二章-章节主视觉-槐安古道黄沙边关远景.png",
        "Depict Thousand Buddha Grottoes: monumental cliff caves along the desert road, eroded statues, mural fragments, prayer banners, long shadows, wind and echo implying ancient secrets of the Zhaoying bureau.",
    ),
    LocationConcept(
        "2",
        "槐安古道",
        "武林盟会",
        "02-第二章-槐安古道/02-地点概念图/第二章-地点概念-武林盟会.png",
        "02-第二章-槐安古道/01-章节主视觉/第二章-章节主视觉-槐安古道黄沙边关远景.png",
        "Depict the Martial Alliance Assembly: a temporary grand meeting ground on the ancient road, banners of rival sects, stone platforms, tents, weapon racks, dust-lit crowds as tiny scale figures, truth ready to become either banner or blood debt.",
    ),
    LocationConcept(
        "2",
        "槐安古道",
        "照影楼坞",
        "02-第二章-槐安古道/02-地点概念图/第二章-地点概念-照影楼坞.png",
        "02-第二章-槐安古道/01-章节主视觉/第二章-章节主视觉-槐安古道黄沙边关远景.png",
        "Depict Zhaoying Tower Fort: a fortified tower-and-dock compound at the edge of desert cliffs, bronze bells, archive vault silhouettes, mechanical gates, signal fires, a severe second-chapter finale stronghold.",
    ),
    LocationConcept(
        "3",
        "照影城",
        "九门",
        "03-第三章-照影城/02-地点概念图/第三章-地点概念-九门.png",
        "03-第三章-照影城/01-章节主视觉/第三章-章节主视觉-照影城宫城下城远景.png",
        "Depict the Nine Gates of Zhaoying City: colossal layered city gates, inspection lanes, weapon racks, official lanterns, rain on stone, crowds reduced to tiny silhouettes, every document and old debt passing under imperial shadow.",
    ),
    LocationConcept(
        "3",
        "照影城",
        "外郭",
        "03-第三章-照影城/02-地点概念图/第三章-地点概念-外郭.png",
        "03-第三章-照影城/01-章节主视觉/第三章-章节主视觉-照影城宫城下城远景.png",
        "Depict the Outer Ward: refugee sheds, caravan yards, border merchants, temporary shrines, city walls looming above, wet streets and smoke, the consequences of earlier chapters speaking before the capital does.",
    ),
    LocationConcept(
        "3",
        "照影城",
        "下坊",
        "03-第三章-照影城/02-地点概念图/第三章-地点概念-下坊.png",
        "03-第三章-照影城/01-章节主视觉/第三章-章节主视觉-照影城宫城下城远景.png",
        "Depict the Lower Ward: dense streets of martial drifters and guild houses, tea towers, opera platforms, wet rooftops, hidden gang routes, lively city smoke with danger moving underneath.",
    ),
    LocationConcept(
        "3",
        "照影城",
        "水巷",
        "03-第三章-照影城/02-地点概念图/第三章-地点概念-水巷.png",
        "03-第三章-照影城/01-章节主视觉/第三章-章节主视觉-照影城宫城下城远景.png",
        "Depict the Water Lanes: canal alleys, narrow boats, dripping bridges, shuttered waterside houses, black-market lamps reflected on water, secret doors suggested in the masonry, rain-soaked capital noir.",
    ),
    LocationConcept(
        "3",
        "照影城",
        "武籍区",
        "03-第三章-照影城/02-地点概念图/第三章-地点概念-武籍区.png",
        "03-第三章-照影城/01-章节主视觉/第三章-章节主视觉-照影城宫城下城远景.png",
        "Depict the Martial Registry District: stern archive offices, high walls, stone courtyards, guarded bridges, stacked document towers with no readable text, bureaucratic power turning Jianghu lives into records.",
    ),
    LocationConcept(
        "3",
        "照影城",
        "官署",
        "03-第三章-照影城/02-地点概念图/第三章-地点概念-官署.png",
        "03-第三章-照影城/01-章节主视觉/第三章-章节主视觉-照影城宫城下城远景.png",
        "Depict the Official Yamen District: trial halls, archive wings, drum tower, rain-dark stone steps, austere courtyards, lanterns under eaves, testimony becoming either blade or chain.",
    ),
    LocationConcept(
        "3",
        "照影城",
        "慈心总馆",
        "03-第三章-照影城/02-地点概念图/第三章-地点概念-慈心总馆.png",
        "03-第三章-照影城/01-章节主视觉/第三章-章节主视觉-照影城宫城下城远景.png",
        "Depict Cixin Grand Medical Hall: a major healing institution in the capital, medicinal courtyards, herb steam, covered corridors, clinic lamps, dignified physicians' compound carrying an old hidden guilt.",
    ),
    LocationConcept(
        "3",
        "照影城",
        "百工坊",
        "03-第三章-照影城/02-地点概念图/第三章-地点概念-百工坊.png",
        "03-第三章-照影城/01-章节主视觉/第三章-章节主视觉-照影城宫城下城远景.png",
        "Depict the Hundred Crafts Quarter: foundries, mechanism yards, cranes, gear silhouettes, red furnace light against rainy blue stone, artisans' district forming the mechanical heart of the city.",
    ),
    LocationConcept(
        "3",
        "照影城",
        "皇城外朝",
        "03-第三章-照影城/02-地点概念图/第三章-地点概念-皇城外朝.png",
        "03-第三章-照影城/01-章节主视觉/第三章-章节主视觉-照影城宫城下城远景.png",
        "Depict the Imperial Outer Court: enormous palace approach, ceremonial stone plaza, layered gates, banners, rain-polished steps, martial factions gathered as tiny figures before overwhelming state power.",
    ),
    LocationConcept(
        "3",
        "照影城",
        "摘星楼",
        "03-第三章-照影城/02-地点概念图/第三章-地点概念-摘星楼.png",
        "03-第三章-照影城/01-章节主视觉/第三章-章节主视觉-照影城宫城下城远景.png",
        "Depict Star-Plucking Tower: a tall observatory-like tower rising above Zhaoying City, bridges and sealed stairways, night sky, bronze instruments, the city below and the hidden mother bureau implied beneath.",
    ),
    LocationConcept(
        "3",
        "照影城",
        "断因房",
        "03-第三章-照影城/02-地点概念图/第三章-地点概念-断因房.png",
        "03-第三章-照影城/01-章节主视觉/第三章-章节主视觉-照影城宫城下城远景.png",
        "Depict Severing-Cause House: a secluded black-walled compound in the capital, narrow gate, bare courtyard trees, rainwater channels, silent guards as scale figures, the shadow of old assassination orders and unpaid debts.",
    ),
    LocationConcept(
        "3",
        "照影城",
        "地下照影母局",
        "03-第三章-照影城/02-地点概念图/第三章-地点概念-地下照影母局.png",
        "03-第三章-照影城/01-章节主视觉/第三章-章节主视觉-照影城宫城下城远景.png",
        "Depict the Underground Zhaoying Mother Bureau: a vast subterranean brass-and-stone archive machine beneath the capital, suspended bells, record tablets, water channels, deep shafts, the final place where martial lives are measured and judged.",
    ),
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--chapter", choices=["1", "2", "3"], help="Only generate one chapter.")
    parser.add_argument("--location", action="append", help="Only generate one or more exact Chinese location names.")
    parser.add_argument("--overwrite", action="store_true", help="Regenerate files that already exist.")
    parser.add_argument("--dry-run", action="store_true", help="Print planned outputs without calling the API.")
    parser.add_argument("--model", default="gpt-image-2")
    parser.add_argument("--size", default="3840x2160")
    parser.add_argument("--quality", default="high", choices=["auto", "low", "medium", "high"])
    return parser.parse_args()


def selected_concepts(args: argparse.Namespace) -> list[LocationConcept]:
    concepts = CONCEPTS
    if args.chapter:
        concepts = [concept for concept in concepts if concept.chapter == args.chapter]
    if args.location:
        wanted = set(args.location)
        concepts = [concept for concept in concepts if concept.location in wanted]
    return concepts


def response_bytes(image_data: object) -> bytes:
    b64_json = getattr(image_data, "b64_json", None)
    if b64_json:
        return base64.b64decode(b64_json)

    url = getattr(image_data, "url", None)
    if url:
        with urllib.request.urlopen(url, timeout=120) as response:
            return response.read()

    raise RuntimeError("OpenAI response did not include b64_json or url image data.")


def build_prompt(concept: LocationConcept) -> str:
    return f"""{STYLE_RULES}

Region: {concept.region}
Location: {concept.location}
Brief: {concept.prompt}"""


def main() -> int:
    args = parse_args()
    concepts = selected_concepts(args)

    if not concepts:
        print("No matching location concepts.", file=sys.stderr)
        return 2

    for concept in concepts:
        output = ASSET_ROOT / concept.output
        print(f"{concept.location}: {output}")

    if args.dry_run:
        return 0

    from dotenv import load_dotenv
    from openai import OpenAI

    load_dotenv()
    if not os.environ.get("OPENAI_API_KEY"):
        print("error: OPENAI_API_KEY is not set; generation cannot run.", file=sys.stderr)
        return 2

    client = OpenAI()

    for concept in concepts:
        output = ASSET_ROOT / concept.output
        if output.exists() and not args.overwrite:
            print(f"skip existing: {output}")
            continue

        reference = ASSET_ROOT / concept.reference
        if not reference.exists():
            print(f"error: missing style reference: {reference}", file=sys.stderr)
            return 2

        output.parent.mkdir(parents=True, exist_ok=True)
        prompt = build_prompt(concept)

        with reference.open("rb") as image_file:
            result = client.images.edit(
                model=args.model,
                image=[image_file],
                prompt=prompt,
                size=args.size,
                quality=args.quality,
                n=1,
            )

        output.write_bytes(response_bytes(result.data[0]))
        print(f"wrote: {output}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
