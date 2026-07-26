// ブラウザと同じ条件で読み込み、実際にボタンを押して確かめる
const { JSDOM } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const files = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);
const dom = new JSDOM(html.replace(/<script src="[^"]+"><\/script>/g, ''),
                      { runScripts: 'dangerously', url: 'file:///' });
const w = dom.window, d = w.document;
const errs = [];
w.addEventListener('error', e => errs.push(e.message));
files.forEach(f => { const s = d.createElement('script'); s.textContent = fs.readFileSync(f, 'utf8'); d.body.appendChild(s); });
d.dispatchEvent(new w.Event('DOMContentLoaded', { bubbles: true }));

const click = el => { try { el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })); }
                      catch (e) { errs.push('click: ' + e.message); } };
const vis = id => !d.getElementById(id).classList.contains('hidden');
const txt = id => (d.getElementById(id).textContent || '').trim();

console.log('■ 採取タブを押す');
const tabs = [...d.querySelectorAll('.view-tab')];
console.log('  押す前: 採取画面=' + vis('view-explore') + ' 工房=' + !d.querySelector('.game-main').classList.contains('hidden'));
click(tabs[1]);
console.log('  押した後: 採取画面=' + vis('view-explore') + ' 工房=' + !d.querySelector('.game-main').classList.contains('hidden'));
console.log('  出発前の欄=' + vis('phase-before') + ' 休むボタン=' + !!d.getElementById('btn-rest-big'));

console.log('\n■ 日を送る（休む）');
console.log('  前: ' + txt('day-date'));
click(d.getElementById('btn-rest-big'));
console.log('  後: ' + txt('day-date'));
click(d.getElementById('btn-rest'));
console.log('  もう一度: ' + txt('day-date'));

console.log('\n■ 出かけてマスを調べる');
click([...d.querySelectorAll('#timeslot-btns .slot-btn')][2]);   // 昼
console.log('  時間帯を選択 → ' + txt('timeslot-note'));
click([...d.querySelectorAll('#area-btns .area-btn')][1]);       // 草原
console.log('  草原へ → 探索中=' + vis('phase-out') + ' / ' + txt('day-turns'));
const cells = [...d.querySelectorAll('#map-grid .map-cell')];
console.log('  マス数: ' + cells.length);
for (let i = 0; i < 10 && vis('phase-out'); i++) click(cells[i]);
console.log('  10マス調べた → 帰宅後=' + vis('phase-after') + ' / ' + txt('day-turns'));
console.log('  収穫: ' + txt('haul-summary'));

console.log('\n■ 翌日へ');
click(d.getElementById('btn-next-day'));
console.log('  ' + txt('day-date') + ' / ' + txt('day-turns'));

console.log('\n例外: ' + (errs.length ? errs.join(' | ') : 'なし ✓'));
