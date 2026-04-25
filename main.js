// ═══════════════════════════════════════════════════════
//  調合所 main.js
//  依存: ITEM_DATA, recipes, DATA_PROCESSES, dataCategories
// ═══════════════════════════════════════════════════════

// ── 定数 ──
const MAX_SLOTS = 3;

// ── ゲーム状態 ──
const state = {
    // [{ item: {...}, processId: null | "grind" | ... }, ...]
    selectedIngredients: [],
    unlockedRecipes: [],
};

// ═══════════════════════════════════════════════════════
//  初期化
// ═══════════════════════════════════════════════════════
function init() {
    renderItemList();
    renderWorkspace();
    document.getElementById('btn-compound').addEventListener('click', handleCompound);
    document.getElementById('btn-reset').addEventListener('click', handleReset);
}

// ═══════════════════════════════════════════════════════
//  素材リスト描画
// ═══════════════════════════════════════════════════════
function renderItemList() {
    const list = document.getElementById('item-list');
    list.innerHTML = '';

    ITEM_DATA.forEach(item => {
        const isSelected = state.selectedIngredients.some(s => s.item.id === item.id);
        const cat = dataCategories.find(c => c.id === item.categoryId);
        const icon = cat ? cat.icon : '？';

        const li = document.createElement('li');
        li.className = 'item-entry available' + (isSelected ? ' selected' : '');
        li.dataset.id = item.id;
        li.innerHTML =
            `<span class="item-cat-icon">${icon}</span>` +
            `<span class="item-name">${item.name}</span>` +
            `<span class="item-indicator">${isSelected ? '■' : '▷'}</span>`;

        li.addEventListener('click', () => handleItemClick(item.id));
        list.appendChild(li);
    });
}

// ═══════════════════════════════════════════════════════
//  調合台描画
// ═══════════════════════════════════════════════════════
const SLOT_NUMS = ['①', '②', '③'];

function renderWorkspace() {
    const container = document.getElementById('ingredient-slots');
    container.innerHTML = '';

    for (let i = 0; i < MAX_SLOTS; i++) {
        const entry = state.selectedIngredients[i];
        container.appendChild(entry ? buildFilledSlot(i, entry) : buildEmptySlot(i));
    }
}

