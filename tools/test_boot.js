// ファイルが欠けたときに、画面へ理由が出るかを確かめる
const { JSDOM } = require('jsdom');
const fs = require('fs'), path = require('path');

async function run(missing) {
  const html = fs.readFileSync('index.html', 'utf8');
  // src の中身を実ファイルで埋め込み、欠落させたいものは空にする
  const built = html.replace(/<script src="([^"]+)"><\/script>/g, (m, f) =>
    f === missing ? '<!-- ' + f + ' は欠落 -->' : '<script>' + fs.readFileSync(f, 'utf8') + '<\/script>');
  const dom = new JSDOM(built, { runScripts: 'dangerously', url: 'file:///' });
  await new Promise(r => dom.window.addEventListener('load', () => setTimeout(r, 0)));
  const box = dom.window.document.querySelector('.boot-error');
  return box ? box.textContent.replace(/\s+/g, ' ').trim() : null;
}

(async () => {
  console.log('■ 欠落したときの表示');
  for (const f of ['explore.js', 'calendar.js', 'data_spawns.js', 'data_terrains.js', 'main.js']) {
    const msg = await run(f);
    console.log('  ' + f.padEnd(18) + (msg ? msg : '★ 何も出ない（黙って死ぬ）'));
  }
  console.log('\n■ すべて揃っているとき');
  const ok = await run(null);
  console.log('  ' + (ok ? '★ 誤検知: ' + ok : 'エラー表示なし（正常）'));
})();
