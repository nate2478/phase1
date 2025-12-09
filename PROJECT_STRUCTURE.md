# Phase1 프로젝트 구조

## 📁 프로젝트 구조

```
phase1/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API 라우트
│   │   │   ├── auth/
│   │   │   │   └── social-login/     # 소셜 로그인 API
│   │   │   ├── content/
│   │   │   │   └── home/              # 홈 콘텐츠 조회 API
│   │   │   └── personal-color/
│   │   │       ├── colors/            # 퍼컬 색상코드 조회 API
│   │   │       └── save-result/       # 퍼컬 결과 저장 API
│   │   ├── layout.tsx                 # 루트 레이아웃 (GNB 포함)
│   │   ├── page.tsx                   # 홈 페이지
│   │   ├── search/                    # 검색 페이지
│   │   ├── ranking/                   # 랭킹 페이지
│   │   ├── mypage/                    # 마이페이지
│   │   └── notifications/             # 알림 페이지
│   │
│   ├── components/                    # 컴포넌트
│   │   ├── GNB.tsx                    # 하단 네비게이션 바
│   │   ├── HomeHeader.tsx             # 홈 헤더 (로고, 검색, 알림)
│   │   ├── SubMenu.tsx                # 서브메뉴 (추천, 퍼컬, 스킨, 화장품)
│   │   ├── SocialLogin.tsx            # 간편 로그인 컴포넌트
│   │   ├── PercolMatching.tsx         # 퍼컬매칭 메인 컴포넌트
│   │   ├── camera/
│   │   │   ├── CameraView.tsx         # 카메라 뷰
│   │   │   └── ColorSelection.tsx    # 색상 선택 UI
│   │   └── content/                   # 동적 콘텐츠 위젯
│   │       ├── ContentRenderer.tsx    # 콘텐츠 렌더러
│   │       ├── BannerWidget.tsx       # 배너 위젯
│   │       ├── ShortFormWidget.tsx    # 숏폼 위젯
│   │       ├── ListViewWidget.tsx     # 리스트뷰 위젯
│   │       ├── IconShortcutWidget.tsx  # 아이콘 숏컷 위젯
│   │       └── FooterWidget.tsx       # 푸터 위젯
│   │
│   ├── types/                         # TypeScript 타입 정의
│   │   ├── user.ts                    # 사용자 타입
│   │   ├── content.ts                 # 콘텐츠 타입
│   │   └── personalColor.ts           # 퍼스널컬러 타입
│   │
│   ├── utils/                         # 유틸리티 함수
│   │   ├── auth.ts                    # 인증 유틸리티
│   │   ├── osDetector.ts              # OS 감지 및 로그인 채널 분기
│   │   └── personalColorLogic.ts      # 퍼컬 선택 로직
│   │
│   └── db/
│       └── schema.sql                  # 데이터베이스 스키마
│
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🎯 주요 기능 구조

### 1. 인증 시스템
- ✅ 기본 구조: 소셜 로그인 타입 정의, OS별 분기 로직
- ⏳ TODO: 실제 소셜 로그인 SDK 연동 (카카오, 페이스북, 구글, 애플)
- ⏳ TODO: JWT 토큰 관리 및 자동 로그인
- ⏳ TODO: 데이터베이스 연동

### 2. 홈 페이지
- ✅ 기본 구조: 헤더, 서브메뉴, 동적 콘텐츠 위젯 시스템
- ✅ 백오피스 연동 API 구조
- ⏳ TODO: 실제 백오피스 API 연동
- ⏳ TODO: 이미지 최적화

### 3. 퍼컬매칭
- ✅ 기본 구조: 3단계 선택 프로세스, 카메라 컴포넌트
- ✅ 선택 로직: 쿨톤/웜톤 → 계절 → 세부타입
- ⏳ TODO: 입술 영역 감지 ML 모델 연동 (face-api.js, MediaPipe 등)
- ⏳ TODO: 백오피스 색상코드 관리 시스템 연동
- ⏳ TODO: 결과 저장 및 사용자별 히스토리

### 4. 스킨매칭
- ✅ 기본 구조: 플레이스홀더 페이지
- ⏳ TODO: 카메라 기반 얼굴 진단 기능
- ⏳ TODO: 모공, 여드름, 주름, 유분기 진단 로직
- ⏳ TODO: 진단 결과 저장

### 5. 화장품매칭
- ✅ 기본 구조: 플레이스홀더 페이지
- ⏳ TODO: 스킨매칭 결과 기반 화장품 추천 로직
- ⏳ TODO: 화장품 데이터베이스 연동

### 6. 검색 & 랭킹
- ✅ 기본 구조: 페이지 생성
- ⏳ TODO: 검색 기능 구현
- ⏳ TODO: 랭킹 시스템 구현

## 🔧 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State Management**: React Hooks
- **API**: Next.js API Routes

## 📝 향후 작업 우선순위

### Phase 1 (현재 완료)
- ✅ 프로젝트 기본 구조
- ✅ 인증 시스템 구조
- ✅ 홈 페이지 구조
- ✅ 퍼컬매칭 기본 구조

### Phase 2 (다음 단계)
- [ ] 실제 소셜 로그인 SDK 연동
- [ ] 데이터베이스 연동 (PostgreSQL/MySQL)
- [ ] 백오피스 API 실제 연동
- [ ] 입술 감지 ML 모델 연동

### Phase 3 (추가 기능)
- [ ] 스킨매칭 기능 구현
- [ ] 화장품매칭 기능 구현
- [ ] 검색 기능 구현
- [ ] 랭킹 시스템 구현

### Phase 4 (최적화)
- [ ] 이미지 최적화
- [ ] 성능 최적화
- [ ] SEO 최적화
- [ ] 에러 핸들링 강화

