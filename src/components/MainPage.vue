<template>
  <div class="main-page">
    <div class="row">
      <div class="col-1">
        <img src="@/assets/refrigerator.png" class="fridge-ico">
      </div>
      <div class="col-8">
        <h1 class="title">나의 냉장고</h1>
      </div>
      <div class="col">
        <button class="add-button" @click="showAddIngredientPopup">
          <img src="@/assets/plus-small.png" class="add-ico">
        </button>
        <button class="remove-button" @click="toggleDeleteMode">
          <img src="@/assets/cross-small.png" class="remove-ico">
        </button>
      </div>
    </div>
    <!-- 식재료 섹션 -->
    <div class="section-container">
      <!-- 냉장 섹션 -->
      <div class="section fridge-section">
        <h2 class="section-title">냉장</h2>
        <div class="ingredient-icons">
          <div v-for="u_ingredient in fridgeIngredients" 
               :key="u_ingredient.u_ingredientId" 
               class="ingredient-icon"
               @click="handleIngredientClick(u_ingredient)">
            <div class="circular-icon">
              <img :src="getIconPath(u_ingredient.u_ingredientIconPath)"
                   :style="getBorderStyle(u_ingredient)" />
              <input v-if="isDeleteMode" 
                type="checkbox"
                @click="toggleIngredientSelection(u_ingredient)" 
                :checked="deleteIngredients.includes(u_ingredient)">
            </div>
            <div class="ingredient-name">{{ u_ingredient.u_ingredientName }}</div>
          </div>
        </div>
      </div>
      <!-- 냉동 섹션 -->
      <div class="section freezer-section">
        <h2 class="section-title">냉동</h2>
        <div class="ingredient-icons">
          <div v-for="u_ingredient in freezerIngredients" 
               :key="u_ingredient.u_ingredientId" 
               class="ingredient-icon"
               @click="handleIngredientClick(u_ingredient)">
            <div class="circular-icon">
              <img :src="getIconPath(u_ingredient.u_ingredientIconPath)"
                   :style="getBorderStyle(u_ingredient)" />
              <input v-if="isDeleteMode" 
                type="checkbox"
                @click="toggleIngredientSelection(u_ingredient)" 
                :checked="deleteIngredients.includes(u_ingredient)">
            </div>
            <div class="ingredient-name">{{ u_ingredient.u_ingredientName }}</div>
          </div>
        </div>
      </div>
      <!-- 실온 섹션 -->
      <div class="section room-temp-section">
        <h2 class="section-title">실온</h2>
        <div class="ingredient-icons">
          <div v-for="u_ingredient in roomIngredients" 
               :key="u_ingredient.u_ingredientId" 
               class="ingredient-icon"
               @click="handleIngredientClick(u_ingredient)">
            <div class="circular-icon">
              <img :src="getIconPath(u_ingredient.u_ingredientIconPath)"
                   :style="getBorderStyle(u_ingredient)" />
              <input v-if="isDeleteMode" 
                type="checkbox"
                @click="toggleIngredientSelection(u_ingredient)" 
                :checked="deleteIngredients.includes(u_ingredient)">
            </div>
            <div class="ingredient-name">{{ u_ingredient.u_ingredientName }}</div>
          </div>
        </div>
      </div>
    </div>
    <button class="delete-button" v-if="isDeleteMode" @click="deleteSelectedIngredients">삭제하기</button>
    <!-- 재료 추가 팝업 -->
    <div v-if="showAddPopup" class="popup-container">
      <div class="popup">
        <h2 class="center">식재료 추가</h2>
        <!-- 입력 폼 -->
        <form @submit.prevent="addIngredient">
          <!-- 재료명 입력 -->
          <div class="input-group">
            <!-- 재료 아이콘 클릭하면 이미지 선택 팝업이 열립니다 -->
            <img :src="newIngredient.u_ingredientIconPath" @click="showImageSelection = true" class="ingredient-image" />
            <input id="u_ingredient" type="text" @input="autoSelectImage" v-model="newIngredient.u_ingredientName" placeholder="재료명">
          </div>
          <!-- 이미지 선택 팝업 -->
          <div v-if="showImageSelection" class="image-selection-popup">
            <h3>이미지를 선택하세요</h3>
            <div class="image-grid">
              <img v-for="(image, index) in availableImages" :key="index" :src="image.path" @click="selectImage(image)" class="grid-image" />
            </div>
          </div>
          <!-- 팝업이 열려있을 때 어두운 배경 -->
          <div v-if="showImageSelection" class="overlay" @click="toggleImageSelection"></div>
          <!-- 구매날짜와 유통기한 드롭다운 -->
          <div class="input-group">
            <select v-model="newIngredient.u_ingredientDateType" @change="updateDateBasedOnType">
              <option value="true">유통기한</option>
              <option value="false">구매날짜</option>
            </select>
            <input type="date" v-model="newIngredient.u_ingredientDate">
          </div>
          <!-- 수량 입력 -->
          <div class="input-group">
            <input id="u_ingredientAmount" type="number" v-model="newIngredient.u_ingredientAmount" placeholder="수량" min="1">
            <!-- 단위 선택 드롭다운 -->
            <select v-model="newIngredient.u_ingredientUnit">
              <option value="개">개</option>
              <option value="ml">ml</option>
              <option value="g">g</option>
            </select>
          </div>
          <!-- 보관방법 라디오 버튼 -->
          <div class="input-group radio-group">
            <label>보관방법 :</label>
            <label><input type="radio" v-model="newIngredient.u_ingredientStorage" value="냉장">냉장</label>
            <label><input type="radio" v-model="newIngredient.u_ingredientStorage" value="냉동">냉동</label>
            <label><input type="radio" v-model="newIngredient.u_ingredientStorage" value="실온">실온</label>
          </div>
          <!-- 취소 및 추가 버튼 -->
          <div class="button-group">
            <button @click="closePopup">취소</button>
            <button type="submit">추가</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 등록된 재료를 편집하기 위한 팝업 -->
    <div v-if="showEditPopup" class="popup-container">
      <div class="popup">
        <h2 class="center">식재료 수정</h2>
        <!-- 입력 폼 -->
        <form @submit.prevent="editIngredient">
          <!-- 재료명 입력 -->
          <div class="input-group">
            <!-- 재료 아이콘 -->
            <img :src="newIngredient.u_ingredientIconPath" 
            @click="showImageSelection = true" class="ingredient-image" />
            <input id="u_ingredient" type="text" @input="autoSelectImage" v-model="newIngredient.u_ingredientName" placeholder="재료명">
          </div>
          <!-- 이미지 선택 팝업 -->
        <div v-if="showImageSelection" class="image-selection-popup">
          <h3>이미지를 선택하세요</h3>
          <div class="image-grid">
              <img v-for="(image, index) in availableImages" :key="index" :src="image.path" @click="selectImage(image)" class="grid-image" />
          </div>
        </div>
        <!-- 팝업이 열려있을 때 어두운 배경 -->
        <div v-if="showImageSelection" class="overlay" @click="toggleImageSelection"></div>
          <!-- 구매날짜와 유통기한 드롭다운 -->
          <div class="input-group">
            <select v-model="newIngredient.u_ingredientDateType">
              <option value="true">유통기한</option>
              <option value="false">구매날짜</option>
            </select>
            <input type="date" v-model="newIngredient.u_ingredientDate">
          </div>
          <!-- 수량 입력 -->
          <div class="input-group">
            <input id="u_ingredientAmount" type="number" v-model="newIngredient.u_ingredientAmount" placeholder="수량" min="1">
            <!-- 단위 선택 드롭다운 -->
            <select v-model="newIngredient.u_ingredientUnit">
              <option value="개">개</option>
              <option value="ml">ml</option>
              <option value="g">g</option>
            </select>
          </div>
          <!-- 보관방법 라디오 버튼 -->
          <div class="input-group radio-group">
            <label>보관방법 :</label>
            <label><input type="radio" v-model="newIngredient.u_ingredientStorage" value="냉장">냉장</label>
            <label><input type="radio" v-model="newIngredient.u_ingredientStorage" value="냉동">냉동</label>
            <label><input type="radio" v-model="newIngredient.u_ingredientStorage" value="실온">실온</label>
          </div>
          <!-- 추천 레시피 섹션 추가 -->
          <div class="recommended-recipes">
            <h3>추천 레시피</h3>
            <div class="recipe-list">
              <div v-for="recipe in recommendedRecipes" :key="recipe.name" class="recipe-item" @click="showRecommendedRecipePopup(recipe)">
                <!-- 이미지가 들어갈 원 -->
                <div class="recipe-circle">
                  <!-- 원형 이미지 자리 -->
                </div>
                <!-- 레시피 정보 -->
                <div class="recipe-info">
                  <p class="recipe-name">{{ recipe.recipe_name }}</p>
                  <p class="recipe-category">카테고리: {{ recipe.recipe_category }}</p>
                  <!--<p class="recipe-description">설명: {{ recipe.recipe_description }}</p>!-->
                </div>
              </div>
            </div>
          </div>
          <!-- 취소 및 수정 버튼 -->
          <div class="button-group">
            <button @click="closePopup">취소</button>
            <button @click="deleteIngredient">삭제</button>
            <button type="submit">수정</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 추천 레시피 선택시 레시피 확인 팝업 -->
    <div v-if="showRecipePopup" class="recommended-recipe-popup">
      <div class="top-section">
        <div class="recipe-title">{{ selectedRecommendedRecipe.recipe_name }}
          <button class="close-button" @click="closePopup" >
            <img src="@/assets/cross-small.png" class="remove-ico">
          </button>
        </div>
      </div>
      <div class="bottom-section">
        <div class="info-card">
          <div class="category">
            {{ selectedRecommendedRecipe.recipe_category }}
            <span class="subtext">카테고리</span>
          </div>
          <div class="difficulty">
            {{ selectedRecommendedRecipe.recipe_difficulty }}
            <span class="subtext">난이도</span>
          </div>
        </div>
        <p>필요 재료</p>
        <div class="ingredients-section">
          <div class="ingredient-item" v-for="(ingredient, index) in ingredientList" :key="index">
            <div class="ingredient-circle">{{ ingredient.name }}</div>
            <div class="ingredient-amount">{{ ingredient.amount }}</div>
          </div>
        </div>
        <hr/>
        <div class="methods-section">
          <p>조리과정</p>
          <ol class="recipe-methods">
            <li v-for="(recipeMethod, index) in selectedRecommendedRecipe.recipe_text" :key="index">
              {{ recipeMethod }}
            </li>
          </ol>   
        </div>
      </div>
    </div>
    <!-- 네비게이션 바 -->
    <nav class="nav-bar">
      <a href="/main" class="nav-link" :class="{ 'active': $route.path === '/main/ingredients' || $route.path === '/main' }">식재료</a>
      <router-link to="/main/recipes" class="nav-link" exact :class="{ 'active': $route.path === '/main/recipes' }">레시피</router-link>
      <router-link to="/main/profile" class="nav-link" exact :class="{ 'active': $route.path === '/main/profile' }">내 정보</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { ingredientImages } from '../../public/zaryo_icon/ingredientImages';
