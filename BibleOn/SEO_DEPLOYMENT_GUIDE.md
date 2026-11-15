# 말씀온 배포 후 검색 등록 안내

기준일: 2026-11-15

배포가 끝나면 **페이지 확인 → 사이트 소유확인 → 사이트맵 제출 → 한영 페이지 색인 요청 → 결과 확인** 순서로 진행합니다.

이 문서는 현재 대표 도메인인 `insulab.tech`을 기준으로 합니다. Google이나 네이버 계정에서 진행하는 소유확인·사이트맵 제출은 코드 배포 후 직접 처리해야 합니다.

## 1. 배포 완료와 실제 페이지 확인

1. [저장소의 GitHub Actions](https://github.com/isjang98/isjang98.github.io/actions)를 엽니다.
2. 이번 커밋의 **말씀온 SEO 정합성** 검증 결과와 GitHub Pages 배포 작업이 성공했는지 확인합니다.
3. 다음 주소를 브라우저에서 엽니다.

| 확인 대상 | 주소 | 확인할 내용 |
| --- | --- | --- |
| 한국어 페이지 | <https://insulab.tech/BibleOn/> | 한국어 본문과 이미지가 표시되는지 |
| 영어 페이지 | <https://insulab.tech/BibleOn/en/> | 영어 본문과 영문 자료가 표시되는지 |
| 사이트맵 | <https://insulab.tech/BibleOn/sitemap.xml> | XML이 열리고 한영 페이지 주소가 포함되어 있는지 |
| 검색 로봇 설정 | <https://insulab.tech/robots.txt> | BibleOn 사이트맵 주소가 포함되어 있는지 |

한국어·영어 페이지의 언어 전환 링크도 한 번씩 눌러 확인합니다.

## 2. Google Search Console에서 소유확인

접속: [Google Search Console](https://search.google.com/search-console)

이미 소유확인이 완료된 `insulab.tech` 속성이 있다면 그 속성을 선택하고 3번으로 이동합니다.

처음 등록한다면 다음과 같이 진행합니다.

1. Google 계정으로 로그인합니다.
2. 왼쪽 위 속성 선택 메뉴에서 **속성 추가**를 누릅니다.
3. **도메인**을 선택하고 다음 값만 입력합니다.

   ```text
   insulab.tech
   ```

4. Google이 제공하는 **TXT 레코드 값**을 복사합니다.
5. 도메인의 DNS를 관리하는 서비스에 접속해, 안내된 이름·호스트와 값을 사용하여 TXT 레코드를 추가합니다.
6. Search Console로 돌아와 **확인**을 누릅니다. DNS 반영이 아직 안 되었다면 반영된 뒤 다시 확인합니다.
7. 인증에 사용한 TXT 레코드는 인증 완료 후에도 유지합니다.

도메인 속성에는 `https://`나 `/BibleOn/`을 붙이지 않습니다. 이 속성은 같은 도메인의 한국어·영어 페이지를 함께 포함합니다.

DNS 관리 권한이 없다면 **URL 접두어** 속성에 `https://insulab.tech/BibleOn/`을 등록하고, Google이 제시하는 다른 소유확인 방법을 사용할 수 있습니다. 파일·태그 방식은 실제 발급된 파일이나 인증값을 사이트에 반영한 다음 확인해야 합니다.

## 3. Google에 사이트맵 제출

1. Search Console에서 `insulab.tech` 속성을 선택합니다.
2. 왼쪽 메뉴의 **Sitemaps**를 엽니다.
3. **새 사이트맵 추가**에 다음 주소를 입력하고 **제출**을 누릅니다.

   ```text
   https://insulab.tech/BibleOn/sitemap.xml
   ```

4. 제출된 사이트맵의 상태가 **성공**인지 확인합니다.

사이트맵 파일을 Google에 다시 업로드하는 과정은 없습니다. 배포한 XML 파일의 주소를 알려주는 절차입니다.

## 4. 한국어·영어 페이지 각각 색인 요청

아래 두 주소에 대해 각각 한 번씩 진행합니다.

```text
https://insulab.tech/BibleOn/
https://insulab.tech/BibleOn/en/
```

1. Search Console 상단의 **URL 검사** 입력창에 주소 하나를 붙여 넣습니다.
2. **실제 URL 테스트**를 실행합니다.
3. 페이지를 가져올 수 있고 색인 생성이 가능한지 확인합니다.
4. **색인 생성 요청**을 누릅니다.
5. 나머지 언어의 주소에도 같은 절차를 진행합니다.

검사할 때는 위의 고정 주소를 사용합니다. 기존 공유 주소인 `?lang=en`이나 광고 추적용 UTM 파라미터를 붙일 필요는 없습니다.

## 5. 며칠 뒤 처리 결과 확인

처음 요청한 뒤 며칠 후 다음 보고서를 확인하고, 아직 처리 중이면 시간을 두고 다시 확인합니다.

| 보고서 | 확인할 내용 |
| --- | --- |
| Sitemaps | 사이트맵을 정상적으로 가져왔는지 |
| 페이지 색인 생성 | 한영 페이지가 색인되었는지, 제외되었다면 이유가 무엇인지 |
| URL 검사 | 마지막 크롤링과 Google이 선택한 표준 URL |
| 검색 실적 | 노출·클릭·검색어 데이터가 쌓이는지 |

색인 처리에는 며칠에서 몇 주가 걸릴 수 있습니다. 같은 URL의 수집 요청을 반복해도 처리 속도가 빨라지지는 않습니다. 사이트맵 제출이나 색인 요청이 검색 노출·순위 상승을 보장하지는 않습니다.

## 6. 네이버에도 등록하기

한국어 검색 유입을 관리하려면 [네이버 서치어드바이저](https://searchadvisor.naver.com/)에서도 진행합니다.

1. 네이버 계정으로 로그인하고 **웹마스터 도구**를 엽니다.
2. 사이트 등록에 다음 호스트 주소를 입력합니다.

   ```text
   https://insulab.tech/
   ```

3. 안내에 따라 사이트 소유확인을 완료합니다.
4. **HTML 파일 업로드** 방식을 선택했다면, 네이버에서 받은 파일을 원래 이름·내용 그대로 저장소 루트에 추가하고 커밋·push합니다.

   ```text
   /Users/isjang98/personal/isjang98.github.io/
   ```

   네이버가 안내한 공개 주소에서 파일이 열리는지 확인한 뒤 소유확인을 완료합니다.

5. 소유확인한 사이트를 선택한 다음 **요청 → 사이트맵 제출**을 엽니다.
6. 다음 사이트맵 주소를 제출합니다.

   ```text
   https://insulab.tech/BibleOn/sitemap.xml
   ```

7. 이후 웹마스터 도구에서 수집·색인·노출 보고서를 확인합니다.

네이버 사이트 등록은 호스트 단위이므로 `/BibleOn/` 경로를 사이트 등록 주소에 붙이지 않습니다. 사이트맵은 위의 BibleOn 경로를 포함한 전체 주소로 제출합니다.

## 문제가 보일 때

| 상황 | 먼저 확인할 내용 |
| --- | --- |
| 영어 페이지가 404로 열림 | Pages 배포가 끝났는지, `BibleOn/en/index.html`이 커밋에 포함되었는지 |
| 이전 화면이 계속 보임 | 최신 배포 완료 여부를 확인하고 브라우저에서 강력 새로고침 실행 |
| 사이트맵을 가져올 수 없음 | 사이트맵 공개 주소가 열리는지와 제출한 주소의 도메인·대소문자 확인 |
| 소유확인이 실패함 | 선택한 속성의 도메인, 발급된 인증값, DNS 반영 또는 인증 파일의 공개 여부 확인 |
| 페이지 색인이 제외됨 | URL 검사의 제외 사유와 Google이 선택한 표준 URL 확인 |

## 다음 배포부터

- 기존 사이트 소유확인이 유지되고 있으면 같은 사이트를 다시 등록하지 않습니다.
- 새 페이지나 중요한 변경사항이 있을 때 공개 페이지와 사이트맵을 확인합니다.
- 영어 페이지 수정은 `index.html`의 번역 원본을 수정하고 `tools/build_en.py`로 재생성합니다. `en/index.html`은 직접 편집하지 않습니다.
- 자동 리뷰 갱신은 한국어 원본을 갱신한 후 영어 페이지도 재생성하도록 구성되어 있습니다.

## 완료 체크

- [ ] SEO 검증과 Pages 배포가 성공했다.
- [ ] 한국어·영어 페이지와 사이트맵이 공개 주소에서 정상적으로 열린다.
- [ ] Google Search Console의 사이트 소유확인을 완료했다.
- [ ] Google 사이트맵 제출 상태가 성공이다.
- [ ] 한영 페이지의 URL 검사와 색인 요청을 진행했다.
- [ ] 네이버 유입도 관리한다면 소유확인과 사이트맵 제출을 완료했다.
- [ ] 며칠 뒤 색인·검색 실적 보고서를 확인할 일정을 잡았다.

## 공식 도움말

- [Google: 속성 추가와 도메인·URL 접두어의 차이](https://support.google.com/webmasters/answer/34592?hl=ko)
- [Google: 사이트 소유권 확인](https://support.google.com/webmasters/answer/9008080?hl=ko)
- [Google: 사이트맵 관리](https://support.google.com/webmasters/answer/7451001?hl=ko)
- [Google: URL 검사 도구](https://support.google.com/webmasters/answer/9012289?hl=ko)
- [Google: 재크롤링 요청과 처리 시간](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [네이버: 사이트 등록 및 소유확인](https://searchadvisor.naver.com/guide/faq-start-register)
- [네이버: 사이트맵 제출](https://searchadvisor.naver.com/guide/request-feed)
