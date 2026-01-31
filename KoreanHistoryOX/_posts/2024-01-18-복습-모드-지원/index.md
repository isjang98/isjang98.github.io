---
layout: post
title: 2024-01-18 복습 모드 지원 및 틀린 문제 기능 개선
date: 2024-01-18
categories: 업데이트
---

## 📝 업데이트 요약

### 핵심 개선 사항

**1. 복습 모드 버그 수정 ✅**
- O/X 버튼 비활성화 문제 해결
- 마스터 처리 로직 개선 (원래 파일명으로 저장)

**2. 복습 완료 UI 개선 ✅**
- "다시 복습" 버튼 추가
- 마스터된 문제 수 표시

**3. 기술적 개선 ✅**
- Play Store 업데이트 릴리즈 노트 추가
- GitHub Pages + Jekyll 설정

---

## 1. 복습 모드 버그 수정

### 문제
복습 모드에서 4번째 문제부터 O/X 버튼이 비활성화(disable)되는 문제가 발생했습니다.

### 원인
- `QuizScreen`에서 `isAnswered` 속성만으로 버튼 활성화 여부를 판단
- 복습 모드(`isReviewMode`) 체크 로직이 없었음
- 이미 답변한 문제(`userAnswer != null`)가 섞인 순서로 먼저 나오면 버튼 비활성화

### 해결
```kotlin
// QuizScreen.kt
val isReviewMode = uiState is QuizUiState.Success && uiState.quiz.fileName == "review_mode"

// O/X 버튼
enabled = isReviewMode || !currentQuestion.isAnswered
```

---

## 2. 복습 완료 UI 개선

### 문제
복습 모드 완료 후 일반 결과 화면("결과 보기")이 표시되어 사용자 경험에 부자연스럽지 않았습니다.

### 해결
```kotlin
// ResultScreen.kt
@Composable
private fun ReviewModeResultContent(...) {
    // 복습 완료 전용 UI
    - "다시 복습" 버튼
    - "홈으로 가기" 버튼
    - 마스터된 문제 수 표시
}
```

---

## 3. 마스터 처리 로직 개선

### 문제
복습 모드에서 정답 맞춘 문제를 마스터 처리할 때 현재 파일명(`fileName`)이 "review_mode"로 저장되어, 틀린 문제 목록에서 제외되지 않았습니다.

### 해결
```kotlin
// Question.kt
data class Question(
    val originalFileName: String? = null  // 원래 파일명 보존
)

// QuizRepository.kt
wrongQuestions.add(
    Question(
        fileName = "review_mode",
        originalFileName = fileName  // 원래 파일명 보존
    )
)

// 마스터 처리
repository.markQuestionMastered(currentQuestion.originalFileName!!, currentQuestion.id)
```

---

## 4. Play Store 업데이트

### 내용
- 최근 복습 모드 기능 추가
- 틀린 문제 기능 개선
- 스트릭 및 연속 학습 로직 최적화

---

## 사용자 개선 사항

1. ✅ 복습 모드에서 언제든 O/X 선택 가능
2. ✅ 복습 완료 후 "다시 복습" 또는 "홈으로 가기" 선택 가능
3. ✅ 정확한 마스터 처리 (틀린 문제 목록에서 올바르게 제외)
4. ✅ 사용자 경험 개선 (복습 완료 UI 개선)

---

## 기술적 개선

- Compose 성능 최적화 (불필요한 recomposition 방지)
- Flow 구조화된 동시성 처리
- SharedPreferences 키 관리 체계화
