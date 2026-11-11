const MAP_TEXT = `
TTTTTTTTTTTTTTTTTT
T@..1....T,,,,,,,T
T.====...T,,,,,,,T
T.=..=...T,,,,,,,T
T.=..=2..#####X###
T.=..=...........T
T.=====..~~~+~~~.T
T......3.~~~+~~~.T
T,,,,,,..........T
T,,,,,,....a..4.WT
TTTTTTTTTTTTTTTTTT
`;
const MAP_LEGEND = {};

const CREATURES = [
  { id: "elder", name: "鐘塔老爺爺", where: "map", mark: "1", sprite: "villager_elder", floor: ".",
    dialogue: ["時光村的時鐘精靈都跑進草叢裡了!", "牠們只聽得懂 in、on、at。答對就能收服牠們。", "南邊和東北邊的草叢都有精靈。東北邊要先打開柵欄門。"] },
  { id: "sign1", name: "告示牌", where: "map", mark: "2", sprite: "sign", floor: ".",
    dialogue: ["【時間介系詞小抄】", "at:精確的時間點 → at 7:00、at noon、at night", "on:某一天 → on Monday、on May 5th、on my birthday", "in:比較長的時間 → in May、in 2026、in the morning、in summer"] },
  { id: "kid", name: "小鎮學生", where: "map", mark: "3", sprite: "villager_green", floor: ".",
    dialogue: ["我在南邊撿到一把鑰匙,好像掉在橋的東邊。", "柵欄門要用那把鑰匙才打得開喔。"] },
  { id: "chest", name: "寶箱", where: "map", mark: "4", sprite: "chest", floor: ".",
    dialogue: ["裡面有一張紙條:「村口大門要收服全部五隻精靈才會打開。」"] },

  { id: "c1", name: "晨光兔", where: "grass", sprite: "leafbunny", area: "南邊草叢",
    greet: "晨光兔跳了出來:「我每天早上都很早起!」",
    question: "I get up ___ six thirty.", choices: ["in", "on", "at"], answerIndex: 2,
    mistakes: { "in": "in 用在比較長的時間(月份、年份、早上)。六點半是精確時間點,用 at。" },
    explanation: "精確的時間點用 at:at six thirty、at 7:00。", success: "晨光兔加入了隊伍!" },
  { id: "c2", name: "週末魚", where: "grass", sprite: "bubblefin_2", area: "南邊草叢",
    greet: "週末魚從草叢裡冒出泡泡。",
    question: "We have no school ___ Saturday.", choices: ["on", "in", "at"], answerIndex: 0,
    mistakes: { "in": "星期幾是「某一天」,用 on。", "at": "at 是給時間點的,星期幾用 on。" },
    explanation: "星期幾、日期、特別的某一天都用 on:on Saturday、on May 5th。", success: "週末魚加入了隊伍!" },
  { id: "c3", name: "夏日雞", where: "grass", sprite: "emberchick", area: "東北邊草叢",
    greet: "夏日雞熱呼呼地衝出來!",
    question: "It is very hot here ___ summer.", choices: ["at", "in", "on"], answerIndex: 1,
    mistakes: { "on": "季節是一段比較長的時間,用 in。" },
    explanation: "季節、月份、年份用 in:in summer、in July、in 2026。", success: "夏日雞加入了隊伍!" },
  { id: "c4", name: "生日貝", where: "grass", sprite: "pebbleshell_3", area: "東北邊草叢",
    greet: "生日貝打開殼,裡面有一個小蛋糕。",
    question: "My party is ___ my birthday.", choices: ["in", "at", "on"], answerIndex: 2,
    mistakes: { "in": "生日是「某一天」,用 on。" },
    explanation: "特定的某一天用 on:on my birthday、on Christmas Day。", success: "生日貝加入了隊伍!" },
  { id: "c5", name: "夜光蟲", where: "grass", sprite: "starbug_2", area: "東北邊草叢",
    greet: "夜光蟲在黑暗中一閃一閃。",
    question: "Owls are awake ___ night.", choices: ["in", "at", "on"], answerIndex: 1,
    mistakes: { "in": "這是固定說法:in the morning、in the evening,但晚上是 at night。" },
    explanation: "固定用法:in the morning / afternoon / evening,但 at night、at noon。", success: "夜光蟲加入了隊伍!" }
];

const ITEMS = [{ mark: "a", name: "柵欄鑰匙", sprite: "key", note: "可以打開東北邊的柵欄門" }];

const GATES = [
  { mark: "X", name: "柵欄門", needs: "a", lockedText: "門鎖住了。聽說有人在南邊看過鑰匙。", openedText: "柵欄門打開了!", floor: "." },
  { mark: "W", name: "村口大門", needsAllCreatures: true, lockedText: "大門上寫著:收服全部時鐘精靈才能出去。", openedText: "五隻精靈一起敲響鐘聲,大門打開了!" }
];

const GAME = {
  title: "⏰ 時光村:in / on / at 精靈收集",
  desc: "時光村的時鐘精靈都跑進草叢裡了。走遍村子,答對時間介系詞的問題,把五隻精靈都收回來!",
  ending: "五隻精靈都回家了,時光村的鐘又開始走。記住:at 時間點、on 某一天、in 一段長時間。",
  teacherNotes: "適合國中七年級。五隻精靈各考一個用法:at 時間點、on 星期幾、in 季節、on 特定日子、at night 固定用法。建議先讓學生讀告示牌再出發。"
};
