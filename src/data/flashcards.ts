export interface Flashcard {
  id: number;
  japanese: string;
  furigana: string;
  romaji: string;
  english: string;
  category: "dietary" | "greeting" | "transport" | "shopping" | "emergency" | "restaurant";
}

export const flashcards: Flashcard[] = [
  // ── Dietary ──
  {
    id: 1,
    japanese: "私はベジタリアンです",
    furigana: "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>はベジタリアンです",
    romaji: "Watashi wa bejitarian desu",
    english: "I am vegetarian",
    category: "dietary",
  },
  {
    id: 2,
    japanese: "肉と魚は食べられません",
    furigana: "<ruby>肉<rp>(</rp><rt>にく</rt><rp>)</rp></ruby>と<ruby>魚<rp>(</rp><rt>さかな</rt><rp>)</rp></ruby>は<ruby>食<rp>(</rp><rt>た</rt><rp>)</rp></ruby>べられません",
    romaji: "Niku to sakana wa taberaremasen",
    english: "I can't eat meat or fish",
    category: "dietary",
  },
  {
    id: 3,
    japanese: "グルテンフリーはありますか？",
    furigana: "グルテンフリーはありますか？",
    romaji: "Guruten furii wa arimasu ka?",
    english: "Do you have gluten-free options?",
    category: "dietary",
  },
  {
    id: 4,
    japanese: "小麦アレルギーです",
    furigana: "<ruby>小麦<rp>(</rp><rt>こむぎ</rt><rp>)</rp></ruby>アレルギーです",
    romaji: "Komugi arerugi desu",
    english: "I have a wheat allergy",
    category: "dietary",
  },
  {
    id: 5,
    japanese: "たまり醤油はありますか？",
    furigana: "たまり<ruby>醤油<rp>(</rp><rt>しょうゆ</rt><rp>)</rp></ruby>はありますか？",
    romaji: "Tamari shouyu wa arimasu ka?",
    english: "Do you have tamari soy sauce?",
    category: "dietary",
  },
  {
    id: 6,
    japanese: "出汁は鰹節なしでお願いします",
    furigana: "<ruby>出汁<rp>(</rp><rt>だし</rt><rp>)</rp></ruby>は<ruby>鰹節<rp>(</rp><rt>かつおぶし</rt><rp>)</rp></ruby>なしでお<ruby>願<rp>(</rp><rt>ねが</rt><rp>)</rp></ruby>いします",
    romaji: "Dashi wa katsuobushi nashi de onegai shimasu",
    english: "Please make dashi without bonito flakes",
    category: "dietary",
  },

  // ── Greetings ──
  {
    id: 7,
    japanese: "すみません",
    furigana: "すみません",
    romaji: "Sumimasen",
    english: "Excuse me / I'm sorry",
    category: "greeting",
  },
  {
    id: 8,
    japanese: "ありがとうございます",
    furigana: "ありがとうございます",
    romaji: "Arigatou gozaimasu",
    english: "Thank you very much",
    category: "greeting",
  },
  {
    id: 9,
    japanese: "お願いします",
    furigana: "お<ruby>願<rp>(</rp><rt>ねが</rt><rp>)</rp></ruby>いします",
    romaji: "Onegai shimasu",
    english: "Please (when requesting)",
    category: "greeting",
  },
  {
    id: 10,
    japanese: "いただきます",
    furigana: "いただきます",
    romaji: "Itadakimasu",
    english: "Thank you for the food (before eating)",
    category: "greeting",
  },
  {
    id: 11,
    japanese: "ごちそうさまでした",
    furigana: "ごちそうさまでした",
    romaji: "Gochisousama deshita",
    english: "Thank you for the meal (after eating)",
    category: "greeting",
  },
  {
    id: 12,
    japanese: "こんにちは",
    furigana: "こんにちは",
    romaji: "Konnichiwa",
    english: "Hello / Good afternoon",
    category: "greeting",
  },
  {
    id: 13,
    japanese: "おはようございます",
    furigana: "おはようございます",
    romaji: "Ohayou gozaimasu",
    english: "Good morning",
    category: "greeting",
  },

  // ── Transport ──
  {
    id: 14,
    japanese: "駅はどこですか？",
    furigana: "<ruby>駅<rp>(</rp><rt>えき</rt><rp>)</rp></ruby>はどこですか？",
    romaji: "Eki wa doko desu ka?",
    english: "Where is the station?",
    category: "transport",
  },
  {
    id: 15,
    japanese: "切符をください",
    furigana: "<ruby>切符<rp>(</rp><rt>きっぷ</rt><rp>)</rp></ruby>をください",
    romaji: "Kippu o kudasai",
    english: "A ticket, please",
    category: "transport",
  },
  {
    id: 16,
    japanese: "この電車は東京に行きますか？",
    furigana: "この<ruby>電車<rp>(</rp><rt>でんしゃ</rt><rp>)</rp></ruby>は<ruby>東京<rp>(</rp><rt>とうきょう</rt><rp>)</rp></ruby>に<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>きますか？",
    romaji: "Kono densha wa Toukyou ni ikimasu ka?",
    english: "Does this train go to Tokyo?",
    category: "transport",
  },
  {
    id: 17,
    japanese: "次の停車駅はどこですか？",
    furigana: "<ruby>次<rp>(</rp><rt>つぎ</rt><rp>)</rp></ruby>の<ruby>停車駅<rp>(</rp><rt>ていしゃえき</rt><rp>)</rp></ruby>はどこですか？",
    romaji: "Tsugi no teisha-eki wa doko desu ka?",
    english: "What is the next stop?",
    category: "transport",
  },

  // ── Shopping ──
  {
    id: 18,
    japanese: "いくらですか？",
    furigana: "いくらですか？",
    romaji: "Ikura desu ka?",
    english: "How much is it?",
    category: "shopping",
  },
  {
    id: 19,
    japanese: "これをください",
    furigana: "これをください",
    romaji: "Kore o kudasai",
    english: "This one, please",
    category: "shopping",
  },
  {
    id: 20,
    japanese: "カードで払えますか？",
    furigana: "カードで<ruby>払<rp>(</rp><rt>はら</rt><rp>)</rp></ruby>えますか？",
    romaji: "Kaado de haraemasu ka?",
    english: "Can I pay by card?",
    category: "shopping",
  },
  {
    id: 21,
    japanese: "免税はできますか？",
    furigana: "<ruby>免税<rp>(</rp><rt>めんぜい</rt><rp>)</rp></ruby>はできますか？",
    romaji: "Menzei wa dekimasu ka?",
    english: "Is tax-free available?",
    category: "shopping",
  },

  // ── Emergency ──
  {
    id: 22,
    japanese: "助けてください",
    furigana: "<ruby>助<rp>(</rp><rt>たす</rt><rp>)</rp></ruby>けてください",
    romaji: "Tasukete kudasai",
    english: "Please help me",
    category: "emergency",
  },
  {
    id: 23,
    japanese: "病院はどこですか？",
    furigana: "<ruby>病院<rp>(</rp><rt>びょういん</rt><rp>)</rp></ruby>はどこですか？",
    romaji: "Byouin wa doko desu ka?",
    english: "Where is the hospital?",
    category: "emergency",
  },
  {
    id: 24,
    japanese: "警察を呼んでください",
    furigana: "<ruby>警察<rp>(</rp><rt>けいさつ</rt><rp>)</rp></ruby>を<ruby>呼<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>んでください",
    romaji: "Keisatsu o yonde kudasai",
    english: "Please call the police",
    category: "emergency",
  },
  {
    id: 25,
    japanese: "英語を話せる人はいますか？",
    furigana: "<ruby>英語<rp>(</rp><rt>えいご</rt><rp>)</rp></ruby>を<ruby>話<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>せる<ruby>人<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>はいますか？",
    romaji: "Eigo o hanaseru hito wa imasu ka?",
    english: "Is there someone who speaks English?",
    category: "emergency",
  },

  // ── Restaurant ──
  {
    id: 26,
    japanese: "メニューをください",
    furigana: "メニューをください",
    romaji: "Menyuu o kudasai",
    english: "The menu, please",
    category: "restaurant",
  },
  {
    id: 27,
    japanese: "お会計お願いします",
    furigana: "お<ruby>会計<rp>(</rp><rt>かいけい</rt><rp>)</rp></ruby>お<ruby>願<rp>(</rp><rt>ねが</rt><rp>)</rp></ruby>いします",
    romaji: "Okaikei onegai shimasu",
    english: "The check, please",
    category: "restaurant",
  },
  {
    id: 28,
    japanese: "おいしいです",
    furigana: "おいしいです",
    romaji: "Oishii desu",
    english: "It's delicious",
    category: "restaurant",
  },
  {
    id: 29,
    japanese: "おすすめは何ですか？",
    furigana: "おすすめは<ruby>何<rp>(</rp><rt>なん</rt><rp>)</rp></ruby>ですか？",
    romaji: "Osusume wa nan desu ka?",
    english: "What do you recommend?",
    category: "restaurant",
  },
  {
    id: 30,
    japanese: "二人です",
    furigana: "<ruby>二人<rp>(</rp><rt>ふたり</rt><rp>)</rp></ruby>です",
    romaji: "Futari desu",
    english: "Two people (party of two)",
    category: "restaurant",
  },
  {
    id: 31,
    japanese: "予約があります",
    furigana: "<ruby>予約<rp>(</rp><rt>よやく</rt><rp>)</rp></ruby>があります",
    romaji: "Yoyaku ga arimasu",
    english: "I have a reservation",
    category: "restaurant",
  },
];

export const categories = [
  { key: "all" as const, label: "All" },
  { key: "greeting" as const, label: "Greetings" },
  { key: "restaurant" as const, label: "Restaurant" },
  { key: "dietary" as const, label: "Dietary" },
  { key: "shopping" as const, label: "Shopping" },
  { key: "transport" as const, label: "Transport" },
  { key: "emergency" as const, label: "Emergency" },
];
