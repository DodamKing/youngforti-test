<template>
  <div class="start-view">
    <div class="container">
      <div class="content">
        <!-- 메인 타이틀 -->
        <div class="title-section">
          <h1 class="main-title">
            나는 과연<br>
            <span class="sweet-wrapper">
              <span class="sweet-text">스윗</span>
            </span>
            <span class="highlight">영포티</span>일까?
          </h1>
          <p class="subtitle">
            40대 전후의 '요즘 감성 적응력'을<br>
            웃으면서 확인하는 밈 테스트
          </p>
        </div>

        <!-- 캐릭터/이모지 영역 -->
        <div class="emoji-section">
          <span class="emoji">🤔</span>
        </div>

        <!-- 설명 -->
        <div class="description">
          <p>✅ 12개 질문</p>
          <p>✅ 소요시간 약 1분</p>
          <p>✅ 정확하지 않지만 그럴듯한 결과</p>
        </div>

        <!-- 시작 버튼 -->
        <button class="btn btn-primary start-button" @click="goToAgeInput">
          테스트 시작하기
        </button>

        <!-- 작은 안내문구 -->
        <p class="notice">
          이 테스트는 재미를 위한 것으로<br>
          정확한 심리 분석이 아닙니다
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAgeInput = () => {
  router.push('/age')
}
</script>

<style scoped>
.start-view {
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
  gap: 32px;
}

/* 타이틀 섹션 */
.title-section {
  color: white;
}

.main-title {
  font-size: 36px;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 16px;
  position: relative;
}

/* 스윗 스타일링 */
.sweet-wrapper {
  display: inline-block;
  position: relative;
}

.sweet-text {
  display: inline-block;
  font-size: 24px;
  font-weight: 700;
  color: #FFB6D9;
  background: linear-gradient(135deg, #FF6B9D 0%, #FEC5E5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transform: rotate(-8deg) translateY(-8px);
  margin-right: 4px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: sweetBounce 2s ease-in-out infinite;
  position: relative;
}

.sweet-text::before {
  content: '✨';
  position: absolute;
  left: -20px;
  top: -5px;
  font-size: 14px;
  animation: sparkle 1.5s ease-in-out infinite;
}

.sweet-text::after {
  content: '✨';
  position: absolute;
  right: -20px;
  top: -5px;
  font-size: 14px;
  animation: sparkle 1.5s ease-in-out infinite 0.75s;
}

@keyframes sweetBounce {
  0%, 100% {
    transform: rotate(-8deg) translateY(-8px);
  }
  50% {
    transform: rotate(-10deg) translateY(-12px);
  }
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.highlight {
  color: #FFE66D;
  font-size: 48px;
}

.subtitle {
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.95;
  font-weight: 400;
}

/* 이모지 섹션 */
.emoji-section {
  margin: 20px 0;
}

.emoji {
  font-size: 80px;
  display: inline-block;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 설명 */
.description {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 20px 24px;
  border-radius: 16px;
  color: white;
  width: 100%;
}

.description p {
  margin: 8px 0;
  font-size: 15px;
  font-weight: 500;
}

/* 시작 버튼 */
.start-button {
  margin-top: 20px;
  background: white;
  color: #667eea;
  font-size: 18px;
  font-weight: 700;
  padding: 18px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.start-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}

.start-button:active {
  transform: translateY(0);
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
  .main-title {
    font-size: 32px;
  }
  
  .sweet-text {
    font-size: 20px;
  }
  
  .highlight {
    font-size: 42px;
  }
  
  .emoji {
    font-size: 64px;
  }
}
</style>