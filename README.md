# ヤング軒 公式サイト

東京都世田谷区太子堂・三軒茶屋のたこ焼き／立ち飲み処「ヤング軒」の公式サイト。

Next.js 16（App Router）+ TypeScript + Tailwind CSS v4。

---

## セットアップ

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_SITE_URL を設定
npm run dev
```

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー |
| `npm run build` / `npm start` | 本番ビルド・起動 |
| `npm run typecheck` | TypeScript 型チェック |
| `npm run lint` | ESLint |
| `npm run blog:generate` | ブログ記事を1本生成（要 `ANTHROPIC_API_KEY`） |
| `npm run fonts:fetch` | 明朝Webフォントを `public/fonts` へ取得し直す |
| `npm run og:build` | `public/og-image.jpg` を再生成 |
| `npm run photos:prepare` | 元写真を `public/photos` へ最適化（`PHOTO_SRC` に元フォルダを指定） |

---

## 環境変数

| 変数 | 必須 | 内容 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 本番のみ | 本番ドメイン（例 `https://yangken.jp`）。**未設定だと canonical・OGP・JSON-LD のURL・sitemap を出力せず、`robots.txt` が全面 Disallow になる。** プレビュー環境の誤インデックスを構造的に防ぐための仕組みなので、本番以外では設定しないこと。 |
| `ANTHROPIC_API_KEY` | ブログ生成時 | Claude API キー。GitHub Actions では Secrets に登録。 |

GitHub Actions のビルド確認で本番URLを使いたい場合は、リポジトリ変数（Variables）に `NEXT_PUBLIC_SITE_URL` を設定する。

---

## 情報の出どころ（重要）

このサイトに書いてよい店舗情報は、**店頭の看板・黒板・貼り紙・立て看板の写真、および既存LPで確認できた内容だけ**。
推測でメニューや条件を足さないこと。

一次情報は次の3ファイルに集約してある。表示もJSON-LDもここから生成される。

| ファイル | 内容 |
| --- | --- |
| `src/lib/site.ts` | 店名・NAP・アクセス・営業時間・定休日・百年床屋の沿革 |
| `src/lib/menu.ts` | たこ焼きの味と価格、寄り道セット、ドリンク |
| `src/lib/photos.ts` | 写真台帳（パス・寸法・alt・トリミング位置） |

確認できている事実は以下のとおり。

- 住所：〒154-0004 東京都世田谷区太子堂4丁目5-1 スーパーヘアーヤング内
- アクセス：東急田園都市線・東急世田谷線 三軒茶屋駅 徒歩約4分
- 営業時間：16:00〜22:00／定休日：水曜・日曜
- たこ焼き 6個 700円（ソース／ソースマヨ／ソースからしマヨ／ソース七味マヨ／岩塩マヨ／岩塩ブラックペッパー）
- きざみワサビ（当店オリジナル）＝**価格未確認のため「店頭表示」と出している**
- 寄り道セット 990円（税込）＝たこ焼き三種盛＋お好きなドリンク1杯
- ドリンク 各500円（ヤングハイボール〈ジンジャー〉／角ハイボール／レモンサワー／ウーロンハイ／緑茶ハイ／缶ビール）

未確認のため**サイトにもJSON-LDにも出していない**もの：電話番号、SNS、座席数、予約可否、喫煙可否、緯度経度、開店日。
判明したら `src/lib/site.ts` に足し、`src/lib/jsonld.ts` の `sameAs` / `telephone` を有効化する。

---

## ページ構成

| パス | 役割 | 主な対策キーワード |
| --- | --- | --- |
| `/` | トップ | 三軒茶屋 たこ焼き / 三軒茶屋 居酒屋 |
| `/about` | 店の説明・FAQ | 三軒茶屋 たこ焼き 居酒屋 |
| `/takoyaki` | たこ焼きの詳細 | 三軒茶屋 たこ焼き |
| `/drink` | ちょい飲み・一人飲み・せんべろ | 三軒茶屋 ちょい飲み / 一人飲み / せんべろ |
| `/menu` | 料理・ドリンク一覧 | 三軒茶屋 たこ焼き 値段 |
| `/access` | 店舗情報・道順・地図 | 三軒茶屋 たこ焼き 場所 / 太子堂 居酒屋 |
| `/barber` | 百年床屋スーパーヘアーヤングの物語 | 三軒茶屋 老舗 |
| `/blog`, `/blog/[slug]` | ブログ | 記事ごとに1検索意図 |

