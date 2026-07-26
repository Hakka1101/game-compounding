// 記録・旗・出来事・結末・保存を通しで確かめる
const { JSDOM } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const built = html.replace(/<script src="([^"]+)"><\/script>/g,
  (m, f) => '<script>' + fs.readFileSync(f, 'utf8') + '<\/script>');
const dom = new JSDOM(built, { runScripts: 'dangerously', url: 'https://example.com/' });
const w = dom.window, d = w.document;

w.addEventListener('load', () => setTimeout(() => {
  const ev = x => w.eval(x);
  const S = ev('state');
  const click = el => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  const q = s => [...d.querySelectorAll(s)];

  console.log('■ 初期状態');
  console.log('  所持金 ' + S.money + ' / 紙片 ' + ev('heldSlips')().length + '枚（最初から28）');
  console.log('  保存: ' + (ev('hasSave')() ? 'あり ✓' : 'なし'));

  console.log('\n■ 旗の判定');
  ['fl_weapon_never_sold','fl_weapon_never_made','fl_solve_110','fl_earned_30k'].forEach(f =>
    console.log('  ' + f.padEnd(24) + ev('flagMet')(f)));

  console.log('\n■ 素材を与えて調合し、記録が残るか');
  const byName = new Map(ev('ITEMS_DATA').map(i => [i.name, i]));
  ['草木の朝露','イバラアザミ'].forEach(n => S.stock[byName.get(n).id] = 20);
  
  const liq = byName.get('草木の朝露');
  const r = ev('checkRecipe')([{ item: liq, processId: 'distill' }], 'item_175');
  S.slots = [{ item: liq, processId: 'distill' }];
  S.vesselId = 'item_175';
  click(d.getElementById('btn-compound'));
  console.log('  蒸留水を作った: ' + (S.unlockedRecipes.includes('蒸留水') ? 'はい ✓' : 'いいえ'));
  console.log('  craftCount: ' + JSON.stringify(S.craftCount) + ' / 初回日 ' + JSON.stringify(S.firstCraftDay));

  console.log('\n■ 朝の出来事');
  ev('openMorning')();
  console.log('  ' + (d.getElementById('event-overlay').classList.contains('hidden')
    ? '発生なし' : '「' + d.getElementById('event-title').textContent + '」'));
  click(d.getElementById('btn-event-ok'));
  console.log('  解禁された束: ' + JSON.stringify(S.unlockedBundles) + ' → 紙片 ' + ev('heldSlips')().length + '枚');

  console.log('\n■ 店');
  ev('showView')('shop');
  console.log('  売れるもの: ' + q('#sell-list .trade-entry').length + ' 種');
  const before = S.money;
  click(q('#sell-list .trade-btn')[0]);
  console.log('  一つ売った → 所持金 ' + before + ' → ' + S.money);
  console.log('  買えるもの: ' + q('#buy-list .trade-entry').length + ' 種（瓶2種のはず）');

  console.log('\n■ 凶器は店に出ないか');
  const weapon = byName.get('蛇牙の塗り毒');
  S.stock[weapon.id] = 3;
  ev('renderShop')();
  const names = q('#sell-list .item-name').map(e => e.textContent);
  console.log('  売り棚に凶器: ' + (names.includes('蛇牙の塗り毒') ? '出ている ✗' : '出ていない ✓'));
  console.log('  ' + d.getElementById('sell-note').textContent);

  console.log('\n■ 夜の客');
  S.pendingBuyer = true;
  ev('renderShop')();
  console.log('  客が来ている: ' + (!d.getElementById('buyer-area').classList.contains('hidden') ? 'はい ✓' : 'いいえ'));
  click(q('#buyer-list .trade-btn')[0]);
  console.log('  渡した → soldCountByDanger(凶器) = ' + ev('soldByDanger')('凶器'));
  console.log('  fl_weapon_never_sold = ' + ev('flagMet')('fl_weapon_never_sold') + '（false になるはず）');

  console.log('\n■ 保存と復元');
  const code = ev('exportSave')();
  const money = S.money;
  S.money = 99999;
  ev('importSave')(code);
  console.log('  書き出し ' + code.length + '文字 → 復元後の所持金 ' + S.money + '（' + money + ' に戻るはず）');

  console.log('\n■ 結末の判定');
  const e = ev('judgeEnding')();
  console.log('  「' + e.title + '」');
  console.log('  断片: ' + e.notes.length + '本');
  e.notes.forEach(t => console.log('    ' + t));

  console.log('\n起動エラー: ' + (d.querySelector('.boot-error') ? 'あり' : 'なし ✓'));
}, 0));
