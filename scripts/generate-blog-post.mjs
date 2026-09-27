/**
 * ヤング軒 ブログ自動投稿
 *
 * Claude Haiku で 1日1記事を content/blog に生成する。
 * - 店舗の事実は STORE_FACTS に固定し、それ以外の事実を書かせない
 * - 未使用のテーマから1つ選び、既存記事とのバイグラム類似度で重複を弾く
 * - zod 相当の手書きバリデーションで壊れた出力を弾く
 *
 * 実行: ANTHROPIC_API_KEY=... node scripts/generate-blog-post.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-haiku-4-5-20251001';
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const MAX_SIMILARITY = 0.42;
const MAX_ATTEMPTS = 3;

/* ------------------------------------------------------------------ *
 * 店舗の事実（これ以外を事実として書かせない）
 * ------------------------------------------------------------------ */
const STORE_FACTS = `
【ヤング軒の確定情報 / これ以外の事実を書いてはいけない】
- 店名：ヤング軒（正式には「おいしい寄り道 ヤング軒」）
- 業態：たこ焼きが名物の寄り道どころ。店内のカウンターでお酒とおつまみを楽しめる（居酒屋・ちょい飲み・一人飲み・二軒目利用）。店頭の貼り紙は「立ち飲みもやってるよ！」、提灯は「立呑」
- 店内：カウンター越しにテレビモニターがあり、スポーツ観戦をしながら一杯楽しめる
- 住所：〒154-0004 東京都世田谷区太子堂4丁目5-1 スーパーヘアーヤング内
- アクセス：東急田園都市線・東急世田谷線 三軒茶屋駅から徒歩約4分、世田谷通り沿い
- 営業時間：16:00〜22:00
- 定休日：水曜日・日曜日
- たこ焼き：北海道産の大だこを使い、職人の大ちゃんが焼く屋台のたこ焼き。外はカリッと中はとろっと。良質なこめ油を使い、油は少なめ。すべて6個入り・税込
- たこ焼きの味と価格：ソース／ソースマヨ／からしマヨ／マヨ七味／岩塩／岩塩ペッパーが700円。きざみワサビ（当店オリジナル）／ガーリックマヨが800円
- 寄り道セット：たこ焼き三種盛り6個入り（きざみワサビ・ソースマヨ・岩塩ペッパーを各2個）＋お好きなドリンク1杯で税込1,200円。選べるドリンクは缶ビール・ヤングハイ（ジンジャーハイボール）・ハイボール・レモンサワー・焼酎
- ドリンク：缶ビール各種・瓶ビール（ハイネケン・ハートランド・バドワイザー）が500円。ヤングハイボール（ジンジャー／自家製ジンジャーが香る）、角ハイボール、レモンサワー、はちみつレモンサワー、コークハイ、カルピスサワー、緑茶ハイ、ウーロンハイが600円。ソフトドリンク（コーラ・オレンジジュース・クラフトジンジャーエール・レモネード・レモンスカッシュ・緑茶・烏龍茶）が各350円。焼酎は単品価格を書かない
- おつまみ：きゅうりの塩キムチ、セロリ漬け、山形名物のすもっち（やわらかい燻製たまご）、焼き鳥・鯖・いか・赤貝などの缶つまみ（銘柄は書かない）。おつまみの価格は未確認なので金額を書かない
- 甘いもの：ピーチメルバ 450円
- スタイル：店内のカウンターで立ち飲み。たこ焼きのテイクアウト可
- 歴史：同じ場所にある理髪店「スーパーヘアーヤング」は1923年創業で3代続く。創業時の屋号は「理髪ヤング軒」で、昭和40年に二代目が渡米を経験したことをきっかけに「スーパーヘアーヤング」へ改名。創業100年の節目に三代目が最初の屋号から名前をとって「ヤング軒」を開いた
`.trim();

const FORBIDDEN = `
【厳守】
- 上の確定情報に無い事実（席数・予約・喫煙可否・電話番号・SNS・クーポン・キャンペーン・受賞歴・具体的な待ち時間・食感や味の断定的な描写）を書かない
- 着席できる席の有無は未確認。「席がない」「カウンターだけ」「立ち飲み専門」「席を待つ必要がない」のように席を否定する断定を書かない
- 他店の店名・価格・評判を書かない。三軒茶屋の他の店を具体名で紹介しない
- 存在しないメニュー・サービス・イベントを作らない
- 営業時間・定休日・価格を推測で変えない。書くときは確定情報のまま書く
- 「至福のひととき」「こだわり抜いた逸品」「心ゆくまでご堪能ください」のようなテンプレ飲食店表現を使わない
- 誇張した断定（日本一・絶対・必ず満足）を使わない
`.trim();

