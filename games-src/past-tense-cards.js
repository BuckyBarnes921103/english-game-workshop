const FACTIONS = [
  { key: "regular",   label: "規則動詞隊(加 -ed)", color: "#3a86ff" },
  { key: "irregular", label: "不規則動詞隊(會變身)", color: "#e0556f" }
];
const ROLES = [
  { key: "king",   label: "隊長動詞" },
  { key: "beast",  label: "王牌動詞" },
  { key: "common", label: "一般動詞" }
];
const CARD_POOL = [
  { id: 1,  faction: "regular", role: "king",   name: "play → played",   baseScore: 8, desc: "母音 + y 結尾,直接加 -ed" },
  { id: 2,  faction: "regular", role: "beast",  name: "study → studied", baseScore: 6, desc: "子音 + y 結尾,去 y 加 -ied" },
  { id: 3,  faction: "regular", role: "common", name: "stop → stopped",  baseScore: 5, desc: "短母音 + 單一子音,重複字尾再加 -ed" },
  { id: 4,  faction: "regular", role: "common", name: "like → liked", copies: 2,    baseScore: 3, desc: "e 結尾,只加 -d" },
  { id: 5,  faction: "regular", role: "common", name: "watch → watched", copies: 2, baseScore: 3, desc: "直接加 -ed,ed 讀 /t/" },
  { id: 6,  faction: "regular", role: "common", name: "visit → visited", copies: 2, baseScore: 4, desc: "t 結尾,ed 讀 /ɪd/" },
  { id: 7,  faction: "regular", role: "common", name: "cry → cried",     baseScore: 4, desc: "子音 + y,去 y 加 -ied" },
  { id: 8,  faction: "regular", role: "common", name: "clean → cleaned", baseScore: 2, desc: "直接加 -ed,ed 讀 /d/", copies: 3 },
  { id: 9,  faction: "irregular", role: "king",   name: "go → went",     baseScore: 8, desc: "完全變身,跟原形一點都不像" },
  { id: 10, faction: "irregular", role: "beast",  name: "eat → ate",     baseScore: 6, desc: "不是 eated!" },
  { id: 11, faction: "irregular", role: "common", name: "see → saw", copies: 2,     baseScore: 4, desc: "看見:see / saw" },
  { id: 12, faction: "irregular", role: "common", name: "buy → bought",  baseScore: 5, desc: "buy、bring、think 都變 -ought" },
  { id: 13, faction: "irregular", role: "common", name: "have → had", copies: 2,    baseScore: 3, desc: "has / have 過去式都是 had" },
  { id: 14, faction: "irregular", role: "common", name: "put → put",     baseScore: 5, desc: "三態同形:put / put / put" },
  { id: 15, faction: "irregular", role: "common", name: "take → took", copies: 2,   baseScore: 4, desc: "take / took" },
  { id: 16, faction: "irregular", role: "common", name: "write → wrote", baseScore: 2, desc: "write / wrote", copies: 3 }
];
const QUESTION_CARDS = [
  { id: 1, question: "I ___ basketball yesterday.", choices: ["played", "plaied", "play", "plays"], answerIndex: 0,
    correctBonus: 2, wrongPenalty: 1, explain: "yesterday 是過去的時間,play 的 y 前面是母音 a,直接加 -ed。",
    mistakes: { "plaied": "只有「子音 + y」才去 y 加 -ied。play 的 y 前面是母音 a。" } },
  { id: 2, question: "She ___ English last night.", choices: ["studyed", "studied", "studies", "study"], answerIndex: 1,
    correctBonus: 2, wrongPenalty: 1, explain: "study 是子音 d + y 結尾,去 y 加 -ied。",
    mistakes: { "studyed": "子音 + y 結尾要去 y 加 -ied:studied。" } },
  { id: 3, question: "We ___ to the zoo last Sunday.", choices: ["goed", "go", "went", "gone"], answerIndex: 2,
    correctBonus: 2, wrongPenalty: 1, explain: "go 是不規則動詞,過去式是 went。",
    mistakes: { "goed": "go 不是規則動詞,不能加 -ed。", "gone": "gone 是過去分詞,單獨當過去式用是錯的。" } },
  { id: 4, question: "The bus ___ in front of the school.", choices: ["stoped", "stops", "stoping", "stopped"], answerIndex: 3,
    correctBonus: 2, wrongPenalty: 1, explain: "stop 是短母音 + 單一子音 p,重複 p 再加 -ed。",
    mistakes: { "stoped": "stop 要重複字尾 p:stopped。" } },
  { id: 5, question: "下面哪一個過去式是錯的?", choices: ["ate", "buyed", "saw", "took"], answerIndex: 1,
    correctBonus: 2, wrongPenalty: 1, explain: "buy 的過去式是 bought,不規則。",
    mistakes: { "ate": "ate 是 eat 的過去式,這個是對的。" } },
  { id: 6, question: "He ___ his bag on the desk an hour ago.", choices: ["putted", "puts", "put", "puted"], answerIndex: 2,
    correctBonus: 2, wrongPenalty: 1, explain: "put 三態同形,過去式還是 put。主詞 He 但時間是過去,所以不加 s。",
    mistakes: { "puts": "an hour ago 是過去,過去式不用管三單加 s。", "putted": "put 是不規則動詞,三態都是 put。" } },
  { id: 7, question: "visited 的 -ed 怎麼念?", choices: ["/t/", "/d/", "/ɪd/", "不發音"], answerIndex: 2,
    correctBonus: 2, wrongPenalty: 1, explain: "t 或 d 結尾的動詞,-ed 念 /ɪd/,多一個音節。",
    mistakes: { "/t/": "/t/ 是給 watch、help 這種無聲子音結尾的。visit 是 t 結尾,念 /ɪd/。" } },
  { id: 8, question: "Did you ___ the movie last night?", choices: ["see", "saw", "seen", "sees"], answerIndex: 0,
    correctBonus: 2, wrongPenalty: 1, explain: "有 Did 的問句,動詞要回到原形。",
    mistakes: { "saw": "Did 已經表示過去了,後面的動詞用原形 see。" } }
];
const GAME = {
  title: "🃏 時光卡牌:過去式大對決",
  desc: "抽動詞卡、答過去式問題,看哪一隊的分數最高!",
  story: "時光博物館的動詞們分成兩隊:乖乖加 -ed 的規則動詞隊,和會變身的不規則動詞隊。你被分到其中一隊,抽卡、答題、搶分!",
  theme: "warm",
  howToPlay: "<ol><li>開局會隨機分到一隊。</li><li>輪到你就按「抽下一張」,每張卡都是一個動詞和它的過去式。</li><li>抽到自己隊的隊長動詞,同隊卡分數 ×2;再抽到王牌動詞變 ×3。</li><li>每抽兩張會跳出一題過去式問答,答對加分、答錯扣分。</li></ol>",
  handSize: 6, questionInterval: 2, battlesPerPlayer: 0, maxPlayers: 2,
  bots: { solo: [1, 3] }
};
