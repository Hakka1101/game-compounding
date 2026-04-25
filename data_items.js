const ITEM_DATA = [
    {
        id: "item_001",
        name: "ニガタケ",
        categoryId: "fungi",
        // 各要素をID化。これらは data_tags.js 等で定義されるイメージ
        traits: {
            elementId: "element_fire",  // 属性：火
            flavorId:  "bitter", // 味：苦い
            effectId:  "stable"  // 効果：安定
        },
        description: "非常に苦いキノコ。熱を通すと成分が安定する性質がある。"
    },
    {
        id: "item_002",
        name: "ハシリタケ",
        categoryId: "fungi",
        traits: {
            elementId: "element_earth",  // 属性：土
            flavorId:  "umami",   
            effectId:  "speed"    // 効果：加速
        },
        description: "食べると足が速くなる気がするキノコ。揮発性が高い。"
    },
    {
        id: "item_003",
        name: "ニガハシリダケ",
        categoryId: "fungi",
        traits: {
            elementId: "element_wind",   // 属性：風（交雑による変化の例）
            flavorId:  "bitter",  // 味：苦い
            effectId:  "stimulation"    // 効果：加速
        },
        description: "ニガタケとハシリタケの交雑種。強力な薬の材料になる。"
    }
];