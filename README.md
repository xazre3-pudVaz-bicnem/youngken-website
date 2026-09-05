# ヤング軒 公式サイト

東京都世田谷区太子堂・三軒茶屋の「ヤング軒」公式サイト。たこ焼きを名物にした小さな飲み屋で、店先のカウンターでお酒とおつまみも楽しめる。

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
| `npm run blog:generate` | ブログ記事を1本生成（要 `ANTHROPIC_API_KEY`）。`POSTS=3` で記事のない直近3日ぶんを埋める |
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
- きゅうりの旨キムチ（店内の黒板／価格未確認）
- 缶つまみ各種（焼き鳥・鯖・いか・赤貝など。棚の写真から確認）
- 寄り道セット 990円（税込）＝たこ焼き三種盛＋お好きなドリンク1杯
- ドリンク 各500円（ヤングハイボール〈ジンジャー〉／角ハイボール／レモンサワー／ウーロンハイ／緑茶ハイ／缶ビール）

未確認のため**サイトにもJSON-LDにも出していない**もの：電話番号、SNS、座席数、予約可否、喫煙可否、緯度経度、開店日。

**着席できる席の有無は未確認**。店頭の貼り紙は「立ち飲みもやってるよ！」、提灯は「立呑」で、立ち飲みで飲めることは確実だが、席がないとは言えない。
「カウンターだけ」「席を待つ必要がない」「立ち飲み専門」のように席を否定する断定を書かないこと。
判明したら `src/lib/site.ts` に足し、`src/lib/jsonld.ts` の `sameAs` / `telephone` を有効化する。

---

## ページ構成

| パス | 役割 | 主な対策キーワード |
| --- | --- | --- |
| `/` | トップ | 三軒茶屋 たこ焼き / 三軒茶屋 居酒屋 |
| `/about` | 店の説明・FAQ | 三軒茶屋 たこ焼き 居酒屋 |
| `/takoyaki` | たこ焼きの詳細 | 三軒茶屋 たこ焼き |
| `/drink` | ちょい飲み・一人飲み・せんべろ | 三軒茶屋 ちょい飲み / 一人飲み / せんべろ |
| `/menu` | 品書き（たこ焼き・おつまみ・お酒・予算） | 三軒茶屋 居酒屋 / 料理 / お酒 |
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
- `POSTS=3`（Actions の workflow_dispatch では入力欄）を渡すと、記事がない直近の日を古い順に最大7日ぶんまで埋める

### 本番で記事が増える仕組み

記事は **GitHub のリポジトリにコミットして永続化**する。Vercel は `main` への push を検知して
自動デプロイするので、記事は次のデプロイでサイトに反映される。

Vercel Cron や API Route でファイルを書く方式は使っていない。Vercel の実行環境の
ファイルシステムは書いても次のデプロイで消えるため、その方式では記事が残らない。
`vercel.json` も `CRON_SECRET` も不要。

### 動かないときに見るところ

1. GitHub の Settings > Secrets and variables > Actions に **`ANTHROPIC_API_KEY`** があるか
   （未登録だとワークフローの最初のステップで止まる）
2. Actions タブに `Daily blog post` の実行履歴があるか。無ければ手動実行（Run workflow）で確認する
3. スケジュール実行は**デフォルトブランチのワークフローだけ**が対象。`main` にマージされているか
4. GitHub は 60日間コミットの無いリポジトリのスケジュール実行を止める。毎日コミットが入る限り問題ない

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

Accessibility・Best Practices・SEO は全ページ **100**。CLS は全ページ **0**。
Performance はローカル計測で 76〜98 と振れる（同じページの連続実行で 97 → 76 になることがある）。
転送量は同じなので計測環境のノイズ。ならして 85〜95 前後。

`/access` は Google マップ埋め込み（約330KB の外部JS）が乗る分だけ重い。

計測するときは `next start` の直後を避け、**先に `curl` で2回叩いて温めてから**実行すること。
1本目は必ず低く出る。

---

## デプロイ

Vercel を想定。

1. リポジトリを接続
2. 環境変数に `NEXT_PUBLIC_SITE_URL`（本番ドメイン）を設定
3. デプロイ後、Google Search Console に `sitemap.xml` を登録

### 本番URLの切り替え

本番URLは `NEXT_PUBLIC_SITE_URL` **1か所だけ**で決まる。canonical・OGP・Twitter Card・
JSON-LD の `url` / `@id`・`sitemap.xml`・`robots.txt` はすべてここから組み立てている。
コードにドメインを直接書いている箇所は無いので、独自ドメイン接続時は Vercel の環境変数を
差し替えて再デプロイするだけでよい。

> **未設定のあいだはサイト全体が noindex になる。**
> `robots.txt` が `Disallow: /`、各ページが `noindex, nofollow`、`sitemap.xml` が空、
> canonical と OGP も出力されない。検索に載せたい段階になったら必ず設定すること。
