// ═══════════════════════════════════════════════════════
//  デバッグモード  ─  紙片の文面を確かめるための道具
//
//  117枚の紙片が、実際の照合条件と合っているか。それを人が読んで
//  確かめるには、素材を集める手間が邪魔になる。ここでは
//    ・全188種の素材と器を無尽蔵にする
//    ・ターンと場所の制限を外し、同じマスを何度でも調べられるようにする
//    ・全紙片を手元に置く（読めない紙片は確かめられない）
//  を行う。
//
//  ■ 保存はしない
//  入り切りは localStorage の 'chougoujo.debug' だけに記録し、
//  デバッグ中は saveGame() を空にする。本来の記録
//  'chougoujo.save.v1' には一切書かないので、遊んでいた続きは
//  そのまま残る。切って読み込み直せば元に戻る。
//
//  ■ 消し方
//  このファイルを削除し、index.html の script 行を消すだけ。
//  他のファイルには手を入れていない。起動時の必須ファイル検査にも
//  入れていないので、無くても普通に起動する。
//
//  依存: main.js / explore.js / progress.js / calendar.js の後に読むこと
// ═══════════════════════════════════════════════════════

(function () {
    'use strict';

    const FLAG_KEY = 'chougoujo.debug';
    const PILE = 9999;          // 無限のかわり。これだけあれば足りる
    const TURNS = 99;

    const dbg = { on: false };

    // 元の値。切ったときに戻す（実際には読み込み直すので念のため）
    const orig = {};

    // ── 棚を満たす ──────────────────────────────
    function topUp() {
        ITEMS_DATA.forEach(it => {
            if (it.id === VESSEL_GLASS || it.id === VESSEL_PHIAL) return;
            state.stock[it.id] = PILE;
            state.everHeld[it.id] = true;
        });
        state.vessels[VESSEL_GLASS] = PILE;
        state.vessels[VESSEL_PHIAL] = PILE;
        if (state.money < PILE) state.money = PILE;
    }

    // ── 紙片をすべて手元に ──────────────────────
    //  heldSlips() は route で振り分ける。最初から／祖母の部屋（束）／行商人（買った控え）の三通り
    function allSlips() {
        const bundles = new Set(), bought = new Set();
        HINTS_DATA.forEach(h => {
            if (h.bundle) bundles.add(h.bundle);
            if (h.route === '行商人') bought.add(`${h.result}#${h.no}`);
        });
        state.unlockedBundles = [...bundles];
        state.boughtSlips = [...bought];
    }

    // ── 一日の制限を外す ────────────────────────
    function freeDay() {
        if (!explore.day) return;
        explore.day.turnsLeft = TURNS;
        // 調べた印を消す。同じマスを何度でも引き直せる
        explore.searched = new Set();
    }

    // ═══════════════════════════════════════════════
    //  入り切り
    // ═══════════════════════════════════════════════
    function enable() {
        dbg.on = true;

        // 何よりも先に保存を止める。本来の記録を汚さないため
        orig.saveGame = window.saveGame;
        window.saveGame = function () { return true; };

        // 暦の制限
        orig.maxMaps = CAL.maxMapsPerDay;
        orig.travelCost = CAL.travelCost;
        CAL.maxMapsPerDay = 99;
        CAL.travelCost = 0;

        topUp();
        allSlips();
        freeDay();

        wrapRenders();
        wrapActions();
        buildBar();
        renderAll();
        renderExplore();
        flash('デバッグモード。保存はしません。');
    }

    // 切るときは読み込み直す。包んだ関数を綺麗に外すよりそのほうが確実
    function disable() {
        try { localStorage.removeItem(FLAG_KEY); } catch (e) {}
        location.reload();
    }

    // ═══════════════════════════════════════════════
    //  既存の関数を包む
    //  main.js / explore.js は関数宣言なので window 越しに差し替えられる。
    //  内側からの呼び出しも同じ束縛を見るため、包めば全経路に効く。
    // ═══════════════════════════════════════════════
    function wrapRenders() {
        // 描く直前に棚とターンを戻す。調合で減った直後でも数が保たれる
        ['renderAll', 'renderItemList', 'renderExplore'].forEach(name => {
            const fn = window[name];
            if (typeof fn !== 'function') return;
            window[name] = function () {
                if (dbg.on) { topUp(); freeDay(); }
                return fn.apply(this, arguments);
            };
        });
    }

    function wrapActions() {
        // 時間帯を選び直せるようにする。出現表を時間帯ごとに見るため
        const choose = window.chooseTimeSlot;
        if (typeof choose === 'function') {
            window.chooseTimeSlot = function (slotId) {
                if (dbg.on && explore.day) {
                    explore.phase = 'before';
                    explore.day.timeSlot = null;
                }
                return choose.apply(this, arguments);
            };
        }
        // 帰宅後でも出直せるようにする
        const enter = window.enterArea;
        if (typeof enter === 'function') {
            window.enterArea = function () {
                if (dbg.on && explore.phase === 'after') explore.phase = 'before';
                return enter.apply(this, arguments);
            };
        }
    }

    // ═══════════════════════════════════════════════
    //  帯
    // ═══════════════════════════════════════════════
    function buildBar() {
        if (document.getElementById('dbg-bar')) return;

        const bar = document.createElement('div');
        bar.className = 'dbg-bar';
        bar.id = 'dbg-bar';
        bar.innerHTML = '<span class="dbg-mark">デバッグ</span>'
            + '<span class="dbg-note">素材と器は無尽蔵／ターンと場所の制限なし／全紙片あり／<b>保存しません</b></span>';

        const add = (label, hint, fn) => {
            const b = document.createElement('button');
            b.className = 'dbg-btn';
            b.textContent = label;
            b.title = hint;
            b.addEventListener('click', fn);
            bar.appendChild(b);
            return b;
        };

        add('出直す', '帰宅後でも、時間帯を選ぶところへ戻る', () => {
            explore.phase = 'before';
            if (explore.day) explore.day.timeSlot = null;
            explore.areaId = null;
            renderAll();
            renderExplore();
        });

        add('翌日へ', '朝の出来事を見ずに日付だけ進める', () => {
            startDay(explore.day.date.index + 1);
            renderAll();
            renderExplore();
            flash(`${explore.day.date.index + 1} 日目。`);
        });

        add('全レシピを解いた扱い', '「解いた調合」を全部埋める。答えを見てしまうので、'
            + '紙片を読んで自力で当てる確認をするときは押さないこと', function () {
            state.unlockedRecipes = RECIPES_DATA.map(r => r.result);
            renderAll();
            this.disabled = true;
            flash(`${RECIPES_DATA.length} 本すべてを解いた扱いにしました。`);
        });

        add('紙片を書き出す', '全紙片と、そのレシピが実際に要求しているものを並べた表を落とす',
            dumpSlips);

        add('デバッグを切る', '読み込み直して、元の記録に戻る', disable);

        const main = document.querySelector('.game-main');
        const anchor = document.querySelector('.view-tabs');
        (anchor || main).parentNode.insertBefore(bar, anchor || main);
    }

    // ═══════════════════════════════════════════════
    //  紙片と要求の対応を書き出す
    //  画面で一枚ずつ読むより、並べて眺めたほうが食い違いに気づく
    // ═══════════════════════════════════════════════
    const PROC_NAME = {
        grind: 'すりつぶす', boil: '煮る', dry: '乾燥させる', raw: 'そのまま',
        ferment: '発酵させる', burn: '焼く', freeze: '凍らせる',
        dissolve: '溶かす', distill: '蒸留'
    };

    function needLabel(g) {
        const cat = typeof catById !== 'undefined' ? catById.get(g.value) : null;
        const head =
            g.checkType === 'itemId' ? `指定＝${(itemById.get(g.value) || {}).name || g.value}`
          : g.checkType === 'categoryId' ? `種別＝${cat ? cat.label || cat.name : g.value}`
          : g.checkType === 'effectId' ? `効能＝${g.value}`
          : g.checkType === 'reactionId' ? `反応＝${g.value}`
          : `${g.checkType}＝${g.value}`;
        const tail = g.checkType2 ? `＋${g.checkType2}＝${g.value2}` : '';
        return `${head}${tail}／${PROC_NAME[g.processId] || g.processId}`;
    }

    function dumpSlips() {
        const rows = [];
        rows.push(['レシピ', '紙片', '出所', '確度', '題', '本文',
                   '要求1', '要求2', '要求3', '要求4', '要求5',
                   '要求ごとに通る素材数', '紙片が名指す素材', 'その素材が通る要求'].join('\t'));

        HINTS_DATA.forEach(h => {
            const r = recipeByResult.get(h.result);
            const ings = r ? r.ingredients : [];
            const labels = ings.map(needLabel);
            while (labels.length < 5) labels.push('');

            const counts = ings.map(g =>
                ITEMS_DATA.filter(it => matches(it, g)).length).join(' / ');

            // 本文に出てくる素材名を、長い名前から拾う
            const names = ITEMS_DATA.map(i => i.name)
                .filter(n => n.length >= 2 && n !== h.result)
                .sort((a, b) => b.length - a.length);
            let t = h.text || '', named = [];
            names.forEach(n => {
                if (!t.includes(n)) return;
                named.push(n);
                t = t.split(n).join('\u3000'.repeat(n.length));
            });

            const where = named.map(n => {
                const it = ITEMS_DATA.find(x => x.name === n);
                const at = ings.map((g, i) => (matches(it, g) ? i + 1 : 0)).filter(Boolean);
                return `${n}→${at.length ? at.join('・') + '番目' : '★どこも通らない'}`;
            }).join(' ; ');

            rows.push([h.result, h.no, h.source, h.reliability, h.title,
                       (h.text || '').replace(/[\t\r\n]/g, ' '),
                       ...labels.slice(0, 5), counts, named.join('、'), where].join('\t'));
        });

        const blob = new Blob(['\ufeff' + rows.join('\r\n')],
            { type: 'text/tab-separated-values;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'slips_vs_recipes.tsv';
        a.click();
        URL.revokeObjectURL(a.href);
        flash(`${HINTS_DATA.length} 枚を書き出しました。`);
    }

    // ═══════════════════════════════════════════════
    //  見た目。style.css を汚さないためここに置く
    // ═══════════════════════════════════════════════
    function injectStyle() {
        if (document.getElementById('dbg-style')) return;
        const s = document.createElement('style');
        s.id = 'dbg-style';
        s.textContent = `
          .dbg-bar {
            display: flex; align-items: center; gap: 8px 10px; flex-wrap: wrap;
            padding: 8px 12px;
            background: #2A251E; color: #F2EBDC;
            border-left: 3px solid #9E4230;
            font-size: 11.5px; line-height: 1.7;
          }
          .dbg-mark { border: 1px solid #9E4230; color: #E0A090; padding: 0 7px; letter-spacing: .2em; }
          .dbg-note { color: #C6BCA8; margin-right: auto; }
          .dbg-note b { color: #E0A090; }
          .dbg-btn {
            background: none; border: 1px solid #6E6555; color: #F2EBDC;
            font-family: inherit; font-size: 11.5px; padding: 2px 10px; cursor: pointer;
          }
          .dbg-btn:hover { background: #3E382F; border-color: #C6BCA8; }
          .dbg-btn:disabled { color: #6E6555; border-color: #3E382F; cursor: not-allowed; }
          .dbg-btn:disabled:hover { background: none; border-color: #3E382F; }
          .dbg-toggle {
            background: none; border: none; border-bottom: 1px solid #BCAB8B;
            color: #736A5C; font-family: inherit; font-size: 11px;
            padding: 0 3px; cursor: pointer;
          }
          .dbg-toggle:hover { color: #2A251E; border-bottom-color: #2A251E; }
        `;
        document.head.appendChild(s);
    }

    // ── 足元に入り口を置く ──────────────────────
    function buildToggle() {
        const foot = document.querySelector('.game-footer');
        if (!foot) return;
        const span = document.createElement('span');
        const b = document.createElement('button');
        b.className = 'dbg-toggle';
        b.textContent = 'デバッグ';
        b.title = '素材を無尽蔵にして紙片を確かめる。保存はしない';
        b.addEventListener('click', () => {
            try { localStorage.setItem(FLAG_KEY, '1'); } catch (e) {}
            enable();
            b.disabled = true;
        });
        span.appendChild(b);
        foot.appendChild(span);
    }

    // ═══════════════════════════════════════════════
    //  起動。main.js の init が済んだあとに動かす
    // ═══════════════════════════════════════════════
    document.addEventListener('DOMContentLoaded', () => {
        injectStyle();
        buildToggle();

        let flagged = false;
        try { flagged = localStorage.getItem(FLAG_KEY) === '1'; } catch (e) {}
        if (flagged || location.hash === '#debug') {
            try { localStorage.setItem(FLAG_KEY, '1'); } catch (e) {}
            // init が最初の描画を終えてから被せる
            setTimeout(enable, 0);
        }
    });

    window.chougoujoDebug = { enable, disable, topUp, dumpSlips };
})();
