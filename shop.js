// ═══════════════════════════════════════════════════════
//  店  ─  売り買いに行動もターンも要らない。ただし外にいる間は使えない
//   ・村の店は凶器を買い取らない
//   ・凶器を渡せるのは、日の落ちてから訪ねてくる客だけ
//   ・液体と気体は瓶ごと売る（瓶は戻らない）
//  依存: progress.js / main.js
// ═══════════════════════════════════════════════════════

const sellPrice = it => Math.max(1, Math.round((it.price || 0) * SELL_RATE));
const buyPrice  = it => Math.max(1, Math.round((it.price || 0) * BUY_RATE));

// 店に並ぶもの：瓶は常時、それ以外は累計販売数が閾値を超えたら
function shopStock() {
    return ITEMS_DATA.filter(it => {
        if (it.shopUnlock === null || it.shopUnlock === undefined) return false;
        return (state.soldCount[it.id] || 0) >= it.shopUnlock;
    });
}

// 村の店に売れるもの：手持ちのうち凶器以外
function sellableAtShop() {
    return ITEMS_DATA.filter(it => held(it.id) > 0 && it.danger !== '凶器' &&
                                   it.id !== VESSEL_GLASS && it.id !== VESSEL_PHIAL);
}

function weaponsInStock() {
    return ITEMS_DATA.filter(it => it.danger === '凶器' && held(it.id) > 0);
}

// ═══════════════════════════════════════════════════════
//  売る・買う
// ═══════════════════════════════════════════════════════
function doSell(itemId, n) {
    const it = itemById.get(itemId);
    if (!it || held(itemId) < n) return;
    const gain = sellPrice(it) * n;

    state.stock[itemId] = held(itemId) - n;
    state.money += gain;
    state.totalEarned += gain;
    state.soldCount[itemId]  = (state.soldCount[itemId] || 0) + n;
    state.soldIncome[itemId] = (state.soldIncome[itemId] || 0) + gain;

    // 中身を入れた瓶ごと渡すので、瓶は戻らない
    if (it.form === '液体') state.vessels[VESSEL_PHIAL] = Math.max(0, state.vessels[VESSEL_PHIAL] - n);
    if (it.form === '気体') state.vessels[VESSEL_GLASS] = Math.max(0, state.vessels[VESSEL_GLASS] - n);

    saveGame();
    renderAll();
    flash(`${it.name}を${n}つ売った。　＋${gain}`);
}

function doBuy(itemId, n) {
    const it = itemById.get(itemId);
    if (!it) return;
    const cost = buyPrice(it) * n;
    if (state.money < cost) return flash('金が足りない。');

    state.money -= cost;
    if (itemId === VESSEL_GLASS || itemId === VESSEL_PHIAL) state.vessels[itemId] += n;
    else state.stock[itemId] = (state.stock[itemId] || 0) + n;
    state.everHeld[itemId] = true;

    saveGame();
    renderAll();
    flash(`${it.name}を${n}つ買った。　−${cost}`);
}

function doBuySlip(key) {
    const h = HINTS_DATA.find(x => slipKey(x) === key);
    if (!h) return;
    if (state.money < h.price) return flash('金が足りない。');
    state.money -= h.price;
    state.boughtSlips.push(key);
    state.merchantStock = state.merchantStock.filter(k => k !== key);
    state.memoSlip = key;
    saveGame();
    renderAll();
    flash(`「${h.title}」を買った。　−${h.price}`);
}

// 夜の客に渡す
function doSellWeapon(itemId) {
    const it = itemById.get(itemId);
    if (!it || held(itemId) <= 0) return;
    const gain = sellPrice(it);

    state.stock[itemId] = held(itemId) - 1;
    state.money += gain;
    state.totalEarned += gain;
    state.soldCount[itemId]  = (state.soldCount[itemId] || 0) + 1;
    state.soldIncome[itemId] = (state.soldIncome[itemId] || 0) + gain;
    if (it.form === '液体') state.vessels[VESSEL_PHIAL] = Math.max(0, state.vessels[VESSEL_PHIAL] - 1);
    if (it.form === '気体') state.vessels[VESSEL_GLASS] = Math.max(0, state.vessels[VESSEL_GLASS] - 1);

    state.pendingBuyer = false;
    saveGame();
    renderAll();
    flash('包みを渡した。客は何も言わずに出ていった。');
}

