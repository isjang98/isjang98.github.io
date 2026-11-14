(function () {
    const url = new URL(location.href);
    const requestedLanguage = url.searchParams.get('lang');
    let savedLanguage;
    try {
        savedLanguage = localStorage.getItem('bibleon-language');
    } catch (error) {
        if (!(error instanceof DOMException) || error.name !== 'SecurityError') throw error;
        console.warn('Language preferences are unavailable because browser storage is blocked.');
    }

    const language = [requestedLanguage, savedLanguage].find(value => value === 'ko' || value === 'en')
        || (navigator.language.toLowerCase().startsWith('ko') ? 'ko' : 'en');
    document.documentElement.lang = language;

    // A shared URL carries the selected language as well as campaign parameters.
    url.searchParams.set('lang', language);
    history.replaceState(null, '', url);
    const languageLink = document.querySelector('.language-switch');
    const otherLanguage = language === 'en' ? 'ko' : 'en';
    const otherUrl = new URL(url);
    otherUrl.searchParams.set('lang', otherLanguage);
    languageLink.href = otherUrl.href;
    languageLink.lang = otherLanguage;
    languageLink.hreflang = otherLanguage;
    languageLink.textContent = language === 'en' ? '한국어' : 'English';
    languageLink.setAttribute('aria-label', language === 'en' ? '한국어로 보기' : 'View this page in English');

    try {
        localStorage.setItem('bibleon-language', language);
    } catch (error) {
        if (!(error instanceof DOMException) || !['SecurityError', 'QuotaExceededError'].includes(error.name)) throw error;
        console.warn('The selected language could not be saved in this browser.');
    }

    if (language !== 'en') return;

    document.querySelectorAll('[data-ko-only]').forEach(element => element.remove());
    document.querySelectorAll('[data-en-only]').forEach(element => {
        element.hidden = false;
    });

    // Translated HTML is authored alongside the Korean copy, never from URL input.
    document.querySelectorAll('[data-en]').forEach(element => {
        element.innerHTML = element.dataset.en;
    });
    for (const [suffix, attribute] of [['alt', 'alt'], ['label', 'aria-label'], ['content', 'content'], ['src', 'src'], ['height', 'height'], ['href', 'href']]) {
        document.querySelectorAll(`[data-en-${suffix}]`).forEach(element => {
            element.setAttribute(attribute, element.getAttribute(`data-en-${suffix}`));
        });
    }

    document.querySelectorAll('.cta-button').forEach(link => {
        const store = link.classList.contains('cta-button--android') ? 'Google Play' : 'the App Store';
        link.setAttribute('aria-label', `Download BibleOn on ${store}`);
    });
    const description = document.querySelector('meta[name="description"]').content;
    const shareDescription = 'Meet daily Scripture through warm illustrations. Keep the verses you love and grow through reflection and memorization. Scripture mosaics are available on Android first.';
    document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]').forEach(meta => {
        meta.content = document.title;
    });
    document.querySelectorAll('meta[property="og:description"], meta[name="twitter:description"]').forEach(meta => {
        meta.content = shareDescription;
    });
    document.querySelectorAll('meta[property="og:image:alt"], meta[name="twitter:image:alt"]').forEach(meta => {
        meta.content = 'BibleOn: daily Scripture through warm illustrations';
    });
    document.querySelectorAll('meta[name="application-name"], meta[name="apple-mobile-web-app-title"], meta[property="og:site_name"]').forEach(meta => {
        meta.content = 'BibleOn';
    });
    document.querySelector('meta[name="keywords"]').content = 'BibleOn, daily Scripture, Bible verse cards, illustrated Bible verses, reflection journal, verse memorization, Scripture mosaic';
    document.querySelector('meta[property="og:locale"]').content = 'en_US';
    const canonical = document.querySelector('link[rel="canonical"]');
    canonical.href += '?lang=en';
    document.querySelector('meta[property="og:url"]').content = canonical.href;

    document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
        const data = JSON.parse(script.textContent);
        if (data['@type'] === 'MobileApplication') {
            data.name = document.title;
            data.alternateName = '말씀온';
            data.description = description;
            data.url = canonical.href;
            data.image = 'https://isjang98.github.io/BibleOn/images/en/app-icon.png';
            data.screenshot = 'https://isjang98.github.io/BibleOn/images/en/01-hero.webp';
        }
        if (data['@type'] === 'FAQPage') {
            data.inLanguage = 'en';
            data.mainEntity = Array.from(document.querySelectorAll('#faq details'), detail => ({
                '@type': 'Question',
                name: detail.querySelector('summary').textContent,
                acceptedAnswer: { '@type': 'Answer', text: detail.querySelector('p').textContent }
            }));
        }
        script.textContent = JSON.stringify(data);
    });
})();
