/**
 * 効果（薬効・魔法特性）の定義データ
 * 各アイテムの traits.effectId と紐付けられます。
 */
const data_effects = {
    // --- 【基本薬効系】 ---
    "healing": {
        effectId: "healing",
        name: "治癒",
        icon: "🩹",
        description: "傷口を塞ぎ、体力を回復させる最も基本的な薬効。"
    },
    "detox": {
        effectId: "detox",
        name: "解毒",
        icon: "🧪",
        description: "体内の毒素を中和し、正常な状態へ戻す。"
    },
    "tonic": {
        effectId: "tonic",
        name: "滋養強壮",
        icon: "🍗",
        description: "肉体の疲れを取り、活力を引き出す。持久力が増す。"
    },

    // --- 【精神・神経系】 ---
    "stimulation": {
        effectId: "stimulation",
        name: "興奮",
        icon: "⚡",
        description: "神経を昂らせ、集中力や反応速度を一時的に引き上げる。"
    },
    "sedation": {
        effectId: "sedation",
        name: "鎮静",
        icon: "💤",
        description: "昂った精神を落ち着かせる。睡眠薬や精神安定のベース。"
    },

    // --- 【アイテム固有効果】 ---
    "stable": {
        effectId: "stable",
        name: "安定",
        icon: "⚪",
        description: "成分を安定させる効果。熱を通すことで発現しやすい。"
    },
    "speed": {
        effectId: "speed",
        name: "加速",
        icon: "💨",
        description: "移動速度や反応速度を高める効果。揮発性の高い素材に多い。"
    },
    // --- 【魔法・特殊系（魔法スパイス）】 ---
    "levitation": {
        effectId: "levitation",
        name: "浮遊",
        icon: "🎈",
        description: "重力の影響を中和する。特定の素材と強風属性を合わせると発現する。"
    },
    "mystic": {
        effectId: "mystic",
        name: "神秘",
        icon: "☄️",
        description: "魔力回路を一時的に拡張する、あるいは不可視の霊体を知覚する。"
    },
    "insulation": {
        effectId: "insulation",
        name: "防護",
        icon: "🛡️",
        description: "皮膚を硬質化、あるいは膜を張り、属性ダメージを軽減する。"
    },

    // --- 【有害・未分類】 ---
    "poison": {
        effectId: "poison",
        name: "猛毒",
        icon: "💀",
        description: "生命活動を停止させる有害成分。"
    },
    "none": {
        effectId: "none",
        name: "なし",
        icon: "⚪",
        description: "特筆すべき薬効を持たない。"
    }
};