function buildFilledSlot(index, entry) {
    const cat  = dataCategories.find(c => c.id === entry.item.categoryId);
    const icon = cat ? cat.icon : '？';

    const processBtnsHtml = DATA_PROCESSES.map(p =>
        `<button class="process-btn${entry.processId === p.id ? ' active' : ''}" data-process="${p.id}">${p.name}</button>`
    ).join('');

    const el = document.createElement('div');
    el.className = 'ingredient-slot filled';
    el.dataset.slot = index;
    el.innerHTML =
        `<div class="slot-header-row">` +
            `<span class="slot-num">${SLOT_NUMS[index]}</span>` +
            `<span class="slot-item-icon">${icon}</span>` +
            `<span class="slot-item-name">${entry.item.name}</span>` +
            `<button class="slot-remove-btn" title="取り除く">✕</button>` +
        `</div>` +
        `<div class="slot-process-row">` +
            `<span class="process-label">工程 ▶</span>` +
            `<div class="process-btns" role="group">${processBtnsHtml}</div>` +
        `</div>`;

    el.querySelector('.slot-remove-btn').addEventListener('click', () => handleRemoveSlot(index));
    el.querySelectorAll('.process-btn').forEach(btn => {
        btn.addEventListener('click', () => handleProcessSelect(index, btn.dataset.process));
    });

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

// ═══════════════════════════════════════════════════════
//  イベントハンドラ
// ═══════════════════════════════════════════════════════
function handleItemClick(itemId) {
    const existingIdx = state.selectedIngredients.findIndex(s => s.item.id === itemId);

    if (existingIdx !== -1) {
        state.selectedIngredients.splice(existingIdx, 1);
    } else {
        if (state.selectedIngredients.length >= MAX_SLOTS) return;
        const item = ITEM_DATA.find(i => i.id === itemId);
        if (!item) return;
        state.selectedIngredients.push({ item, processId: null });
    }

    renderItemList();
    renderWorkspace();
    showWaiting();
}

function handleProcessSelect(slotIndex, processId) {
    if (!state.selectedIngredients[slotIndex]) return;
    state.selectedIngredients[slotIndex].processId = processId;

    // エラー表示があれば解除
    const slot = document.querySelector(`.ingredient-slot[data-slot="${slotIndex}"]`);
    if (slot) slot.classList.remove('slot-error');

    renderWorkspace();
}

function handleRemoveSlot(slotIndex) {
    state.selectedIngredients.splice(slotIndex, 1);
    renderItemList();
    renderWorkspace();
    showWaiting();
}

function handleCompound() {
    if (state.selectedIngredients.length === 0) return;

    // 工程未選択チェック
    const unselected = state.selectedIngredients
        .map((s, i) => (s.processId === null ? i : -1))
        .filter(i => i !== -1);

    if (unselected.length > 0) {
        highlightMissingProcess(unselected);
        return;
    }

    const matched = checkRecipe(state.selectedIngredients);

    if (matched) {
        if (!state.unlockedRecipes.includes(matched.result)) {
            state.unlockedRecipes.push(matched.result);
        }
        showSuccess(matched);
    } else {
        showFailure();
    }
}

function handleReset() {
    state.selectedIngredients = [];
    renderItemList();
    renderWorkspace();
    showWaiting();
}

// ─ 工程未選択スロットをエラー色で示す ─
function highlightMissingProcess(slotIndexes) {
    slotIndexes.forEach(i => {
        const slot = document.querySelector(`.ingredient-slot[data-slot="${i}"]`);
        if (slot) {
            slot.classList.add('slot-error');
            // 少し経ったら自動解除
            setTimeout(() => slot.classList.remove('slot-error'), 1800);
        }
    });
}

// ═══════════════════════════════════════════════════════
//  レシピ照合（AI_TECHNICAL_SPEC準拠）
//  素材数一致 → 各レシピ素材に対し未使用のselectedから1つマッチ
// ═══════════════════════════════════════════════════════
function checkRecipe(selected) {
    for (const recipe of recipes) {
        if (recipe.ingredients.length !== selected.length) continue;

        const usedIndexes = new Set();
        let allMatch = true;

        for (const required of recipe.ingredients) {
            const matchIdx = selected.findIndex((s, idx) => {
                if (usedIndexes.has(idx)) return false;
                return ingredientMatches(s, required);
            });

            if (matchIdx === -1) { allMatch = false; break; }
            usedIndexes.add(matchIdx);
        }

        if (allMatch) return recipe;
    }
    return null;
}

function ingredientMatches(selected, required) {
    if (selected.processId !== required.processId) return false;

    switch (required.checkType) {
        case 'itemId':      return selected.item.id                    === required.value;
        case 'categoryId':  return selected.item.categoryId            === required.value;
        case 'flavorId':    return selected.item.traits.flavorId       === required.value;
        case 'effectId':    return selected.item.traits.effectId       === required.value;
        case 'elementId':   return selected.item.traits.elementId      === required.value;
        case 'reactionId':  return selected.item.traits.reactionId     === required.value;
        default:            return false;
    }
}

// ═══════════════════════════════════════════════════════
//  結果パネル切り替え
// ═══════════════════════════════════════════════════════
function showWaiting() {
    setResultState('waiting');
}

function showSuccess(recipe) {
    setResultState('success');
    document.getElementById('result-product-name').textContent = recipe.result;
    document.getElementById('result-product-desc').textContent =
        recipe.description ?? '調合に成功した。';
}

function showFailure() {
    setResultState('failure');

    // シェイクアニメーションをリセットして再生
    const icon = document.querySelector('#state-failure .result-big-icon');
    if (icon) {
        icon.classList.remove('icon-shake');
        void icon.offsetWidth; // reflow
        icon.classList.add('icon-shake');
    }
}

function setResultState(name) {
    ['waiting', 'success', 'failure'].forEach(id => {
        const el = document.getElementById(`state-${id}`);
        if (el) el.classList.toggle('hidden', id !== name);
    });
}

// ═══════════════════════════════════════════════════════
//  起動
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', init);
