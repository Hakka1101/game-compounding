// 旗
// tools/convert.py により game_data_v25.xlsx から自動生成。直接編集しないこと。
const FLAGS_DATA = [
  {
    "id": "fl_first_craft",
    "name": "初めての調合",
    "kind": "recipeCount",
    "target": null,
    "threshold": 1,
    "note": "何か一つでも解明した"
  },
  {
    "id": "fl_solve_10",
    "name": "解明10種",
    "kind": "recipeCount",
    "target": null,
    "threshold": 10,
    "note": null
  },
  {
    "id": "fl_solve_25",
    "name": "解明25種",
    "kind": "recipeCount",
    "target": null,
    "threshold": 25,
    "note": null
  },
  {
    "id": "fl_solve_45",
    "name": "解明45種",
    "kind": "recipeCount",
    "target": null,
    "threshold": 45,
    "note": null
  },
  {
    "id": "fl_solve_70",
    "name": "解明70種",
    "kind": "recipeCount",
    "target": null,
    "threshold": 70,
    "note": null
  },
  {
    "id": "fl_solve_95",
    "name": "解明95種",
    "kind": "recipeCount",
    "target": null,
    "threshold": 95,
    "note": null
  },
  {
    "id": "fl_solve_110",
    "name": "解明110種（95%）",
    "kind": "recipeCount",
    "target": null,
    "threshold": 110,
    "note": "伝説の薬屋の条件"
  },
  {
    "id": "fl_solve_all",
    "name": "全115種を解明",
    "kind": "recipeCount",
    "target": null,
    "threshold": 115,
    "note": null
  },
  {
    "id": "fl_heal_3",
    "name": "治癒の調合を3種",
    "kind": "recipeCountByEffect",
    "target": "healing",
    "threshold": 3,
    "note": null
  },
  {
    "id": "fl_person_all",
    "name": "人名の調合を15種すべて",
    "kind": "recipeCountByTag",
    "target": "人名",
    "threshold": 15,
    "note": "伝説の薬屋の条件"
  },
  {
    "id": "fl_weapon_solved",
    "name": "凶器を一つでも解明",
    "kind": "recipeCountByDanger",
    "target": "凶器",
    "threshold": 1,
    "note": null
  },
  {
    "id": "fl_weapon_crafted",
    "name": "凶器を一つでも作った",
    "kind": "craftCountByDanger",
    "target": "凶器",
    "threshold": 1,
    "note": null
  },
  {
    "id": "fl_weapon_sold_1",
    "name": "凶器を一度でも渡した",
    "kind": "soldCountByDanger",
    "target": "凶器",
    "threshold": 1,
    "note": null
  },
  {
    "id": "fl_weapon_sold_6",
    "name": "凶器を6件以上渡した",
    "kind": "soldCountByDanger",
    "target": "凶器",
    "threshold": 6,
    "note": null
  },
  {
    "id": "fl_weapon_sold_10",
    "name": "凶器を10件以上渡した",
    "kind": "soldCountByDanger",
    "target": "凶器",
    "threshold": 10,
    "note": "夜の客の条件"
  },
  {
    "id": "fl_weapon_never_sold",
    "name": "凶器を一度も渡さなかった",
    "kind": "soldNoneByDanger",
    "target": "凶器",
    "threshold": 0,
    "note": null
  },
  {
    "id": "fl_weapon_never_made",
    "name": "凶器を一度も作らなかった",
    "kind": "craftNoneByDanger",
    "target": "凶器",
    "threshold": 0,
    "note": null
  },
  {
    "id": "fl_weapon_ratio_5",
    "name": "凶器が販売の5%超",
    "kind": "soldRatioByDanger",
    "target": "凶器",
    "threshold": 0.05,
    "note": null
  },
  {
    "id": "fl_weapon_ratio_50",
    "name": "凶器が販売の5割以上",
    "kind": "soldRatioByDanger",
    "target": "凶器",
    "threshold": 0.5,
    "note": "夜の客の条件"
  },
  {
    "id": "fl_weapon_income_5k",
    "name": "凶器の売上5,000以上",
    "kind": "soldIncomeByDanger",
    "target": "凶器",
    "threshold": 5000,
    "note": "夜の客の条件"
  },
  {
    "id": "fl_earned_30k",
    "name": "累計収入30,000以上",
    "kind": "totalEarned",
    "target": null,
    "threshold": 30000,
    "note": "評判の薬屋の条件"
  },
  {
    "id": "fl_earned_60k",
    "name": "累計収入60,000以上",
    "kind": "totalEarned",
    "target": null,
    "threshold": 60000,
    "note": null
  },
  {
    "id": "fl_sold_100",
    "name": "通算100点を売った",
    "kind": "soldCount",
    "target": null,
    "threshold": 100,
    "note": null
  },
  {
    "id": "fl_phoenix",
    "name": "ホウオウノハネを手にした",
    "kind": "itemEverHeld",
    "target": "item_014",
    "threshold": 1,
    "note": null
  },
  {
    "id": "fl_never_rested",
    "name": "一度も休まなかった",
    "kind": "restedDaysNone",
    "target": null,
    "threshold": 0,
    "note": null
  },
  {
    "id": "fl_explored_100",
    "name": "探索に出た日が100日以上",
    "kind": "exploredDays",
    "target": null,
    "threshold": 100,
    "note": null
  }
];
