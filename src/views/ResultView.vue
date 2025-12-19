<template>
    <div class="result-view" :style="{ background: backgroundColor }">
        <div class="container">
            <!-- 📸 캡처 영역 시작 -->
            <div class="capture-area" ref="captureArea">
                <!-- 로고/서비스명 -->
                <div class="branding">
                    나는 과연 스윗 영포티일까?
                </div>

                <!-- 이모지 + 반짝이 -->
                <div class="emoji-section">
                    <span class="sparkle sparkle-1">✨</span>
                    <span class="emoji">{{ result.emoji }}</span>
                    <span class="sparkle sparkle-2">✨</span>
                </div>

                <!-- 타이틀 -->
                <div class="title-section">
                    <h1 class="title">{{ result.title }}</h1>
                    <p class="subtitle">{{ result.subtitle }}</p>
                </div>

                <!-- 짧은 설명 (말풍선 느낌) -->
                <div class="short-description">
                    <div class="bubble-tail"></div>
                    {{ result.shortDescription }}
                </div>

                <!-- 점수 표시 (더 강조) -->
                <div class="score-section">
                    <div class="score-value-big">{{ finalScore }}</div>
                    <div class="score-label-big">스윗 영포티 지수</div>
                </div>

                <!-- 하단 브랜딩 (도메인 있을 때만 활성화) -->
                <!-- <div class="bottom-branding">
          <p class="test-link">youngforti.com</p>
        </div> -->
            </div>
            <!-- 📸 캡처 영역 끝 -->

            <!-- 캡처 영역 밖 (스크롤 필요) -->
            <div class="below-fold">
                <!-- 공유 섹션 -->
                <div class="share-section">
                    <h3 class="share-title">🎉 결과를 공유해보세요!</h3>

                    <!-- 네이티브 공유 버튼 (큰 버튼) -->
                    <button class="share-btn primary" @click="shareNative">
                        <span class="btn-icon">📤</span>
                        <span class="btn-text">친구에게 공유하기</span>
                    </button>

                    <!-- 링크 복사 (작은 버튼) -->
                    <button class="link-copy-btn" @click="copyLink">
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

                <!-- ✅ 광고 #1 - 베스트 위치 (상세 설명 직후) -->
                <AdSense />

                <!-- 다시하기 버튼 -->
                <button class="retry-button" @click="retryTest">
                    🔄 다시 테스트하기
                </button>

                <!-- 푸터 -->
                <div class="footer">
                    <p>이 테스트는 재미를 위한 것으로<br>정확한 심리 분석이 아닙니다</p>
                </div>
            </div>
        </div>

        <!-- 토스트 메시지 -->
        <Transition name="toast">
            <div v-if="showToast" class="toast-message">
                {{ toastMessage }}
            </div>
        </Transition>
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
const showToast = ref(false)
const toastMessage = ref('')

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

// 네이티브 공유 (Web Share API)
const shareNative = async () => {
    try {
        // 카카오톡 인앱 브라우저 감지
        const isKakaoTalk = /KAKAOTALK/i.test(navigator.userAgent)

        if (isKakaoTalk) {
            // ✅ 텍스트 + 링크를 한 문자열로 합치기
            const shareText = `나의 스윗 영포티 지수는 ${finalScore.value}점! ${result.value.title}

                            나도 테스트 해보기 👇
                            ${window.location.origin}`

            try {
                // 방법 1: 최신 Clipboard API 시도
                await navigator.clipboard.writeText(shareText)
            } catch (err) {
                // 방법 2: 구형 방식 폴백
                const textarea = document.createElement('textarea')
                textarea.value = shareText
                textarea.style.position = 'fixed'
                textarea.style.opacity = '0'
                document.body.appendChild(textarea)
                textarea.select()
                document.execCommand('copy')
                document.body.removeChild(textarea)
            }

            toastMessage.value = `✅ 복사 완료!

                                카카오톡 대화창에
                                "붙여넣기" 하면
                                결과와 링크가 함께 공유됩니다 😊`
            showToast.value = true
            setTimeout(() => {
                showToast.value = false
            }, 4000)
            return
        }

        // 일반 브라우저: Web Share API
        if (!navigator.share) {
            copyLink()
            return
        }

        await navigator.share({
            title: '나는 과연 스윗 영포티일까?',
            text: `나의 스윗 영포티 지수는 ${finalScore.value}점! ${result.value.title}\n\n나도 테스트 해보기 👇`,
            url: window.location.origin
        })
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error('공유 실패:', err)
            copyLink()
        }
    }
}

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
    font-size: 13px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 0.5px;
}

