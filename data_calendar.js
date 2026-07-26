// 暦・月齢
// tools/convert.py により game_data_v25.xlsx から自動生成。直接編集しないこと。
const CALENDAR_DATA = {
  "settings": {
    "daysPerWeek": 5,
    "weeksPerMonth": 4,
    "monthsPerYear": 8,
    "fullMoonDay": 10,
    "newMoonDay": 20,
    "deadlineDays": 160,
    "turnsPerDay": 10,
    "maxMapsPerDay": 3,
    "travelCost": 1
  },
  "months": [
    {
      "no": 1,
      "name": "芽月",
      "season": "春",
      "note": "雪が解け、地面から最初の芽が出る月。"
    },
    {
      "no": 2,
      "name": "花月",
      "season": "春",
      "note": "草花が一斉に咲く月。採取に最も適する。"
    },
    {
      "no": 3,
      "name": "青月",
      "season": "夏",
      "note": "葉が濃くなり、虫が増える月。"
    },
    {
      "no": 4,
      "name": "炎月",
      "season": "夏",
      "note": "日差しが強く、水場が痩せる月。"
    },
    {
      "no": 5,
      "name": "実月",
      "season": "秋",
      "note": "実がなり、菌類が最も多く出る月。"
    },
    {
      "no": 6,
      "name": "錦月",
      "season": "秋",
      "note": "葉が色づき、霧の朝が増える月。"
    },
    {
      "no": 7,
      "name": "霜月",
      "season": "冬",
      "note": "霜が降り、地表の素材が減る月。"
    },
    {
      "no": 8,
      "name": "眠月",
      "season": "冬",
      "note": "雪に閉ざされ、多くが眠る月。"
    }
  ],
  "weekdays": [
    {
      "no": 1,
      "name": "一の日"
    },
    {
      "no": 2,
      "name": "二の日"
    },
    {
      "no": 3,
      "name": "三の日"
    },
    {
      "no": 4,
      "name": "四の日"
    },
    {
      "no": 5,
      "name": "五の日"
    }
  ],
  "moon": [
    {
      "day": 1,
      "name": "朔明け",
      "condition": null
    },
    {
      "day": 2,
      "name": "繊月",
      "condition": null
    },
    {
      "day": 3,
      "name": "三日月",
      "condition": null
    },
    {
      "day": 4,
      "name": "若月",
      "condition": null
    },
    {
      "day": 5,
      "name": "上弦",
      "condition": null
    },
    {
      "day": 6,
      "name": "満ちる月",
      "condition": null
    },
    {
      "day": 7,
      "name": "満ちる月",
      "condition": null
    },
    {
      "day": 8,
      "name": "宵待月",
      "condition": null
    },
    {
      "day": 9,
      "name": "小望月",
      "condition": null
    },
    {
      "day": 10,
      "name": "満月",
      "condition": "満月"
    },
    {
      "day": 11,
      "name": "十六夜",
      "condition": null
    },
    {
      "day": 12,
      "name": "立待月",
      "condition": null
    },
    {
      "day": 13,
      "name": "居待月",
      "condition": null
    },
    {
      "day": 14,
      "name": "寝待月",
      "condition": null
    },
    {
      "day": 15,
      "name": "下弦",
      "condition": null
    },
    {
      "day": 16,
      "name": "欠ける月",
      "condition": null
    },
    {
      "day": 17,
      "name": "欠ける月",
      "condition": null
    },
    {
      "day": 18,
      "name": "有明月",
      "condition": null
    },
    {
      "day": 19,
      "name": "暁月",
      "condition": null
    },
    {
      "day": 20,
      "name": "新月",
      "condition": "新月"
    }
  ],
  "weather": {
    "春": {
      "晴": 40,
      "曇": 25,
      "雨": 25,
      "霧": 10,
      "雪": 0
    },
    "夏": {
      "晴": 55,
      "曇": 20,
      "雨": 25,
      "霧": 0,
      "雪": 0
    },
    "秋": {
      "晴": 40,
      "曇": 25,
      "雨": 20,
      "霧": 15,
      "雪": 0
    },
    "冬": {
      "晴": 35,
      "曇": 30,
      "雨": 5,
      "霧": 10,
      "雪": 20
    }
  }
};
