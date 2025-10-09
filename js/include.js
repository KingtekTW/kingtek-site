// include.js：在所有頁面自動載入 header 與 footer，固定從網站根目錄抓
document.addEventListener("DOMContentLoaded", () => {
  // 載入 Header
  fetch("/partials/header.html")
    .then(res => res.text())
    .then(html => {
      const headerEl = document.getElementById("site-header");
      if (headerEl) headerEl.innerHTML = html;
    });

  // 載入 Footer
  fetch("/partials/footer.html")
    .then(res => res.text())
    .then(html => {
      const footerEl = document.getElementById("site-footer");
      if (footerEl) footerEl.innerHTML = html;
    });
});
