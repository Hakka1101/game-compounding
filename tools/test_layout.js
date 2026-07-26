// 採取 → 素材を持つ → 素材メモと紙片を同時に読む → 調合して結果を見る
const { JSDOM } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const built = html.replace(/<script src="([^"]+)"><\/script>/g,
  (m, f) => '<script>' + fs.readFileSync(f, 'utf8') + '<\/script>');
const dom = new JSDOM(built, { runScripts: 'dangerously', url: 'file:///' });
const w = dom.window, d = w.document;

dom.window.addEventListener('load', () => setTimeout(() => {
  const click = el => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  const txt = id => (d.getElementById(id).textContent || '').replace(/\s+/g, ' ').trim();
  const q = sel => [...d.querySelectorAll(sel)];

  // 採取に出て素材を集める
  click(q('.view-tab')[1]);
  click(q('#timeslot-btns .slot-btn')[2]);        // 昼
  click(q('#area-btns .area-btn')[1]);            // 草原
  const cells = q('#map-grid .map-cell');
  for (let i = 0; i < 10 && !d.getElementById('phase-out').classList.contains('hidden'); i++) click(cells[i]);
  console.log('■ 採取');
  console.log('  ' + txt('haul-summary'));

  // 工房へ戻る
  click(q('.view-tab')[0]);
  console.log('\n■ 同時閲覧');
  click(q('#slip-index .slip-entry')[0]);
  const slip = txt('memo-sheet');
  console.log('  紙片   : ' + slip.slice(0, 34));
  const items = q('#item-list .item-entry');
  console.log('  棚の素材: ' + items.length + ' 種');
  click(items[0]);
  console.log('  素材メモ: ' + txt('item-memo').slice(0, 34));
  console.log('  紙片は残っているか: ' + (txt('memo-sheet') === slip ? 'はい ✓' : 'いいえ ✗'));

  // 蒸留水を作ってみる
  console.log('\n■ 調合と結果');
  const liq = items.find(el => {
    const name = el.querySelector('.item-name').textContent;
    return ['草木の朝露', '雨溜まりの泥水', '鉄渋の湧き水'].includes(name);
  });
  if (liq) {
    click(liq);
    const procs = q('.ingredient-slot.filled .process-btn');
    click(procs.find(b => b.textContent === '蒸留'));
    click(q('.vessel-btn').find(b => b.textContent.includes('薬瓶')));
    click(d.getElementById('btn-compound'));
    console.log('  ' + txt('result-display').slice(0, 60));
  } else {
    console.log('  水質素材が採れなかったので調合は試せず');
  }

  // 結果欄がどこにあるか
  console.log('\n■ 配置');
  const res = d.getElementById('result-display');
  console.log('  結果欄の親: #' + res.closest('section').id);
  console.log('  素材メモの親: #' + d.getElementById('item-memo').closest('section').id);
  console.log('  紙片の親  : #' + d.getElementById('memo-sheet').closest('section').id);
  console.log('  調合ボタンと結果欄は隣接: ' +
    (d.querySelector('.compound-area').nextElementSibling === res ? 'はい ✓' : 'いいえ ✗'));
  console.log('\n起動エラー: ' + (d.querySelector('.boot-error') ? 'あり' : 'なし ✓'));
}, 0));
