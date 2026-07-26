// 暦・月齢・天候の検証
const fs = require('fs'), vm = require('vm');
const ctx = vm.createContext({ console, module: {} });
const load = f => vm.runInContext(fs.readFileSync(f, 'utf8').replace(/^const /gm, 'var '), ctx);
['data_calendar.js', 'data_hints.js', 'data_items.js', 'calendar.js'].forEach(load);

const { dateOf, formatDate, conditionMet, CAL, DAYS_PER_YEAR } = ctx;
const SEED = 12345;

console.log('■ 暦の骨格');
console.log('  1月=' + ctx.DAYS_PER_MONTH + '日 / 1年=' + DAYS_PER_YEAR + '日 / 期限=' + CAL.deadlineDays + '日');
[0, 9, 19, 20, 99, 159].forEach(i => {
  const d = dateOf(i);
  console.log(`  ${String(i).padStart(3)}日目 ${formatDate(d)} ${d.season} ${d.moonName}${d.moonCondition ? '★' : ''} 残${d.remaining}`);
});

console.log('\n■ 月齢の周期');
const fulls = [], news = [];
for (let i = 0; i < DAYS_PER_YEAR; i++) {
  const d = dateOf(i);
  if (d.moonCondition === '満月') fulls.push(i);
  if (d.moonCondition === '新月') news.push(i);
}
console.log('  満月 ' + fulls.length + '回 / 間隔 ' + (fulls[1] - fulls[0]) + '日 → ' + fulls.join(','));
console.log('  新月 ' + news.length + '回 / 間隔 ' + (news[1] - news[0]) + '日');

console.log('\n■ 条件付き素材が1年で何日採れるか');
const CONDS = [['満月', 'ホウオウノハネ'], ['春', '雪解けの走り水']];
CONDS.forEach(([c, item]) => {
  let n = 0;
  for (let i = 0; i < DAYS_PER_YEAR; i++) {
    const d = dateOf(i);
    if (conditionMet(c, d)) n++;
  }
  console.log(`  ${c.padEnd(3)} ${String(n).padStart(3)}日 / 160日  (${item})`);
});
