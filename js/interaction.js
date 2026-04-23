// =========================
// Clean Touch Feedback
// =========================

document.addEventListener("touchstart", function () {}, {
  passive: true,
});

document.addEventListener("click", function (e) {
  const el = e.target;

  // 只对按钮 / 链接加轻微反馈（不创建DOM）
  if (el.tagName === "A" || el.tagName === "BUTTON") {
    el.style.transform = "scale(0.97)";
    setTimeout(() => {
      el.style.transform = "";
    }, 120);
  }
});