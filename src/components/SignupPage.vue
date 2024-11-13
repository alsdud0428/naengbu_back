<template>
    <div class="signup-form-container">
      <div class="container fixed-top mt-3">
        <div class="row">
          <div class="col">
            <router-link to="/" class="home-link">
              <img src="@/assets/left.png" alt="Home" class="home-button">
            </router-link>
          </div>
          <div class="col">
            <router-link to="/login" class="login-link">
              <p class="text-end">login</p>
            </router-link>
          </div>
        </div>
      </div>
  
      <div class="container title">
        <h1 class="card-title text-start">Sign Up</h1>
        <p class="text-start">Create account</p>
      </div>
      <div class="card signup-card">
        <div class="card-body">
          <form @submit.prevent="submitForm" class="signup-form mb-3">
            <div class="form-group">
              <label for="userId">아이디</label>
              <input type="text" v-model="userId" id="userId" placeholder="ID" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="userPw">비밀번호</label>
              <input type="password" v-model="userPw" id="userPw" placeholder="Password" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="userName">이름</label>
              <input type="text" v-model="userName" id="userName" placeholder="Name" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="userState">관심 카테고리</label>
              <select v-model="userState" id="userState" class="form-control">
                <option value="" disabled hidden>선택 안 함</option>
                <option v-for="(State, index) in states" :key="index" :value="State">{{ State }}</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary btn-block submitform">Sign up</button>
          </form>
        </div>
      </div>
      
      <!-- 회원가입 완료 후에만 모달 표시 -->
      <div v-if="showModal" class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm modal-fullscreen">
          <div class="modal-content">
            <div class="modal-body text-center">
              <p>회원가입을 축하합니다!</p>
              <button type="button" class="btn btn-primary modalclose" @click="navigateToLogin">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; // (back)
  import { Modal } from 'bootstrap';
  
  export default {
    data() {
      return {
        userId: '',
        userPw: '',
        userName: '',
        states: ['선택 안 함', '당뇨', '고혈압', '저혈압', '유당불내증', '채식'], // 카테고리 리스트
        userState: '', 
        showModal: false // 모달 표시 여부를 제어하는 변수
      };
    },
    methods: {
      async submitForm() {
        try {
          const userInfo = {
            userId: this.userId,
            userPw: this.userPw,
            userName: this.userName,
            userState: this.userState
          };
          await axios.post('http://localhost:8082/api/signup', userInfo); //(back)
          // 성공적으로 회원가입 처리됨
          this.showModal = true; // 모달 표시 상태로 변경
          this.$nextTick(() => {
            const modalElement = document.getElementById('successModal');
            const modalInstance = new Modal(modalElement, {
              backdrop: 'static', // 모달 밖을 클릭해도 모달이 닫히지 않도록 설정
              keyboard: false // 키보드로 모달을 닫을 수 없도록 설정
            });
            modalInstance.show(); // 모달 표시
          });
        } catch (error) {
          console.error('회원가입 오류:', error.response?.data || error.message);
        }
      },
      navigateToLogin() {
        const modalElement = document.getElementById('successModal');
        if (modalElement) {
          const modalInstance = Modal.getInstance(modalElement);
          if (modalInstance) {
            modalInstance.hide(); // 모달을 숨깁니다.
          }
          this.$router.push('/login'); // 로그인 페이지로 이동합니다.
        }
      }
    }
  };
  </script>
  
  <style>
  .signup-form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #8bd0fc;
    box-sizing: border-box;
  }
  
  .home-button {
    width: 36px;
    height: 36px;
  }
  
  .login-link {
    color: #1f1e22;
    font-weight: 500;
    text-decoration: none;
  }
  
  .signup-card {
    width: 80%;
    max-width: 380px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transform: translateY(-20%);
  }
  
  .title {
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
  
  .form-control {
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    font-size: 16px;
  }
  
  .form-control:focus {
    border-bottom-color: #8bd0fc;
    outline: none;
    box-shadow: none;
  }
  
  .submitform {
    color: #1f1e22;
    font-weight: bolder;
    background-color: #fce76c;
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
  
  .submitform:hover {
    background-color: #ff9e71;
  }
  
  .modal-content {
    background-color: #fce76c;
  }
  
  .modal-body{
    color: #1f1e22;
    font-weight: bolder;
    background-color: #fff;
    width: 80%;
    max-width: 380px;
    max-height: 25%;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    left: 50%;
    top:50%;
    transform: translateX(-50%) translateY(-50%);
    justify-content: center;
    align-items: center;
  }

  .modalclose{
    color: #1f1e22;
    font-weight: bolder;
    background-color: #8bd0fc;
    border: none;
    border-radius: 30px;
    width:70%;
    max-width: 250px;
    height: 60px;
  } 
  </style>
  