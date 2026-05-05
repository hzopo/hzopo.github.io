document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("heatmap");
  const streakEl = document.getElementById("streak");

  if (!container) return;

  const map = {};

  window.blogPosts.forEach(p => {
    map[p.date] = (map[p.date] || 0) + 1;
  });

  function fmt(d) {
    return d.toISOString().split("T")[0];
  }

  const today = new Date();

  let currentStreak = 0;
  let maxStreak = 0;
  let temp = 0;

  for (let i = 364; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);

    const key = fmt(d);
    const count = map[key] || 0;

    const cell = document.createElement("div");
    cell.className = "cell";

    if (count >= 3) cell.classList.add("l4");
    else if (count === 2) cell.classList.add("l3");
    else if (count === 1) cell.classList.add("l2");

    cell.title = `${key} · ${count} posts`;

    if (count > 0) {
      temp++;
      maxStreak = Math.max(maxStreak, temp);
    } else {
      temp = 0;
    }

    container.appendChild(cell);
  }

  streakEl.innerHTML = `
🔥 Current streak: ${temp} days  
🏆 Max streak: ${maxStreak} days
`;
});