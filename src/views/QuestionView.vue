<template>
  <div class="question-view">
    <div class="container">
      <!-- 상단 헤더 -->
      <div class="header">
        <button class="back-button" @click="handleBack">
          ← 뒤로
        </button>
        
        <!-- 진행도 바 -->
        <ProgressBar 
          :current="currentQuestionIndex + 1" 
          :total="totalQuestions" 
        />
      </div>

      <!-- 질문 카드 -->
      <div class="question-container">
        <QuestionCard
          :key="currentQuestion.id"
          :question="currentQuestion.question"
          :options="currentQuestion.options"
          @select="handleSelect"
        />
      </div>

      <!-- 하단 버튼들 (이전/다음) -->
      <div class="navigation" v-if="currentQuestionIndex > 0">
        <button class="prev-button" @click="goPrevious">
          ← 이전 질문
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProgressBar from '../components/ProgressBar.vue'
import QuestionCard from '../components/QuestionCard.vue'
import { questions, shuffleOptions } from '../data/questions.js'

const router = useRouter()

// 상태 관리
const currentQuestionIndex = ref(0)
const answers = ref([]) // 사용자 답변 저장
const shuffledQuestions = ref([])

const totalQuestions = questions.length

// 현재 질문
const currentQuestion = computed(() => {
  return shuffledQuestions.value[currentQuestionIndex.value] || {}
})

// 컴포넌트 마운트 시
onMounted(() => {
  // 나이 확인
  const age = localStorage.getItem('userAge')
  if (!age) {
    router.push('/age')
    return
  }

  // 질문 초기화 (선택지 순서 랜덤)
  shuffledQuestions.value = questions.map(q => shuffleOptions(q))
  
  // 기존 답변 복원 (뒤로가기로 돌아온 경우)
  const savedAnswers = sessionStorage.getItem('answers')
  if (savedAnswers) {
    answers.value = JSON.parse(savedAnswers)
    const savedIndex = sessionStorage.getItem('currentQuestionIndex')
    if (savedIndex) {
      currentQuestionIndex.value = parseInt(savedIndex)
    }
  }
})

// 선택 처리
const handleSelect = (option) => {
  // 답변 저장
  answers.value[currentQuestionIndex.value] = {
    questionId: currentQuestion.value.id,
    score: option.score,
    text: option.text
  }
  
  // 세션에 저장 (뒤로가기 대비)
  sessionStorage.setItem('answers', JSON.stringify(answers.value))
  sessionStorage.setItem('currentQuestionIndex', currentQuestionIndex.value.toString())
  
  // 마지막 질문이면 결과로 이동
  if (currentQuestionIndex.value === totalQuestions - 1) {
    goToLoading()
  } else {
    // 다음 질문으로
    setTimeout(() => {
      currentQuestionIndex.value++
    }, 200)
  }
}

// 이전 질문으로
const goPrevious = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

// 뒤로가기
const handleBack = () => {
  if (currentQuestionIndex.value > 0) {
    goPrevious()
  } else {
    if (confirm('테스트를 종료하시겠습니까?')) {
      sessionStorage.removeItem('answers')
      sessionStorage.removeItem('currentQuestionIndex')
      router.push('/age')
    }
  }
}

// 로딩 페이지로 이동
const goToLoading = () => {
  // 총점 계산
  const totalScore = answers.value.reduce((sum, answer) => sum + answer.score, 0)
  
  // 결과 저장
  sessionStorage.setItem('totalScore', totalScore.toString())
  
  // 답변 데이터 정리
  sessionStorage.removeItem('answers')
  sessionStorage.removeItem('currentQuestionIndex')
  
  // 로딩 화면으로
  router.push('/loading')
}
</script>

<style scoped>
.question-view {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px 0;
}

.container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 20px 24px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 헤더 */
.header {
  margin-bottom: 40px;
}

.back-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 24px;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 질문 컨테이너 */
.question-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

/* 네비게이션 */
.navigation {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.prev-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.prev-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 반응형 */
@media (max-height: 700px) {
  .question-container {
    margin: 10px 0;
  }
}
</style>