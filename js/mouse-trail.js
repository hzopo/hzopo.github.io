(() => {
  // 🚫 移动端禁用
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const points = [];
  const maxPoints = 30;

  let last = { x: 0, y: 0, t: Date.now() };

  const isDark = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const color = isDark
    ? "255,255,255"
    : "0,0,0";

  document.addEventListener("mousemove", (e) => {
    const now = Date.now();

    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // 🧠 速度控制（越快轨迹越长）
    const speed = Math.min(dist * 0.4, 18);

    last = { x: e.clientX, y: e.clientY, t: now };

    points.push({
      x: e.clientX,
      y: e.clientY,
      life: 1,
      size: 6 + speed * 0.4
    });

    if (points.length > maxPoints) {
      points.shift();
    }
  });

  function draw() {
    document.querySelectorAll(".trail-point").forEach(el => el.remove());

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      p.life -= 0.04;

      const div = document.createElement("div");
      div.className = "trail-point";

      const opacity = Math.max(p.life, 0) * (i / points.length);

      div.style.position = "fixed";
      div.style.left = p.x + "px";
      div.style.top = p.y + "px";
      div.style.width = p.size + "px";
      div.style.height = p.size + "px";
      div.style.borderRadius = "50%";
      div.style.pointerEvents = "none";
      div.style.zIndex = "9999";

      // 🌈 核心：柔和流体感
      div.style.background = `rgba(${color}, ${opacity * 0.35})`;

      div.style.transform =
        `translate(-50%, -50%) scale(${0.6 + (1 - p.life)})`;

      document.body.appendChild(div);
    }

    // 🧹 清理死亡点
    for (let i = points.length - 1; i >= 0; i--) {
      if (points[i].life <= 0) {
        points.splice(i, 1);
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
})();