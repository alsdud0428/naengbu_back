<template>
    <div class="recipes-page">
      <div class="header">
          <div class="row">
            <div class="col-1">
              <img src="@/assets/recipe-book.png" class="recipe-ico">
            </div>  
            <div class="col">
              <h1 class="title">레시피</h1>
            </div>
            <div class="col-1">
              <img src="@/assets/filter.png" class="filter-ico">
            </div>
            <div class="col-1 star">
              <img src="@/assets/star.png" class="star-icon">
            </div>
          </div>
          <hr/>
        </div>
      
      <div class="search-bar">
        <img src="@/assets/search.png" class="filter-ico">
        <input type="text" v-model="searchQuery" placeholder="식재료명이나 요리명을 검색하세요">
      </div>
  
      <div class="recipe-list">
        <div class="recipe-item" v-for="recipe in filteredRecipes" :key="recipe.recipeId" >
          <button @click="toggleFavorite(recipe)" class="favorite-icon">
            <img :src="recipe.isFavorite ? require('@/assets/star.png') : 
            require('@/assets/empty.png')" class="favorite-img" />
            </button>
          <div class="recipe-info">
            <div class="recipe-name" @click="goToRecipeDetail(recipe.recipeId)">{{ recipe.recipeName }} </div>
            <div class="category">{{ recipe.recipeState }}</div>
            <div class="ingredients">{{ recipe.ingredients.join(', ') }}</div>
          </div>
          <div v-if="recipe.recipeName === '토마토 파스타'" class="favorite-icon" @click.stop="toggleFavorite(recipe.recipeId)">
            <i :class="['fas', 'fa-star', { 'favorited': recipe.favorite }]"></i>
          </div>
        </div>
      </div>
  
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
    name: 'RecipesPage',
    data() {
      return {
        recipes: [
          { recipeId: 1, recipeName: '토마토 파스타', progress: 75, recipeState: '양식', favorite: true, ingredients: ['파스타면', '토마토', '올리브 오일', '마늘', '양파', '소금', '후추'] },
          { recipeId: 2, recipeName: '그린 샐러드', progress: 100, recipeState: '샐러드', favorite: false, ingredients: ['양상추', '토마토', '오이', '당근', '올리브 오일', '식초', '소금', '후추'] },
          { recipeId: 3, recipeName: '딸기 스무디', progress: 50, recipeState: '음료', favorite: false, ingredients: ['딸기', '바나나', '요거트', '우유', '꿀'] },
          { recipeId: 4, recipeName: '초코 케이크', progress: 80, recipeState: '디저트', favorite: false, ingredients: ['밀가루', '설탕', '코코아 가루', '버터', '계란'] },
          { recipeId: 5, recipeName: '닭볶음탕', progress: 60, recipeState: '한식', favorite: true, ingredients: ['닭고기', '감자', '당근', '양파', '대파', '고추장', '간장', '소금', '후추'] },
          { recipeId: 6, recipeName: '버섯 리조또', progress: 90, recipeState: '양식', favorite: false, ingredients: ['리조또 쌀', '버섯', '파마산 치즈', '양파', '육수'] },
          { recipeId: 7, recipeName: '스파이시 치킨윙', progress: 70, recipeState: '안주', favorite: true, ingredients: ['닭 날개', '핫소스', '버터', '소금', '후추'] },
          { recipeId: 8, recipeName: '고구마 튀김', progress: 100, recipeState: '간식', favorite: false, ingredients: ['고구마', '전분', '식용유', '소금'] },
          { recipeId: 9, recipeName: '해산물 파에야', progress: 75, recipeState: '양식', favorite: true, ingredients: ['쌀', '새우', '홍합', '조개', '파프리카', '사프란'] },
          { recipeId: 10, recipeName: '스테이크', progress: 85, recipeState: '양식', favorite: false, ingredients: ['소고기', '소금', '후추', '올리브 오일'] },
          { recipeId: 11, recipeName: '계란찜', progress: 100, recipeState: '한식', favorite: true, ingredients: ['계란', '소금', '물', '파'] },
          { recipeId: 12, recipeName: '프렌치 토스트', progress: 60, recipeState: '브런치', favorite: false, ingredients: ['식빵', '계란', '우유', '버터', '메이플 시럽'] },
          { recipeId: 13, recipeName: '라자냐', progress: 70, recipeState: '양식', favorite: true, ingredients: ['파스타', '고기', '토마토 소스', '치즈', '양파'] },
          { recipeId: 14, recipeName: '아보카도 샌드위치', progress: 80, recipeState: '브런치', favorite: false, ingredients: ['식빵', '아보카도', '토마토', '상추', '소금'] },
          { recipeId: 15, recipeName: '돼지고기 볶음', progress: 90, recipeState: '한식', favorite: true, ingredients: ['돼지고기', '양파', '고추', '소금', '후추'] },
          { recipeId: 16, recipeName: '바나나 빵', progress: 100, recipeState: '디저트', favorite: false, ingredients: ['바나나', '밀가루', '설탕', '계란', '버터'] },
          { recipeId: 17, recipeName: '치킨 카레', progress: 75, recipeState: '한식', favorite: true, ingredients: ['닭고기', '카레 가루', '양파', '당근', '감자'] },
          { recipeId: 18, recipeName: '베리 믹스 샐러드', progress: 100, recipeState: '샐러드', favorite: false, ingredients: ['블루베리', '딸기', '라즈베리', '시금치', '호두'] },
          { recipeId: 19, recipeName: '갈비찜', progress: 90, recipeState: '한식', favorite: true, ingredients: ['갈비', '간장', '마늘', '양파', '설탕'] },
          { recipeId: 20, recipeName: '치즈 피자', progress: 80, recipeState: '양식', favorite: false, ingredients: ['피자 도우', '토마토 소스', '치즈', '올리브'] }
        ],
        searchQuery: ''
      };
    },
    computed: {
      filteredRecipes() {
        return this.recipes.filter(recipe =>
          recipe.recipeName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(this.searchQuery.toLowerCase()))
        );
      }
    },
    methods: {
      toggleFavorite(recipe) {
      recipe.isFavorite = !recipe.isFavorite;
    },
      goToRecipeDetail(recipeId) {
        this.$router.push(`/main/recipes/${recipeId}`);
      }
    }
  };
  </script>
  
  <style scoped>
  /* 전체 페이지 스타일 */
  .recipes-page {
      background-color: #ffffff; /* 흰색 배경 */
      min-height: 100vh;
      padding: 20px;
      padding-top: 70px;
      padding-bottom: 70px;
      box-sizing: border-box; /* 패딩과 테두리를 포함하여 크기 계산 */
  }
  /* 타이틀 스타일 */
  .header{
    position: fixed;
    background-color: #fff;
    top:0;
    left: 0;
    right: 0;
    padding: 20px;
    height: 75px;
    z-index: 1000;
  }
  .row{
    padding: 5px;
  }
  .col{
    height: 40px;
  }
  .title {
    width: 100%;  
    color: #1f1e22;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 1px;
    margin-top: 15px; 
    padding-left: 0;
  }
  .recipe-ico{
    width:26px;
    height:26px;
  }
  .filter-ico{
    width:20px;
    height:20px;
  }
  .star{
    margin-right: 25px;
  }
  .star-icon{
    width: 20px;
    height: 20px;
  }
  hr{
    margin:0;
  }
  /* 검색바 스타일 */
  .search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  
  .search-text {
      font-size: 18px;
      color: #333;
  }
  
  input[type="text"] {
      border:none;
      border-bottom: 2px solid #ddd;
      border-radius: 0;
      box-shadow: none;
      padding: 8px;
      margin-left: 10px;
      width: 280px;
      font-size: 16px;
  }

  input[type="text"]:focus {
    border-bottom-color: #8bd0fc;
    outline: none;
    box-shadow: none;
    }
  
  /* 레시피 리스트 스타일 */
  .recipe-list {
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  
  .recipe-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 600px;
    padding: 15px 0px;
    background-color: #ffffff;
    border-bottom: 1px solid #ddd; /* 하단 테두리만 추가 */
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .recipe-item:hover {
    background-color: #f8f8f8;
  }
  
  
  .favorite-icon {
    background: none;
    border: none;
    margin-right: 7px;
  }
 
  .favorite-img{
    width: 20px;
    height: 20px;
  }

  .recipe-info {
    flex-grow: 1;
    margin-right: 10px;
  }
  
  .recipe-name {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  
  .category, .ingredients {
    font-size: 14px;
    color: #666;
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
  