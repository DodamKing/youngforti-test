<template>
  <div class="loading-view">
    <div class="container">
      <div class="content">
        <!-- 로딩 애니메이션 -->
        <div class="loading-spinner">
          <div class="spinner"></div>
        </div>

        <!-- 로딩 텍스트 -->
        <div class="loading-texts">
          <p class="loading-text" :key="currentText">
            {{ loadingTexts[currentTextIndex] }}
          </p>
        </div>

        <!-- 진행 바 -->
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loadingTexts = [
  '당신의 답변을 분석하고 있습니다...',
  '영포티 지수를 계산 중...',
  '나이와 감성의 조화를 측정 중...',
  '결과를 준비하고 있습니다...'
]

const currentTextIndex = ref(0)
const currentText = ref(loadingTexts[0])
const progress = ref(0)

onMounted(() => {
  // 점수 확인
  const totalScore = sessionStorage.getItem('totalScore')
  const userAge = localStorage.getItem('userAge')
  
  if (!totalScore || !userAge) {
    router.push('/')
    return
  }

  // 텍스트 변경 애니메이션
  const textInterval = setInterval(() => {
    currentTextIndex.value = (currentTextIndex.value + 1) % loadingTexts.length
    currentText.value = loadingTexts[currentTextIndex.value]
  }, 800)

  // 프로그레스 바 애니메이션
  const progressInterval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 2
    }
  }, 30)

  // 3초 후 결과 페이지로 이동
  setTimeout(() => {
    clearInterval(textInterval)
    clearInterval(progressInterval)
    router.push('/result')
  }, 3000)
})
</script>

<style scoped>
.loading-view {
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
  gap: 48px;
}

/* 로딩 스피너 */
.loading-spinner {
  position: relative;
  width: 100px;
  height: 100px;
}

.spinner {
  width: 100%;
  height: 100%;
  border: 8px solid rgba(255, 255, 255, 0.2);
  border-top: 8px solid #FFE66D;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 로딩 텍스트 */
.loading-texts {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-text {
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-align: center;
  animation: fadeInOut 0.8s ease-in-out;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
  }
}

/* 프로그레스 바 */
.progress-bar {
  width: 100%;
  max-width: 300px;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FFE66D 0%, #FFBA08 100%);
  border-radius: 10px;
  transition: width 0.3s ease;
}
</style>