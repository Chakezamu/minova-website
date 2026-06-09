/* ============================================
   MINOVA - cms.js
   ローカルJSONファイルからデータを読み込み、ページに描画する

   データファイル:
   - data/news.json      … お知らせ
   - data/projects.json   … プロジェクト
   - data/members.json    … MINOVAメンバー
   - data/tom-members.json … TOM JAPAN 学生メンバー
   ============================================ */

/**
 * JSONファイルからデータを取得する
 * @param {string} type - "news" | "projects" | "members" | "tom-members"
 * @returns {Promise<Array>}
 */
async function fetchCMSData(type) {
  try {
    const response = await fetch(`data/${type}.json`);
    if (!response.ok) throw new Error("Fetch Error");
    return await response.json();
  } catch (error) {
    console.warn(`データ取得失敗 (${type}):`, error);
    return [];
  }
}

/**
 * 画像URLを生成する
 * @param {string} url - 画像URL
 * @param {string} fallbackText - 画像がない場合のテキスト
 * @param {string} className - CSSクラス名
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
 * @param {string} dataType - "members" | "tom-members"
 */
async function renderMemberCards(containerId, dataType) {
  const container = document.getElementById(containerId);
  if (!container) return;

  var type = dataType || "members";
  const memberData = await fetchCMSData(type);

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

// --- ページ読み込み時にデータを取得・描画 ---
document.addEventListener("DOMContentLoaded", function () {
  // ニュースリスト
  renderNewsList("newsList", 0);

  // プロジェクトカード
  renderProjectCards("projectCards", 0);

  // MINOVAメンバーカード
  renderMemberCards("minovaMemberCards", "members");

  // TOM JAPAN 学生メンバーカード
  renderMemberCards("memberCards", "tom-members");
});
