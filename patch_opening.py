# ═══════════════════════════════════════════════════════
#  調合所 ─ 開幕まわりを、いま手元にあるファイルへ足す
#
#  使い方: index.html と同じフォルダに opening.js と一緒に置いて
#          python3 patch_opening.py
#
#  触るのは main.js / progress.js / index.html / style.css の四つ。
#  器の自動化や保存の修正が入った版の上からでも当たるように、
#  それらが書き換えた場所は避けて継ぎ足しています。
#  当たらない箇所があれば、何も書かずに止まります（*.bak も残します）。
# ═══════════════════════════════════════════════════════

import io, os, re, shutil, sys

FILES = ['main.js', 'progress.js', 'index.html', 'style.css']


def read(p):
    return io.open(p, encoding='utf-8', newline=None).read()


def write(p, s):
    io.open(p, 'w', encoding='utf-8', newline='\r\n').write(s)


def sub(s, pat, rep, label, flags=0):
    """一致は必ず1件。0件でも2件以上でも止める"""
    n = len(re.findall(pat, s, flags))
    if n != 1:
        sys.exit('  × %s … 一致 %d 件。中断しました。' % (label, n))
    print('  ○ %s' % label)
    return re.sub(pat, lambda m: rep, s, count=1, flags=flags)


def esc(t):
    return re.escape(t)


# ── 前置き ────────────────────────────────────────────
for f in FILES + ['opening.js']:
    if not os.path.exists(f):
        sys.exit('%s が見つかりません。index.html と同じフォルダで実行してください。' % f)

if 'freshCraftState' in read('main.js'):
    sys.exit('main.js には既に当たっています。二度目は要りません。')

for f in FILES:
    shutil.copyfile(f, f + '.bak')
print('控えを *.bak に取りました。')


# ── main.js ──────────────────────────────────────────
print('\nmain.js')
s = read('main.js')

# 1) 状態の初期値を関数に包む。中身はいまのものをそのまま使う
m = re.search(r'const state = \{\n(.*?)\n\};', s, re.S)
if not m:
    sys.exit('  × 状態の宣言が見つかりません。中断しました。')
body = m.group(1)
s = s[:m.start()] + (
    '// 初期値。progress.js の freshProgress() と合わせて一揃い。\n'
    '// 最初から始めるときは、この二つを state に流し込み直す。\n'
    'function freshCraftState() {\n'
    '    return {\n'
    + '\n'.join(('    ' + ln) if ln.strip() else ln for ln in body.split('\n')) + '\n'
    '    };\n'
    '}\n'
    '\n'
    'const state = freshCraftState();'
) + s[m.end():]
print('  ○ 状態の初期値を freshCraftState() に')

# 2) 起動時。保存を書く前に、続きの有無を見ておく
s = sub(s, esc('    if (!loadGame()) saveGame();'),
        '    // 起動時に必ず保存を書くので、続きの有無はここで見ておく\n'
        '    const hadSave = hasSave();\n'
        '    if (!loadGame()) saveGame();\n'
        '    bindOpening();',
        '起動時に続きの有無を控える')

# 3) 描き直しの最後に表題を出す
s = sub(s, r'(?<=\n)    renderAll\(\);\n\}\n\nfunction renderAll\(\) \{',
        '    renderAll();\n    openTitle(hadSave);\n}\n\nfunction renderAll() {',
        '起動の最後に表題を出す')

# 4) renderAll に借財の表示を足す
m = re.search(r'function renderAll\(\) \{\n(.*?)\n\}', s, re.S)
if not m:
    sys.exit('  × renderAll が見つかりません。中断しました。')
s = s[:m.end(1)] + '\n    renderDebt();' + s[m.end(1):]
print('  ○ renderAll に renderDebt() を追加')

# 5) 結末の断片に、借財の始末を一行足す
s = sub(s, esc('    e.notes.forEach(t => {'),
        '    const notes = debtCleared() ? [OPENING_DATA.repaidNote, ...e.notes] : e.notes;\n'
        '    notes.forEach(t => {',
        '結末に借財の一行')

# 6) 最初から始める。読み込み直さずに戻す
s = sub(s, r'function restartGame\(\) \{\n.*?\n\}',
        'function restartGame() {\n    startNewGame();\n}',
        '結末の「最初から始める」', re.S)

write('main.js', s)


# ── progress.js ──────────────────────────────────────
print('\nprogress.js')
s = read('progress.js')

