# minesweeper-game

지뢰찾기 게임입니다 💣

## 프로젝트 시작

```bash
    yarn intall
    yarn start
```

## dev stack

- mobX
- styled-component
- eslint (google format)
- prettier
- CRA 통한 프로젝트 셋업

## 프로젝트 구조

src 폴더 하위 구조입니다.

```
├── components          //UI 컴포넌트
│  ├── board.tsx
│  ├── displayBox.tsx
│  └── timer.tsx
├── modules             //Global State 관리
│  ├── gameStore.ts
│  └── index.tsx
├── pages               //페이지 라우팅
│  └── index.tsx
├── styles(Global Style)
│  └── global.ts
├── utils               //보조 기능
│  └── randomUtil.ts
```

<br/>

<img src ="https://user-images.githubusercontent.com/44824463/165353684-3da717f1-1ae5-4c7d-8bed-aabdf9ab643a.jpeg" alt ="" width="600px" height="1000px"/>

1. 남은 지뢰 수
2. 다시 시작 버튼 ( 게임에서 지면 '😈', 이기면 '😎', 기본 '🙂 ' )
3. 타이머 ( 첫 셀 클릭 시 동작 )

### to-do

- [ ] 난이도 설정 메뉴 추가
- [ ] 게임 결과 기록 리스트 추가
