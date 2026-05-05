window.addEventListener("load", function () {

  console.log("heatmap init");

  if (!window.blogPosts || !Array.isArray(window.blogPosts)) {
    console.warn("blogPosts missing");
    return;
  }

  const container = document.getElementById("heatmap");
  const streakEl = document.getElementById("streak");
  const weekbar = document.getElementById("weekbar");

  if (!container || !streakEl || !weekbar) {
    console.warn("DOM missing", {
      container,
      streakEl,
      weekbar
    });
    return;
  }

  const map = {};
  window.blogPosts.forEach(p => {
    map[p.date] = (map[p.date] || 0) + 1;
  });

  const fmt = d => d.toISOString().split("T")[0];
  const today = new Date();

  let temp = 0;
  let max = 0;

  for (let i = 364; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);

    const key = fmt(d);
    const count = map[key] || 0;

    const cell = document.createElement("div");
    cell.className = "cell";

    if (count >= 3) cell.classList.add("l4");
    else if (count === 2) cell.classList.add("l3");
    else if (count === 1) cell.classList.add("l1");

    if (count > 0) {
      temp++;
      max = Math.max(max, temp);
    } else {
      temp = 0;
    }

    container.appendChild(cell);
  }

  streakEl.innerHTML =
    "🔥 Current streak: " + temp + " days  🏆 Max streak: " + max + " days";

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);

    const key = fmt(d);
    const count = map[key] || 0;

    const bar = document.createElement("div");
    bar.className = "week-day";
    bar.style.height = (10 + count * 10) + "px";

    weekbar.appendChild(bar);
  }

});