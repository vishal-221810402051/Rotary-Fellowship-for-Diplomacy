"""Read-only extraction for these simple Type1/WinAnsi questionnaire PDFs.

Uses only Python's standard library; rejects unsupported page/text structures.
This is evidence tooling, not an application dependency or general PDF parser.
"""
from pathlib import Path
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[2]
SOURCES = {
    'data-a': ROOT.parent / 'Expressions_de_France_Requirements_2026-10-15.pdf',
    'earlier-questionnaire': Path('C:/Users/visha/Downloads/Expressions_de_France_Requirements_2026-10-11.pdf'),
}


def decode_literal(value):
    out = bytearray()
    i = 0
    escapes = {ord('n'): 10, ord('r'): 13, ord('t'): 9, ord('b'): 8, ord('f'): 12}
    while i < len(value):
        char = value[i]
        i += 1
        if char == 92:
            char = value[i]
            i += 1
            if 48 <= char <= 55:
                octal = bytes([char])
                while i < len(value) and len(octal) < 3 and 48 <= value[i] <= 55:
                    octal += bytes([value[i]])
                    i += 1
                out.append(int(octal, 8))
            elif char in (10, 13):
                if char == 13 and i < len(value) and value[i] == 10:
                    i += 1
            else:
                out.append(escapes.get(char, char))
        else:
            out.append(char)
    return out.decode('cp1252')


report = {}
for source_id, path in SOURCES.items():
    raw = path.read_bytes()
    objects = {int(m[1]): m[2] for m in re.finditer(rb'(\d+) 0 obj\s*(.*?)\s*endobj', raw, re.S)}
    page_tree = next(v for v in objects.values() if re.search(rb'/Type\s*/Pages\b', v))
    kids = re.search(rb'/Kids\s*\[(.*?)\]', page_tree, re.S)[1]
    page_ids = [int(x) for x in re.findall(rb'(\d+) 0 R', kids)]
    assert len(page_ids) == int(re.search(rb'/Count\s+(\d+)', page_tree)[1])
    assert b'/WinAnsiEncoding' in raw and b'/Filter' not in raw
    pages = []
    for page_number, page_id in enumerate(page_ids, 1):
        page = objects[page_id]
        contents_id = int(re.search(rb'/Contents\s+(\d+) 0 R', page)[1])
        contents = objects[contents_id]
        stream = re.search(rb'stream\r?\n(.*?)\r?\nendstream', contents, re.S)[1]
        assert len(stream) == int(re.search(rb'/Length\s+(\d+)', contents)[1]), (source_id, page_number)
        strings = re.findall(rb'\(((?:\\[\s\S]|[^\\()])*)\)\s*Tj\b', stream)
        assert len(strings) == len(re.findall(rb'\bTj\b', stream))
        assert not re.search(rb'\bTJ\b|\s[\x22\x27]\s', stream)
        text = '\n'.join(decode_literal(s) for s in strings)
        assert f'{page_number} / {len(page_ids)}' in text
        pages.append({'page': page_number, 'text_objects': len(strings), 'text': text})
    report[source_id] = {'path': str(path.resolve()), 'bytes': len(raw), 'sha256': hashlib.sha256(raw).hexdigest(), 'page_count': len(pages), 'pages': pages}
    output = ROOT / 'docs' / 'evidence' / f'{source_id}-pages.txt'
    output.write_text('\n\n'.join(f'=== PDF PAGE {p["page"]} ===\n{p["text"]}' for p in pages), encoding='utf-8')
(ROOT / 'docs' / 'evidence' / 'questionnaire-extraction.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({k: {f: v[f] for f in ['path', 'bytes', 'sha256', 'page_count']} for k, v in report.items()}, indent=2))
