function fixLinks(container, prefix) {
  // 修正 <a>
  container.querySelectorAll("a[href]").forEach(a => {
    const href = a.getAttribute("href");
    if (href && !href.startsWith("http") && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
      a.setAttribute("href", prefix + href);
    }
  });

  // 修正 <img>
  container.querySelectorAll("img[src]").forEach(img => {
    const src = img.getAttribute("src");
    if (src && !src.startsWith("http")) {
      img.setAttribute("src", prefix + src);
    }
  });
}

function getPrefix() {
  const pathParts = window.location.pathname.split("/").filter(Boolean);

  // 假設根目錄就是專案的 base
  // depth = 0 → index.html
  // depth = 1 → /semiconductor/index.html
  const depth = pathParts.length > 1 ? pathParts.length - 1 : 0;

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
      fixLinks(footerEl, prefix);
    });
}

document.addEventListener("DOMContentLoaded", includePartials);
