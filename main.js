// ═══════════════════════════════════════════════════════
//  調合所 main.js  ─ Phase 1：調合システム単体
//  依存: ITEMS_DATA / RECIPES_DATA / PROCESSES_DATA
//        HINTS_DATA / dataCategories / data_effects
//  探索・売買は未実装。採取品と購入品は無限に使える扱い。
// ═══════════════════════════════════════════════════════

const MAX_SLOTS = 5;
const VESSEL_GLASS = 'item_088';   // ガラス瓶：気体用
const VESSEL_PHIAL = 'item_175';   // 薬瓶　　：液体用
const START_VESSELS = 8;

const SLOT_NUMS = ['①', '②', '③', '④', '⑤'];

// ── 索引 ──
const itemById   = new Map(ITEMS_DATA.map(i => [i.id, i]));
const itemByName = new Map(ITEMS_DATA.map(i => [i.name, i]));
const procById   = new Map(PROCESSES_DATA.map(p => [p.id, p]));
const catById    = new Map(dataCategories.map(c => [c.id, c]));

const recipeByResult = new Map(RECIPES_DATA.map(r => [r.result, r]));

const hintsByResult = new Map();
(typeof HINTS_DATA !== 'undefined' ? HINTS_DATA : []).forEach(h => {
    if (!hintsByResult.has(h.result)) hintsByResult.set(h.result, []);
    hintsByResult.get(h.result).push(h);
});

// AI_TECHNICAL_SPEC「完全一致 → 抽象一致」。
// itemId 指定が多いレシピほど先に判定する。
const RECIPES_SORTED = [...RECIPES_DATA].sort((a, b) => score(b) - score(a));
function score(r) {
    return r.ingredients.reduce((n, g) =>
        n + (g.checkType === 'itemId' ? 10 : 1) + (g.checkType2 ? 1 : 0), 0);
}

// ── 状態 ──
const state = {
    slots: [],              // [{ item, processId }]
    vesselId: null,
    stock: {},              // 所持数
    vessels: { [VESSEL_GLASS]: START_VESSELS, [VESSEL_PHIAL]: START_VESSELS },
    unlockedRecipes: [],
    filter: 'all',
    query: '',
    memoItem: null,      // 左に出す素材
    memoSlip: null,      // 右に出す紙片 "result#no"
    slipFilter: 'all',
};

// 探索を実装したので、素材はすべて有限。
// 遺物のうち瓶だけは売買が未実装のあいだ仮支給する。
function held(id) {
    if (id === VESSEL_GLASS || id === VESSEL_PHIAL) return state.vessels[id];
    return state.stock[id] || 0;
}

// ═══════════════════════════════════════════════════════
//  初期化
// ═══════════════════════════════════════════════════════
function init() {
    Object.assign(state, freshProgress());
    startDay(0);
    if (!loadGame()) saveGame();
    buildViewTabs();
    document.getElementById('btn-refuse').addEventListener('click', refuseBuyer);
    document.getElementById('btn-event-ok').addEventListener('click', () => nextEvent());
    document.getElementById('btn-ending-ok').addEventListener('click', restartGame);
    document.getElementById('btn-save-menu').addEventListener('click', openSaveMenu);
    document.getElementById('btn-rest').addEventListener('click', restDay);
    document.getElementById('btn-rest-big').addEventListener('click', restDay);
    document.getElementById('btn-next-day').addEventListener('click', nextDay);
    document.getElementById('btn-home').addEventListener('click', () => goHome(false));
    buildFilters();
    buildSlipFilters();
    document.getElementById('item-search')
        .addEventListener('input', e => { state.query = e.target.value.trim(); renderItemList(); });
    document.getElementById('btn-compound').addEventListener('click', handleCompound);
    document.getElementById('btn-reset').addEventListener('click', handleReset);
    document.querySelectorAll('.vessel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.vesselId = btn.dataset.vessel || null;
            renderVessels();
            clearResultIfIdle();
        });
    });
    renderAll();
}

