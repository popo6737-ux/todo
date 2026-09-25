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
    id: 'conversation', no: '01', title: '울산바위 전망 독채', subtitle: '산행 뒤 가까운 독채에서 쉬고, 다음 날 함께 정리',
    tag: '근거리', area: '고성 토성면 → 영랑호', lodging: '살구네집 · 독채 1동 / 침실 4 · 욕실 4',
    lodgingUrl: 'https://www.airbnb.co.kr/rooms/1651173590598943860',
    lodgingNote: '숙소 안내에 침실 4·욕실 4·최대 10인으로 표시. 욕실이 각 침실 안에 있는지는 확인되지 않았습니다. 날짜별 요금·침구·미팅 공간 확인 필요.',
    capacityPerRoom: 10, bedrooms: 4, bathrooms: 4, ensuiteVerified: 0,
    day1: [['06:00', '수도권 출발 (팀 차량 2대 가정)'], ['09:00', '설악산 소공원 도착 · 준비'], ['09:30–14:30', '울산바위 왕복 등반 · 중간에 준비한 도시락과 휴식'], ['15:30', '독채 이동 · 체크인과 샤워'], ['18:30', '설악권에서 든든한 팀 저녁 식사']],
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
    day1: [['06:00', '수도권 출발 (팀 차량 2대 가정)'], ['09:00', '설악산 소공원 도착 · 준비'], ['09:30–14:30', '울산바위 왕복 등반 · 중간에 준비한 도시락과 휴식'], ['15:30', '아야진 독채 체크인 · 자유 휴식'], ['18:30', '아야진 근처 팀 저녁 식사']],
    day2: [['08:30', '아침 식사'], ['09:30', '선택: 세일즈 자료 미팅 60분 (조용한 장소 확인)'], ['11:30', '아야진 근처 해산물·생선구이 등으로 점심'], ['12:40', '아야진해변 가벼운 산책'], ['14:00', '복귀 출발']],
    traits: { team: 3, rest: 5 },
    cost: { roomQty: 1, roomUnit: 420000, lunch1: 15000, dinner: 35000, breakfast: 12000, lunch2: 22000, activity: 80000, transport: 190000, buffer: 80000 }
  },
  {
    id: 'value', no: '03', title: '개별 욕실 독채', subtitle: '네 침실 모두 욕실이 안내되고, 미팅 공간도 있음',
    tag: '욕실 조건 확인', area: '양양 손양면 → 낙산권', lodging: '요트랑 클럽하우스 · 독채 1동 / 침실 4 · 객실별 욕실',
    lodgingUrl: 'https://www.airbnb.co.kr/rooms/716231742019185743',
    lodgingNote: '숙소 안내에 침실 4개 모두 개별 욕실, 8인 기준·최대 15인, 1층 세미나실로 표시. 양양 소재로 속초보다 복귀 동선이 달라집니다. 실제 1박 요금·주차·미팅 공간 확인 필요.',
    capacityPerRoom: 15, bedrooms: 4, bathrooms: 7, ensuiteVerified: 4,
    day1: [['06:00', '수도권 출발 (팀 차량 2대 가정)'], ['09:00', '설악산 소공원 도착 · 준비'], ['09:30–14:30', '울산바위 왕복 등반 · 중간에 준비한 도시락과 휴식'], ['15:30', '양양 독채 체크인 · 자유 휴식'], ['18:30', '양양에서 팀 저녁 식사']],
    day2: [['08:30', '아침 식사'], ['09:30', '선택: 세일즈 자료 미팅 60분 (숙소 세미나실 확인)'], ['11:30', '낙산권에서 생선구이 등으로 점심'], ['12:40', '낙산해변 짧은 산책'], ['14:00', '복귀 출발']],
    traits: { team: 4, rest: 3 },
    cost: { roomQty: 1, roomUnit: 520000, lunch1: 15000, dinner: 35000, breakfast: 12000, lunch2: 22000, activity: 80000, transport: 200000, buffer: 80000 }
  }
];

export const COST_ROWS = [
  { key: 'roomQty', label: '독채 수', unit: '동', kind: 'quantity' },
  { key: 'roomUnit', label: '독채 1박 가정액', unit: '원', kind: 'unit' },
  { key: 'lunch1', label: 'Day 1 산행 도시락 · 1인', unit: '원', kind: 'person' },
  { key: 'dinner', label: 'Day 1 저녁 · 1인', unit: '원', kind: 'person' },
  { key: 'breakfast', label: 'Day 2 아침 · 1인', unit: '원', kind: 'person' },
  { key: 'lunch2', label: 'Day 2 점심 · 1인', unit: '원', kind: 'person' },
  { key: 'activity', label: '산행 물·간식 등 · 팀 전체', unit: '원', kind: 'fixed' },
  { key: 'transport', label: '이동 · 팀 전체', unit: '원', kind: 'fixed' },
  { key: 'buffer', label: '예비비 · 팀 전체', unit: '원', kind: 'fixed' }
];

export function calculate(candidate, settings) {
  const c = { ...candidate.cost, ...(settings.overrides?.[candidate.id] || {}) };
  const people = Math.max(1, Number(settings.people) || 1);
  const items = {
    stay: c.roomQty * c.roomUnit,
    meals: people * (c.lunch1 + c.dinner + c.breakfast + c.lunch2),
    activity: c.activity,
    transport: c.transport,
    buffer: c.buffer
  };
  const total = Object.values(items).reduce((a, b) => a + b, 0);
  return { items, total, perPerson: Math.ceil(total / people), remaining: Number(settings.budget) - total,
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
