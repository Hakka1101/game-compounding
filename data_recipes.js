const recipes = [
    {
        result: "加速の秘薬",
        ingredients: [
            {
                checkType: "itemId",
                value: "item_003",   // ニガハシリダケ限定
                processId: "grind"
            },
            {
                checkType: "categoryId",
                value: "liquid",    // 水カテゴリなら代用可
                processId: "boil"
            }
        ]
    },
    {
        result: "汎用毒消し",
        ingredients: [
            {
                checkType: "reactionId",
                value: "neutralize", // 中和特性を持つ素材なら何でもOK
                processId: "boil"
            }
        ]
    }
];
