const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [],

  // 빌드된 파일을 백엔드의 정적 파일 경로로 출력(back)
  outputDir: 'C:/Users/민영/Desktop/1/member_new-main/member_new-main/src/main/resources/static',

  // 개발 서버 (back)
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8082',  // 백엔드(Spring Boot) 서버 주소
        changeOrigin: true,
        pathRewrite: { '^/api': '' }  // /api 경로를 백엔드 서버의 기본 경로로 대체
      }
    }
  }
});
