// 採取 → 所持 → 調合 の一連の流れを画面なしで検証する
const fs = require('fs'), vm = require('vm');
const ctx = vm.createContext({ console, module: {}, Math });
const load = f => vm.runInContext(fs.readFileSync(f, 'utf8').replace(/^const /gm, 'var '), ctx);
['data_categories.js','data_effects.js','data_processes.js','data_items.js','data_recipes.js',
 'data_hints.js','data_calendar.js','calendar.js','data_terrains.js','data_spawns.js'].forEach(load);

// explore.js から画面に触れない部分だけ取り込む
const ex = fs.readFileSync('explore.js', 'utf8');
[/const terrainById[\s\S]*?spawnIndex\.get\(k\)\.push\(s\);\n}\);/,
 /const RARE_LINE[\s\S]*?^}/m,
 /^function pickWeighted[\s\S]*?^}/m,
 /^function amountFor[\s\S]*?^}/m].forEach(re => vm.runInContext(ex.match(re)[0].replace(/^const /gm, 'var '), ctx));
// main.js の判定部分
const mn = fs.readFileSync('main.js', 'utf8');
[/const VESSEL_GLASS[\s\S]*?const START_VESSELS = \d+;/, /const itemById[\s\S]*?const catById\s*=.*?;/,
 /const RECIPES_SORTED[\s\S]*?^}/m, /^function checkRecipe[\s\S]*?^}/m,
 /^const FIELD = \{[\s\S]*?^\};/m, /^function matches[\s\S]*?^}/m]
 .forEach(re => vm.runInContext(mn.match(re)[0].replace(/^const /gm, 'var '), ctx));

const { TERRAINS_DATA, dateOf, rollCell, itemById, checkRecipe } = ctx;
const areaById = new Map(TERRAINS_DATA.areas.map(a => [a.id, a]));
const SLOTS = ['dawn','morning','noon','afternoon','night','midnight'];
const JP = { dawn:'夜明け', morning:'朝', noon:'昼', afternoon:'午後', night:'夜', midnight:'深夜' };

// 一日ぶんの採取を模擬（10ターン、移動1、1マップ）
function simulateDay(dayIndex, areaId, slot) {
  const date = dateOf(dayIndex), area = areaById.get(areaId);
  let turns = ctx.CAL.turnsPerDay - ctx.CAL.travelCost;
  const got = {}, cells = new Set();
  while (turns > 0) {
    let y, x, k;
    do { y = (Math.random()*10)|0; x = (Math.random()*10)|0; k = y+','+x; } while (cells.has(k));
    cells.add(k); turns--;
    rollCell(area.grid[y][x], slot, date).forEach(f => got[f.itemId] = (got[f.itemId]||0) + f.quantity);
  }
  return got;
}

console.log('■ 一日の収穫（各エリア・昼・9マス調査を100日ぶん平均）');
TERRAINS_DATA.areas.forEach(a => {
  let total = 0, kinds = new Set();
  for (let i = 0; i < 100; i++) {
    const g = simulateDay(0, a.id, 'noon');
    Object.entries(g).forEach(([k,v]) => { total += v; kinds.add(k); });
  }
  console.log(`  ${a.name.padEnd(4)} 平均 ${(total/100).toFixed(1)} 個 / 出た種類 ${kinds.size}`);
});

console.log('\n■ 時間帯を変えると何が変わるか（森）');
SLOTS.forEach(s => {
  let total = 0, kinds = new Set();
  for (let i = 0; i < 60; i++) {
    const g = simulateDay(0, 'loc_forest', s);
    Object.entries(g).forEach(([k,v]) => { total += v; kinds.add(itemById.get(k).name); });
  }
  console.log(`  ${JP[s].padEnd(4)} 平均 ${(total/60).toFixed(1)} 個  ${[...kinds].slice(0,5).join('、')}`);
});

console.log('\n■ 稀少素材は本当に稀か（100日通う）');
[['ホウオウノハネ','loc_volcanic','noon'],['ホタルコウモリの牙','loc_cave','midnight'],
 ['ミツユキソウ','loc_highland','dawn'],['鏡の破片','loc_ruins','midnight']].forEach(([name,area,slot]) => {
  let hit = 0;
  for (let i = 0; i < 100; i++) {
    const g = simulateDay(9, area, slot);   // 9日目＝満月
    if (Object.keys(g).some(k => itemById.get(k).name === name)) hit++;
  }
  console.log(`  ${name.padEnd(12)} 100日通って ${hit} 日で入手`);
});

console.log('\n■ 採った素材で実際に調合できるか');
const g = simulateDay(0, 'loc_riverside', 'morning');
const names = Object.keys(g).map(k => itemById.get(k).name);
console.log('  川辺の朝の収穫:', names.join('、') || '（なし）');
const liquid = Object.keys(g).map(k => itemById.get(k)).find(i => i.categoryId === 'liquid');
if (liquid) {
  const r = checkRecipe([{ item: liquid, processId: 'distill' }], 'item_175');
  console.log(`  ${liquid.name} を薬瓶で蒸留 → ${r ? r.result : '失敗'}`);
} else {
  console.log('  水質素材は採れなかった（この日は運が悪い）');
}
