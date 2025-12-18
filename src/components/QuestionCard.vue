<template>
  <div class="question-card">
    <h2 class="question-text">{{ question }}</h2>
    
    <div class="options">
      <button
        v-for="(option, index) in options"
        :key="index"
        class="option-button"
        @click="selectOption(option)"
      >
        {{ option.text }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  question: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['select'])

const selectOption = (option) => {
  emit('select', option)
}
</script>

<style scoped>
.question-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.question-text {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.5;
  color: white;
  text-align: center;
  word-break: keep-all;
  padding: 0 8px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.option-button {
  width: 100%;
  padding: 20px 24px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  text-align: left;
  color: #667eea;
  background: white;
  border: 3px solid transparent;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  word-break: keep-all;
}

.option-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  border-color: #FFE66D;
}

.option-button:active {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* 반응형 */
@media (max-width: 375px) {
  .question-text {
    font-size: 22px;
  }
  
  .option-button {
    padding: 18px 20px;
    font-size: 15px;
  }
}
</style>