function renderAll() {
    renderItemList();
    renderWorkspace();
    renderVessels();
    renderRecipeBook();
    renderSlipIndex();
    renderItemMemo();
    renderSlipMemo();
    renderExplore();
    renderShop();
}

// ── 調合所と採取を行き来する ──
function buildViewTabs() {
    document.querySelectorAll('.view-tab').forEach(tab => {
        tab.addEventListener('click', () => showView(tab.dataset.view));
    });
}

function showView(v) {
    document.querySelectorAll('.view-tab').forEach(t =>
        t.classList.toggle('active', t.dataset.view === v));
    document.querySelector('.game-main').classList.toggle('hidden', v !== 'craft');
    document.getElementById('view-explore').classList.toggle('hidden', v !== 'explore');
    document.getElementById('view-shop').classList.toggle('hidden', v !== 'shop');
}

// ═══════════════════════════════════════════════════════
//  朝の出来事と、一年の終わり
// ═══════════════════════════════════════════════════════
let eventQueue = [];

function openMorning() {
    const day = explore.day.date.index;
    if (day >= CAL.deadlineDays) return showEnding();
    eventQueue = dueEvents(day);
    nextEvent(true);
}

function nextEvent(first) {
    if (!first) {
        const done = eventQueue.shift();
        if (done) { applyEvent(done, explore.day.date.index); saveGame(); renderAll(); }
    }
    const ev = eventQueue[0];
    const box = document.getElementById('event-overlay');
    if (!ev) { box.classList.add('hidden'); return; }
    document.getElementById('event-title').textContent = ev.title;
    document.getElementById('event-text').textContent = ev.text;
    box.classList.remove('hidden');
}

function showEnding() {
    const e = judgeEnding();
    state.ended = e.id;
    saveGame();
    document.getElementById('ending-title').textContent = e.title;
    document.getElementById('ending-text').textContent = e.text;
    const ul = document.getElementById('ending-notes');
    ul.innerHTML = '';
    e.notes.forEach(t => {
        const li = document.createElement('li');
        li.textContent = t;
        ul.appendChild(li);
    });
    document.getElementById('ending-overlay').classList.remove('hidden');
}

function restartGame() {
    clearSave();
    location.reload();
}

// ── 保存の書き出しと読み込み ──
function openSaveMenu() {
    const code = prompt(
        '続きは自動で保存されています。\n' +
        'この文字列を控えておけば、別の環境でも再開できます。\n' +
        '再開するときは、受け取った文字列をここに貼って OK を押してください。',
        exportSave());
    if (code === null) return;
    if (code.trim() === exportSave()) return;
    if (importSave(code)) { saveGame(); renderAll(); flash('続きを読み込みました。'); }
    else flash('読み込めませんでした。');
}

// ═══════════════════════════════════════════════════════
//  左：素材リスト
// ═══════════════════════════════════════════════════════
const FILTERS = [
    { id: 'all',      label: 'すべて' },
    { id: 'flora',    label: '植物'   },
    { id: 'fungi',    label: '菌類'   },
    { id: 'liquid',   label: '水質'   },
    { id: 'mineral',  label: '鉱物'   },
    { id: 'creature', label: '動物'   },
    { id: 'relics',   label: '遺物'   },
    { id: 'processed',label: '加工品' },
];

function buildFilters() {
    const box = document.getElementById('item-filters');
    box.innerHTML = '';
    FILTERS.forEach(f => {
        const b = document.createElement('button');
        b.className = 'filter-btn' + (f.id === state.filter ? ' active' : '');
        b.textContent = f.label;
        b.dataset.cat = f.id;
        b.addEventListener('click', () => {
            state.filter = f.id;
            box.querySelectorAll('.filter-btn').forEach(x =>
                x.classList.toggle('active', x.dataset.cat === f.id));
            renderItemList();
        });
        box.appendChild(b);
    });
}

function visibleItems() {
    return ITEMS_DATA.filter(it => {
        if (it.id === VESSEL_GLASS || it.id === VESSEL_PHIAL) return false;
        if (held(it.id) <= 0) return false;
        if (state.filter !== 'all' && it.categoryId !== state.filter) return false;
        if (state.query && !it.name.includes(state.query)) return false;
        return true;
    });
}

