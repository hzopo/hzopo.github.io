(function () {
  const wait = setInterval(() => {
    const el = document.getElementById("der-footer-msg");
    if (!el) return;
    clearInterval(wait);

    function set(msg) {
      el.style.opacity = 0;
      setTimeout(() => {
        el.innerText = msg;
        el.style.opacity = 1;
      }, 300);
    }

    // ===== 🎲 初始随机 =====
    const startMsgs = [
      "👀 刚来？随便看看",
      "🧠 这里可能没啥有用的",
      "😏 你点进来干嘛",
      "📄 又一篇废话文学",
      "🤨 这网站居然被你点进来了",
      "🫵 盯着屏幕干嘛"
    ];
    set(startMsgs[Math.floor(Math.random() * startMsgs.length)]);

    // ===== ⏳ 停留时间吐槽（递进）=====
    setTimeout(() => set("😏 你已经看了挺久了"), 10000);
    setTimeout(() => set("🧠 你不会认真在看吧"), 30000);
    setTimeout(() => set("🤨 还在？有点东西"), 60000);
    setTimeout(() => set("😳 你是真不打算走了吗"), 120000);

    // ===== 🌙 时间段判断 =====
    const hour = new Date().getHours();
    if (hour >= 1 && hour <= 5) {
      set("🌙 不睡觉？狠人");
    } else if (hour >= 6 && hour < 12) {
      set("☀️ 早上好（虽然我觉得你还没醒）");
    } else if (hour >= 12 && hour < 18) {
      set("🌤️ 下午摸鱼是吧");
    } else if (hour >= 18 && hour < 24) {
      set("🌆 晚上还来看博客？可以的");
    }

    // ===== 🔁 切标签页 =====
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        set("👀 切走了？我看见了");
      } else {
        const backMsgs = [
          "😳 又回来了",
          "👀 还没放弃我这个网站啊",
          "😏 我就知道你会回来",
        ];
        set(backMsgs[Math.floor(Math.random() * backMsgs.length)]);
      }
    });

    // ===== 🖱️ 鼠标离开（PC）=====
    document.addEventListener("mouseleave", (e) => {
      if (e.clientY < 0) {
        set("👋 要走了吗");
      }
    });

    // ===== 📜 滚动到底触发 =====
    window.addEventListener("scroll", () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        const bottomMsgs = [
          "📜 翻到底了？没了",
          "😏 居然被你看完了",
          "🧠 你真的全看了？",
        ];
        set(bottomMsgs[Math.floor(Math.random() * bottomMsgs.length)]);
      }
    });

    // ===== ⌨️ 快速滚动（判断在“狂刷”）=====
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      let now = Date.now();
      if (now - lastScroll < 50) {
        set("🚀 别刷这么快，我还没准备好");
      }
      lastScroll = now;
    });

    // ===== 💤 长时间不动 =====
    let idleTimer;
    function resetIdle() {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        set("😴 人呢？挂机了？");
      }, 20000);
    }

    ["mousemove", "scroll", "keydown"].forEach(evt => {
      document.addEventListener(evt, resetIdle);
    });

    resetIdle();

    // ===== 🎯 点击页面 =====
    document.addEventListener("click", () => {
      const clickMsgs = [
        "🖱️ 别点了没彩蛋",
        "👀 你在找啥",
        "😏 点来点去的",
      ];
      set(clickMsgs[Math.floor(Math.random() * clickMsgs.length)]);
    });

  }, 500);
})();