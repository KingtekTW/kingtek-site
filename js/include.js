function includePartials() {
  // 取得目前網址路徑
  const path = window.location.pathname;

  // 判斷是不是子資料夾 (ex: /kingtek-site/semiconductor/index.html)
  const isSubPage = path.includes("/semiconductor/") || path.includes("/electronics/") || path.includes("/about/") || path.includes("/contact/");

  // 根據不同層級決定前綴
  const prefix = isSubPage ? "../" : "";

  // 載入 header
  fetch(prefix + "partials/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("site-header").innerHTML = data;
    });

  // 載入 footer
  fetch(prefix + "partials/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("site-footer").innerHTML = data;
    });
}

document.addEventListener("DOMContentLoaded", includePartials);
