(function () {
    /** UI 언어 탭(ko/en/ja/zh) → images/ 하위 폴더명 */
    var IMAGE_FOLDER = {
        ko: 'ko',
        en: 'en',
        ja: 'ja',
        zh: 'zh-Hans'
    };

    /** 폴더별 스크린샷 파일명(슬라이드 1~6) */
    var SCREENSHOT_MANIFEST = {
        ko: [
            'ko-01-hero-1320x2868.png',
            'ko-02-check-in-1320x2868.png',
            'ko-03-detail-1320x2868.png',
            'ko-04-pass-1320x2868.png',
            'ko-05-stats-1320x2868.png',
            'ko-06-quick-add-1320x2868.png'
        ],
        en: [
            'en-01-hero-1320x2868.png',
            'en-02-check-in-1320x2868.png',
            'en-03-detail-1320x2868.png',
            'en-04-pass-1320x2868.png',
            'en-05-stats-1320x2868.png',
            'en-06-quick-add-1320x2868.png'
        ],
        ja: [
            'ja-01-hero-1320x2868.png',
            'ja-02-check-in-1320x2868.png',
            'ja-03-detail-1320x2868.png',
            'ja-04-pass-1320x2868.png',
            'ja-05-stats-1320x2868.png',
            'ja-06-quick-add-1320x2868.png'
        ],
        'zh-Hans': [
            'zh-Hans-01-hero-1320x2868.png',
            'zh-Hans-02-check-in-1320x2868.png',
            'zh-Hans-03-detail-1320x2868.png',
            'zh-Hans-04-pass-1320x2868.png',
            'zh-Hans-05-stats-1320x2868.png',
            'zh-Hans-06-quick-add-1320x2868.png'
        ]
    };

    var I18N = {
        ko: {
            htmlLang: 'ko',
            brandName: '레슨체크',
            pageTitle: '레슨체크 (LessonChecker) - 나의 레슨노트, PT·과외·레슨·횟수권 관리',
            metaDescription: '레슨 횟수가 몇 번 남았는지, 횟수권은 몇 회 남았는지—레슨체크 하나로 PT·과외·음악 레슨과 에스테틱·네일 횟수권까지 한곳에서 관리하세요.',
            skipLink: '본문으로 바로가기',
            logoHtml: '레슨<span>체크</span>',
            heroTitle: '내 레슨 횟수…<br><span class="highlight">몇 번 남았더라?</span><br>레슨체크',
            heroDesc: '이젠 레슨체크 하나로! PT·과외·피아노 레슨은 물론 에스테틱·네일 횟수권까지—남은 횟수·기록·알림을 한곳에서 관리하세요.',
            featuresTitle: '왜 레슨체크인가요?',
            features: [
                ['📋', '레슨·횟수권 한눈에', '하단 탭(홈·통계·설정)으로 새로워진 화면. 홈에서 레슨과 횟수권을 카테고리별로 나눠 남은 횟수를 한눈에 봅니다.'],
                ['🎟️', '횟수권 별도 관리', '에스테틱·네일샵 같은 선불 횟수권을 레슨과 분리된 섹션에서 등록하고 남은 횟수·사용 기록을 관리합니다.'],
                ['➕', '간편 등록 & 결제 주기', '이름·총 횟수만으로 빠르게 등록. 결제 주기는 개월뿐 아니라 횟수(예: 10회마다)로도 설정할 수 있습니다.'],
                ['✅', '소급 체크 & 기록 수정', '깜빡한 날은 지난 날짜로 체크하고, 이미 체크한 기록도 날짜·메모를 수정할 수 있습니다.'],
                ['📈', '카테고리별 통계', '전체/레슨/횟수권 필터로 월별 추이·항목별 현황·결제 금액을 나눠서 확인합니다.'],
                ['🔔', '알림 & 백업', '남은 횟수 임박·결제 예정 알림을 받고, 데이터 백업·복원으로 기기를 바꿔도 안심입니다.']
            ],
            screenshotsTitle: '앱 미리보기',
            screenshotsSubtitle: '새로워진 레슨체크 — 레슨과 횟수권을 함께, 더 꼼꼼하게',
            shots: [
                '홈 — 레슨도 횟수권도 한 곳에서',
                '출석 체크 — 탭 한 번, 소급도 OK',
                '상세 관리 — 남은 횟수부터 결제까지',
                '횟수권 — 네일·에스테틱도 함께',
                '통계 — 전체·레슨·횟수권 필터',
                '간편 등록 — 30초면 충분'
            ],
            shotDescs: [
                '하단 탭으로 새로워진 홈. 레슨과 횟수권을 섹션으로 나눠 남은 횟수를 한눈에 봅니다.',
                '탭 한 번으로 오늘을 기록하고, 깜빡한 날은 체크 날짜를 지난 날짜로 바꿔 기록합니다.',
                '남은 횟수·진행률·결제 주기(개월/횟수)·다음 결제 예정일을 한 화면에서 확인합니다.',
                '선불 횟수권을 레슨과 별도로 등록해 남은 횟수와 사용 기록을 관리합니다.',
                '이번 달 수업량과 월별 추이, 결제 금액을 카테고리 필터로 나눠 봅니다.',
                '유형(레슨/횟수권)을 고르고 이름·총 횟수만 입력하면 등록 완료. 위젯·알림·백업도 지원합니다.'
            ],
            useCasesTitle: '누가 사용하나요?',
            useCases: [
                ['🎸', '음악 레슨', '기타, 피아노, 바이올린—남은 횟수와 결제일을 관리하세요.'],
                ['🏊', '운동·PT', '수영, 요가, 필라테스, PT 등 회차제 수업의 잔여 횟수를 추적하세요.'],
                ['🗣️', '언어·과외', '영어, 중국어, 일본어 회화·과외의 진도와 결제일을 확인하세요.'],
                ['🎨', '미술·취미', '그림, 도자기, 캘리그라피 등 취미 레슨을 체계적으로 관리합니다.'],
                ['💅', '에스테틱·네일', '선불 횟수권의 남은 횟수와 사용 기록을 레슨과 분리해서 관리하세요.']
            ],
            stats: [['4', '지원 언어'], ['∞', '레슨·횟수권 등록'], ['100%', '무료 이용']],
            stepsTitle: '이렇게 사용하세요',
            steps: [
                ['유형 선택 & 등록', '홈의 + 버튼으로 레슨 또는 횟수권을 선택해 등록해요.'],
                ['홈에서 확인', '카테고리별 섹션에서 남은 횟수와 마지막 체크일을 한눈에 봐요.'],
                ['체크 & 기록 관리', '수업 후 체크하고, 깜빡했다면 소급 체크·기록 수정으로 바로잡아요.'],
                ['통계 & 알림', '통계 탭에서 카테고리별로 확인하고, 횟수·결제 임박 알림을 받아요.']
            ],
            guideTitle: '상세 사용 가이드',
            guide: [
                ['레슨·횟수권 등록', [
                    '홈 탭 오른쪽 위 + 버튼을 눌러 시작해요.',
                    '유형에서 ‘레슨’ 또는 ‘횟수권’(에스테틱·네일샵 등)을 선택해요.',
                    '이름과 총 횟수만 입력하면 등록 끝! 금액·담당자·시작일은 선택 입력이에요.',
                    '결제 주기는 ‘개월’뿐 아니라 ‘횟수’(예: 10회마다)로도 설정할 수 있어요.'
                ]],
                ['출석 체크 & 지난 날짜 소급', [
                    '상세 화면에서 ‘레슨 체크하기(사용 체크하기)’를 탭하면 1회가 차감돼요.',
                    '체크를 깜빡했다면 체크 날짜를 지난 날짜로 바꿔 소급 기록할 수 있어요.',
                    '메모를 함께 남기면 그날 배운 내용이 기록으로 남아요.'
                ]],
                ['체크 기록 수정', [
                    '상세의 기록 목록에서 항목을 밀거나(스와이프) ‘수정’을 눌러요.',
                    '날짜·메모를 고치면 남은 횟수와 마지막 체크일이 자동으로 다시 계산돼요.',
                    '잘못 체크한 기록은 삭제도 가능해요.'
                ]],
                ['메모 켜기/끄기', [
                    '설정 탭에서 ‘메모 입력’을 끄면 체크할 때 메모창이 나타나지 않아요.',
                    '기록 목록에서도 메모가 숨겨져 깔끔하게 사용할 수 있어요.'
                ]],
                ['통계 보기', [
                    '하단 ‘통계’ 탭에서 이번 달 수업량, 월별 추이, 항목별 현황을 확인해요.',
                    '상단 필터로 전체/레슨/횟수권을 나눠서 볼 수 있어요.',
                    '결제 금액 합계로 지출도 함께 파악할 수 있어요.'
                ]],
                ['알림 & 백업', [
                    '남은 횟수가 적어지면 ‘이용 횟수 임박’ 알림, 결제일이 다가오면 결제 준비 알림을 받아요.',
                    '설정 탭에서 데이터 백업·복원을 할 수 있어 기기를 바꿔도 안심이에요.'
                ]]
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
            pageTitle: 'LessonCheck — Lesson & Prepaid Pass Tracker',
            metaDescription: 'How many sessions do you have left? Track PT, tutoring, music lessons, and prepaid passes for nails or esthetics—sessions, records, and reminders in one app.',
            skipLink: 'Skip to content',
            logoHtml: 'Lesson<span>Check</span>',
            heroTitle: 'How many sessions<br><span class="highlight">do I have left?</span><br>LessonCheck',
            heroDesc: 'PT, Pilates, tutoring, piano—and prepaid passes for nails or esthetics. Sessions, records, and reminders in one place.',
            featuresTitle: 'Why LessonCheck?',
            features: [
                ['📋', 'Lessons & passes at a glance', 'A refreshed tab layout (Home · Stats · Settings). Lessons and prepaid passes are grouped in separate sections on Home.'],
                ['🎟️', 'Manage passes separately', 'Track prepaid passes for esthetics, nail salons, and more—registered and managed apart from lessons.'],
                ['➕', 'Quick Add & payment cycle', 'Register with just a name and total count. Set the payment cycle by months or by sessions (e.g., every 10 sessions).'],
                ['✅', 'Backdated check-in & edits', 'Forgot to check in? Pick a past date. You can also edit the date and memo of any existing record.'],
                ['📈', 'Stats by category', 'Filter monthly trends, per-item status, and spending by All / Lessons / Passes.'],
                ['🔔', 'Reminders & backup', 'Low-count and payment reminders, plus data backup & restore for peace of mind.']
            ],
            screenshotsTitle: 'App preview',
            screenshotsSubtitle: 'The refreshed LessonCheck — lessons and passes, together',
            shots: [
                'Home — lessons & passes together',
                'Check-in — one tap, backdating OK',
                'Details — counts to payments',
                'Passes — nails, esthetics & more',
                'Stats — All · Lessons · Passes',
                'Quick Add — done in 30 seconds'
            ],
            shotDescs: [
                'A refreshed Home with bottom tabs. Lessons and passes in separate sections, remaining counts at a glance.',
                'Tap once to log today, or pick a past date when you forgot to check in.',
                'Remaining sessions, progress, payment cycle (months or sessions), and the next payment date on one screen.',
                'Register prepaid passes separately from lessons and track remaining uses and history.',
                'Monthly volume, trends, and spending—filtered by category.',
                'Pick a type (lesson or pass), enter a name and total count—done. Widgets, reminders, and backup included.'
            ],
            useCasesTitle: 'Who is it for?',
            useCases: [
                ['🎸', 'Music lessons', 'Guitar, piano, violin—track remaining sessions and payment dates.'],
                ['🏊', 'Fitness & PT', 'Swimming, yoga, Pilates, PT—manage session-based memberships.'],
                ['🗣️', 'Language tutoring', 'English, Chinese, Japanese—follow progress and billing dates.'],
                ['🎨', 'Arts & hobbies', 'Drawing, pottery, calligraphy—organize classes with ease.'],
                ['💅', 'Esthetics & nails', 'Manage prepaid passes—remaining uses and history—apart from lessons.']
            ],
            stats: [['4', 'Languages'], ['∞', 'Lessons & passes'], ['100%', 'Free']],
            stepsTitle: 'How it works',
            steps: [
                ['Pick a type & add', 'Use the + on Home to register a lesson or a prepaid pass.'],
                ['See it on Home', 'Check remaining counts and last check-in in each category section.'],
                ['Check in & manage', 'Check in after class; backdate or edit records when needed.'],
                ['Stats & reminders', 'Filter stats by category and get low-count / payment alerts.']
            ],
            guideTitle: 'Detailed usage guide',
            guide: [
                ['Register a lesson or pass', [
                    'Tap the + button at the top right of the Home tab.',
                    'Choose a type: Lesson, or Pass (esthetics, nail salons, etc.).',
                    'Only a name and total count are required—price, instructor, and start date are optional.',
                    'Set the payment cycle by months or by sessions (e.g., every 10 sessions).'
                ]],
                ['Check in & backdate', [
                    'Tap “Check lesson / Check use” on the detail screen to deduct one session.',
                    'Forgot a day? Change the check date to a past date (up to today).',
                    'Add a memo to keep what you learned that day.'
                ]],
                ['Edit check records', [
                    'Swipe a record in the history list or tap Edit.',
                    'Fix the date or memo—the remaining count and last-checked date are recalculated automatically.',
                    'You can also delete a record made by mistake.'
                ]],
                ['Turn memos on/off', [
                    'Turn off “Memo input” in Settings to skip the memo box when checking in.',
                    'Memos are hidden in the history list too.'
                ]],
                ['Read your stats', [
                    'Open the Stats tab for monthly volume, trends, and per-item status.',
                    'Use the All / Lessons / Passes filter at the top.',
                    'Track total payments to keep an eye on spending.'
                ]],
                ['Reminders & backup', [
                    'Get a low-count alert when few sessions remain, and a payment-prep alert before the next payment.',
                    'Back up and restore your data in Settings—safe across devices.'
                ]]
            ],
            ctaTitle: 'Start with LessonCheck',
            ctaDesc: 'Stop stressing about sessions. Download now and manage every lesson and pass smartly.',
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
            pageTitle: 'LessonCheck — レッスン・回数券の回数・記録・通知を管理',
            metaDescription: '残り回数は何回だっけ？PT・習い事・音楽レッスンに加え、エステ・ネイルの回数券まで。回数・記録・通知を一括管理。',
            skipLink: '本文へスキップ',
            logoHtml: 'Lesson<span>Check</span>',
            heroTitle: '残り回数は<br><span class="highlight">何回だっけ…?</span><br>LessonCheck',
            heroDesc: 'PT・ピラティス・家庭教師・ピアノに加え、エステ・ネイルの回数券まで。残り回数・記録・通知を一か所で管理。',
            featuresTitle: 'LessonCheckの特徴',
            features: [
                ['📋', 'レッスンも回数券もひと目で', 'ホーム・統計・設定のタブ構成に刷新。ホームでレッスンと回数券をセクション別に表示します。'],
                ['🎟️', '回数券を別枠で管理', 'エステ・ネイルサロンなどの前払い回数券をレッスンとは別に登録し、残り回数・利用記録を管理。'],
                ['➕', 'かんたん登録&支払い周期', '名前と合計回数だけで登録。支払い周期は「か月」でも「回数」(例: 10回ごと)でも設定できます。'],
                ['✅', 'さかのぼりチェック&記録修正', 'チェックを忘れた日は過去の日付で記録。既存の記録も日付・メモを修正できます。'],
                ['📈', 'カテゴリ別統計', '全体/レッスン/回数券のフィルターで月別推移・項目別状況・支払い金額を確認。'],
                ['🔔', '通知&バックアップ', '残り回数・支払いのお知らせに加え、データのバックアップ・復元に対応。']
            ],
            screenshotsTitle: 'アプリプレビュー',
            screenshotsSubtitle: '新しくなったLessonCheck — レッスンと回数券を一緒に',
            shots: [
                'ホーム — レッスンも回数券も一か所で',
                '出席チェック — ワンタップ&さかのぼり',
                '詳細管理 — 残り回数から支払日まで',
                '回数券 — ネイル・エステも一緒に',
                '統計 — 全体・レッスン・回数券',
                'かんたん登録 — 30秒で完了'
            ],
            shotDescs: [
                '下部タブで刷新されたホーム。レッスンと回数券をセクションで分けて表示します。',
                'ワンタップで今日を記録。忘れた日はチェック日付を過去に変更できます。',
                '残り回数・進捗・支払い周期(か月/回数)・次回支払い予定日を一画面で。',
                '前払い回数券をレッスンとは別に登録し、残り回数と利用記録を管理。',
                '今月のレッスン量や月別推移、支払い金額をカテゴリ別に確認。',
                '種類(レッスン/回数券)を選び、名前と合計回数を入力するだけ。ウィジェット・通知・バックアップも。'
            ],
            useCasesTitle: 'こんな方におすすめ',
            useCases: [
                ['🎸', '音楽レッスン', 'ギター・ピアノ・バイオリンの残り回数と支払い日を管理。'],
                ['🏊', '運動・PT', '水泳、ヨガ、ピラティス、PTなど回数制レッスンに。'],
                ['🗣️', '語学・塾', '英語、中国語、日本語の会話・家庭教師レッスンに。'],
                ['🎨', '美術・手工', '絵画、陶芸、カリグラフィーなど趣味のレッスンに。'],
                ['💅', 'エステ・ネイル', '前払い回数券の残り回数と利用記録をレッスンとは別に管理。']
            ],
            stats: [['4', '対応言語'], ['∞', 'レッスン・回数券'], ['100%', '無料']],
            stepsTitle: '使い方',
            steps: [
                ['種類を選んで登録', 'ホームの+ボタンでレッスンまたは回数券を登録。'],
                ['ホームで確認', 'カテゴリ別セクションで残り回数・最終チェック日を確認。'],
                ['チェック&記録管理', '授業後にチェック。忘れた日はさかのぼり・記録修正で調整。'],
                ['統計&通知', '統計タブでカテゴリ別に確認し、回数・支払いのお知らせを受け取る。']
            ],
            guideTitle: '詳しい使い方ガイド',
            guide: [
                ['レッスン・回数券の登録', [
                    'ホーム右上の+ボタンをタップ。',
                    '種類で「レッスン」または「回数券」(エステ・ネイルなど)を選択。',
                    '名前と合計回数だけで登録完了。金額・講師・開始日は任意です。',
                    '支払い周期は「か月」または「回数」(例: 10回ごと)で設定できます。'
                ]],
                ['出席チェックとさかのぼり', [
                    '詳細画面で「チェックする」をタップすると1回分が減ります。',
                    '忘れた日はチェック日付を過去の日付に変更して記録(今日まで選択可)。',
                    'メモを残せばその日の内容が記録に残ります。'
                ]],
                ['記録の修正', [
                    '記録一覧でスワイプ、または「編集」をタップ。',
                    '日付やメモを直すと残り回数・最終チェック日が自動で再計算されます。',
                    '誤った記録は削除もできます。'
                ]],
                ['メモのオン/オフ', [
                    '設定タブで「メモ入力」をオフにすると、チェック時にメモ欄が表示されません。',
                    '記録一覧でもメモが非表示になります。'
                ]],
                ['統計の見方', [
                    '「統計」タブで今月の量・月別推移・項目別状況を確認。',
                    '上部フィルターで全体/レッスン/回数券を切り替え。',
                    '支払い金額の合計で支出も把握できます。'
                ]],
                ['通知とバックアップ', [
                    '残り回数が少なくなるとお知らせ、支払日前には準備のお知らせが届きます。',
                    '設定タブからデータのバックアップ・復元が可能。機種変更も安心です。'
                ]]
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
            pageTitle: 'LessonCheck — 课程与次卡管理，次数·记录·提醒',
            metaDescription: '还剩几次课？用 LessonCheck 管理健身私教、家教、音乐课,以及美容、美甲次卡的次数、记录与提醒。',
            skipLink: '跳到正文',
            logoHtml: 'Lesson<span>Check</span>',
            heroTitle: '还剩<br><span class="highlight">几次课来着…?</span><br>LessonCheck',
            heroDesc: 'PT、普拉提、家教、钢琴,再加上美容、美甲次卡—次数、记录、提醒一处搞定。',
            featuresTitle: '为什么选择 LessonCheck',
            features: [
                ['📋', '课程与次卡一目了然', '全新底部标签页(首页·统计·设置)。首页按分类分区显示课程与次卡。'],
                ['🎟️', '次卡单独管理', '美容、美甲等预付次卡与课程分开登记,管理剩余次数与使用记录。'],
                ['➕', '快速添加&缴费周期', '只需名称和总次数即可登记。缴费周期可按月或按次数(如每10次)设置。'],
                ['✅', '补签与记录修改', '忘记打卡?可选择过去的日期补签,还能修改已有记录的日期和备忘。'],
                ['📈', '分类统计', '通过全部/课程/次卡筛选查看月度趋势、各项状态与缴费金额。'],
                ['🔔', '提醒&备份', '剩余次数、缴费临近提醒,支持数据备份与恢复。']
            ],
            screenshotsTitle: '应用预览',
            screenshotsSubtitle: '全新 LessonCheck — 课程与次卡一起管理',
            shots: [
                '首页 — 课程与次卡同在',
                '签到打卡 — 一键记录,可补签',
                '详细管理 — 从次数到缴费',
                '次卡 — 美甲·美容也一起',
                '统计 — 全部·课程·次卡',
                '快速添加 — 30秒搞定'
            ],
            shotDescs: [
                '底部标签页全新改版,课程与次卡分区显示,剩余次数一目了然。',
                '一键记录今天;忘记的日子可把打卡日期改为过去的日期。',
                '剩余次数、进度、缴费周期(按月/按次)与下次缴费日,一屏掌握。',
                '预付次卡与课程分开登记,管理剩余次数与使用记录。',
                '本月课程量、月度趋势与缴费金额,按分类筛选查看。',
                '选择类型(课程/次卡),输入名称和总次数即可。支持小组件、提醒与备份。'
            ],
            useCasesTitle: '适合谁使用',
            useCases: [
                ['🎸', '音乐课', '吉他、钢琴、小提琴—管理剩余课时与缴费日。'],
                ['🏊', '运动·私教', '游泳、瑜伽、普拉提、私教等按次课程。'],
                ['🗣️', '语言补习', '英语、中文、日语口语与家教课程。'],
                ['🎨', '美术手工', '绘画、陶艺、书法等兴趣课程。'],
                ['💅', '美容·美甲', '预付次卡的剩余次数与使用记录,与课程分开管理。']
            ],
            stats: [['4', '种语言'], ['∞', '课程与次卡'], ['100%', '免费']],
            stepsTitle: '使用步骤',
            steps: [
                ['选择类型并添加', '点击首页的+按钮,登记课程或次卡。'],
                ['在首页查看', '在分类分区中查看剩余次数和最后打卡日。'],
                ['打卡与记录管理', '课后打卡;忘记时可补签或修改记录。'],
                ['统计与提醒', '在统计页按分类查看,并接收次数、缴费临近提醒。']
            ],
            guideTitle: '详细使用指南',
            guide: [
                ['登记课程或次卡', [
                    '点击首页右上角的+按钮。',
                    '选择类型:「课程」或「次卡」(美容、美甲等)。',
                    '只需名称和总次数;金额、老师、开始日期为选填。',
                    '缴费周期可按「月」或按「次数」(如每10次)设置。'
                ]],
                ['打卡与补签', [
                    '在详情页点击“打卡”即扣除一次。',
                    '忘记打卡时,可把打卡日期改为过去的日期(最晚到今天)。',
                    '可同时填写备忘,记录当天所学。'
                ]],
                ['修改打卡记录', [
                    '在记录列表左滑或点击“编辑”。',
                    '修改日期或备忘后,剩余次数和最后打卡日会自动重新计算。',
                    '错误的记录也可以删除。'
                ]],
                ['开关备忘输入', [
                    '在设置中关闭“备忘输入”,打卡时不再弹出备忘框。',
                    '记录列表中的备忘也会隐藏。'
                ]],
                ['查看统计', [
                    '在“统计”标签页查看本月课程量、月度趋势与各项状态。',
                    '使用顶部的全部/课程/次卡筛选。',
                    '还能查看缴费总额,掌握支出。'
                ]],
                ['提醒与备份', [
                    '剩余次数不多或缴费日临近时会收到提醒。',
                    '在设置中备份/恢复数据,换机也不怕。'
                ]]
            ],
            ctaTitle: '用 LessonCheck 开始管理',
            ctaDesc: '别再为课程烦恼。立即下载,有条不紊地管理每一次上课。',
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
        document.getElementById('guide-title').textContent = copy.guideTitle;
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

        document.querySelectorAll('#guide-grid .guide-card').forEach(function (card, i) {
            var g = copy.guide[i];
            if (!g) return;
            card.querySelector('h3').textContent = g[0];
            var ul = card.querySelector('ul');
            ul.innerHTML = '';
            g[1].forEach(function (line) {
                var li = document.createElement('li');
                li.textContent = line;
                ul.appendChild(li);
            });
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
