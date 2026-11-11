const ITEMS = {
  badge: { name: "員工識別證", icon: "🪪", desc: "電影院員工的識別證,可以打開放映室的門" },
  reel: { name: "底片膠卷", icon: "🎞️", desc: "最後一捲底片,裝上去電影就能開演" }
};

const LEVELS = [
  { type: "choice", title: "第一關:售票口的公告",
    scene: "你走進「此刻電影院」,大廳空無一人,售票口貼著一張歪掉的公告。",
    clues: [{ title: "公告", text: "Look! The manager ___ the popcorn machine right now." }],
    question: "空格要填什麼?",
    choices: ["fix", "fixes", "is fixing", "fixing"], answerIndex: 2,
    hints: ["right now 是「現在正在」的訊號。", "現在進行式 = be 動詞 + V-ing。", "主詞 The manager 是單數,用 is fixing。"],
    mistakes: {
      "fixes": "fixes 是現在簡單式,說的是「習慣」。句子有 Look! 和 right now,事情正在發生,要用進行式。",
      "fixing": "只有 V-ing 不夠,前面一定要有 be 動詞(am / is / are)。"
    },
    success: "售票員從櫃檯下面探出頭:「你看得懂公告?那你一定能幫我們!」",
    explanation: "看到 now、right now、Look!、Listen! 這類字,通常要用現在進行式:be 動詞 + V-ing。" },

  { type: "text", title: "第二關:爆米花機的密碼",
    scene: "爆米花機鎖住了,螢幕寫著:輸入正確的單字才會啟動。",
    clues: [{ title: "螢幕", text: "The kids are ___ (run) to the theater.\n輸入括號裡動詞的 V-ing。" }],
    question: "輸入 run 的 V-ing。", answer: "running",
    hints: ["run 是「短母音 + 一個子音」結尾。", "這種字要重複最後一個子音再加 -ing。", "run → running。"],
    mistakes: { "runing": "run 是短母音加一個子音結尾,要重複 n:running。", "runs": "題目要的是 V-ing,不是三單現在式。" },
    success: "爆米花機轟的一聲開始轉,奶油香飄滿大廳。", reward: ["badge"],
    explanation: "短母音 + 單一子音結尾的動詞,先重複字尾再加 -ing:run → running、swim → swimming、sit → sitting。" },

  { type: "assign", title: "第三關:海報分類牆",
    scene: "走廊的海報掉了一地。每張海報背後寫著一個動詞,要掛回正確的牆上。",
    question: "把每個 V-ing 掛到它的變化規則下面。",
    slots: ["直接加 -ing", "去 e 加 -ing", "重複字尾再加 -ing"],
    items: ["reading", "making", "swimming", "dancing", "playing", "sitting"],
    multiple: true,
    answer: [["reading", "playing"], ["making", "dancing"], ["swimming", "sitting"]],
    hints: ["先看原形動詞:read、make、swim、dance、play、sit。", "結尾是不發音的 e 的,要去 e。", "swim、sit 是短母音加一個子音。"],
    success: "最後一張海報掛好,走廊盡頭的燈亮了。",
    explanation: "三種變化:一般直接加(read → reading);字尾不發音 e 去 e 加(make → making);短母音 + 單一子音重複字尾(swim → swimming)。" },

  { type: "choice", title: "第四關:放映室門口",
    scene: "放映室的門要刷識別證,門上還有一題守門問題。",
    clues: [{ title: "門上的字", text: "I ___ a movie with my friends now.", needs: "badge" }],
    question: "空格要填什麼?",
    choices: ["is watching", "am watching", "are watching", "watching"], answerIndex: 1,
    hints: ["be 動詞要跟著主詞變。", "I 搭配的 be 動詞只有一個。", "I am watching。"],
    mistakes: {
      "is watching": "is 給 he / she / it 和單數名詞用。主詞是 I,要用 am。",
      "are watching": "are 給 you / we / they 和複數用。主詞是 I,要用 am。"
    },
    success: "嗶一聲,門開了。放映機旁邊放著最後一捲底片。", reward: ["reel"],
    explanation: "I → am;he / she / it → is;you / we / they → are。進行式的 be 動詞照這個表選。" },

  { type: "sequence", title: "第五關:把句子裝上放映機",
    scene: "底片上的字幕亂掉了。照正確的順序按下按鈕,把句子拼回來。",
    clues: [{ title: "字幕原文", text: "「他們現在正在吃爆米花嗎?」", needs: "reel" }],
    question: "照順序按出正確的問句。",
    buttons: ["Are", "they", "eating", "popcorn", "now?"],
    answer: ["Are", "they", "eating", "popcorn", "now?"],
    hints: ["問句要把 be 動詞搬到最前面。", "Be 動詞 + 主詞 + V-ing + 其他。", "Are → they → eating → popcorn → now?"],
    mistakes: { "they→Are": "進行式的問句,be 動詞要放在主詞前面。" },
    success: "放映機亮起來,銀幕上出現「NOW SHOWING」。",
    explanation: "進行式問句:把 be 動詞移到句首。They are eating. → Are they eating?" }
];

const GAME = {
  title: "🎬 此刻電影院:現在進行式密室",
  desc: "電影院的人都不見了。用現在進行式解開五道機關,讓電影準時開演!",
  theme: "warm", icon: "🎬",
  story: "週六晚上,你提早到了「此刻電影院」。大廳亮著燈,卻一個人都沒有。只要解開五道機關,電影就能開演。",
  ending: "燈光暗下,電影開演了。你學會了現在進行式:be 動詞 + V-ing,說的是「此刻正在發生」的事。",
  lives: 3, shuffleChoices: true, showStars: true
};
