export const DEFAULTS = {
  people: 8,
  budget: 1600000,
  priority: 'balance',
  privateRooms: true,
  rain: false,
  selected: 'value',
  overrides: {}
};

export const CANDIDATES = [
  {
    id: 'conversation', no: '01', title: '흔들바위 전망 독채', subtitle: '산행 뒤 가까운 독채에서 쉬고, 다음 날 함께 정리',
    tag: '근거리', area: '고성 토성면 → 영랑호', lodging: '살구네집 · 독채 1동 / 침실 4 · 욕실 4',
    lodgingUrl: 'https://www.airbnb.co.kr/rooms/1651173590598943860',
    lodgingNote: '숙소 안내에 침실 4·욕실 4·최대 10인으로 표시. 욕실이 각 침실 안에 있는지는 확인되지 않았습니다. 날짜별 요금·침구·미팅 공간 확인 필요.',
    capacityPerRoom: 10, bedrooms: 4, bathrooms: 4, ensuiteVerified: 0,
    day1: [['06:00', '수도권 출발 (팀 차량 2대 가정)'], ['09:00', '설악산 소공원 도착 · 준비'], ['09:30–14:30', '흔들바위 왕복 등반 · 중간에 준비한 도시락과 휴식'], ['15:30', '독채 이동 · 체크인과 샤워'], ['18:30', '설악권에서 든든한 팀 저녁 식사']],
    day2: [['08:30', '아침 식사'], ['09:30', '선택: 세일즈 자료 미팅 60분 (필요할 때만)'], ['11:30', '영랑호 근처 생선구이 등으로 점심'], ['12:40', '영랑호 짧은 산책 · 커피'], ['14:00', '복귀 출발']],
    traits: { team: 5, rest: 3 },
    cost: { roomQty: 1, roomUnit: 450000, lunch1: 15000, dinner: 40000, breakfast: 12000, lunch2: 18000, activity: 80000, transport: 180000, buffer: 80000 }
  },
  {
    id: 'recharge', no: '02', title: '아야진 바다 독채', subtitle: '첫날 등반 후 휴식, 다음 날 아야진에서 식사와 산책',
    tag: '바다 휴식', area: '고성 아야진 → 아야진해변', lodging: '뽕스테이 · 독채 1동 / 침실 4 · 욕실 2',
    lodgingUrl: 'https://www.airbnb.co.kr/rooms/672941760611272961',
    lodgingNote: '숙소 안내에 침실 4·욕실 2·최대 8인으로 표시. 욕실이 침실 안에 있는지는 확인되지 않았습니다. 6인 기본요금으로 안내되어 8인 추가요금·날짜별 총액 확인 필요.',
    capacityPerRoom: 8, bedrooms: 4, bathrooms: 2, ensuiteVerified: 0,
    day1: [['06:00', '수도권 출발 (팀 차량 2대 가정)'], ['09:00', '설악산 소공원 도착 · 준비'], ['09:30–14:30', '흔들바위 왕복 등반 · 중간에 준비한 도시락과 휴식'], ['15:30', '아야진 독채 체크인 · 자유 휴식'], ['18:30', '아야진 근처 팀 저녁 식사']],
    day2: [['08:30', '아침 식사'], ['09:30', '선택: 세일즈 자료 미팅 60분 (조용한 장소 확인)'], ['11:30', '아야진 근처 해산물·생선구이 등으로 점심'], ['12:40', '아야진해변 가벼운 산책'], ['14:00', '복귀 출발']],
    traits: { team: 3, rest: 5 },
    cost: { roomQty: 1, roomUnit: 420000, lunch1: 15000, dinner: 35000, breakfast: 12000, lunch2: 22000, activity: 80000, transport: 190000, buffer: 80000 }
  },
  {
    id: 'value', no: '03', title: '확정 일정 · 양양 독채', subtitle: '요트랑펜션 숙박 · 장보기 BBQ · 낙원식당 점심',
    tag: '10/15 숙소 예약', area: '흔들바위 → 양양 → 점심·산책', lodging: '양양 요트랑펜션 · 예약 완료 (10월 15~16일)',
    lodgingUrl: 'https://www.airbnb.co.kr/rooms/716231742019185743',
    lodgingNote: '2026년 10월 15일 입실(15:00) · 16일 퇴실(11:00 전). 숙소 안내의 침실 4개와 개별 욕실 구성은 예약 객실과 대조 확인하세요. 칠판의 숙박 60만 원은 계획액입니다. 객실 내 구이·흡연, 반려동물, 개인 버너 사용이 제한됩니다. 야외 BBQ는 우천 시 이용 불가하므로 실내 구이로 대체하지 말고 식사 대안을 준비하세요. 요트 체험은 1인 25,000원 선택 옵션이며 날씨에 따라 불가할 수 있습니다. 추가 침구는 세트당 20,000원입니다.',
    capacityPerRoom: 15, bedrooms: 4, bathrooms: 7, ensuiteVerified: 4,
    day1: [['출발', '팀 출발 · 설악산 소공원 이동'], ['09:30', '등반 준비 · 도시락과 물 챙기기'], ['10:00–14:00', '흔들바위 왕복 등반 · 준비한 도시락'], ['14:00–15:00', '양양 이동'], ['15:00–16:30', '요트랑펜션 체크인 · 휴식 (체크인 15:00부터)'], ['16:30 이후', '장을 보고 야외 BBQ · 고기 2kg, 회, 식음료 (우천 시 대체 식사 필요)']],
    day2: [['오전', '아침 식사 (금액 미입력)'], ['오전', '선택: 세일즈 자료 미팅 60분 (시간이 필요할 때)'], ['11:00 전', '요트랑펜션 체크아웃 · 전원 확인'], ['점심', '낙원식당에서 점심 · 8명 계획액 20만 원'], ['식후', '식당 주변 가벼운 산책 · 장소는 동선 확인 후 결정'], ['오후', '복귀 출발']],
    traits: { team: 4, rest: 3 },
    cost: { roomQty: 1, roomUnit: 600000, lunch1: 20000, dinner: 0, breakfast: null, lunch2: 25000, bbqMeat: 96000, sashimi: 150000, drinks: 100000, activity: null, transport: null, buffer: null }
  }
];

