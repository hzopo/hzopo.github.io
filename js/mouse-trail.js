(() => {
  // 🚫 移动端禁用
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const points = [];
  const maxPoints = 18;

  const isDark = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const color = isDark
    ? "255,255,255"
    : "0,0,0";

  document.addEventListener("mousemove", (e) => {
    const point = {
      x: e.clientX,
      y: e.clientY,
      age: 0
    };

    points.push(point);

    if (points.length > maxPoints) {
      points.shift();
    }
  });

  function render() {
    // 清理旧的
    document.querySelectorAll(".trail-point").forEach(el => el.remove());

    points.forEach((p, i) => {
      p.age++;

      const div = document.createElement("div");
      div.className = "trail-point";

      const opacity = (i / points.length) * 0.35;

      div.style.position = "fixed";
      div.style.left = p.x + "px";
      div.style.top = p.y + "px";
      div.style.width = "10px";
      div.style.height = "10px";
      div.style.borderRadius = "50%";
      div.style.pointerEvents = "none";
      div.style.zIndex = "9999";

      div.style.background = `rgba(${color}, ${opacity})`;
      div.style.transform = "translate(-50%, -50%) scale(${0.6 + i * 0.05})";

      document.body.appendChild(div);
    });

    requestAnimationFrame(render);
  }

  render();
})();