function refuseBuyer() {
    state.pendingBuyer = false;
    saveGame();
    renderAll();
    flash('断った。客は黙って戸を閉めた。');
}

// ═══════════════════════════════════════════════════════
//  画面
// ═══════════════════════════════════════════════════════
function renderShop() {
    const out = explore.phase === 'out';
    document.getElementById('shop-closed').classList.toggle('hidden', !out);
    document.getElementById('shop-body').classList.toggle('hidden', out);
    document.getElementById('money').textContent = state.money.toLocaleString();
    if (out) return;

    renderSellList();
    renderBuyList();
    renderMerchant();
    renderBuyer();
}

function priceRow(it, n, price, label, onClick) {
    const li = document.createElement('li');
    li.className = 'trade-entry';
    li.innerHTML =
        `<span class="item-cat-icon">${catById.get(it.categoryId)?.icon || '？'}</span>` +
        `<span class="item-name">${it.name}</span>` +
        `<span class="trade-have">${n}</span>` +
        `<span class="trade-price">${price}</span>`;
    const b = document.createElement('button');
    b.className = 'trade-btn';
    b.textContent = label;
    b.addEventListener('click', onClick);
    li.appendChild(b);
    return li;
}

function renderSellList() {
    const box = document.getElementById('sell-list');
    const list = sellableAtShop();
    box.innerHTML = '';
    if (!list.length) {
        box.innerHTML = '<li class="item-empty">── 売れるものがない ──</li>';
    }
    list.sort((a, b) => sellPrice(b) - sellPrice(a)).forEach(it => {
        box.appendChild(priceRow(it, held(it.id), sellPrice(it), '売る', () => doSell(it.id, 1)));
    });
    const w = weaponsInStock();
    document.getElementById('sell-note').textContent = w.length
        ? `棚に置けないものが ${w.length} 種ある。店では扱えない。`
        : '';
}

function renderBuyList() {
    const box = document.getElementById('buy-list');
    const list = shopStock();
    box.innerHTML = '';
    if (!list.length) box.innerHTML = '<li class="item-empty">── 今日は何も置いていない ──</li>';
    list.sort((a, b) => buyPrice(a) - buyPrice(b)).forEach(it => {
        box.appendChild(priceRow(it, held(it.id), buyPrice(it), '買う', () => doBuy(it.id, 1)));
    });
}

function renderMerchant() {
    const box = document.getElementById('merchant-list');
    box.innerHTML = '';
    const stock = (state.merchantStock || [])
        .map(k => HINTS_DATA.find(h => slipKey(h) === k)).filter(Boolean);
    if (!stock.length) {
        box.innerHTML = '<li class="item-empty">── 行商人はまだ来ていない ──</li>';
        return;
    }
    stock.forEach(h => {
        const li = document.createElement('li');
        li.className = 'trade-entry';
        li.innerHTML = `<span class="slip-src">${h.source}</span>` +
                       `<span class="item-name">${h.title}</span>` +
                       `<span class="trade-price">${h.price}</span>`;
        const b = document.createElement('button');
        b.className = 'trade-btn';
        b.textContent = '買う';
        b.addEventListener('click', () => doBuySlip(slipKey(h)));
        li.appendChild(b);
        box.appendChild(li);
    });
}

function renderBuyer() {
    const box = document.getElementById('buyer-area');
    const w = weaponsInStock();
    if (!state.pendingBuyer || !w.length) {
        box.classList.add('hidden');
        return;
    }
    box.classList.remove('hidden');
    const list = document.getElementById('buyer-list');
    list.innerHTML = '';
    w.forEach(it => {
        list.appendChild(priceRow(it, held(it.id), sellPrice(it), '渡す', () => doSellWeapon(it.id)));
    });
}
