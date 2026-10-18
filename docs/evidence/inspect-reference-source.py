"""HTTP source inspection only. Does not render pages or exercise browser UI."""
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request, urlopen
import hashlib
import json
import re

OUT = Path(__file__).resolve().parent
BASE = 'https://amicalerotaryfrancophonie.org'
PATHS = ['/', '/a-propos/', '/equipe/', '/category/evenement/', '/category/actualite/',
         '/evenement/symposium-pour-la-paix-2026/', '/evenement/journee-rotary-unesco-2024/']


class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.regions, self.stylesheets, self.headings, self.links, self.buttons, self.images = [], [], [], [], [], []
        self.capture = None
        self.link = None
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ('script', 'style'):
            self.skip += 1
        if tag in ('header', 'nav', 'footer'):
            self.regions.append({'tag': tag, 'attrs': a})
        if tag == 'link' and a.get('rel') == 'stylesheet':
            self.stylesheets.append(a.get('href'))
        if tag == 'a':
            self.link = {'href': a.get('href'), 'text': ''}
        if tag == 'button':
            self.buttons.append(a)
        if tag == 'img' and len(self.images) < 8:
            self.images.append({k: v for k, v in a.items() if k in ('class', 'width', 'height', 'alt', 'loading')})
        if re.fullmatch('h[1-6]', tag):
            self.capture = {'tag': tag, 'text': ''}

    def handle_data(self, data):
        if self.skip:
            return
        if self.link is not None:
            self.link['text'] += data
        if self.capture is not None:
            self.capture['text'] += data

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.skip = max(0, self.skip - 1)
        if tag == 'a' and self.link is not None:
            self.link['text'] = ' '.join(self.link['text'].split())[:120]
            self.links.append(self.link)
            self.link = None
        if self.capture and tag == self.capture['tag']:
            self.capture['text'] = ' '.join(self.capture['text'].split())
            self.headings.append(self.capture)
            self.capture = None


def fetch(url):
    with urlopen(Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=25) as response:
        raw = response.read()
        return raw, response.status, response.url


pages = []
for path in PATHS:
    url = BASE + path
    try:
        raw, status, final_url = fetch(url)
        html = raw.decode('utf-8')
        parser = Parser()
        parser.feed(html)
        item = {'url': url, 'final_url': final_url, 'http_status': status,
                'observed_at_utc': datetime.now(timezone.utc).isoformat(),
                'method': 'HTTP source; no rendered viewport or interaction verification',
                'response_sha256': hashlib.sha256(raw).hexdigest(),
                'replacement_character_count': html.count('\ufffd'),
                'regions': parser.regions, 'heading_count': len(parser.headings),
                'headings': [h for h in parser.headings if h['tag'] in ('h1', 'h2')][:8],
                'navigation_links': parser.links[:16], 'tail_links': parser.links[-16:],
                'buttons': parser.buttons, 'image_attributes_sample': parser.images,
                'stylesheets': parser.stylesheets,
                'inline_layout_declarations': list(dict.fromkeys(re.findall(
                    r'--(?:global|kb|mobile|desktop)[\w-]+\s*:[^;}]+', html)))[:65]}
        if path == '/':
            snippets = []
            css_url = parser.stylesheets[0]
            css_raw, css_status, _ = fetch(css_url)
            css = css_raw.decode('utf-8')
            for pattern in [r'--global-content-width[^;}]*', r'--global-content-edge-padding[^;}]*',
                            r'--global-palette[1-9]:[^;}]*', r'font-family:[^;}]*',
                            r'@media[^{}]*', r'[^{}]*\.site-branding[^{}]*\{[^{}]*\}',
                            r'[^{}]*\.site-header[^{}]*\{[^{}]*\}',
                            r'[^{}]*\.site-footer[^{}]*\{[^{}]*\}']:
                snippets.extend(list(dict.fromkeys(re.findall(pattern, css)))[:12])
            item['css_source'] = {'url': css_url, 'http_status': css_status,
                                  'sha256': hashlib.sha256(css_raw).hexdigest(),
                                  'declaration_samples': snippets}
        pages.append(item)
        print(json.dumps({'url': url, 'status': status, 'heading_count': len(parser.headings)}, ensure_ascii=True))
    except Exception as error:
        pages.append({'url': url, 'error': str(error), 'method': 'HTTP source'})
        print(json.dumps(pages[-1], ensure_ascii=True))
(OUT / 'reference-source-observations.json').write_text(json.dumps(pages, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
