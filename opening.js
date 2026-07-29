// ═══════════════════════════════════════════════════════
//  発端  ─  表題 / 開幕の文 / 最初から始める / 借財
//   ここの文章は xlsx から作っていない。この場で書き換えてよい。
//   借財は一周忌の朝（160日目）に一括で判定する。
//   期日に所持金が足りなければ、ほかに何をしていても店は人手に渡る。
//  依存: calendar.js / explore.js / progress.js / main.js
// ═══════════════════════════════════════════════════════

const OPENING_DATA = {

    // 祖母の療養に要った額。返せなければ店兼住居を明け渡す
    debt: 8000,

    // 表題の下に出す一行
    lead: '一年で、祖母の借財を返す。返せなければ、この家は人手に渡る。',

    // 開幕。一枚ずつ読ませる
    pages: [
        {
            title: '野辺送り',
            text: '祖母を焼いた日は、よく晴れていた。\n' +
                  '村の者が何人か来て、線香をあげて、それぞれの畑へ帰っていった。私は最後まで残って、骨を拾った。持ち上げると、思っていたよりずっと軽かった。\n\n' +
                  '家に戻る。戸に鍵はかけていない。この家に、盗られて困るものは何もない。'
        },
        {
            title: '証文',
            text: '帳場の下から、束ねた紙が出てきた。薬礼、往診、街から取り寄せた薬。祖母が寝付いてからの二年ぶんだ。\n' +
                  '足していくと、八千になった。\n\n' +
                  '借りた先の名は、はっきり書いてある。期日は一周忌の朝。それまでに返せなければ、この家と店を渡す。そういう証文に、祖母の拇印が押してあった。\n\n' +
                  '返すつもりでいたのだと思う。返せる算段があったとは、思えないけれど。'
        },
        {
            title: '家の中',
            text: '雨戸を開けて回った。埃と、乾いた草の匂いがした。祖母の匂いでもある。\n' +
                  '寝床を片付け、鍋を洗い、薬棚を拭いた。抽斗は百近くある。札の字が読めるものは、その半分もない。\n\n' +
                  '片付けても片付けても、紙が出てくる。祖母は物を捨てない人だった。'
        },
        {
            title: '乳鉢',
            text: '子供の頃、この帳場に座らされて、乳鉢を回していた。三日で飽きた。\n' +
                  'それでも、手が覚えていることはある。擂る。煮出す。乾かす。器を選ぶ。\n\n' +
                  '祖母は手順しか教えなかった。なぜそうするのかは、一度も言わなかった。訊けばよかったと思う。\n' +
                  '十何年ぶりに乳鉢を持つと、重さのぶんだけ、少し思い出した。'
        },
        {
            title: '板を出す',
            text: '売るものを作れば、金は入る。作り方は、この家のどこかにあるはずだ。あの人が捨てていなければ。\n\n' +
                  '戸口に板を出した。字は薄れていたが、書き直さなかった。祖母の字のままでいい。\n\n' +
                  '一年ある。'
        },
    ],

    // 返し終えたときに、結末の断片へ一行足す
    repaidNote: '借財は返した。証文は、火にくべた。',

    // 期日に返せなかったときの結末。ほかのどの結末よりも先に判定される
    foreclosure: {
        id: 'en_foreclosed',
        title: '渡した鍵',
        text: '一周忌の朝、店の前に花はなかった。\n\n' +
              '金は集まらなかった。証文どおり、この家と店を渡した。抽斗の中身は、あらかた買い手が引き取っていった。祖母が四十年かけて集めたものを、値のつくものとつかないものに分けるのに、半日もかからなかった。\n\n' +
              '紙の束だけは持ち出した。売れないと言われたからだ。読み終えていないものが、まだ半分ある。\n\n' +
              '板は外して荷に入れた。掲げる戸口はもうないけれど、置いていく気にはなれなかった。\n\n' +
              '村を出る道から、屋根が見える。今日あたり、誰かが花を持ってきているかもしれない。もう私の店ではない。',
        altCondition: null,
        altText: null,
    },
};

