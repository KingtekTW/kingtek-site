const faLink = document.createElement("link");
faLink.rel = "stylesheet";
faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css";
document.head.appendChild(faLink);

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


            const icon = toggleBtn.querySelector("i");
            if (icon) {
              icon.classList.toggle("fa-bars");
              icon.classList.toggle("fa-xmark");
            }
          });
        }

        // 處理所有 back-btn（桌機＋手機）
        const backBtns = document.querySelectorAll(".back-btn");
        const isHome = location.pathname === "/" || location.pathname === "/index.html";

        backBtns.forEach(btn => {
          if (isHome) {
            btn.style.display = "none";
          } else {
            btn.style.display = "block";
            btn.addEventListener("click", () => history.back());
          }
        });
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