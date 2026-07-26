// 採取表（地形×時間帯）
// tools/convert.py により game_data_v25.xlsx から自動生成。直接編集しないこと。
const SPAWNS_DATA = [
  {
    "itemId": "item_001",
    "terrainId": "ter_leaflitter",
    "timeSlot": "night",
    "rate": 0.65,
    "quantity": 1,
    "condition": null,
    "note": "落ち葉の下に群生"
  },
  {
    "itemId": "item_001",
    "terrainId": "ter_deadwood",
    "timeSlot": "night",
    "rate": 0.5,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_001",
    "terrainId": "ter_leaflitter",
    "timeSlot": "dawn",
    "rate": 0.35,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_001",
    "terrainId": "ter_darkness",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_002",
    "terrainId": "ter_grass",
    "timeSlot": "morning",
    "rate": 0.55,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_002",
    "terrainId": "ter_glade",
    "timeSlot": "morning",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_002",
    "terrainId": "ter_grass",
    "timeSlot": "noon",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_003",
    "terrainId": "ter_leaflitter",
    "timeSlot": "night",
    "rate": 0.29,
    "quantity": 1,
    "condition": null,
    "note": "希少：ニガタケに紛れる"
  },
  {
    "itemId": "item_003",
    "terrainId": "ter_deadwood",
    "timeSlot": "midnight",
    "rate": 0.24,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_004",
    "terrainId": "ter_peat",
    "timeSlot": "night",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": "泥炭層から掘る"
  },
  {
    "itemId": "item_004",
    "terrainId": "ter_mud",
    "timeSlot": "dawn",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_005",
    "terrainId": "ter_deadwood",
    "timeSlot": "morning",
    "rate": 0.6,
    "quantity": 1,
    "condition": null,
    "note": "腐った倒木に群生"
  },
  {
    "itemId": "item_005",
    "terrainId": "ter_deadwood",
    "timeSlot": "night",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_005",
    "terrainId": "ter_snag",
    "timeSlot": "noon",
    "rate": 0.35,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_006",
    "terrainId": "ter_trunk",
    "timeSlot": "morning",
    "rate": 0.5,
    "quantity": 1,
    "condition": null,
    "note": "針葉樹の根元"
  },
  {
    "itemId": "item_006",
    "terrainId": "ter_alpine",
    "timeSlot": "morning",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_007",
    "terrainId": "ter_rock",
    "timeSlot": "noon",
    "rate": 0.35,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_007",
    "terrainId": "ter_stalactite",
    "timeSlot": "night",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_007",
    "terrainId": "ter_reef",
    "timeSlot": "noon",
    "rate": 0.31,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_008",
    "terrainId": "ter_snag",
    "timeSlot": "midnight",
    "rate": 0.24,
    "quantity": 1,
    "condition": null,
    "note": "希少：他の菌に寄生"
  },
  {
    "itemId": "item_008",
    "terrainId": "ter_deadwood",
    "timeSlot": "night",
    "rate": 0.22,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_009",
    "terrainId": "ter_sand",
    "timeSlot": "noon",
    "rate": 0.5,
    "quantity": 1,
    "condition": null,
    "note": "乾いた砂地"
  },
  {
    "itemId": "item_009",
    "terrainId": "ter_dune",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_010",
    "terrainId": "ter_leaflitter",
    "timeSlot": "afternoon",
    "rate": 0.35,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_010",
    "terrainId": "ter_alpine",
    "timeSlot": "morning",
    "rate": 0.31,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_011",
    "terrainId": "ter_stagnant",
    "timeSlot": "midnight",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "腐臭のする水際"
  },
  {
    "itemId": "item_011",
    "terrainId": "ter_ruinhouse",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_012",
    "terrainId": "ter_trunk",
    "timeSlot": "noon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "松の根元の地中"
  },
  {
    "itemId": "item_012",
    "terrainId": "ter_leaflitter",
    "timeSlot": "noon",
    "rate": 0.25,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_013",
    "terrainId": "ter_snowfield",
    "timeSlot": "dawn",
    "rate": 0.27,
    "quantity": 1,
    "condition": null,
    "note": "希少：雪の際の岩肌"
  },
  {
    "itemId": "item_013",
    "terrainId": "ter_ledge",
    "timeSlot": "midnight",
    "rate": 0.23,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_014",
    "terrainId": "ter_fumarole",
    "timeSlot": "noon",
    "rate": 0.16,
    "quantity": 1,
    "condition": null,
    "note": "極稀：噴気孔の縁"
  },
  {
    "itemId": "item_014",
    "terrainId": "ter_fumarole",
    "timeSlot": "midnight",
    "rate": 0.12,
    "quantity": 1,
    "condition": "満月",
    "note": "極稀：満月の夜のみ"
  },
  {
    "itemId": "item_015",
    "terrainId": "ter_shallow",
    "timeSlot": "morning",
    "rate": 0.6,
    "quantity": 1,
    "condition": null,
    "note": "水際に群生"
  },
  {
    "itemId": "item_015",
    "terrainId": "ter_reed",
    "timeSlot": "noon",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_015",
    "terrainId": "ter_tidepool",
    "timeSlot": "morning",
    "rate": 0.25,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_016",
    "terrainId": "ter_grass",
    "timeSlot": "morning",
    "rate": 0.55,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_016",
    "terrainId": "ter_shrub",
    "timeSlot": "afternoon",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_016",
    "terrainId": "ter_bare",
    "timeSlot": "noon",
    "rate": 0.25,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_017",
    "terrainId": "ter_bare",
    "timeSlot": "noon",
    "rate": 0.65,
    "quantity": 1,
    "condition": null,
    "note": "荒れ地に真っ先に生える"
  },
  {
    "itemId": "item_017",
    "terrainId": "ter_driedbed",
    "timeSlot": "afternoon",
    "rate": 0.5,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_017",
    "terrainId": "ter_grass",
    "timeSlot": "afternoon",
    "rate": 0.35,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_018",
    "terrainId": "ter_glade",
    "timeSlot": "dawn",
    "rate": 0.55,
    "quantity": 1,
    "condition": null,
    "note": "朝露を溜める"
  },
  {
    "itemId": "item_018",
    "terrainId": "ter_grass",
    "timeSlot": "dawn",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_018",
    "terrainId": "ter_gravel",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_019",
    "terrainId": "ter_grass",
    "timeSlot": "noon",
    "rate": 0.48,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_019",
    "terrainId": "ter_fieldplot",
    "timeSlot": "morning",
    "rate": 0.35,
    "quantity": 1,
    "condition": null,
    "note": "畑の名残に"
  },
  {
    "itemId": "item_020",
    "terrainId": "ter_ledge",
    "timeSlot": "noon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "岩肌を這う蔓"
  },
  {
    "itemId": "item_020",
    "terrainId": "ter_boulder",
    "timeSlot": "afternoon",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_020",
    "terrainId": "ter_rock",
    "timeSlot": "noon",
    "rate": 0.31,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_021",
    "terrainId": "ter_shrub",
    "timeSlot": "morning",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_021",
    "terrainId": "ter_glade",
    "timeSlot": "morning",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_022",
    "terrainId": "ter_gravel",
    "timeSlot": "morning",
    "rate": 0.52,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_022",
    "terrainId": "ter_grass",
    "timeSlot": "morning",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_022",
    "terrainId": "ter_shallow",
    "timeSlot": "morning",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_023",
    "terrainId": "ter_fieldplot",
    "timeSlot": "afternoon",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": "畑跡に残る"
  },
  {
    "itemId": "item_023",
    "terrainId": "ter_grass",
    "timeSlot": "afternoon",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_024",
    "terrainId": "ter_snowfield",
    "timeSlot": "dawn",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "希少：残雪の際に咲く"
  },
  {
    "itemId": "item_024",
    "terrainId": "ter_alpine",
    "timeSlot": "midnight",
    "rate": 0.18,
    "quantity": 1,
    "condition": null,
    "note": "極稀"
  },
  {
    "itemId": "item_025",
    "terrainId": "ter_lavafield",
    "timeSlot": "afternoon",
    "rate": 0.25,
    "quantity": 1,
    "condition": null,
    "note": "希少：溶岩の裂け目"
  },
  {
    "itemId": "item_025",
    "terrainId": "ter_driedbed",
    "timeSlot": "noon",
    "rate": 0.18,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_026",
    "terrainId": "ter_stagnant",
    "timeSlot": "night",
    "rate": 0.25,
    "quantity": 1,
    "condition": null,
    "note": "希少：毒草"
  },
  {
    "itemId": "item_026",
    "terrainId": "ter_ruinhouse",
    "timeSlot": "midnight",
    "rate": 0.22,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_mud",
    "timeSlot": "noon",
    "rate": 0.48,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_gravel",
    "timeSlot": "afternoon",
    "rate": 0.35,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_peat",
    "timeSlot": "noon",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_028",
    "terrainId": "ter_lavafield",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_028",
    "terrainId": "ter_rock",
    "timeSlot": "afternoon",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_028",
    "terrainId": "ter_driedbed",
    "timeSlot": "noon",
    "rate": 0.25,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_029",
    "terrainId": "ter_beach",
    "timeSlot": "noon",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_029",
    "terrainId": "ter_sand",
    "timeSlot": "morning",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_030",
    "terrainId": "ter_bare",
    "timeSlot": "morning",
    "rate": 0.55,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_030",
    "terrainId": "ter_driedbed",
    "timeSlot": "noon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_030",
    "terrainId": "ter_fieldplot",
    "timeSlot": "noon",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_031",
    "terrainId": "ter_darkness",
    "timeSlot": "noon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_031",
    "terrainId": "ter_stalactite",
    "timeSlot": "afternoon",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_031",
    "terrainId": "ter_hearth",
    "timeSlot": "afternoon",
    "rate": 0.25,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_032",
    "terrainId": "ter_snowfield",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "希少：氷点下の岩場"
  },
  {
    "itemId": "item_032",
    "terrainId": "ter_stalactite",
    "timeSlot": "midnight",
    "rate": 0.25,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_033",
    "terrainId": "ter_orevein",
    "timeSlot": "noon",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": "鉱脈から掘る"
  },
  {
    "itemId": "item_033",
    "terrainId": "ter_ruinhouse",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "錆びた金具から"
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_ledge",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_orevein",
    "timeSlot": "noon",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_boulder",
    "timeSlot": "noon",
    "rate": 0.25,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_035",
    "terrainId": "ter_reef",
    "timeSlot": "morning",
    "rate": 0.5,
    "quantity": 1,
    "condition": null,
    "note": "引き潮の岩礁"
  },
  {
    "itemId": "item_035",
    "terrainId": "ter_tidepool",
    "timeSlot": "night",
    "rate": 0.35,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_036",
    "terrainId": "ter_orevein",
    "timeSlot": "midnight",
    "rate": 0.24,
    "quantity": 1,
    "condition": null,
    "note": "希少：深部の鉱脈"
  },
  {
    "itemId": "item_036",
    "terrainId": "ter_lavafield",
    "timeSlot": "night",
    "rate": 0.18,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_037",
    "terrainId": "ter_stalactite",
    "timeSlot": "dawn",
    "rate": 0.16,
    "quantity": 1,
    "condition": null,
    "note": "極稀：鍾乳石の先に結ぶ"
  },
  {
    "itemId": "item_037",
    "terrainId": "ter_ledge",
    "timeSlot": "dawn",
    "rate": 0.12,
    "quantity": 1,
    "condition": null,
    "note": "極稀"
  },
  {
    "itemId": "item_038",
    "terrainId": "ter_stalactite",
    "timeSlot": "noon",
    "rate": 0.6,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_038",
    "terrainId": "ter_stalactite",
    "timeSlot": "midnight",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_039",
    "terrainId": "ter_mud",
    "timeSlot": "noon",
    "rate": 0.65,
    "quantity": 1,
    "condition": null,
    "note": "入手容易：発酵の起点"
  },
  {
    "itemId": "item_039",
    "terrainId": "ter_stagnant",
    "timeSlot": "afternoon",
    "rate": 0.5,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_039",
    "terrainId": "ter_bare",
    "timeSlot": "afternoon",
    "rate": 0.35,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_040",
    "terrainId": "ter_grass",
    "timeSlot": "dawn",
    "rate": 0.7,
    "quantity": 1,
    "condition": null,
    "note": "夜明けにしか採れない"
  },
  {
    "itemId": "item_040",
    "terrainId": "ter_glade",
    "timeSlot": "dawn",
    "rate": 0.55,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_040",
    "terrainId": "ter_alpine",
    "timeSlot": "dawn",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_041",
    "terrainId": "ter_orevein",
    "timeSlot": "morning",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": "鉄気を含む湧き水"
  },
  {
    "itemId": "item_041",
    "terrainId": "ter_ledge",
    "timeSlot": "noon",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_042",
    "terrainId": "ter_snowfield",
    "timeSlot": "dawn",
    "rate": 0.5,
    "quantity": 1,
    "condition": "春",
    "note": "雪解けの季節のみ"
  },
  {
    "itemId": "item_042",
    "terrainId": "ter_snowfield",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": "春",
    "note": null
  },
  {
    "itemId": "item_043",
    "terrainId": "ter_well",
    "timeSlot": "noon",
    "rate": 0.6,
    "quantity": 1,
    "condition": null,
    "note": "古井戸の底"
  },
  {
    "itemId": "item_043",
    "terrainId": "ter_well",
    "timeSlot": "night",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_044",
    "terrainId": "ter_hearth",
    "timeSlot": "morning",
    "rate": 0.55,
    "quantity": 1,
    "condition": null,
    "note": "竈の灰から漉す"
  },
  {
    "itemId": "item_044",
    "terrainId": "ter_hearth",
    "timeSlot": "afternoon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_045",
    "terrainId": "ter_hotspring",
    "timeSlot": "noon",
    "rate": 0.55,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_045",
    "terrainId": "ter_fumarole",
    "timeSlot": "morning",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_046",
    "terrainId": "ter_trunk",
    "timeSlot": "afternoon",
    "rate": 0.5,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_046",
    "terrainId": "ter_trunk",
    "timeSlot": "morning",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_047",
    "terrainId": "ter_tidepool",
    "timeSlot": "noon",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": "引き潮の水たまり"
  },
  {
    "itemId": "item_047",
    "terrainId": "ter_darkness",
    "timeSlot": "night",
    "rate": 0.25,
    "quantity": 1,
    "condition": null,
    "note": "海蝕洞の奥"
  },
  {
    "itemId": "item_048",
    "terrainId": "ter_river",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_048",
    "terrainId": "ter_reef",
    "timeSlot": "noon",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_048",
    "terrainId": "ter_shallow",
    "timeSlot": "noon",
    "rate": 0.25,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_049",
    "terrainId": "ter_grass",
    "timeSlot": "night",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_049",
    "terrainId": "ter_ruinhouse",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_049",
    "terrainId": "ter_shrub",
    "timeSlot": "midnight",
    "rate": 0.25,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_050",
    "terrainId": "ter_river",
    "timeSlot": "night",
    "rate": 0.27,
    "quantity": 1,
    "condition": null,
    "note": "希少：流れの中"
  },
  {
    "itemId": "item_050",
    "terrainId": "ter_reef",
    "timeSlot": "night",
    "rate": 0.23,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_051",
    "terrainId": "ter_reed",
    "timeSlot": "night",
    "rate": 0.5,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_051",
    "terrainId": "ter_mud",
    "timeSlot": "dawn",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_051",
    "terrainId": "ter_shallow",
    "timeSlot": "night",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_052",
    "terrainId": "ter_glade",
    "timeSlot": "midnight",
    "rate": 0.27,
    "quantity": 1,
    "condition": null,
    "note": "希少：灯りに寄る"
  },
  {
    "itemId": "item_052",
    "terrainId": "ter_shrub",
    "timeSlot": "night",
    "rate": 0.23,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_053",
    "terrainId": "ter_gravel",
    "timeSlot": "noon",
    "rate": 0.35,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_053",
    "terrainId": "ter_boulder",
    "timeSlot": "afternoon",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_053",
    "terrainId": "ter_bare",
    "timeSlot": "afternoon",
    "rate": 0.31,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_054",
    "terrainId": "ter_rock",
    "timeSlot": "noon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_054",
    "terrainId": "ter_dune",
    "timeSlot": "morning",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_054",
    "terrainId": "ter_grass",
    "timeSlot": "noon",
    "rate": 0.25,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_055",
    "terrainId": "ter_darkness",
    "timeSlot": "midnight",
    "rate": 0.17,
    "quantity": 1,
    "condition": null,
    "note": "極稀：洞窟の最奥"
  },
  {
    "itemId": "item_055",
    "terrainId": "ter_darkness",
    "timeSlot": "night",
    "rate": 0.13,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_056",
    "terrainId": "ter_deadwood",
    "timeSlot": "night",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_056",
    "terrainId": "ter_ledge",
    "timeSlot": "night",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_056",
    "terrainId": "ter_snag",
    "timeSlot": "night",
    "rate": 0.25,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_057",
    "terrainId": "ter_dune",
    "timeSlot": "night",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "希少"
  },
  {
    "itemId": "item_057",
    "terrainId": "ter_driedbed",
    "timeSlot": "midnight",
    "rate": 0.22,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_058",
    "terrainId": "ter_lavafield",
    "timeSlot": "noon",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "希少"
  },
  {
    "itemId": "item_058",
    "terrainId": "ter_dune",
    "timeSlot": "afternoon",
    "rate": 0.23,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_089",
    "terrainId": "ter_ruinhouse",
    "timeSlot": "noon",
    "rate": 0.55,
    "quantity": 1,
    "condition": null,
    "note": "梁や床板から抜く"
  },
  {
    "itemId": "item_089",
    "terrainId": "ter_hearth",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_090",
    "terrainId": "ter_fieldplot",
    "timeSlot": "morning",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "土から出てくる"
  },
  {
    "itemId": "item_090",
    "terrainId": "ter_ruinhouse",
    "timeSlot": "noon",
    "rate": 0.31,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_091",
    "terrainId": "ter_ruinhouse",
    "timeSlot": "noon",
    "rate": 0.6,
    "quantity": 1,
    "condition": null,
    "note": "そこら中に転がる"
  },
  {
    "itemId": "item_091",
    "terrainId": "ter_hearth",
    "timeSlot": "afternoon",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_092",
    "terrainId": "ter_driftwood",
    "timeSlot": "noon",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "漁具の名残"
  },
  {
    "itemId": "item_092",
    "terrainId": "ter_ruinhouse",
    "timeSlot": "noon",
    "rate": 0.31,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_093",
    "terrainId": "ter_ruinhouse",
    "timeSlot": "midnight",
    "rate": 0.16,
    "quantity": 1,
    "condition": null,
    "note": "極稀：割れずに残った鏡"
  },
  {
    "itemId": "item_093",
    "terrainId": "ter_ruinhouse",
    "timeSlot": "dawn",
    "rate": 0.12,
    "quantity": 1,
    "condition": null,
    "note": "極稀：霧の朝のみ"
  },
  {
    "itemId": "item_094",
    "terrainId": "ter_ruinhouse",
    "timeSlot": "afternoon",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "壊れた装置から解く"
  },
  {
    "itemId": "item_094",
    "terrainId": "ter_well",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_095",
    "terrainId": "ter_hearth",
    "timeSlot": "dawn",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "希少：神殿跡の炉に残る"
  },
  {
    "itemId": "item_095",
    "terrainId": "ter_darkness",
    "timeSlot": "midnight",
    "rate": 0.23,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_051",
    "terrainId": "ter_mud",
    "timeSlot": "midnight",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "夜通し鳴いている"
  },
  {
    "itemId": "item_050",
    "terrainId": "ter_river",
    "timeSlot": "midnight",
    "rate": 0.24,
    "quantity": 1,
    "condition": null,
    "note": "希少：流れの中"
  },
  {
    "itemId": "item_017",
    "terrainId": "ter_bare",
    "timeSlot": "dawn",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_030",
    "terrainId": "ter_driedbed",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "夜露で土が締まる頃"
  },
  {
    "itemId": "item_047",
    "terrainId": "ter_tidepool",
    "timeSlot": "midnight",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "夜の引き潮"
  },
  {
    "itemId": "item_048",
    "terrainId": "ter_reef",
    "timeSlot": "midnight",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_045",
    "terrainId": "ter_hotspring",
    "timeSlot": "dawn",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "湯気が最も濃い刻"
  },
  {
    "itemId": "item_025",
    "terrainId": "ter_lavafield",
    "timeSlot": "dawn",
    "rate": 0.23,
    "quantity": 1,
    "condition": null,
    "note": "希少"
  },
  {
    "itemId": "item_017",
    "terrainId": "ter_grass",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "そこらじゅうに生えている"
  },
  {
    "itemId": "item_016",
    "terrainId": "ter_shrub",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "藪に絡んでいる"
  },
  {
    "itemId": "item_016",
    "terrainId": "ter_shrub",
    "timeSlot": "noon",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": "藪に絡んでいる"
  },
  {
    "itemId": "item_030",
    "terrainId": "ter_bare",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "剥き出しの土から"
  },
  {
    "itemId": "item_030",
    "terrainId": "ter_bare",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "剥き出しの土から"
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_rock",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "岩の割れ目から剥がす"
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_rock",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "岩の割れ目から剥がす"
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_rock",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "岩の割れ目から剥がす"
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_rock",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "岩の割れ目から剥がす"
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_boulder",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "巨岩の表面から"
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_boulder",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "巨岩の表面から"
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_boulder",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "巨岩の表面から"
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_boulder",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "巨岩の表面から"
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_gravel",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "石の間に挟まっている"
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_gravel",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "石の間に挟まっている"
  },
  {
    "itemId": "item_009",
    "terrainId": "ter_sand",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "砂に半ば埋もれている"
  },
  {
    "itemId": "item_009",
    "terrainId": "ter_sand",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "砂に半ば埋もれている"
  },
  {
    "itemId": "item_009",
    "terrainId": "ter_sand",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "砂に半ば埋もれている"
  },
  {
    "itemId": "item_009",
    "terrainId": "ter_sand",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "砂に半ば埋もれている"
  },
  {
    "itemId": "item_001",
    "terrainId": "ter_leaflitter",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "落ち葉の下にいくらでも"
  },
  {
    "itemId": "item_001",
    "terrainId": "ter_leaflitter",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "落ち葉の下にいくらでも"
  },
  {
    "itemId": "item_012",
    "terrainId": "ter_trunk",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "根元の地面を掘る"
  },
  {
    "itemId": "item_012",
    "terrainId": "ter_trunk",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "根元の地面を掘る"
  },
  {
    "itemId": "item_012",
    "terrainId": "ter_trunk",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "根元の地面を掘る"
  },
  {
    "itemId": "item_005",
    "terrainId": "ter_deadwood",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "朽ちた幹に"
  },
  {
    "itemId": "item_005",
    "terrainId": "ter_deadwood",
    "timeSlot": "noon",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": "朽ちた幹に"
  },
  {
    "itemId": "item_005",
    "terrainId": "ter_deadwood",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "朽ちた幹に"
  },
  {
    "itemId": "item_039",
    "terrainId": "ter_mud",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "足元に溜まっている"
  },
  {
    "itemId": "item_039",
    "terrainId": "ter_mud",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "足元に溜まっている"
  },
  {
    "itemId": "item_039",
    "terrainId": "ter_mud",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "足元に溜まっている"
  },
  {
    "itemId": "item_031",
    "terrainId": "ter_darkness",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "手探りで岩肌から"
  },
  {
    "itemId": "item_031",
    "terrainId": "ter_darkness",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "手探りで岩肌から"
  },
  {
    "itemId": "item_031",
    "terrainId": "ter_darkness",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "手探りで岩肌から"
  },
  {
    "itemId": "item_038",
    "terrainId": "ter_stalactite",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "滴りを受ける"
  },
  {
    "itemId": "item_029",
    "terrainId": "ter_beach",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "波打ち際に転がる"
  },
  {
    "itemId": "item_029",
    "terrainId": "ter_beach",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "波打ち際に転がる"
  },
  {
    "itemId": "item_029",
    "terrainId": "ter_beach",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "波打ち際に転がる"
  },
  {
    "itemId": "item_029",
    "terrainId": "ter_beach",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "波打ち際に転がる"
  },
  {
    "itemId": "item_029",
    "terrainId": "ter_beach",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "波打ち際に転がる"
  },
  {
    "itemId": "item_035",
    "terrainId": "ter_reef",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "岩に貼り付いている"
  },
  {
    "itemId": "item_035",
    "terrainId": "ter_reef",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "岩に貼り付いている"
  },
  {
    "itemId": "item_047",
    "terrainId": "ter_tidepool",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "溜まりから汲む"
  },
  {
    "itemId": "item_047",
    "terrainId": "ter_tidepool",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "溜まりから汲む"
  },
  {
    "itemId": "item_028",
    "terrainId": "ter_lavafield",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "固まった溶岩から欠く"
  },
  {
    "itemId": "item_028",
    "terrainId": "ter_lavafield",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "固まった溶岩から欠く"
  },
  {
    "itemId": "item_020",
    "terrainId": "ter_alpine",
    "timeSlot": "noon",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": "斜面を這っている"
  },
  {
    "itemId": "item_020",
    "terrainId": "ter_alpine",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "斜面を這っている"
  },
  {
    "itemId": "item_020",
    "terrainId": "ter_alpine",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "斜面を這っている"
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_ledge",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "風の当たる岩から"
  },
  {
    "itemId": "item_054",
    "terrainId": "ter_dune",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "砂の吹き溜まりに"
  },
  {
    "itemId": "item_054",
    "terrainId": "ter_dune",
    "timeSlot": "noon",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": "砂の吹き溜まりに"
  },
  {
    "itemId": "item_054",
    "terrainId": "ter_dune",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "砂の吹き溜まりに"
  },
  {
    "itemId": "item_017",
    "terrainId": "ter_driedbed",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "涸れた川床にも"
  },
  {
    "itemId": "item_017",
    "terrainId": "ter_driedbed",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "涸れた川床にも"
  },
  {
    "itemId": "item_004",
    "terrainId": "ter_peat",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "泥炭を掘り返す"
  },
  {
    "itemId": "item_004",
    "terrainId": "ter_peat",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "泥炭を掘り返す"
  },
  {
    "itemId": "item_004",
    "terrainId": "ter_peat",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "泥炭を掘り返す"
  },
  {
    "itemId": "item_004",
    "terrainId": "ter_peat",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "泥炭を掘り返す"
  },
  {
    "itemId": "item_015",
    "terrainId": "ter_reed",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "水草の根元に"
  },
  {
    "itemId": "item_015",
    "terrainId": "ter_reed",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "水草の根元に"
  },
  {
    "itemId": "item_015",
    "terrainId": "ter_reed",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "水草の根元に"
  },
  {
    "itemId": "item_015",
    "terrainId": "ter_reed",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "水草の根元に"
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_stagnant",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "淀みの底から"
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_stagnant",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "淀みの底から"
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_stagnant",
    "timeSlot": "noon",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": "淀みの底から"
  },
  {
    "itemId": "item_005",
    "terrainId": "ter_snag",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "立ち枯れの幹に"
  },
  {
    "itemId": "item_005",
    "terrainId": "ter_snag",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "立ち枯れの幹に"
  },
  {
    "itemId": "item_005",
    "terrainId": "ter_snag",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "立ち枯れの幹に"
  },
  {
    "itemId": "item_018",
    "terrainId": "ter_glade",
    "timeSlot": "noon",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": "日の差す場所に"
  },
  {
    "itemId": "item_018",
    "terrainId": "ter_glade",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "日の差す場所に"
  },
  {
    "itemId": "item_018",
    "terrainId": "ter_glade",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "日の差す場所に"
  },
  {
    "itemId": "item_048",
    "terrainId": "ter_river",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "流れの中に"
  },
  {
    "itemId": "item_048",
    "terrainId": "ter_river",
    "timeSlot": "noon",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": "流れの中に"
  },
  {
    "itemId": "item_048",
    "terrainId": "ter_river",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "流れの中に"
  },
  {
    "itemId": "item_015",
    "terrainId": "ter_shallow",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "浅瀬に群れている"
  },
  {
    "itemId": "item_015",
    "terrainId": "ter_shallow",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "浅瀬に群れている"
  },
  {
    "itemId": "item_015",
    "terrainId": "ter_shallow",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "浅瀬に群れている"
  },
  {
    "itemId": "item_032",
    "terrainId": "ter_snowfield",
    "timeSlot": "noon",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": "雪の際に転がる"
  },
  {
    "itemId": "item_032",
    "terrainId": "ter_snowfield",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "雪の際に転がる"
  },
  {
    "itemId": "item_032",
    "terrainId": "ter_snowfield",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "雪の際に転がる"
  },
  {
    "itemId": "item_032",
    "terrainId": "ter_snowfield",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "雪の際に転がる"
  },
  {
    "itemId": "item_033",
    "terrainId": "ter_orevein",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "鉱脈から掘る"
  },
  {
    "itemId": "item_033",
    "terrainId": "ter_orevein",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "鉱脈から掘る"
  },
  {
    "itemId": "item_033",
    "terrainId": "ter_orevein",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "鉱脈から掘る"
  },
  {
    "itemId": "item_045",
    "terrainId": "ter_fumarole",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "噴気の縁から汲む"
  },
  {
    "itemId": "item_045",
    "terrainId": "ter_fumarole",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "噴気の縁から汲む"
  },
  {
    "itemId": "item_045",
    "terrainId": "ter_fumarole",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "噴気の縁から汲む"
  },
  {
    "itemId": "item_045",
    "terrainId": "ter_hotspring",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "湯だまりから汲む"
  },
  {
    "itemId": "item_045",
    "terrainId": "ter_hotspring",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "湯だまりから汲む"
  },
  {
    "itemId": "item_045",
    "terrainId": "ter_hotspring",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "湯だまりから汲む"
  },
  {
    "itemId": "item_045",
    "terrainId": "ter_hotspring",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "湯だまりから汲む"
  },
  {
    "itemId": "item_044",
    "terrainId": "ter_hearth",
    "timeSlot": "noon",
    "rate": 0.45,
    "quantity": 1,
    "condition": null,
    "note": "灰を漉す"
  },
  {
    "itemId": "item_044",
    "terrainId": "ter_hearth",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "灰を漉す"
  },
  {
    "itemId": "item_044",
    "terrainId": "ter_hearth",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "灰を漉す"
  },
  {
    "itemId": "item_043",
    "terrainId": "ter_well",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "釣瓶で汲む"
  },
  {
    "itemId": "item_043",
    "terrainId": "ter_well",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "釣瓶で汲む"
  },
  {
    "itemId": "item_043",
    "terrainId": "ter_well",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "釣瓶で汲む"
  },
  {
    "itemId": "item_043",
    "terrainId": "ter_well",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "釣瓶で汲む"
  },
  {
    "itemId": "item_023",
    "terrainId": "ter_fieldplot",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "畑の名残に"
  },
  {
    "itemId": "item_023",
    "terrainId": "ter_fieldplot",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "畑の名残に"
  },
  {
    "itemId": "item_023",
    "terrainId": "ter_fieldplot",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "畑の名残に"
  },
  {
    "itemId": "item_092",
    "terrainId": "ter_driftwood",
    "timeSlot": "dawn",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "漂着物に混じる"
  },
  {
    "itemId": "item_092",
    "terrainId": "ter_driftwood",
    "timeSlot": "morning",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "漂着物に混じる"
  },
  {
    "itemId": "item_092",
    "terrainId": "ter_driftwood",
    "timeSlot": "afternoon",
    "rate": 0.4,
    "quantity": 1,
    "condition": null,
    "note": "漂着物に混じる"
  },
  {
    "itemId": "item_092",
    "terrainId": "ter_driftwood",
    "timeSlot": "night",
    "rate": 0.32,
    "quantity": 1,
    "condition": null,
    "note": "漂着物に混じる"
  },
  {
    "itemId": "item_092",
    "terrainId": "ter_driftwood",
    "timeSlot": "midnight",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "漂着物に混じる"
  },
  {
    "itemId": "item_183",
    "terrainId": "ter_glade",
    "timeSlot": "afternoon",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "日の落ちかけた木漏れ日に"
  },
  {
    "itemId": "item_183",
    "terrainId": "ter_glade",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_183",
    "terrainId": "ter_leaflitter",
    "timeSlot": "night",
    "rate": 0.24,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_184",
    "terrainId": "ter_alpine",
    "timeSlot": "night",
    "rate": 0.28,
    "quantity": 1,
    "condition": null,
    "note": "高山草地に混じって"
  },
  {
    "itemId": "item_184",
    "terrainId": "ter_alpine",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_184",
    "terrainId": "ter_snowfield",
    "timeSlot": "dawn",
    "rate": 0.24,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_185",
    "terrainId": "ter_tidepool",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "夜の潮だまりに沈む"
  },
  {
    "itemId": "item_185",
    "terrainId": "ter_tidepool",
    "timeSlot": "dawn",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_185",
    "terrainId": "ter_reef",
    "timeSlot": "night",
    "rate": 0.22,
    "quantity": 1,
    "condition": null,
    "note": null
  },
  {
    "itemId": "item_018",
    "terrainId": "ter_grass",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "朝露を溜めた草が混じる"
  },
  {
    "itemId": "item_018",
    "terrainId": "ter_grass",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "朝露を溜めた草が混じる"
  },
  {
    "itemId": "item_018",
    "terrainId": "ter_grass",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "朝露を溜めた草が混じる"
  },
  {
    "itemId": "item_018",
    "terrainId": "ter_grass",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "朝露を溜めた草が混じる"
  },
  {
    "itemId": "item_018",
    "terrainId": "ter_grass",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "朝露を溜めた草が混じる"
  },
  {
    "itemId": "item_021",
    "terrainId": "ter_shrub",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "蔓が絡んでいる"
  },
  {
    "itemId": "item_021",
    "terrainId": "ter_shrub",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "蔓が絡んでいる"
  },
  {
    "itemId": "item_021",
    "terrainId": "ter_shrub",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "蔓が絡んでいる"
  },
  {
    "itemId": "item_021",
    "terrainId": "ter_shrub",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "蔓が絡んでいる"
  },
  {
    "itemId": "item_021",
    "terrainId": "ter_shrub",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "蔓が絡んでいる"
  },
  {
    "itemId": "item_017",
    "terrainId": "ter_bare",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "痩せた土にも生える"
  },
  {
    "itemId": "item_017",
    "terrainId": "ter_bare",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "痩せた土にも生える"
  },
  {
    "itemId": "item_017",
    "terrainId": "ter_bare",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "痩せた土にも生える"
  },
  {
    "itemId": "item_017",
    "terrainId": "ter_bare",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "痩せた土にも生える"
  },
  {
    "itemId": "item_007",
    "terrainId": "ter_rock",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "岩の陰に貼り付く"
  },
  {
    "itemId": "item_007",
    "terrainId": "ter_rock",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "岩の陰に貼り付く"
  },
  {
    "itemId": "item_007",
    "terrainId": "ter_rock",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "岩の陰に貼り付く"
  },
  {
    "itemId": "item_007",
    "terrainId": "ter_rock",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "岩の陰に貼り付く"
  },
  {
    "itemId": "item_007",
    "terrainId": "ter_rock",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "岩の陰に貼り付く"
  },
  {
    "itemId": "item_020",
    "terrainId": "ter_boulder",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "巨岩を這う蔓"
  },
  {
    "itemId": "item_020",
    "terrainId": "ter_boulder",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "巨岩を這う蔓"
  },
  {
    "itemId": "item_020",
    "terrainId": "ter_boulder",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "巨岩を這う蔓"
  },
  {
    "itemId": "item_020",
    "terrainId": "ter_boulder",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "巨岩を這う蔓"
  },
  {
    "itemId": "item_020",
    "terrainId": "ter_boulder",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "巨岩を這う蔓"
  },
  {
    "itemId": "item_053",
    "terrainId": "ter_gravel",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "石の間に落ちている"
  },
  {
    "itemId": "item_053",
    "terrainId": "ter_gravel",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "石の間に落ちている"
  },
  {
    "itemId": "item_053",
    "terrainId": "ter_gravel",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "石の間に落ちている"
  },
  {
    "itemId": "item_053",
    "terrainId": "ter_gravel",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "石の間に落ちている"
  },
  {
    "itemId": "item_053",
    "terrainId": "ter_gravel",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "石の間に落ちている"
  },
  {
    "itemId": "item_029",
    "terrainId": "ter_sand",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "砂を篩うと出る"
  },
  {
    "itemId": "item_029",
    "terrainId": "ter_sand",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "砂を篩うと出る"
  },
  {
    "itemId": "item_029",
    "terrainId": "ter_sand",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "砂を篩うと出る"
  },
  {
    "itemId": "item_029",
    "terrainId": "ter_sand",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "砂を篩うと出る"
  },
  {
    "itemId": "item_029",
    "terrainId": "ter_sand",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "砂を篩うと出る"
  },
  {
    "itemId": "item_010",
    "terrainId": "ter_leaflitter",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "落ち葉に紛れて"
  },
  {
    "itemId": "item_010",
    "terrainId": "ter_leaflitter",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "落ち葉に紛れて"
  },
  {
    "itemId": "item_010",
    "terrainId": "ter_leaflitter",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "落ち葉に紛れて"
  },
  {
    "itemId": "item_010",
    "terrainId": "ter_leaflitter",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "落ち葉に紛れて"
  },
  {
    "itemId": "item_010",
    "terrainId": "ter_leaflitter",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "落ち葉に紛れて"
  },
  {
    "itemId": "item_006",
    "terrainId": "ter_trunk",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "根方に生える"
  },
  {
    "itemId": "item_006",
    "terrainId": "ter_trunk",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "根方に生える"
  },
  {
    "itemId": "item_006",
    "terrainId": "ter_trunk",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "根方に生える"
  },
  {
    "itemId": "item_006",
    "terrainId": "ter_trunk",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "根方に生える"
  },
  {
    "itemId": "item_006",
    "terrainId": "ter_trunk",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "根方に生える"
  },
  {
    "itemId": "item_056",
    "terrainId": "ter_deadwood",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "倒木の陰にいる"
  },
  {
    "itemId": "item_056",
    "terrainId": "ter_deadwood",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "倒木の陰にいる"
  },
  {
    "itemId": "item_056",
    "terrainId": "ter_deadwood",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "倒木の陰にいる"
  },
  {
    "itemId": "item_056",
    "terrainId": "ter_deadwood",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "倒木の陰にいる"
  },
  {
    "itemId": "item_056",
    "terrainId": "ter_deadwood",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "倒木の陰にいる"
  },
  {
    "itemId": "item_051",
    "terrainId": "ter_mud",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "泥の中から"
  },
  {
    "itemId": "item_051",
    "terrainId": "ter_mud",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "泥の中から"
  },
  {
    "itemId": "item_051",
    "terrainId": "ter_mud",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "泥の中から"
  },
  {
    "itemId": "item_051",
    "terrainId": "ter_mud",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "泥の中から"
  },
  {
    "itemId": "item_038",
    "terrainId": "ter_darkness",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "闇の奥で滴る"
  },
  {
    "itemId": "item_038",
    "terrainId": "ter_darkness",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "闇の奥で滴る"
  },
  {
    "itemId": "item_038",
    "terrainId": "ter_darkness",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "闇の奥で滴る"
  },
  {
    "itemId": "item_038",
    "terrainId": "ter_darkness",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "闇の奥で滴る"
  },
  {
    "itemId": "item_038",
    "terrainId": "ter_darkness",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "闇の奥で滴る"
  },
  {
    "itemId": "item_038",
    "terrainId": "ter_darkness",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "闇の奥で滴る"
  },
  {
    "itemId": "item_032",
    "terrainId": "ter_stalactite",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "鍾乳石の根元に"
  },
  {
    "itemId": "item_032",
    "terrainId": "ter_stalactite",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "鍾乳石の根元に"
  },
  {
    "itemId": "item_032",
    "terrainId": "ter_stalactite",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "鍾乳石の根元に"
  },
  {
    "itemId": "item_032",
    "terrainId": "ter_stalactite",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "鍾乳石の根元に"
  },
  {
    "itemId": "item_032",
    "terrainId": "ter_stalactite",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "鍾乳石の根元に"
  },
  {
    "itemId": "item_035",
    "terrainId": "ter_beach",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "砂に埋もれた石"
  },
  {
    "itemId": "item_035",
    "terrainId": "ter_beach",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "砂に埋もれた石"
  },
  {
    "itemId": "item_035",
    "terrainId": "ter_beach",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "砂に埋もれた石"
  },
  {
    "itemId": "item_035",
    "terrainId": "ter_beach",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "砂に埋もれた石"
  },
  {
    "itemId": "item_035",
    "terrainId": "ter_beach",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "砂に埋もれた石"
  },
  {
    "itemId": "item_035",
    "terrainId": "ter_beach",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "砂に埋もれた石"
  },
  {
    "itemId": "item_048",
    "terrainId": "ter_reef",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "岩礁に群れる"
  },
  {
    "itemId": "item_048",
    "terrainId": "ter_reef",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "岩礁に群れる"
  },
  {
    "itemId": "item_048",
    "terrainId": "ter_reef",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "岩礁に群れる"
  },
  {
    "itemId": "item_048",
    "terrainId": "ter_reef",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "岩礁に群れる"
  },
  {
    "itemId": "item_015",
    "terrainId": "ter_tidepool",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "溜まりの縁に"
  },
  {
    "itemId": "item_015",
    "terrainId": "ter_tidepool",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "溜まりの縁に"
  },
  {
    "itemId": "item_015",
    "terrainId": "ter_tidepool",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "溜まりの縁に"
  },
  {
    "itemId": "item_015",
    "terrainId": "ter_tidepool",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "溜まりの縁に"
  },
  {
    "itemId": "item_015",
    "terrainId": "ter_tidepool",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "溜まりの縁に"
  },
  {
    "itemId": "item_025",
    "terrainId": "ter_lavafield",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "裂け目から生える"
  },
  {
    "itemId": "item_025",
    "terrainId": "ter_lavafield",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "裂け目から生える"
  },
  {
    "itemId": "item_025",
    "terrainId": "ter_lavafield",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "裂け目から生える"
  },
  {
    "itemId": "item_025",
    "terrainId": "ter_lavafield",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "裂け目から生える"
  },
  {
    "itemId": "item_013",
    "terrainId": "ter_alpine",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "草地に混じる"
  },
  {
    "itemId": "item_013",
    "terrainId": "ter_alpine",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "草地に混じる"
  },
  {
    "itemId": "item_013",
    "terrainId": "ter_alpine",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "草地に混じる"
  },
  {
    "itemId": "item_013",
    "terrainId": "ter_alpine",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "草地に混じる"
  },
  {
    "itemId": "item_013",
    "terrainId": "ter_alpine",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "草地に混じる"
  },
  {
    "itemId": "item_013",
    "terrainId": "ter_alpine",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "草地に混じる"
  },
  {
    "itemId": "item_041",
    "terrainId": "ter_ledge",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "岩棚から滲む"
  },
  {
    "itemId": "item_041",
    "terrainId": "ter_ledge",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "岩棚から滲む"
  },
  {
    "itemId": "item_041",
    "terrainId": "ter_ledge",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "岩棚から滲む"
  },
  {
    "itemId": "item_041",
    "terrainId": "ter_ledge",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "岩棚から滲む"
  },
  {
    "itemId": "item_041",
    "terrainId": "ter_ledge",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "岩棚から滲む"
  },
  {
    "itemId": "item_009",
    "terrainId": "ter_dune",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "砂丘の風下に"
  },
  {
    "itemId": "item_009",
    "terrainId": "ter_dune",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "砂丘の風下に"
  },
  {
    "itemId": "item_009",
    "terrainId": "ter_dune",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "砂丘の風下に"
  },
  {
    "itemId": "item_009",
    "terrainId": "ter_dune",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "砂丘の風下に"
  },
  {
    "itemId": "item_009",
    "terrainId": "ter_dune",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "砂丘の風下に"
  },
  {
    "itemId": "item_030",
    "terrainId": "ter_driedbed",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "川床の土から"
  },
  {
    "itemId": "item_030",
    "terrainId": "ter_driedbed",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "川床の土から"
  },
  {
    "itemId": "item_030",
    "terrainId": "ter_driedbed",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "川床の土から"
  },
  {
    "itemId": "item_030",
    "terrainId": "ter_driedbed",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "川床の土から"
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_peat",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "泥炭に埋もれる"
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_peat",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "泥炭に埋もれる"
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_peat",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "泥炭に埋もれる"
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_peat",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "泥炭に埋もれる"
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_peat",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "泥炭に埋もれる"
  },
  {
    "itemId": "item_051",
    "terrainId": "ter_reed",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "水草の間にいる"
  },
  {
    "itemId": "item_051",
    "terrainId": "ter_reed",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "水草の間にいる"
  },
  {
    "itemId": "item_051",
    "terrainId": "ter_reed",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "水草の間にいる"
  },
  {
    "itemId": "item_051",
    "terrainId": "ter_reed",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "水草の間にいる"
  },
  {
    "itemId": "item_051",
    "terrainId": "ter_reed",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "水草の間にいる"
  },
  {
    "itemId": "item_011",
    "terrainId": "ter_stagnant",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "淀みの縁に"
  },
  {
    "itemId": "item_011",
    "terrainId": "ter_stagnant",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "淀みの縁に"
  },
  {
    "itemId": "item_011",
    "terrainId": "ter_stagnant",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "淀みの縁に"
  },
  {
    "itemId": "item_011",
    "terrainId": "ter_stagnant",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "淀みの縁に"
  },
  {
    "itemId": "item_011",
    "terrainId": "ter_stagnant",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "淀みの縁に"
  },
  {
    "itemId": "item_012",
    "terrainId": "ter_snag",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "立ち枯れの根に"
  },
  {
    "itemId": "item_012",
    "terrainId": "ter_snag",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "立ち枯れの根に"
  },
  {
    "itemId": "item_012",
    "terrainId": "ter_snag",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "立ち枯れの根に"
  },
  {
    "itemId": "item_012",
    "terrainId": "ter_snag",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "立ち枯れの根に"
  },
  {
    "itemId": "item_012",
    "terrainId": "ter_snag",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "立ち枯れの根に"
  },
  {
    "itemId": "item_012",
    "terrainId": "ter_snag",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "立ち枯れの根に"
  },
  {
    "itemId": "item_002",
    "terrainId": "ter_glade",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "空き地に生える"
  },
  {
    "itemId": "item_002",
    "terrainId": "ter_glade",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "空き地に生える"
  },
  {
    "itemId": "item_002",
    "terrainId": "ter_glade",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "空き地に生える"
  },
  {
    "itemId": "item_002",
    "terrainId": "ter_glade",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "空き地に生える"
  },
  {
    "itemId": "item_002",
    "terrainId": "ter_glade",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "空き地に生える"
  },
  {
    "itemId": "item_050",
    "terrainId": "ter_river",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "流れに漂う"
  },
  {
    "itemId": "item_050",
    "terrainId": "ter_river",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "流れに漂う"
  },
  {
    "itemId": "item_050",
    "terrainId": "ter_river",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "流れに漂う"
  },
  {
    "itemId": "item_050",
    "terrainId": "ter_river",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "流れに漂う"
  },
  {
    "itemId": "item_022",
    "terrainId": "ter_shallow",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "浅瀬の岸に"
  },
  {
    "itemId": "item_022",
    "terrainId": "ter_shallow",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "浅瀬の岸に"
  },
  {
    "itemId": "item_022",
    "terrainId": "ter_shallow",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "浅瀬の岸に"
  },
  {
    "itemId": "item_022",
    "terrainId": "ter_shallow",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "浅瀬の岸に"
  },
  {
    "itemId": "item_022",
    "terrainId": "ter_shallow",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "浅瀬の岸に"
  },
  {
    "itemId": "item_042",
    "terrainId": "ter_snowfield",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "雪の下から流れる"
  },
  {
    "itemId": "item_042",
    "terrainId": "ter_snowfield",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "雪の下から流れる"
  },
  {
    "itemId": "item_042",
    "terrainId": "ter_snowfield",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "雪の下から流れる"
  },
  {
    "itemId": "item_042",
    "terrainId": "ter_snowfield",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "雪の下から流れる"
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_orevein",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "鉱脈に沿って"
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_orevein",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "鉱脈に沿って"
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_orevein",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "鉱脈に沿って"
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_orevein",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "鉱脈に沿って"
  },
  {
    "itemId": "item_034",
    "terrainId": "ter_orevein",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "鉱脈に沿って"
  },
  {
    "itemId": "item_028",
    "terrainId": "ter_fumarole",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "噴気の周りに"
  },
  {
    "itemId": "item_028",
    "terrainId": "ter_fumarole",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "噴気の周りに"
  },
  {
    "itemId": "item_028",
    "terrainId": "ter_fumarole",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "噴気の周りに"
  },
  {
    "itemId": "item_028",
    "terrainId": "ter_fumarole",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "噴気の周りに"
  },
  {
    "itemId": "item_028",
    "terrainId": "ter_fumarole",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "噴気の周りに"
  },
  {
    "itemId": "item_028",
    "terrainId": "ter_fumarole",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "噴気の周りに"
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_hotspring",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "湯の縁に沈む"
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_hotspring",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "湯の縁に沈む"
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_hotspring",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "湯の縁に沈む"
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_hotspring",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "湯の縁に沈む"
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_hotspring",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "湯の縁に沈む"
  },
  {
    "itemId": "item_027",
    "terrainId": "ter_hotspring",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "湯の縁に沈む"
  },
  {
    "itemId": "item_033",
    "terrainId": "ter_ruinhouse",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "朽ちた金具から"
  },
  {
    "itemId": "item_033",
    "terrainId": "ter_ruinhouse",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "朽ちた金具から"
  },
  {
    "itemId": "item_033",
    "terrainId": "ter_ruinhouse",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "朽ちた金具から"
  },
  {
    "itemId": "item_033",
    "terrainId": "ter_ruinhouse",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "朽ちた金具から"
  },
  {
    "itemId": "item_033",
    "terrainId": "ter_ruinhouse",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "朽ちた金具から"
  },
  {
    "itemId": "item_031",
    "terrainId": "ter_hearth",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "炉の跡に"
  },
  {
    "itemId": "item_031",
    "terrainId": "ter_hearth",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "炉の跡に"
  },
  {
    "itemId": "item_031",
    "terrainId": "ter_hearth",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "炉の跡に"
  },
  {
    "itemId": "item_031",
    "terrainId": "ter_hearth",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "炉の跡に"
  },
  {
    "itemId": "item_031",
    "terrainId": "ter_hearth",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "炉の跡に"
  },
  {
    "itemId": "item_049",
    "terrainId": "ter_well",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "井戸の周りに"
  },
  {
    "itemId": "item_049",
    "terrainId": "ter_well",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "井戸の周りに"
  },
  {
    "itemId": "item_049",
    "terrainId": "ter_well",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "井戸の周りに"
  },
  {
    "itemId": "item_049",
    "terrainId": "ter_well",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "井戸の周りに"
  },
  {
    "itemId": "item_049",
    "terrainId": "ter_well",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "井戸の周りに"
  },
  {
    "itemId": "item_049",
    "terrainId": "ter_well",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "井戸の周りに"
  },
  {
    "itemId": "item_019",
    "terrainId": "ter_fieldplot",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "畑の畦に"
  },
  {
    "itemId": "item_019",
    "terrainId": "ter_fieldplot",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "畑の畦に"
  },
  {
    "itemId": "item_019",
    "terrainId": "ter_fieldplot",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "畑の畦に"
  },
  {
    "itemId": "item_019",
    "terrainId": "ter_fieldplot",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "畑の畦に"
  },
  {
    "itemId": "item_019",
    "terrainId": "ter_fieldplot",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "畑の畦に"
  },
  {
    "itemId": "item_054",
    "terrainId": "ter_driftwood",
    "timeSlot": "dawn",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "漂着物の下に"
  },
  {
    "itemId": "item_054",
    "terrainId": "ter_driftwood",
    "timeSlot": "morning",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "漂着物の下に"
  },
  {
    "itemId": "item_054",
    "terrainId": "ter_driftwood",
    "timeSlot": "noon",
    "rate": 0.42,
    "quantity": 1,
    "condition": null,
    "note": "漂着物の下に"
  },
  {
    "itemId": "item_054",
    "terrainId": "ter_driftwood",
    "timeSlot": "afternoon",
    "rate": 0.38,
    "quantity": 1,
    "condition": null,
    "note": "漂着物の下に"
  },
  {
    "itemId": "item_054",
    "terrainId": "ter_driftwood",
    "timeSlot": "night",
    "rate": 0.3,
    "quantity": 1,
    "condition": null,
    "note": "漂着物の下に"
  },
  {
    "itemId": "item_054",
    "terrainId": "ter_driftwood",
    "timeSlot": "midnight",
    "rate": 0.26,
    "quantity": 1,
    "condition": null,
    "note": "漂着物の下に"
  }
];
