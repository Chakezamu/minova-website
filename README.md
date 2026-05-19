# 一般社団法人MINOVA 公式サイト

一般社団法人MINOVAの公式Webサイトです。HTML / CSS / JavaScript で構築された静的サイトで、Cloudflare Pages で公開する想定です。

## サイト概要

MINOVAは、Needknower、多様な専門性を持つ学生・専門家が協働し、企業や自治体と共創し、社会に変化をもたらすムーブメントを生み出す一般社団法人です。

## ファイル構成

```
minova-website/
├── index.html          # トップページ（Home）
├── about.html          # MINOVAについて（About）
├── projects.html       # 私たちの仕事（Project）
├── news.html           # お知らせ（Event / News）
├── tom-japan.html      # TOM JAPAN
├── contact.html        # お問い合わせ（Contact）
├── css/
│   └── style.css       # メインスタイルシート
├── js/
│   ├── main.js         # ナビゲーション、アニメーション、フォーム処理
│   └── cms.js          # Google Sheets CMS連携
├── assets/
│   └── images/         # 画像ファイル（仮画像 → Google Drive画像に差し替え）
├── gas/
│   └── Code.gs         # Google Apps Script（Sheets→JSON API）
└── README.md           # このファイル
```

## 各ページの役割

| ページ | ファイル | 内容 |
|--------|----------|------|
| Home | index.html | Hero、Vision概要、仕事概要、プロジェクト、お知らせ、TOM JAPAN導線、お問い合わせ導線 |
| About | about.html | Vision詳細、代表メッセージ、法人情報テーブル |
| Project | projects.html | 共創ワークショップ運営、プロトタイプ作成、プロジェクト一覧 |
| Event / News | news.html | お知らせ一覧、イベント、活動報告 |
| TOM JAPAN | tom-japan.html | TOM JAPANとは、MINOVAとの関係、活動内容、学生メンバー紹介 |
| Contact | contact.html | お問い合わせフォーム |

## ローカルで確認する方法

### 方法1: VS Code Live Server

1. VS Code に「Live Server」拡張機能をインストール
2. `minova-website` フォルダを VS Code で開く
3. `index.html` を右クリック → 「Open with Live Server」

### 方法2: Python

```bash
cd minova-website
python -m http.server 8080
```

ブラウザで `http://localhost:8080` を開く

### 方法3: Node.js

```bash
npx serve minova-website
```

## 画像を差し替える方法

### 方法1: ローカル画像ファイルに差し替え

1. `assets/images/` に画像を配置
2. HTML内の該当箇所を変更

```html
<!-- 変更前（プレースホルダー） -->
<div class="hero__bg hero__bg--placeholder"></div>

<!-- 変更後（実画像） -->
<div class="hero__bg" style="background-image: url('assets/images/hero.jpg')"></div>
```

### 方法2: Google Drive画像URLに差し替え

1. Google Drive に画像をアップロード
2. 画像を右クリック → 「共有」→「リンクを知っている全員」に変更
3. 共有リンクからファイルIDを取得

```
共有リンク: https://drive.google.com/file/d/FILE_ID/view
画像URL:   https://drive.google.com/uc?export=view&id=FILE_ID
```

4. HTML内の画像URLを差し替え

```html
<img src="https://drive.google.com/uc?export=view&id=FILE_ID" alt="説明文">
```

### CMSから画像を表示する場合

Google Sheets の `image_url` 列に上記の画像URLを入力すれば、自動的にサイトに表示されます。

## Google Sheets CMS の列構成

### news シート

| 列名 | 説明 | 例 |
|------|------|-----|
| date | 日付 | 2025.10.2 |
| title | タイトル | 100Banchに採択されました。 |
| category | カテゴリ | NEWS |
| summary | 概要 | 説明文... |
| image_url | 画像URL | https://drive.google.com/uc?export=view&id=XXX |
| url | リンク先URL | https://... |
| published | 公開フラグ | TRUE |

### projects シート

| 列名 | 説明 | 例 |
|------|------|-----|
| title | タイトル | 共創ワークショップ運営 |
| category | カテゴリ | ワークショップ |
| summary | 概要 | 説明文... |
| image_url | 画像URL | https://drive.google.com/uc?export=view&id=XXX |
| url | リンク先URL | # |
| published | 公開フラグ | TRUE |

### members シート

