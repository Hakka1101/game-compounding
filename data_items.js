const ITEM_DATA = [
    {
        id: "item_001",
        name: "ニガタケ",
        categoryId: "fungi",
        traits: {
            elementId:   "element_fire",
            reactionId:  "neutralize",  // 反応特性：中和（苦み→解毒）
            effectId:    "stable"
        },
        description: "非常に苦いキノコ。熱を通すと成分が安定する性質がある。"
    },
    {
        id: "item_002",
        name: "ハシリタケ",
        categoryId: "fungi",
        traits: {
            elementId:   "element_earth",
            reactionId:  "volatile",    // 反応特性：揮発（揮発性が高い）
            effectId:    "speed"
        },
        description: "食べると足が速くなる気がするキノコ。揮発性が高い。"
    },
    {
        id: "item_003",
        name: "ニガハシリダケ",
        categoryId: "fungi",
        traits: {
            elementId:   "element_wind",
            reactionId:  "catalyst",    // 反応特性：触媒（交雑種→強力な薬の材料）
            effectId:    "stimulation"
        },
        description: "ニガタケとハシリタケの交雑種。強力な薬の材料になる。"
    }
];
