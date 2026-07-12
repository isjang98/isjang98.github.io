#!/usr/bin/env python3
"""
말씀온 랜딩 페이지 리뷰 자동 갱신 스크립트.

- Google Play 공개 리뷰를 긁어와 톤이 맞는 5★ 후기만 필터링
- pinned_reviews.json(손으로 고른 고정 후기)을 앞에 두고, 나머지 슬롯을 최신 후기로 채움
- index.html의 <!-- REVIEWS:START --> ~ <!-- REVIEWS:END --> 사이를 재생성
- JSON-LD aggregateRating(평점/리뷰수)를 실제값으로 갱신
- 스크래핑이 실패하거나 후기가 너무 적으면 아무것도 바꾸지 않음(폴백)

수동 실행:  python3 tools/fetch_reviews.py
"""
import html
import json
import os
import re
import sys

from google_play_scraper import app as gp_app, reviews as gp_reviews, Sort

APP_ID = "kr.bibleon"
CARD_COUNT = 12          # 페이지에 노출할 후기 카드 수(CSS nth-child 색상과 일치)
MIN_LEN, MAX_LEN = 20, 170

HERE = os.path.dirname(os.path.abspath(__file__))
INDEX = os.path.join(HERE, "..", "index.html")
PINNED = os.path.join(HERE, "pinned_reviews.json")

# 톤이 안 맞거나 버그 문의/질문성 후기를 걸러내는 키워드
BAD = re.compile(
    r"짤|안되|안 되|안돼|오류|버그|문제|삭제|먹통|튕|광고|업데이트 후|안 나|안나옴|"
    r"에러|불편|없나요|있나요|궁금|되나요|될까요|해주세요|부탁|\?|？"
)


def is_broken_name(name):
    """조합 안 된 한글 자모(ᄂᄀᄋ 같은 깨진 닉네임) 판별 — U+1100~U+11FF."""
    return any("ᄀ" <= ch <= "ᇿ" for ch in name)


def fetch_clean_reviews():
    """5★ + 적당한 길이 + 톤 필터를 통과한 리뷰 리스트(최신·도움순)."""
    seen = {}
    for sort in (Sort.NEWEST, Sort.MOST_RELEVANT):
        res, _ = gp_reviews(APP_ID, lang="ko", country="kr", sort=sort, count=150)
        for r in res:
            seen[r["reviewId"]] = r
    clean = []
    for r in seen.values():
        c = (r["content"] or "").strip()
        if is_broken_name(r["userName"] or ""):
            continue
        if r["score"] == 5 and MIN_LEN <= len(c) <= MAX_LEN and not BAD.search(c):
            clean.append({"author": r["userName"], "text": c,
                          "thumbs": r["thumbsUpCount"], "at": str(r["at"])})
    clean.sort(key=lambda r: (r["thumbs"], r["at"]), reverse=True)
    return clean


def mask_name(name):
    """실명 보호: 첫 글자 + 가운데 * + 끝 글자 (박명숙 → 박*숙)."""
    n = name.strip()
    if len(n) <= 1:
        return "익명"
    if len(n) == 2:
        return n[0] + "*"
    return n[0] + "*" * (len(n) - 2) + n[-1]


def build_cards(pinned, auto):
    """고정 후기 + 자동 후기를 합쳐 CARD_COUNT개, 작성자 중복 제거."""
    picked, names = [], set()
    for r in pinned + auto:
        name = r["author"].strip()
        if name in names:
            continue
        names.add(name)
        picked.append(r)
        if len(picked) >= CARD_COUNT:
            break

    cards = []
    for r in picked:
        author = html.escape(mask_name(r["author"]))
        text = html.escape(r["text"].strip())
        cards.append(
            '                    <div class="review-card">\n'
            '                        <div class="review-header">\n'
            f'                            <span class="review-author">{author}</span>\n'
            '                            <span class="review-rating">⭐⭐⭐⭐⭐</span>\n'
            '                        </div>\n'
            f'                        <p class="review-text">"{text}"</p>\n'
            '                        <span class="review-source">Google Play 리뷰</span>\n'
            '                    </div>'
        )
    return "\n".join(cards)


def update_index(cards_html, score, rating_count):
    with open(INDEX, encoding="utf-8") as f:
        doc = f.read()
    original = doc

    # 1) 리뷰 카드 블록 교체
    block = re.compile(
        r"(<!-- REVIEWS:START[^>]*-->)(.*?)(\s*<!-- REVIEWS:END -->)", re.S)
    if not block.search(doc):
        sys.exit("ERROR: index.html에 REVIEWS:START/END 마커가 없습니다.")
    doc = block.sub(lambda m: f"{m.group(1)}\n{cards_html}\n{m.group(3)}", doc)

    # 2) JSON-LD 평점/리뷰수 갱신(aggregateRating 블록 안에서만)
    if score is not None and rating_count is not None:
        def fix_rating(m):
            blk = m.group(0)
            blk = re.sub(r'("ratingValue":\s*")[^"]*(")',
                         rf'\g<1>{score}\g<2>', blk)
            blk = re.sub(r'("ratingCount":\s*")[^"]*(")',
                         rf'\g<1>{rating_count}\g<2>', blk)
            return blk
        doc = re.sub(r'"aggregateRating":\s*\{.*?\}', fix_rating, doc, flags=re.S)

    if doc == original:
        print("변경 없음 — index.html 그대로.")
        return False
    with open(INDEX, "w", encoding="utf-8") as f:
        f.write(doc)
    print("index.html 갱신 완료.")
    return True


def main():
    clean = fetch_clean_reviews()
    print(f"필터 통과 후기: {len(clean)}개")

    pinned = json.load(open(PINNED, encoding="utf-8"))
    need_auto = CARD_COUNT - len(pinned)
    if len(clean) < need_auto:
        # 스크래핑이 막혔거나 표본이 너무 적음 → 폴백(페이지 손대지 않음)
        sys.exit(f"후기 표본 부족({len(clean)} < {need_auto}) — 갱신 건너뜀(폴백).")

    # 실제 평점/리뷰수
    score = rating_count = None
    try:
        info = gp_app(APP_ID, lang="ko", country="kr")
        score = f'{round(info["score"], 1)}'
        rating_count = str(info["ratings"])
        print(f"실제 지표: 평점 {score} / 리뷰 {rating_count}")
    except Exception as e:  # 지표만 실패해도 후기 갱신은 진행
        print(f"앱 지표 조회 실패(리뷰 갱신은 진행): {e}")

    cards = build_cards(pinned, clean)
    update_index(cards, score, rating_count)
    # 변경 여부와 무관하게 성공 종료 — 커밋 여부는 워크플로가 git diff로 판단
    sys.exit(0)


if __name__ == "__main__":
    main()
