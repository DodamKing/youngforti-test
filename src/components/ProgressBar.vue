<template>
  <div class="progress-bar">
    <div class="progress-info">
      <span class="current">{{ current }}</span>
      <span class="separator">/</span>
      <span class="total">{{ total }}</span>
    </div>
    <div class="bar-container">
      <div 
        class="bar-fill" 
        :style="{ width: percentage + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})

const percentage = computed(() => {
  return (props.current / props.total) * 100
})
</script>

<style scoped>
.progress-bar {
  width: 100%;
  margin-bottom: 32px;
}

.progress-info {
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 12px;
  color: white;
}

.current {
  font-size: 28px;
  font-weight: 800;
  color: #FFE66D;
}

.separator {
  font-size: 20px;
  margin: 0 4px;
  opacity: 0.7;
}

.total {
  font-size: 20px;
  font-weight: 600;
  opacity: 0.8;
}

.bar-container {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #FFE66D 0%, #FFBA08 100%);
  border-radius: 10px;
  transition: width 0.4s ease;
}
</style>