| 列名 | 説明 | 例 |
|------|------|-----|
| name | 名前 | 山田 太郎 |
| affiliation | 所属 | ○○大学 工学部 |
| role | 役割 | プロジェクトリーダー |
| comment | ひとこと | 共創を通じて社会を変えたい |
| image_url | 写真URL | https://drive.google.com/uc?export=view&id=XXX |
| group | グループ | TOM JAPAN |
| published | 公開フラグ | TRUE |

### site_settings シート

| 列名 | 説明 | 例 |
|------|------|-----|
| key | 設定キー | site_name |
| value | 設定値 | 一般社団法人MINOVA |

## Google Apps Script の設定方法

1. [Google Sheets](https://sheets.google.com) で新しいスプレッドシートを作成
2. 上記の列構成に従って `news`, `projects`, `members`, `site_settings` シートを作成
3. メニュー → 「拡張機能」→「Apps Script」を開く
4. `gas/Code.gs` の内容をコピーして貼り付け
5. コード内の `YOUR_SPREADSHEET_ID_HERE` を自分のスプレッドシートIDに差し替え

```
スプレッドシートのURL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
→ SPREADSHEET_ID の部分をコピー
```

6. 「デプロイ」→「新しいデプロイ」
7. 種類：「ウェブアプリ」
8. 実行するユーザー：「自分」
9. アクセスできるユーザー：「全員」
10. 「デプロイ」をクリック
11. 表示されたURLをコピー

## GAS API URL を cms.js に設定する方法

1. `js/cms.js` を開く
2. 先頭付近にある以下の行を見つける

```javascript
const GAS_API_URL = "https://script.google.com/macros/s/XXXX/exec";
```

3. `XXXX` の部分を、デプロイで取得したURLに差し替える

```javascript
const GAS_API_URL = "https://script.google.com/macros/s/あなたのデプロイID/exec";
```

## お問い合わせフォームの送信先を設定する方法

### Google Apps Script で受信する場合

1. `js/main.js` を開く
2. お問い合わせフォーム処理のコメントアウト部分を解除
3. `GAS_FORM_URL` にデプロイURLを設定

### Google Forms に送信する場合

1. Google Forms でフォームを作成
2. `contact.html` の `<form>` タグの `action` 属性を Google Forms の送信URLに変更
3. 各 `<input>` の `name` 属性を Google Forms の `entry.XXXXX` に合わせる

## Cloudflare Pages で公開する手順

### 方法1: GitHubリポジトリ連携

1. `minova-website` フォルダをGitHubリポジトリにプッシュ
2. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
3. 「Workers & Pages」→「Pages」→「Create a project」
4. 「Connect to Git」→ GitHubリポジトリを選択
5. ビルド設定：
   - フレームワーク：「None」
   - ビルドコマンド：（空欄）
   - ビルド出力ディレクトリ：`/`（またはリポジトリ内のフォルダ名）
6. 「Save and Deploy」

### 方法2: ダイレクトアップロード

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
2. 「Workers & Pages」→「Pages」→「Create a project」
3. 「Direct Upload」を選択
4. `minova-website` フォルダをドラッグ＆ドロップでアップロード
5. 「Deploy site」

### デプロイ後の確認

- Cloudflare Pages が自動で `プロジェクト名.pages.dev` のURLを発行します
- このURLでサイトが公開されます

## 独自ドメインを設定する場合

1. Cloudflare Dashboard →「Workers & Pages」→ プロジェクトを選択
2. 「Custom domains」→「Set up a custom domain」
3. 独自ドメインを入力（例: `minova.org`）
4. DNSレコードの設定指示に従う
   - ドメインが Cloudflare で管理されている場合：自動設定
   - 他のレジストラの場合：CNAME レコードを設定

## よく編集する箇所

| 変更内容 | 編集ファイル | 場所 |
|----------|------------|------|
| Hero のキャッチコピー | index.html | `.hero__copy` 内 |
| Vision の文言 | index.html, about.html | `.vision__heading`, `.vision__text` 内 |
| 法人情報 | about.html | `.info-table` 内 |
| お問い合わせ先 | js/main.js | `GAS_FORM_URL` |
| CMS データソース | js/cms.js | `GAS_API_URL` |
| サイト全体の色・フォント | css/style.css | 先頭のCSS変数・body要素 |
| ナビゲーション | 全HTMLファイル | `<header>` 内の `<nav>` |
| フッター | 全HTMLファイル | `<footer>` 内 |
| OGP画像・URL | 全HTMLファイル | `<head>` 内の `og:` メタタグ |
