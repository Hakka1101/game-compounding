// 表題 → 開幕 → 最初から始める の通し確認
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
  const click = id => d.getElementById(id).dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  const shown = id => !d.getElementById(id).classList.contains('hidden');
  const ok = (label, cond) => console.log((cond ? '  ✓ ' : '  ✗ ') + label);

  console.log('■ 起動（記録なし）');
  ok('起動できた', w.__bootOK && !d.querySelector('.boot-error'));
  ok('表題が出ている', shown('title-overlay'));
  ok('「続きから」は隠れている', !shown('btn-title-continue'));
  ok('借財 ' + d.getElementById('debt').textContent, d.getElementById('debt').textContent === '8,000');
  ok('借財が朱く出ている（所持金 ' + S.money + '）',
     d.querySelector('.day-debt').classList.contains('debt-short'));

  console.log('\n■ 始める → 開幕');
  click('btn-title-new');
  ok('表題が消えた', !shown('title-overlay'));
  ok('開幕が出た', shown('opening-overlay'));
  const pages = ev('OPENING_DATA').pages.length;
  for (let i = 0; i < pages; i++) {
    const t = d.getElementById('opening-title').textContent;
    const n = d.getElementById('opening-page').textContent;
    console.log('    ' + n + '  ' + t + '　→ ' + d.getElementById('btn-opening-next').textContent);
    click('btn-opening-next');
  }
  ok('最後まで送ると閉じた', !shown('opening-overlay'));

  console.log('\n■ 進めてから、最初から始める');
  const byName = new Map(ev('ITEMS_DATA').map(i => [i.name, i]));
  S.stock[byName.get('ニガタケ').id] = 9;
  S.money = 5000; S.totalEarned = 5000;
  S.unlockedRecipes.push('傷薬'); S.firedEvents.push('ev_room_1');
  ev('startDay')(40);
  ev('saveGame')();
  ok('保存された', ev('hasSave')());
  w.confirm = () => true;
  ev('startNewGame')();
  ok('所持金が戻った ' + S.money, S.money === 200);
  ok('持ち物が空になった', Object.keys(S.stock).length === 0);
  ok('解いた調合が空になった', S.unlockedRecipes.length === 0);
  ok('出来事の記録が消えた', S.firedEvents.length === 0);
  ok('暦が1日目に戻った', ev('explore').day.date.index === 0);
  ok('借財が戻った ' + S.debt, S.debt === 8000);
  ok('開幕がまた出た', shown('opening-overlay'));
  click('btn-opening-skip');

  console.log('\n■ 期日の判定');
  S.money = 100;
  let e = ev('judgeEnding')();
  ok('返せなければ「' + e.title + '」', e.id === 'en_foreclosed');
  S.money = 8000;
  e = ev('judgeEnding')();
  ok('返せれば通常の結末「' + e.title + '」', e.id !== 'en_foreclosed');
  ev('startDay')(160);
  ev('showEnding')();
  ok('結末が出た', shown('ending-overlay'));
  const notes = [...d.querySelectorAll('#ending-notes li')].map(li => li.textContent);
  ok('借財の一行が入った：' + (notes[0] || 'なし'), notes[0] === ev('OPENING_DATA').repaidNote);
  click('btn-ending-ok');
  ok('「最初から始める」で開幕へ戻った', shown('opening-overlay') && S.money === 200);
  click('btn-opening-skip');

  console.log('\n■ 続きから');
  ev('saveGame')();
  ev('openTitle')();
  ok('「続きから」が出ている', shown('btn-title-continue'));
  console.log('    ' + d.getElementById('title-note').textContent);
  click('btn-title-continue');
  ok('表題が閉じた', !shown('title-overlay'));

  if (w.__bootError) console.log('\n起動時エラー: ' + w.__bootError.message);
}, 60));
