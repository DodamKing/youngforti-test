<template>
    <div class="result-view" :style="{ background: backgroundColor }">
        <div class="container">
            <!-- 📸 캡처 영역 시작 -->
            <div class="capture-area" ref="captureArea">
                <!-- 로고/서비스명 -->
                <div class="branding">
                    나는 과연 영포티일까?
                </div>

                <!-- 이모지 -->
                <div class="emoji-section">
                    <span class="emoji">{{ result.emoji }}</span>
                </div>

                <!-- 타이틀 -->
                <div class="title-section">
                    <h1 class="title">{{ result.title }}</h1>
                    <p class="subtitle">{{ result.subtitle }}</p>
                </div>

                <!-- 짧은 설명 (캡처용) -->
                <div class="short-description">
                    {{ result.shortDescription }}
                </div>

                <!-- 점수 표시 -->
                <div class="score-section">
                    <div class="score-box">
                        <div class="score-label">영포티 지수</div>
                        <div class="score-value">{{ finalScore }}점</div>
                        <div class="score-tier">{{ tierName }} 등급</div>
                    </div>
                </div>

                <!-- 하단 브랜딩 (도메인 있을 때만 활성화) -->
                <!-- <div class="bottom-branding">
          <p class="test-link">youngforti.com</p>
        </div> -->
            </div>
            <!-- 📸 캡처 영역 끝 -->

            <!-- 캡처 영역 밖 (스크롤 필요) -->
            <div class="below-fold">
                <!-- 🎯 광고 #1 - 상단 디스플레이 광고 -->
                <AdSense ad-slot="1234567890" ad-format="auto" />

                <!-- 공유 버튼 (캡처 안내 제거) -->
                <div class="share-buttons">
                    <button class="share-btn link" @click="copyLink">
                        {{ linkCopied ? '✓ 링크 복사됨!' : '🔗 링크 복사하기' }}
                    </button>
                </div>

                <!-- 상세 설명 (긴 버전) -->
                <div class="detailed-section">
                    <h3 class="detail-title">📋 상세 결과</h3>
                    <div class="full-description">
                        {{ result.fullDescription }}
                    </div>
                </div>

                <!-- 🎯 광고 #2 - 중간 광고 -->
                <AdSense ad-slot="0987654321" ad-format="auto" />

                <!-- 다시하기 버튼 -->
                <button class="retry-button" @click="retryTest">
                    🔄 다시 테스트하기
                </button>

                <!-- 푸터 -->
                <div class="footer">
                    <p>이 테스트는 재미를 위한 것으로<br>정확한 심리 분석이 아닙니다</p>
                </div>

                <!-- 🎯 광고 #3 - 하단 광고 (선택사항) -->
                <AdSense ad-slot="1122334455" ad-format="auto" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getResult, tierColors } from '../data/results.js'
import { calculateTier, getAgeGroup, calculateFinalScore } from '../utils/calculator.js'
import AdSense from '../components/AdSense.vue'

const router = useRouter()
const captureArea = ref(null)
const linkCopied = ref(false)

// 데이터
const totalScore = ref(0)
const userAge = ref(0)
const tier = ref('T3')
const ageGroup = ref('30s')
const finalScore = ref(0)

// 결과 데이터
const result = computed(() => {
    return getResult(ageGroup.value, tier.value)
})

// 배경색
const backgroundColor = computed(() => {
    return tierColors[tier.value] || tierColors.T3
})

// 티어 이름
const tierName = computed(() => {
    const tierNames = {
        T1: '브론즈',
        T2: '실버',
        T3: '골드',
        T4: '플래티넘',
        T5: '다이아몬드'
    }
    return tierNames[tier.value] || '골드'
})

// 마운트 시 데이터 로드
onMounted(() => {
    const score = sessionStorage.getItem('totalScore')
    const age = localStorage.getItem('userAge')

    if (!score || !age) {
        router.push('/')
        return
    }

    totalScore.value = parseInt(score)
    userAge.value = parseInt(age)

    // 티어 계산
    tier.value = calculateTier(totalScore.value)

    // 나이 그룹 분류
    ageGroup.value = getAgeGroup(userAge.value)

    // 최종 점수 (100점 만점)
    finalScore.value = calculateFinalScore(totalScore.value)
})

// 링크 복사
const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(window.location.origin)
        linkCopied.value = true
        setTimeout(() => {
            linkCopied.value = false
        }, 2000)
    } catch (err) {
        alert('링크 복사에 실패했습니다')
    }
}

