# 一般社団法人MINOVA 公式サイト

一般社団法人MINOVAの公式Webサイトです。HTML / CSS / JavaScript で構築された静的サイトで、GitHub Pages で公開しています。

## サイト概要

MINOVAは、Needknower、多様な専門性を持つ学生・専門家が協働し、企業や自治体と共創し、社会に変化をもたらすムーブメントを生み出す一般社団法人です。

## ファイル構成

```
minova-website/
├── index.html          # トップページ（Home）
├── about.html          # MINOVAについて（About）
├── projects.html       # 私たちの仕事（Project）
├── members.html        # メンバー紹介（Member）
├── news.html           # お知らせ（Event / News）
├── tom-japan.html      # TOM JAPAN
├── contact.html        # お問い合わせ（Contact）
├── css/
│   └── style.css       # メインスタイルシート
├── js/
│   ├── main.js         # ナビゲーション、アニメーション、フォーム処理
│   └── cms.js          # JSONデータ読み込み・描画
├── data/
│   ├── news.json       # お知らせデータ
│   ├── projects.json   # プロジェクトデータ
│   ├── members.json    # MINOVAメンバーデータ
│   └── tom-members.json # TOM JAPAN 学生メンバーデータ
├── assets/
│   └── images/         # 画像ファイル
└── README.md           # このファイル
```

## 各ページの役割

| ページ | ファイル | 内容 |
|--------|----------|------|
| Home | index.html | Hero、Vision概要、仕事概要、プロジェクト、お知らせ、TOM JAPAN導線、お問い合わせ導線 |
| About | about.html | Vision詳細、代表メッセージ、法人情報テーブル |
| Project | projects.html | 共創ワークショップ運営、プロトタイプ作成、プロジェクト一覧 |
| Member | members.html | MINOVAメンバー紹介 |
| Event / News | news.html | お知らせ一覧、イベント、活動報告 |
| TOM JAPAN | tom-japan.html | TOM JAPANとは、MINOVAとの関係、活動内容、学生メンバー紹介 |
| Contact | contact.html | お問い合わせフォーム |

## ローカルで確認する方法

GitHub Pages では静的ファイルが直接配信されますが、`cms.js` が `fetch()` でJSONを読み込むため、ローカルでもHTTPサーバーが必要です。

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

## データの更新方法

お知らせ、プロジェクト、メンバー等のデータは `data/` ディレクトリのJSONファイルで管理しています。

### data/news.json

```json
[
  {
    "date": "2025.10.2",
    "title": "記事タイトル",
    "category": "NEWS",
    "summary": "概要テキスト",
    "image_url": "assets/images/news-photo.jpg",
    "url": "リンク先URL"
  }
]
```

### data/projects.json

```json
[
  {
    "title": "プロジェクト名",
    "category": "カテゴリ",
    "summary": "概要テキスト",
    "image_url": "assets/images/project-photo.jpg",
    "url": "#"
  }
]
```

### data/members.json（MINOVAメンバー）

```json
[
  {
    "name": "名前",
    "affiliation": "所属",
    "role": "役割",
    "comment": "ひとこと",
    "image_url": "assets/images/member-photo.jpg"
  }
]
```

### data/tom-members.json（TOM JAPAN 学生メンバー）

同じ形式です。

## 画像を追加する方法

1. `assets/images/` に画像ファイルを配置
2. JSONファイルの `image_url` に相対パスを設定

```json
"image_url": "assets/images/photo.jpg"
```

## GitHub Pages で公開する手順

1. GitHubリポジトリにコードをプッシュ
2. リポジトリの Settings → Pages を開く
3. Source: 「Deploy from a branch」を選択
4. Branch: `main` / `/ (root)` を選択して Save
5. 数分後に `https://ユーザー名.github.io/minova-website/` で公開されます

## 独自ドメインを設定する場合

1. リポジトリの Settings → Pages → Custom domain にドメインを入力
2. DNSプロバイダで以下のいずれかを設定:
   - CNAME レコード: `ユーザー名.github.io` を指す
   - A レコード: GitHubのIPアドレスを指す

## よく編集する箇所

| 変更内容 | 編集ファイル | 場所 |
|----------|------------|------|
| Hero のキャッチコピー | index.html | `.hero__copy` 内 |
| Vision の文言 | index.html, about.html | `.vision__heading`, `.vision__text` 内 |
| 法人情報 | about.html | `.info-table` 内 |
| お知らせデータ | data/news.json | JSON直接編集 |
| プロジェクトデータ | data/projects.json | JSON直接編集 |
| MINOVAメンバーデータ | data/members.json | JSON直接編集 |
| TOM JAPANメンバーデータ | data/tom-members.json | JSON直接編集 |
| サイト全体の色・フォント | css/style.css | 先頭のCSS変数・body要素 |
| ナビゲーション | 全HTMLファイル | `<header>` 内の `<nav>` |
| フッター | 全HTMLファイル | `<footer>` 内 |
| OGP画像・URL | 全HTMLファイル | `<head>` 内の `og:` メタタグ |
