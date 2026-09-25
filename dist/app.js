import { DEFAULTS, CANDIDATES, COST_ROWS, calculate, rankCandidates } from './model.js';

const currency = value => new Intl.NumberFormat('ko-KR').format(value) + '원';
const key = 'sokcho-workshop-planner-v3';
let stored = {};
try { stored = JSON.parse(localStorage.getItem(key)) || {}; } catch { /* corrupted local data: start fresh */ }
let settings = { ...DEFAULTS, ...stored, overrides: stored.overrides || {} };
const $ = selector => document.querySelector(selector);
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
const persist = () => localStorage.setItem(key, JSON.stringify(settings));
const amount = value => new Intl.NumberFormat('ko-KR').format(value);
const numeric = value => Number(String(value).replace(/\D/g, '')) || 0;

function formatAmountInput(input) {
  const before = input.selectionStart ?? input.value.length;
  const digitsBefore = input.value.slice(0, before).replace(/\D/g, '').length;
  const digits = input.value.replace(/\D/g, '');
  input.value = digits ? amount(Number(digits)) : '';
  let position = 0;
  let seen = 0;
  while (position < input.value.length && seen < digitsBefore) {
    if (/\d/.test(input.value[position])) seen++;
    position++;
  }
  input.setSelectionRange(position, position);
}

function recommendationText(top, ranking) {
  if (!top?.fits) {
    const budgetFit = ranking.some(x => x.calc.remaining >= 0 && x.calc.capacity >= settings.people);
    return budgetFit && settings.privateRooms
      ? '침실 내 욕실 2개 이상이 확인된 후보가 현재 가견적과 예산을 함께 만족하지 않습니다. 숙박비·예산을 조정하거나 숙소에 욕실 배치를 확인하세요.'
      : '현재 예산과 인원을 모두 만족하는 후보가 없습니다. 예산·숙박비·인원을 조정해 보세요.';
  }
  const reason = { balance: '팀 활동과 휴식의 균형', team: '팀 대화와 공동 활동', rest: '일정의 여유와 휴식', budget: '예산 여유' }[settings.priority];
  return `${reason}을 중심으로 비교했습니다. 예산 ${currency(top.calc.remaining)} 여유 · 1인 ${currency(top.calc.perPerson)}. 숙박비는 날짜가 정해지지 않은 기획 가정액입니다.${settings.rain ? ' 우천·통제 우려 시 등반을 강행하지 말고 공단 안내를 확인한 뒤 날짜를 다시 정하세요.' : ''}`;
}

function renderRecommendation(ranking) {
  const top = ranking[0];
  $('#recommendation').innerHTML = `<div><div class="rec-kicker">CONDITION BASED PICK</div><div class="rec-title">${top.fits ? `현재 추천 · ${top.candidate.title}` : '조건에 맞는 안을 찾는 중'}</div><div class="rec-description">${escapeHtml(recommendationText(top, ranking))}</div></div>${top.fits ? `<button type="button" class="rec-action" data-select="${top.candidate.id}">추천안 자세히 보기 ↗</button>` : ''}`;
}

function card(candidate) {
  const calc = calculate(candidate, settings);
  const over = calc.remaining < 0;
  const capacityFail = calc.capacity < settings.people;
  const privacyFail = settings.privateRooms && candidate.ensuiteVerified < 2;
  const roomFail = candidate.bedrooms < Math.ceil(settings.people / 2);
  const detail = capacityFail ? `정원 부족 · 현재 ${calc.capacity}명` : roomFail ? `침실 ${candidate.bedrooms}개 · ${settings.people}명 2인 배정 불가` : privacyFail ? '침실 내 욕실 2개 이상 미확인' : over ? `예산 ${currency(-calc.remaining)} 초과` : `예산 ${currency(calc.remaining)} 여유`;
  return `<article class="card ${settings.selected === candidate.id ? 'selected' : ''}" aria-label="${candidate.title}"><div class="card-top"><div class="card-topline"><span class="card-number">OPTION / ${candidate.no}</span><span class="badge">${candidate.tag}</span></div><h3>${candidate.title}</h3><p class="card-subtitle">${candidate.subtitle}</p><p class="card-location">↗ ${candidate.area}</p></div><div class="card-stay"><span class="mini-label">STAY / 숙박</span><strong>${candidate.lodging}</strong><span class="stay-status">${candidate.ensuiteVerified >= 2 ? `침실 내 욕실 ${candidate.ensuiteVerified}개 안내` : `욕실 총 ${candidate.bathrooms}개 · 침실 내 위치 미확인`}</span><a href="${candidate.lodgingUrl}" target="_blank" rel="noopener noreferrer">숙소 안내 보기 ↗</a></div><div class="timeline-summary"><p><b>DAY 1</b>${candidate.day1[2][1]}<br><b></b>${candidate.day1[4][1]}</p><p><b>DAY 2</b>${candidate.day2[2][1]}<br><b></b>${candidate.day2[3][1]}</p></div><div class="card-bottom"><div class="price-row"><strong>${currency(calc.total)}</strong><span>총 예상 비용</span></div><p class="sub-price">1인 ${currency(calc.perPerson)} · ${settings.people}명 기준 · 숙박비 가정</p><div class="budget-line ${over || capacityFail || privacyFail || roomFail ? 'over' : ''}">${detail}</div><button class="card-button" type="button" data-select="${candidate.id}">${settings.selected === candidate.id ? '선택한 안 · 상세 보기' : '상세 일정 · 견적 보기'}</button></div></article>`;
}

