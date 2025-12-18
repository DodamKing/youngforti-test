export const questions = [
  {
    id: 1,
    question: '나보다 어린 사람들이 많은 자리에 가면 나는?',
    options: [
      { text: '분위기 보면서 적당히 섞인다', score: 3 },
      { text: '자연스럽게 빠지거나 조용히 있는 편이다', score: 1 },
      { text: '오히려 더 말 많아지고 잘 어울린다', score: 5 }
    ]
  },
  {
    id: 2,
    question: '사진 찍자고 하면 나는?',
    options: [
      { text: '굳이 안 찍어도 될 상황에서도 찍는다', score: 5 },
      { text: '귀찮아서 그냥 빠진다', score: 1 },
      { text: '찍자고 하면 마지못해 찍는다', score: 3 }
    ]
  },
  {
    id: 3,
    question: '"요즘 이게 유행이래"라는 말 들으면?',
    options: [
      { text: '한 번쯤 찾아본다', score: 3 },
      { text: '그런가 보다 한다', score: 1 },
      { text: '이미 알고 있다', score: 5 }
    ]
  },
  {
    id: 4,
    question: '실제 나이보다 어리게 부르면?',
    options: [
      { text: '웃고 넘긴다', score: 3 },
      { text: '바로 정정한다', score: 1 },
      { text: '굳이 먼저 말 안 한다', score: 5 }
    ]
  },
  {
    id: 5,
    question: '옷/신발 선택 기준은?',
    options: [
      { text: '무난한가', score: 3 },
      { text: '편한가', score: 1 },
      { text: '어려 보이는가', score: 5 }
    ]
  },
  {
    id: 6,
    question: 'SNS 핫플을 보면?',
    options: [
      { text: '기회 생기면 간다', score: 5 },
      { text: '그냥 본다', score: 1 },
      { text: '일단 저장', score: 3 }
    ]
  },
  {
    id: 7,
    question: '새 앱 추천 받으면?',
    options: [
      { text: '필요하면 써본다', score: 3 },
      { text: '굳이 안 쓴다', score: 1 },
      { text: '일단 깔아본다', score: 5 }
    ]
  },
  {
    id: 8,
    question: '술자리 요즘 이야기?',
    options: [
      { text: '대충 맞춘다', score: 3 },
      { text: '잘 모른다', score: 1 },
      { text: '잘 따라간다', score: 5 }
    ]
  },
  {
    id: 9,
    question: '나이 물어보면?',
    options: [
      { text: '상황 봐서 말한다', score: 3 },
      { text: '그대로 말한다', score: 1 },
      { text: '먼저 정확히 말 안 한다', score: 5 }
    ]
  },
  {
    id: 10,
    question: 'SNS 업로드 빈도는?',
    options: [
      { text: '가끔 올린다', score: 3 },
      { text: '거의 안 올린다', score: 1 },
      { text: '별일 없어도 올린다', score: 5 }
    ]
  },
  {
    id: 11,
    question: '유행어/밈 반응은?',
    options: [
      { text: '뜻만 알아둔다', score: 3 },
      { text: '잘 모르겠다', score: 1 },
      { text: '어느새 쓰고 있다', score: 5 }
    ]
  },
  {
    id: 12,
    question: '요즘 내 생활은?',
    options: [
      { text: '흐름에 맞춰 살고 있다', score: 3 },
      { text: '예전이랑 비슷하다', score: 1 },
      { text: '나도 모르게 요즘 기준이다', score: 5 }
    ]
  }
]

// 선택지 순서 랜덤 셔플 함수
export function shuffleOptions(question) {
  const shuffled = [...question.options]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return {
    ...question,
    options: shuffled
  }
}