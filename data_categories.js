/**
 * 調合システム：カテゴリー定義データ
 * フィールドでの採取場所のヒントや、レシピ判定のグループ分けに使用します。
 */
const dataCategories = [
  {
    id: "flora",
    name: "植物",
     icon: "🌿",
    description: "葉、花、茎など。自然界に広く存在する調合の基本素材。"
  },
  {
    id: "fungi",
    name: "菌類（キノコ）",
    icon: "🍄",
    description: "キノコやカビ。特定の条件下で成長し、特殊な変化をもたらす。"
  },
  {
    id: "liquid",
    name: "水質",
    icon: "🧪",
    description: "湧き水や朝露。素材を溶かし込むためのベースとなる液体。"
  },
  {
    id: "mineral",
    name: "鉱物",
    icon: "🪨",
    description: "石、塩、泥など。無機物特有の性質を持つ素材。"
  },
  {
    id: "creature",
    name: "動物性",
    icon: "🪶",
    description: "羽根や抜け殻、牙など。生物の活動の痕跡として手に入る素材。"
  },
  {
    id: "relics",
    name: "遺物",
    icon: "🏺",
    description: "釘やコイン、ガラス瓶などの人工物。ガラス瓶は液体や気体の保存に使用する。"
  },
  {
    id: "processed",
    name: "加工品",
    icon: "🫙",
    description: "調合の中間素材や、工程の結果として生じた気体などの二次的な素材。"
  }
];

// export default dataCategories;