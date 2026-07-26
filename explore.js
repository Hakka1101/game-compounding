// ═══════════════════════════════════════════════════════
//  採取  ─  一日の行動
//   一日は「出かける前 → 探索中 → 帰宅後」の三つの段。
//   ・出かける時間帯は一日にひとつだけ選べる
//   ・10ターン。マスを一つ調べるごとに1ターン
//   ・マップは一日3つまで。工房から最初の場所へ出るのは無料。
//     その日のうちに別の場所へ移るときだけ1ターン
//   ・ターンを使い切ると家に帰る。途中で切り上げてもよい
//   ・出かけない日は「休む」で日を送る（狙った月齢を待つため）
//  依存: TERRAINS_DATA / SPAWNS_DATA / CALENDAR_DATA / calendar.js
// ═══════════════════════════════════════════════════════

const terrainById = new Map(TERRAINS_DATA.terrains.map(t => [t.id, t]));
const areaById    = new Map(TERRAINS_DATA.areas.map(a => [a.id, a]));

// 地形×時間帯で引けるように索引化
const spawnIndex = new Map();
SPAWNS_DATA.forEach(s => {
    const k = `${s.terrainId}|${s.timeSlot}`;
    if (!spawnIndex.has(k)) spawnIndex.set(k, []);
    spawnIndex.get(k).push(s);
});

const explore = {
    day: null,          // calendar.js の newDayState
    phase: 'before',    // before（出かける前）/ out（探索中）/ after（帰宅後）
    areaId: null,
    searched: new Set(),// この日に調べたマス "areaId:y,x"
    log: [],            // 今日の記録
    haul: {},           // 今日の収穫 itemId → 個数
};

// ═══════════════════════════════════════════════════════
//  一日の進行
// ═══════════════════════════════════════════════════════
function startDay(dayIndex) {
    explore.day = newDayState(dayIndex);
    explore.phase = 'before';
    explore.areaId = null;
    explore.searched = new Set();
    explore.log = [];
    explore.haul = {};
}

// 出かけずに日を送る。狙った月齢を待つときに使う
function restDay() {
    if (explore.phase === 'out') return flash('まだ外にいる。');
    state.restedDays++;
    startDay(explore.day.date.index + 1);
    saveGame();
    renderAll();
    openMorning();
    flash('一日を見送った。');
}

// 帰宅後に翌日へ
function nextDay() {
    startDay(explore.day.date.index + 1);
    saveGame();
    renderAll();
    openMorning();
}

// 家へ帰る。ターンを使い切ったときは自動で呼ばれる
function goHome(auto) {
    if (explore.phase !== 'out') return;
    explore.phase = 'after';
    explore.areaId = null;
    renderExplore();
    flash(auto ? '日が暮れた。家へ帰る。' : '切り上げて家へ帰った。');
}

function chooseTimeSlot(slotId) {
    if (explore.phase !== 'before' || explore.day.timeSlot) return;
    explore.day.timeSlot = slotId;
    renderExplore();
}

// マップに入る／移る。移動には1ターン
function enterArea(areaId) {
    const d = explore.day;
    if (explore.phase === 'after') return flash('今日はもう帰ってきた。');
    if (!d.timeSlot) return flash('出かける時間帯を決めてください。');
    if (areaId === explore.areaId) return;
    if (d.mapsVisited.includes(areaId)) {
        // 一度行った場所へ戻るのも移動には違いない
    } else if (d.mapsVisited.length >= CAL.maxMapsPerDay) {
        return flash(`一日に回れるのは ${CAL.maxMapsPerDay} か所まで。`);
    }
    // 工房から最初の場所へ出るぶんはターンを使わない。
    // 日のうちに場所を移るときだけ歩く時間がかかる。
    const isFirst = d.mapsVisited.length === 0;
    if (!isFirst) {
        if (d.turnsLeft < CAL.travelCost) return flash('今日はもう歩けない。');
        d.turnsLeft -= CAL.travelCost;
    }
    if (!d.mapsVisited.includes(areaId)) d.mapsVisited.push(areaId);
    if (isFirst) state.exploredDays++;
    explore.areaId = areaId;
    explore.phase = 'out';
    explore.log.push({ kind: 'move',
        text: isFirst ? `${areaById.get(areaId).name}へ出かけた。`
                      : `${areaById.get(areaId).name}へ移った。` });
    renderExplore();
}

// マスを調べる。1ターン
function searchCell(y, x) {
    const d = explore.day;
    if (!explore.areaId) return;
    const key = `${explore.areaId}:${y},${x}`;
    if (explore.searched.has(key)) return flash('そこはもう調べた。');
    if (d.turnsLeft <= 0) return flash('今日はもう日が暮れる。');

    d.turnsLeft--;
    explore.searched.add(key);

    const area = areaById.get(explore.areaId);
    const terId = area.grid[y][x];
    const found = rollCell(terId, d.timeSlot, d.date);

    found.forEach(f => {
        addToStock(f.itemId, f.quantity);
        state.everHeld[f.itemId] = true;
        explore.haul[f.itemId] = (explore.haul[f.itemId] || 0) + f.quantity;
    });
    saveGame();   // 一マスごとに保存する。巻き戻して引き直せないように
    explore.log.push({
        kind: 'search',
        terrain: terrainById.get(terId).name,
        found: found.map(f => ({ name: itemById.get(f.itemId)?.name || f.itemId, n: f.quantity })),
    });
    renderExplore();
    renderItemList();
    if (d.turnsLeft <= 0) goHome(true);
}