function renderDetail() {
  const candidate = CANDIDATES.find(x => x.id === settings.selected) || CANDIDATES[0];
  const calc = calculate(candidate, settings);
  const schedule = (entries, label) => `<div><div class="day-heading">${label}</div>${entries.map(([time, description]) => `<div class="schedule-item"><time>${time}</time><span>${description}</span></div>`).join('')}</div>`;
  $('#detail').innerHTML = `<div class="detail-title"><h3>${candidate.title}</h3><small>${candidate.area}</small></div><p class="notice">${candidate.lodging} · <a href="${candidate.lodgingUrl}" target="_blank" rel="noopener noreferrer">숙소 안내 ↗</a><br>${candidate.lodgingNote}<br>숙박비는 실제 견적이 아닌 기획 가정액입니다. 날짜를 정한 뒤 8인 요금·예약 가능 여부를 확인하세요.<br>첫날 산행: 소공원–흔들바위–울산바위 왕복. 도시락·물·등산화 준비, 현지 도착 시간과 입산 가능 시간 확인.${settings.rain ? '<br><strong>우천·통제 우려:</strong> 탐방로가 통제되거나 날씨가 나쁘면 등반을 강행하지 않고 워크샵 날짜를 조정하세요.' : ''}</p><div class="schedule-grid">${schedule(candidate.day1, 'DAY 1 · 울산바위 등반')}${schedule(candidate.day2, 'DAY 2 · 점심 · 산책 · 복귀')}</div><div class="breakdown-heading">항목별 금액 조정</div><div class="cost-edit-grid">${COST_ROWS.map(row => `<label for="cost-${row.key}">${row.label}<input id="cost-${row.key}" data-cost="${row.key}" ${row.kind === 'quantity' ? 'type="number" min="0" max="40" step="1"' : 'type="text"'} inputmode="numeric" value="${row.kind === 'quantity' ? calc.costs[row.key] : amount(calc.costs[row.key])}" aria-label="${row.label} (${row.unit})"></label>`).join('')}</div>`;
  const status = calc.capacity < settings.people ? `숙소 정원 ${calc.capacity}명 · ${settings.people}명 수용 불가` : candidate.bedrooms < Math.ceil(settings.people / 2) ? `침실 ${candidate.bedrooms}개 · 2인씩 배정 불가` : settings.privateRooms && candidate.ensuiteVerified < 2 ? '침실 내 욕실 2개 이상 확인 필요 · 추천에서 제외' : calc.remaining < 0 ? `예산 ${currency(-calc.remaining)} 초과` : `예산 내 · ${currency(calc.remaining)} 여유`;
  $('#estimate').innerHTML = `<div class="estimate-total">${currency(calc.total)}</div><p class="estimate-per">1인당 ${currency(calc.perPerson)} · ${settings.people}명</p><div class="estimate-row"><span>숙박 (가정액)</span><b>${currency(calc.items.stay)}</b></div><div class="estimate-row"><span>식사 4회</span><b>${currency(calc.items.meals)}</b></div><div class="estimate-row"><span>산행 물·간식 등</span><b>${currency(calc.items.activity)}</b></div><div class="estimate-row"><span>이동</span><b>${currency(calc.items.transport)}</b></div><div class="estimate-row"><span>예비비</span><b>${currency(calc.items.buffer)}</b></div><div class="estimate-status ${calc.remaining < 0 || calc.capacity < settings.people || (settings.privateRooms && candidate.ensuiteVerified < 2) ? 'over' : ''}">${status}</div>`;
}

function render(syncInputs = false) {
  if (syncInputs) {
    $('#people').value = settings.people;
    $('#budget').value = amount(settings.budget);
    $(`input[name="priority"][value="${settings.priority}"]`).checked = true;
    $('#privateRooms').checked = settings.privateRooms;
    $('#rain').checked = settings.rain;
  }
  const ranking = rankCandidates(settings);
  renderRecommendation(ranking);
  $('#cards').innerHTML = CANDIDATES.map(card).join('');
  renderDetail();
}

document.addEventListener('click', event => {
  const selector = event.target.closest('[data-select]');
  if (selector) { settings.selected = selector.dataset.select; persist(); render(); $('#detail-heading').scrollIntoView({ behavior:'smooth', block:'start' }); }
});
$('#people').addEventListener('change', e => { settings.people = Math.max(1, Math.min(40, Number(e.target.value) || 8)); persist(); render(true); });
$('#budget').addEventListener('input', e => { formatAmountInput(e.target); settings.budget = Math.max(1, numeric(e.target.value)); persist(); render(); });
$('#budget').addEventListener('change', e => { settings.budget = Math.max(1, numeric(e.target.value)); persist(); render(true); });
$('#priority').addEventListener('change', e => { settings.priority = e.target.value; persist(); render(); });
$('#privateRooms').addEventListener('change', e => { settings.privateRooms = e.target.checked; persist(); render(); });
$('#rain').addEventListener('change', e => { settings.rain = e.target.checked; persist(); render(); });
$('#detail').addEventListener('change', e => {
  const costKey = e.target.dataset.cost;
  if (!costKey) return;
  const candidate = CANDIDATES.find(x => x.id === settings.selected);
  settings.overrides[candidate.id] ||= {};
  settings.overrides[candidate.id][costKey] = Math.max(0, numeric(e.target.value));
  persist(); render();
});
$('#detail').addEventListener('input', e => { if (e.target.dataset.cost && e.target.type === 'text') formatAmountInput(e.target); });
$('#reset').addEventListener('click', () => { settings = structuredClone(DEFAULTS); persist(); render(true); });
render(true);
