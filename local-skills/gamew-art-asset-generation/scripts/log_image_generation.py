#!/usr/bin/env python3
"""Append one GameW image generation record to the project log."""

from __future__ import annotations

import argparse
import datetime as dt
import re
import sys
from pathlib import Path


DEFAULT_SETTINGS = "3840x2160, 4K landscape, high quality, stylized-concept, no text/UI/watermark"


def path_text(value: str | None, repo: Path) -> str:
    if not value:
        return "(none)"
    text = value.strip()
    if not text:
        return "(none)"
    if re.match(r"^[A-Za-z][A-Za-z0-9+.-]*://", text):
        return text

    candidate = Path(text).expanduser()
    if not candidate.is_absolute():
        candidate = repo / candidate

    try:
        resolved = candidate.resolve()
    except OSError:
        return text

    try:
        return resolved.relative_to(repo).as_posix()
    except ValueError:
        return str(resolved)


def annotated_path_text(value: str, repo: Path) -> str:
    path_part, separator, note = value.partition("::")
    normalized = path_text(path_part, repo)
    if separator and note.strip():
        return f"{normalized} :: {note.strip()}"
    return normalized


def bullet_list(values: list[str]) -> str:
    clean = [value for value in values if value and value != "(none)"]
    if not clean:
        return "- (none)"
    return "\n".join(f"- {value}" for value in clean)


def prompt_fence(prompt: str) -> str:
    longest = max((len(match.group(0)) for match in re.finditer(r"`+", prompt)), default=0)
    return "`" * max(3, longest + 1)


def read_prompt(args: argparse.Namespace, parser: argparse.ArgumentParser) -> str:
    if args.prompt_file:
        return Path(args.prompt_file).expanduser().read_text(encoding="utf-8").strip()
    if args.prompt is not None:
        return args.prompt.strip()
    if not sys.stdin.isatty():
        stdin_prompt = sys.stdin.read().strip()
        if stdin_prompt:
            return stdin_prompt
    parser.error("provide --prompt-file, --prompt, or pipe the prompt on stdin")


def build_entry(args: argparse.Namespace, prompt: str, repo: Path) -> str:
    timestamp = dt.datetime.now().astimezone().replace(microsecond=0).isoformat()
    references = [annotated_path_text(value, repo) for value in args.reference]
    motif_sources = [annotated_path_text(value, repo) for value in args.motif_source]
    fence = prompt_fence(prompt)

    return f"""## {timestamp} - {args.status}

- Chapter: {args.chapter or "(unspecified)"}
- Asset type: {args.asset_type or "(unspecified)"}
- Generated: {path_text(args.generated, repo)}
- Asset: {path_text(args.asset, repo)}
- Settings: {args.settings}
- Notes: {args.notes or "(none)"}

References:
{bullet_list(references)}

Motif sources:
{bullet_list(motif_sources)}

Prompt:
{fence}text
{prompt}
{fence}

"""


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Append a GameW imagegen prompt/reference record to art-assets/generation-log.md."
    )
    parser.add_argument("--repo", default=".", help="GameW repository root")
    parser.add_argument("--log", default="art-assets/generation-log.md", help="Log path relative to repo")
    parser.add_argument("--status", choices=["accepted", "candidate", "rejected"], default="accepted")
    parser.add_argument("--generated", required=True, help="Generated PNG path from CODEX_HOME/generated_images")
    parser.add_argument("--asset", help="Final art-assets path when accepted")
    parser.add_argument("--chapter", help="Chapter label, such as 01-第一章-山水县境")
    parser.add_argument("--asset-type", help="Asset folder or taxonomy type")
    parser.add_argument("--reference", action="append", default=[], help="Reference image path, optionally 'path :: role'")
    parser.add_argument("--motif-source", action="append", default=[], help="Source doc/script, optionally 'path :: motif'")
    parser.add_argument("--settings", default=DEFAULT_SETTINGS)
    parser.add_argument("--notes", default="")
    parser.add_argument("--prompt-file", help="UTF-8 file containing the exact prompt")
    parser.add_argument("--prompt", help="Exact prompt text; prefer --prompt-file for long prompts")
    args = parser.parse_args()

    repo = Path(args.repo).expanduser().resolve()
    prompt = read_prompt(args, parser)
    log_path = Path(args.log).expanduser()
    if not log_path.is_absolute():
        log_path = repo / log_path

    log_path.parent.mkdir(parents=True, exist_ok=True)
    if not log_path.exists():
        log_path.write_text(
            "# GameW Image Generation Log\n\n"
            "Each entry records one `imagegen` call, including prompts, references, generated source files, "
            "and final asset paths when accepted.\n\n",
            encoding="utf-8",
        )

    with log_path.open("a", encoding="utf-8") as handle:
        handle.write(build_entry(args, prompt, repo))

    print(f"logged generation: {log_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