s = sub(s, esc('        money: START_MONEY,'),
        '        money: START_MONEY,\n'
        '        debt: OPENING_DATA.debt,   // 祖母の療養に要った額。期日に一括で判定する',
        '記録の初期値に借財')

s = sub(s, esc("const SAVE_FIELDS = ['money',"),
        "const SAVE_FIELDS = ['money','debt',",
        '保存する項目に借財')

s = sub(s, esc('function judgeEnding() {'),
        'function judgeEnding() {\n'
        '    // 期日に借財を返せなければ、ほかに何をしていても店は人手に渡る\n'
        '    if (!debtCleared()) return buildEnding(OPENING_DATA.foreclosure);',
        '結末の判定に借財')

write('progress.js', s)


# ── index.html ───────────────────────────────────────
print('\nindex.html')
s = read('index.html')

s = sub(s, esc('<span class="day-money">所持金 <b id="money">0</b></span>'),
        '<span class="day-money">所持金 <b id="money">0</b></span>\n'
        '        <span class="day-debt">借財 <b id="debt">0</b></span>',
        '日付欄に借財')

s = sub(s, esc('    <!-- ── 朝の出来事 ── -->'),
        '''    <!-- ── 表題 ── -->
    <div class="overlay hidden" id="title-overlay">
      <div class="overlay-box title-box">
        <p class="title-seal">調</p>
        <h2 class="title-name">調合所</h2>
        <p class="title-sub">草木と鉱物の覚え書き</p>
        <p class="title-note" id="title-note"></p>
        <div class="title-btns">
          <button class="btn-compound" id="btn-title-continue">続きから</button>
          <button class="btn-compound" id="btn-title-new">始める</button>
        </div>
      </div>
    </div>

    <!-- ── 開幕 ── -->
    <div class="overlay hidden" id="opening-overlay">
      <div class="overlay-box opening-box">
        <h2 class="overlay-title" id="opening-title"></h2>
        <p class="overlay-text" id="opening-text"></p>
        <div class="opening-foot">
          <span class="opening-page" id="opening-page"></span>
          <button class="btn-reset" id="btn-opening-skip">読み飛ばす</button>
          <button class="btn-compound" id="btn-opening-next">次へ</button>
        </div>
      </div>
    </div>

    <!-- ── 朝の出来事 ── -->''',
        '表題と開幕の覆い')

s = sub(s, esc('  <script src="progress.js"></script>'),
        '  <script src="progress.js"></script>\n  <script src="opening.js"></script>',
        'opening.js の読み込み')

s = sub(s, esc("      ['flagMet',         'progress.js'],"),
        "      ['flagMet',         'progress.js'],\n"
        "      ['OPENING_DATA',    'opening.js'],",
        '起動確認に opening.js')

write('index.html', s)


# ── style.css ────────────────────────────────────────
print('\nstyle.css')
s = read('style.css')
s += """

/* ════════════════════════════════════════════════════════
   表題と開幕
   ════════════════════════════════════════════════════════ */

.day-debt { font-size: 12px; color: var(--ink-thin); }
.day-debt b { font-weight: 600; }
.day-debt.debt-short b { color: var(--seal); }

.title-box { max-width: 460px; text-align: center; padding: 40px 34px 34px; }

/* 朱印。表題の上に一つだけ置く */
.title-seal {
  display: inline-block;
  width: 34px;
  height: 34px;
  line-height: 32px;
  border: 1px solid var(--seal);
  color: var(--seal);
  font-size: 15px;
  margin-bottom: 22px;
}

.title-name {
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 0.5em;
  padding-left: 0.5em;
}

.title-sub {
  font-size: 12px;
  color: var(--ink-thin);
  letter-spacing: 0.2em;
  margin-top: 8px;
}

.title-note {
  font-size: 12px;
  color: var(--ink-thin);
  line-height: 2.1;
  margin: 26px auto 0;
  padding-top: 18px;
  border-top: 1px solid var(--rule-faint);
  max-width: 22em;
}

.title-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 24px;
}

.opening-box { max-width: 560px; }
.opening-box .overlay-text { margin-bottom: 22px; }

.opening-foot {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid var(--rule-faint);
}

.opening-page {
  font-size: 11px;
  color: var(--ink-faint);
  letter-spacing: 0.2em;
  margin-right: auto;
}
"""
write('style.css', s)
print('  ○ 表題と開幕の見た目を追記')

print('\n終わりました。ブラウザで index.html を開いてください。')
print('戻すときは *.bak を元の名前に戻してください。')