/* ------------------------------------------------------------------ *
 * 記事テーマ（1記事1検索意図）
 * ------------------------------------------------------------------ */
const TOPICS = [
  { slug: 'sangenjaya-hitori-nomi', title: '三軒茶屋で一人飲みするなら', intent: '三軒茶屋 一人飲み', category: '一人飲み', links: ['/drink', '/access'] },
  { slug: 'sangenjaya-choinomi', title: '三軒茶屋でちょい飲みを楽しむ', intent: '三軒茶屋 ちょい飲み', category: 'ちょい飲み', links: ['/drink', '/menu'] },
  { slug: 'takoyaki-ni-au-osake', title: 'たこ焼きに合うお酒', intent: 'たこ焼き 酒 合う', category: 'お酒', links: ['/menu', '/takoyaki'] },
  { slug: 'shigoto-gaeri-ippai', title: '仕事帰りに三軒茶屋で一杯', intent: '三軒茶屋 仕事帰り 一杯', category: 'ちょい飲み', links: ['/drink', '/access'] },
  { slug: 'sangenjaya-nikenme', title: '三軒茶屋で二軒目を探すなら', intent: '三軒茶屋 二軒目', category: 'ちょい飲み', links: ['/drink', '/takoyaki'] },
  { slug: 'sangenjaya-senbero', title: '三軒茶屋のせんべろ文化', intent: '三軒茶屋 せんべろ', category: 'ちょい飲み', links: ['/drink', '/menu'] },
  { slug: 'sangenjaya-to-takoyaki', title: '三軒茶屋とたこ焼き', intent: '三軒茶屋 たこ焼き', category: 'たこ焼き', links: ['/takoyaki', '/menu'] },
  { slug: 'taishido-kigaru-nomu', title: '太子堂で気軽に飲める場所', intent: '太子堂 居酒屋', category: '三軒茶屋の街', links: ['/access', '/drink'] },
  { slug: 'sangenjaya-tachinomi', title: '三軒茶屋の立ち飲み文化', intent: '三軒茶屋 立ち飲み', category: 'ちょい飲み', links: ['/drink', '/about'] },
  { slug: 'takoyaki-to-highball', title: 'たこ焼きとハイボール', intent: 'たこ焼き ハイボール', category: 'お酒', links: ['/menu', '/takoyaki'] },
  { slug: 'sangenjaya-machi-no-rekishi', title: '三軒茶屋という街の歴史', intent: '三軒茶屋 歴史', category: '三軒茶屋の街', links: ['/barber', '/about'] },
  { slug: 'super-hair-young', title: 'スーパーヘアーヤングという床屋', intent: 'スーパーヘアーヤング 三軒茶屋', category: '三軒茶屋の街', links: ['/barber', '/about'] },
  { slug: 'sangenjaya-hyakunen', title: '三軒茶屋で100年以上続くということ', intent: '三軒茶屋 老舗 100年', category: '三軒茶屋の街', links: ['/barber', '/about'] },
  { slug: 'sangenjaya-yoru-no-sugoshikata', title: '三軒茶屋の、仕事帰りの過ごし方', intent: '三軒茶屋 夜 過ごし方', category: '三軒茶屋の街', links: ['/drink', '/blog'] },
  { slug: 'sangenjaya-eki-shuhen', title: '三軒茶屋駅周辺の楽しみ方', intent: '三軒茶屋 駅周辺', category: '三軒茶屋の街', links: ['/access', '/about'] },
  { slug: 'takoyaki-aji-no-erabikata', title: 'たこ焼きの味の選び方', intent: 'たこ焼き 味 種類', category: 'たこ焼き', links: ['/takoyaki', '/menu'] },
  { slug: 'takoyaki-takeout-sangenjaya', title: '三軒茶屋でたこ焼きをテイクアウトする', intent: '三軒茶屋 たこ焼き テイクアウト', category: 'たこ焼き', links: ['/takoyaki', '/access'] },
  { slug: 'hitori-de-hairiyasui-mise', title: '一人でも入りやすい店の条件', intent: '三軒茶屋 一人 居酒屋', category: '一人飲み', links: ['/drink', '/about'] },
  { slug: 'machiawase-mae-no-ippai', title: '待ち合わせ前の一杯という選択', intent: '三軒茶屋 待ち合わせ', category: '一人飲み', links: ['/drink', '/access'] },
  { slug: 'kizami-wasabi-takoyaki', title: 'きざみワサビのたこ焼きという食べ方', intent: 'たこ焼き わさび', category: 'たこ焼き', links: ['/takoyaki', '/menu'] },
  { slug: 'ginger-highball', title: 'ジンジャーハイボールという一杯', intent: 'ジンジャーハイボール', category: 'お酒', links: ['/menu', '/drink'] },
  { slug: 'kanzume-tsumami', title: '缶つまみで飲むということ', intent: '缶つまみ 居酒屋', category: 'お酒', links: ['/menu', '/drink'] },
  { slug: 'sangenjaya-yasui-izakaya', title: '三軒茶屋で安く飲みたいときに', intent: '三軒茶屋 安い 居酒屋', category: 'ちょい飲み', links: ['/drink', '/menu'] },
  { slug: 'saku-nomi-no-susume', title: 'サク飲みのすすめ', intent: '三軒茶屋 サク飲み', category: 'ちょい飲み', links: ['/drink', '/about'] },
  { slug: 'toko-ya-to-machi', title: '床屋が街の寄り合い所だった頃', intent: '床屋 街 コミュニティ', category: '三軒茶屋の街', links: ['/barber', '/about'] },
  { slug: 'sangenjaya-izakaya-erabi', title: '三軒茶屋で居酒屋を選ぶときに見ていること', intent: '三軒茶屋 居酒屋', category: '居酒屋', links: ['/menu', '/drink'] },
  { slug: 'chiisana-izakaya', title: '小さな店で飲むということ', intent: '三軒茶屋 小さい 居酒屋', category: '居酒屋', links: ['/about', '/menu'] },
  { slug: 'tsumami-to-ippai', title: 'つまみ一品と、お酒一杯', intent: '三軒茶屋 おつまみ 居酒屋', category: '居酒屋', links: ['/menu', '/drink'] },
  { slug: 'kyuri-no-kimchi', title: 'きゅうりの塩キムチという一品', intent: 'きゅうり キムチ つまみ', category: '居酒屋', links: ['/menu', '/drink'] },
  { slug: 'sangenjaya-yoru-hitori-gohan', title: '三軒茶屋でひとりの夜ごはんに困ったら', intent: '三軒茶屋 一人 ごはん 夜', category: '一人飲み', links: ['/menu', '/access'] },
];