// ═══════════════════════════════════════════════════════
//  表題
// ═══════════════════════════════════════════════════════
// 表題を出した時点で続きがあったか。上書きの確認を出すかどうかに使う
let titleHadSave = false;

function bindOpening() {
    document.getElementById('btn-title-continue').addEventListener('click', continueGame);
    document.getElementById('btn-title-new').addEventListener('click', askNewGame);
    document.getElementById('btn-opening-next').addEventListener('click', () => turnOpeningPage(1));
    document.getElementById('btn-opening-skip').addEventListener('click', closeOpening);
}

function openTitle(hadSave) {
    const saved = titleHadSave = (hadSave === undefined ? hasSave() : hadSave);
    document.getElementById('btn-title-continue').classList.toggle('hidden', !saved);
    // 続きが無ければ、始める方を主にする
    const nb = document.getElementById('btn-title-new');
    nb.textContent = saved ? '最初から始める' : '始める';
    nb.className = saved ? 'btn-reset' : 'btn-compound';
    document.getElementById('title-note').textContent = saved ? savedNote() : OPENING_DATA.lead;
    document.getElementById('title-overlay').classList.remove('hidden');
}

// 続きがあるとき、どこまで進んでいたかを一行で
function savedNote() {
    const d = explore.day.date;
    return state.ended
        ? '前の一年は終わっている。続きからでも、結末をもう一度読める。'
        : `${d.monthName} ${d.day}日まで進んでいる。期日まで残り ${d.remaining} 日。`;
}

function continueGame() {
    document.getElementById('title-overlay').classList.add('hidden');
    renderAll();
    if (state.ended) showEnding();
}

function askNewGame() {
    if (titleHadSave && !state.ended &&
        !confirm('いま残っている記録は消えます。最初から始めますか。')) return;
    startNewGame();
}

// ═══════════════════════════════════════════════════════
//  最初から始める
//   画面を読み込み直さずに、記録も持ち物も暦も初期値へ戻す
// ═══════════════════════════════════════════════════════
function startNewGame() {
    clearSave();
    Object.assign(state, freshCraftState(), freshProgress());
    startDay(0);
    eventQueue = [];

    const search = document.getElementById('item-search');
    if (search) search.value = '';
    ['title-overlay', 'event-overlay', 'ending-overlay']
        .forEach(id => document.getElementById(id).classList.add('hidden'));
    showView('craft');

    saveGame();
    renderAll();
    playOpening();
}

// ═══════════════════════════════════════════════════════
//  開幕の文
// ═══════════════════════════════════════════════════════
let openingPage = 0;

function playOpening() {
    openingPage = 0;
    showOpeningPage();
    document.getElementById('opening-overlay').classList.remove('hidden');
}

function turnOpeningPage(d) {
    openingPage += d;
    if (openingPage >= OPENING_DATA.pages.length) return closeOpening();
    showOpeningPage();
}

function showOpeningPage() {
    const pages = OPENING_DATA.pages;
    const p = pages[openingPage];
    const last = openingPage === pages.length - 1;
    document.getElementById('opening-title').textContent = p.title;
    document.getElementById('opening-text').textContent = p.text;
    document.getElementById('opening-page').textContent = `${openingPage + 1} / ${pages.length}`;
    document.getElementById('btn-opening-next').textContent = last ? '店を開ける' : '次へ';
    document.getElementById('opening-overlay').scrollTop = 0;
}

function closeOpening() {
    document.getElementById('opening-overlay').classList.add('hidden');
    flash('店を開けた。');
}

// ═══════════════════════════════════════════════════════
//  借財
// ═══════════════════════════════════════════════════════
const debtLeft = () => Math.max(0, state.debt || 0);
const debtCleared = () => state.money >= debtLeft();

function renderDebt() {
    const el = document.getElementById('debt');
    if (!el) return;
    const left = debtLeft();
    el.textContent = left ? left.toLocaleString() : '完済';
    el.parentElement.classList.toggle('debt-short', left > 0 && !debtCleared());
    el.parentElement.title = left
        ? '一周忌の朝までに、この額を手元に用意する。足りなければ店を渡す。'
        : '';
}