function renderItemList() {
    const list = document.getElementById('item-list');
    const items = visibleItems();
    list.innerHTML = '';

    if (!items.length) {
        const li = document.createElement('li');
        li.className = 'item-empty';
        li.textContent = '── 該当する素材がありません ──';
        list.appendChild(li);
    }

    items.forEach(item => {
        const picked = state.slots.some(s => s.item.id === item.id);
        const cat = catById.get(item.categoryId);
        const n = held(item.id);

        const li = document.createElement('li');
        li.className = 'item-entry available' + (picked ? ' selected' : '');
        li.dataset.id = item.id;
        li.title = item.description || '';
        li.innerHTML =
            `<span class="item-cat-icon">${cat ? cat.icon : '？'}</span>` +
            `<span class="item-name">${item.name}</span>` +
            `<span class="item-count">${n}</span>`;
        li.addEventListener('click', () => handleItemClick(item.id));
        list.appendChild(li);
    });

    document.getElementById('item-total').textContent = `${items.length} 種`;
}

// ═══════════════════════════════════════════════════════
//  中央：調合台
// ═══════════════════════════════════════════════════════
function renderWorkspace() {
    const box = document.getElementById('ingredient-slots');
    box.innerHTML = '';
    for (let i = 0; i < MAX_SLOTS; i++) {
        box.appendChild(state.slots[i] ? buildFilledSlot(i, state.slots[i]) : buildEmptySlot(i));
    }
}

function buildFilledSlot(index, entry) {
    const cat = catById.get(entry.item.categoryId);
    const btns = PROCESSES_DATA.map(p =>
        `<button class="process-btn${entry.processId === p.id ? ' active' : ''}" data-process="${p.id}">${p.name}</button>`
    ).join('');

    const el = document.createElement('div');
    el.className = 'ingredient-slot filled';
    el.dataset.slot = index;
    el.innerHTML =
        `<div class="slot-header-row">` +
            `<span class="slot-num">${SLOT_NUMS[index]}</span>` +
            `<span class="slot-item-icon">${cat ? cat.icon : '？'}</span>` +
            `<span class="slot-item-name">${entry.item.name}</span>` +
            `<button class="slot-remove-btn" title="取り除く">✕</button>` +
        `</div>` +
        `<div class="slot-process-row">` +
            `<span class="process-label">工程 ▶</span>` +
            `<div class="process-btns" role="group">${btns}</div>` +
        `</div>`;

    el.querySelector('.slot-remove-btn').addEventListener('click', () => handleRemoveSlot(index));
    el.querySelectorAll('.process-btn').forEach(b =>
        b.addEventListener('click', () => handleProcessSelect(index, b.dataset.process)));
    return el;
}

function buildEmptySlot(index) {
    const el = document.createElement('div');
    el.className = 'ingredient-slot empty';
    el.dataset.slot = index;
    el.innerHTML =
        `<div class="slot-header-row">` +
            `<span class="slot-num">${SLOT_NUMS[index]}</span>` +
            `<span class="slot-empty-text">── 素材を選んでください ──</span>` +
        `</div>`;
    return el;
}

function renderVessels() {
    document.querySelectorAll('.vessel-btn').forEach(btn => {
        const id = btn.dataset.vessel || null;
        btn.classList.toggle('active', state.vesselId === id);
        const c = btn.querySelector('.vessel-count');
        if (c) c.textContent = state.vessels[id] ?? 0;
        btn.disabled = id !== null && state.vessels[id] <= 0;
    });
}

// ═══════════════════════════════════════════════════════
//  操作
// ═══════════════════════════════════════════════════════
function handleItemClick(itemId) {
    state.memoItem = itemId;
    const at = state.slots.findIndex(s => s.item.id === itemId);
    if (at !== -1) {
        state.slots.splice(at, 1);
    } else {
        if (state.slots.length >= MAX_SLOTS) return;
        const item = itemById.get(itemId);
        if (!item || held(itemId) <= 0) return;
        state.slots.push({ item, processId: null });
    }
    renderItemList();
    renderWorkspace();
    renderItemMemo();
    clearResultIfIdle();
}

