// 器の自動使用・自動回収・二重消費の有無を確かめる
const { JSDOM } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const built = html.replace(/<script src="([^"]+)"><\/script>/g,
  (m, f) => '<script>' + fs.readFileSync(f, 'utf8') + '<\/script>');
const dom = new JSDOM(built, { runScripts: 'dangerously', url: 'https://example.com/' });
const w = dom.window, d = w.document;

let ng = 0;
const ok = (label, cond, detail) => {
  console.log('  ' + (cond ? '✓ ' : '✗ ') + label + (detail ? '　' + detail : ''));
  if (!cond) ng++;
};

w.addEventListener('load', () => setTimeout(() => {
  const ev = x => w.eval(x);
  const S = ev('state');
  const PHIAL = ev('VESSEL_PHIAL'), GLASS = ev('VESSEL_GLASS');
  const byName = new Map(ev('ITEMS_DATA').map(i => [i.name, i]));
  const click = el => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  const compound = () => click(d.getElementById('btn-compound'));

  console.log('■ 開始時の瓶');
  ok('薬瓶 ' + S.vessels[PHIAL] + ' 本 / 気体瓶 ' + S.vessels[GLASS] + ' 本',
     S.vessels[PHIAL] === 5 && S.vessels[GLASS] === 5);

  console.log('\n■ 器を選ばずに液体を調合できるか（蒸留水 ← 水質を蒸留）');
  const dew = byName.get('瀬の走り水');
  ok('新しい水質が読み込まれている', !!dew);
  S.stock[dew.id] = 10;
  const before = S.vessels[PHIAL];
  S.slots = [{ item: dew, processId: 'distill' }];
  compound();
  ok('蒸留水ができた', S.craftCount['蒸留水'] === 1);
  ok('薬瓶が1本減った', S.vessels[PHIAL] === before - 1, before + ' → ' + S.vessels[PHIAL]);

  console.log('\n■ 売っても瓶は二重に減らないか');
  const water = byName.get('蒸留水');
  const v1 = S.vessels[PHIAL];

  w.eval(`doSell(${JSON.stringify(water.id)}, 1)`);
  ok('売却で薬瓶は減らない', S.vessels[PHIAL] === v1, v1 + ' → ' + S.vessels[PHIAL]);

  console.log('\n■ 中身を材料に使うと瓶は戻るか');
  S.stock[water.id] = 1;
  S.stock[dew.id] = 10;
  const v2 = S.vessels[PHIAL];
  // 純化水 = 蒸留水(raw) + 分離特性の素材(dissolve)
  const sep = byName.get('川原の伏流水');
  S.stock[sep.id] = 5;
  S.slots = [{ item: water, processId: 'raw' }, { item: sep, processId: 'dissolve' }];
  compound();
  ok('純化水ができた', S.craftCount['純化水'] === 1);
  ok('蒸留水の瓶が戻り、純化水の瓶が出て差引ゼロ',
     S.vessels[PHIAL] === v2, v2 + ' → ' + S.vessels[PHIAL]);

  console.log('\n■ 瓶が無いときは材料を消費せずに止まるか');
  S.vessels[PHIAL] = 0;
  S.stock[dew.id] = 3;
  const stockBefore = S.stock[dew.id];
  const madeBefore = S.craftCount['蒸留水'];
  S.slots = [{ item: dew, processId: 'distill' }];
  compound();
  ok('調合は成立しない', S.craftCount['蒸留水'] === madeBefore);
  ok('材料は減っていない', S.stock[dew.id] === stockBefore,
     stockBefore + ' → ' + S.stock[dew.id]);
  ok('スロットは残っている（買い足して再挑戦できる）', S.slots.length === 1);

  console.log('\n■ 気体は気体瓶を使うか');
  S.vessels[PHIAL] = 5;
  const gasRecipe = ev('RECIPES_DATA').find(r => r.vessel === GLASS);
  const g0 = S.vessels[GLASS];
  const plan = ev('planCraft')(gasRecipe);
  if (plan) {
    ev('consume')(gasRecipe, plan);
    ok(gasRecipe.result + ' で気体瓶が1本減った', S.vessels[GLASS] === g0 - 1,
       g0 + ' → ' + S.vessels[GLASS]);
  } else {
    // 材料が手元に無いので、消費計算だけ直接確かめる
    S.stock = {};
    ev('consume')(gasRecipe, []);
    ok(gasRecipe.result + ' で気体瓶が1本減った', S.vessels[GLASS] === g0 - 1,
       g0 + ' → ' + S.vessels[GLASS]);
  }

  console.log('\n■ 器の選択ボタンが残っていないか');
  ok('vessel-btn は存在しない', d.querySelectorAll('.vessel-btn').length === 0);
  ok('本数表示は出ている', d.querySelectorAll('.vessel-stat').length === 2);
  ok('気体瓶の名前になっている',
     /気体瓶/.test(d.querySelector('.vessel-area').textContent));

  console.log('\n' + (ng === 0 ? '=== すべて通過 ===' : '=== 失敗 ' + ng + ' 件 ==='));
}, 60));