import io from 'socket.io-client'; // socket.io-client 가져오기

export default {
  name: 'MainPage',
  data() {
    return {
      showAddPopup: false,
      showEditPopup: false,
      showRecipePopup: false,
      selectedIngredient: null,
      selectedRecommendedRecipe: null,
      newIngredient: {
        u_ingredientName: '',
        u_ingredientDateType: 'true',  // 기본값: 유통기한
        u_ingredientDate: '',
        u_ingredientAmount: 1,
        u_ingredientUnit: '개',
        u_ingredientStorage: '냉장',
        u_ingredientId: null,
        u_ingredientIconPath: '' // 선택된 이미지 경로 추가
      },
      fridgeIngredients: [],
      freezerIngredients: [],
      roomIngredients: [],
      showImageSelection: false, // 이미지 선택 팝업 상태
      selectedImage: '/zaryo_icon/default.png', // 기본 이미지 경로
      availableImages: ingredientImages || [],
      isDeleteMode: false,  // 삭제 모드 상태
      deleteIngredients: [],  // 선택된 식재료 저장
      socket: null, // 소켓 변수 추가
    };
  },
  computed: {
    ingredientList() {
      return Object.entries(this.selectedRecommendedRecipe.recipe_ingredient).map(([name, amount]) => {
        return {
          name,
          amount
        };
      });
    }
  },
  mounted() {
    // 컴포넌트가 마운트되면 소켓 연결
    this.socket = io('http://117.16.153.63:5000/recommendation');
  },
  methods: {
    getIconPath(iconPath) {
      return iconPath.startsWith('/zaryo_icon/')
        ? iconPath
        : `/zaryo_icon/${iconPath}`;
    },
    getAllIngredients() {
    // 모든 섹션에서 재료명을 가져와 배열로 반환
      return [
        ...this.fridgeIngredients.map(i => i.u_ingredientName), 
        ...this.freezerIngredients.map(i => i.u_ingredientName), 
        ...this.roomIngredients.map(i => i.u_ingredientName)
      ];
    },
    showAddIngredientPopup() {
      this.isDeleteMode = false;
      const today = new Date();
      const expirationDate = new Date();
      expirationDate.setDate(today.getDate() + 7); // 7일 후 날짜 계산

      this.showAddPopup = true;
      this.showEditPopup = false;
      this.newIngredient = {
        u_ingredientName: '',
        u_ingredientDateType: 'true',  // 기본값: 유통기한 선택
        u_ingredientDate: expirationDate.toISOString().split('T')[0],  // 기본값: 7일 후 유통기한
        u_ingredientAmount: 1,
        u_ingredientUnit: '개',
        u_ingredientStorage: '냉장',
        u_ingredientIconPath: this.selectedImage // 기본 이미지로 초기화
      };
    },
    // 이미지 선택 토글 함수
    toggleImageSelection() {
      this.showImageSelection = !this.showImageSelection;
    },
    // 이미지 자동 선택 함수
    autoSelectImage() {
      if (this.newIngredient.u_ingredientName) {
        const matchingImage = ingredientImages.find(image => image.name === this.newIngredient.u_ingredientName);
        if (matchingImage) {
            this.newIngredient.u_ingredientIconPath = matchingImage.path; // 일치하는 이미지의 경로를 설정
        }
      }
    },
    // 이미지 선택 함수
    selectImage(image) {
      this.newIngredient.u_ingredientIconPath = image.path;
      if (!this.newIngredient.u_ingredientName) {
        this.newIngredient.u_ingredientName = image.name;
      }
      this.showImageSelection = false; // 이미지 선택 후 팝업 닫기
    },
    // 드롭다운에서 날짜 유형을 변경할 때 호출되는 함수
    updateDateBasedOnType() {
      const today = new Date();
      const expirationDate = new Date();
      expirationDate.setDate(today.getDate() + 7); // 7일 후 날짜 계산

      // 선택한 날짜 타입에 맞게 u_ingredientDate 값 업데이트
      if (this.newIngredient.u_ingredientDateType === 'true') {
        // 유통기한이면 7일 후 날짜
        this.newIngredient.u_ingredientDate = expirationDate.toISOString().split('T')[0];
      } else {
        // 구매날짜면 오늘 날짜
        this.newIngredient.u_ingredientDate = today.toISOString().split('T')[0];
      }
    },

    showEditIngredientPopup(u_ingredient) {
      if (!this.isDeleteMode) {
        u_ingredient.u_ingredientIconPath = this.getIconPath(u_ingredient.u_ingredientIconPath);
        this.showEditPopup = true;
        this.showAddPopup = false;
        this.selectedIngredient = u_ingredient;
        this.newIngredient = { ...u_ingredient };
      }
    },

    showRecommendedRecipePopup(recipe) { 
      this.showRecipePopup = true;
      this.selectedRecommendedRecipe = recipe;
    },

    closePopup() {
      this.showAddPopup = false;
      if (this.showRecipePopup) {
        this.showRecipePopup = false;
      } else {
        this.showEditPopup = false;
        this.showRecipePopup = false;
      }
    },

    addIngredient() {
      this.newIngredient.u_ingredientId = Date.now();

      switch (this.newIngredient.u_ingredientStorage) {
        case '냉장':
          this.fridgeIngredients.push({ ...this.newIngredient });
          break;
        case '냉동':
          this.freezerIngredients.push({ ...this.newIngredient });
          break;
        case '실온':
          this.roomIngredients.push({ ...this.newIngredient });
          break;
        default:
          break;
      }

      this.sortAllSections();
      this.closePopup();
    },
    
    editIngredient() {
      const id = this.selectedIngredient.u_ingredientId;
      
      this.removeIngredient(id, this.selectedIngredient.u_ingredientStorage);

      const updatedIngredient = {
        ...this.newIngredient,
        u_ingredientId: id
      };

      // 새 보관 방법에 따라 섹션에 추가
      switch (this.newIngredient.u_ingredientStorage) {
        case '냉장':
          this.fridgeIngredients.push(updatedIngredient);
          break;
        case '냉동':
          this.freezerIngredients.push(updatedIngredient);
          break;
        case '실온':
          this.roomIngredients.push(updatedIngredient);
          break;
        default:
          break;
      }

      this.sortAllSections();
      this.closePopup();
    },
    
    removeIngredient(id, u_ingredientStorage) {
      let section = null;
      switch (u_ingredientStorage) {
        case '냉장':
          section = this.fridgeIngredients;
          break;
        case '냉동':
          section = this.freezerIngredients;
          break;
        case '실온':
          section = this.roomIngredients;
          break;
        default:
          console.error('Invalid u_ingredientStorage:', u_ingredientStorage);
          return;
      }

      const filtered = section.filter(u_ingredient => u_ingredient.u_ingredientId !== id);
      switch (u_ingredientStorage) {
        case '냉장':
          this.fridgeIngredients = filtered;
          break;
        case '냉동':
          this.freezerIngredients = filtered;
          break;
        case '실온':
          this.roomIngredients = filtered;
          break;
        default:
          console.error('Invalid u_ingredientStorage:', u_ingredientStorage);
          return;
      }

      this.sortAllSections();
    },
    
    deleteIngredient() {
      const index = this.fridgeIngredients.indexOf(this.selectedIngredient);
      if (index > -1) {
        this.fridgeIngredients.splice(index, 1);
      }
      this.closePopup(); // 팝업 닫기
    },

    sortIngredients(ingredients) {
      return ingredients.sort((a, b) => {
        const dateA = new Date(a.u_ingredientDate);
        const dateB = new Date(b.u_ingredientDate);

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        return 0;
      });
    },
    
    sortAllSections() {
      this.fridgeIngredients = this.sortIngredients(this.fridgeIngredients);
      this.freezerIngredients = this.sortIngredients(this.freezerIngredients);
      this.roomIngredients = this.sortIngredients(this.roomIngredients);
    },
    
    getDaysLeft(u_ingredient) {
      const expirationDate = new Date(u_ingredient.u_ingredientDate);
      const today = new Date();
      const timeDiff = expirationDate - today;
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // 남은 일 수 계산
    },
    
    getBorderStyle(u_ingredient) {
      const daysLeft = this.getDaysLeft(u_ingredient);
      if (u_ingredient.u_ingredientDateType === 'false') {
        // 구매일자인 경우
        return { borderColor: '#32CD32' }; // 라임그린색
      } else {
        // 유통기한인 경우
        if (daysLeft < 0) {
          return { borderColor: 'black', filter: 'grayscale(100%)' }; // 유통기한이 지난 경우
        } else if (daysLeft < 3) {
          return { borderColor: 'red' }; // 유통기한이 임박한 경우
        } else if (daysLeft < 7) {
          return { borderColor: '#ffdb0e' }; // 유통기한이 7일 이내인 경우
        }
        return { borderColor: '#42a5f5' }; // 기본 색상
      }
    },
    // 삭제 모드 활성화/비활성화
    toggleDeleteMode() {
      this.isDeleteMode = !this.isDeleteMode;
      if (!this.isDeleteMode) this.deleteIngredients = [];  // 삭제 모드 종료 시 선택 초기화
    },
    // 식재료 선택/해제
    toggleIngredientSelection(u_ingredient) {
      const index = this.deleteIngredients.indexOf(u_ingredient);
      if (index > -1) {
        // 이미 선택된 경우 제거
        this.deleteIngredients.splice(index, 1);
      } else {
        // 선택되지 않은 경우 추가
        this.deleteIngredients.push(u_ingredient);
      }
    },
    // 선택된 식재료 삭제
    deleteSelectedIngredients() {
      this.fridgeIngredients = this.fridgeIngredients.filter(
        ingredient => !this.deleteIngredients.includes(ingredient)
      );
      this.freezerIngredients = this.freezerIngredients.filter(
        ingredient => !this.deleteIngredients.includes(ingredient)
      );
      this.roomIngredients = this.roomIngredients.filter(
        ingredient => !this.deleteIngredients.includes(ingredient)
      );

      // 삭제 후 선택된 식재료 목록 초기화
      this.deleteIngredients = [];
      this.isDeleteMode = false; // 삭제 모드 종료
    },
    // 재료 클릭 시 처리하는 메서드
    async handleIngredientClick(u_ingredient) {
      // 서버에 ingredient 데이터 전송
      this.socket.emit('send_ingredient', { ingredient: u_ingredient.u_ingredientName });

      // 추천 레시피 요청
      await this.fetchRecommendedRecipes(u_ingredient);
      //this.showEditIngredientPopup(u_ingredient);
    },

    // 추천 레시피 요청
    async fetchRecommendedRecipes(u_ingredient) {
      // 냉장고에 있는 모든 재료를 가져오는 함수
      const ingredients = this.getAllIngredients(); 

      fetch("http://117.16.153.63:5000/recommendation", { // 레시피 추천 엔드포인트
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredient : ingredients }) // 요청 본문에 재료 포함
      })
      .then(response => {
        if (response.ok) {
          return fetch("http://117.16.153.63:5000/recommendation");//response.json(); // JSON 형태로 응답 변환
        } else {
          throw new Error("레시피 요청 실패");
        }
      })
      .then(response => response.json())
      .then(data => {
        this.displayRecommendedRecipes(data, u_ingredient); // 추천 레시피를 화면에 표시하는 함수
        data = data["message"]
        console.log("서버로부터 받은 레시피:", data); // 서버로부터 받은 레시피 로그
      })
      .catch(error => {
        console.error("Error:", error); // 에러 콘솔에 출력
        this.recommendedRecipes = []; // 추천 레시피 초기화
      });
    },

    displayRecommendedRecipes(recipes, u_ingredient) {
      recipes = recipes["message"]
      this.recommendedRecipes = recipes; // 추천 레시피를 Vue 데이터에 저장
      console.log("저장된 레시피:", recipes); // 저장된 레시피를 로그에 출력
      this.showEditIngredientPopup(u_ingredient);
    },
  }
};
</script>

