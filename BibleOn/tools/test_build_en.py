"""Contracts for the published English document, independent of JavaScript."""

from urllib.parse import urljoin
from pathlib import Path

import pytest
from bs4 import BeautifulSoup

from .build_en import JSON_OBJECT, ROOT, MissingPageElement, render_english, required
from . import fetch_reviews


@pytest.fixture
def source() -> str:
    return """<!DOCTYPE html>
<html lang="ko"><head>
<title data-en="Test Bible">테스트 성경</title>
<link rel="canonical" href="https://example.test/BibleOn/">
<link rel="icon" href="images/icon.png" data-en-href="images/en/icon.png">
<meta name="description" content="한글 설명" data-en-content="English description">
<meta property="og:title" content="한글 제목">
<meta name="twitter:title" content="한글 제목">
<meta property="og:description" content="한글 설명">
<meta name="twitter:description" content="한글 설명">
<meta property="og:image:alt" content="한글 이미지">
<meta name="twitter:image:alt" content="한글 이미지">
<meta property="og:url" content="https://example.test/BibleOn/">
<script id="app-schema" type="application/ld+json">
{"@context":"https://schema.org","@type":"MobileApplication",
"offers":{"@type":"Offer","price":"0"}}
</script>
</head><body>
<h1 data-en="Daily &lt;strong&gt;Scripture&lt;/strong&gt;">오늘의 말씀</h1>
<section id="reviews" data-ko-only><p>한국어 후기</p></section>
<section id="english-promo" data-en-only hidden>
<video poster="videos/poster.webp"></video></section>
<img src="images/ko.webp" data-en-src="images/en/home.webp" alt="홈" data-en-alt="Home">
<a class="cta-button cta-button--android" href="https://example.test/store">Store</a>
<a class="language-switch" href="en/" lang="en" data-en="한국어" data-en-href="../" data-en-lang="ko">English</a>
<a id="download-link" href="#download">Download</a>
<span data-rating>3.7</span>
<section id="faq"><details>
<summary data-en="Is it free?">무료인가요?</summary>
<p data-en="Yes. Read our &lt;a href='/privacy/'&gt;policy&lt;/a&gt;.">네, 무료입니다.</p>
</details></section>
<script id="faq-schema" type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[]}
</script>
<script src="language.js?v=2"></script>
</body></html>"""


def test_english_html_is_ready_without_running_javascript(source: str) -> None:
    page = BeautifulSoup(render_english(source), "html.parser")

    assert required(page, "html")["lang"] == "en"
    assert required(page, "h1 strong").get_text() == "Scripture"
    assert page.select_one("#reviews") is None
    assert not required(page, "#english-promo").has_attr("hidden")
    assert required(page, "a.language-switch")["href"] == "../"
    assert required(page, "a.language-switch")["lang"] == "ko"


@pytest.mark.parametrize(("selector", "attribute", "expected"), [
    ("img", "src", "https://example.test/BibleOn/images/en/home.webp"),
    ("video", "poster", "https://example.test/BibleOn/videos/poster.webp"),
    ('link[rel="icon"]', "href", "https://example.test/BibleOn/images/en/icon.png"),
    ("script[src]", "src", "https://example.test/BibleOn/language.js?v=2"),
    ("#download-link", "href", "https://example.test/BibleOn/en/#download"),
])
def test_asset_and_anchor_urls_resolve_from_english_directory(
    source: str, selector: str, attribute: str, expected: str,
) -> None:
    page = BeautifulSoup(render_english(source), "html.parser")

    assert urljoin("https://example.test/BibleOn/en/", str(required(page, selector)[attribute])) == expected


def test_metadata_and_faq_match_the_english_document(source: str) -> None:
    page = BeautifulSoup(render_english(source), "html.parser")
    app = JSON_OBJECT.validate_json(required(page, "#app-schema").get_text())
    faq = JSON_OBJECT.validate_json(required(page, "#faq-schema").get_text())

    assert required(page, 'link[rel="canonical"]')["href"] == app["url"] == "https://example.test/BibleOn/en/"
    assert required(page, 'meta[property="og:title"]')["content"] == required(page, "title").get_text() == "Test Bible"
    assert required(page, 'meta[name="twitter:description"]')["content"] == app["description"] == "English description"
    assert faq["inLanguage"] == "en"
    assert faq["mainEntity"] == [{
        "@type": "Question",
        "name": "Is it free?",
        "acceptedAnswer": {"@type": "Answer", "text": "Yes. Read our policy."},
    }]


@pytest.mark.parametrize("path", ["index.html", "en/index.html"])
def test_store_rating_is_visible_without_claiming_an_onsite_review(path: str) -> None:
    page = BeautifulSoup((ROOT / path).read_text(encoding="utf-8"), "html.parser")
    app = JSON_OBJECT.validate_json(required(page, "#app-schema").get_text())

    assert "aggregateRating" not in app
    assert "review" not in app
    assert float(required(page, "[data-rating]").get_text()) > 0


def test_missing_canonical_stops_the_build(source: str) -> None:
    page = BeautifulSoup(source, "html.parser")
    required(page, 'link[rel="canonical"]').decompose()

    with pytest.raises(MissingPageElement, match="canonical"):
        _ = render_english(str(page))


def test_review_refresh_updates_badges_in_both_languages(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch,
) -> None:
    original = (ROOT / "index.html").read_text(encoding="utf-8")
    page = BeautifulSoup(original, "html.parser")
    cards = "\n".join(str(card) for card in page.select(".review-card"))
    target = tmp_path / "index.html"
    _ = target.write_text(original, encoding="utf-8")
    monkeypatch.setattr(fetch_reviews, "INDEX", str(target))

    changed = fetch_reviews.update_index(cards, "3.2", "128", "50,000+")
    korean = target.read_text(encoding="utf-8")
    english = render_english(korean)

    assert changed
    for document in (korean, english):
        published = BeautifulSoup(document, "html.parser")
        assert tuple(
            required(published, selector).get_text()
            for selector in ("[data-rating]", "[data-reviews]", "[data-installs]")
        ) == ("3.2", "128", "50,000+")
