// 티어 계산
export function calculateTier(rawScore) {
  if (rawScore >= 12 && rawScore <= 23) return 'T1'
  if (rawScore >= 24 && rawScore <= 33) return 'T2'
  if (rawScore >= 34 && rawScore <= 44) return 'T3'
  if (rawScore >= 45 && rawScore <= 53) return 'T4'
  if (rawScore >= 54 && rawScore <= 60) return 'T5'
  return 'T3' // 기본값
}

// 연령대 분류
export function getAgeGroup(age) {
  if (age >= 10 && age <= 19) return '10s'
  if (age >= 20 && age <= 29) return '20s'
  if (age >= 30 && age <= 39) return '30s'
  return '40plus'
}

// 최종 점수 계산
export function calculateFinalScore(rawScore) {
  return Math.round((rawScore / 60) * 100)
}