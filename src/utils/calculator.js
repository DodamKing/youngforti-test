// 티어 계산 (극단 강조 - 재미 극대화)
export function calculateTier(rawScore) {
  if (rawScore >= 12 && rawScore <= 21) return 'T1'  // 10점 범위 (21%)
  if (rawScore >= 22 && rawScore <= 30) return 'T2'  // 9점 범위 (19%)
  if (rawScore >= 31 && rawScore <= 38) return 'T3'  // 8점 범위 (16%)
  if (rawScore >= 39 && rawScore <= 48) return 'T4'  // 10점 범위 (21%)
  if (rawScore >= 49 && rawScore <= 60) return 'T5'  // 12점 범위 (25%)
  return 'T3' // 기본값
}

// 연령대 분류
export function getAgeGroup(age) {
  if (age >= 10 && age <= 19) return '10s'
  if (age >= 20 && age <= 29) return '20s'
  if (age >= 30 && age <= 39) return '30s'
  return '40plus'
}

// 최종 점수 계산 (100점 만점)
export function calculateFinalScore(rawScore) {
  return Math.round((rawScore / 60) * 100)
}