役割を分けてカニバリを避けている。ページを足すときは既存ページと検索意図が重ならないか確認すること。

### 構造化データ

- `Restaurant`（全ページ・`@id` で共有）
- `WebSite`
- `BreadcrumbList`（下層ページ）
- `FAQPage`（`/about` `/takoyaki` `/drink` `/access`。設問はページごとに別内容）
- `BlogPosting`（記事ページ）

`NEXT_PUBLIC_SITE_URL` が未設定のときはURLを含む項目を出力しない。

---

## ブログ自動投稿

`.github/workflows/daily-blog.yml` が毎日 10:20 JST に `scripts/generate-blog-post.mjs` を実行し、
`content/blog/YYYY-MM-DD-<slug>.md` を1本追加して `main` に直接 push する。

- モデルは **Claude Haiku**（`claude-haiku-4-5-20251001`）。コスト都合で Sonnet / Opus は使わない
- テーマは `TOPICS` から未使用のものを1つ選ぶ（使い切ったら追記する）
- 店舗の事実は `STORE_FACTS` に固定。それ以外を事実として書かせない
- 出力は JSON で受け取り、タイトル/説明文の長さ、`##` 見出しの有無、内部リンク2本以上、
  存在しないパスへのリンク、外部リンクの混入をチェックしてから書き出す
- 既存記事とのバイグラム類似度が 0.42 を超えたら破棄して再生成（最大3回）
- 同じ日付の記事がすでにあれば何もしない

API を呼ばずに検証〜書き出しだけ試したいときは、モデル応答と同じ形の JSON をファイルに用意して

```bash
DRY_RUN_FIXTURE=./fixture.json npm run blog:generate
```

記事の frontmatter は `title` / `description` / `date` / `category` / `intent` / `related`。
`src/lib/blog.ts` が読み込み時に検証し、壊れた記事は一覧から自動的に外れる。

---

## フォントの扱い（触る前に読むこと）

見出しの明朝は **Shippori Mincho B1 を自前ホスト**している（`public/fonts/`）。

`next/font/google` で日本語フォントを読むと、unicode-range ごとの `@font-face` が
ページCSSに全部入りになる。実測で **465KB のレンダリングブロックCSS**になり、
モバイルの FCP が 1.9秒、LCP が 5.7秒まで悪化した（Lighthouse mobile 69点）。

そのため次のようにしている。

1. `npm run fonts:fetch` で Google Fonts の分割CSSと woff2 を `public/fonts` へ取り込む
2. `src/app/layout.tsx` の inline script が、そのCSSを `media="print"` → `onload` で `all` に切り替えて**非同期**に読む
3. 本文用のゴシックは**端末標準**（ヒラギノ／游ゴシック／Meiryo）。Webフォントを使わない

結果、実際にダウンロードされるのは使用文字を含む woff2 が2〜3チャンク（約60KB）だけ。
`next/font` に戻すと同じ問題が再発するので注意。

---

## 品質チェック（Lighthouse mobile）

| ページ | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| `/` | 88–90 | 100 | 100 | 100 |
| `/takoyaki` | 93 | 100 | 100 | 100 |
| `/drink` | 92–96 | 100 | 100 | 100 |
| `/menu` | 92–94 | 100 | 100 | 100 |
| `/access` | 81–97 | 100 | 100 | 100 |
| `/barber` | 83–98 | 100 | 100 | 100 |
| `/blog` | 94–98 | 98 | 100 | 100 |

CLS は全ページ 0、TBT は 0〜100ms。Performance の幅は計測環境のばらつき。
`/access` は Google マップ埋め込み（約330KB の外部JS）が乗る分だけ重い。

---

## デプロイ

Vercel を想定。

1. リポジトリを接続
2. 環境変数に `NEXT_PUBLIC_SITE_URL`（本番ドメイン）を設定
3. デプロイ後、Google Search Console に `sitemap.xml` を登録

独自ドメインを当てるまでは `NEXT_PUBLIC_SITE_URL` を設定しないでおけば、
プレビューURLがインデックスされることはない。
