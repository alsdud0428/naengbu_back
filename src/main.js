import { createApp } from 'vue';
import App from './App.vue';
import router from './router';// (back)
import axios from 'axios'; //(back)

const app = createApp(App);

// Vue Router 사용 설정
app.use(router);

// Axios를 전역 속성으로 설정(back)
app.config.globalProperties.$axios = axios;

// Vue 인스턴스를 #app 요소에 마운트
app.mount('#app');
