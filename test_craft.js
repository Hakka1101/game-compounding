// 全レシピが main.js の判定関数で実際に成立するか検証するヘッドレステスト
const fs = require('fs'), vm = require('vm');
const ctx = vm.createContext({ console });
const expose = s => s.replace(/^const /gm, 'var ');

for (const f of ['data_categories.js','data_effects.js','data_processes.js','data_items.js','data_recipes.js'])
  vm.runInContext(expose(fs.readFileSync(f, 'utf8')), ctx);

const src = fs.readFileSync('main.js', 'utf8');
const pick = [
  /const VESSEL_GLASS[\s\S]*?const START_VESSELS = \d+;/,
  /const itemById[\s\S]*?const catById\s*=.*?;/,
  /const RECIPES_SORTED[\s\S]*?^}/m,
  /^function checkRecipe[\s\S]*?^}/m,
  /^function assignSlots[\s\S]*?^}/m,   // checkRecipe が使う割り当て（投入順に依らない照合）
  /^const FIELD = \{[\s\S]*?^\};/m,
  /^function matches[\s\S]*?^}/m,
];
vm.runInContext(expose(pick.map(re => src.match(re)[0]).join('\n')), ctx);

const R = ctx.RECIPES_DATA, I = ctx.ITEMS_DATA;
const cands = g => I.filter(it => ctx.matches(it, g));

let ok = 0; const fail = [], wrong = [];
for (const r of R) {
  const used = new Set(), slots = [];
  let bad = null;
  for (const g of r.ingredients) {
    const pool = cands(g);
    if (!pool.length) { bad = '候補ゼロ'; break; }
    const c = pool.find(x => !used.has(x.id));
    if (!c) { bad = '素材が重複して組めない'; break; }
    used.add(c.id);
    slots.push({ item: c, processId: g.processId });
  }
  if (bad) { fail.push([r.result, bad]); continue; }
  const got = ctx.checkRecipe(slots, r.vessel || null);
  if (!got) fail.push([r.result, '判定されない']);
  else if (got.result !== r.result) wrong.push([r.result, got.result]);
  else ok++;
}
console.log(`レシピ ${R.length} 件を実際の判定関数に通した結果`);
console.log(`  成功 ${ok} / 失敗 ${fail.length} / 誤判定 ${wrong.length}`);
fail.forEach(x => console.log('   ✗', x[0], '—', x[1]));
wrong.forEach(x => console.log('   ✗', x[0], '→', x[1], 'と判定された'));

const liq = R.find(r => r.vessel === 'item_175');
const s = liq.ingredients.map(g => ({ item: cands(g)[0], processId: g.processId }));
console.log(`\n器の判定（${liq.result} / 正解は薬瓶）`);
console.log('  薬瓶     →', ctx.checkRecipe(s, 'item_175')?.result ?? '判定されず');
console.log('  器なし   →', ctx.checkRecipe(s, null)?.result ?? '判定されず');
console.log('  ガラス瓶 →', ctx.checkRecipe(s, 'item_088')?.result ?? '判定されず');
