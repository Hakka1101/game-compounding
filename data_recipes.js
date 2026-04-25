// data_recipes.js の判定条件イメージ
const recipes = [
    {
        result: "加速の秘薬",
        ingredients: [
            {
                // 条件1：特定のアイテムIDを指定（厳格）
                checkType: "itemId",
                value: "item_003", // ニガハシリダケ限定
                processId: "grind" // すりつぶす
            },
            {
                // 条件2：カテゴリで指定（ゆるい代用が可能）
                checkType: "categoryId",
                value: "liquid",    // 水カテゴリなら「湧き水」でも「川の水」でもOK
                processId: "boil"  // 煮る
            }
        ]
    },
    {
        result: "汎用毒消し",
        ingredients: [
            {
                // 条件3：属性（味）で指定
                checkType: "flavorId",
                value: "bitter", // 「苦い」素材なら何でもOK
                processId: "boil"
            }
        ]
    }
];