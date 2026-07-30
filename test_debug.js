// デバッグモードの確認
//   const で宣言された値は window に乗らないので、判定はページ内で eval して行う
const { JSDOM } = require('jsdom');
const fs = require('fs');
const SAVE_KEY = 'chougoujo.save.v1';

async function boot(flag) {
  const html = fs.readFileSync('index.html', 'utf8')
    .replace('</body>', '<script src="debug.js"></script></body>');
  const built = html.replace(/<script src="([^"]+)"><\/script>/g,
    (m, f) => '<script>' + fs.readFileSync(f, 'utf8') + '<\/script>');
  const dom = new JSDOM(built, { runScripts: 'dangerously', url: 'https://localhost/', pretendToBeVisual: true });
  const w = dom.window;
  if (flag) w.localStorage.setItem('chougoujo.debug', '1');
  await new Promise(r => w.addEventListener('load', () => setTimeout(r, 40)));
  return w;
}
const ok = (c, m) => { console.log(`  ${c ? '✓' : '✗ ★'} ${m}`); if (!c) process.exitCode = 1; };

(async () => {
  console.log('■ 通常起動（デバッグ off）');
  let w = await boot(false);
  const E = s => w.eval(s);
  ok(!w.document.querySelector('.boot-error'), '起動エラーなし');
  ok(E('ITEMS_DATA.filter(i=>held(i.id)>0).length') < 20, '棚は空に近い');
  ok(!!w.document.querySelector('.dbg-toggle'), '足元に「デバッグ」の入り口がある');
  ok(!w.document.getElementById('dbg-bar'), 'デバッグの帯はまだ無い');

  console.log('\n■ 入り口を押す');
  const realBefore = w.localStorage.getItem(SAVE_KEY);
  w.document.querySelector('.dbg-toggle').dispatchEvent(new w.Event('click'));
  await new Promise(r => setTimeout(r, 20));
  ok(!!w.document.getElementById('dbg-bar'), 'デバッグの帯が出る');
  const nAll = E('ITEMS_DATA.filter(i=>i.id!==VESSEL_GLASS&&i.id!==VESSEL_PHIAL).length');
  ok(E('ITEMS_DATA.filter(i=>i.id!==VESSEL_GLASS&&i.id!==VESSEL_PHIAL).every(i=>held(i.id)>=9999)'),
     `全 ${nAll} 種が 9999 以上`);
  ok(E('held(VESSEL_PHIAL)>=9999 && held(VESSEL_GLASS)>=9999'), '器も無尽蔵');
  ok(E('heldSlips().length===HINTS_DATA.length'), `全紙片が手元にある（${E('heldSlips().length')}/${E('HINTS_DATA.length')} 枚）`);
  ok(E('visibleItems().length')===nAll, `素材一覧に全 ${nAll} 種が並ぶ`);
  ok(E('explore.day.turnsLeft')>=99, `ターンが ${E('explore.day.turnsLeft')}`);
  ok(E('CAL.maxMapsPerDay>=99 && CAL.travelCost===0'), '場所と移動の制限が外れた');
  ok(w.document.querySelectorAll('#item-list .item-entry').length===nAll, '画面の素材一覧も全種');

  console.log('\n■ 本来の記録を汚さないか');
  E('saveGame()');
  ok(w.localStorage.getItem(SAVE_KEY)===realBefore, 'saveGame() が記録を書き換えない');
  const snap = JSON.parse(w.localStorage.getItem(SAVE_KEY)||'{}');
  ok(!(snap.state && Object.values(snap.state.stock||{}).some(v=>v>=9999)), '記録に 9999 が混ざっていない');

  console.log('\n■ 調合しても減らないか');
  E(`state.slots=[{item:ITEMS_DATA.find(i=>i.name==='草木の朝露'),processId:'boil'},
                  {item:ITEMS_DATA.find(i=>i.name==='ネバリイグチ'),processId:'raw'}]; handleCompound();`);
  ok(E("state.unlockedRecipes.includes('凝固薬')"), '草木の朝露＋ネバリイグチ → 凝固薬 が成立');
  ok(E("held(ITEMS_DATA.find(i=>i.name==='草木の朝露').id)>=9999"), '使った素材が減っていない');

  console.log('\n■ 蒸留水では失敗するか（紙片の誤りの再現）');
  E(`state.slots=[{item:ITEMS_DATA.find(i=>i.name==='蒸留水'),processId:'boil'},
                  {item:ITEMS_DATA.find(i=>i.name==='ネバリイグチ'),processId:'raw'}]; handleCompound();`);
  ok(!w.document.getElementById('state-failure').classList.contains('hidden'),
     '蒸留水（煮る）＋ネバリイグチ → しくじる');

  console.log('\n■ 採取：同じマスを何度でも');
  E(`chooseTimeSlot(TIME_SLOTS[0].id); enterArea(TERRAINS_DATA.areas[0].id);`);
  ok(E("explore.phase")==='out', '外に出られた');
  E('searchCell(0,0); searchCell(0,0); searchCell(0,0);');
  ok(E('explore.day.turnsLeft')>=99, `三度調べてもターンが減らない（${E('explore.day.turnsLeft')}）`);
  ok(E("explore.phase")==='out', '日が暮れない');
  ok(!w.document.querySelector('#map-grid .map-cell').disabled, 'マスがまた押せる');

  console.log('\n■ 帯のボタン');
  const btn = [...w.document.querySelectorAll('.dbg-btn')];
  btn.find(b=>b.textContent==='出直す').dispatchEvent(new w.Event('click'));
  ok(E("explore.phase")==='before', '「出直す」で時間帯の選択に戻る');
  const d0 = E('explore.day.date.index');
  btn.find(b=>b.textContent==='翌日へ').dispatchEvent(new w.Event('click'));
  ok(E('explore.day.date.index')===d0+1, '「翌日へ」で日付が進む');
  btn.find(b=>b.textContent.startsWith('全レシピ')).dispatchEvent(new w.Event('click'));
  ok(E('state.unlockedRecipes.length')===E('RECIPES_DATA.length'), `「全レシピ」で ${E('RECIPES_DATA.length')} 本すべて解いた扱い`);

  console.log('\n■ 旗を立てて読み込み直したとき');
  w.close();
  w = await boot(true);
  const E2 = s => w.eval(s);
  ok(!w.document.querySelector('.boot-error'), '起動エラーなし');
  ok(!!w.document.getElementById('dbg-bar'), '最初からデバッグの帯が出る');
  ok(E2('ITEMS_DATA.filter(i=>held(i.id)>=9999).length')>150, '棚が満ちている');
  w.close();
  console.log(process.exitCode ? '\n★ 失敗あり' : '\nすべて通過');
})();
