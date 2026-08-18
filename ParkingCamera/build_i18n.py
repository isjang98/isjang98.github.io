#!/usr/bin/env python3
"""언어별 정적 페이지 생성기.

index.html(한국어 원본)과 assets/i18n/{code}.json 을 읽어
{code}/index.html 을 생성한다. 크롤러가 JS 없이도 각 언어의
완성된 HTML 을 받도록 하기 위한 렌더-커밋 방식이다.

사용법: python3 build_i18n.py   (index.html 수정 후 재실행하고 결과를 커밋)
"""
import json
import re
import sys
from html import escape
from pathlib import Path

ROOT = Path(__file__).parent
BASE_URL = 'https://isjang98.github.io/ParkingCamera/'
LANGS = ['en', 'de', 'fr', 'ja', 'vi', 'zh-CN', 'zh-TW']
OG_LOCALE = {'ko': 'ko_KR', 'en': 'en_US', 'de': 'de_DE', 'fr': 'fr_FR',
             'ja': 'ja_JP', 'vi': 'vi_VN', 'zh-CN': 'zh_CN', 'zh-TW': 'zh_TW'}
VIDEO_UPLOAD_DATE = '2026-08-18'  # 언어별 영상이 추가된 날짜


def die(msg):
    print(f'오류: {msg}', file=sys.stderr)
    sys.exit(1)


def strip_tags(s):
    return re.sub(r'<[^>]+>', ' ', s).replace('\xa0', ' ').strip()


def replace_inner(html, key, value):
    """data-i18n="key" 요소의 innerHTML 을 전부 교체한다 (같은 키 다중 사용 지원)."""
    pat = re.compile(r'<(\w+)\b[^>]*\bdata-i18n="' + re.escape(key) + r'"[^>]*>')
    pos, count = 0, 0
    while True:
        m = pat.search(html, pos)
        if not m:
            break
        tag, start = m.group(1), m.end()
        open_re = re.compile(r'<' + tag + r'\b')
        close_re = re.compile(r'</' + tag + r'\s*>')
        depth, i, close_start = 1, start, -1
        while depth:
            mc = close_re.search(html, i)
            if not mc:
                die(f'{key}: <{tag}> 닫는 태그를 찾지 못함')
            mo = open_re.search(html, i)
            if mo and mo.start() < mc.start():
                depth += 1
                i = mo.end()
            else:
                depth -= 1
                close_start, i = mc.start(), mc.end()
        html = html[:start] + value + html[close_start:]
        pos = start + len(value)
        count += 1
    return html, count


def sub_once(html, pattern, repl, label):
    out, n = re.subn(pattern, repl, html, count=1)
    if n != 1:
        die(f'{label}: 패턴을 찾지 못함')
    return out


