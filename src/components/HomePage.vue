<template>
  <div class="home-page-container">
    <div class="container home-title">
      <h1 class="card-title text-start">My Fridge</h1>
      <p class="text-start">손쉽게 식재료를 관리하고,<br>알뜰하게 냉장고 파먹기!</p>
    </div>
    <div class="card home-card">
      <div class="card-body">
        <button @click="navigateToLogin" class="btn btn-primary btn-block action-button btn-login">Login</button>
        <button @click="navigateToSignin" class="btn btn-primary btn-block action-button btn-signin">Sign up</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
      navigateToLogin() {
        this.$router.push('/login');
      },
      navigateToSignin() {
        this.$router.push('/signup');
      },
    },
  };
</script>

<style>
.home-page-container {
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height:100vh;
    width:100%;
    background: linear-gradient(to bottom, #bae5ff, #8bd0fc, #5f98bb);
    box-sizing: border-box;
    position: relative;
  }

  .home-title {
    max-width: 80%;
    top:20%;
    position: relative;
  }
  
  .card-title {
    color: #1f1e22;
    font-size: 44pt;
    font-weight: bolder;
  }

  .home-card {
    display:flex;
    width: 100%;
    height:45%;
    padding: 20px;
    border-radius: 50px 50px 0px 0px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    position: absolute;
    bottom: 0;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .action-button {
    color: #1f1e22;
    font-weight: bolder;
    border: none;
    border-radius: 30px;
    width:80%;
    max-width: 380px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:10px;
  }

  .btn-login{
    background-color: #fce76c;
  }
  .btn-login:hover{
    background-color: #ff9e71;
  }
  .btn-signin{
    background-color: #8bd0fc;
  }
  .btn-signin:hover{
    background-color: #7881ff;
  }
</style>