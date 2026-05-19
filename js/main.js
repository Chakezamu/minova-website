/* ============================================
   MINOVA - main.js
   ナビゲーション、スクロールアニメーション、フォーム処理
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // --- ハンバーガーメニュー ---
  const hamburger = document.getElementById("hamburger");
  const globalNav = document.getElementById("globalNav");
  const navOverlay = document.getElementById("navOverlay");

  if (hamburger && globalNav) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("is-active");
      globalNav.classList.toggle("is-open");
      if (navOverlay) {
        navOverlay.classList.toggle("is-visible");
      }
      // aria属性の切り替え
      const isOpen = globalNav.classList.contains("is-open");
      hamburger.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
      hamburger.setAttribute("aria-expanded", isOpen);
    });

    // オーバーレイクリックで閉じる
    if (navOverlay) {
      navOverlay.addEventListener("click", function () {
        hamburger.classList.remove("is-active");
        globalNav.classList.remove("is-open");
        navOverlay.classList.remove("is-visible");
        hamburger.setAttribute("aria-label", "メニューを開く");
        hamburger.setAttribute("aria-expanded", "false");
      });
    }

    // ナビリンククリックで閉じる（モバイル）
    globalNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("is-active");
        globalNav.classList.remove("is-open");
        if (navOverlay) {
          navOverlay.classList.remove("is-visible");
        }
      });
    });
  }

  // --- スクロールフェードインアニメーション ---
  const fadeElements = document.querySelectorAll(".fade-in");

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- お問い合わせフォーム処理 ---
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = document.getElementById("submitBtn");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "送信中...";
      }

      // フォームデータの取得
      const formData = new FormData(contactForm);
      const data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      /*
        フォーム送信先の差し替え方法：

        1. Google Forms の場合：
           contactForm の action 属性を Google Forms の URL に変更し、
           各 input の name 属性を Google Forms の entry ID に合わせてください。

        2. Google Apps Script の場合：
           以下のコメントアウトを解除し、GAS_FORM_URL を設定してください。
      */

      // --- GAS フォーム送信（後から有効化） ---
      /*
      const GAS_FORM_URL = "https://script.google.com/macros/s/XXXX/exec";

      fetch(GAS_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function () {
          alert("お問い合わせありがとうございます。送信が完了しました。");
          contactForm.reset();
        })
        .catch(function () {
          alert("送信に失敗しました。お手数ですが、メールにてお問い合わせください。");
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "送信";
          }
        });
      */

      // --- 仮の送信処理（上記GAS連携が有効になったらこのブロックを削除） ---
      setTimeout(function () {
        alert("お問い合わせありがとうございます。（現在テストモードです。実際の送信は行われていません。）");
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "送信";
        }
      }, 1000);
    });
  }

  // --- ヘッダースクロール時のスタイル変更 ---
  const header = document.querySelector(".header");

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        header.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
      } else {
        header.style.boxShadow = "none";
      }
    });
  }
});