function handleProcessSelect(index, processId) {
    if (!state.slots[index]) return;
    state.slots[index].processId = processId;
    renderWorkspace();
    clearResultIfIdle();
}

function handleRemoveSlot(index) {
    state.slots.splice(index, 1);
    renderItemList();
    renderWorkspace();
    clearResultIfIdle();
}

function handleReset() {
    state.slots = [];
    state.vesselId = null;
    renderAll();
    showWaiting();
}

function handleCompound() {
    if (!state.slots.length) return flash('素材が選ばれていません');

    const missing = state.slots
        .map((s, i) => (s.processId === null ? i : -1))
        .filter(i => i !== -1);
    if (missing.length) {
        missing.forEach(i => {
            const el = document.querySelector(`.ingredient-slot[data-slot="${i}"]`);
            if (!el) return;
            el.classList.add('slot-error');
            setTimeout(() => el.classList.remove('slot-error'), 1800);
        });
        return flash('工程が決まっていないスロットがあります');
    }

    const recipe = checkRecipe(state.slots, state.vesselId);
    if (recipe) {
        consume(recipe, state.slots);
        if (!state.unlockedRecipes.includes(recipe.result)) {
            state.unlockedRecipes.push(recipe.result);
        }
        openSlipFor(recipe.result, true);
        showSuccess(recipe);
    } else {
        showFailure();
    }
    state.slots = [];
    state.vesselId = null;
    renderAll();
}

// ═══════════════════════════════════════════════════════
//  レシピ照合
// ═══════════════════════════════════════════════════════
function checkRecipe(slots, vesselId) {
    for (const recipe of RECIPES_SORTED) {
        if (recipe.ingredients.length !== slots.length) continue;
        if ((recipe.vessel || null) !== (vesselId || null)) continue;

        const used = new Set();
        let ok = true;
        for (const need of recipe.ingredients) {
            const at = slots.findIndex((s, i) =>
                !used.has(i) && s.processId === need.processId && matches(s.item, need));
            if (at === -1) { ok = false; break; }
            used.add(at);
        }
        if (ok) return recipe;
    }
    return null;
}

const FIELD = {
    itemId:     it => it.id,
    categoryId: it => it.categoryId,
    effectId:   it => it.effectId,
    reactionId: it => it.reactionId,
};

function matches(item, need) {
    const get = FIELD[need.checkType];
    if (!get || get(item) !== need.value) return false;
    if (need.checkType2) {
        const g2 = FIELD[need.checkType2];
        if (!g2 || g2(item) !== need.value2) return false;
    }
    return true;
}

// ═══════════════════════════════════════════════════════
//  消費と生成
//  瓶は中身を使うと戻る（液体→薬瓶 / 気体→ガラス瓶）
// ═══════════════════════════════════════════════════════
function consume(recipe, slots) {
    slots.forEach(s => {
        const it = s.item;
        state.stock[it.id] = Math.max(0, (state.stock[it.id] || 0) - 1);
        if (it.form === '液体') state.vessels[VESSEL_PHIAL]++;
        if (it.form === '気体') state.vessels[VESSEL_GLASS]++;
    });
    if (recipe.vessel) state.vessels[recipe.vessel]--;

    const made = itemByName.get(recipe.result);
    if (made) {
        state.stock[made.id] = (state.stock[made.id] || 0) + 1;
        state.everHeld[made.id] = true;
    }
    state.craftCount[recipe.result] = (state.craftCount[recipe.result] || 0) + 1;
    if (state.firstCraftDay[recipe.result] === undefined && explore.day) {
        state.firstCraftDay[recipe.result] = explore.day.date.index;
    }
    saveGame();
}