def build(src, code, d):
    url = BASE_URL + code + '/'
    title = d['meta.title']
    desc = d['meta.desc']
    h = src

    # ---- 상대경로를 상위 디렉토리 기준으로 (하위 디렉토리에서 서빙되므로) ----
    h = h.replace('src="assets/', 'src="../assets/')
    h = h.replace('href="assets/', 'href="../assets/')
    h = h.replace('href="privacy/', 'href="../privacy/')

    # ---- 문서 언어 / 메타 ----
    h = sub_once(h, r'<html lang="ko">', f'<html lang="{code}">', 'html lang')
    h = sub_once(h, r'<title>.*?</title>', f'<title>{escape(title)}</title>', 'title')
    h = sub_once(h, r'(<meta name="description" content=")[^"]*(")',
                 lambda m: m.group(1) + escape(desc, quote=True) + m.group(2), 'meta desc')
    for prop in ['og:title', 'twitter:title']:
        h = sub_once(h, r'((?:property|name)="' + prop + r'" content=")[^"]*(")',
                     lambda m: m.group(1) + escape(title, quote=True) + m.group(2), prop)
    for prop in ['og:description', 'twitter:description']:
        h = sub_once(h, r'((?:property|name)="' + prop + r'" content=")[^"]*(")',
                     lambda m: m.group(1) + escape(desc, quote=True) + m.group(2), prop)
    for prop in ['og:image:alt', 'twitter:image:alt']:
        h = sub_once(h, r'((?:property|name)="' + prop + r'" content=")[^"]*(")',
                     lambda m: m.group(1) + escape(title, quote=True) + m.group(2), prop)
    h = sub_once(h, r'(rel="canonical" href=")[^"]*(")',
                 lambda m: m.group(1) + url + m.group(2), 'canonical')
    h = sub_once(h, r'(property="og:url" content=")[^"]*(")',
                 lambda m: m.group(1) + url + m.group(2), 'og:url')
    # og:locale 은 페이지 언어로, 자신의 locale 은 alternate 목록에서 ko_KR 로 대체
    h = sub_once(h, r'(property="og:locale" content=")ko_KR(")',
                 lambda m: m.group(1) + OG_LOCALE[code] + m.group(2), 'og:locale')
    h = sub_once(h, r'(property="og:locale:alternate" content=")' + OG_LOCALE[code] + r'(")',
                 lambda m: m.group(1) + 'ko_KR' + m.group(2), 'og:locale:alternate')

    # ---- data-i18n 본문 교체 ----
    page_keys = sorted(set(re.findall(r'data-i18n="([^"]+)"', h)))
    missing = [k for k in page_keys if k not in d]
    if missing:
        die(f'{code}.json 에 없는 키: {missing}')
    for k in page_keys:
        h, n = replace_inner(h, k, d[k])
        if n == 0:
            die(f'{k}: 교체 0회')

    # ---- alt 교체 ----
    for m in re.finditer(r'data-i18n-alt="([^"]+)"', src):
        k = m.group(1)
        if k not in d:
            die(f'{code}.json 에 alt 키 없음: {k}')
        h = re.sub(r'(<img\b[^>]*\bdata-i18n-alt="' + re.escape(k) + r'"[^>]*\balt=")[^"]*(")',
                   lambda mm: mm.group(1) + escape(d[k], quote=True) + mm.group(2), h)
        h = re.sub(r'(<img\b[^>]*\balt=")[^"]*("[^>]*\bdata-i18n-alt="' + re.escape(k) + r'")',
                   lambda mm: mm.group(1) + escape(d[k], quote=True) + mm.group(2), h)

    # ---- 언어별 스크린샷 ----
    def img_src(m):
        tag, base = m.group(0), m.group(1)
        # iOS 실기기 캡처는 ko/en 두 벌만 있어 그 외 언어는 영어판을 쓴다
        new = f'../assets/i18n/{base}-en.webp' if base.startswith('ios_') \
            else f'../assets/i18n/{base}-{code}.webp'
        tag = re.sub(r'src="[^"]*"', f'src="{new}"', tag)
        if not base.startswith('ios_'):  # 언어별 스크린샷은 720x1280 로 제작됨
            tag = re.sub(r'width="\d+"', 'width="720"', tag)
            tag = re.sub(r'height="\d+"', 'height="1280"', tag)
        return tag
    h = re.sub(r'<img\b[^>]*\bdata-i18n-img="([^"]+)"[^>]*>', img_src, h)

    # ---- 영상 ----
    h = sub_once(h, r'(id="parkingVideo" src=")[^"]*(")',
                 lambda m: m.group(1) + f'../assets/i18n/sidecam_parking-{code}.mp4' + m.group(2), 'video src')
    h = sub_once(h, r'(id="parkingVideo"[^>]*poster=")[^"]*(")',
                 lambda m: m.group(1) + f'../assets/i18n/sidecam_parking_poster-{code}.webp' + m.group(2), 'video poster')
    h = sub_once(h, r'(id="parkingVideo"[^>]*aria-label=")[^"]*(")',
                 lambda m: m.group(1) + escape(d['video.aria'], quote=True) + m.group(2), 'video aria')
    h = sub_once(h, r'(data-label-on=")[^"]*(")',
                 lambda m: m.group(1) + escape(d['video.on'], quote=True) + m.group(2), 'label-on')
    h = sub_once(h, r'(data-label-off=")[^"]*(")',
                 lambda m: m.group(1) + escape(d['video.off'], quote=True) + m.group(2), 'label-off')
    h = sub_once(h, r'(<span class="vs-lbl">)[^<]*(</span>)',
                 lambda m: m.group(1) + escape(d['video.on']) + m.group(2), 'vs-lbl')

    # ---- 언어 선택자: 현재 언어를 selected 로 ----
    h = sub_once(h, r'(<option value="' + re.escape(code) + r'")(>)',
                 lambda m: m.group(1) + ' selected' + m.group(2), 'langSel selected')

    # ---- JSON-LD ----
    blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S)
    if len(blocks) != 3:
        die(f'JSON-LD 블록 수가 3이 아님: {len(blocks)}')
    for raw in blocks:
        data = json.loads(raw)
        t = data.get('@type')
        if t == 'SoftwareApplication':
            data['description'] = desc
            data['url'] = url
        elif t == 'FAQPage':
            data['mainEntity'] = [
                {'@type': 'Question', 'name': strip_tags(d[f'faq.q{i}']),
                 'acceptedAnswer': {'@type': 'Answer', 'text': strip_tags(d[f'faq.a{i}'])}}
                for i in range(1, 7)
            ]
        elif t == 'VideoObject':
            data['name'] = title
            data['description'] = strip_tags(d['video.aria'])
            data['thumbnailUrl'] = f'{BASE_URL}assets/i18n/sidecam_parking_poster-{code}.webp'
            data['contentUrl'] = f'{BASE_URL}assets/i18n/sidecam_parking-{code}.mp4'
            data['uploadDate'] = VIDEO_UPLOAD_DATE
            data['inLanguage'] = code
        else:
            die(f'알 수 없는 JSON-LD 타입: {t}')
        h = h.replace(raw, '\n' + json.dumps(data, ensure_ascii=False, indent=2) + '\n')

    # ---- 검증 ----
    if 'src="assets/' in h or "href=\"assets/" in h:
        die(f'{code}: 미변환 상대경로 잔존')
    for raw in re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
        json.loads(raw)
    return h


def main():
    src = (ROOT / 'index.html').read_text(encoding='utf-8')
    for code in LANGS:
        d = json.loads((ROOT / 'assets' / 'i18n' / f'{code}.json').read_text(encoding='utf-8'))
        out = build(src, code, d)
        outdir = ROOT / code
        outdir.mkdir(exist_ok=True)
        (outdir / 'index.html').write_text(out, encoding='utf-8')
        print(f'  {code}/index.html  ({len(out):,}자)  title="{d["meta.title"][:40]}"')
    print(f'{len(LANGS)}개 언어 페이지 생성 완료')


if __name__ == '__main__':
    main()