// 다시 테스트
const retryTest = () => {
    // 데이터 초기화
    sessionStorage.clear()
    localStorage.removeItem('userAge')

    // 처음으로
    router.push('/')
}
</script>

<style scoped>
.result-view {
    width: 100%;
    min-height: 100vh;
    padding: 0;
}

.container {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
}

/* ==================== 캡처 영역 ==================== */
.capture-area {
    width: 100%;
    min-height: 100vh;
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
}

/* 브랜딩 */
.branding {
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
}

/* 이모지 */
.emoji-section {
    text-align: center;
    margin: 20px 0;
}

.emoji {
    font-size: 80px;
    display: inline-block;
    animation: popIn 0.5s ease;
}

@keyframes popIn {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

/* 타이틀 섹션 */
.title-section {
    text-align: center;
    color: white;
    animation: fadeInUp 0.6s ease 0.2s both;
}

.title {
    font-size: 28px;
    font-weight: 800;
    line-height: 1.3;
    margin-bottom: 12px;
    word-break: keep-all;
}

.subtitle {
    font-size: 16px;
    font-weight: 600;
    opacity: 0.95;
    line-height: 1.4;
}

/* 짧은 설명 */
.short-description {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: 24px;
    border-radius: 16px;
    color: white;
    font-size: 15px;
    line-height: 1.7;
    text-align: center;
    word-break: keep-all;
    animation: fadeInUp 0.6s ease 0.4s both;
}

/* 점수 섹션 */
.score-section {
    display: flex;
    justify-content: center;
    animation: fadeInUp 0.6s ease 0.6s both;
}

.score-box {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 24px 40px;
    border-radius: 20px;
    text-align: center;
    border: 2px solid rgba(255, 255, 255, 0.3);
}

.score-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 8px;
    font-weight: 600;
}

.score-value {
    font-size: 48px;
    font-weight: 900;
    color: #FFE66D;
    line-height: 1;
    margin-bottom: 8px;
}

.score-tier {
    font-size: 16px;
    color: white;
    font-weight: 700;
}

/* 하단 브랜딩 (주석 처리됨) */
.bottom-branding {
    text-align: center;
    margin-top: 20px;
}

.test-link {
    font-size: 14px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 0.5px;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ==================== 캡처 영역 밖 ==================== */
.below-fold {
    background: #f5f5f5;
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.guide-icon {
    font-size: 48px;
    margin-bottom: 16px;
}

.guide-text {
    font-size: 17px;
    font-weight: 700;
    color: #333;
    margin-bottom: 12px;
    line-height: 1.5;
}

.guide-subtext {
    font-size: 14px;
    color: #666;
    font-weight: 500;
}

/* 공유 버튼 */
.share-buttons {
    display: flex;
    gap: 12px;
    margin-top: 8px;
    /* 약간의 여백만 */
}

.share-btn {
    flex: 1;
    padding: 18px;
    font-size: 17px;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.share-btn.link {
    background: #667eea;
    color: white;
}

.share-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.share-btn:active {
    transform: translateY(0);
}

/* 상세 섹션 */
.detailed-section {
    background: white;
    padding: 32px 24px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.detail-title {
    font-size: 20px;
    font-weight: 800;
    color: #333;
    margin-bottom: 20px;
}

.full-description {
    font-size: 15px;
    line-height: 1.8;
    color: #555;
    white-space: pre-line;
    word-break: keep-all;
}

/* 다시하기 버튼 */
.retry-button {
    width: 100%;
    padding: 18px;
    font-size: 17px;
    font-weight: 700;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.retry-button:hover {
    background: #5568d3;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

/* 푸터 */
.footer {
    text-align: center;
    padding: 20px 0;
}

.footer p {
    font-size: 13px;
    color: #999;
    line-height: 1.6;
}

/* 반응형 */
@media (max-width: 375px) {
    .title {
        font-size: 24px;
    }

    .emoji {
        font-size: 64px;
    }

    .score-value {
        font-size: 40px;
    }

    .short-description {
        font-size: 14px;
        padding: 20px;
    }
}

/* 화면 높이 작을 때 */
@media (max-height: 700px) {
    .capture-area {
        min-height: auto;
        padding: 30px 24px;
    }

    .emoji {
        font-size: 64px;
    }
}
</style>