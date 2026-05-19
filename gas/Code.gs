/**
 * ============================================
 * MINOVA - Google Apps Script (GAS)
 * Google Sheets をCMSとして使い、JSON APIとして公開するコード
 *
 * 使い方：
 * 1. Google Sheets を作成し、以下のシートを作る
 *    - news
 *    - projects
 *    - members
 *    - site_settings
 * 2. 下記の SPREADSHEET_ID を自分のスプレッドシートIDに差し替える
 * 3. このコードを Apps Script に貼り付ける
 * 4. デプロイ → ウェブアプリ → アクセスできるユーザー「全員」でデプロイ
 * 5. 取得したURLを js/cms.js の GAS_API_URL に設定する
 * ============================================
 */

// ★ ここを自分のスプレッドシートIDに差し替えてください
var SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";

/**
 * GETリクエストを処理する関数
 * URLパラメータ ?type=news / ?type=projects / ?type=members / ?type=site_settings で切り替え
 */
function doGet(e) {
  var type = e.parameter.type || "news";

  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(type);

    if (!sheet) {
      return createJsonResponse({ error: "シート '" + type + "' が見つかりません" });
    }

    var data = getSheetData(sheet, type);
    return createJsonResponse(data);
  } catch (error) {
    return createJsonResponse({ error: error.message });
  }
}

/**
 * シートのデータを取得する
 * published列がTRUEの行のみ返す（site_settingsは除く）
 *
 * @param {Sheet} sheet - Google Sheetsのシートオブジェクト
 * @param {string} type - データタイプ
 * @returns {Array} データの配列
 */
function getSheetData(sheet, type) {
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();

  if (values.length < 2) {
    return [];
  }

  // 1行目をヘッダーとして使用
  var headers = values[0];
  var rows = values.slice(1);

  // published列のインデックスを取得
  var publishedIndex = headers.indexOf("published");

  var result = [];

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];

    // site_settings以外はpublished列でフィルタリング
    if (type !== "site_settings" && publishedIndex >= 0) {
      // published が TRUE または "TRUE" の行だけ返す
      var publishedValue = row[publishedIndex];
      if (publishedValue !== true && publishedValue !== "TRUE" && publishedValue !== "true") {
        continue;
      }
    }

    // 行データをオブジェクトに変換
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      var key = headers[j];
      var value = row[j];

      // 日付型の場合はフォーマットする
      if (value instanceof Date) {
        obj[key] = Utilities.formatDate(value, "Asia/Tokyo", "yyyy.MM.dd");
      } else {
        obj[key] = value;
      }
    }

    result.push(obj);
  }

  return result;
}

/**
 * JSONレスポンスを生成する
 *
 * @param {Object|Array} data - レスポンスデータ
 * @returns {TextOutput} JSONレスポンス
 */
function createJsonResponse(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * ==============================
 * Google Sheets の列構成
 * ==============================
 *
 * --- news シート ---
 * | date | title | category | summary | image_url | url | published |
 * | 2025.10.2 | 100Banchに採択されました。 | NEWS | 説明文... | https://drive.google.com/uc?export=view&id=XXX | https://... | TRUE |
 *
 * --- projects シート ---
 * | title | category | summary | image_url | url | published |
 * | 共創ワークショップ運営 | ワークショップ | 説明文... | https://drive.google.com/uc?export=view&id=XXX | # | TRUE |
 *
 * --- members シート ---
 * | name | affiliation | role | comment | image_url | group | published |
 * | 山田 太郎 | ○○大学 工学部 | プロジェクトリーダー | 共創を通じて... | https://drive.google.com/uc?export=view&id=XXX | TOM JAPAN | TRUE |
 *
 * --- site_settings シート ---
 * | key | value |
 * | site_name | 一般社団法人MINOVA |
 * | contact_email | tom.japan001@gmail.com |
 */
