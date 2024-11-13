import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import MainPage from '@/components/MainPage.vue';
import RecipesPage from '@/components/RecipesPage.vue';
import RecipeDetailPage from '@/components/RecipeDetailPage.vue';
import ProfilePage from '@/components/ProfilePage.vue';
import LoginPage from '@/components/LoginPage.vue';
import SignupPage from '@/components/SignupPage.vue';

// 라우트 설정
const routes = [
  { path: '/', component: HomePage },
  { path: '/main', component: MainPage, meta: { requiresAuth: true } }, 
  { path: '/main/profile', component: ProfilePage },
  { path: '/main/recipes', component: RecipesPage },
  { path: '/main/recipes/:id', component: RecipeDetailPage },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  // 다른 라우트 설정이 있다면 추가하세요.
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;