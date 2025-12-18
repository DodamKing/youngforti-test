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
  max-width: 480px;
  margin: 32px auto;
  padding: 0;
}

.ad-label {
  text-align: center;
  font-size: 11px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
  font-weight: 600;
}

.ad-container {
  width: 100%;
  min-height: 100px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
}

.ad-container:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* 광고 로드 전 placeholder */
.ad-container:empty::before {
  content: '';
  display: block;
  width: 100%;
  height: 90px;
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

/* 광고가 로드되면 배경 효과 제거 */
.ad-container:has(.adsbygoogle[data-ad-status="filled"]) {
  background: white;
  padding: 0;
}

.adsbygoogle {
  display: block;
  width: 100%;
  min-height: 90px;
}
</style>