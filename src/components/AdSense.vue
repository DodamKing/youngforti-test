<template>
  <div class="ad-section">
    <div class="ad-container">
      <ins 
        class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-7892198097991803"
        data-ad-slot="9442045555"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  try {
    setTimeout(() => {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    }, 100)
  } catch (err) {
    console.error('AdSense error:', err)
  }
})
</script>

<style scoped>
.ad-section {
  width: 100%;
  max-width: 728px;
  margin: 32px auto;
  padding: 0 16px;
}

.ad-container {
  width: 100%;
  min-height: 280px; /* ✅ 핵심: 일반적인 디스플레이 광고 높이 */
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ad-container:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 광고 로드 전 placeholder */
.ad-container:empty::before {
  content: '';
  display: block;
  width: 100%;
  height: 280px;
  background: linear-gradient(
    90deg,
    rgba(240, 240, 240, 0.3) 0%,
    rgba(240, 240, 240, 0.6) 50%,
    rgba(240, 240, 240, 0.3) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.adsbygoogle {
  display: block;
  width: 100%;
  min-height: 280px; /* ✅ 광고 ins 태그도 동일 높이 */
}

/* ✅ 모바일 최적화 */
@media (max-width: 768px) {
  .ad-section {
    max-width: 100%;
    margin: 24px auto;
    padding: 0 16px;
  }
  
  .ad-container {
    min-height: 250px; /* 모바일 광고 높이 */
    padding: 4px;
  }
  
  .ad-container:empty::before {
    height: 250px;
  }
  
  .adsbygoogle {
    min-height: 250px;
  }
}

/* ✅ 작은 모바일 */
@media (max-width: 375px) {
  .ad-section {
    padding: 0 12px;
    margin: 20px auto;
  }
  
  .ad-container {
    min-height: 200px;
  }
  
  .ad-container:empty::before {
    height: 200px;
  }
  
  .adsbygoogle {
    min-height: 200px;
  }
}

/* ✅ PC 큰 화면 */
@media (min-width: 1024px) {
  .ad-section {
    max-width: 728px;
  }
  
  .ad-container {
    min-height: 280px;
  }
  
  .adsbygoogle {
    min-height: 280px;
  }
}
</style>