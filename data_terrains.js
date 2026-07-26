// 地形と固定マップ
// tools/convert.py により game_data_v25.xlsx から自動生成。直接編集しないこと。
const TERRAINS_DATA = {
  "terrains": [
    {
      "id": "ter_grass",
      "name": "草むら",
      "color": "#C0DD97",
      "description": "丈の低い草が茂る。どこにでもある地形。"
    },
    {
      "id": "ter_shrub",
      "name": "低木",
      "color": "#97C459",
      "description": "腰までの潅木が茂る。実や葉が採れる。"
    },
    {
      "id": "ter_bare",
      "name": "裸地",
      "color": "#D3D1C7",
      "description": "草も生えない剥き出しの土。"
    },
    {
      "id": "ter_rock",
      "name": "岩場",
      "color": "#B4B2A9",
      "description": "大小の岩が転がる。陰に生き物が潜む。"
    },
    {
      "id": "ter_boulder",
      "name": "大岩",
      "color": "#888780",
      "description": "動かせない巨岩。表面に苔や鉱物。"
    },
    {
      "id": "ter_trunk",
      "name": "樹幹",
      "color": "#7A5C3E",
      "description": "太い木の根元。樹皮を伝う水がある。"
    },
    {
      "id": "ter_leaflitter",
      "name": "落ち葉だまり",
      "color": "#BA7517",
      "description": "積もった落ち葉の下。菌類の温床。"
    },
    {
      "id": "ter_deadwood",
      "name": "倒木",
      "color": "#854F0B",
      "description": "朽ちた倒木。分解者が集まる。"
    },
    {
      "id": "ter_glade",
      "name": "木漏れ日の空き地",
      "color": "#EAF3DE",
      "description": "林の中の明るい隙間。草花が育つ。"
    },
    {
      "id": "ter_river",
      "name": "川の中",
      "color": "#378ADD",
      "description": "流れの速い本流。足を取られる。"
    },
    {
      "id": "ter_shallow",
      "name": "浅瀬",
      "color": "#85B7EB",
      "description": "膝までの流れ。水草と小魚。"
    },
    {
      "id": "ter_gravel",
      "name": "河原",
      "color": "#EF9F27",
      "description": "水に洗われた石が敷き詰められた岸。"
    },
    {
      "id": "ter_mud",
      "name": "ぬかるみ",
      "color": "#996B3D",
      "description": "踏み抜くと沈む泥。"
    },
    {
      "id": "ter_peat",
      "name": "泥炭地",
      "color": "#4A3520",
      "description": "黒く積もった泥炭層。"
    },
    {
      "id": "ter_reed",
      "name": "水草",
      "color": "#639922",
      "description": "水面を覆う草。根が絡み合う。"
    },
    {
      "id": "ter_stagnant",
      "name": "淀み",
      "color": "#5F6E3B",
      "description": "流れの止まった水。濁って底が見えない。"
    },
    {
      "id": "ter_snag",
      "name": "立ち枯れ",
      "color": "#8B7B6B",
      "description": "枯れたまま立つ木。虫と菌の住処。"
    },
    {
      "id": "ter_ledge",
      "name": "岩棚",
      "color": "#9FA5AA",
      "description": "風の当たる張り出した岩。"
    },
    {
      "id": "ter_snowfield",
      "name": "残雪",
      "color": "#E6F1FB",
      "description": "溶け残った雪。融水が流れる。"
    },
    {
      "id": "ter_alpine",
      "name": "高山草地",
      "color": "#9FE1CB",
      "description": "短い草が張り付く高地の斜面。"
    },
    {
      "id": "ter_sand",
      "name": "砂地",
      "color": "#FAC775",
      "description": "乾いた細かい砂。"
    },
    {
      "id": "ter_dune",
      "name": "砂丘",
      "color": "#F0997B",
      "description": "風が作った砂の丘。夜に冷える。"
    },
    {
      "id": "ter_driedbed",
      "name": "干上がった川床",
      "color": "#B4A98F",
      "description": "かつて水が流れていた窪み。"
    },
    {
      "id": "ter_beach",
      "name": "砂浜",
      "color": "#FAEEDA",
      "description": "波打ち際の砂。貝殻が混じる。"
    },
    {
      "id": "ter_tidepool",
      "name": "潮だまり",
      "color": "#5DCAA5",
      "description": "引き潮に取り残された水たまり。"
    },
    {
      "id": "ter_reef",
      "name": "岩礁",
      "color": "#0F6E56",
      "description": "波に洗われる岩。海の生き物が付く。"
    },
    {
      "id": "ter_driftwood",
      "name": "漂着物",
      "color": "#B4B2A9",
      "description": "流れ着いた木や人工物が溜まる場所。"
    },
    {
      "id": "ter_stalactite",
      "name": "鍾乳石",
      "color": "#CECBF6",
      "description": "滴りが作った石の柱。"
    },
    {
      "id": "ter_darkness",
      "name": "暗がり",
      "color": "#3C3489",
      "description": "光の届かない奥。"
    },
    {
      "id": "ter_orevein",
      "name": "鉱脈",
      "color": "#7F77DD",
      "description": "岩肌に露出した鉱石の筋。"
    },
    {
      "id": "ter_fumarole",
      "name": "噴気孔",
      "color": "#E24B4A",
      "description": "硫黄の気が噴き出す穴。"
    },
    {
      "id": "ter_lavafield",
      "name": "溶岩原",
      "color": "#791F1F",
      "description": "冷えて固まった溶岩の原。"
    },
    {
      "id": "ter_hotspring",
      "name": "温泉",
      "color": "#F09595",
      "description": "地熱で温まった湧き水。"
    },
    {
      "id": "ter_ruinhouse",
      "name": "廃屋",
      "color": "#888780",
      "description": "崩れかけた家の跡。"
    },
    {
      "id": "ter_well",
      "name": "井戸",
      "color": "#5F5E5A",
      "description": "涸れずに水を溜めた古井戸。"
    },
    {
      "id": "ter_hearth",
      "name": "竈跡",
      "color": "#444441",
      "description": "焼けた土と灰が残る炉の跡。"
    },
    {
      "id": "ter_fieldplot",
      "name": "畑跡",
      "color": "#C0DD97",
      "description": "作物の名残がある耕地の跡。"
    }
  ],
  "areas": [
    {
      "id": "loc_forest",
      "name": "森",
      "grid": [
        [
          "ter_trunk",
          "ter_trunk",
          "ter_leaflitter",
          "ter_leaflitter",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock"
        ],
        [
          "ter_trunk",
          "ter_leaflitter",
          "ter_leaflitter",
          "ter_leaflitter",
          "ter_glade",
          "ter_glade",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_rock"
        ],
        [
          "ter_leaflitter",
          "ter_leaflitter",
          "ter_leaflitter",
          "ter_leaflitter",
          "ter_glade",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass"
        ],
        [
          "ter_leaflitter",
          "ter_leaflitter",
          "ter_leaflitter",
          "ter_leaflitter",
          "ter_glade",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass"
        ],
        [
          "ter_leaflitter",
          "ter_leaflitter",
          "ter_leaflitter",
          "ter_leaflitter",
          "ter_glade",
          "ter_grass",
          "ter_grass",
          "ter_trunk",
          "ter_trunk",
          "ter_trunk"
        ],
        [
          "ter_leaflitter",
          "ter_leaflitter",
          "ter_leaflitter",
          "ter_glade",
          "ter_glade",
          "ter_grass",
          "ter_trunk",
          "ter_trunk",
          "ter_trunk",
          "ter_trunk"
        ],
        [
          "ter_trunk",
          "ter_trunk",
          "ter_deadwood",
          "ter_glade",
          "ter_glade",
          "ter_glade",
          "ter_trunk",
          "ter_trunk",
          "ter_rock",
          "ter_trunk"
        ],
        [
          "ter_trunk",
          "ter_deadwood",
          "ter_deadwood",
          "ter_glade",
          "ter_glade",
          "ter_shrub",
          "ter_shrub",
          "ter_shrub",
          "ter_trunk",
          "ter_trunk"
        ],
        [
          "ter_trunk",
          "ter_deadwood",
          "ter_deadwood",
          "ter_deadwood",
          "ter_shrub",
          "ter_shrub",
          "ter_shrub",
          "ter_shrub",
          "ter_trunk",
          "ter_trunk"
        ],
        [
          "ter_deadwood",
          "ter_deadwood",
          "ter_deadwood",
          "ter_deadwood",
          "ter_deadwood",
          "ter_deadwood",
          "ter_shrub",
          "ter_shrub",
          "ter_shrub",
          "ter_trunk"
        ]
      ]
    },
    {
      "id": "loc_meadow",
      "name": "草原",
      "grid": [
        [
          "ter_grass",
          "ter_grass",
          "ter_glade",
          "ter_glade",
          "ter_glade",
          "ter_glade",
          "ter_glade",
          "ter_grass",
          "ter_grass",
          "ter_grass"
        ],
        [
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_glade",
          "ter_glade",
          "ter_glade",
          "ter_glade",
          "ter_grass",
          "ter_grass",
          "ter_grass"
        ],
        [
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_glade",
          "ter_glade",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass"
        ],
        [
          "ter_rock",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_glade",
          "ter_glade",
          "ter_glade",
          "ter_grass",
          "ter_grass"
        ],
        [
          "ter_rock",
          "ter_rock",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_shrub",
          "ter_shrub",
          "ter_shrub",
          "ter_shrub"
        ],
        [
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_grass",
          "ter_shrub",
          "ter_shrub",
          "ter_grass"
        ],
        [
          "ter_rock",
          "ter_grass",
          "ter_rock",
          "ter_bare",
          "ter_grass",
          "ter_grass",
          "ter_shrub",
          "ter_shrub",
          "ter_shrub",
          "ter_shrub"
        ],
        [
          "ter_mud",
          "ter_mud",
          "ter_mud",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_shrub",
          "ter_shrub",
          "ter_shrub",
          "ter_shrub"
        ],
        [
          "ter_mud",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_shrub",
          "ter_shrub",
          "ter_shrub",
          "ter_shrub"
        ],
        [
          "ter_mud",
          "ter_mud",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_shrub",
          "ter_shrub"
        ]
      ]
    },
    {
      "id": "loc_cave",
      "name": "洞窟",
      "grid": [
        [
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_orevein",
          "ter_orevein",
          "ter_orevein",
          "ter_orevein",
          "ter_darkness",
          "ter_darkness",
          "ter_darkness"
        ],
        [
          "ter_darkness",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_orevein",
          "ter_orevein",
          "ter_orevein",
          "ter_orevein",
          "ter_orevein"
        ],
        [
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_orevein",
          "ter_orevein",
          "ter_orevein",
          "ter_stalactite",
          "ter_stalactite"
        ],
        [
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_stalactite",
          "ter_stalactite",
          "ter_stalactite",
          "ter_stalactite"
        ],
        [
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_darkness",
          "ter_darkness",
          "ter_stalactite",
          "ter_stalactite",
          "ter_stalactite",
          "ter_stalactite"
        ],
        [
          "ter_rock",
          "ter_rock",
          "ter_shallow",
          "ter_shallow",
          "ter_darkness",
          "ter_darkness",
          "ter_stalactite",
          "ter_stalactite",
          "ter_stalactite",
          "ter_stalactite"
        ],
        [
          "ter_darkness",
          "ter_shallow",
          "ter_shallow",
          "ter_shallow",
          "ter_darkness",
          "ter_darkness",
          "ter_darkness",
          "ter_stalactite",
          "ter_stalactite",
          "ter_stalactite"
        ],
        [
          "ter_darkness",
          "ter_darkness",
          "ter_darkness",
          "ter_shallow",
          "ter_boulder",
          "ter_boulder",
          "ter_boulder",
          "ter_stalactite",
          "ter_darkness",
          "ter_darkness"
        ],
        [
          "ter_darkness",
          "ter_darkness",
          "ter_boulder",
          "ter_darkness",
          "ter_boulder",
          "ter_boulder",
          "ter_darkness",
          "ter_darkness",
          "ter_darkness",
          "ter_darkness"
        ],
        [
          "ter_darkness",
          "ter_boulder",
          "ter_boulder",
          "ter_boulder",
          "ter_boulder",
          "ter_darkness",
          "ter_darkness",
          "ter_darkness",
          "ter_darkness",
          "ter_darkness"
        ]
      ]
    },
    {
      "id": "loc_riverside",
      "name": "川辺",
      "grid": [
        [
          "ter_gravel",
          "ter_gravel",
          "ter_gravel",
          "ter_gravel",
          "ter_gravel",
          "ter_gravel",
          "ter_gravel",
          "ter_river",
          "ter_river",
          "ter_river"
        ],
        [
          "ter_gravel",
          "ter_gravel",
          "ter_gravel",
          "ter_gravel",
          "ter_gravel",
          "ter_gravel",
          "ter_gravel",
          "ter_gravel",
          "ter_river",
          "ter_river"
        ],
        [
          "ter_river",
          "ter_river",
          "ter_river",
          "ter_gravel",
          "ter_river",
          "ter_river",
          "ter_gravel",
          "ter_gravel",
          "ter_gravel",
          "ter_grass"
        ],
        [
          "ter_river",
          "ter_rock",
          "ter_gravel",
          "ter_gravel",
          "ter_mud",
          "ter_river",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass"
        ],
        [
          "ter_rock",
          "ter_rock",
          "ter_mud",
          "ter_gravel",
          "ter_mud",
          "ter_mud",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass"
        ],
        [
          "ter_rock",
          "ter_rock",
          "ter_mud",
          "ter_shallow",
          "ter_mud",
          "ter_river",
          "ter_river",
          "ter_grass",
          "ter_grass",
          "ter_grass"
        ],
        [
          "ter_rock",
          "ter_rock",
          "ter_shallow",
          "ter_shallow",
          "ter_mud",
          "ter_shallow",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass"
        ],
        [
          "ter_rock",
          "ter_rock",
          "ter_shallow",
          "ter_shallow",
          "ter_mud",
          "ter_shallow",
          "ter_river",
          "ter_grass",
          "ter_river",
          "ter_grass"
        ],
        [
          "ter_rock",
          "ter_rock",
          "ter_shallow",
          "ter_shallow",
          "ter_shallow",
          "ter_shallow",
          "ter_shallow",
          "ter_river",
          "ter_river",
          "ter_river"
        ],
        [
          "ter_rock",
          "ter_shallow",
          "ter_shallow",
          "ter_shallow",
          "ter_shallow",
          "ter_shallow",
          "ter_shallow",
          "ter_river",
          "ter_river",
          "ter_river"
        ]
      ]
    },
    {
      "id": "loc_highland",
      "name": "高原",
      "grid": [
        [
          "ter_snowfield",
          "ter_snowfield",
          "ter_snowfield",
          "ter_snowfield",
          "ter_snowfield",
          "ter_snowfield",
          "ter_alpine",
          "ter_alpine",
          "ter_alpine",
          "ter_alpine"
        ],
        [
          "ter_grass",
          "ter_grass",
          "ter_snowfield",
          "ter_snowfield",
          "ter_snowfield",
          "ter_snowfield",
          "ter_alpine",
          "ter_alpine",
          "ter_alpine",
          "ter_alpine"
        ],
        [
          "ter_grass",
          "ter_grass",
          "ter_snowfield",
          "ter_snowfield",
          "ter_alpine",
          "ter_alpine",
          "ter_alpine",
          "ter_alpine",
          "ter_boulder",
          "ter_alpine"
        ],
        [
          "ter_grass",
          "ter_grass",
          "ter_ledge",
          "ter_alpine",
          "ter_alpine",
          "ter_rock",
          "ter_alpine",
          "ter_alpine",
          "ter_boulder",
          "ter_alpine"
        ],
        [
          "ter_ledge",
          "ter_ledge",
          "ter_ledge",
          "ter_ledge",
          "ter_alpine",
          "ter_rock",
          "ter_rock",
          "ter_boulder",
          "ter_boulder",
          "ter_boulder"
        ],
        [
          "ter_ledge",
          "ter_ledge",
          "ter_ledge",
          "ter_ledge",
          "ter_alpine",
          "ter_rock",
          "ter_rock",
          "ter_boulder",
          "ter_boulder",
          "ter_boulder"
        ],
        [
          "ter_ledge",
          "ter_ledge",
          "ter_ledge",
          "ter_ledge",
          "ter_alpine",
          "ter_rock",
          "ter_rock",
          "ter_boulder",
          "ter_boulder",
          "ter_boulder"
        ],
        [
          "ter_alpine",
          "ter_alpine",
          "ter_ledge",
          "ter_ledge",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_boulder"
        ],
        [
          "ter_alpine",
          "ter_ledge",
          "ter_ledge",
          "ter_ledge",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_grass",
          "ter_alpine"
        ],
        [
          "ter_ledge",
          "ter_ledge",
          "ter_ledge",
          "ter_ledge",
          "ter_rock",
          "ter_rock",
          "ter_alpine",
          "ter_grass",
          "ter_grass",
          "ter_grass"
        ]
      ]
    },
    {
      "id": "loc_wasteland",
      "name": "荒野",
      "grid": [
        [
          "ter_sand",
          "ter_dune",
          "ter_dune",
          "ter_dune",
          "ter_dune",
          "ter_dune",
          "ter_sand",
          "ter_sand",
          "ter_sand",
          "ter_sand"
        ],
        [
          "ter_sand",
          "ter_dune",
          "ter_dune",
          "ter_dune",
          "ter_dune",
          "ter_dune",
          "ter_dune",
          "ter_dune",
          "ter_dune",
          "ter_shrub"
        ],
        [
          "ter_sand",
          "ter_dune",
          "ter_dune",
          "ter_sand",
          "ter_dune",
          "ter_dune",
          "ter_rock",
          "ter_dune",
          "ter_sand",
          "ter_shrub"
        ],
        [
          "ter_sand",
          "ter_sand",
          "ter_sand",
          "ter_sand",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_sand",
          "ter_shrub"
        ],
        [
          "ter_sand",
          "ter_sand",
          "ter_sand",
          "ter_sand",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_sand",
          "ter_sand",
          "ter_sand"
        ],
        [
          "ter_bare",
          "ter_bare",
          "ter_sand",
          "ter_sand",
          "ter_bare",
          "ter_rock",
          "ter_sand",
          "ter_sand",
          "ter_sand",
          "ter_driedbed"
        ],
        [
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_rock",
          "ter_driedbed",
          "ter_driedbed",
          "ter_sand",
          "ter_driedbed"
        ],
        [
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_sand",
          "ter_driedbed",
          "ter_driedbed",
          "ter_driedbed",
          "ter_driedbed"
        ],
        [
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_shrub",
          "ter_driedbed",
          "ter_driedbed",
          "ter_driedbed"
        ],
        [
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_shrub",
          "ter_shrub",
          "ter_driedbed",
          "ter_driedbed",
          "ter_driedbed"
        ]
      ]
    },
    {
      "id": "loc_swamp",
      "name": "沼地",
      "grid": [
        [
          "ter_stagnant",
          "ter_stagnant",
          "ter_stagnant",
          "ter_stagnant",
          "ter_stagnant",
          "ter_mud",
          "ter_mud",
          "ter_mud",
          "ter_mud",
          "ter_mud"
        ],
        [
          "ter_stagnant",
          "ter_stagnant",
          "ter_stagnant",
          "ter_mud",
          "ter_mud",
          "ter_mud",
          "ter_mud",
          "ter_mud",
          "ter_mud",
          "ter_mud"
        ],
        [
          "ter_stagnant",
          "ter_stagnant",
          "ter_reed",
          "ter_mud",
          "ter_mud",
          "ter_snag",
          "ter_mud",
          "ter_mud",
          "ter_mud",
          "ter_mud"
        ],
        [
          "ter_stagnant",
          "ter_stagnant",
          "ter_reed",
          "ter_snag",
          "ter_snag",
          "ter_snag",
          "ter_peat",
          "ter_peat",
          "ter_peat",
          "ter_peat"
        ],
        [
          "ter_stagnant",
          "ter_stagnant",
          "ter_reed",
          "ter_snag",
          "ter_snag",
          "ter_peat",
          "ter_peat",
          "ter_peat",
          "ter_peat",
          "ter_peat"
        ],
        [
          "ter_stagnant",
          "ter_reed",
          "ter_reed",
          "ter_snag",
          "ter_snag",
          "ter_peat",
          "ter_peat",
          "ter_peat",
          "ter_peat",
          "ter_peat"
        ],
        [
          "ter_stagnant",
          "ter_reed",
          "ter_reed",
          "ter_snag",
          "ter_snag",
          "ter_peat",
          "ter_peat",
          "ter_peat",
          "ter_peat",
          "ter_mud"
        ],
        [
          "ter_reed",
          "ter_reed",
          "ter_reed",
          "ter_reed",
          "ter_snag",
          "ter_mud",
          "ter_mud",
          "ter_deadwood",
          "ter_peat",
          "ter_peat"
        ],
        [
          "ter_reed",
          "ter_reed",
          "ter_reed",
          "ter_mud",
          "ter_snag",
          "ter_mud",
          "ter_deadwood",
          "ter_deadwood",
          "ter_deadwood",
          "ter_deadwood"
        ],
        [
          "ter_reed",
          "ter_reed",
          "ter_reed",
          "ter_reed",
          "ter_mud",
          "ter_deadwood",
          "ter_deadwood",
          "ter_deadwood",
          "ter_deadwood",
          "ter_deadwood"
        ]
      ]
    },
    {
      "id": "loc_seashore",
      "name": "海辺",
      "grid": [
        [
          "ter_beach",
          "ter_beach",
          "ter_beach",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_beach",
          "ter_grass",
          "ter_beach",
          "ter_beach"
        ],
        [
          "ter_beach",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_beach",
          "ter_grass",
          "ter_grass",
          "ter_grass"
        ],
        [
          "ter_beach",
          "ter_rock",
          "ter_sand",
          "ter_sand",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_grass",
          "ter_grass",
          "ter_grass"
        ],
        [
          "ter_beach",
          "ter_reef",
          "ter_reef",
          "ter_sand",
          "ter_sand",
          "ter_beach",
          "ter_beach",
          "ter_beach",
          "ter_grass",
          "ter_tidepool"
        ],
        [
          "ter_beach",
          "ter_reef",
          "ter_reef",
          "ter_sand",
          "ter_driftwood",
          "ter_driftwood",
          "ter_driftwood",
          "ter_driftwood",
          "ter_tidepool",
          "ter_tidepool"
        ],
        [
          "ter_beach",
          "ter_reef",
          "ter_reef",
          "ter_sand",
          "ter_driftwood",
          "ter_driftwood",
          "ter_tidepool",
          "ter_tidepool",
          "ter_tidepool",
          "ter_tidepool"
        ],
        [
          "ter_reef",
          "ter_reef",
          "ter_reef",
          "ter_reef",
          "ter_reef",
          "ter_tidepool",
          "ter_tidepool",
          "ter_tidepool",
          "ter_tidepool",
          "ter_tidepool"
        ],
        [
          "ter_driftwood",
          "ter_reef",
          "ter_reef",
          "ter_reef",
          "ter_reef",
          "ter_beach",
          "ter_beach",
          "ter_tidepool",
          "ter_tidepool",
          "ter_tidepool"
        ],
        [
          "ter_driftwood",
          "ter_driftwood",
          "ter_reef",
          "ter_reef",
          "ter_beach",
          "ter_beach",
          "ter_beach",
          "ter_beach",
          "ter_tidepool",
          "ter_beach"
        ],
        [
          "ter_driftwood",
          "ter_driftwood",
          "ter_driftwood",
          "ter_reef",
          "ter_beach",
          "ter_beach",
          "ter_beach",
          "ter_beach",
          "ter_beach",
          "ter_beach"
        ]
      ]
    },
    {
      "id": "loc_volcanic",
      "name": "火山帯",
      "grid": [
        [
          "ter_lavafield",
          "ter_lavafield",
          "ter_lavafield",
          "ter_lavafield",
          "ter_lavafield",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock"
        ],
        [
          "ter_lavafield",
          "ter_lavafield",
          "ter_lavafield",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_lavafield",
          "ter_rock",
          "ter_rock"
        ],
        [
          "ter_lavafield",
          "ter_lavafield",
          "ter_lavafield",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_bare",
          "ter_bare",
          "ter_rock",
          "ter_rock"
        ],
        [
          "ter_lavafield",
          "ter_lavafield",
          "ter_lavafield",
          "ter_rock",
          "ter_lavafield",
          "ter_rock",
          "ter_rock",
          "ter_bare",
          "ter_bare",
          "ter_bare"
        ],
        [
          "ter_lavafield",
          "ter_fumarole",
          "ter_lavafield",
          "ter_lavafield",
          "ter_lavafield",
          "ter_rock",
          "ter_rock",
          "ter_bare",
          "ter_bare",
          "ter_bare"
        ],
        [
          "ter_fumarole",
          "ter_fumarole",
          "ter_lavafield",
          "ter_boulder",
          "ter_boulder",
          "ter_lavafield",
          "ter_rock",
          "ter_bare",
          "ter_bare",
          "ter_hotspring"
        ],
        [
          "ter_fumarole",
          "ter_fumarole",
          "ter_fumarole",
          "ter_lavafield",
          "ter_boulder",
          "ter_lavafield",
          "ter_bare",
          "ter_bare",
          "ter_hotspring",
          "ter_hotspring"
        ],
        [
          "ter_fumarole",
          "ter_fumarole",
          "ter_fumarole",
          "ter_lavafield",
          "ter_boulder",
          "ter_boulder",
          "ter_hotspring",
          "ter_hotspring",
          "ter_hotspring",
          "ter_hotspring"
        ],
        [
          "ter_fumarole",
          "ter_fumarole",
          "ter_fumarole",
          "ter_boulder",
          "ter_boulder",
          "ter_boulder",
          "ter_hotspring",
          "ter_hotspring",
          "ter_hotspring",
          "ter_hotspring"
        ],
        [
          "ter_fumarole",
          "ter_fumarole",
          "ter_lavafield",
          "ter_lavafield",
          "ter_boulder",
          "ter_boulder",
          "ter_lavafield",
          "ter_hotspring",
          "ter_lavafield",
          "ter_lavafield"
        ]
      ]
    },
    {
      "id": "loc_ruins",
      "name": "廃村",
      "grid": [
        [
          "ter_ruinhouse",
          "ter_fieldplot",
          "ter_fieldplot",
          "ter_fieldplot",
          "ter_fieldplot",
          "ter_fieldplot",
          "ter_fieldplot",
          "ter_fieldplot",
          "ter_ruinhouse",
          "ter_ruinhouse"
        ],
        [
          "ter_ruinhouse",
          "ter_ruinhouse",
          "ter_fieldplot",
          "ter_fieldplot",
          "ter_fieldplot",
          "ter_fieldplot",
          "ter_fieldplot",
          "ter_fieldplot",
          "ter_ruinhouse",
          "ter_ruinhouse"
        ],
        [
          "ter_fieldplot",
          "ter_fieldplot",
          "ter_fieldplot",
          "ter_fieldplot",
          "ter_fieldplot",
          "ter_fieldplot",
          "ter_rock",
          "ter_hearth",
          "ter_ruinhouse",
          "ter_ruinhouse"
        ],
        [
          "ter_ruinhouse",
          "ter_fieldplot",
          "ter_ruinhouse",
          "ter_ruinhouse",
          "ter_rock",
          "ter_rock",
          "ter_rock",
          "ter_hearth",
          "ter_ruinhouse",
          "ter_ruinhouse"
        ],
        [
          "ter_ruinhouse",
          "ter_well",
          "ter_well",
          "ter_ruinhouse",
          "ter_rock",
          "ter_rock",
          "ter_hearth",
          "ter_hearth",
          "ter_ruinhouse",
          "ter_ruinhouse"
        ],
        [
          "ter_well",
          "ter_well",
          "ter_well",
          "ter_ruinhouse",
          "ter_ruinhouse",
          "ter_hearth",
          "ter_hearth",
          "ter_hearth",
          "ter_hearth",
          "ter_ruinhouse"
        ],
        [
          "ter_well",
          "ter_well",
          "ter_grass",
          "ter_bare",
          "ter_bare",
          "ter_hearth",
          "ter_hearth",
          "ter_hearth",
          "ter_hearth",
          "ter_ruinhouse"
        ],
        [
          "ter_ruinhouse",
          "ter_well",
          "ter_grass",
          "ter_grass",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_bare"
        ],
        [
          "ter_ruinhouse",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_bare",
          "ter_bare"
        ],
        [
          "ter_ruinhouse",
          "ter_ruinhouse",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_grass",
          "ter_bare",
          "ter_bare",
          "ter_bare"
        ]
      ]
    }
  ]
};
