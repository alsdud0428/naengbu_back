<template>
    <div class="profile-page">
      <h1>내 정보</h1>
      <div class="info-row">
        <div class="info-label">사용자 이름:</div>
        <div class="info-text">{{ userName }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">관심 카테고리:</div>
        <div class="info-text">
          <select v-model="userState" class="category-select" @change="saveUserState">
            <option value="" disabled hidden>카테고리를 선택하세요</option>
            <option v-for="(State, index) in states" :key="index" :value="State">{{ State }}</option>
          </select>
        </div>
      </div>
      <button @click="logout" class="logout-btn">로그아웃</button>

      <!-- 네비게이션 바 추가 -->
      <nav class="nav-bar">
        <router-link to="/main" class="nav-link" exact :class="{ 'active': $route.path === '/main' }">식재료</router-link>
        <router-link to="/main/recipes" class="nav-link" exact :class="{ 'active': $route.path === '/main/recipes' }">레시피</router-link>
        <router-link to="/main/profile" class="nav-link" exact :class="{ 'active': $route.path === '/main/profile' }">내 정보</router-link>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProfilePage',
    data() {
      return {
        userName: '냉장고', // 기본 사용자 이름
        states: ['선택 안 함', '당뇨', '고혈압', '저혈압', '유당불내증', '채식'], // 카테고리 리스트
        userState: '', // 사용자가 선택한 카테고리
      };
    },
    mounted() {
      // LocalStorage에서 사용자 정보 불러오기
      const storedUserName = localStorage.getItem('userName');
      const storedUserState = localStorage.getItem('userState');
      
      if (storedUserName) {
        this.userName = storedUserName; // LocalStorage에 저장된 사용자 이름 설정
      }
  
      if (storedUserState) {
        this.userState = storedUserState; // LocalStorage에 저장된 카테고리 설정
      }
    },
    methods: {
      // 카테고리 선택 시 LocalStorage에 저장
      saveUserState() {
        localStorage.setItem('userState', this.userState);
      },
      
      // 로그아웃 처리
      logout() {
        if (confirm('로그아웃 하시겠습니까?')) {
          // 사용자 정보 및 상태 LocalStorage에서 제거
          localStorage.removeItem('userName');
          localStorage.removeItem('userState');
          
          alert('로그아웃 되었습니다.');
          this.$router.push('/');
        } else {
          console.log('로그아웃 취소');
        }
      },
    },
  };
  </script>

<style scoped>
/* 내 정보 페이지 전체 스타일 */
.profile-page {
  max-width: 500px;
  min-height: 100vh;
  padding: 30px;
  background-color: #ffffff;
  text-align: center;
}

/* 제목 스타일 */
h1 {
  font-size: 28px;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 30px;
}

/* 정보 행 스타일 */
.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

/* 레이블 스타일 */
.info-label {
  font-size: 18px;
  color: #666;
  text-align: left;
  flex: 1;
}

/* 사용자 정보 텍스트 */
.info-text {
  font-size: 18px;
  flex: 2;
  text-align: left;
  color: #333;
  font-weight: 500;
}

/* 선택 박스 스타일 */
.category-select {
  padding: 10px;
  font-size: 16px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

/* 로그아웃 버튼 */
.logout-btn {
  display: block;
  width: 100%;
  margin: 30px 0;
  padding: 12px 0;
  font-size: 18px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #2980b9;
}

/* 네비게이션 바 스타일 */
.nav-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #8bd0fc;
    padding: 10px 0;
    height: 60px;
    z-index: 1000; /* 다른 요소 위에 표시되도록 z-index 설정 */
}

.nav-link {
      flex: 1;
      text-align: center;
      text-decoration: none;
      font-size: 16px;
      color: #1f1e22;
      font-weight: bold;
      padding: 10px 0;
      position: relative;
  }

.nav-link:hover {
    color: #ffffff;
}

.nav-link.active {
  content:"";
  background-color: #fce76c;
  top: -20px;

}
</style>
