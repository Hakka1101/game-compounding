// 「休む」で日を送り、満月を狙えるかを検証
const fs = require('fs'), vm = require('vm');
const ctx = vm.createContext({ console, Math });
const load = f => vm.runInContext(fs.readFileSync(f, 'utf8').replace(/^const /gm, 'var '), ctx);
['data_calendar.js', 'calendar.js'].forEach(load);
const { dateOf, formatDate, daysUntilMoon } = ctx;

console.log('■ 満月までの残り日数の案内');
[0, 5, 9, 10, 15, 19, 20].forEach(i => {
  const d = dateOf(i), f = daysUntilMoon(i, '満月'), n = daysUntilMoon(i, '新月');
  const msg = f === 0 ? '今夜は満月。' : `次の満月まで あと ${f} 日。`;
  console.log(`  ${String(i).padStart(3)}日目 ${formatDate(d).padEnd(20)} ${d.moonName.padEnd(5)} ${msg}${n === 0 ? '今夜は新月。' : ''}`);
});

console.log('\n■ 休み続けて満月に辿り着けるか');
let day = 0, rested = 0;
while (dateOf(day).moonCondition !== '満月') { day++; rested++; if (rested > 40) break; }
console.log(`  1日目から ${rested} 日休むと ${formatDate(dateOf(day))}＝${dateOf(day).moonName}`);

console.log('\n■ 1年で満月に立ち会える回数');
let n = 0;
for (let i = 0; i < ctx.DAYS_PER_YEAR; i++) if (dateOf(i).moonCondition === '満月') n++;
console.log(`  ${n} 回（20日ごと）`);

console.log('\n■ 期限までに休みだけで消える日数の目安');
console.log(`  全 ${ctx.CAL.deadlineDays} 日。満月8回を毎回待つとして、最大でも待機は ${8 * 19} 日を超えない`);
