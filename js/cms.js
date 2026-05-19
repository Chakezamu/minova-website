/* ============================================
   MINOVA - cms.js
   Google Sheets CMS連携（Google Apps Script API経由）

   使い方：
   1. Google Apps Script で gas/Code.gs をデプロイし、Web App URL を取得
   2. 下記の GAS_API_URL にその URL を設定
   3. Google Sheets にデータを入力すれば、サイトに自動反映されます
   ============================================ */

// GAS Web App URL（デプロイ後に差し替えてください）
const GAS_API_URL = "https://script.google.com/macros/s/XXXX/exec";

// --- フォールバック用の仮データ ---
const FALLBACK_NEWS = [
  {
    date: "2025.10.2",
    title: "100Banchに採択されました。",
    category: "NEWS",
    summary: "以下、設定済みのスタイル等のサンプルです。※お知らせ記事ページでは、タイトルに見出し1（H1）を設定…",
    image_url: "",
    url: "#",
  },
  {
    date: "2025.10.1",
    title: "クロープナーGIC ベストアクセシブルデザイン賞",
    category: "NEWS",
    summary: "",
    image_url: "",
    url: "#",
  },
  {
    date: "2025.10.1",
    title: "公益財団法人Soilに採択されました。",
    category: "NEWS",
    summary: "",
    image_url: "",
    url: "#",
  },
];

const FALLBACK_PROJECTS = [
  {
    title: "共創ワークショップ運営",
    category: "ワークショップ",
    summary: "Needknower・学生・専門家が集い、課題の整理からアイデア創出までを共創で行う場を設計・運営します。",
    image_url: "",
    url: "#",
  },
  {
    title: "プロトタイプ作成",
    category: "プロトタイプ",
    summary: "体験やサービスの試作を制作し、検証・改善を通じて社会実装につなげます。",
    image_url: "",
    url: "#",
  },
  {
    title: "Need-Knowerとの共創活動",
    category: "共創",
    summary: "当事者の声をもとに、共に課題を見立て解決策をつくる活動を行っています。",
    image_url: "",
    url: "#",
  },
];

const FALLBACK_MEMBERS = [
  {
    name: "山田 太郎",
    affiliation: "○○大学 工学部",
    role: "プロジェクトリーダー",
    comment: "共創を通じて社会を変えたい",
    image_url: "",
  },
  {
    name: "佐藤 花子",
    affiliation: "△△大学 デザイン学部",
    role: "デザイン担当",
    comment: "違いが価値になる文化をつくりたい",
    image_url: "",
  },
  {
    name: "鈴木 一郎",
    affiliation: "□□大学 情報学部",
    role: "エンジニア",
    comment: "テクノロジーで人の力になりたい",
    image_url: "",
  },
  {
    name: "田中 美咲",
    affiliation: "◇◇大学 福祉学部",
    role: "リサーチ担当",
    comment: "一人ひとりの声に耳を傾けたい",
    image_url: "",
  },
];

/**
 * GAS APIからデータを取得する
 * @param {string} type - "news" | "projects" | "members"
 * @returns {Promise<Array>}
 */
async function fetchCMSData(type) {
  try {
    const response = await fetch(`${GAS_API_URL}?type=${type}`);
    if (!response.ok) throw new Error("API Error");
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`CMS データ取得失敗 (${type}): フォールバックデータを使用します`, error);
    // フォールバックデータを返す
    switch (type) {
      case "news":
        return FALLBACK_NEWS;
      case "projects":
        return FALLBACK_PROJECTS;
      case "members":
        return FALLBACK_MEMBERS;
      default:
        return [];
    }
  }
}

/**
 * 画像URLを生成する
 * Google DriveのURLまたはローカルパスに対応
 * @param {string} url - 画像URL
 * @param {string} fallbackText - 画像がない場合のテキスト
 * @returns {string} HTML文字列
 */
function renderImage(url, fallbackText, className) {
  if (url && url.trim() !== "") {
    return `<img src="${url}" alt="${fallbackText}" class="${className}">`;
  }
  return `<div class="${className} ${className}--placeholder">${fallbackText}</div>`;
}

/**
 * ニュースリストを描画する
 * @param {string} containerId - 描画先のHTML要素のID
 * @param {number} limit - 表示件数（0で全件）
 */
async function renderNewsList(containerId, limit) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const newsData = await fetchCMSData("news");
  const items = limit > 0 ? newsData.slice(0, limit) : newsData;

  if (items.length === 0) return;

  container.innerHTML = items
    .map(function (item) {
      return `
      <a href="${item.url || "#"}" class="news-list__item">
        ${renderImage(item.image_url, "Coming soon", "news-list__image")}
        <div class="news-list__content">
          <div class="news-list__meta">
            <span class="news-list__category">${item.category || "NEWS"}</span>
            <span class="news-list__date">${item.date || ""}</span>
          </div>
          <h3 class="news-list__title">${item.title || ""}</h3>
          ${item.summary ? `<p class="news-list__summary">${item.summary}</p>` : ""}
        </div>
      </a>
    `;
    })
    .join("");
}

/**
 * プロジェクトカードを描画する
 * @param {string} containerId - 描画先のHTML要素のID
 * @param {number} limit - 表示件数（0で全件）
 */
async function renderProjectCards(containerId, limit) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const projectData = await fetchCMSData("projects");
  const items = limit > 0 ? projectData.slice(0, limit) : projectData;

  if (items.length === 0) return;

  container.innerHTML = items
    .map(function (item) {
      return `
      <div class="card">
        ${renderImage(item.image_url, "仮画像", "card__image")}
        <div class="card__body">
          <span class="card__category">${item.category || ""}</span>
          <h3 class="card__title">${item.title || ""}</h3>
          <p class="card__summary">${item.summary || ""}</p>
        </div>
      </div>
    `;
    })
    .join("");
}

/**
 * メンバーカードを描画する
 * @param {string} containerId - 描画先のHTML要素のID
 */
async function renderMemberCards(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const memberData = await fetchCMSData("members");

  if (memberData.length === 0) return;

  container.innerHTML = memberData
    .map(function (member) {
      return `
      <div class="member-card">
        ${renderImage(member.image_url, "仮画像", "member-card__photo")}
        <p class="member-card__name">${member.name || ""}</p>
        <p class="member-card__affiliation">${member.affiliation || ""}</p>
        <p class="member-card__role">${member.role || ""}</p>
        ${member.comment ? `<p class="member-card__comment">「${member.comment}」</p>` : ""}
      </div>
    `;
    })
    .join("");
}

// --- ページ読み込み時にCMSデータを取得・描画 ---
document.addEventListener("DOMContentLoaded", function () {
  // ニュースリスト（各ページに存在する場合に描画）
  renderNewsList("newsList", 0);

  // プロジェクトカード
  renderProjectCards("projectCards", 0);

  // メンバーカード
  renderMemberCards("memberCards");
});
