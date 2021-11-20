import "./css/index.css";
const rows = document.querySelectorAll("#ul ul li");
const html = document.documentElement;
console.log(import.meta.env);
document.addEventListener("scroll", (e) => {
  let scrolled = html.scrollTop / (html.scrollHeight - html.clientHeight);

  let total = 1 / rows.length;

  for (let [index, row] of rows.entries()) {
    let start = total * index;
    let end = total * (index + 1);

    // 每个li在当前屏幕所处的进度 0 - 1
    let progress = (scrolled - start) / (end - start);

    // 边界控制
    if (progress >= 1) progress = 1;
    if (progress <= 0) progress = 0;
    row.style.setProperty("--progress", progress);
  }
});
