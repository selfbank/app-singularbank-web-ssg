#!/usr/bin/env python3
"""
Extrae texto plano de un .docx (OOXML) para intake/discovery BMad.
Solo biblioteca estándar: zipfile + ElementTree.

Uso:
  python extract_docx_text.py ruta/al/archivo.docx
  python extract_docx_text.py archivo.docx --media   # lista word/media/*
  python extract_docx_text.py archivo.docx -o extracted.txt
"""

from __future__ import annotations

import argparse
import sys
import zipfile
import xml.etree.ElementTree as ET

W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"


def _text_from_paragraph(p: ET.Element) -> str:
    parts: list[str] = []
    for t in p.iter(f"{{{W_NS}}}t"):
        if t.text:
            parts.append(t.text)
        if t.tail:
            parts.append(t.tail)
    return "".join(parts).strip()


def extract_plain_text(docx_path: str) -> str:
    with zipfile.ZipFile(docx_path, "r") as z:
        data = z.read("word/document.xml")
    root = ET.fromstring(data)
    body = root.find(f".//{{{W_NS}}}body")
    if body is None:
        return ""
    paragraphs: list[str] = []
    for p in body.iter(f"{{{W_NS}}}p"):
        line = _text_from_paragraph(p)
        if line:
            paragraphs.append(line)
    return "\n\n".join(paragraphs)


def list_media(docx_path: str) -> list[str]:
    with zipfile.ZipFile(docx_path, "r") as z:
        return sorted(n for n in z.namelist() if n.startswith("word/media/"))


def main() -> int:
    ap = argparse.ArgumentParser(description="Extract text from .docx")
    ap.add_argument("docx", help="Ruta al fichero .docx")
    ap.add_argument(
        "--media",
        action="store_true",
        help="Listar rutas de medios incrustados (imágenes, etc.)",
    )
    ap.add_argument(
        "-o",
        "--output",
        help="Escribir texto en este fichero (UTF-8) en lugar de stdout",
    )
    args = ap.parse_args()
    try:
        if args.media:
            for name in list_media(args.docx):
                print(name)
            return 0
        text = extract_plain_text(args.docx)
        if args.output:
            with open(args.output, "w", encoding="utf-8") as f:
                f.write(text)
                if text and not text.endswith("\n"):
                    f.write("\n")
        else:
            sys.stdout.write(text)
            if text and not text.endswith("\n"):
                sys.stdout.write("\n")
        return 0
    except (OSError, zipfile.BadZipFile, KeyError, ET.ParseError) as e:
        print(f"Error: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
