// 紙片の文と、レシピが実際に要求しているものを突き合わせる
//   使い方:  node tools/check_hints.js .
// 出すもの
//   A … 紙片が名指した素材が、そのレシピのどの要求も満たさない（明確な誤り）
//   B … 名指した素材が何番目の要求で通るかの一覧。文中の位置と見比べる
//   C … 「水質」を要求しているのに紙片が漠然と「水」と書いているもの。
//        名前が水で終わる加工品が八つあるため、どちらの集合か決まらない
'use strict';
const fs = require('fs'), path = require('path');
const dir = process.argv[2] || '.';
const src = ['data_items.js', 'data_categories.js', 'data_recipes.js', 'data_hints.js']
    .map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n');
const { ITEMS_DATA, dataCategories, RECIPES_DATA, HINTS_DATA } =
    eval(src + '\n;({ITEMS_DATA,dataCategories,RECIPES_DATA,HINTS_DATA})');

const catName = new Map(dataCategories.map(c => [c.id, c.name]));
const itemName = id => (ITEMS_DATA.find(i => i.id === id) || {}).name || id;
const PROC = { grind: 'すりつぶす', boil: '煮る', dry: '乾燥させる', raw: 'そのまま',
    ferment: '発酵させる', burn: '焼く', freeze: '凍らせる', dissolve: '溶かす', distill: '蒸留' };

const FIELD = { itemId: i => i.id, categoryId: i => i.categoryId, effectId: i => i.effectId, reactionId: i => i.reactionId };
function matches(item, need) {
    const f = FIELD[need.checkType];
    if (!f || f(item) !== need.value) return false;
    if (need.checkType2) {
        const f2 = FIELD[need.checkType2];
        if (!f2 || f2(item) !== need.value2) return false;
    }
    return true;
}
const label = g => (g.checkType === 'categoryId' ? '種別＝' + catName.get(g.value)
    : g.checkType === 'itemId' ? '指定＝' + itemName(g.value)
    : g.checkType + '＝' + g.value) + '／' + (PROC[g.processId] || g.processId);

// 長い名前から拾って、拾った箇所は伏せる（ハシリタケ と ニガハシリダケ を混ぜないため）
const NAMES = ITEMS_DATA.map(i => i.name).filter(n => n.length >= 2).sort((a, b) => b.length - a.length);
const byName = new Map(ITEMS_DATA.map(i => [i.name, i]));
function namedIn(text, exclude) {
    let t = text, out = [];
    for (const n of NAMES) {
        if (n === exclude || !t.includes(n)) continue;
        out.push(n);
        t = t.split(n).join('\u3000'.repeat(n.length));
    }
    return out;
}

const A = [], B = [];
for (const h of HINTS_DATA) {
    const r = RECIPES_DATA.find(x => x.result === h.result);
    if (!r) { A.push({ h, name: null, note: 'レシピが見つからない' }); continue; }
    for (const n of namedIn(h.text || '', h.result)) {
        const slots = r.ingredients.map((g, i) => (matches(byName.get(n), g) ? i : -1)).filter(i => i >= 0);
        (slots.length ? B : A).push({ h, r, name: n, slots });
    }
}

console.log(`紙片 ${HINTS_DATA.length} 枚 ／ レシピ ${RECIPES_DATA.length} 本\n`);

console.log(`【A】名指しした素材が一つも通らない … ${A.length}件`);
A.forEach(x => {
    console.log(`  ✗ ${x.h.result}（${x.h.reliability}）の「${x.name || x.note}」`);
    console.log(`     ${x.h.text}`);
    x.r && x.r.ingredients.forEach((g, i) => console.log(`     ${i + 1}) ${label(g)}`));
});

console.log(`\n【B】名指しと要求の対応 … ${B.length}件（文中の位置と見比べる）`);
let last = '';
B.forEach(x => {
    if (x.h.result !== last) { console.log(`  ── ${x.h.result}`); last = x.h.result; }
    console.log(`     「${x.name}」→ ${x.slots.map(i => `${i + 1}番目（${label(x.r.ingredients[i])}）`).join('・')} でのみ通る`);
});

console.log('\n【C】「水質」を求めているのに紙片が「水」と書いているもの');
const fake = ITEMS_DATA.filter(i => i.categoryId === 'processed' && /水$/.test(i.name)).map(i => i.name);
console.log(`     水質は採取品 ${ITEMS_DATA.filter(i => i.categoryId === 'liquid').length}種。`
          + `名前が水で終わる加工品（要求を満たさない）: ${fake.join('、')}`);
for (const h of HINTS_DATA) {
    const r = RECIPES_DATA.find(x => x.result === h.result);
    if (!r) continue;
    const g = r.ingredients.find(g => g.checkType === 'categoryId' && g.value === 'liquid');
    if (g && /水/.test(h.text) && !/水質|汲/.test(h.text)) {
        console.log(`  ・${h.result}（${h.reliability}） ${label(g)}`);
        console.log(`     ${h.text}`);
    }
}
