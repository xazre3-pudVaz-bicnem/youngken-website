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
    alt: '夜のヤング軒。白い提灯と理容店のサインポール、開店祝いの花が並ぶ三軒茶屋の店先',
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
  signboardSet: {
    src: '/photos/signboard-set.jpg',
    width: 1108,
    height: 1477,
    alt: '店頭の立て看板。「寄り道セット たこ焼き三種盛＋お好きなドリンク1杯 990円」と営業時間が書かれている',
    position: '50% 50%',
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;
