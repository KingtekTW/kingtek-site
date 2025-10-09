document.addEventListener("DOMContentLoaded", () => {
  // 載入 Header
  fetch("/partials/header.html")
    .then(res => res.text())
    .then(html => {
      const headerEl = document.getElementById("site-header");
      if (headerEl) {
        headerEl.innerHTML = html;

        const toggleBtn = document.querySelector(".menu-toggle");
        const mobileMenu = document.getElementById("mobile-menu");

        if (toggleBtn && mobileMenu) {
          toggleBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("show");
          });
        }
      }
    });

  // 載入 Footer
  fetch("/partials/footer.html")
    .then(res => res.text())
    .then(html => {
      const footerEl = document.getElementById("site-footer");
      if (footerEl) footerEl.innerHTML = html;
    });
});
