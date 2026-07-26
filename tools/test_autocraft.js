// レシピからの直接調合を検証（安い素材から使うか、稀少品を守るか）
const fs = require('fs'), vm = require('vm');
const ctx = vm.createContext({ console, Math });
const load = f => vm.runInContext(fs.readFileSync(f, 'utf8').replace(/^const /gm, 'var '), ctx);
['data_categories.js','data_effects.js','data_processes.js','data_items.js','data_recipes.js'].forEach(load);
const mn = fs.readFileSync('main.js', 'utf8');
[/const VESSEL_GLASS[\s\S]*?const START_VESSELS = \d+;/, /const itemById[\s\S]*?const catById\s*=.*?;/,
 /const recipeByResult[\s\S]*?;/, /const RECIPES_SORTED[\s\S]*?^}/m, /^function checkRecipe[\s\S]*?^}/m,
 /^const FIELD = \{[\s\S]*?^\};/m, /^function matches[\s\S]*?^}/m,
 /^function planCraft[\s\S]*?^}/m].forEach(re => vm.runInContext(mn.match(re)[0].replace(/^const /gm, 'var '), ctx));

// 所持を差し替え
const stock = {};
vm.runInContext('var state = { stock: {}, vessels: {} };', ctx);
vm.runInContext(`function held(id){ return (state.vessels[id] !== undefined) ? state.vessels[id] : (state.stock[id] || 0); }`, ctx);
ctx.state.vessels = { item_088: 5, item_175: 5 };

const byName = new Map(ctx.ITEMS_DATA.map(i => [i.name, i]));
const give = (name, n) => { ctx.state.stock[byName.get(name).id] = n; };
const plan = name => ctx.planCraft(ctx.recipeByResult.get(name));
const show = p => p ? p.map(x => `${x.item.name}→${x.processId}`).join(' / ') : '（組めない）';

console.log('■ 材料が無いとき');
console.log('  野草の傷薬:', show(plan('野草の傷薬')));

console.log('\n■ 材料を渡す');
give('イバラアザミ', 5); give('草木の朝露', 5);
console.log('  野草の傷薬:', show(plan('野草の傷薬')));

console.log('\n■ 安いものから使うか（治癒の効を持つ素材を複数所持）');
give('ミツユキソウ', 3);          // 神秘・高価
give('ハッカガヤ', 4);            // 治癒・安価
console.log('  薬草粉  :', show(plan('薬草粉')));

console.log('\n■ 稀少素材を勝手に使わないか（神秘の効の指定）');
give('霊銀砂', 0);
give('オオミミウサギの乾き耳', 2); // 神秘・価格45
give('ホタルコウモリの牙', 1);     // 神秘・価格45（極稀）
const p = plan('霊銀砂');
console.log('  霊銀砂  :', show(p));

console.log('\n■ 同じ素材を2つ要求する場合、所持数が足りるか');
give('草木の朝露', 1);
console.log('  所持1個で純化水:', show(plan('純化水')));
give('蒸留水', 1); give('深層の塩水', 2);
console.log('  中間素材を渡して:', show(plan('純化水')));

console.log('\n■ 5素材の伝説級');
['超純水','促進触媒','霊銀砂','活性水'].forEach(n => give(n, 3));
give('ミツユキソウ', 3); give('イバラアザミ', 3);
console.log('  魔女レウィシアの秘薬:', show(plan('魔女レウィシアの秘薬')));