<style scoped>
/* 메인 페이지 스타일 */
.main-page {
    position: relative;
    background-color: #ffffff;
    height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
    box-sizing: border-box;
}

/* 타이틀 스타일 */
.row{
  padding: 5px;
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
.fridge-ico{
  width:28px;
  height:28px;
}

/* 버튼 스타일 */
.add-button{
  cursor: pointer;
  width: 32px;
  height: 32px;
  border: none;
  background-color: #ffffff00;
}

.remove-button{
  cursor: pointer;
  width: 32px;
  height: 32px;
  border: none;
  background-color: #ffffff00;
}

.delete-button {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: #ff4d4f;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.add-ico{
  width: 29px;
  height: 29px;
}

.remove-ico{
  width: 25px;
  height: 25px;
}

/* 팝업 스타일 */
.popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    width: 360px;
    max-width: 90%;
    animation: fadeIn 0.3s ease-in-out;
    border: 2px solid #bbdefb;
}

.popup h2 {
    margin-bottom: 25px;
    text-align: center;
    color: #42a5f5;
    font-weight: 700;
    font-size: 24px;
}

/* 보관방법 라디오 버튼 스타일 */
.popup .radio-group {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.popup .radio-group label {
    display: flex;
    align-items: center;
    font-size: 16px;
    position: relative;
    cursor: pointer;

}
.popup .radio-group input[type="radio"] {
    margin-right: 5px; /* 라디오 버튼과 텍스트 사이의 간격 */
}

/* 인풋 그룹 */
.popup .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.popup .input-group label {
    flex: 1;
    font-size: 16px;
    color: #333;

}

.popup .input-group input[type="text"],
.popup .input-group input[type="date"],
.popup .input-group input[type="number"],
.popup .input-group select {
    flex: 2;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #dfe6e9;
    font-size: 14px;
    transition: all 0.3s ease;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
}

.popup .input-group input:focus,
.popup .input-group select:focus {
    border-color: #42a5f5;
    box-shadow: 0 0 10px rgba(66, 165, 245, 0.2);
}

/* 재료명과 이미지 같은 줄에 위치 */
.popup .input-group img {
    width: 40px;
    height: 40px;
    border-radius: 20px;

}

.popup .input-group-inline {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.popup .input-group-inline select,
.popup .input-group-inline input[type="date"] {
    width: 48%;
}


/* 버튼 그룹 */
.popup .button-group {
    display: flex;
    justify-content: space-between;
}

.popup .button-group button {
    width: 48%;
    padding: 10px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.popup .button-group .cancel-button {
    background-color: #616161;
}

.popup .button-group .submit-button {
    background-color: #42a5f5;
}

.popup .button-group button:hover {
    opacity: 0.9;
}

.button-group button {
    margin: 0 10px; /* 버튼 사이의 여백 */
    padding: 8px 20px; /* 버튼 패딩 */
    border: none; /* 테두리 제거 */
    border-radius: 5px; /* 모서리 둥글게 */
    background-color: #42a5f5; /* 기본 버튼 배경색 */
    color: #fff; /* 버튼 텍스트 흰색 */
    cursor: pointer; /* 마우스 커서를 포인터로 변경 */
    transition: background-color 0.3s ease, box-shadow 0.3s ease; /* 부드러운 전환 효과 */
}

/* 버튼에 마우스오버 효과 */
.button-group button:hover {
    background-color: #1e88e5; /* 호버 시 더 진한 파란색 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 호버 시 약간의 그림자 추가 */
}

/* 비활성화된 버튼 (disabled) 스타일 */
.button-group button:disabled {
    background-color: #cfd8dc; /* 비활성화 상태의 버튼 배경색 */
    color: #90a4ae; /* 비활성화 상태의 텍스트 색상 */
    cursor: not-allowed; /* 클릭 불가능하게 커서 변경 */
    box-shadow: none; /* 비활성화 시 그림자 없음 */
}

/* 네비게이션 바 */
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

/* 재료 섹션 */
.section-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 15px;
    padding-bottom: 60px;
    box-sizing: border-box; 
}

.section {
    flex: 1; /* 각 섹션이 동일한 크기를 차지하도록 설정 */
    margin-bottom: 10px;
    border: 2px solid #f5f5f5;
    border-radius: 8px;
    padding: 15px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
}

.section-title {
    font-size: 20px;
    font-weight: bold;
    color: #1e88e5;
    margin-bottom: 10px;
}

.ingredient-icons {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start; /* 수직 가운데 정렬 */
}

.ingredient-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px 10px 0;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.ingredient-icon:hover {
    transform: translateY(-5px);
}

.ingredient-icon img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid;
    padding: 5px;
}

.circular-icon {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 팝업 이미지 선택 */
.image-selection-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 200;
    width: 300px;
    max-height: 400px;
    overflow-y: auto;
    text-align: center;
}

.image-selection-popup h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #42a5f5;
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.grid-image {
    width: 50px;
    height: 50px;
    cursor: pointer;
    border: 2px solid #ddd;
    border-radius: 10px;
    transition: border-color 0.3s ease;
}

.grid-image:hover {
    border-color: #42a5f5;
}

/* 팝업 배경 오버레이 */
.overlay {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
}

.recommended-recipes {
  margin-top: 15px;
  overflow: hidden; /* 팝업 밖으로 넘치지 않도록 설정 */
  text-align: left; /* 전체 추천 레시피 영역을 왼쪽 정렬 */
}

.recommended-recipes h3 {
  color: #666;
  text-align: center;
  font-size: 18px;
  margin-bottom: 10px;
}

.recipe-circle {
margin-top: 15px;
}

.recipe-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  text-align: left; /* 전체 추천 레시피 영역을 왼쪽 정렬 */
}