// ═══════════════════════════════════════════════════════
//  覚えた調合を、素材を選ばずに作る
//  手が覚えているので、棚から適当に見繕って同じものを作れる。
//  安い素材から先に使う（稀少なものを勝手に消費しないため）
// ═══════════════════════════════════════════════════════
function planCraft(recipe) {
    const need = recipe.ingredients;
    const used = {};
    const plan = [];

    const fit = i => {
        if (i === need.length) return true;
        const g = need[i];
        const cands = ITEMS_DATA
            .filter(it => matches(it, g) && held(it.id) - (used[it.id] || 0) > 0)
            .sort((a, b) => (a.price || 0) - (b.price || 0) ||
                            (held(b.id) - (used[b.id] || 0)) - (held(a.id) - (used[a.id] || 0)));
        for (const it of cands) {
            used[it.id] = (used[it.id] || 0) + 1;
            plan[i] = { item: it, processId: g.processId };
            if (fit(i + 1)) return true;
            used[it.id]--;
            plan[i] = null;
        }
        return false;
    };
    return fit(0) ? plan : null;
}

// 足りないものを言葉で返す
function whyCannot(recipe) {
    if (recipe.vessel && held(recipe.vessel) <= 0) {
        return `${itemById.get(recipe.vessel)?.name || '器'}が足りない。`;
    }
    return '棚の材料が足りない。';
}

function craftFromRecipe(name) {
    if (explore.phase === 'out') return flash('今は外にいる。');
    const recipe = recipeByResult.get(name);
    if (!recipe) return;
    if (recipe.vessel && held(recipe.vessel) <= 0) return flash(whyCannot(recipe));

    const plan = planCraft(recipe);
    if (!plan) return flash(whyCannot(recipe));

    consume(recipe, plan);
    state.memo = { kind: 'slip', key: null, result: name };
    openSlipFor(name, true);
    showSuccess(recipe);
    state.slots = [];
    state.vesselId = null;
    renderAll();
    flash(`${name} をひとつ作った。`);
}

// ═══════════════════════════════════════════════════════
//  右：結果とレシピ帳
// ═══════════════════════════════════════════════════════
function setResultState(name) {
    ['waiting', 'success', 'failure'].forEach(id => {
        const el = document.getElementById(`state-${id}`);
        if (el) el.classList.toggle('hidden', id !== name);
    });
}

function showWaiting() { setResultState('waiting'); }

function clearResultIfIdle() {
    if (!document.getElementById('state-waiting').classList.contains('hidden')) return;
    showWaiting();
}

function showSuccess(recipe) {
    setResultState('success');
    const made = itemByName.get(recipe.result);
    document.getElementById('result-product-name').textContent = recipe.result;
    document.getElementById('result-product-desc').innerHTML =
        (made?.description || 'うまくいった。') +
        (made?.form ? `<br><span class="result-form">${made.form}</span>` : '');
}

function showFailure() {
    setResultState('failure');
}

function flash(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2000);
}

// 解禁済みレシピは代替素材まで開示する（AI_CORE_DESIGN 3節）
function renderRecipeBook() {
    const box = document.getElementById('recipe-book');
    box.innerHTML = '';
    document.getElementById('recipe-count').textContent =
        `${state.unlockedRecipes.length} / ${RECIPES_DATA.length}`;

    if (!state.unlockedRecipes.length) {
        box.innerHTML = '<div class="rb-empty">まだ何も解明していない。<br>素材と工程を試すこと。</div>';
        return;
    }

    state.unlockedRecipes.slice().reverse().forEach(name => {
        const r = RECIPES_DATA.find(x => x.result === name);
        if (!r) return;
        const lines = r.ingredients.map(g => {
            const p = procById.get(g.processId);
            return `<li>${describe(g)} <span class="rb-proc">${p ? p.name : g.processId}</span></li>`;
        }).join('');
        const ves = r.vessel ? itemById.get(r.vessel)?.name : 'なし';

        const d = document.createElement('div');
        d.className = 'rb-entry';
        d.setAttribute('role', 'button');
        d.tabIndex = 0;
        d.innerHTML =
            `<div class="rb-name">${name}</div>` +
            `<ul class="rb-ings">${lines}</ul>` +
            `<div class="rb-vessel">器：${ves}</div>` +
            `<div class="rb-seal" aria-label="解明済み">解</div>` +
            `<button class="rb-make" data-make="${name}">作る</button>`;
        const open = () => { openSlipFor(name); };
        d.addEventListener('click', e => {
            if (e.target.classList.contains('rb-make')) {
                e.stopPropagation();
                craftFromRecipe(name);
                return;
            }
            open();
        });
        d.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
        box.appendChild(d);
    });
}

