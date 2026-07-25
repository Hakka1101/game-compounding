// レシピ定義
// tools/convert.py により game_data_v13.xlsx から自動生成。直接編集しないこと。
const RECIPES_DATA = [
  {
    "result": "加速の秘薬",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_003",
        "processId": "grind",
        "quantity": 1,
        "note": "ニガハシリダケ限定"
      },
      {
        "checkType": "categoryId",
        "value": "liquid",
        "processId": "boil",
        "quantity": 1,
        "note": "水系ならなんでもOK"
      }
    ]
  },
  {
    "result": "汎用毒消し",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "detox",
        "processId": "boil",
        "quantity": 1,
        "note": "解毒効果を持つ素材"
      },
      {
        "checkType": "reactionId",
        "value": "neutralize",
        "processId": "raw",
        "quantity": 1,
        "note": "中和の性質を持つ素材"
      }
    ]
  },
  {
    "result": "蒸留水",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "categoryId",
        "value": "liquid",
        "processId": "distill",
        "quantity": 1,
        "note": "水質素材ならなんでもOK"
      }
    ]
  },
  {
    "result": "純化水",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_059",
        "processId": "raw",
        "quantity": 1,
        "note": "ベース：蒸留水"
      },
      {
        "checkType": "reactionId",
        "value": "separate",
        "processId": "dissolve",
        "quantity": 1,
        "note": "分離特性の素材を溶かす（例：深層の塩水・白砂晶・墨痕石）"
      }
    ]
  },
  {
    "result": "超純水",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_059",
        "processId": "distill",
        "quantity": 1,
        "note": "蒸留水をベースに蒸留"
      },
      {
        "checkType": "itemId",
        "value": "item_060",
        "processId": "raw",
        "quantity": 1,
        "note": "純化水を加えて二重浄化"
      }
    ]
  },
  {
    "result": "凝固薬",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "categoryId",
        "value": "liquid",
        "processId": "boil",
        "quantity": 1,
        "note": "水質ベース"
      },
      {
        "checkType": "reactionId",
        "value": "coagulate",
        "processId": "raw",
        "quantity": 1,
        "note": "凝固特性の素材を加える（例：鍾乳洞の滴り・樹皮を伝う雨水）"
      }
    ]
  },
  {
    "result": "浸透溶媒",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "reactionId",
        "value": "permeate",
        "processId": "distill",
        "quantity": 1,
        "note": "浸透特性の水質を蒸留（例：草木の朝露・灰から取った灰汁）"
      },
      {
        "checkType": "categoryId",
        "value": "flora",
        "processId": "dissolve",
        "quantity": 1,
        "note": "植物素材を溶かし込む"
      }
    ]
  },
  {
    "result": "強発酵液",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_039",
        "processId": "ferment",
        "quantity": 1,
        "note": "雨溜まりの泥水を発酵"
      },
      {
        "checkType": "categoryId",
        "value": "fungi",
        "processId": "raw",
        "quantity": 1,
        "note": "菌類を加えて発酵を促進"
      }
    ]
  },
  {
    "result": "保存溶液",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "reactionId",
        "value": "preserve",
        "processId": "boil",
        "quantity": 1,
        "note": "保存特性の水質を煮る（例：鉄渋の湧き水・古井戸の溜まり水）"
      },
      {
        "checkType": "categoryId",
        "value": "mineral",
        "processId": "dissolve",
        "quantity": 1,
        "note": "鉱物素材を溶かし安定性を高める"
      }
    ]
  },
  {
    "result": "野草の傷薬",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "categoryId",
        "value": "flora",
        "processId": "boil",
        "quantity": 1,
        "checkType2": "effectId",
        "value2": "healing",
        "note": "植物かつ治癒の素材（イバラアザミ・ハッカガヤ・ニガヨモギモドキなど）"
      },
      {
        "checkType": "categoryId",
        "value": "liquid",
        "processId": "raw",
        "quantity": 1,
        "note": "水でのばす"
      }
    ]
  },
  {
    "result": "鎮静の丸薬",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "sedation",
        "processId": "boil",
        "quantity": 1,
        "note": "鎮静効果の素材（青泥石・氷晶石モドキ・オオツユグサなど）"
      },
      {
        "checkType": "reactionId",
        "value": "coagulate",
        "processId": "raw",
        "quantity": 1,
        "note": "凝固素材で丸薬に固める"
      },
      {
        "checkType": "categoryId",
        "value": "liquid",
        "processId": "raw",
        "quantity": 1,
        "note": "溶媒"
      }
    ]
  },
  {
    "result": "目覚め薬",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_049",
        "processId": "grind",
        "quantity": 1,
        "note": "トゲネズミの抜け殻（固定）"
      },
      {
        "checkType": "reactionId",
        "value": "volatile",
        "processId": "raw",
        "quantity": 1,
        "note": "揮発素材で吸引薬に（カサカサ草・ミズススリの浮き袋など）"
      }
    ]
  },
  {
    "result": "滋養の煎じ薬",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "tonic",
        "processId": "boil",
        "quantity": 1,
        "note": "滋養強壮の素材（ドロワリタケ・ツボミカズラ・ネバリダイコンなど）"
      },
      {
        "checkType": "reactionId",
        "value": "permeate",
        "processId": "raw",
        "quantity": 1,
        "note": "浸透素材で体の芯まで"
      },
      {
        "checkType": "itemId",
        "value": "item_041",
        "processId": "raw",
        "quantity": 1,
        "note": "鉄渋の湧き水（固定）：効能を定着させる"
      }
    ]
  },
  {
    "result": "煙の護符",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "insulation",
        "processId": "dry",
        "quantity": 1,
        "note": "防護効果の素材（ユウヒダケ・イワノボリツル・雲母片岩など）"
      },
      {
        "checkType": "reactionId",
        "value": "volatile",
        "processId": "raw",
        "quantity": 1,
        "note": "揮発素材で煙に変える"
      },
      {
        "checkType": "itemId",
        "value": "item_017",
        "processId": "raw",
        "quantity": 1,
        "note": "カサカサ草（固定）：着火補助"
      }
    ]
  },
  {
    "result": "万能解毒剤",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_080",
        "processId": "raw",
        "quantity": 1,
        "note": "【T2】汎用毒消しの上位版。エキスを土台にする"
      },
      {
        "checkType": "reactionId",
        "value": "neutralize",
        "processId": "boil",
        "quantity": 1,
        "note": "中和素材を煮出して効力を引き出す"
      },
      {
        "checkType": "itemId",
        "value": "item_061",
        "processId": "raw",
        "quantity": 1,
        "note": "最上の溶媒であらゆる毒に対応させる"
      }
    ]
  },
  {
    "result": "上質な傷薬",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "healing",
        "processId": "boil",
        "quantity": 1,
        "note": "治癒素材を煮出す（イバラアザミ・ヤセボソシメジ等）"
      },
      {
        "checkType": "itemId",
        "value": "item_060",
        "processId": "raw",
        "quantity": 1,
        "note": "純化水ベース：中間素材チェーンの回収先"
      }
    ]
  },
  {
    "result": "巫女セレネの霊視香",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "mystic",
        "processId": "dry",
        "quantity": 1,
        "note": "★人名T3。神秘素材を乾かして香に"
      },
      {
        "checkType": "reactionId",
        "value": "volatile",
        "processId": "burn",
        "quantity": 1,
        "note": "焼いて煙に変える"
      },
      {
        "checkType": "itemId",
        "value": "item_068",
        "processId": "raw",
        "quantity": 1,
        "note": "燃焼の土台"
      },
      {
        "checkType": "itemId",
        "value": "item_071",
        "processId": "raw",
        "quantity": 1,
        "note": "雑味を吸わせ視界を澄ませる"
      }
    ]
  },
  {
    "result": "蛇牙の塗り毒",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "poison",
        "processId": "grind",
        "quantity": 1,
        "note": "毒素材（オロチノイバラ・カビツキヌメリ）"
      },
      {
        "checkType": "reactionId",
        "value": "coagulate",
        "processId": "raw",
        "quantity": 1,
        "note": "粘性を持たせ刃に塗布可能に"
      }
    ]
  },
  {
    "result": "冷却晶",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_032",
        "processId": "freeze",
        "quantity": 1,
        "note": "氷晶石モドキ（固定）。「凍らせる」工程の初出"
      },
      {
        "checkType": "categoryId",
        "value": "liquid",
        "processId": "raw",
        "quantity": 1,
        "note": "水質を纏わせて結晶化"
      }
    ]
  },
  {
    "result": "促進触媒",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "reactionId",
        "value": "catalyst",
        "processId": "grind",
        "quantity": 1,
        "note": "触媒素材（ドロワリタケ・黄土塊・ハバタキ蛾の粉末等）"
      },
      {
        "checkType": "itemId",
        "value": "item_064",
        "processId": "raw",
        "quantity": 1,
        "note": "発酵液で活性化"
      }
    ]
  },
  {
    "result": "硬化の膏薬",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "stable",
        "processId": "dissolve",
        "quantity": 1,
        "note": "安定素材（リュウノツノ・鈍色金）"
      },
      {
        "checkType": "itemId",
        "value": "item_062",
        "processId": "raw",
        "quantity": 1,
        "note": "中間素材：凝固薬を要求"
      }
    ]
  },
  {
    "result": "灯守ヨナの常夜灯",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_055",
        "processId": "raw",
        "quantity": 1,
        "note": "★人名T3。ホタルコウモリの牙（固定）"
      },
      {
        "checkType": "reactionId",
        "value": "preserve",
        "processId": "dissolve",
        "quantity": 1,
        "note": "保存素材で光を封じる"
      },
      {
        "checkType": "itemId",
        "value": "item_084",
        "processId": "raw",
        "quantity": 1,
        "note": "光源を包む封入材"
      },
      {
        "checkType": "itemId",
        "value": "item_060",
        "processId": "raw",
        "quantity": 1,
        "note": "濁りを除き光を通す"
      }
    ]
  },
  {
    "result": "獣香の誘引剤",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "categoryId",
        "value": "creature",
        "processId": "ferment",
        "quantity": 1,
        "note": "動物性素材の活用先"
      },
      {
        "checkType": "reactionId",
        "value": "permeate",
        "processId": "raw",
        "quantity": 1,
        "note": "浸透素材で匂いを拡散"
      }
    ]
  },
  {
    "result": "眠り姫マルグレーテの微睡み香",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_086",
        "processId": "raw",
        "quantity": 1,
        "note": "★人名T4。百年の眠りと謳われる"
      },
      {
        "checkType": "effectId",
        "value": "sedation",
        "processId": "distill",
        "quantity": 1,
        "note": "鎮静成分だけを抜き出す"
      },
      {
        "checkType": "itemId",
        "value": "item_079",
        "processId": "raw",
        "quantity": 1,
        "note": "香りの担体"
      },
      {
        "checkType": "itemId",
        "value": "item_067",
        "processId": "raw",
        "quantity": 1,
        "note": "体温を下げ眠りを深くする"
      },
      {
        "checkType": "itemId",
        "value": "item_066",
        "processId": "raw",
        "quantity": 1,
        "note": "効き目を確実にする"
      }
    ]
  },
  {
    "result": "鉄壁の護り薬",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "insulation",
        "processId": "dissolve",
        "quantity": 1,
        "note": "防護素材（雲母片岩・イワノボリツル）"
      },
      {
        "checkType": "itemId",
        "value": "item_062",
        "processId": "raw",
        "quantity": 1,
        "note": "凝固薬で皮膜化"
      }
    ]
  },
  {
    "result": "消臭の中和粉",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "reactionId",
        "value": "neutralize",
        "processId": "dry",
        "quantity": 1,
        "note": "中和素材（ベニテングダマシ・キリンノナミダ）"
      },
      {
        "checkType": "categoryId",
        "value": "mineral",
        "processId": "grind",
        "quantity": 1,
        "note": "鉱物粉を担体に"
      }
    ]
  },
  {
    "result": "光苔のインク",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_024",
        "processId": "dissolve",
        "quantity": 1,
        "note": "ミツユキソウ（固定）"
      },
      {
        "checkType": "reactionId",
        "value": "permeate",
        "processId": "raw",
        "quantity": 1,
        "note": "浸透性の水質で紙に定着（草木の朝露等）"
      }
    ]
  },
  {
    "result": "風読みフィオナの軟膏",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "levitation",
        "processId": "boil",
        "quantity": 1,
        "note": "★人名T3。浮遊素材を煮出す"
      },
      {
        "checkType": "reactionId",
        "value": "volatile",
        "processId": "raw",
        "quantity": 1,
        "note": "軽さを与える"
      },
      {
        "checkType": "itemId",
        "value": "item_077",
        "processId": "raw",
        "quantity": 1,
        "note": "軟膏の基材"
      },
      {
        "checkType": "itemId",
        "value": "item_066",
        "processId": "raw",
        "quantity": 1,
        "note": "効果を安定させる"
      }
    ]
  },
  {
    "result": "賢者アルドラスの霊薬",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_061",
        "processId": "raw",
        "quantity": 1,
        "note": "★人名T3。思考を澄ませる"
      },
      {
        "checkType": "effectId",
        "value": "mystic",
        "processId": "distill",
        "quantity": 1,
        "note": "神秘成分のみを抽出"
      },
      {
        "checkType": "itemId",
        "value": "item_082",
        "processId": "raw",
        "quantity": 1,
        "note": "魔力回路を広げる"
      },
      {
        "checkType": "itemId",
        "value": "item_087",
        "processId": "raw",
        "quantity": 1,
        "note": "集中力を引き上げる"
      }
    ]
  },
  {
    "result": "硫黄華",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_045",
        "processId": "distill",
        "quantity": 1,
        "note": "【T0】地熱帯の硫黄水を蒸留。※蒸留水より先に判定すること"
      }
    ]
  },
  {
    "result": "精製塩",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_047",
        "processId": "dry",
        "quantity": 1,
        "note": "【T0】深層の塩水を干す。煮ると苦味が残る"
      }
    ]
  },
  {
    "result": "鉄粉",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_033",
        "processId": "grind",
        "quantity": 1,
        "note": "【T0】錆び鉄鉱。※鉱石粉より先に判定すること"
      }
    ]
  },
  {
    "result": "木灰",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "categoryId",
        "value": "flora",
        "processId": "burn",
        "quantity": 1,
        "note": "【T0】植物なら何でも可。最も安価な加工品"
      }
    ]
  },
  {
    "result": "鉱石粉",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "categoryId",
        "value": "mineral",
        "processId": "grind",
        "quantity": 1,
        "note": "【T0】鉱物なら何でも可"
      }
    ]
  },
  {
    "result": "骨炭",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "categoryId",
        "value": "creature",
        "processId": "burn",
        "quantity": 1,
        "note": "【T0】動物性素材を焼く"
      }
    ]
  },
  {
    "result": "麹",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "categoryId",
        "value": "fungi",
        "processId": "ferment",
        "quantity": 1,
        "note": "【T0】菌類を寝かせる"
      }
    ]
  },
  {
    "result": "薬草粉",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "categoryId",
        "value": "flora",
        "processId": "dry",
        "quantity": 1,
        "checkType2": "effectId",
        "value2": "healing",
        "note": "【T0】植物かつ治癒（イバラアザミ・ハッカガヤ・ニガヨモギモドキ）"
      }
    ]
  },
  {
    "result": "灰汁液",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_068",
        "processId": "raw",
        "quantity": 1,
        "note": "【T1】"
      },
      {
        "checkType": "categoryId",
        "value": "liquid",
        "processId": "boil",
        "quantity": 1,
        "note": "水質で煮出す"
      }
    ]
  },
  {
    "result": "獣脂",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "categoryId",
        "value": "creature",
        "processId": "boil",
        "quantity": 1,
        "checkType2": "reactionId",
        "value2": "preserve",
        "note": "【T1】保存特性の動物性素材"
      },
      {
        "checkType": "categoryId",
        "value": "liquid",
        "processId": "raw",
        "quantity": 1,
        "note": "水でのばす"
      }
    ]
  },
  {
    "result": "膠",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_054",
        "processId": "boil",
        "quantity": 1,
        "note": "【T1】ツギハギヘビの抜け殻を煮詰める"
      },
      {
        "checkType": "itemId",
        "value": "item_076",
        "processId": "raw",
        "quantity": 1,
        "note": "灰汁で分解を助ける"
      }
    ]
  },
  {
    "result": "香油",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_077",
        "processId": "raw",
        "quantity": 1,
        "note": "【T1】"
      },
      {
        "checkType": "categoryId",
        "value": "flora",
        "processId": "dissolve",
        "quantity": 1,
        "checkType2": "reactionId",
        "value2": "permeate",
        "note": "浸透特性の植物の香りを移す"
      }
    ]
  },
  {
    "result": "解毒エキス",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "detox",
        "processId": "boil",
        "quantity": 1,
        "note": "【T1】解毒素材を煮出す"
      },
      {
        "checkType": "itemId",
        "value": "item_063",
        "processId": "raw",
        "quantity": 1,
        "note": "浸透溶媒で濃縮"
      }
    ]
  },
  {
    "result": "猛毒エキス",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "poison",
        "processId": "dissolve",
        "quantity": 1,
        "note": "【T1】毒素材を溶かし込む"
      },
      {
        "checkType": "itemId",
        "value": "item_060",
        "processId": "raw",
        "quantity": 1,
        "note": "純化水なら無臭・無色になる"
      }
    ]
  },
  {
    "result": "霊銀砂",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "mystic",
        "processId": "grind",
        "quantity": 1,
        "note": "【T1】神秘素材を挽く"
      },
      {
        "checkType": "itemId",
        "value": "item_069",
        "processId": "raw",
        "quantity": 1,
        "note": "鉱石粉と混ぜて安定させる"
      }
    ]
  },
  {
    "result": "酒精",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_064",
        "processId": "distill",
        "quantity": 1,
        "note": "【T1】"
      },
      {
        "checkType": "itemId",
        "value": "item_075",
        "processId": "raw",
        "quantity": 1,
        "note": "麹で発酵を整える"
      }
    ]
  },
  {
    "result": "硬化油",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_079",
        "processId": "raw",
        "quantity": 1,
        "note": "【T1】"
      },
      {
        "checkType": "itemId",
        "value": "item_062",
        "processId": "raw",
        "quantity": 1,
        "note": "固めて半固形に"
      }
    ]
  },
  {
    "result": "苦灰塩",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_068",
        "processId": "raw",
        "quantity": 1,
        "note": "【T1】"
      },
      {
        "checkType": "itemId",
        "value": "item_072",
        "processId": "dissolve",
        "quantity": 1,
        "note": "塩を溶かして練り合わせる"
      }
    ]
  },
  {
    "result": "鎮静水",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "sedation",
        "processId": "boil",
        "quantity": 1,
        "note": "【T1】鎮静素材を煮出す"
      },
      {
        "checkType": "itemId",
        "value": "item_059",
        "processId": "raw",
        "quantity": 1,
        "note": "蒸留水を溶媒に"
      }
    ]
  },
  {
    "result": "活性水",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "stimulation",
        "processId": "boil",
        "quantity": 1,
        "note": "【T1】興奮素材を煮出す"
      },
      {
        "checkType": "itemId",
        "value": "item_059",
        "processId": "raw",
        "quantity": 1,
        "note": "蒸留水を溶媒に"
      }
    ]
  },
  {
    "result": "傷薬の軟膏",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "healing",
        "processId": "boil",
        "quantity": 1,
        "note": "【T2】"
      },
      {
        "checkType": "itemId",
        "value": "item_078",
        "processId": "raw",
        "quantity": 1,
        "note": "形を保つ"
      },
      {
        "checkType": "itemId",
        "value": "item_077",
        "processId": "raw",
        "quantity": 1,
        "note": "基材"
      }
    ]
  },
  {
    "result": "止血粉",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "healing",
        "processId": "dry",
        "quantity": 1,
        "note": "【T2】"
      },
      {
        "checkType": "reactionId",
        "value": "coagulate",
        "processId": "grind",
        "quantity": 1,
        "note": "凝固素材を粉に"
      },
      {
        "checkType": "itemId",
        "value": "item_069",
        "processId": "raw",
        "quantity": 1,
        "note": "かさ増しの担体"
      }
    ]
  },
  {
    "result": "消毒液",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_083",
        "processId": "raw",
        "quantity": 1,
        "note": "【T2】"
      },
      {
        "checkType": "effectId",
        "value": "detox",
        "processId": "dissolve",
        "quantity": 1,
        "note": "解毒成分を溶かす"
      },
      {
        "checkType": "itemId",
        "value": "item_059",
        "processId": "raw",
        "quantity": 1,
        "note": "濃度を整える"
      }
    ]
  },
  {
    "result": "解熱の煎じ薬",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "healing",
        "processId": "boil",
        "quantity": 1,
        "note": "【T2】"
      },
      {
        "checkType": "itemId",
        "value": "item_067",
        "processId": "raw",
        "quantity": 1,
        "note": "熱を奪う"
      },
      {
        "checkType": "categoryId",
        "value": "liquid",
        "processId": "raw",
        "quantity": 1,
        "note": "水でのばす"
      }
    ]
  },
  {
    "result": "強壮酒",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "tonic",
        "processId": "ferment",
        "quantity": 1,
        "note": "【T2】滋養素材を発酵"
      },
      {
        "checkType": "itemId",
        "value": "item_083",
        "processId": "raw",
        "quantity": 1,
        "note": "度数を上げる"
      },
      {
        "checkType": "reactionId",
        "value": "permeate",
        "processId": "raw",
        "quantity": 1,
        "note": "体の芯まで届かせる"
      }
    ]
  },
  {
    "result": "覚醒錠",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_087",
        "processId": "raw",
        "quantity": 1,
        "note": "【T2】"
      },
      {
        "checkType": "reactionId",
        "value": "coagulate",
        "processId": "raw",
        "quantity": 1,
        "note": "錠剤に固める"
      },
      {
        "checkType": "itemId",
        "value": "item_070",
        "processId": "raw",
        "quantity": 1,
        "note": "賦形剤"
      }
    ]
  },
  {
    "result": "麻酔液",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_086",
        "processId": "raw",
        "quantity": 1,
        "note": "【T2】"
      },
      {
        "checkType": "effectId",
        "value": "poison",
        "processId": "dissolve",
        "quantity": 1,
        "note": "微量の毒で感覚を断つ"
      },
      {
        "checkType": "itemId",
        "value": "item_063",
        "processId": "raw",
        "quantity": 1,
        "note": "速効性を持たせる"
      }
    ]
  },
  {
    "result": "防虫香",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_073",
        "processId": "burn",
        "quantity": 1,
        "note": "【T2】"
      },
      {
        "checkType": "reactionId",
        "value": "volatile",
        "processId": "raw",
        "quantity": 1,
        "note": "煙を広げる"
      },
      {
        "checkType": "itemId",
        "value": "item_068",
        "processId": "raw",
        "quantity": 1,
        "note": "燃焼の土台"
      }
    ]
  },
  {
    "result": "防寒の膏薬",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "insulation",
        "processId": "dissolve",
        "quantity": 1,
        "note": "【T2】防護素材"
      },
      {
        "checkType": "itemId",
        "value": "item_077",
        "processId": "raw",
        "quantity": 1,
        "note": "基材"
      },
      {
        "checkType": "itemId",
        "value": "item_084",
        "processId": "raw",
        "quantity": 1,
        "note": "流れ落ちないように"
      }
    ]
  },
  {
    "result": "虫下し",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "poison",
        "processId": "grind",
        "quantity": 1,
        "note": "【T2】毒で虫を殺す"
      },
      {
        "checkType": "effectId",
        "value": "detox",
        "processId": "boil",
        "quantity": 1,
        "note": "人体への害を抑える"
      },
      {
        "checkType": "itemId",
        "value": "item_076",
        "processId": "raw",
        "quantity": 1,
        "note": "腸まで届かせる"
      }
    ]
  },
  {
    "result": "洗い粉",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_076",
        "processId": "boil",
        "quantity": 1,
        "note": "【T2】いわゆる石鹸"
      },
      {
        "checkType": "itemId",
        "value": "item_077",
        "processId": "dissolve",
        "quantity": 1,
        "note": "脂と灰汁を反応させる"
      },
      {
        "checkType": "itemId",
        "value": "item_072",
        "processId": "raw",
        "quantity": 1,
        "note": "塩析して固める"
      }
    ]
  },
  {
    "result": "目薬",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_060",
        "processId": "raw",
        "quantity": 1,
        "note": "【T2】不純物は厳禁"
      },
      {
        "checkType": "effectId",
        "value": "healing",
        "processId": "distill",
        "quantity": 1,
        "note": "治癒成分だけを取り出す"
      },
      {
        "checkType": "itemId",
        "value": "item_072",
        "processId": "raw",
        "quantity": 1,
        "note": "涙と同じ濃さに"
      }
    ]
  },
  {
    "result": "気付け薬",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "reactionId",
        "value": "volatile",
        "processId": "distill",
        "quantity": 1,
        "note": "【T2】揮発成分を取り出す"
      },
      {
        "checkType": "itemId",
        "value": "item_087",
        "processId": "raw",
        "quantity": 1,
        "note": "覚醒作用"
      },
      {
        "checkType": "itemId",
        "value": "item_083",
        "processId": "raw",
        "quantity": 1,
        "note": "刺激臭の担体"
      }
    ]
  },
  {
    "result": "携行糧",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "tonic",
        "processId": "dry",
        "quantity": 1,
        "note": "【T2】滋養素材を干す"
      },
      {
        "checkType": "itemId",
        "value": "item_065",
        "processId": "raw",
        "quantity": 1,
        "note": "日持ちさせる"
      },
      {
        "checkType": "itemId",
        "value": "item_072",
        "processId": "raw",
        "quantity": 1,
        "note": "塩気で保存性を上げる"
      }
    ]
  },
  {
    "result": "上級傷薬",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "healing",
        "processId": "boil",
        "quantity": 1,
        "note": "【T3】"
      },
      {
        "checkType": "itemId",
        "value": "item_078",
        "processId": "raw",
        "quantity": 1,
        "note": "形状保持"
      },
      {
        "checkType": "itemId",
        "value": "item_060",
        "processId": "raw",
        "quantity": 1,
        "note": "雑味を排した溶媒"
      },
      {
        "checkType": "itemId",
        "value": "item_066",
        "processId": "raw",
        "quantity": 1,
        "note": "薬効を引き上げる"
      }
    ]
  },
  {
    "result": "万能解毒丸",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_080",
        "processId": "raw",
        "quantity": 1,
        "note": "【T3】"
      },
      {
        "checkType": "reactionId",
        "value": "neutralize",
        "processId": "grind",
        "quantity": 1,
        "note": "中和素材を粉に"
      },
      {
        "checkType": "itemId",
        "value": "item_062",
        "processId": "raw",
        "quantity": 1,
        "note": "丸薬に"
      },
      {
        "checkType": "itemId",
        "value": "item_070",
        "processId": "raw",
        "quantity": 1,
        "note": "賦形剤"
      }
    ]
  },
  {
    "result": "深眠薬",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_086",
        "processId": "raw",
        "quantity": 1,
        "note": "【T3】"
      },
      {
        "checkType": "reactionId",
        "value": "volatile",
        "processId": "dry",
        "quantity": 1,
        "note": "香として立たせる"
      },
      {
        "checkType": "itemId",
        "value": "item_079",
        "processId": "raw",
        "quantity": 1,
        "note": "香りの担体"
      },
      {
        "checkType": "itemId",
        "value": "item_085",
        "processId": "raw",
        "quantity": 1,
        "note": "刺激を和らげる"
      }
    ]
  },
  {
    "result": "戦士の血止め",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "healing",
        "processId": "dry",
        "quantity": 1,
        "note": "【T3】"
      },
      {
        "checkType": "effectId",
        "value": "stable",
        "processId": "dissolve",
        "quantity": 1,
        "note": "成分を固定する"
      },
      {
        "checkType": "itemId",
        "value": "item_078",
        "processId": "raw",
        "quantity": 1,
        "note": "傷口を塞ぐ"
      },
      {
        "checkType": "itemId",
        "value": "item_083",
        "processId": "raw",
        "quantity": 1,
        "note": "消毒を兼ねる"
      }
    ]
  },
  {
    "result": "猛毒の塗り薬",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_081",
        "processId": "raw",
        "quantity": 1,
        "note": "【T3】"
      },
      {
        "checkType": "reactionId",
        "value": "coagulate",
        "processId": "raw",
        "quantity": 1,
        "note": "刃に留まらせる"
      },
      {
        "checkType": "itemId",
        "value": "item_084",
        "processId": "raw",
        "quantity": 1,
        "note": "流れ落ち防止"
      },
      {
        "checkType": "itemId",
        "value": "item_071",
        "processId": "raw",
        "quantity": 1,
        "note": "臭いを消す"
      }
    ]
  },
  {
    "result": "耐火の護り薬",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "insulation",
        "processId": "dissolve",
        "quantity": 1,
        "note": "【T3】"
      },
      {
        "checkType": "itemId",
        "value": "item_073",
        "processId": "raw",
        "quantity": 1,
        "note": "火に対する耐性"
      },
      {
        "checkType": "itemId",
        "value": "item_084",
        "processId": "raw",
        "quantity": 1,
        "note": "皮膜を作る"
      },
      {
        "checkType": "itemId",
        "value": "item_069",
        "processId": "raw",
        "quantity": 1,
        "note": "熱を散らす"
      }
    ]
  },
  {
    "result": "治癒の秘薬",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "healing",
        "processId": "distill",
        "quantity": 1,
        "note": "【T3】治癒成分のみ抽出"
      },
      {
        "checkType": "itemId",
        "value": "item_061",
        "processId": "raw",
        "quantity": 1,
        "note": "最上の溶媒"
      },
      {
        "checkType": "itemId",
        "value": "item_066",
        "processId": "raw",
        "quantity": 1,
        "note": "反応を完成させる"
      },
      {
        "checkType": "itemId",
        "value": "item_070",
        "processId": "raw",
        "quantity": 1,
        "note": "効き目を底上げ"
      }
    ]
  },
  {
    "result": "霊視の眼薬",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "mystic",
        "processId": "distill",
        "quantity": 1,
        "note": "【T3】"
      },
      {
        "checkType": "itemId",
        "value": "item_060",
        "processId": "raw",
        "quantity": 1,
        "note": "眼に触れるため純度が要る"
      },
      {
        "checkType": "itemId",
        "value": "item_082",
        "processId": "raw",
        "quantity": 1,
        "note": "魔力を通す"
      },
      {
        "checkType": "itemId",
        "value": "item_072",
        "processId": "raw",
        "quantity": 1,
        "note": "涙と同じ濃さに"
      }
    ]
  },
  {
    "result": "疾風の丸薬",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_003",
        "processId": "grind",
        "quantity": 1,
        "note": "【T3】ニガハシリダケ限定"
      },
      {
        "checkType": "itemId",
        "value": "item_087",
        "processId": "raw",
        "quantity": 1,
        "note": "覚醒作用"
      },
      {
        "checkType": "itemId",
        "value": "item_062",
        "processId": "raw",
        "quantity": 1,
        "note": "丸薬に"
      },
      {
        "checkType": "reactionId",
        "value": "volatile",
        "processId": "raw",
        "quantity": 1,
        "note": "即効性"
      }
    ]
  },
  {
    "result": "鉄壁の丸薬",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "stable",
        "processId": "grind",
        "quantity": 1,
        "note": "【T3】"
      },
      {
        "checkType": "itemId",
        "value": "item_074",
        "processId": "raw",
        "quantity": 1,
        "note": "重さと硬さ"
      },
      {
        "checkType": "itemId",
        "value": "item_062",
        "processId": "raw",
        "quantity": 1,
        "note": "丸薬に"
      },
      {
        "checkType": "itemId",
        "value": "item_078",
        "processId": "raw",
        "quantity": 1,
        "note": "崩れ防止"
      }
    ]
  },
  {
    "result": "魔女レウィシアの秘薬",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_061",
        "processId": "raw",
        "quantity": 1,
        "note": "★T4 伝説。全てを受け入れる器"
      },
      {
        "checkType": "effectId",
        "value": "mystic",
        "processId": "dissolve",
        "quantity": 1,
        "note": "神秘を溶かし込む"
      },
      {
        "checkType": "itemId",
        "value": "item_066",
        "processId": "raw",
        "quantity": 1,
        "note": "反応の要"
      },
      {
        "checkType": "itemId",
        "value": "item_082",
        "processId": "raw",
        "quantity": 1,
        "note": "魔力の通り道"
      },
      {
        "checkType": "effectId",
        "value": "healing",
        "processId": "distill",
        "quantity": 1,
        "note": "治癒の核"
      }
    ]
  },
  {
    "result": "錬金王オルドリンの黄金水",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_061",
        "processId": "raw",
        "quantity": 1,
        "note": "★T4 伝説。金を生むと謳われた水"
      },
      {
        "checkType": "itemId",
        "value": "item_074",
        "processId": "dissolve",
        "quantity": 1,
        "note": "卑金属を溶かす"
      },
      {
        "checkType": "itemId",
        "value": "item_073",
        "processId": "raw",
        "quantity": 1,
        "note": "変性の媒介"
      },
      {
        "checkType": "itemId",
        "value": "item_066",
        "processId": "raw",
        "quantity": 1,
        "note": "変成を促す"
      },
      {
        "checkType": "effectId",
        "value": "stable",
        "processId": "raw",
        "quantity": 1,
        "note": "変化を固定する"
      }
    ]
  },
  {
    "result": "死神ヴェルナの一滴",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_081",
        "processId": "raw",
        "quantity": 1,
        "note": "★T4 伝説。一滴で足りるという"
      },
      {
        "checkType": "effectId",
        "value": "poison",
        "processId": "distill",
        "quantity": 1,
        "note": "毒性のみを抽出"
      },
      {
        "checkType": "itemId",
        "value": "item_071",
        "processId": "raw",
        "quantity": 1,
        "note": "臭いと色を消す"
      },
      {
        "checkType": "itemId",
        "value": "item_060",
        "processId": "raw",
        "quantity": 1,
        "note": "水と見分けがつかなくなる"
      },
      {
        "checkType": "reactionId",
        "value": "catalyst",
        "processId": "raw",
        "quantity": 1,
        "note": "即効性を与える"
      }
    ]
  },
  {
    "result": "聖女アルテアの祝福水",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_061",
        "processId": "raw",
        "quantity": 1,
        "note": "★T4 伝説。傷も病も退けたという"
      },
      {
        "checkType": "effectId",
        "value": "healing",
        "processId": "distill",
        "quantity": 1,
        "note": "治癒の核"
      },
      {
        "checkType": "itemId",
        "value": "item_082",
        "processId": "raw",
        "quantity": 1,
        "note": "神秘を宿す"
      },
      {
        "checkType": "effectId",
        "value": "mystic",
        "processId": "raw",
        "quantity": 1,
        "note": "祝福の源"
      },
      {
        "checkType": "itemId",
        "value": "item_072",
        "processId": "raw",
        "quantity": 1,
        "note": "清めの塩"
      }
    ]
  },
  {
    "result": "隠者ガラハの不老酒",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_083",
        "processId": "raw",
        "quantity": 1,
        "note": "★T4 伝説。百年寝かせたと称される"
      },
      {
        "checkType": "effectId",
        "value": "tonic",
        "processId": "ferment",
        "quantity": 1,
        "note": "滋養を発酵で引き出す"
      },
      {
        "checkType": "itemId",
        "value": "item_064",
        "processId": "raw",
        "quantity": 1,
        "note": "熟成を早める"
      },
      {
        "checkType": "itemId",
        "value": "item_082",
        "processId": "raw",
        "quantity": 1,
        "note": "時を留める"
      },
      {
        "checkType": "itemId",
        "value": "item_066",
        "processId": "raw",
        "quantity": 1,
        "note": "反応を完成させる"
      }
    ]
  },
  {
    "result": "竜殺しレギンの塗油",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_084",
        "processId": "raw",
        "quantity": 1,
        "note": "★T4 伝説。鱗をも侵すという"
      },
      {
        "checkType": "itemId",
        "value": "item_081",
        "processId": "raw",
        "quantity": 1,
        "note": "毒の本体"
      },
      {
        "checkType": "effectId",
        "value": "stable",
        "processId": "dissolve",
        "quantity": 1,
        "note": "刃を傷めない"
      },
      {
        "checkType": "itemId",
        "value": "item_071",
        "processId": "raw",
        "quantity": 1,
        "note": "気配を消す"
      },
      {
        "checkType": "itemId",
        "value": "item_066",
        "processId": "raw",
        "quantity": 1,
        "note": "浸透を速める"
      }
    ]
  },
  {
    "result": "星詠みイオラの夢見香",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_086",
        "processId": "raw",
        "quantity": 1,
        "note": "★T4 伝説。見た夢が当たるという"
      },
      {
        "checkType": "effectId",
        "value": "mystic",
        "processId": "dry",
        "quantity": 1,
        "note": "神秘を香に移す"
      },
      {
        "checkType": "itemId",
        "value": "item_079",
        "processId": "raw",
        "quantity": 1,
        "note": "香りの担体"
      },
      {
        "checkType": "reactionId",
        "value": "volatile",
        "processId": "raw",
        "quantity": 1,
        "note": "煙として立ち上る"
      },
      {
        "checkType": "itemId",
        "value": "item_082",
        "processId": "raw",
        "quantity": 1,
        "note": "幻視を導く"
      }
    ]
  },
  {
    "result": "万物医アシュレイの万能薬",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_061",
        "processId": "raw",
        "quantity": 1,
        "note": "★T4 伝説。あらゆる症状に効くとされる"
      },
      {
        "checkType": "itemId",
        "value": "item_080",
        "processId": "raw",
        "quantity": 1,
        "note": "毒を退ける"
      },
      {
        "checkType": "effectId",
        "value": "healing",
        "processId": "distill",
        "quantity": 1,
        "note": "傷を癒す"
      },
      {
        "checkType": "itemId",
        "value": "item_082",
        "processId": "raw",
        "quantity": 1,
        "note": "魔力性の病に対応"
      },
      {
        "checkType": "itemId",
        "value": "item_066",
        "processId": "raw",
        "quantity": 1,
        "note": "全ての反応を束ねる"
      }
    ]
  },
  {
    "result": "城塞守りバルドの不壊薬",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "insulation",
        "processId": "dissolve",
        "quantity": 1,
        "note": "★人名T3。防護素材を溶かす"
      },
      {
        "checkType": "itemId",
        "value": "item_074",
        "processId": "raw",
        "quantity": 1,
        "note": "硬さと重さを与える"
      },
      {
        "checkType": "itemId",
        "value": "item_084",
        "processId": "raw",
        "quantity": 1,
        "note": "皮膜を張る"
      },
      {
        "checkType": "itemId",
        "value": "item_066",
        "processId": "raw",
        "quantity": 1,
        "note": "定着を促す"
      }
    ]
  },
  {
    "result": "鍛冶師ドヴェルの焼き入れ水",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_059",
        "processId": "raw",
        "quantity": 1,
        "note": "★人名T3。刃を鍛えるための水"
      },
      {
        "checkType": "itemId",
        "value": "item_074",
        "processId": "dissolve",
        "quantity": 1,
        "note": "鉄を馴染ませる"
      },
      {
        "checkType": "effectId",
        "value": "stable",
        "processId": "raw",
        "quantity": 1,
        "note": "組織を安定させる"
      },
      {
        "checkType": "itemId",
        "value": "item_067",
        "processId": "raw",
        "quantity": 1,
        "note": "一気に冷やして硬さを固定"
      }
    ]
  },
  {
    "result": "染料液",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "categoryId",
        "value": "flora",
        "processId": "boil",
        "quantity": 1,
        "note": "【中級】色の濃い植物を煮出す"
      },
      {
        "checkType": "itemId",
        "value": "item_076",
        "processId": "raw",
        "quantity": 1,
        "note": "灰汁で色を定着させる"
      }
    ]
  },
  {
    "result": "墨汁",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_071",
        "processId": "grind",
        "quantity": 1,
        "note": "【中級】黒の顔料"
      },
      {
        "checkType": "itemId",
        "value": "item_078",
        "processId": "raw",
        "quantity": 1,
        "note": "紙に定着させる"
      }
    ]
  },
  {
    "result": "灯火油",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_077",
        "processId": "boil",
        "quantity": 1,
        "note": "【中級】"
      },
      {
        "checkType": "itemId",
        "value": "item_068",
        "processId": "raw",
        "quantity": 1,
        "note": "不純物を吸わせ煤を減らす"
      }
    ]
  },
  {
    "result": "煙玉",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_073",
        "processId": "burn",
        "quantity": 1,
        "note": "【中級】"
      },
      {
        "checkType": "reactionId",
        "value": "coagulate",
        "processId": "raw",
        "quantity": 1,
        "note": "玉に固める"
      },
      {
        "checkType": "itemId",
        "value": "item_068",
        "processId": "raw",
        "quantity": 1,
        "note": "燃焼の土台"
      }
    ]
  },
  {
    "result": "目つぶし粉",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "stimulation",
        "processId": "grind",
        "quantity": 1,
        "note": "【中級】刺激の強い素材を粉に"
      },
      {
        "checkType": "itemId",
        "value": "item_069",
        "processId": "raw",
        "quantity": 1,
        "note": "かさを増して撒きやすく"
      }
    ]
  },
  {
    "result": "粘着剤",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "reactionId",
        "value": "coagulate",
        "processId": "boil",
        "quantity": 1,
        "note": "【中級】"
      },
      {
        "checkType": "itemId",
        "value": "item_078",
        "processId": "raw",
        "quantity": 1,
        "note": "粘りを強める"
      }
    ]
  },
  {
    "result": "防水油",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_084",
        "processId": "raw",
        "quantity": 1,
        "note": "【中級】"
      },
      {
        "checkType": "reactionId",
        "value": "preserve",
        "processId": "dissolve",
        "quantity": 1,
        "note": "保存特性で水を弾く膜に"
      }
    ]
  },
  {
    "result": "研磨粉",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_007",
        "processId": "grind",
        "quantity": 1,
        "note": "【中級】ウロコモドキの硬い傘"
      },
      {
        "checkType": "itemId",
        "value": "item_069",
        "processId": "raw",
        "quantity": 1,
        "note": "粒度を整える"
      }
    ]
  },
  {
    "result": "うがい薬",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "detox",
        "processId": "boil",
        "quantity": 1,
        "note": "【中級】"
      },
      {
        "checkType": "itemId",
        "value": "item_072",
        "processId": "raw",
        "quantity": 1,
        "note": "塩気で喉を守る"
      },
      {
        "checkType": "itemId",
        "value": "item_059",
        "processId": "raw",
        "quantity": 1,
        "note": "薄めて使う"
      }
    ]
  },
  {
    "result": "冷湿布",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_067",
        "processId": "raw",
        "quantity": 1,
        "note": "【中級】"
      },
      {
        "checkType": "effectId",
        "value": "healing",
        "processId": "grind",
        "quantity": 1,
        "note": "患部に効かせる"
      },
      {
        "checkType": "itemId",
        "value": "item_078",
        "processId": "raw",
        "quantity": 1,
        "note": "布に貼り付ける"
      }
    ]
  },
  {
    "result": "咳止めの煎じ薬",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "sedation",
        "processId": "boil",
        "quantity": 1,
        "note": "【中級】咳を鎮める"
      },
      {
        "checkType": "itemId",
        "value": "item_063",
        "processId": "raw",
        "quantity": 1,
        "note": "喉の奥まで届かせる"
      },
      {
        "checkType": "itemId",
        "value": "item_070",
        "processId": "raw",
        "quantity": 1,
        "note": "粘膜を保護する"
      }
    ]
  },
  {
    "result": "発汗薬",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "stimulation",
        "processId": "boil",
        "quantity": 1,
        "note": "【中級】"
      },
      {
        "checkType": "itemId",
        "value": "item_063",
        "processId": "raw",
        "quantity": 1,
        "note": "全身に回して汗を出させる"
      }
    ]
  },
  {
    "result": "虫刺されの塗り薬",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "detox",
        "processId": "grind",
        "quantity": 1,
        "note": "【中級】毒を抜く"
      },
      {
        "checkType": "itemId",
        "value": "item_077",
        "processId": "raw",
        "quantity": 1,
        "note": "塗り薬の基材"
      },
      {
        "checkType": "itemId",
        "value": "item_067",
        "processId": "raw",
        "quantity": 1,
        "note": "痒みを冷やす"
      }
    ]
  },
  {
    "result": "傷口洗浄液",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_083",
        "processId": "raw",
        "quantity": 1,
        "note": "【中級】"
      },
      {
        "checkType": "categoryId",
        "value": "liquid",
        "processId": "distill",
        "quantity": 1,
        "note": "不純物のない水で薄める"
      }
    ]
  },
  {
    "result": "歯磨き粉",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_069",
        "processId": "raw",
        "quantity": 1,
        "note": "【中級】研磨材"
      },
      {
        "checkType": "itemId",
        "value": "item_072",
        "processId": "raw",
        "quantity": 1,
        "note": "歯茎を引き締める"
      },
      {
        "checkType": "itemId",
        "value": "item_070",
        "processId": "raw",
        "quantity": 1,
        "note": "口中を清める"
      }
    ]
  },
  {
    "result": "消臭袋",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_071",
        "processId": "raw",
        "quantity": 1,
        "note": "【中級】臭いを吸う"
      },
      {
        "checkType": "reactionId",
        "value": "preserve",
        "processId": "dry",
        "quantity": 1,
        "note": "乾かして袋に詰める"
      }
    ]
  },
  {
    "result": "干し肉",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "categoryId",
        "value": "creature",
        "processId": "dry",
        "quantity": 1,
        "note": "【中級】"
      },
      {
        "checkType": "itemId",
        "value": "item_072",
        "processId": "raw",
        "quantity": 1,
        "note": "塩を擦り込む"
      },
      {
        "checkType": "itemId",
        "value": "item_065",
        "processId": "raw",
        "quantity": 1,
        "note": "日持ちを延ばす"
      }
    ]
  },
  {
    "result": "種子の防腐剤",
    "vessel": "item_175",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_065",
        "processId": "raw",
        "quantity": 1,
        "note": "【中級】"
      },
      {
        "checkType": "reactionId",
        "value": "separate",
        "processId": "dissolve",
        "quantity": 1,
        "note": "カビの元を分離させる"
      }
    ]
  },
  {
    "result": "撒き餌",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "categoryId",
        "value": "creature",
        "processId": "ferment",
        "quantity": 1,
        "note": "【中級】獣を寄せる匂い"
      },
      {
        "checkType": "itemId",
        "value": "item_075",
        "processId": "raw",
        "quantity": 1,
        "note": "発酵を進める"
      },
      {
        "checkType": "itemId",
        "value": "item_072",
        "processId": "raw",
        "quantity": 1,
        "note": "傷まないようにする"
      }
    ]
  },
  {
    "result": "保冷剤",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_067",
        "processId": "raw",
        "quantity": 1,
        "note": "【中級】"
      },
      {
        "checkType": "reactionId",
        "value": "preserve",
        "processId": "freeze",
        "quantity": 1,
        "note": "冷気を閉じ込める"
      }
    ]
  },
  {
    "result": "硫黄の気",
    "vessel": "item_088",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_073",
        "processId": "distill",
        "quantity": 1,
        "note": "硫黄華を気化させる"
      }
    ]
  },
  {
    "result": "眠りの気",
    "vessel": "item_088",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "sedation",
        "processId": "distill",
        "quantity": 1,
        "note": "鎮静成分を気化させる"
      },
      {
        "checkType": "reactionId",
        "value": "volatile",
        "processId": "raw",
        "quantity": 1,
        "note": "揮発を助ける"
      }
    ]
  },
  {
    "result": "灯りの気",
    "vessel": "item_088",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "mystic",
        "processId": "distill",
        "quantity": 1,
        "note": "神秘の光を気体に移す"
      },
      {
        "checkType": "reactionId",
        "value": "volatile",
        "processId": "raw",
        "quantity": 1,
        "note": "揮発を助ける"
      }
    ]
  },
  {
    "result": "毒の気",
    "vessel": "item_088",
    "ingredients": [
      {
        "checkType": "effectId",
        "value": "poison",
        "processId": "distill",
        "quantity": 1,
        "note": "毒成分を気化させる"
      },
      {
        "checkType": "itemId",
        "value": "item_066",
        "processId": "raw",
        "quantity": 1,
        "note": "気化を促す"
      }
    ]
  },
  {
    "result": "清めの気",
    "vessel": "item_088",
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_083",
        "processId": "distill",
        "quantity": 1,
        "note": "酒精を飛ばす"
      },
      {
        "checkType": "effectId",
        "value": "detox",
        "processId": "raw",
        "quantity": 1,
        "note": "解毒成分を含ませる"
      }
    ]
  },
  {
    "result": "弁柄",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_089",
        "processId": "grind",
        "quantity": 1,
        "note": "【遺物】錆びた釘の赤錆を挽く"
      },
      {
        "checkType": "itemId",
        "value": "item_076",
        "processId": "raw",
        "quantity": 1,
        "note": "灰汁で発色を安定させる"
      }
    ]
  },
  {
    "result": "緑青の顔料",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_090",
        "processId": "raw",
        "quantity": 1,
        "note": "【遺物】古銭に浮いた緑青"
      },
      {
        "checkType": "itemId",
        "value": "item_083",
        "processId": "dissolve",
        "quantity": 1,
        "note": "酒精で緑青を溶き出す"
      }
    ]
  },
  {
    "result": "鉛白",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_092",
        "processId": "grind",
        "quantity": 1,
        "note": "【遺物】鉛の錘を削る。扱いに注意"
      },
      {
        "checkType": "itemId",
        "value": "item_083",
        "processId": "raw",
        "quantity": 1,
        "note": "酸で白く変質させる"
      }
    ]
  },
  {
    "result": "乾燥剤",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_091",
        "processId": "burn",
        "quantity": 1,
        "note": "【遺物】素焼きの陶片を焼き締める"
      },
      {
        "checkType": "itemId",
        "value": "item_072",
        "processId": "raw",
        "quantity": 1,
        "note": "吸湿力を高める"
      }
    ]
  },
  {
    "result": "導きの銅線",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_094",
        "processId": "raw",
        "quantity": 1,
        "note": "【遺物】熱と力をよく通す銅"
      },
      {
        "checkType": "itemId",
        "value": "item_082",
        "processId": "dissolve",
        "quantity": 1,
        "note": "魔力を通す道に変える"
      },
      {
        "checkType": "itemId",
        "value": "item_061",
        "processId": "raw",
        "quantity": 1,
        "note": "不純物を排して伝導を保つ"
      }
    ]
  },
  {
    "result": "遠見の鏡",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_093",
        "processId": "raw",
        "quantity": 1,
        "note": "【遺物】鏡の破片"
      },
      {
        "checkType": "itemId",
        "value": "item_082",
        "processId": "dissolve",
        "quantity": 1,
        "note": "裏に銀を敷く"
      },
      {
        "checkType": "itemId",
        "value": "item_060",
        "processId": "raw",
        "quantity": 1,
        "note": "曇りを落とす"
      }
    ]
  },
  {
    "result": "追想の香",
    "vessel": null,
    "ingredients": [
      {
        "checkType": "itemId",
        "value": "item_095",
        "processId": "burn",
        "quantity": 1,
        "note": "【遺物】香炉に染みた香を呼び戻す"
      },
      {
        "checkType": "itemId",
        "value": "item_079",
        "processId": "raw",
        "quantity": 1,
        "note": "香りの担体"
      },
      {
        "checkType": "itemId",
        "value": "item_068",
        "processId": "raw",
        "quantity": 1,
        "note": "燃焼の土台"
      }
    ]
  }
];
