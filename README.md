# 가계부 프로젝트

## 프로젝트 소개

소비내역을 기록하고 관리할 수 있는 어플리케이션입니다.  
해당 프로젝트는 테스트 주도 개발(TDD)를 학습하고 익히는데 목표가 있습니다.

## 기능 명세서

### 메인 페이지

#### 시간 선택 메뉴

- 현재 연도와 월을 보여준다.
- 클릭시 드랍으로 이전 년/월을 보여준다
- 클릭시 시간이 변경된다.
- 해당 년도와 월에 기록한 소비내역을 보여준다

#### 소비금액 총합

- 해당 월의 소비금액 총합을 보여준다.

#### 소비내역 리스트

`리스트가 있을 경우`

- 소비내역 리스트를 보여준다

`리스트가 없을 경우`

- 리스트가 비었다는 메세지를 보여준다

#### 리스트 추가 버튼

- 클릭시 소비내역을 추가할 수 있는 모달창을 보여준다.

#### 리스트 추가 모달창

- 금액, 카테고리, 날짜, 내용 입력창 보여주기
- 취소 or 모달창 외부 클릭시 모달창 종료
- 확인 클릭시 리스트에 추가

###### 금액 입력창

- 입력 바로 옆에 원(단위) 붙여주기
- 3자리 마다 콤마 붙여서 연결해주기

###### 카테고리 입력창

- 드랍메뉴로 카테고리 보여주기
- 메뉴 선택시 해당 메뉴로 전환하기

###### 날짜 입력창

- 날짜 선택창 보여주기
- 해당 날짜 선택시 날짜 전환하기

###### 내용 입력창

- 내용 입력 받기

## 기술스택

- `react`
- `redux` : 전역 상태 관리
- `redux-saga` : 리스트 저장하고 불러오는 비동기처리를 위해 사용
- `typescript` : 정적 타입 체크
- `jest` : 테스트
- `css-in-css` : css파일을 모듈로 관리