// 条件を人間向けの文言にする。カテゴリ／薬効指定は候補も並べる。
function describe(g) {
    if (g.checkType === 'itemId') {
        const it = itemById.get(g.value);
        return `<span class="rb-fixed">${it ? it.name : g.value}</span>`;
    }
    const label = {
        categoryId: () => catById.get(g.value)?.name || g.value,
        effectId:   () => data_effects[g.value]?.name || g.value,
        reactionId: () => g.value,
    }[g.checkType]?.() || g.value;

    const alts = ITEMS_DATA
        .filter(it => matches(it, g) && held(it.id) > 0)
        .map(it => it.name);
    const tail = alts.length ? `<span class="rb-alt">（${alts.slice(0, 4).join('・')}${alts.length > 4 ? ' ほか' : ''}）</span>` : '';
    return `<span class="rb-any">${label}</span>${tail}`;
}

// ═══════════════════════════════════════════════════════
//  綴じ ─ 手元にある紙片
//  unlock が空なら最初から、レシピ名ならそれを解いた時に手に入る
// ═══════════════════════════════════════════════════════
const SLIP_FILTERS = ['すべて', '手書きメモ', '祖母のメモ', '書籍のページの写し', 'もらったメモ', '祖母の手書きの考察'];

function heldSlips() {
    return (typeof HINTS_DATA !== 'undefined' ? HINTS_DATA : []).filter(h => {
        if (h.route === '最初から') return true;
        if (h.route === '祖母の部屋') return (state.unlockedBundles || []).includes(h.bundle);
        if (h.route === '行商人') return (state.boughtSlips || []).includes(slipKey(h));
        return false;
    });
}

function slipKey(h) { return `${h.result}#${h.no}`; }

function openSlipFor(result, silent) {
    const mine = heldSlips().filter(h => h.result === result);
    if (mine.length) {
        state.memo = { kind: 'slip', key: slipKey(mine[0]) };
    } else if (!silent) {
        state.memo = { kind: 'slip', key: null, result };
    }
    renderSlipIndex();
    renderItemMemo();
    renderSlipMemo();
    renderExplore();
    renderShop();
}

// ── 調合所と採取を行き来する ──
function buildViewTabs() {
    document.querySelectorAll('.view-tab').forEach(tab => {
        tab.addEventListener('click', () => showView(tab.dataset.view));
    });
}


// ═══════════════════════════════════════════════════════
//  覚え書き
//  素材を押せばその素材の記述、調合を押せば祖母たちの紙片
// ═══════════════════════════════════════════════════════
function buildSlipFilters() {
    const box = document.getElementById('slip-filters');
    box.innerHTML = '';
    SLIP_FILTERS.forEach((label, i) => {
        const id = i === 0 ? 'all' : label;
        const b = document.createElement('button');
        b.className = 'filter-btn' + (id === state.slipFilter ? ' active' : '');
        b.textContent = i === 0 ? label
            : label.replace('書籍のページの写し', '書籍').replace('祖母の手書きの考察', '考察');
        b.dataset.src = id;
        b.addEventListener('click', () => {
            state.slipFilter = id;
            box.querySelectorAll('.filter-btn').forEach(x =>
                x.classList.toggle('active', x.dataset.src === id));
            renderSlipIndex();
        });
        box.appendChild(b);
    });
}

