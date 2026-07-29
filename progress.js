// ═══════════════════════════════════════════════════════
//  進行  ─  記録 / 旗の判定 / 出来事 / 結末 / 保存
//  依存: FLAGS_DATA / EVENTS_DATA / ENDINGS_DATA / ITEMS_DATA
//        RECIPES_DATA / HINTS_DATA / calendar.js / explore.js
// ═══════════════════════════════════════════════════════

const SAVE_KEY = 'chougoujo.save.v1';
const START_MONEY = 200;
const SELL_RATE = 0.6;    // 売値 = 基準価格 × これ
const BUY_RATE  = 1.8;    // 買値 = 基準価格 × これ

const PERSON_RE = /魔女|錬金王|死神|聖女|隠者|竜殺し|星詠み|万物医|巫女|灯守|眠り姫|風読み|賢者|城塞守り|鍛冶師/;
const flagById = new Map(FLAGS_DATA.map(f => [f.id, f]));

// 調合結果の名前からアイテムを引く
const productOf = name => itemByName.get(name);

// ── 記録の初期値 ──
function freshProgress() {
    return {
        money: START_MONEY,
        debt: OPENING_DATA.debt,   // 祖母の療養に要った額。期日に一括で判定する
        totalEarned: 0,
        soldCount: {},      // itemId → 個数
        soldIncome: {},     // itemId → 金額
        craftCount: {},     // レシピ名 → 回数
        firstCraftDay: {},  // レシピ名 → 通算日
        everHeld: {},       // itemId → true
        exploredDays: 0,
        restedDays: 0,
        firedEvents: [],    // 一度きりの出来事
        lastEventDay: {},   // 繰り返す出来事の直近発生日
        unlockedBundles: [],
        boughtSlips: [],    // 行商人から買った紙片 "result#no"
        pendingBuyer: false,// 夜の客が来ている
        merchantStock: [],  // 行商人の品揃え
        ended: null,
    };
}

// ═══════════════════════════════════════════════════════
//  集計
// ═══════════════════════════════════════════════════════
function sumBy(map, pred) {
    let n = 0;
    for (const [id, v] of Object.entries(map)) {
        const it = itemById.get(id);
        if (it && pred(it)) n += v;
    }
    return n;
}

const soldTotal      = () => Object.values(state.soldCount).reduce((a, b) => a + b, 0);
const soldByDanger   = d => sumBy(state.soldCount, it => it.danger === d);
const incomeByDanger = d => sumBy(state.soldIncome, it => it.danger === d);

function craftedByDanger(d) {
    let n = 0;
    for (const [name, v] of Object.entries(state.craftCount)) {
        if (productOf(name)?.danger === d) n += v;
    }
    return n;
}

function solvedWhere(pred) {
    return state.unlockedRecipes.filter(n => {
        const it = productOf(n);
        return it && pred(it, n);
    }).length;
}

// ═══════════════════════════════════════════════════════
//  旗
// ═══════════════════════════════════════════════════════
function flagMet(id) {
    const f = flagById.get(id);
    if (!f) return false;
    const t = f.threshold;
    switch (f.kind) {
        case 'recipeCount':         return state.unlockedRecipes.length >= t;
        case 'recipeCountByEffect': return solvedWhere(it => it.effectId === f.target) >= t;
        case 'recipeCountByTag':    return solvedWhere((it, n) => PERSON_RE.test(n)) >= t;
        case 'recipeCountByDanger': return solvedWhere(it => it.danger === f.target) >= t;
        case 'craftCountByDanger':  return craftedByDanger(f.target) >= t;
        case 'craftNoneByDanger':   return craftedByDanger(f.target) === 0;
        case 'soldCount':           return soldTotal() >= t;
        case 'soldCountByDanger':   return soldByDanger(f.target) >= t;
        case 'soldNoneByDanger':    return soldByDanger(f.target) === 0;
        case 'soldRatioByDanger':   return soldTotal() > 0 && soldByDanger(f.target) / soldTotal() >= t;
        case 'soldIncomeByDanger':  return incomeByDanger(f.target) >= t;
        case 'totalEarned':         return state.totalEarned >= t;
        case 'itemEverHeld':        return !!state.everHeld[f.target];
        case 'restedDaysNone':      return state.restedDays === 0;
        case 'exploredDays':        return state.exploredDays >= t;
        default:                    return false;
    }
}

// "a & (b | c)" のような式を解く。演算子は & | と括弧のみ
function evalCondition(expr) {
    if (!expr) return true;
    const tokens = String(expr).match(/[()&|]|[A-Za-z_][\w]*/g) || [];
    let i = 0;
    const peek = () => tokens[i];
    const orExpr = () => {
        let v = andExpr();
        while (peek() === '|') { i++; const r = andExpr(); v = v || r; }
        return v;
    };
    const andExpr = () => {
        let v = atom();
        while (peek() === '&') { i++; const r = atom(); v = v && r; }
        return v;
    };
    const atom = () => {
        if (peek() === '(') { i++; const v = orExpr(); if (peek() === ')') i++; return v; }
        return flagMet(tokens[i++]);
    };
    return orExpr();
}

// ═══════════════════════════════════════════════════════
//  出来事  ─ 朝、店を開ける前に起きる
// ═══════════════════════════════════════════════════════
function repeatInterval(text) {
    const m = String(text || '').match(/(\d+)\s*日/);
    return m ? Number(m[1]) : null;
}

