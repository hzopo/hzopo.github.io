(() => {
  // 🚫 移动端直接禁用（非常重要）
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  let lastTime = 0;
  const throttle = 10; // 数值越大越省性能（建议 8~20）

  // 🌙 判断深色模式
  const isDark = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const color = isDark
    ? "rgba(255,255,255,0.18)"
    : "rgba(0,0,0,0.15)";

  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastTime < throttle) return;
    lastTime = now;

    const dot = document.createElement("div");

    dot.style.position = "fixed";
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
    dot.style.width = "7px";
    dot.style.height = "7px";
    dot.style.borderRadius = "50%";
    dot.style.pointerEvents = "none";
    dot.style.zIndex = "9999";
    dot.style.transform = "translate(-50%, -50%)";

    // 🎨 颜色自适应
    dot.style.background = color;

    dot.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";

    document.body.appendChild(dot);

    requestAnimationFrame(() => {
      dot.style.opacity = "0";
      dot.style.transform = "translate(-50%, -50%) scale(2.2)";
    });

    setTimeout(() => {
      dot.remove();
    }, 650);
  });
})();