// そのマスで何が採れるか。
//  常在（出現率0.25以上）からは重み付きで1〜3種を必ず得る。数は1〜4個。
//  稀少（0.25未満）は独立に判定し、当たれば1〜2個。
//  こう分けないと、候補が稀少しかない地形で毎回それが出てしまう。
const RARE_LINE = 0.25;

function rollCell(terrainId, timeSlot, date) {
    const rows = (spawnIndex.get(`${terrainId}|${timeSlot}`) || [])
        .filter(s => conditionMet(s.condition, date));
    const out = [];

    // ── 稀少：一つずつ独立に判定。当たれば1〜2個 ──
    const rare = rows.filter(s => s.rate < RARE_LINE);
    rare.forEach(s => {
        if (Math.random() < s.rate) {
            out.push({ itemId: s.itemId, quantity: Math.random() < 0.3 ? 2 : 1, rare: true });
        }
    });

    // ── 常在：重み付きで1〜2種 ──
    // 1種45% / 2種40% / 3種15%
    const pool = rows.filter(s => s.rate >= RARE_LINE);
    const roll = Math.random();
    const kinds = Math.min(pool.length, roll < 0.45 ? 1 : roll < 0.85 ? 2 : 3);
    const picked = [];
    for (let i = 0; i < kinds; i++) {
        const rest = pool.filter(s => !picked.includes(s));
        if (!rest.length) break;
        picked.push(pickWeighted(rest));
    }
    picked.forEach(s => {
        if (out.some(o => o.itemId === s.itemId)) return;
        out.push({ itemId: s.itemId, quantity: amountFor(s.rate), rare: false });
    });
    return out;
}

function pickWeighted(rows) {
    const total = rows.reduce((n, s) => n + s.rate, 0);
    let x = Math.random() * total;
    for (const s of rows) { x -= s.rate; if (x < 0) return s; }
    return rows[rows.length - 1];
}

// ありふれたものほど多く採れる
function amountFor(rate) {
    const lo = rate >= 0.45 ? 2 : 1;
    const hi = rate >= 0.45 ? 4 : rate >= 0.35 ? 3 : 2;
    return lo + Math.floor(Math.random() * (hi - lo + 1));
}

function addToStock(itemId, n) {
    state.stock[itemId] = (state.stock[itemId] || 0) + n;
}

// ═══════════════════════════════════════════════════════
//  画面
// ═══════════════════════════════════════════════════════
function renderExplore() {
    const ph = explore.phase;
    document.getElementById('phase-before').classList.toggle('hidden', ph !== 'before');
    document.getElementById('phase-out').classList.toggle('hidden', ph !== 'out');
    document.getElementById('phase-after').classList.toggle('hidden', ph !== 'after');
    // 外にいるあいだは工房に戻れない
    const craftTab = document.querySelector('.view-tab[data-view="craft"]');
    if (craftTab) craftTab.disabled = (ph === 'out');
    if (ph === 'out') showView('explore');

    renderDayBar();
    renderAreaPicker();
    renderMap();
    renderExploreLog();
    if (ph === 'after') renderHaul();
}

function renderDayBar() {
    const d = explore.day;
    document.getElementById('day-date').textContent = formatDate(d.date);
    document.getElementById('day-moon').textContent = d.date.moonName;
    document.getElementById('day-remaining').textContent = `残り ${d.date.remaining} 日`;
    document.getElementById('day-turns').textContent =
        explore.phase === 'out'   ? `残り ${d.turnsLeft} ターン`
      : explore.phase === 'after' ? '帰宅した'
      : '家にいる';
    document.getElementById('btn-rest').classList.toggle('hidden', explore.phase !== 'before');
    document.getElementById('btn-next-day').classList.toggle('hidden', explore.phase !== 'after');

    const box = document.getElementById('timeslot-btns');
    box.innerHTML = '';
    TIME_SLOTS.forEach(t => {
        const b = document.createElement('button');
        b.className = 'slot-btn' + (d.timeSlot === t.id ? ' active' : '');
        b.textContent = t.name;
        b.disabled = !!d.timeSlot && d.timeSlot !== t.id;
        b.addEventListener('click', () => chooseTimeSlot(t.id));
        box.appendChild(b);
    });
    document.getElementById('timeslot-note').textContent =
        d.timeSlot ? '今日はこの時間帯だけ。' : '出かける時間帯を一つ選ぶ。今日は変えられない。';
    const slotName = (TIME_SLOTS.find(t => t.id === d.timeSlot) || {}).name || '';
    const outSlot = document.getElementById('out-slot');
    if (outSlot) outSlot.textContent = slotName;
}