function dueEvents(dayIndex) {
    const out = [];
    for (const ev of EVENTS_DATA) {
        if (!evalCondition(ev.condition)) continue;
        const every = repeatInterval(ev.repeat);
        if (every === null) {
            if (state.firedEvents.includes(ev.id)) continue;
        } else {
            const last = state.lastEventDay[ev.id];
            if (last !== undefined && dayIndex - last < every) continue;
            if (last === undefined && state.firedEvents.includes(ev.id + ':first')) continue;
        }
        out.push(ev);
    }
    return out;
}

function applyEvent(ev, dayIndex) {
    const every = repeatInterval(ev.repeat);
    if (every === null) state.firedEvents.push(ev.id);
    else state.lastEventDay[ev.id] = dayIndex;

    if (ev.effect === '紙片解禁' && ev.target && !state.unlockedBundles.includes(ev.target)) {
        state.unlockedBundles.push(ev.target);
    }
    if (ev.effect === '買い手が訪ねる') state.pendingBuyer = true;
    if (ev.effect === '行商人が来る')   refreshMerchant();
}

// ═══════════════════════════════════════════════════════
//  行商人
// ═══════════════════════════════════════════════════════
function merchantCatalog() {
    return HINTS_DATA.filter(h => h.route === '行商人');
}

function refreshMerchant() {
    const pool = merchantCatalog().filter(h => !state.boughtSlips.includes(slipKey(h)));
    // 安い順に3点まで並べる。高いものは自然と後回しになる
    state.merchantStock = pool.sort((a, b) => (a.price || 0) - (b.price || 0))
                              .slice(0, 3).map(slipKey);
}

// ═══════════════════════════════════════════════════════
//  結末
// ═══════════════════════════════════════════════════════
function judgeEnding() {
    // 期日に借財を返せなければ、ほかに何をしていても店は人手に渡る
    if (!debtCleared()) return buildEnding(OPENING_DATA.foreclosure);
    const list = [...ENDINGS_DATA.endings].sort((a, b) => a.priority - b.priority);
    for (const e of list) {
        if (e.forbid && evalCondition(e.forbid)) continue;
        if (!e.require || evalCondition(e.require)) return buildEnding(e);
    }
    return buildEnding(list[list.length - 1]);
}

function buildEnding(e) {
    let text = e.text || '';
    // 差し替え段落
    if (e.altCondition && e.altText) {
        const parts = String(e.altText).split('\n\n条件を満たさない場合 → ');
        const yes = (parts[0] || '').replace(/^〔[^〕]*〕→\s*/, '');
        const no  = parts[1] || '';
        text = text.replace(/〔[^〕]*〕/, evalCondition(e.altCondition) ? yes : no);
    }
    const notes = ENDINGS_DATA.notes
        .filter(n => evalCondition(n.flag) && !(n.forbid && evalCondition(n.forbid)))
        .map(n => n.text);
    return { id: e.id, title: e.title, text, notes };
}

// ═══════════════════════════════════════════════════════
//  保存  ─ localStorage を主、書き出し文字列を控えに
//  マスを調べるたびに保存するので、巻き戻しても引き直せない
// ═══════════════════════════════════════════════════════
const SAVE_FIELDS = ['money','debt','totalEarned','soldCount','soldIncome','craftCount','firstCraftDay',
                     'everHeld','exploredDays','restedDays','firedEvents','lastEventDay',
                     'unlockedBundles','boughtSlips','pendingBuyer','merchantStock','ended',
                     'stock','vessels','unlockedRecipes'];

function snapshot() {
    const s = {};
    SAVE_FIELDS.forEach(k => { s[k] = state[k]; });
    return {
        v: 1,
        day: explore.day ? explore.day.date.index : 0,
        phase: explore.phase,
        timeSlot: explore.day ? explore.day.timeSlot : null,
        turnsLeft: explore.day ? explore.day.turnsLeft : null,
        mapsVisited: explore.day ? explore.day.mapsVisited : [],
        searched: [...explore.searched],
        areaId: explore.areaId,
        haul: explore.haul,
        log: explore.log,
        state: s,
    };
}

function restore(snap) {
    if (!snap || snap.v !== 1) return false;
    SAVE_FIELDS.forEach(k => { if (snap.state[k] !== undefined) state[k] = snap.state[k]; });
    startDay(snap.day || 0);
    explore.phase = snap.phase || 'before';
    explore.areaId = snap.areaId || null;
    explore.searched = new Set(snap.searched || []);
    explore.haul = snap.haul || {};
    explore.log = snap.log || [];
    if (explore.day) {
        explore.day.timeSlot = snap.timeSlot || null;
        if (snap.turnsLeft !== null) explore.day.turnsLeft = snap.turnsLeft;
        explore.day.mapsVisited = snap.mapsVisited || [];
    }
    return true;
}

function saveGame() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(snapshot())); return true; }
    catch (e) { console.warn('保存できませんでした', e); return false; }
}

function loadGame() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        return raw ? restore(JSON.parse(raw)) : false;
    } catch (e) { console.warn('読み込めませんでした', e); return false; }
}

function hasSave() {
    try { return !!localStorage.getItem(SAVE_KEY); } catch (e) { return false; }
}

function clearSave() {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
}

// 書き出し・読み込み用の文字列（ブラウザのデータを消しても持ち運べる）
function exportSave() {
    const json = JSON.stringify(snapshot());
    return btoa(unescape(encodeURIComponent(json)));
}

function importSave(code) {
    try {
        const json = decodeURIComponent(escape(atob(String(code).trim())));
        return restore(JSON.parse(json));
    } catch (e) { return false; }
}
