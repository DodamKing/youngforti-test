// 티어 계산
export function calculateTier(rawScore) {
  if (rawScore >= 12 && rawScore <= 24) return 'T1'
  if (rawScore >= 25 && rawScore <= 36) return 'T2'
  if (rawScore >= 37 && rawScore <= 48) return 'T3'
  if (rawScore >= 49 && rawScore <= 54) return 'T4'
  if (rawScore >= 55 && rawScore <= 60) return 'T5'
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