.recipe-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.recipe-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f0f4ff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.recipe-details {
  display: flex;
  flex-direction: column;
}

.recipe-name {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.recipe-category {
  font-size: 12px;
  color: #777;
  margin: 0;
}

.recipe-circle:hover {
  transform: scale(1.1);
}

.recipe-placeholder {
  font-size: 24px;
  margin-bottom: 5px;
}

.recommended-recipe-popup {
    position: fixed;
    top: 0; /* 네비게이션 바 위로 팝업을 가득 채움 */
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    text-align: center;
    margin-bottom: 20px;
}

.recommended-recipe-name {
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.close-button {
  position: absolute;
  cursor: pointer;
  width: 50px;
  height: 50px;
  top: 0;
  right: 0;
  border: none;
  background-color: #ffffff00;
}

.top-section {
  padding: 20px;
  background-color: #9cd6fa; /* 하늘색 배경 */
  height: 120px;
  text-align: center;
}

.recipe-title {
  width: 100%;  
  color: #1f1e22;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 1px;
  padding-left: 5px;
}

p {
  color: #1f1e22;
  font-weight: 800;
  font-size: 18px;
  margin: 10px 0;
}

.bottom-section {
  background-color: #ffffff;
  margin-top: -10px; /* info-card 중간부터 흰색 배경이 시작되도록 */
  padding: 20px;
  position: relative;
  z-index: 0;
}

.info-card {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  align-items: flex-end;
  margin-top: -60px;
  margin-bottom: 20px;
}

.category, .difficulty {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}

.subtext {
  display: block;
  font-size: 12px;
  color: #666;
}

/* 재료 리스트 */
.ingredients-section {
  display: flex;
  justify-content: space-evenly;
}

.ingredient-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ingredient-circle {
  width: 60px;
  height: 60px;
  background-color: #fce76c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
  text-align: center;
  color: #1f1e22;
  margin-bottom: 5px;
}

.ingredient-amount {
  font-size: 12px;
  color: #1f1e22;
  font-weight: 600;
}

/* 조리 과정 */
.methods-section {
  margin-top: 20px;
  text-align: left;
}

.recipe-methods {
  padding-left: 35px;
}

.recipe-methods li {
  margin-bottom: 10px;
  font-size: 16px;
}

input[type="checkbox"] {
  accent-color: red;
  margin-top: -30px;
}

/* 애니메이션 추가 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>