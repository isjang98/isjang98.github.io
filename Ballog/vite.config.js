import { defineConfig } from 'vite'

export default defineConfig({
  // 상대 경로 리소스를 위해 base를 './'로 설정합니다. 
  // 이렇게 하면 GitHub Pages의 어떤 하위 경로(예: /Ballog/)에 배포되더라도 깨지지 않습니다.
  base: './',
})
