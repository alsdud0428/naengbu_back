<template>
    <div class="login-form-container">
      <div class="container fixed-top mt-3 home-button-set">
        <div class="row">
          <div class="col">
            <router-link to="/" class="home-link">
              <img src="@/assets/left.png" alt="Home" class="home-button">
            </router-link>
          </div>
          <div class="col">
            <router-link to="/signup" class="signup-link">
              <p class="text-end">sign up</p>
            </router-link>
          </div>
        </div>
      </div>
  
      <div class="container login-title">
        <h1 class="card-title text-start">Login</h1>
        <p class="text-start">Welcome!</p>
      </div>
      <div class="card login-card">
        <div class="card-body">
          <form @submit.prevent="login" class="login-form mb-3">
            <div class="form-group">
              <label for="userId">아이디</label>
              <input type="text" v-model="userId" id="userId" placeholder="ID" class="form-control" required/>
            </div>
            <div class="form-group">
              <label for="password">비밀번호</label>
              <input type="password" v-model="userPw" id="userPw" placeholder="Password" class="form-control" required/>
            </div>
            <button type="submit" class="btn btn-primary btn-block loginsubmit">Login</button>
          </form>
        </div>
      </div>
    </div>
  </template>
    
    <script>
import axios from 'axios'; // (back)

export default {
  data() {
    return {
      userId: '', // 사용자 아이디 입력 필드
      userPw: ''  // 사용자 비밀번호 입력 필드
    };
  },
  methods: {
    async login() {
      try {
        // 백엔드 API에 로그인 요청
        const response = await axios.post('http://localhost:8082/api/login', { // (back)
          userId: this.userId,
          userPw: this.userPw
        });

        // 백엔드 로그인 성공 시 처리
        if (response.status === 200) {
          alert('로그인 성공!');
          this.$router.push('/main'); // 로그인 성공 후 메인 페이지로 리디렉션
          return;
        } else {
          // 백엔드 로그인 실패 시 하드코딩된 로그인 확인
          this.checkHardcodedLogin();
        }
      } catch (error) {
        // 백엔드 요청 중 오류 발생 시 하드코딩된 로그인 확인
        console.error('로그인 오류:', error.response?.data || error.message);
        this.checkHardcodedLogin();
      }
    },

    // 하드코딩된 로그인 확인
    checkHardcodedLogin() {
      const enteredUserId = this.userId;
      const enteredUserPw = this.userPw;

      // 하드코딩된 아이디와 비밀번호 확인
      if (enteredUserId === '123' && enteredUserPw === '123') {
        alert('로그인 성공! 안녕하세요!');
        this.$router.push('/main'); // 로그인 성공 후 리디렉션
      } else {
        alert('로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.');
      }
    }
  }
};
</script>
    
    <style>
    .login-form-container {
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height:100vh;
      background-color: #fce76c;
      box-sizing: border-box;
    }

    .home-button{
      width:36px;
      height:36px;
    }
  
    .signup-link{
      color: #1f1e22;
      font-weight: 500;
      text-decoration:none;
    }
  
    .login-card {
      width: 80%;
      max-width: 380px;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background-color: #fff; 
      transform: translateY(-30%);
    }
  
    .login-title {
      width: 80%;
      max-width: 380px;
      padding-left: 20px;
      transform: translateY(-50%);
    }
    .card-title {
      color: #1f1e22;
      font-size: 44pt;
    }
  
    .form-group {
      color: #1f1e22;
      font-size: 10pt;
      font-weight: bolder;
      margin-bottom: 10px;
    }
  
    .form-control{
      border:none;
      border-bottom: 2px solid #ddd;
      border-radius: 0;
      box-shadow: none;
      padding: 0;
      font-size: 16px;
    }
  
    .form-control:focus {
    border-bottom-color: #fce76c;
    outline: none;
    box-shadow: none;
    }
  
    .loginsubmit {
      color: #1f1e22;
      font-weight: bolder;
      background-color: #8bd0fc;
      border: none;
      border-radius: 30px;
      width:70%;
      max-width: 250px;
      height: 60px;
      position: absolute;
      bottom:-30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .loginsubmit:hover {
      background-color: #7881ff;
    }
  
   
    </style>