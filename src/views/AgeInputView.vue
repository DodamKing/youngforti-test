<template>
  <div class="age-input-view">
    <div class="container">
      <div class="content">
        <!-- 뒤로가기 버튼 -->
        <button class="back-button" @click="goBack">
          ← 뒤로
        </button>

        <!-- 질문 -->
        <div class="question-section">
          <h2 class="question">
            당신의 나이는?
          </h2>
          <p class="sub-question">
            결과 해석에만 사용됩니다
          </p>
        </div>

        <!-- 나이 입력 -->
        <div class="input-section">
          <input 
            type="number" 
            v-model.number="age"
            placeholder="나이를 입력해주세요"
            class="age-input"
            @keyup.enter="goToQuestion"
            min="10"
            max="99"
            autofocus
          >
          <p class="age-display" v-if="age">{{ age }}세</p>
        </div>

        <!-- 버튼 -->
        <button 
          class="btn btn-primary next-button" 
          @click="goToQuestion"
          :disabled="!isValidAge"
        >
          다음
        </button>

        <!-- 안내 -->
        <p class="info-text">
          💡 나이는 점수에 영향을 주지 않아요.<br>
          결과 멘트 선택에만 사용됩니다.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const age = ref(null)

// 유효한 나이인지 확인
const isValidAge = computed(() => {
  return age.value && age.value >= 10 && age.value <= 99
})

const goBack = () => {
  router.push('/')
}

const goToQuestion = () => {
  if (!isValidAge.value) {
    alert('10세 이상 99세 이하로 입력해주세요')
    return
  }
  
  // 나이를 localStorage에 저장
  localStorage.setItem('userAge', age.value)
  
  // 질문 페이지로 이동
  router.push('/question')
}
</script>

<style scoped>
.age-input-view {
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
  gap: 32px;
}

/* 뒤로가기 버튼 */
.back-button {
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 질문 섹션 */
.question-section {
  text-align: center;
  color: white;
  margin-top: 40px;
}

.question {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 12px;
}

.sub-question {
  font-size: 15px;
  opacity: 0.9;
}

/* 입력 섹션 */
.input-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.age-input {
  width: 100%;
  max-width: 300px;
  padding: 20px 24px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  border: 3px solid white;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  outline: none;
  transition: all 0.3s ease;
}

.age-input:focus {
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.age-input::placeholder {
  color: rgba(102, 126, 234, 0.4);
  font-size: 18px;
}

/* 숫자 spinner 제거 */
.age-input::-webkit-inner-spin-button,
.age-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.age-input[type=number] {
  -moz-appearance: textfield;
}

.age-display {
  font-size: 20px;
  font-weight: 700;
  color: #FFE66D;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 다음 버튼 */
.next-button {
  background: white;
  color: #667eea;
  font-size: 18px;
  font-weight: 700;
  margin-top: 20px;
}

.next-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.next-button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}

/* 안내 문구 */
.info-text {
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  margin-top: 8px;
}

/* 반응형 */
@media (max-width: 375px) {
  .question {
    font-size: 28px;
  }
  
  .age-input {
    font-size: 20px;
  }
}
</style>