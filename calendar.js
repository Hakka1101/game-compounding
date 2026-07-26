// ═══════════════════════════════════════════════════════
//  暦  ─  1週5日 / 1月4週=20日 / 1年8月=160日
//  月齢は月の日付から決まる（10日=満月、20日=新月）
//  天候は現在保留（季節と月齢のみを採取条件に使う）
//  依存: CALENDAR_DATA
// ═══════════════════════════════════════════════════════

const CAL = CALENDAR_DATA.settings;
const DAYS_PER_MONTH = CAL.daysPerWeek * CAL.weeksPerMonth;
const DAYS_PER_YEAR  = DAYS_PER_MONTH * CAL.monthsPerYear;

const TIME_SLOTS = [
    { id: 'dawn',      name: '夜明け' },
    { id: 'morning',   name: '朝'     },
    { id: 'noon',      name: '昼'     },
    { id: 'afternoon', name: '午後'   },
    { id: 'night',     name: '夜'     },
    { id: 'midnight',  name: '深夜'   },
];

const moonByDay = new Map(CALENDAR_DATA.moon.map(m => [m.day, m]));

// ── 通算日（0起点）から日付を組み立てる ──
function dateOf(dayIndex) {
    const y  = Math.floor(dayIndex / DAYS_PER_YEAR) + 1;
    const doy = dayIndex % DAYS_PER_YEAR;
    const mi = Math.floor(doy / DAYS_PER_MONTH);
    const dom = (doy % DAYS_PER_MONTH) + 1;
    const month = CALENDAR_DATA.months[mi];
    const weekday = CALENDAR_DATA.weekdays[(dom - 1) % CAL.daysPerWeek];
    const moon = moonByDay.get(dom) || { name: '', condition: null };
    return {
        index: dayIndex,
        year: y, monthNo: month.no, monthName: month.name, season: month.season,
        day: dom, weekday: weekday.name,
        moonName: moon.name, moonCondition: moon.condition,
        remaining: CAL.deadlineDays - dayIndex,
    };
}

function formatDate(d) {
    return `${d.year}年 ${d.monthName} ${d.day}日（${d.weekday}）`;
}


// ── その日に成立している採取条件（季節・月齢）──
function conditionsOf(date) {
    const set = new Set([date.season]);
    if (date.moonCondition) set.add(date.moonCondition);
    return set;
}

function conditionMet(condition, date) {
    if (!condition) return true;
    return conditionsOf(date).has(condition);
}

// ── 次にその月齢が巡ってくるまで何日か ──
//  満月を待って休む、という判断のために要る
function daysUntilMoon(dayIndex, conditionName) {
    for (let i = 0; i <= DAYS_PER_MONTH; i++) {
        if (dateOf(dayIndex + i).moonCondition === conditionName) return i;
    }
    return null;
}

// ── 一日の行動 ──
//  探索：時間帯を一つ選び、最大10ターン・最大3マップ
//  休む：何もせず日を送る（狙った月齢・天候を待つため）
function newDayState(dayIndex) {
    const date = dateOf(dayIndex);
    return {
        date,
        conditions: [...conditionsOf(date)],
        timeSlot: null,
        turnsLeft: CAL.turnsPerDay,
        mapsVisited: [],
        acted: false,
    };
}

if (typeof module !== 'undefined') {
    module.exports = { CAL, DAYS_PER_MONTH, DAYS_PER_YEAR, TIME_SLOTS,
                       dateOf, formatDate, conditionsOf, conditionMet, newDayState, daysUntilMoon };
}
