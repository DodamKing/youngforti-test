<template>
  <div class="adsense-container">
    <ins 
      class="adsbygoogle"
      :style="adStyle"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      :data-ad-format="adFormat"
      :data-full-width-responsive="fullWidthResponsive"
    ></ins>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  adSlot: {
    type: String,
    required: true
  },
  adFormat: {
    type: String,
    default: 'auto'
  },
  adStyle: {
    type: String,
    default: 'display:block'
  },
  fullWidthResponsive: {
    type: String,
    default: 'true'
  }
})

const adClient = 'ca-pub-7892198097991803'

onMounted(() => {
  try {
    // 애드센스 스크립트 로드 확인
    if (window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  } catch (err) {
    console.error('AdSense error:', err)
  }
})
</script>

<style scoped>
.adsense-container {
  width: 100%;
  margin: 16px 0;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 광고 로딩 중 표시 */
.adsense-container:empty::before {
  content: '';
  display: block;
  width: 100%;
  height: 50px;
  background: #f0f0f0;
  border-radius: 8px;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>