function renderAreaPicker() {
    const d = explore.day;
    const box = document.getElementById(explore.phase === 'out' ? 'area-btns-out' : 'area-btns');
    if (!box) return;
    box.innerHTML = '';
    TERRAINS_DATA.areas.forEach(a => {
        const been = d.mapsVisited.includes(a.id);
        const b = document.createElement('button');
        b.className = 'area-btn' + (explore.areaId === a.id ? ' active' : '') + (been ? ' been' : '');
        b.textContent = a.name;
        const isFirst = d.mapsVisited.length === 0;
        b.disabled = !d.timeSlot ||
            (!been && d.mapsVisited.length >= CAL.maxMapsPerDay) ||
            (!isFirst && d.turnsLeft < CAL.travelCost);
        b.addEventListener('click', () => enterArea(a.id));
        box.appendChild(b);
    });
    const note = document.getElementById('area-note');
    if (note) note.textContent = d.mapsVisited.length === 0
        ? `一日に回れるのは ${CAL.maxMapsPerDay} か所まで。出かけるだけならターンは要らない。`
        : `回った場所 ${d.mapsVisited.length} / ${CAL.maxMapsPerDay}　場所を移ると ${CAL.travelCost} ターン`;

    // 休む判断のための手がかり。満月を待つために日を送ることがある
    const rest = document.getElementById('rest-note');
    if (rest) {
        const toFull = daysUntilMoon(d.date.index, '満月');
        const toNew  = daysUntilMoon(d.date.index, '新月');
        const bits = [];
        if (toFull === 0) bits.push('今夜は満月。');
        else if (toFull !== null) bits.push(`次の満月まで あと ${toFull} 日。`);
        if (toNew === 0) bits.push('今夜は新月。');
        rest.textContent = bits.join('') + '出かけずに日を送る。';
    }
}

function renderMap() {
    const box = document.getElementById('map-grid');
    const legend = document.getElementById('map-legend');
    box.innerHTML = '';
    legend.innerHTML = '';

    if (!explore.areaId) {
        box.innerHTML = '<p class="map-empty">向かう場所を決める。</p>';
        return;
    }
    const area = areaById.get(explore.areaId);
    const used = new Map();

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const ter = terrainById.get(area.grid[y][x]);
            used.set(ter.id, ter);
            const done = explore.searched.has(`${explore.areaId}:${y},${x}`);
            const c = document.createElement('button');
            c.className = 'map-cell' + (done ? ' searched' : '');
            c.style.background = ter.color;
            c.title = ter.name;
            c.setAttribute('aria-label', `${ter.name}（${y + 1}行${x + 1}列）`);
            c.disabled = done || explore.day.turnsLeft <= 0;
            c.addEventListener('click', () => searchCell(y, x));
            box.appendChild(c);
        }
    }
    [...used.values()].forEach(t => {
        const s = document.createElement('span');
        s.className = 'legend-item';
        s.innerHTML = `<i style="background:${t.color}"></i>${t.name}`;
        s.title = t.description || '';
        legend.appendChild(s);
    });
}

// 帰宅後、その日の収穫をまとめて見せる
function renderHaul() {
    const box = document.getElementById('haul-list');
    const entries = Object.entries(explore.haul);
    document.getElementById('haul-summary').textContent =
        entries.length
            ? `${entries.length} 種 ／ 合わせて ${entries.reduce((n, [, v]) => n + v, 0)} 点`
            : '手ぶらで帰ってきた。';
    box.innerHTML = '';
    entries
        .sort((a, b) => b[1] - a[1])
        .forEach(([id, n]) => {
            const it = itemById.get(id);
            const cat = catById.get(it?.categoryId);
            const li = document.createElement('li');
            li.className = 'haul-entry';
            li.innerHTML = `<span class="item-cat-icon">${cat ? cat.icon : '？'}</span>` +
                           `<span class="item-name">${it ? it.name : id}</span>` +
                           `<span class="item-count">${n}</span>`;
            box.appendChild(li);
        });
}

function renderExploreLog() {
    const box = document.getElementById('explore-log');
    box.innerHTML = '';
    if (!explore.log.length) {
        box.innerHTML = '<p class="log-empty">まだ何もしていない。</p>';
        return;
    }
    explore.log.slice().reverse().forEach(e => {
        const p = document.createElement('p');
        p.className = 'log-line';
        if (e.kind === 'move') {
            p.innerHTML = `<span class="log-move">${e.text}</span>`;
        } else if (!e.found.length) {
            p.innerHTML = `<span class="log-ter">${e.terrain}</span><span class="log-none">何も見つからなかった。</span>`;
        } else {
            const list = e.found.map(f => `${f.name}${f.n > 1 ? `×${f.n}` : ''}`).join('、');
            p.innerHTML = `<span class="log-ter">${e.terrain}</span><span class="log-got">${list}</span>`;
        }
        box.appendChild(p);
    });
}