/* 이모지 + 반짝이 */
.emoji-section {
    text-align: center;
    margin: 16px 0;
    position: relative;
    display: inline-block;
    width: 100%;
}

.emoji {
    font-size: 100px;
    display: inline-block;
    animation: popIn 0.5s ease;
}

.sparkle {
    font-size: 24px;
    position: absolute;
    animation: sparkleFloat 2s ease-in-out infinite;
}

.sparkle-1 {
    left: 20%;
    top: 10%;
    animation-delay: 0s;
}

.sparkle-2 {
    right: 20%;
    top: 10%;
    animation-delay: 1s;
}

@keyframes sparkleFloat {

    0%,
    100% {
        opacity: 0.3;
        transform: translateY(0) scale(0.8);
    }

    50% {
        opacity: 1;
        transform: translateY(-10px) scale(1.2);
    }
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
    margin-bottom: 8px;
}

.title {
    font-size: 32px;
    font-weight: 900;
    line-height: 1.3;
    margin-bottom: 12px;
    word-break: keep-all;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.subtitle {
    font-size: 17px;
    font-weight: 600;
    opacity: 0.95;
    line-height: 1.4;
}

/* 짧은 설명 (말풍선 느낌) */
.short-description {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 20px 24px;
    border-radius: 20px;
    color: white;
    font-size: 15px;
    line-height: 1.7;
    text-align: center;
    word-break: keep-all;
    animation: fadeInUp 0.6s ease 0.4s both;
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.bubble-tail {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid rgba(255, 255, 255, 0.2);
}

/* 점수 섹션 (강조) */
.score-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    animation: fadeInUp 0.6s ease 0.6s both;
    margin-top: 24px;
}

.score-value-big {
    font-size: 72px;
    font-weight: 900;
    color: #FFE66D;
    line-height: 1;
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    letter-spacing: -2px;
}

.score-label-big {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 700;
    letter-spacing: 1px;
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

/* 공유 섹션 */
.share-section {
    background: white;
    padding: 32px 24px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.share-title {
    font-size: 20px;
    font-weight: 800;
    color: #333;
    text-align: center;
    margin-bottom: 24px;
}

.share-btn {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 24px 16px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
    margin-bottom: 16px;
}

.share-btn.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.btn-icon {
    font-size: 40px;
}

.btn-text {
    font-size: 16px;
    font-weight: 700;
}

.share-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.share-btn:active {
    transform: translateY(0);
}

/* 링크 복사 버튼 (작게) */
.link-copy-btn {
    width: 100%;
    padding: 12px;
    font-size: 14px;
    font-weight: 600;
    background: #f5f5f5;
    color: #666;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.link-copy-btn:hover {
    background: #ebebeb;
    color: #333;
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
        font-size: 28px;
    }

    .emoji {
        font-size: 80px;
    }

    .sparkle {
        font-size: 20px;
    }

    .score-value-big {
        font-size: 60px;
    }

    .short-description {
        font-size: 14px;
        padding: 18px 20px;
    }

    .btn-icon {
        font-size: 36px;
    }
}

/* 화면 높이 작을 때 */
@media (max-height: 700px) {
    .capture-area {
        min-height: auto;
        padding: 30px 24px;
    }

    .emoji {
        font-size: 80px;
    }

    .score-value-big {
        font-size: 60px;
    }
}

/* ==================== 토스트 메시지 ==================== */
.toast-message {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.85);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    white-space: pre-line;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    max-width: 90%;
    line-height: 1.5;
}

/* 토스트 애니메이션 */
.toast-enter-active {
    transition: all 0.3s ease;
}

.toast-leave-active {
    transition: all 0.2s ease;
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
}

/* 모바일에서 토스트 위치 조정 */
@media (max-width: 375px) {
    .toast-message {
        bottom: 60px;
        font-size: 14px;
        padding: 14px 20px;
    }
}
</style>