function renderSlipIndex() {
    const box = document.getElementById('slip-index');
    const all = heldSlips();
    const list = state.slipFilter === 'all' ? all : all.filter(h => h.source === state.slipFilter);
    document.getElementById('slip-count').textContent = `${all.length} 枚`;
    box.innerHTML = '';

    if (!list.length) {
        const li = document.createElement('li');
        li.className = 'slip-empty';
        li.textContent = all.length ? '── その出所の紙片はない ──' : '── 手元に紙片がない ──';
        box.appendChild(li);
        return;
    }

    list.forEach(h => {
        const solved = state.unlockedRecipes.includes(h.result);
        const li = document.createElement('li');
        li.className = 'slip-entry' + (state.memoSlip === slipKey(h) ? ' current' : '');
        li.tabIndex = 0;
        li.innerHTML =
            `<span class="slip-src">${h.source}</span>` +
            `<span class="slip-name">${solved ? h.result : h.title}</span>` +
            (solved ? '<span class="slip-solved">解</span>' : '');
        const open = () => { state.memoSlip = slipKey(h); state.slipMissingFor = null;
                             renderSlipIndex(); renderSlipMemo(); };
        li.addEventListener('click', open);
        li.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
        });
        box.appendChild(li);
    });
}

// 解いたあとの覚え書きに追記される、確定した事実。未解明のうちは出さない
function slipFacts(result) {
    if (!state.unlockedRecipes.includes(result)) return '';
    const r = recipeByResult.get(result);
    if (!r) return '';
    const ves = r.vessel ? (itemById.get(r.vessel)?.name || r.vessel) : '要らない';
    const procs = [...new Set(r.ingredients.map(g => procById.get(g.processId)?.name).filter(Boolean))];
    return `<p class="memo-facts">読み取れること　`
        + `<span class="fact">素材 ${r.ingredients.length}</span>`
        + `<span class="fact">器 ${ves}</span>`
        + `<span class="fact">工程 ${procs.join('・')}</span></p>`;
}

// 左：いま触れている素材の記述
function renderItemMemo() {
    const box = document.getElementById('item-memo');
    const it = itemById.get(state.memoItem);
    if (!it) {
        box.innerHTML = '<p class="memo-empty">素材を押すと、<br>祖母の書き付けが出てくる。</p>';
        return;
    }
    box.innerHTML =
        `<p class="memo-source">${catById.get(it.categoryId)?.name || ''}　${it.form || ''}</p>` +
        `<p class="memo-title">${it.name}</p>` +
        `<p class="memo-body">${it.note || it.description || '書き付けは残っていない。'}</p>` +
        (it.description && it.note ? `<p class="memo-meta">${it.description}</p>` : '');
}

// 右：いま開いている紙片
function renderSlipMemo() {
    const box = document.getElementById('memo-sheet');

    if (!state.memoSlip) {
        if (state.slipMissingFor) {
            box.innerHTML =
                `<p class="memo-source">調合：</p>` +
                `<p class="memo-title">${state.slipMissingFor}</p>` +
                `<p class="memo-empty">これについての紙片は手元にない。<br>祖母も書き残さなかったらしい。</p>`;
        } else {
            box.innerHTML = '<p class="memo-empty">祖母が遺した書類の束。<br>上の綴じから一枚選ぶ。</p>';
        }
        return;
    }

    const h = heldSlips().find(x => slipKey(x) === state.memoSlip);
    if (!h) { state.memoSlip = null; return renderSlipMemo(); }

    const solved = state.unlockedRecipes.includes(h.result);
    const doubt = h.reliability && h.reliability !== '確か'
        ? `<span class="memo-doubt">${h.reliability}</span>` : h.reliability || '';
    box.innerHTML =
        `<p class="memo-source">${h.source}：</p>` +
        `<p class="memo-title">${h.title}</p>` +
        `<p class="memo-body">${h.text}</p>` +
        slipFacts(h.result) +
        `<p class="memo-meta">${solved ? `これは「${h.result}」の作り方だった。　` : ''}` +
        (doubt ? `この記述は ${doubt}` : '') + `</p>`;
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        init();
        window.__bootOK = true;
    } catch (err) {
        window.__bootError = err;
        console.error(err);
    }
});
