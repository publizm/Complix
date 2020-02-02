# Complix
넷플릭스 클론 프로젝트

### 목표
1. React.js를 활용하여 동적인 UI 개발
2. React 클래스 컴포넌트 및 함수형 컴포넌트에 대한 이해
3. React-Redux를 통한 상태 관리 연습
4. React-Router를 통한 컴포넌트 <-> URL 맵핑
5. styled-components 모듈을 이용한 컴포넌트 스타일링
6. axios 모듈을 이용한 비동기 통신 및 후속 처리

### 구현 기능 (Must)
- 로그인 페이지 (로컬 스토리지의 token 값을 활용)
- 메인 페이지 (신규 TV & 영화, 인기 TV & 영화 등 컨텐츠 정보 제공)
  - 컨텐츠 선택시 해당 컨텐츠 상세 정보 표시
- TV 프로그램 페이지 (메인 페이지의 컨텐츠 중 카테고리가 TV인 컨텐츠 정보 제공)
  - 컨텐츠 선택시 해당 컨텐츠 상세 정보 표시
- 영화 페이지 (메인 페이지의 컨텐츠 중 카테고리가 영화인 컨텐츠 정보 제공)
  - 컨텐츠 선택시 해당 컨텐츠 상세 정보 표시

### 구현 기능 (Optional)
- 내가 찜한 컨텐츠 (실제 [the Movie DB](https://www.themoviedb.org/) 사이트의 회원정보에 해당 컨텐츠를 등록)
- 컨텐츠 선택시 해당 컨텐츠를 내가 찜한 컨텐츠에 추가할 수 있는 버튼

### 사용 API
[The Movie DB](https://developers.themoviedb.org/3) API를 사용하여 신규 TV & 영화, 인기 TV & 영화, 지금 뜨는 컨텐츠에 대한 정보 제공.
- [신규 TV](https://developers.themoviedb.org/3/tv/get-tv-on-the-air)
- [신규 영화](https://developers.themoviedb.org/3/movies/get-now-playing)
- [지금 뜨는 컨텐츠](https://developers.themoviedb.org/3/trending/get-trending)
- [인기 TV](https://developers.themoviedb.org/3/tv/get-popular-tv-shows)
- [인기 영화](https://developers.themoviedb.org/3/movies/get-popular-movies)
- [통합 검색](https://developers.themoviedb.org/3/search/multi-search)

### dependencies
- react-router-dom
- axios
- styled-components
- polished
- query-string
- redux
- react-redux
- react-error-boundary
- react-horizontal-scrolling-menu
- uuid
- loadsh (debounce)

### devDependencies
- eslint-config-prettier
- husky
- lint-staged
- prettier
