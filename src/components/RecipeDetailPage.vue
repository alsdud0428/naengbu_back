<template>
  <div class="recipe-detail-page">
    <div class="top-section">
      <div class="header">
        <div class="row">
          <div class="col-1">
            <router-link to="/main/recipes" class="home-link">
              <img src="@/assets/left.png" alt="Home" class="back-ico">
            </router-link>
          </div>
          <div class="col">
            <div class="recipe-title">{{ recipe.recipeName }}</div>
          </div>
          <div class="col-1"></div>
        </div>
      </div>

      <div class="image-section">
        <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
      </div>
    </div>

    <div class="bottom-section">
      <div class="info-card">
        <div class="category">
          {{ recipe.recipeState }}
          <span class="subtext">카테고리</span>
        </div>
        <div class="difficulty">
          {{ recipe.progress }}%
          <span class="subtext">난이도</span>
        </div>
      </div>
    
      <p>필요 재료</p>
      <div class="ingredients-section">
        <div class="ingredient-item" v-for="(r_ingredient, index) in recipe.r_ingredients" :key="index">
          <div class="ingredient-circle">{{ r_ingredient.r_ingredientName }}</div>
          <div class="ingredient-amount">{{ r_ingredient.r_ingredientAmount }}</div>
        </div>
      </div>
      <hr/>
      <div class="methods-section">
        <p>조리과정</p>
        <ol class="recipe-methods">
          <li v-for="(recipeMethod, index) in recipe.recipeMethods" :key="index">
            {{ recipeMethod }}
          </li>
        </ol>   
      </div>
    </div>
  </div>      
</template>