/* ------------------------------------------------------------------ *
 * ユーティリティ
 * ------------------------------------------------------------------ */
const todayIso = () => {
  const now = new Date(Date.now() + 9 * 60 * 60 * 1000); // JST
  return now.toISOString().slice(0, 10);
};

const readExisting = () => {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
      const titleMatch = raw.match(/^title:\s*(?:"|')?(.*?)(?:"|')?\s*$/m);
      return {
        slug: f.replace(/\.md$/, ''),
        title: titleMatch ? titleMatch[1] : '',
        body: raw,
      };
    });
};

/** 文字バイグラムの Dice 係数 */
const bigrams = (s) => {
  const t = s.replace(/\s+/g, '');
  const out = new Set();
  for (let i = 0; i < t.length - 1; i += 1) out.add(t.slice(i, i + 2));
  return out;
};

const similarity = (a, b) => {
  const A = bigrams(a);
  const B = bigrams(b);
  if (A.size === 0 || B.size === 0) return 0;
  let inter = 0;
  for (const g of A) if (B.has(g)) inter += 1;
  return (2 * inter) / (A.size + B.size);
};

/* ------------------------------------------------------------------ *
 * 生成
 * ------------------------------------------------------------------ */
const buildPrompt = (topic, existingTitles) => `
あなたは、東京・三軒茶屋にある「ヤング軒」の店主に代わって、公式サイトのブログを書くライターです。
ヤング軒はたこ焼きが名物の寄り道どころで、店内のカウンターでお酒とおつまみも楽しめます。

${STORE_FACTS}

${FORBIDDEN}

【今回の記事】
- テーマ：${topic.title}
- 想定検索意図：「${topic.intent}」で検索した人が知りたいこと
- カテゴリ：${topic.category}

【文章の決まり】
- 日本語。全体で900〜1400文字程度
- 1記事1テーマ。検索意図に最初の3行で答える
- 一文は60文字以内を目安に、短く歯切れよく
- 三軒茶屋の街の空気が伝わる、人間味のある文章にする
- 大げさな広告表現を使わず、事実と情景で書く
- 見出しは ## と ### を使う（# は使わない）
- ## は3〜4個。### は必要なところだけ
- 箇条書きは多用しない。使うなら1箇所まで
- 本文中に、次の内部リンクをMarkdownリンクとして自然に埋め込む（必ず2つとも使う）
  - ${topic.links[0]}
  - ${topic.links[1]}
- リンクのアンカーテキストは「こちら」ではなく内容が分かる日本語にする

【すでに公開済みの記事タイトル（内容が被らないようにする）】
${existingTitles.length ? existingTitles.map((t) => `- ${t}`).join('\n') : '- （まだありません）'}

【出力形式】
次のJSONだけを出力すること。前後に説明文やコードフェンスを付けない。
{
  "title": "自然な日本語のタイトル。26〜40文字程度。検索意図の語を自然に含める",
  "description": "記事の要約。80〜115文字。この記事を読むと何が分かるかを書く",
  "body": "Markdown本文。## から始める。タイトル（#）は含めない"
}
`.trim();

