(function () {
    const url = new URL(location.href);
    const requestedLanguage = url.searchParams.get('lang');
    const root = new URL(document.documentElement.lang === 'en' ? '../' : './', url);
    url.searchParams.delete('lang');

    // Keep previously shared query URLs working without changing a page's content.
    if (requestedLanguage === 'ko' || requestedLanguage === 'en') {
        const destination = new URL(requestedLanguage === 'en' ? 'en/' : './', root);
        destination.search = url.search;
        destination.hash = url.hash;
        if (destination.pathname !== location.pathname) {
            location.replace(destination.href);
            return;
        }
        history.replaceState(null, '', destination);
    }

    // Language links remain usable without JavaScript; enhance them with attribution.
    const link = document.querySelector('.language-switch');
    const otherUrl = new URL(link.href);
    otherUrl.search = url.search;
    otherUrl.hash = url.hash;
    link.href = otherUrl.href;
})();
