document.addEventListener("DOMContentLoaded", () => {
  const tabLinks = document.querySelectorAll(".tab-link");
  const settingsPanels = document.querySelectorAll(".settings-panel");

  tabLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetTab = link.getAttribute("data-tab");

      tabLinks.forEach((l) => l.classList.remove("active"));
      settingsPanels.forEach((p) => p.classList.remove("active-panel"));

      link.classList.add("active");
      document.getElementById(targetTab).classList.add("active-panel");
    });
  });

  const themeButtons = document.querySelectorAll(".theme-btn");
  const body = document.body;

  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      themeButtons.forEach((b) => b.classList.remove("active-theme"));
      btn.classList.add("active-theme");

      const theme = btn.getAttribute("data-theme");
      applyTheme(theme);
      localStorage.setItem("portfolio_theme", theme);
    });
  });

  function applyTheme(theme) {
    if (theme === "cyberpunk") {
      body.style.backgroundColor = "rgb(20, 0, 30)";
      document
        .querySelectorAll("nav, .settings-sidebar, .settings-content")
        .forEach((el) => {
          el.style.backgroundColor = "rgb(40, 0, 60)";
          el.style.borderColor = "rgba(255, 0, 128, 0.4)";
        });
    } else if (theme === "emerald") {
      body.style.backgroundColor = "rgb(0, 25, 20)";
      document
        .querySelectorAll("nav, .settings-sidebar, .settings-content")
        .forEach((el) => {
          el.style.backgroundColor = "rgb(0, 45, 35)";
          el.style.borderColor = "rgba(0, 255, 150, 0.4)";
        });
    } else if (theme === "light") {
      body.style.backgroundColor = "rgb(240, 240, 250)";
      body.style.color = "rgb(20, 20, 40)";
      document
        .querySelectorAll("nav, .settings-sidebar, .settings-content")
        .forEach((el) => {
          el.style.backgroundColor = "rgb(255, 255, 255)";
          el.style.color = "rgb(20, 20, 40)";
          el.style.borderColor = "rgba(100, 100, 150, 0.3)";
        });
    } else {
      body.style.backgroundColor = "rgb(0, 0, 33)";
      body.style.color = "white";
      document
        .querySelectorAll("nav, .settings-sidebar, .settings-content")
        .forEach((el) => {
          el.style.backgroundColor = "rgb(18, 18, 62)";
          el.style.color = "white";
          el.style.borderColor = "rgba(170, 107, 228, 0.2)";
        });
    }
  }

  const accentColorPicker = document.getElementById("accentColorPicker");
  const colorHexCode = document.getElementById("colorHexCode");
  const resetColorBtn = document.getElementById("resetColorBtn");

  accentColorPicker.addEventListener("input", (e) => {
    const color = e.target.value;
    colorHexCode.innerText = color;
    document.documentElement.style.setProperty("--accent-glow", color);
    localStorage.setItem("portfolio_accent", color);
  });

  resetColorBtn.addEventListener("click", () => {
    accentColorPicker.value = "#aa6be4";
    colorHexCode.innerText = "#aa6be4";
    localStorage.removeItem("portfolio_accent");
  });

  const fontFamilySelect = document.getElementById("fontFamilySelect");
  fontFamilySelect.addEventListener("change", (e) => {
    const font = e.target.value;
    body.style.fontFamily = font;
    localStorage.setItem("portfolio_font", font);
  });

  const fontSizeRange = document.getElementById("fontSizeRange");
  const fontSizeVal = document.getElementById("fontSizeVal");

  fontSizeRange.addEventListener("input", (e) => {
    const scale = e.target.value;
    fontSizeVal.innerText = `${scale}%`;
    document.documentElement.style.fontSize = `${scale}%`;
    localStorage.setItem("portfolio_font_scale", scale);
  });

  const clearStorageBtn = document.getElementById("clearStorageBtn");
  clearStorageBtn.addEventListener("click", () => {
    localStorage.clear();
    alert("All saved preferences cleared! Reloading factory defaults.");
    window.location.reload();
  });

  const savedTheme = localStorage.getItem("portfolio_theme");
  if (savedTheme) {
    const btn = document.querySelector(`[data-theme="${savedTheme}"]`);
    if (btn) {
      themeButtons.forEach((b) => b.classList.remove("active-theme"));
      btn.classList.add("active-theme");
      applyTheme(savedTheme);
    }
  }

  const savedFont = localStorage.getItem("portfolio_font");
  if (savedFont) {
    fontFamilySelect.value = savedFont;
    body.style.fontFamily = savedFont;
  }

  const savedScale = localStorage.getItem("portfolio_font_scale");
  if (savedScale) {
    fontSizeRange.value = savedScale;
    fontSizeVal.innerText = `${savedScale}%`;
    document.documentElement.style.fontSize = `${savedScale}%`;
  }
});