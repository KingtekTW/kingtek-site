(function () {
  // 如果在 GitHub Pages，就加上 <base>
  if (window.location.hostname.includes("github.io")) {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const repo = pathParts[0]; // 例如 kingtek-site

    const base = document.createElement("base");
    base.href = "/" + repo + "/";  
    document.head.prepend(base);
  }
})();

function fixLinks(container, prefix) {
  // 修正 <a> 連結
  container.querySelectorAll("a[href]").forEach(a => {
    const href = a.getAttribute("href");
    if (href && !href.startsWith("http") && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
      a.setAttribute("href", prefix + href);
    }
  });

  // 修正 <img> 圖片
  container.querySelectorAll("img[src]").forEach(img => {
    const src = img.getAttribute("src");
    if (src && !src.startsWith("http")) {
      img.setAttribute("src", prefix + src);
    }
  });
}

function getPrefix() {
  const pathParts = window.location.pathname.split("/").filter(Boolean);

  // 找 repo 名稱 (ex: kingtek-site)
  const repoIndex = pathParts.indexOf("kingtek-site");

  // 算目前在 repo 裡的深度
  const depth = pathParts.length - (repoIndex + 1);

  let prefix = "";
  for (let i = 0; i < depth; i++) {
    prefix += "../";
  }
  return prefix;
}

function includePartials() {
  const prefix = getPrefix();

  // header
  fetch(prefix + "partials/header.html")
    .then(res => res.text())
    .then(data => {
      const headerEl = document.getElementById("site-header");
      headerEl.innerHTML = data;

      // 修正 header 裡的相對路徑
      fixLinks(headerEl, prefix);

      // 綁定漢堡選單
      const menuBtn = document.querySelector(".menu-toggle");
      const nav = document.querySelector(".nav-links");
      if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => {
          nav.classList.toggle("show");
        });
      }
    });

  // footer
  fetch(prefix + "partials/footer.html")
    .then(res => res.text())
    .then(data => {
      const footerEl = document.getElementById("site-footer");
      footerEl.innerHTML = data;

      // 修正 footer 裡的相對路徑
      fixLinks(footerEl, prefix);
    });
}

document.addEventListener("DOMContentLoaded", includePartials);