<script>
export default {
  name: 'RecipeDetailPage',
  data() {
    return {
      recipe: {}
    };
  },
  created() {
    const recipeId = parseInt(this.$route.params.id);
    const recipes = [
      { recipeId: 1, recipeName: '토마토 파스타', progress: 75, recipeState: '양식', favorite: true, 
      image: 'https://recipe1.ezmember.co.kr/cache/recipe/2017/02/27/59ccdce3c03388a25dfd16e8f44e44491.jpg',
      r_ingredients: [
        { r_ingredientName: '파스타면', r_ingredientAmount: '200g' },
        { r_ingredientName: '토마토', r_ingredientAmount: '2개' },
        { r_ingredientName: '올리브 오일', r_ingredientAmount: '2큰술' },
        { r_ingredientName: '마늘', r_ingredientAmount: '3쪽' },
        { r_ingredientName: '양파', r_ingredientAmount: '1개' },
        { r_ingredientName: '소금', r_ingredientAmount: '적당량' },
        { r_ingredientName: '후추', r_ingredientAmount: '적당량' }
      ],
      recipeMethods: [
        '파스타면을 삶는다.',
        '토마토와 양파를 썬다.',
        '올리브 오일을 두른 팬에 마늘을 볶는다.',
        '토마토와 양파를 팬에 넣고 볶는다.',
        '삶은 파스타면을 넣고 섞는다.',
        '소금과 후추로 간을 맞춘다.'
      ] },
      { recipeId: 2, recipeName: '그린 샐러드', progress: 100, recipeState: '샐러드', favorite: false, 
      image: 'https://oasisprodproduct.edge.naverncp.com/12037/thumb/999',
      r_ingredients: [
        { r_ingredientName: '양상추', r_ingredientAmount: '1개' },
        { r_ingredientName: '토마토', r_ingredientAmount: '1개' },
        { r_ingredientName: '오이', r_ingredientAmount: '1개' },
        { r_ingredientName: '당근', r_ingredientAmount: '1개' },
        { r_ingredientName: '올리브 오일', r_ingredientAmount: '3큰술' },
        { r_ingredientName: '식초', r_ingredientAmount: '1큰술' },
        { r_ingredientName: '소금', r_ingredientAmount: '적당량' },
        { r_ingredientName: '후추', r_ingredientAmount: '적당량' }
      ],
      recipeMethods: [
        '양상추, 토마토, 오이, 당근을 썬다.',
        '올리브 오일, 식초, 소금, 후추를 섞어 드레싱을 만든다.',
        '야채와 드레싱을 버무린다.'
      ] },
      { recipeId: 3, recipeName: '딸기 스무디', progress: 50, recipeState: '음료', favorite: false, 
      image: 'https://img.danawa.com/prod_img/500000/253/935/img/7935253_1.jpg?_v=20190516105715',
      r_ingredients: [
        { r_ingredientName: '딸기', r_ingredientAmount: '10개' },
        { r_ingredientName: '바나나', r_ingredientAmount: '1개' },
        { r_ingredientName: '요거트', r_ingredientAmount: '100ml' },
        { r_ingredientName: '우유', r_ingredientAmount: '200ml' },
        { r_ingredientName: '꿀', r_ingredientAmount: '1큰술' }
      ],
      recipeMethods: [
        '딸기와 바나나를 썬다.',
        '모든 재료를 블렌더에 넣고 갈아준다.'
      ] },
      { recipeId: 4, recipeName: '초코 케이크', progress: 80, recipeState: '디저트', favorite: false, 
      image: 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTHtQ-eXsljBaNo7G4AjmJe01i82aVyxRn0mO0C4SFj0ZS7sqMY_v8GW6b-vsMDwbz1',
      r_ingredients: [
        { r_ingredientName: '밀가루', r_ingredientAmount: '200g' },
        { r_ingredientName: '설탕', r_ingredientAmount: '150g' },
        { r_ingredientName: '코코아 가루', r_ingredientAmount: '50g' },
        { r_ingredientName: '버터', r_ingredientAmount: '100g' },
        { r_ingredientName: '계란', r_ingredientAmount: '3개' }
      ],
      recipeMethods: [
        '오븐을 180도로 예열한다.',
        '버터와 설탕을 섞어 크림 상태로 만든다.',
        '계란을 하나씩 넣고 잘 섞는다.',
        '밀가루와 코코아 가루를 체에 쳐서 넣고 섞는다.',
        '팬에 부어서 30-35분 구워준다.',
        '식힌 후에 장식하고 서빙한다.'
      ] },
      { recipeId: 5, recipeName: '닭볶음탕', progress: 60, recipeState: '한식', favorite: true, 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxdRHiaPHR8CAmrSNIqKNBZpOyRcfN54pAjA&s',
      r_ingredients: [
        { r_ingredientName: '닭고기', r_ingredientAmount: '300g' },
        { r_ingredientName: '감자', r_ingredientAmount: '1개' },
        { r_ingredientName: '당근', r_ingredientAmount: '1개' },
        { r_ingredientName: '양파', r_ingredientAmount: '1개' },
        { r_ingredientName: '대파', r_ingredientAmount: '1대' },
        { r_ingredientName: '고추장', r_ingredientAmount: '2큰술' },
        { r_ingredientName: '간장', r_ingredientAmount: '2큰술' },
        { r_ingredientName: '소금', r_ingredientAmount: '적당량' },
        { r_ingredientName: '후추', r_ingredientAmount: '적당량' }
      ],
      recipeMethods: [
        '닭고기를 적당한 크기로 자른다.',
        '냄비에 기름을 두르고 닭고기를 볶는다.',
        '양파, 당근, 감자를 썰어 넣고 함께 볶는다.',
        '고추장과 간장을 넣고 잘 섞는다.',
        '물과 대파를 넣고 끓인다.',
        '소금과 후추로 간을 맞춘다.',
        '재료가 익을 때까지 끓인다.'
      ] },
      { recipeId: 6, recipeName: '버섯 리조또', progress: 90, recipeState: '양식', favorite: false, 
      image: 'https://recipe1.ezmember.co.kr/cache/recipe/2017/10/21/cf7848705276248708e7c6e52df55ae71.jpg',
      r_ingredients: [
        { r_ingredientName: '리조또 쌀', r_ingredientAmount: '200g' },
        { r_ingredientName: '버섯', r_ingredientAmount: '150g' },
        { r_ingredientName: '파마산 치즈', r_ingredientAmount: '50g' },
        { r_ingredientName: '양파', r_ingredientAmount: '1개' },
        { r_ingredientName: '육수', r_ingredientAmount: '500ml' }
      ],
      recipeMethods: [
        '양파와 버섯을 썰어 준비한다.',
        '냄비에 기름을 두르고 양파를 볶는다.',
        '양파가 투명해지면 버섯을 넣고 볶는다.',
        '리조또 쌀을 넣고 잘 섞는다.',
        '육수를 조금씩 부으면서 쌀이 익을 때까지 저어가며 끓인다.',
        '마지막에 파마산 치즈를 넣고 잘 섞는다.'
      ] },
      { recipeId: 7, recipeName: '스파이시 치킨윙', progress: 70, recipeState: '안주', favorite: true, 
      image: 'https://globalfood.co.kr/web/product/big/202407/06303e8d486a3641d9a8afd7383244eb.jpg',
      r_ingredients: [
        { r_ingredientName: '닭 날개', r_ingredientAmount: '1kg' },
        { r_ingredientName: '핫소스', r_ingredientAmount: '100ml' },
        { r_ingredientName: '버터', r_ingredientAmount: '50g' },
        { r_ingredientName: '소금', r_ingredientAmount: '적당량' },
        { r_ingredientName: '후추', r_ingredientAmount: '적당량' }
      ],
      recipeMethods: [
        '닭 날개를 깨끗이 씻고 소금과 후추로 밑간한다.',
        '오븐을 200도로 예열한다.',
        '버터와 핫소스를 섞어 소스를 만든다.',
        '닭 날개를 오븐 팬에 놓고 소스를 발라준다.',
        '오븐에 넣고 30분간 구운 후, 뒤집어서 다시 20분간 굽는다.',
        '바삭하게 구워진 치킨윙을 서빙한다.'
      ] },
      { recipeId: 8, recipeName: '고구마 튀김', progress: 100, recipeState: '간식', favorite: false, 
      image: 'https://i.namu.wiki/i/YQj4qH6Ecu7CmYnQe8cgtahwSOMhYhFZVhXS6DuCHjJtpkkWauSdqFTndYVBAf5Bk80tO-2RE8jkz9nRpZMi5Q.webp',
      r_ingredients: [
        { r_ingredientName: '고구마', r_ingredientAmount: '2개' },
        { r_ingredientName: '전분', r_ingredientAmount: '50g' },
        { r_ingredientName: '식용유', r_ingredientAmount: '적당량' },
        { r_ingredientName: '소금', r_ingredientAmount: '적당량' }
      ],
      recipeMethods: [
        '고구마를 껍질을 벗기고 길게 썬다.',
        '고구마에 전분을 골고루 묻힌다.',
        '프라이팬에 식용유를 두르고 중불로 예열한다.',
        '전분을 묻힌 고구마를 넣고 노릇하게 튀긴다.',
        '튀긴 고구마에 소금을 뿌려 서빙한다.'
      ] },
      { recipeId: 9, recipeName: '해산물 파에야', progress: 75, recipeState: '양식', favorite: true, 
      image: 'https://recipe1.ezmember.co.kr/cache/recipe/2020/08/02/3ea1090ca07ddf63b94b0da78843bd021.jpg',
      r_ingredients: [
        { r_ingredientName: '쌀', r_ingredientAmount: '300g' },
        { r_ingredientName: '새우', r_ingredientAmount: '200g' },
        { r_ingredientName: '홍합', r_ingredientAmount: '100g' },
        { r_ingredientName: '조개', r_ingredientAmount: '100g' },
        { r_ingredientName: '파프리카', r_ingredientAmount: '1개' },
        { r_ingredientName: '사프란', r_ingredientAmount: '1g' }
      ],
      recipeMethods: [
        '쌀을 깨끗이 씻고 물에 담가 둔다.',
        '팬에 기름을 두르고 파프리카를 볶는다.',
        '새우와 해산물을 넣고 볶다가 쌀을 넣는다.',
        '사프란과 물을 추가하고 끓인다.',
        '쌀이 익을 때까지 약한 불에서 끓이며, 물이 없어지면 불을 끈다.',
        '완성된 파에야를 서빙한다.'
      ] },
      { recipeId: 10, recipeName: '스테이크', progress: 85, recipeState: '양식', favorite: false, 
      image: 'https://www.sbfoods-worldwide.com/ko/recipes/deq4os00000008l9-img/10_Stake_A.jpg',
      r_ingredients: [
        { r_ingredientName: '소고기', r_ingredientAmount: '200g' },
        { r_ingredientName: '소금', r_ingredientAmount: '적당량' },
        { r_ingredientName: '후추', r_ingredientAmount: '적당량' },
        { r_ingredientName: '올리브 오일', r_ingredientAmount: '1큰술' }
      ],
      recipeMethods: [
        '소고기를 실온에서 30분간 둔다.',
        '팬에 올리브 오일을 두르고 고기를 구운 후 소금과 후추로 간을 한다.',
        '각 면을 3-4분 정도 구워 원하는 익힘 정도로 조리한다.',
        '완성된 스테이크를 5분 정도 휴지시킨 후 썰어 서빙한다.'
      ] },
      { recipeId: 11, recipeName: '계란찜', progress: 100, recipeState: '한식', favorite: true, 
      image: 'https://recipe1.ezmember.co.kr/cache/recipe/2017/07/06/c807784ab41809f624a6a4a7466cd5bd1.jpg',
      r_ingredients: [
        { r_ingredientName: '계란', r_ingredientAmount: '4개' },
        { r_ingredientName: '소금', r_ingredientAmount: '1작은술' },
        { r_ingredientName: '물', r_ingredientAmount: '1컵' },
        { r_ingredientName: '파', r_ingredientAmount: '1대' }
      ],
      recipeMethods: [
        '계란을 볼에 깨고 소금과 물을 넣고 잘 섞는다.',
        '체에 걸러 부드럽게 만든다.',
        '찜기나 전자레인지에 적당히 넣고 중약불에서 15분간 찐다.',
        '파를 잘게 썰어 위에 올려 서빙한다.'
      ] },
      { recipeId: 12, recipeName: '프렌치 토스트', progress: 60, recipeState: '브런치', favorite: false, 
      image: 'https://recipe1.ezmember.co.kr/cache/recipe/2018/01/15/2a6b7fb6670b596e443c2f6f91aa3ce91.jpg',
      r_ingredients: [
        { r_ingredientName: '식빵', r_ingredientAmount: '2조각' },
        { r_ingredientName: '계란', r_ingredientAmount: '1개' },
        { r_ingredientName: '우유', r_ingredientAmount: '50ml' },
        { r_ingredientName: '버터', r_ingredientAmount: '1큰술' },
        { r_ingredientName: '메이플 시럽', r_ingredientAmount: '적당량' }
      ],
      recipeMethods: [
        '계란과 우유를 잘 섞는다.',
        '식빵을 계란 혼합물에 적신다.',
        '팬에 버터를 두르고 식빵을 앞뒤로 구운 후 접시에 담는다.',
        '메이플 시럽을 뿌려 서빙한다.'
      ] },
      { recipeId: 13, recipeName: '라자냐', progress: 70, recipeState: '양식', favorite: true, 
      image: 'https://thingool123.godohosting.com/gd5replace/thingotr4652/data/editor/goods/210302/95e24e84206acd690188003e82c0afc3_174429.jpg',
      r_ingredients: [
        { r_ingredientName: '파스타', r_ingredientAmount: '200g' },
        { r_ingredientName: '고기', r_ingredientAmount: '300g' },
        { r_ingredientName: '토마토 소스', r_ingredientAmount: '400ml' },
        { r_ingredientName: '치즈', r_ingredientAmount: '150g' },
        { r_ingredientName: '양파', r_ingredientAmount: '1개' }
      ],
      recipeMethods: [
        '양파와 고기를 볶아준다.',
        '토마토 소스를 넣고 조리한다.',
        '파스타와 고기 소스를 층층이 쌓고 치즈를 올린다.',
        '오븐에서 180도로 30분간 구워낸다.'
      ] },
      { recipeId: 14, recipeName: '아보카도 샌드위치', progress: 80, recipeState: '브런치', favorite: false, 
    image: 'https://recipe1.ezmember.co.kr/cache/recipe/2018/06/01/0aad86563252704cee147820ee4d8d571.jpg',
      r_ingredients: [
        { r_ingredientName: '식빵', r_ingredientAmount: '2조각' },
        { r_ingredientName: '아보카도', r_ingredientAmount: '1개' },
        { r_ingredientName: '토마토', r_ingredientAmount: '1개' },
        { r_ingredientName: '상추', r_ingredientAmount: '2장' },
        { r_ingredientName: '소금', r_ingredientAmount: '적당량' }
      ],
      recipeMethods: [
        '아보카도를 반으로 잘라서 과육을 꺼내고 으깨준다.',
        '식빵 위에 아보카도를 바르고 소금을 뿌린다.',
        '상추와 토마토 슬라이스를 올리고 나머지 식빵으로 덮는다.',
        '원하는 크기로 잘라서 서빙한다.'
      ] },
      { recipeId: 15, recipeName: '돼지고기 볶음', progress: 90, recipeState: '한식', favorite: true, 
      image: 'https://recipe1.ezmember.co.kr/cache/recipe/2015/04/20/3da17e927ea6af13d123e38da61240251.jpg',
      r_ingredients: [
        { r_ingredientName: '돼지고기', r_ingredientAmount: '300g' },
        { r_ingredientName: '양파', r_ingredientAmount: '1개' },
        { r_ingredientName: '고추', r_ingredientAmount: '2개' },
        { r_ingredientName: '소금', r_ingredientAmount: '적당량' },
        { r_ingredientName: '후추', r_ingredientAmount: '적당량' }
      ],
      recipeMethods: [
        '양파와 고추를 썬다.',
        '팬에 돼지고기를 볶다가 양파와 고추를 추가한다.',
        '소금과 후추로 간을 맞춘다.'
      ] },
      { recipeId: 16, recipeName: '바나나 빵', progress: 100, recipeState: '디저트', favorite: false, 
      image: 'https://i.namu.wiki/i/fFYcntc3liBYLXzqpwUuIftimkZ6n-TTNWocX8pGjQlEwonFBjj_7_h5jGK8Aee6J8Iips5vR7ldEKgY5BbTyQ.webp',
      r_ingredients: [
        { r_ingredientName: '바나나', r_ingredientAmount: '3개' },
        { r_ingredientName: '밀가루', r_ingredientAmount: '200g' },
        { r_ingredientName: '설탕', r_ingredientAmount: '100g' },
        { r_ingredientName: '계란', r_ingredientAmount: '2개' },
        { r_ingredientName: '버터', r_ingredientAmount: '100g' }
      ],
      recipeMethods: [
        '바나나를 으깬다.',
        '버터와 설탕을 섞는다.',
        '계란과 으깬 바나나를 넣고 섞는다.',
        '밀가루를 넣고 잘 섞는다.',
        '반죽을 틀에 넣고 오븐에서 굽는다.'
      ] },
      { recipeId: 17, recipeName: '치킨 카레', progress: 75, recipeState: '한식', favorite: true, 
      image: 'https://www.sbfoods-worldwide.com/ko/recipes/qfttv700000032v4-img/10_ChickenCurry_recipe.jpg',
      r_ingredients: [
        { r_ingredientName: '닭고기', r_ingredientAmount: '300g' },
        { r_ingredientName: '카레 가루', r_ingredientAmount: '2큰술' },
        { r_ingredientName: '양파', r_ingredientAmount: '1개' },
        { r_ingredientName: '당근', r_ingredientAmount: '1개' },
        { r_ingredientName: '감자', r_ingredientAmount: '1개' }
      ],
      recipeMethods: [
        '닭고기와 야채를 손질한다.',
        '기름을 두른 팬에 양파를 볶는다.',
        '당근과 감자를 넣고 같이 볶는다.',
        '닭고기를 넣고 익힌다.',
        '카레 가루를 넣고 잘 섞는다.'
      ] },
      { recipeId: 18, recipeName: '베리 믹스 샐러드', progress: 100, recipeState: '샐러드', favorite: false, 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGmBRNMrJ3IVf6cpt8XFkNmChrFXMVAA54Ww&s',
      r_ingredients: [
        { r_ingredientName: '블루베리', r_ingredientAmount: '50g' },
        { r_ingredientName: '딸기', r_ingredientAmount: '50g' },
        { r_ingredientName: '라즈베리', r_ingredientAmount: '50g' },
        { r_ingredientName: '시금치', r_ingredientAmount: '100g' },
        { r_ingredientName: '호두', r_ingredientAmount: '30g' }
      ],
      recipeMethods: [
        '딸기와 라즈베리를 손질하여 먹기 좋게 자른다.',
        '시금치를 깨끗이 씻어 준비한다.',
        '블루베리, 딸기, 라즈베리, 시금치, 호두를 큰 볼에 넣는다.',
        '취향에 따라 드레싱을 추가하고 잘 버무린다.'
      ] },
      { recipeId: 19, recipeName: '갈비찜', progress: 90, recipeState: '한식', favorite: true, 
      image: 'https://recipe1.ezmember.co.kr/cache/recipe/2017/12/28/2ae16d56729371528da4a84b2afdb2f01.jpg',
      r_ingredients: [
        { r_ingredientName: '갈비', r_ingredientAmount: '500g' },
        { r_ingredientName: '간장', r_ingredientAmount: '100ml' },
        { r_ingredientName: '마늘', r_ingredientAmount: '5쪽' },
        { r_ingredientName: '양파', r_ingredientAmount: '1개' },
        { r_ingredientName: '설탕', r_ingredientAmount: '2큰술' }
      ],
      recipeMethods: [
        '갈비를 찬물에 담가 핏물을 뺀다.',
        '간장, 마늘, 양파, 설탕으로 양념장을 만든다.',
        '핏물을 뺀 갈비에 양념장을 넣고 잘 버무린다.',
        '갈비를 약한 불에서 천천히 익혀 완성한다.'
      ] },
      { recipeId: 20, recipeName: '치즈 피자', progress: 80, recipeState: '양식', favorite: false, 
      image: 'https://cdn.dominos.co.kr/admin/upload/goods/20200311_TI57KvOH.jpg',
      r_ingredients: [
        { r_ingredientName: '피자 도우', r_ingredientAmount: '1장' },
        { r_ingredientName: '토마토 소스', r_ingredientAmount: '100g' },
        { r_ingredientName: '치즈', r_ingredientAmount: '200g' },
        { r_ingredientName: '올리브', r_ingredientAmount: '50g' }
      ],
      recipeMethods: [
        '피자 도우 위에 토마토 소스를 골고루 펴 바른다.',
        '도우 위에 치즈와 올리브를 얹는다.',
        '200도 오븐에서 15분간 구워 치즈가 녹을 때까지 조리한다.',
        '피자를 꺼내 식혀 완성한다.'
      ] },
    ];
  
    this.recipe = recipes.find(recipe => recipe.recipeId === recipeId);
  }
};
</script>

<style scoped>
.recipe-detail-page {
  background-color: #fff;
  min-height: 100vh;
  box-sizing: border-box;
}
.top-section {
  padding: 20px;
  background-color: #9cd6fa; /* 하늘색 배경 */
}

.header {
  display: flex;
  align-items: center;
}
.row{
  padding: 5px;
}
.col{
  height: 40px;
}

.recipe-title {
  width: 100%;  
  color: #1f1e22;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 1px;
  padding-left: 5px;
}

.back-ico{
  width:28px;
  height:28px;
}

p {
  color: #1f1e22;
  font-weight: 800;
  font-size: 18px;
  margin: 10px 0;
}

/* 음식 이미지 및 정보 카드 */
.image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
}

.recipe-image {
  width: 80%;
  height: auto;
  border-radius: 10px;
  z-index: 1;
}
/* 하단 내용 영역 */
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

}

.recipe-methods {
  padding-left: 35px;
}

.recipe-methods li {
  margin-bottom: 10px;
  font-size: 16px;
}

</style>