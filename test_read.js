// 「読」ボタン：調合台に触れずに書き付けだけ出るか
const { JSDOM } = require('jsdom');
const fs = require('fs');
async function boot() {
  const built = fs.readFileSync('index.html','utf8')
    .replace(/<script src="([^"]+)"><\/script>/g,(m,f)=>'<script>'+fs.readFileSync(f,'utf8')+'<\/script>');
  const dom = new JSDOM(built,{runScripts:'dangerously',url:'https://localhost/',pretendToBeVisual:true});
  const w = dom.window;
  await new Promise(r=>w.addEventListener('load',()=>setTimeout(r,40)));
  return w;
}
const ok=(c,m)=>{console.log(`  ${c?'✓':'✗ ★'} ${m}`); if(!c) process.exitCode=1;};
(async()=>{
  const w=await boot(); const E=s=>w.eval(s); const D=w.document;
  // 棚を満たしてから見る
  E("ITEMS_DATA.slice(0,6).forEach(i=>state.stock[i.id]=3); renderItemList();");
  const rows=[...D.querySelectorAll('#item-list .item-entry')];
  ok(rows.length>=3, `素材が ${rows.length} 行並ぶ`);
  ok(rows.every(r=>r.querySelector('.item-read-btn')), '全行に「読」がある');

  console.log('\n■ 「読」を押す');
  const id0=rows[0].dataset.id, id1=rows[1].dataset.id;
  const btn=rows[0].querySelector('.item-read-btn');
  btn.dispatchEvent(new w.Event('click',{bubbles:true}));
  ok(E('state.memoItem')===id0, '書き付けの対象が切り替わった');
  ok(E('state.slots.length')===0, '★調合台は空のまま（追加されていない）');
  const memo=D.getElementById('item-memo').textContent;
  ok(memo.includes(E(`itemById.get('${id0}').name`)), '左の欄に名前が出ている');
  ok(D.querySelector('#item-list .item-entry').classList.contains('reading'), '読んでいる行に印が付く');
  ok(!D.querySelector('#item-list .item-entry').classList.contains('selected'), '選択の印は付かない');

  console.log('\n■ 別の素材の「読」へ移る');
  [...D.querySelectorAll('#item-list .item-entry')][1]
    .querySelector('.item-read-btn').dispatchEvent(new w.Event('click',{bubbles:true}));
  ok(E('state.memoItem')===id1, '対象が移った');
  ok(E('state.slots.length')===0, '調合台はまだ空');
  ok(D.querySelectorAll('#item-list .item-entry.reading').length===1, '印は一行だけ');

  console.log('\n■ 行そのものを押したとき（従来の出し入れ）');
  [...D.querySelectorAll('#item-list .item-entry')][2]
    .dispatchEvent(new w.Event('click',{bubbles:true}));
  ok(E('state.slots.length')===1, '行を押せば今までどおり調合台に入る');
  ok(E('state.memoItem')===E("state.slots[0].item.id"), '入れた素材の書き付けも出る');

  console.log('\n■ 結果の欄を荒らさないか');
  E(`state.slots=[{item:ITEMS_DATA.find(i=>i.name==='草木の朝露'),processId:'boil'},
                  {item:ITEMS_DATA.find(i=>i.name==='ネバリイグチ'),processId:'raw'}];
     state.stock[ITEMS_DATA.find(i=>i.name==='草木の朝露').id]=3;
     state.stock[ITEMS_DATA.find(i=>i.name==='ネバリイグチ').id]=3;
     handleCompound(); renderItemList();`);
  ok(!D.getElementById('state-success').classList.contains('hidden'), '凝固薬が成立して結果が出ている');
  const shown=D.getElementById('result-product-name').textContent;
  const r0=[...D.querySelectorAll('#item-list .item-entry')].find(r=>r.querySelector('.item-read-btn'));
  r0.querySelector('.item-read-btn').dispatchEvent(new w.Event('click',{bubbles:true}));
  ok(D.getElementById('result-product-name').textContent===shown, '「読」を押しても結果表示が消えない');
  ok(!D.getElementById('state-success').classList.contains('hidden'), '結果の欄はそのまま');
  w.close();
  console.log(process.exitCode?'\n★ 失敗あり':'\nすべて通過');
})();
