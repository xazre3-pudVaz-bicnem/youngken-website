/** public/photos の写真台帳。alt は写っているものだけを書く。 */

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** object-position の初期値（横長トリミング時の見え方調整） */
  position?: string;
};

export const PHOTOS = {
  storefront: {
    src: '/photos/storefront.jpg',
    width: 960,
    height: 1706,
    alt: 'ヤング軒の店頭。赤い壁に「おいしい寄り道 ヤング軒 三軒茶屋」の看板と、たこ焼き・立呑の提灯が灯る夜の外観',
    position: '50% 45%',
  },
  exteriorNight: {
    src: '/photos/exterior-night.jpg',
    width: 1108,
    height: 1477,
    alt: '夜のヤング軒。白い提灯と理容店のサインポール、開店祝いの花が並ぶ三軒茶屋の店構え',
    position: '52% 40%',
  },
  exteriorWide: {
    src: '/photos/exterior-wide.jpg',
    width: 1108,
    height: 1477,
    alt: 'スーパーヘアーヤングの看板の隣に並ぶヤング軒の店構え。三軒茶屋の路地から見た夜景',
    position: '55% 42%',
  },
  takoyakiSauce: {
    src: '/photos/takoyaki-sauce.jpg',
    width: 1108,
    height: 1477,
    alt: 'ソースをかけ、青のりとかつお節をのせたヤング軒のたこ焼き',
    position: '50% 50%',
  },
  takoyakiMayo: {
    src: '/photos/takoyaki-mayo.jpg',
    width: 1108,
    height: 1477,
    alt: '舟皿に盛られたソースマヨネーズのたこ焼き6個',
    position: '50% 50%',
  },
  takoyakiMayo2: {
    src: '/photos/takoyaki-mayo-2.jpg',
    width: 1108,
    height: 1477,
    alt: 'ソースとマヨネーズがかかった焼きたてのたこ焼きの寄り',
    position: '50% 50%',
  },
  takoyakiSalt: {
    src: '/photos/takoyaki-salt.jpg',
    width: 1108,
    height: 1477,
    alt: 'マヨネーズだけをかけた岩塩味のたこ焼き。カウンターの木のぬくもりが写る',
    position: '50% 50%',
  },
  takoyakiWasabi: {
    src: '/photos/takoyaki-wasabi.jpg',
    width: 1338,
    height: 1224,
    alt: '当店オリジナルのきざみワサビをのせたたこ焼き。舟皿が三つ並ぶ',
    position: '50% 50%',
  },
  staffCounter: {
    src: '/photos/staff-counter.jpg',
    width: 1477,
    height: 1108,
    alt: 'カウンター越しに笑うヤング軒のふたり。背後の棚には缶つまみとお酒、たこ焼きとドリンクの黒板が並ぶ',
    position: '50% 50%',
  },
  kitchen: {
    src: '/photos/kitchen.jpg',
    width: 1477,
    height: 1108,
    alt: '「大」の文字が入った黒いTシャツで、たこ焼きを一つずつ返していくヤング軒の焼き場',
    position: '50% 50%',
  },

  /* ---- 2026-09-15 追加分 ---- */
  takoyakiWasabiHighball: {
    src: '/photos/takoyaki-wasabi-highball.jpg',
    width: 1477,
    height: 1108,
    alt: 'マヨネーズと青のりの上にきざみワサビをのせたたこ焼き6個。奥にジョッキのお酒と調味料が並ぶ',
    position: '50% 60%',
  },
  takoyakiPepperLift: {
    src: '/photos/takoyaki-pepper-lift.jpg',
    width: 1477,
    height: 1108,
    alt: '岩塩ペッパーのたこ焼きを一つ、箸で持ち上げたところ。舟皿に残りの5個',
    position: '55% 50%',
  },
  takoyakiSauceMayo: {
    src: '/photos/takoyaki-sauce-mayo.jpg',
    width: 1477,
    height: 1108,
    alt: 'ソースとマヨネーズにかつお節をたっぷりのせたたこ焼き',
    position: '50% 55%',
  },
  takoyakiPepper: {
    src: '/photos/takoyaki-pepper.jpg',
    width: 1477,
    height: 1108,
    alt: 'マヨネーズに青のりと黒こしょうをかけた岩塩ペッパーのたこ焼き6個',
    position: '50% 55%',
  },
  takoyakiSanshu: {
    src: '/photos/takoyaki-sanshu.jpg',
    width: 1036,
    height: 497,
    alt: 'きざみワサビ・ソースマヨ・岩塩ペッパーを2個ずつ盛ったたこ焼きの三種盛り',
    position: '20% 50%',
  },
  otsumamiSet: {
    src: '/photos/otsumami-set.jpg',
    width: 1108,
    height: 1477,
    alt: 'カウンターに並んだたこ焼きの三種盛りと、セロリ漬けの小鉢、山形名物すもっちの袋',
    position: '50% 55%',
  },
  peachMelba: {
    src: '/photos/peach-melba.jpg',
    width: 960,
    height: 1706,
    alt: 'カップに盛ったピーチメルバ。丸ごとの桃にミントの葉がのる',
    position: '50% 40%',
  },

  /* ---- 2026-09-15 追加分その2 ---- */
  counterTv: {
    src: '/photos/counter-tv.jpg',
    width: 1477,
    height: 660,
    alt: 'カウンター越しの壁に掛かったテレビモニターでサッカーの試合が映っている。下の棚には缶ビールや缶つまみ、お酒の瓶が並ぶ',
    position: '62% 50%',
  },
  takoyakiMix: {
    src: '/photos/takoyaki-mix.jpg',
    width: 1108,
    height: 1477,
    alt: 'マヨネーズ、ソースとかつお節、マヨネーズと黒こしょうの3種類を盛り合わせたたこ焼き。黒い板皿に割り箸が添えてある',
    position: '50% 45%',
  },
  logoDai: {
    src: '/photos/logo-dai.jpg',
    width: 1024,
    height: 1024,
    alt: '焦げ茶の生地に金色で円と「大」の字、その下に「ヤング軒」と入ったロゴ',
  },
  /**
   * 昔の写真（店側から「百年床屋の過去の画像」として届いたもの）。
   * 撮影年と写っている人物は未確認なので、alt とキャプションで年代や人名を断定しないこと。
   */
  barberOldInterior: {
    src: '/photos/barber-old-interior.jpg',
    width: 1425,
    height: 1148,
    alt: 'セピア色の古い写真。昔の理髪店の店内で、白い仕事着の理容師たちが客の髪を整えている',
    position: '50% 40%',
  },
  barberOldExterior: {
    src: '/photos/barber-old-exterior.jpg',
    width: 936,
    height: 1352,
    alt: 'セピア色の古い写真。看板に「理」「ヤ」の文字が見える、格子窓と木の扉のある昔の理髪店の店構え',
    position: '50% 55%',
  },
  /** 生田誠氏提供。表示するときは必ずクレジットを添える */
  oldTram: {
    src: '/photos/old-tram.jpg',
    width: 750,
    height: 464,
    alt: 'セピア色の古い写真。線路を走る路面電車と、番号「17」の入った貨車の上に立つ人',
    position: '50% 50%',
  },

  /** 店側で作ったメニュー表・ポスター（文字を読ませたいので ratio="auto" で全体を見せる） */
  yorimichiSetPoster: {
    src: '/photos/yorimichi-set-poster.jpg',
    width: 1024,
    height: 1536,
    alt: 'たこ焼き寄り道セットのポスター。きざみワサビ・ソースマヨ・岩塩ペッパーの3種類各2個に、お好きなアルコールドリンク1杯つきで税込1,200円。選べるドリンクは缶ビール・ヤングハイ・ハイボール・レモンサワー・焼酎',
  },
  menuTakoyaki: {
    src: '/photos/menu-takoyaki.jpg',
    width: 1024,
    height: 1536,
    alt: 'たこ焼きのメニュー表。ソース・ソースマヨ・からしマヨ・マヨ七味・岩塩・岩塩ペッパーが6個入り700円、きざみワサビとガーリックマヨが800円。すべて税込',
  },
  menuDrink: {
    src: '/photos/menu-drink.jpg',
    width: 1024,
    height: 1536,
    alt: 'ドリンクのメニュー表。缶ビールと瓶ビールが500円、角ハイボール・ヤングハイボール・レモンサワー・コークハイ・はちみつレモンサワー・カルピスサワー・緑茶ハイ・ウーロンハイが600円、ソフトドリンクが各350円',
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;