const validate = (data) => {
  const errors = [];
  if (typeof data?.title !== 'string' || data.title.length < 12 || data.title.length > 60) {
    errors.push(`title の長さが不正: ${data?.title?.length}`);
  }
  if (
    typeof data?.description !== 'string' ||
    data.description.length < 50 ||
    data.description.length > 140
  ) {
    errors.push(`description の長さが不正: ${data?.description?.length}`);
  }
  if (typeof data?.body !== 'string' || data.body.length < 600) {
    errors.push(`body が短すぎる: ${data?.body?.length}`);
  }
  if (typeof data?.body === 'string') {
    if (/^#\s/m.test(data.body)) errors.push('body に h1 (#) が含まれている');
    if (!/^##\s/m.test(data.body)) errors.push('body に ## 見出しが無い');
    const links = [...data.body.matchAll(/\]\((\/[a-z0-9/-]*)\)/g)].map((m) => m[1]);
    if (links.length < 2) errors.push(`内部リンクが足りない: ${links.length}`);
    const allowed = ['/about', '/takoyaki', '/menu', '/drink', '/access', '/barber', '/blog'];
    const bad = links.filter((l) => !allowed.includes(l));
    if (bad.length) errors.push(`存在しないリンク: ${bad.join(', ')}`);
    if (/https?:\/\//.test(data.body)) errors.push('外部リンクが含まれている');
  }
  return errors;
};

const extractJson = (text) => {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = (fenced ? fenced[1] : text).trim();
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('JSONが見つかりません');
  return JSON.parse(raw.slice(start, end + 1));
};

/** 記事を1本つくって書き出す。成功したら slug、テーマ切れなら null を返す。 */
async function generateOne(client, date) {
  const existing = readExisting();
  const usedSlugs = new Set(existing.map((p) => p.slug.replace(/^\d{4}-\d{2}-\d{2}-/, '')));
  const candidates = TOPICS.filter((t) => !usedSlugs.has(t.slug));

  if (candidates.length === 0) {
    console.log('未使用のテーマがありません。TOPICS を追加してください。');
    return null;
  }
  if (existing.some((p) => p.slug.startsWith(date))) {
    console.log(`${date} の記事はすでに存在します。スキップします。`);
    return null;
  }

  const topic = candidates[Math.floor(Math.random() * candidates.length)];
  const existingTitles = existing.map((p) => p.title).filter(Boolean);

  let article = null;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    console.log(`生成中 (${attempt}/${MAX_ATTEMPTS}) ${date}: ${topic.title}`);

    // DRY_RUN_FIXTURE を指定するとAPIを呼ばずに、検証〜書き出しだけを確認できる
    const text = process.env.DRY_RUN_FIXTURE
      ? fs.readFileSync(process.env.DRY_RUN_FIXTURE, 'utf8')
      : await client.messages
          .create({
            model: MODEL,
            max_tokens: 4000,
            temperature: 0.85,
            messages: [{ role: 'user', content: buildPrompt(topic, existingTitles) }],
          })
          .then((res) => res.content.map((c) => (c.type === 'text' ? c.text : '')).join(''));

    let data;
    try {
      data = extractJson(text);
    } catch (err) {
      console.warn(`  JSONの解析に失敗: ${err.message}`);
      continue;
    }

    const errors = validate(data);
    if (errors.length) {
      console.warn(`  検証エラー: ${errors.join(' / ')}`);
      continue;
    }

    const worst = existing.reduce((max, p) => Math.max(max, similarity(data.body, p.body)), 0);
    if (worst > MAX_SIMILARITY) {
      console.warn(`  既存記事と似すぎ (${worst.toFixed(2)})`);
      continue;
    }

    article = data;
    break;
  }

  if (!article) throw new Error(`有効な記事を生成できませんでした（${topic.title}）`);

  // 直近の記事2本を関連記事として紐づける
  const related = existing
    .map((p) => p.slug)
    .filter(Boolean)
    .sort((a, b) => (a < b ? 1 : -1))
    .slice(0, 2);

  const slug = `${date}-${topic.slug}`;
  const frontmatter = [
    '---',
    `title: ${JSON.stringify(article.title)}`,
    `description: ${JSON.stringify(article.description)}`,
    `date: "${date}"`,
    `category: ${JSON.stringify(topic.category)}`,
    `intent: ${JSON.stringify(topic.intent)}`,
    `related:${related.length ? `\n${related.map((r) => `  - ${JSON.stringify(r)}`).join('\n')}` : ' []'}`,
    '---',
    '',
  ].join('\n');

  fs.writeFileSync(
    path.join(BLOG_DIR, `${slug}.md`),
    `${frontmatter}${article.body.trim()}\n`,
    'utf8',
  );
  console.log(`書き出しました: content/blog/${slug}.md`);
  console.log(`  ${article.title}`);
  return slug;
}

/** 直近の記事日付から今日までの、まだ記事がない日を古い順に返す（最大 max 件） */
function missingDates(max) {
  const existing = readExisting();
  const have = new Set(existing.map((p) => p.slug.slice(0, 10)));
  const today = todayIso();

  const out = [];
  const cursor = new Date(`${today}T00:00:00Z`);
  cursor.setUTCDate(cursor.getUTCDate() - (max - 1));

  while (out.length < max) {
    const iso = cursor.toISOString().slice(0, 10);
    if (!have.has(iso)) out.push(iso);
    if (iso === today) break;
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return out;
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey && !process.env.DRY_RUN_FIXTURE) {
    console.error(
      [
        'ANTHROPIC_API_KEY が設定されていません。',
        'GitHub のリポジトリ設定 > Secrets and variables > Actions に',
        'ANTHROPIC_API_KEY を登録してください。',
      ].join('\n'),
    );
    process.exit(1);
  }

  fs.mkdirSync(BLOG_DIR, { recursive: true });

  // POSTS=3 のように指定すると、記事のない直近の日を古い順に埋める（取りこぼしの追いつき用）
  const requested = Math.max(1, Math.min(7, Number(process.env.POSTS || 1) || 1));
  const dates = requested === 1 ? [todayIso()] : missingDates(requested);

  if (dates.length === 0) {
    console.log('追加する日がありません。');
    return;
  }

  const client = apiKey ? new Anthropic({ apiKey }) : null;
  const written = [];

  for (const date of dates) {
    try {
      const slug = await generateOne(client, date);
      if (slug !== null) written.push(slug);
    } catch (err) {
      // 複数日を埋めている途中の失敗は、その日だけ諦めて次へ進む
      if (dates.length === 1) throw err;
      console.warn(`  ${date} は生成できませんでした: ${err.message}`);
    }
  }

  if (written.length === 0 && dates.length === 1) {
    throw new Error('記事を生成できませんでした。');
  }
  console.log(written.length ? `${written.length}本を追加しました。` : '追加はありませんでした。');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
