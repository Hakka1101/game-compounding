// 一日の流れ（出発 → 探索 → 帰宅 → 翌日）を画面なしで検証
const fs = require('fs'), vm = require('vm');
const calls = [];
const stub = new Proxy({}, { get: () => () => {} });
const doc = {
  getElementById: () => ({ classList: { toggle(){}, add(){}, remove(){} }, addEventListener(){},
                           set textContent(v){}, set innerHTML(v){}, appendChild(){}, querySelectorAll: () => [] }),
  querySelector: () => ({ classList: { toggle(){} } }),
  querySelectorAll: () => [],
  createElement: () => ({ classList: { toggle(){}, add(){} }, style: {}, addEventListener(){}, setAttribute(){} }),
  addEventListener(){},
};
const ctx = vm.createContext({ console, Math, document: doc,
  flash: m => calls.push(m), renderAll: () => {}, renderItemList: () => {}, showView: () => {},
  state: { stock: {} }, catById: new Map() });
const load = f => vm.runInContext(fs.readFileSync(f, 'utf8').replace(/^const /gm, 'var '), ctx);
['data_calendar.js','calendar.js','data_terrains.js','data_spawns.js','data_items.js'].forEach(load);
vm.runInContext('var itemById = new Map(ITEMS_DATA.map(i => [i.id, i]));', ctx);
load('explore.js');

const { explore, startDay, chooseTimeSlot, enterArea, searchCell, goHome, nextDay, restDay, CAL } = ctx;

console.log('■ 一日の流れ');
startDay(0);
console.log('  開始       phase=' + explore.phase + ' turns=' + explore.day.turnsLeft);
chooseTimeSlot('noon');
console.log('  時間帯決定 phase=' + explore.phase + ' slot=' + explore.day.timeSlot);
enterArea('loc_meadow');
console.log('  草原へ     phase=' + explore.phase + ' turns=' + explore.day.turnsLeft);

let n = 0;
outer:
for (let y = 0; y < 10; y++) for (let x = 0; x < 10; x++) {
  if (explore.phase !== 'out') break outer;
  searchCell(y, x); n++;
}
console.log('  ' + n + 'マス調べた → phase=' + explore.phase + ' turns=' + explore.day.turnsLeft);
console.log('  自動で帰宅したか: ' + (explore.phase === 'after' ? 'した ✓' : 'していない ✗'));
const haul = Object.entries(explore.haul);
console.log('  収穫: ' + haul.length + '種 / ' + haul.reduce((a,[,v]) => a+v, 0) + '点');

console.log('\n■ 帰宅後にできないこと');
enterArea('loc_forest');
console.log('  ' + calls[calls.length-1]);

console.log('\n■ 翌日へ');
nextDay();
console.log('  ' + ctx.formatDate(explore.day.date) + ' phase=' + explore.phase + ' turns=' + explore.day.turnsLeft);

console.log('\n■ 休んで日を送る');
restDay();
console.log('  ' + ctx.formatDate(explore.day.date) + ' / ' + calls[calls.length-1]);

console.log('\n■ 移動でターンを使うか');
startDay(3); chooseTimeSlot('morning');
enterArea('loc_forest');  const t1 = explore.day.turnsLeft;
enterArea('loc_cave');    const t2 = explore.day.turnsLeft;
enterArea('loc_swamp');   const t3 = explore.day.turnsLeft;
enterArea('loc_ruins');
console.log('  森' + t1 + ' → 洞窟' + t2 + ' → 沼地' + t3 + ' → 4か所目: ' + calls[calls.length-1]);
console.log('  回った場所: ' + explore.day.mapsVisited.length + ' / ' + CAL.maxMapsPerDay);
