// 出来事
// tools/convert.py により game_data_v25.xlsx から自動生成。直接編集しないこと。
const EVENTS_DATA = [
  {
    "id": "ev_room_1",
    "condition": "fl_first_craft",
    "title": "台所の抽斗",
    "text": "鍋を戻そうとして、抽斗が閊えているのに気づいた。奥に何か挟まっている。\n引き出すと、紙の束だった。祖母の字ではない、見慣れぬ文字が並んでいる。",
    "effect": "紙片解禁",
    "target": "bd_1",
    "repeat": "一度きり"
  },
  {
    "id": "ev_room_2",
    "condition": "fl_heal_3",
    "title": "薬棚の裏",
    "text": "薬棚を動かしたら、裏板との隙間から紙が数枚すべり落ちてきた。\n傷薬の作り方だ。何十回と書き直した跡がある。",
    "effect": "紙片解禁",
    "target": "bd_2",
    "repeat": "一度きり"
  },
  {
    "id": "ev_room_3",
    "condition": "fl_solve_10",
    "title": "帳場の引き出し",
    "text": "帳場の引き出しの底が二重になっていた。村の者から預かった紙が、几帳面に揃えて挟んである。\n酒屋の親父の字も、染物屋のばあさんの字もある。",
    "effect": "紙片解禁",
    "target": "bd_3",
    "repeat": "一度きり"
  },
  {
    "id": "ev_room_4",
    "condition": "fl_solve_25",
    "title": "押入れの下段",
    "text": "押入れの下段を空けた。行李の中は、ほとんどが紙だった。\n祖母は物を捨てない人だった。",
    "effect": "紙片解禁",
    "target": "bd_4",
    "repeat": "一度きり"
  },
  {
    "id": "ev_room_5",
    "condition": "fl_solve_45",
    "title": "押入れの奥",
    "text": "行李の下に、もう一つ箱があった。買った本を解体して、必要な頁だけ綴じ直したものらしい。\n背表紙は捨てたのだろう。この人は、本を本として扱わない。",
    "effect": "紙片解禁",
    "target": "bd_5",
    "repeat": "一度きり"
  },
  {
    "id": "ev_room_6",
    "condition": "fl_solve_70",
    "title": "寝室の文机",
    "text": "寝室の文机に手をつけた。引き出しには、書きかけの紙が入ったままだった。\n最後の一枚は、途中で途切れている。",
    "effect": "紙片解禁",
    "target": "bd_6",
    "repeat": "一度きり"
  },
  {
    "id": "ev_room_7",
    "condition": "fl_solve_95",
    "title": "鍵のかかった抽斗",
    "text": "文机のいちばん下の抽斗だけ、鍵がかかっていた。仏壇の裏に鍵はあった。\n中身は、失敗の記録だった。うまくいかなかった調合について、彼女が一人で考え続けた跡。\n人に見せるつもりのないものだ。",
    "effect": "紙片解禁",
    "target": "bd_8",
    "repeat": "一度きり"
  },
  {
    "id": "ev_buyer_first",
    "condition": "fl_weapon_crafted",
    "title": "夜の客",
    "text": "日が落ちてから、戸を叩く音がした。名乗らない。買いたいものがあるという。\n何を、とは訊かなかった。向こうも言わなかった。",
    "effect": "買い手が訪ねる",
    "target": null,
    "repeat": "一度きり"
  },
  {
    "id": "ev_buyer",
    "condition": "fl_weapon_crafted",
    "title": "また、あの客",
    "text": "戸を叩く音。日はもう落ちている。\n前と同じ人かどうかは分からない。同じような外套を着ている。",
    "effect": "買い手が訪ねる",
    "target": null,
    "repeat": "繰り返し（8日ごと）"
  },
  {
    "id": "ev_merchant",
    "condition": "fl_first_craft",
    "title": "行商人",
    "text": "荷を引いた行商人が寄っていった。書き物ばかり抱えている。\n「祖母さんにはよく買ってもらったよ」",
    "effect": "行商人が来る",
    "target": null,
    "repeat": "繰り返し（5日ごと）"
  }
];