export const COST_ROWS = [
  { key: 'roomQty', label: '독채 수', unit: '동', kind: 'quantity' },
  { key: 'roomUnit', label: '독채 1박 가정액', unit: '원', kind: 'unit' },
  { key: 'lunch1', label: 'Day 1 산행 도시락 · 1인', unit: '원', kind: 'person' },
  { key: 'dinner', label: 'Day 1 저녁 · 1인', unit: '원', kind: 'person' },
  { key: 'breakfast', label: 'Day 2 아침 · 1인', unit: '원', kind: 'person' },
  { key: 'lunch2', label: 'Day 2 점심 · 1인', unit: '원', kind: 'person' },
  { key: 'bbqMeat', label: 'Day 1 BBQ 고기 2kg · 팀 전체', unit: '원', kind: 'fixed', confirmedOnly: true },
  { key: 'sashimi', label: 'Day 1 회 · 팀 전체', unit: '원', kind: 'fixed', confirmedOnly: true },
  { key: 'drinks', label: 'Day 1 식음료·잡비 · 팀 전체', unit: '원', kind: 'fixed', confirmedOnly: true },
  { key: 'activity', label: '산행 물·간식 등 · 팀 전체', unit: '원', kind: 'fixed' },
  { key: 'transport', label: '이동 · 팀 전체', unit: '원', kind: 'fixed' },
  { key: 'buffer', label: '예비비 · 팀 전체', unit: '원', kind: 'fixed' }
];

export function calculate(candidate, settings) {
  const c = { ...candidate.cost, ...(settings.overrides?.[candidate.id] || {}) };
  const people = Math.max(1, Number(settings.people) || 1);
  const items = {
    stay: c.roomQty * c.roomUnit,
    meals: people * ((c.lunch1 || 0) + (c.dinner || 0) + (c.breakfast || 0) + (c.lunch2 || 0)) + (c.bbqMeat || 0) + (c.sashimi || 0) + (c.drinks || 0),
    activity: c.activity || 0,
    transport: c.transport || 0,
    buffer: c.buffer || 0
  };
  const total = Object.values(items).reduce((a, b) => a + b, 0);
  const missing = candidate.id === 'value' ? ['breakfast', 'transport'].filter(key => c[key] == null) : [];
  return { items, total, perPerson: Math.ceil(total / people), remaining: Number(settings.budget) - total, missing,
    capacity: c.roomQty * candidate.capacityPerRoom, costs: c };
}

export function rankCandidates(settings) {
  const weights = {
    balance: { team: 2, rest: 3, saving: 1 },
    team: { team: 5, rest: 1, saving: 0.5 },
    rest: { team: 0.5, rest: 5, saving: 0.5 },
    budget: { team: 1, rest: 1, saving: 5 }
  }[settings.priority] || { team: 2, rest: 3, saving: 1 };
  const evaluated = CANDIDATES.map(candidate => {
    const calc = calculate(candidate, settings);
    const fits = calc.remaining >= 0 && calc.capacity >= settings.people && candidate.bedrooms >= Math.ceil(settings.people / 2) &&
      (!settings.privateRooms || candidate.ensuiteVerified >= 2);
    const saving = Math.max(0, Math.min(5, calc.remaining / Math.max(1, settings.budget) * 15));
    const score = candidate.traits.team * weights.team + candidate.traits.rest * weights.rest + saving * weights.saving;
    return { candidate, calc, fits, score };
  });
  return evaluated.sort((a, b) => Number(b.fits) - Number(a.fits) || b.score - a.score || a.calc.total - b.calc.total);
}
