<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* 스타일 설정 */
body {
  font-family: 'Pretendard', 'Roboto', sans-serif; /* 폰트 적용 */
  margin: 0; /* 기본 여백 제거 */
  padding: 0; /* 기본 여백 제거 */
  box-sizing: border-box; /* 박스 크기 설정 */
}
</style>