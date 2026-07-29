// 棚に全採取素材が並び、未入手でも手がかりが読めるかを確かめる
const { JSDOM } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const built = html.replace(/<script src="([^"]+)"><\/script>/g,
  (m, f) => '<script>' + fs.readFileSync(f, 'utf8') + '<\/script>');
const dom = new JSDOM(built, { runScripts: 'dangerously', url: 'https://example.com/' });
const w = dom.window, d = w.document;
let ng = 0;
const ok = (l, c, x) => { console.log('  ' + (c ? '✓ ' : '✗ ') + l + (x ? '　' + x : '')); if (!c) ng++; };

w.addEventListener('load', () => setTimeout(() => {
  const ev = q => w.eval(q);
  const S = ev('state');
  const ITEMS = ev('ITEMS_DATA');
  const byName = new Map(ITEMS.map(i => [i.name, i]));
  const click = el => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  const gathered = ITEMS.filter(i => i.source === '採取').length;

  console.log('■ 開始直後の棚（何も持っていない）');
  const rows = d.querySelectorAll('#item-list .item-entry');
  ok('採取素材が ' + gathered + ' 種すべて並ぶ', rows.length === gathered, rows.length + ' 行');
  ok('全部が未入手の見た目', d.querySelectorAll('#item-list .item-entry.unheld').length === gathered);
  ok('調合品は伏せられている',
     ![...rows].some(r => (ITEMS.find(i => i.id === r.dataset.id) || {}).source === '調合'));
  ok('薬瓶・気体瓶は棚に出ない',
     ![...rows].some(r => ['item_088', 'item_175'].includes(r.dataset.id)));

  console.log('\n■ 未入手のイバラアザミを押す（祖母の手当ての手がかり）');
  const azami = byName.get('イバラアザミ');
  click([...rows].find(r => r.dataset.id === azami.id));
  const memo = d.getElementById('item-memo').textContent;
  ok('覚え書きが開く', memo.includes('イバラアザミ'));
  ok('説明文が読める（棘・傷が照合できる）', memo.includes('トゲ') && memo.includes('傷'));
  ok('エリア名が出る', /森|草原|川辺|廃村/.test(memo), memo.replace(/\s+/g, ' ').slice(-60));
  ok('地形名は伏せられている', !memo.includes('低木') && !memo.includes('裸地'));
  ok('時間帯は伏せられている', !memo.includes('夜明け') && !memo.includes('午後'));
  ok('調合台には載らない', S.slots.length === 0);

  console.log('\n■ 手に入れたあと');
  S.stock[azami.id] = 2;
  S.everHeld[azami.id] = true;
  ev('renderItemList()'); ev('renderItemMemo()');
  const memo2 = d.getElementById('item-memo').textContent;
  ok('詳細な書き付けが出る', memo2.includes(azami.note.slice(0, 12)));
  ok('地形が出る', memo2.includes('草むら') && memo2.includes('低木'));
  ok('時間帯が出る', memo2.includes('夜明け'));
  const row = [...d.querySelectorAll('#item-list .item-entry')].find(r => r.dataset.id === azami.id);
  ok('薄表示が外れる', !row.classList.contains('unheld'));
  click(row);
  ok('調合台に載る', S.slots.length === 1);

  console.log('\n■ 検索と絞り込みが未入手にも効くか');
  S.query = '湧き水'; ev('renderItemList()');
  ok('名前で引ける', d.querySelectorAll('#item-list .item-entry').length === 1);
  S.query = ''; S.filter = 'liquid'; ev('renderItemList()');
  const liq = ITEMS.filter(i => i.source === '採取' && i.categoryId === 'liquid').length;
  ok('水質だけに絞れる（' + liq + '種）',
     d.querySelectorAll('#item-list .item-entry').length === liq);

  console.log('\n' + (ng === 0 ? '=== すべて通過 ===' : '=== 失敗 ' + ng + ' 件 ==='));
}, 80));
