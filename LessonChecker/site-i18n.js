(function () {
    /** UI 언어 탭(ko/en/ja/zh) → images/ 하위 폴더명 */
    var IMAGE_FOLDER = {
        ko: 'ko',
        en: 'en',
        ja: 'ja',
        zh: 'zh-Hans'
    };

    /** 폴더별 스크린샷 파일명(슬라이드 1~5) */
    var SCREENSHOT_MANIFEST = {
        ko: [
            'ko-01-slide-1-1320x2868.png',
            'ko-02-slide-2-1320x2868.png',
            'ko-03-slide-3-1320x2868.png',
            'ko-04-slide-4-1320x2868.png',
            'ko-05-slide-5-1320x2868.png'
        ],
        en: [
            'en-01-slide-1-1320x2868.png',
            'en-02-slide-2-1320x2868.png',
            'en-03-slide-3-1320x2868.png',
            'en-04-slide-4-1320x2868.png',
            'en-05-slide-5-1320x2868.png'
        ],
        ja: [
            'ja-01-slide-1-1320x2868.png',
            'ja-02-slide-2-1320x2868.png',
            'ja-03-slide-3-1320x2868.png',
            'ja-04-slide-4-1320x2868.png',
            'ja-05-slide-5-1320x2868.png'
        ],
        'zh-Hans': [
            'zh-Hans-01-slide-1-1320x2868.png',
            'zh-Hans-02-slide-2-1320x2868.png',
            'zh-Hans-03-slide-3-1320x2868.png',
            'zh-Hans-04-slide-4-1320x2868.png',
            'zh-Hans-05-slide-5-1320x2868.png'
        ]
    };

    var I18N = {
        ko: {
            htmlLang: 'ko',
            brandName: '레슨체크',
            pageTitle: '레슨체크 (LessonChecker) - 나의 레슨노트, PT·과외·레슨 관리',
            metaDescription: '레슨 횟수가 몇 번 남았는지, 지난 수업에서 뭘 배웠는지—레슨체크 하나로 PT, 과외, 음악 레슨을 한곳에서 관리하세요.',
            skipLink: '본문으로 바로가기',
            logoHtml: '레슨<span>체크</span>',
            heroTitle: '내 레슨 횟수…<br><span class="highlight">몇 번 남았더라?</span><br>레슨체크',
            heroDesc: '이젠 레슨체크 하나로! PT, 필라테스, 과외, 피아노까지—남은 횟수·일정·메모를 한곳에서 관리하세요.',
            featuresTitle: '왜 레슨체크인가요?',
            features: [
                ['📋', '내 레슨 목록', '수영·요가·피아노처럼 여러 레슨의 남은 횟수, 마지막 레슨일, 확인 필요를 리스트에서 한눈에 봅니다.'],
                ['➕', '간편 등록', '레슨 이름·총 횟수만 입력해 빠르게 추가하고, 결제·강사·시작일은 선택 사항으로 더 적을 수 있어요.'],
                ['📊', '레슨 상세', '남은 회차·진행률을 확인하고, 결제 준비 알림과 강사·시작일·결제 정보를 한 화면에서 관리합니다.'],
                ['✅', '출석 체크 & 메모', '오늘 수업을 탭 한 번으로 체크하고, 레슨 메모를 남긴 뒤 체크 완료할 수 있습니다.'],
                ['📈', '월간 통계', '이번 달 얼마나 레슨했는지 통계로 확인하고, 목록 상단에서 바로 들어갈 수 있습니다.']
            ],
            screenshotsTitle: '앱 미리보기',
            screenshotsSubtitle: 'images/ko · en · ja · zh-Hans App Store 스크린샷',
            shots: [
                '내 레슨 목록 — 한눈에 확인',
                '새 레슨 추가 — 간편 등록',
                '레슨 상세 — 남은 횟수·결제까지',
                '출석 체크 — 탭 한 번으로 기록',
                '월간 통계 — 이번 달 수업량'
            ],
            shotDescs: [
                '수영·요가·피아노 등 남은 횟수, 마지막 레슨일, 확인 필요 표시를 리스트에서 확인합니다.',
                '레슨 이름·총 횟수를 입력하고, 결제 주기·금액·강사·시작일은 선택으로 추가합니다.',
                '1/4회처럼 남은 회차·진행률을 보고, 결제 준비 알림과 강사·결제 정보를 확인합니다.',
                '수업 후 레슨 메모를 남기고 체크 완료—다크 모드에서도 편하게 기록합니다.',
                '이번 달 레슨을 얼마나 했는지 월간 통계로 한눈에 파악합니다.'
            ],
            useCasesTitle: '누가 사용하나요?',
            useCases: [
                ['🎸', '음악 레슨', '기타, 피아노, 바이올린—남은 횟수와 결제일을 관리하세요.'],
                ['🏊', '운동·PT', '수영, 요가, 필라테스, PT 등 회차제 수업의 잔여 횟수를 추적하세요.'],
                ['🗣️', '언어·과외', '영어, 중국어, 일본어 회화·과외의 진도와 결제일을 확인하세요.'],
                ['🎨', '미술·취미', '그림, 도자기, 캘리그라피 등 취미 레슨을 체계적으로 관리합니다.']
            ],
            stats: [['4', '지원 언어'], ['∞', '레슨 등록'], ['100%', '무료 이용']],
            stepsTitle: '이렇게 사용하세요',
            steps: [
                ['레슨 등록', '레슨 이름·총 횟수를 입력해 새 레슨을 추가하세요.'],
                ['목록에서 확인', '남은 횟수·마지막 레슨일·확인 필요를 리스트에서 봅니다.'],
                ['상세·출석', '레슨 상세에서 진행률을 보고, 수업 후 출석 체크와 메모를 남깁니다.'],
                ['통계·알림', '월간 통계로 수업량을 보고, 결제가 다가오면 알림을 받습니다.']
            ],
            ctaTitle: '레슨체크로 관리를 시작하세요!',
            ctaDesc: '더 이상 “몇 번 남았더라?” 고민하지 마세요. 지금 바로 다운로드하세요.',
            playLabel: 'Google Play에서 다운로드',
            appStoreLabel: 'App Store에서 다운로드',
            headerPlay: 'Google Play',
            headerAppStore: 'App Store',
            footerPrivacy: '개인정보처리방침',
            footerContact: '문의하기',
            footerCopy: '© 2026 레슨체크 (LessonChecker). All rights reserved.'
        },
        en: {
            htmlLang: 'en',
            brandName: 'LessonCheck',
            pageTitle: 'LessonCheck — My Lesson Tracker, PT & Tutoring',
            metaDescription: 'How many sessions do you have left? Track PT, tutoring, and music lessons—sessions, calendar, notes, and reminders in one app.',
            skipLink: 'Skip to content',
            logoHtml: 'Lesson<span>Check</span>',
            heroTitle: 'How many sessions<br><span class="highlight">do I have left?</span><br>LessonCheck',
            heroDesc: 'Manage PT, Pilates, tutoring, piano, and more. Track sessions, schedules, and notes in one place.',
            featuresTitle: 'Why LessonCheck?',
            features: [
                ['📋', 'All lessons in one place', 'See remaining sessions, last lesson date, and Needs Attention for every lesson in your list.'],
                ['➕', 'Quick Add', 'Enter lesson name and total count in seconds—payment, instructor, and start date are optional.'],
                ['📊', 'Lesson details', 'Track remaining sessions, progress, payment prep alerts, and instructor info on one screen.'],
                ['✅', 'Attendance & memo', 'Check in with one tap, add a lesson memo, and tap Complete Check after class.'],
                ['📈', 'Monthly stats', 'See how much you practiced this month at a glance.']
            ],
            screenshotsTitle: 'App preview',
            screenshotsSubtitle: 'Screens from images/en · ko · ja · zh-Hans',
            shots: [
                'My Lessons — all in one place',
                'Quick Add — seconds to register',
                'Attendance — check in with one tap',
                'Lesson details — sessions & payment',
                'Monthly stats — how much you practiced'
            ],
            shotDescs: [
                'Swimming, Yoga, Piano—remaining sessions, last lesson date, and Needs Attention in one list.',
                'Enter lesson name and total count; payment cycle, amount, instructor, and start date are optional.',
                'Tap to check in after class—Lesson Memo and Complete Check on the lesson screen.',
                'See 1/4 lessons left, progress bar, payment prep alert, instructor, and lesson info.',
                'Monthly statistics—see how much you practiced this month.'
            ],
            useCasesTitle: 'Who is it for?',
            useCases: [
                ['🎸', 'Music lessons', 'Guitar, piano, violin—track remaining sessions and payment dates.'],
                ['🏊', 'Fitness & PT', 'Swimming, yoga, Pilates, PT—manage session-based memberships.'],
                ['🗣️', 'Language tutoring', 'English, Chinese, Japanese—follow progress and billing dates.'],
                ['🎨', 'Arts & hobbies', 'Drawing, pottery, calligraphy—organize classes with ease.']
            ],
            stats: [['4', 'Languages'], ['∞', 'Lessons'], ['100%', 'Free']],
            stepsTitle: 'How it works',
            steps: [
                ['Add a lesson', 'Enter the lesson name and total sessions to get started.'],
                ['Check your list', 'See remaining sessions, last lesson date, and what needs attention.'],
                ['Detail & check-in', 'View lesson progress, check in after class, and save memos.'],
                ['Get reminders', 'Notifications when sessions run low or payment is approaching.']
            ],
            ctaTitle: 'Start with LessonCheck',
            ctaDesc: 'Stop stressing about sessions. Download now and manage every lesson smartly.',
            playLabel: 'Get it on Google Play',
            appStoreLabel: 'Download on the App Store',
            headerPlay: 'Google Play',
            headerAppStore: 'App Store',
            footerPrivacy: 'Privacy Policy',
            footerContact: 'Contact',
            footerCopy: '© 2026 LessonCheck. All rights reserved.'
        },
        ja: {
            htmlLang: 'ja',
            brandName: 'LessonCheck',
            pageTitle: 'LessonCheck — レッスンノート・回数・日程・メモ',
            metaDescription: '残り回数は何回だっけ？PT・習い事・音楽レッスンの回数・記録・スケジュールを一括管理。',
            skipLink: '本文へスキップ',
            logoHtml: 'Lesson<span>Check</span>',
            heroTitle: '残り回数は<br><span class="highlight">何回だっけ…?</span><br>LessonCheck',
            heroDesc: 'PT・ピラティス・家庭教師・ピアノまで。回数・スケジュール・メモを一か所でスマートに管理。',
            featuresTitle: 'LessonCheckの特徴',
            features: [
                ['📋', 'マイレッスン一覧', '水泳・ヨガ・ピアノなど、残り回数・最終レッスン日・確認が必要を一覧で確認。'],
                ['➕', 'かんたん登録', 'レッスン名・合計回数だけで追加。支払い・講師・開始日は任意項目。'],
                ['📊', '詳細管理', '残り回数から支払日まで—進捗とお支払い準備のお知らせを一画面で。'],
                ['✅', '出席チェック', '今日のレッスンをワンタップで記録し、レッスンメモを残してチェック完了。'],
                ['📈', '月間統計', '今月のレッスンがどれくらいか、統計でひと目で把握。']
            ],
            screenshotsTitle: 'アプリプレビュー',
            screenshotsSubtitle: 'images/ja · ko · en · zh-Hans のスクリーンショット',
            shots: [
                'マイレッスン — ひと目で確認',
                '新規レッスン — かんたん登録',
                '詳細管理 — 残り回数・支払日',
                '出席チェック — ワンタップ記録',
                '月間統計 — 今月のレッスン'
            ],
            shotDescs: [
                '水泳・ヨガ・ピアノなど、残り回数・最終レッスン日・確認が必要を一覧で表示。',
                'レッスン名・合計回数を入力。支払い周期・金額・講師・開始日は任意で追加。',
                '1/4回の残りと進捗、次のお支払い準備のお知らせ、講師・開始日を確認。',
                'レッスンメモを残し、チェック完了—ダークモードでも記録しやすい画面。',
                '今月のレッスンがどれくらいか、月間統計で把握できます。'
            ],
            useCasesTitle: 'こんな方におすすめ',
            useCases: [
                ['🎸', '音楽レッスン', 'ギター・ピアノ・バイオリンの残り回数と支払い日を管理。'],
                ['🏊', '運動・PT', '水泳、ヨガ、ピラティス、PTなど回数制レッスンに。'],
                ['🗣️', '語学・塾', '英語、中国語、日本語の会話・家庭教師レッスンに。'],
                ['🎨', '美術・手工', '絵画、陶芸、カリグラフィーなど趣味のレッスンに。']
            ],
            stats: [['4', '対応言語'], ['∞', 'レッスン登録'], ['100%', '無料']],
            stepsTitle: '使い方',
            steps: [
                ['レッスン登録', 'レッスン名・合計回数を入力して追加。'],
                ['一覧で確認', '残り回数・最終レッスン日をリストでチェック。'],
                ['記録とメモ', 'カレンダーで履歴を見て、内容をメモに残す。'],
                ['通知を受け取る', '残り回数や支払い日が近づくとお知らせ。']
            ],
            ctaTitle: 'LessonCheckで管理を始めよう',
            ctaDesc: 'レッスンのストレスから解放。今すぐダウンロード。',
            playLabel: 'Google Playで入手',
            appStoreLabel: 'App Storeでダウンロード',
            headerPlay: 'Google Play',
            headerAppStore: 'App Store',
            footerPrivacy: 'プライバシーポリシー',
            footerContact: 'お問い合わせ',
            footerCopy: '© 2026 LessonCheck. All rights reserved.'
        },
        zh: {
            htmlLang: 'zh-Hans',
            brandName: 'LessonCheck',
            pageTitle: 'LessonCheck — 课程笔记，管理次数·日程·备忘',
            metaDescription: '还剩几次课？用 LessonCheck 管理健身私教、家教、音乐课的次数、记录与日程。',
            skipLink: '跳到正文',
            logoHtml: 'Lesson<span>Check</span>',
            heroTitle: '还剩<br><span class="highlight">几次课来着…?</span><br>LessonCheck',
            heroDesc: 'PT、普拉提、家教、钢琴等—次数、日程、备忘一处搞定，轻松管理所有课程。',
            featuresTitle: '为什么选择 LessonCheck',
            features: [
                ['📋', '我的课程列表', '游泳、瑜伽、钢琴等—在列表中查看剩余次数、上次上课与待确认。'],
                ['➕', '快速添加', '输入课程名称和总次数即可添加，缴费、讲师、开始日期为选填。'],
                ['📊', '详细管理', '掌握剩余次数与付款日期—进度条与付款准备提醒一目了然。'],
                ['✅', '签到打卡', '今日课程一键记录，填写课程备忘后完成打卡。'],
                ['📈', '月度统计', '查看本月上了多少节课，统计一目了然。']
            ],
            screenshotsTitle: '应用预览',
            screenshotsSubtitle: 'images/zh-Hans · ko · en · ja 截图',
            shots: [
                '我的课程 — 一目了然',
                '添加课程 — 快速登记',
                '详细管理 — 次数与付款',
                '签到打卡 — 一键记录',
                '月度统计 — 本月课程量'
            ],
            shotDescs: [
                '游泳、瑜伽、钢琴等课程的剩余次数、最后上课日期与待确认提示。',
                '输入课程名称与总次数；缴费周期、金额、讲师、开始日期可选填。',
                '查看 1/4 次剩余与进度，以及「请准备下次付款」提醒与讲师信息。',
                '课后填写课程备忘，点击完成打卡；支持深色界面。',
                '通过月度统计查看本月上了多少节课。'
            ],
            useCasesTitle: '适合谁使用',
            useCases: [
                ['🎸', '音乐课', '吉他、钢琴、小提琴—管理剩余课时与缴费日。'],
                ['🏊', '运动·私教', '游泳、瑜伽、普拉提、私教等按次课程。'],
                ['🗣️', '语言补习', '英语、中文、日语口语与家教课程。'],
                ['🎨', '美术手工', '绘画、陶艺、书法等兴趣课程。']
            ],
            stats: [['4', '种语言'], ['∞', '课程数量'], ['100%', '免费']],
            stepsTitle: '使用步骤',
            steps: [
                ['添加课程', '输入课程名称和总次数即可开始。'],
                ['查看列表', '在一览中查看剩余次数和上次上课日期。'],
                ['记录与备忘', '用日历查看历史，用备忘记下要点。'],
                ['接收提醒', '课时不足或缴费日临近时提前通知。']
            ],
            ctaTitle: '用 LessonCheck 开始管理',
            ctaDesc: '别再为课程烦恼。立即下载，有条不紊地管理每一次上课。',
            playLabel: '在 Google Play 获取',
            appStoreLabel: '在 App Store 下载',
            headerPlay: 'Google Play',
            headerAppStore: 'App Store',
            footerPrivacy: '隐私政策',
            footerContact: '联系我们',
            footerCopy: '© 2026 LessonCheck. 保留所有权利。'
        }
    };

    function imageFolder(lang) {
        return IMAGE_FOLDER[lang] || lang;
    }

    function screenshotUrl(lang, index) {
        var folder = imageFolder(lang);
        var files = SCREENSHOT_MANIFEST[folder];
        if (!files || !files[index]) return null;
        return 'images/' + folder + '/' + files[index];
    }

    function screenshotCandidates(lang, index) {
        var primary = screenshotUrl(lang, index);
        if (primary) return [primary];
        var folder = imageFolder(lang);
        var n = index + 1;
        var pad2 = n < 10 ? '0' + n : String(n);
        return [
            'images/' + folder + '/' + pad2 + '.png',
            'images/' + folder + '/' + n + '.png'
        ];
    }

    function setBtnLabel(btn, label) {
        if (!btn) return;
        var nodes = btn.childNodes;
        for (var i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeType === 3) {
                nodes[i].textContent = label;
                return;
            }
        }
        btn.appendChild(document.createTextNode(label));
    }

    function loadShotImage(img, lang, index, forceReload) {
        if (forceReload) {
            delete img.dataset.loadedLang;
            delete img.dataset.candidateIdx;
        }

        if (!forceReload && img.dataset.loadedLang === lang && img.src && img.complete && img.naturalWidth > 0) {
            return;
        }

        var candidates = screenshotCandidates(lang, index);
        var i = 0;
        function tryNext() {
            if (i >= candidates.length) {
                img.removeAttribute('src');
                img.dataset.loadedLang = lang;
                return;
            }
            var url = candidates[i];
            var tester = new Image();
            tester.onload = function () {
                img.src = url;
                img.dataset.loadedLang = lang;
                img.dataset.candidateIdx = String(i);
            };
            tester.onerror = function () {
                i += 1;
                tryNext();
            };
            tester.src = url;
        }
        tryNext();
    }

    function syncScreenshotSrcs(lang, forceReload) {
        var set = document.querySelector('.screenshot-set[data-lang="' + lang + '"]');
        if (!set) return;
        set.querySelectorAll('img[data-shot-index]').forEach(function (img) {
            var index = parseInt(img.getAttribute('data-shot-index'), 10);
            loadShotImage(img, lang, index, forceReload);
        });
    }

    function detectBrowserLang() {
        var tag = (navigator.language || 'ko').toLowerCase();
        if (tag.indexOf('zh') === 0) return 'zh';
        if (tag.indexOf('ja') === 0) return 'ja';
        if (tag.indexOf('en') === 0) return 'en';
        return 'ko';
    }

    function showScreenshotSet(lang) {
        document.querySelectorAll('.screenshot-set').forEach(function (set) {
            var on = set.dataset.lang === lang;
            set.classList.toggle('active', on);
            set.hidden = !on;
        });
    }

    function updateScreenshotCaptions(lang, copy) {
        var set = document.querySelector('.screenshot-set[data-lang="' + lang + '"]');
        if (!set) return;
        var caps = set.querySelectorAll('.screenshot-caption');
        var imgs = set.querySelectorAll('.screenshot-item img');
        var descs = copy.shotDescs || [];
        var brand = copy.brandName || 'LessonCheck';
        copy.shots.forEach(function (text, i) {
            if (caps[i]) {
                caps[i].textContent = descs[i] ? text + ' · ' + descs[i] : text;
            }
            if (imgs[i]) imgs[i].alt = text + ' — ' + brand;
        });
    }

    function applyLocale(lang) {
        var copy = I18N[lang] || I18N.ko;
        document.documentElement.lang = copy.htmlLang;
        document.getElementById('page-title').textContent = copy.pageTitle;
        var meta = document.getElementById('meta-description');
        if (meta) meta.setAttribute('content', copy.metaDescription);
        document.getElementById('skip-link').textContent = copy.skipLink;
        document.getElementById('site-logo').innerHTML = copy.logoHtml;
        document.getElementById('hero-title').innerHTML = copy.heroTitle;
        document.getElementById('hero-desc').textContent = copy.heroDesc;
        document.getElementById('features-title').textContent = copy.featuresTitle;
        document.getElementById('screenshots-title').textContent = copy.screenshotsTitle;
        document.getElementById('screenshots-subtitle').textContent = copy.screenshotsSubtitle;
        document.getElementById('usecases-title').textContent = copy.useCasesTitle;
        document.getElementById('steps-title').textContent = copy.stepsTitle;
        document.getElementById('cta-title').textContent = copy.ctaTitle;
        document.getElementById('cta-desc').textContent = copy.ctaDesc;
        document.getElementById('footer-privacy').textContent = copy.footerPrivacy;
        document.getElementById('footer-contact').textContent = copy.footerContact;
        document.getElementById('footer-copy').textContent = copy.footerCopy;

        document.querySelectorAll('#features-grid .feature-card').forEach(function (card, i) {
            var f = copy.features[i];
            if (!f) return;
            card.querySelector('.icon').textContent = f[0];
            card.querySelector('h3').textContent = f[1];
            card.querySelector('p').textContent = f[2];
        });

        document.querySelectorAll('#usecases-grid .case-card').forEach(function (card, i) {
            var c = copy.useCases[i];
            if (!c) return;
            card.querySelector('.case-icon').textContent = c[0];
            card.querySelector('h3').textContent = c[1];
            card.querySelector('p').textContent = c[2];
        });

        document.querySelectorAll('#stats-grid .stat-item').forEach(function (item, i) {
            var s = copy.stats[i];
            if (!s) return;
            item.querySelector('.number').textContent = s[0];
            item.querySelector('.label').textContent = s[1];
        });

        document.querySelectorAll('#steps-grid .step').forEach(function (step, i) {
            var st = copy.steps[i];
            if (!st) return;
            step.querySelector('h3').textContent = st[0];
            step.querySelector('p').textContent = st[1];
        });

        document.getElementById('header-play').textContent = copy.headerPlay;
        document.getElementById('header-appstore').textContent = copy.headerAppStore;
        setBtnLabel(document.querySelector('.hero-buttons .neo-btn.pink'), copy.playLabel);
        setBtnLabel(document.querySelector('.hero-buttons .neo-btn.blue'), copy.appStoreLabel);
        setBtnLabel(document.getElementById('cta-play'), copy.playLabel);
        setBtnLabel(document.getElementById('cta-appstore'), copy.appStoreLabel);

        document.querySelectorAll('.lang-tab').forEach(function (tab) {
            var active = tab.dataset.lang === lang;
            tab.classList.toggle('active', active);
            tab.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        var heroImg = document.getElementById('hero-screenshot');
        loadShotImage(heroImg, lang, 0, true);
        heroImg.alt = (copy.shots[0] || '') + ' — ' + (copy.brandName || 'LessonCheck');

        showScreenshotSet(lang);
        syncScreenshotSrcs(lang, true);
        updateScreenshotCaptions(lang, copy);

        try {
            localStorage.setItem('lessonchecker-lang', lang);
        } catch (e) { /* ignore */ }
    }

    document.querySelectorAll('.lang-tab').forEach(function (tab) {
        tab.addEventListener('click', function () {
            applyLocale(tab.dataset.lang);
        });
    });

    var saved = null;
    try {
        saved = localStorage.getItem('lessonchecker-lang');
    } catch (e) { /* ignore */ }
    var initial = I18N[saved] ? saved : detectBrowserLang();
    applyLocale(initial);
})();
