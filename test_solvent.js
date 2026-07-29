// 飲む・塗る薬が蒸留水を溶媒に取るか、瓶の収支が変わっていないかを確かめる
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
  const S = ev('state'), PHIAL = ev('VESSEL_PHIAL');
  const byName = new Map(ev('ITEMS_DATA').map(i => [i.name, i]));
  const give = (n, k) => { S.stock[byName.get(n).id] = k; S.everHeld[byName.get(n).id] = true; };
  const make = slots => { S.slots = slots; d.getElementById('btn-compound')
      .dispatchEvent(new w.MouseEvent('click', { bubbles: true })); };
  const I = n => byName.get(n);

  console.log('■ 汲んだ水では傷薬にならない（蒸留を挟む必要がある）');
  give('瀬の走り水', 10); give('イバラアザミ', 10);
  make([{ item: I('イバラアザミ'), processId: 'boil' },
        { item: I('瀬の走り水'), processId: 'raw' }]);
  ok('汲んだ水では成立しない', !S.craftCount['野草の傷薬']);

  console.log('\n■ 蒸留水なら通る（祖母の手当て）');
  const bottles0 = S.vessels[PHIAL];
  make([{ item: I('瀬の走り水'), processId: 'distill' }]);
  ok('蒸留水ができた', S.craftCount['蒸留水'] === 1);
  make([{ item: I('イバラアザミ'), processId: 'boil' },
        { item: I('蒸留水'), processId: 'raw' }]);
  ok('野草の傷薬ができた', S.craftCount['野草の傷薬'] === 1);
  ok('薬瓶の収支は1本（従来と同じ）', S.vessels[PHIAL] === bottles0 - 1,
     bottles0 + ' → ' + S.vessels[PHIAL]);

  console.log('\n■ 他の3つも蒸留水で通るか');
  give('ニガハシリダケ', 5); give('オオツユグサ', 5);
  give('鍾乳洞の滴り', 5); give('冷却晶', 5); give('酒精', 5); give('ハッカガヤ', 5);
  give('蒸留水', 10);
  make([{ item: I('ニガハシリダケ'), processId: 'grind' }, { item: I('蒸留水'), processId: 'boil' }]);
  ok('加速の秘薬', !!S.craftCount['加速の秘薬']);
  make([{ item: I('オオツユグサ'), processId: 'boil' },
        { item: I('鍾乳洞の滴り'), processId: 'raw' },
        { item: I('蒸留水'), processId: 'raw' }]);
  ok('鎮静の丸薬', !!S.craftCount['鎮静の丸薬']);
  make([{ item: I('ハッカガヤ'), processId: 'boil' },
        { item: I('冷却晶'), processId: 'raw' },
        { item: I('蒸留水'), processId: 'raw' }]);
  ok('解熱の煎じ薬', !!S.craftCount['解熱の煎じ薬']);
  make([{ item: I('酒精'), processId: 'raw' }, { item: I('蒸留水'), processId: 'raw' }]);
  ok('傷口洗浄液（紙片の「蒸留した水で割る」どおりに通る）', !!S.craftCount['傷口洗浄液']);

  console.log('\n■ 中間素材は汲んだ水のままか');
  give('鍾乳洞の滴り', 5);
  make([{ item: I('瀬の走り水'), processId: 'boil' }, { item: I('鍾乳洞の滴り'), processId: 'raw' }]);
  ok('凝固薬は汲んだ水で作れる', !!S.craftCount['凝固薬']);
  make([{ item: I('瀬の走り水'), processId: 'distill' }]);
  ok('蒸留水も従来どおり', S.craftCount['蒸留水'] >= 2);

  console.log('\n' + (ng === 0 ? '=== すべて通過 ===' : '=== 失敗 ' + ng + ' 件 ==='));
}, 80));
