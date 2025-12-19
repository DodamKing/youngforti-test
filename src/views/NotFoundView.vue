<template>
  <div class="not-found-view">
    <div class="container">
      <div class="content">
        <!-- 에러 코드 -->
        <div class="error-code">
          <span class="code-number">404</span>
        </div>

        <!-- 메인 메시지 -->
        <div class="message-section">
          <h1 class="main-message">
            앗, 이 페이지는<br>
            <span class="highlight">찾을 수 없네요</span>
          </h1>
          <p class="sub-message">
            이 링크는 스윗 영포티가 아니라<br>
            그냥 '포티'인가 봅니다... 🤷‍♂️
          </p>
        </div>

        <!-- 이모지 섹션 -->
        <div class="emoji-section">
          <span class="emoji">🔍</span>
          <span class="emoji-small">❓</span>
        </div>

        <!-- 설명 -->
        <div class="description">
          <p>페이지가 삭제되었거나</p>
          <p>주소가 잘못 입력되었어요</p>
        </div>

        <!-- 버튼들 -->
        <div class="button-group">
          <button class="btn btn-primary home-button" @click="goToHome">
            테스트 하러 가기
          </button>
          <button class="btn btn-secondary back-button" @click="goBack">
            이전 페이지로
          </button>
        </div>

        <!-- 안내문구 -->
        <p class="notice">
          문제가 계속되면 새로고침을 해보세요
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.not-found-view {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 480px;
  padding: 40px 24px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
}

/* 에러 코드 */
.error-code {
  margin-bottom: 8px;
}

.code-number {
  font-size: 80px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.3);
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  line-height: 1;
}

/* 메시지 섹션 */
.message-section {
  color: white;
}

.main-message {
  font-size: 32px;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 16px;
}

.highlight {
  color: #FFE66D;
  font-size: 36px;
}

.sub-message {
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.95;
  font-weight: 400;
}

/* 이모지 섹션 */
.emoji-section {
  margin: 12px 0;
  position: relative;
}

.emoji {
  font-size: 64px;
  display: inline-block;
  animation: search 2s ease-in-out infinite;
}

.emoji-small {
  font-size: 32px;
  position: absolute;
  top: -10px;
  right: -20px;
  animation: float 3s ease-in-out infinite;
}

@keyframes search {
  0%, 100% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(15deg);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

/* 설명 */
.description {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 16px 24px;
  border-radius: 12px;
  color: white;
  width: 100%;
}

.description p {
  margin: 6px 0;
  font-size: 14px;
  font-weight: 500;
}

/* 버튼 그룹 */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-top: 12px;
}

/* 홈 버튼 */
.home-button {
  background: white;
  color: #667eea;
  font-size: 18px;
  font-weight: 700;
  padding: 18px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.home-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}

.home-button:active {
  transform: translateY(0);
}

/* 뒤로가기 버튼 */
.back-button {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 14px 24px;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.back-button:active {
  transform: scale(0.98);
}

/* 안내문구 */
.notice {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  margin-top: 8px;
}

/* 반응형 */
@media (max-width: 375px) {
  .code-number {
    font-size: 64px;
  }
  
  .main-message {
    font-size: 28px;
  }
  
  .highlight {
    font-size: 32px;
  }
  
  .emoji {
    font-size: 56px;
  }
  
  .emoji-small {
    font-size: 28px;
  }
}
</style>