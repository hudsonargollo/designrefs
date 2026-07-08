import { launch } from "@cloudflare/playwright";

const HTML = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>DesignRefs — de qualquer site a design tokens</title>
<meta name="description" content="Extraia o design system de um site em segundos: logo, cores, tipografia, bordas e mais. Um comando." />
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2222%22 fill=%22%236366f1%22/><text x=%2250%22 y=%2266%22 font-size=%2258%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22system-ui%22>D</text></svg>" />
<style>
  :root {
    --bg: #0a0a0f;
    --bg-elevated: #12121a;
    --border: #22222e;
    --text: #e8e8ee;
    --text-dim: #8b8b9a;
    --accent: #818cf8;
    --accent-bright: #a5b4fc;
    --danger: #f87171;
    --mono: "SF Mono", ui-monospace, "Cascadia Code", Menlo, Consolas, monospace;
    --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif;
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    -webkit-font-smoothing: antialiased;
  }
  body {
    background-image:
      radial-gradient(circle at 15% 0%, rgba(129, 140, 248, 0.12), transparent 40%),
      radial-gradient(circle at 85% 20%, rgba(168, 85, 247, 0.08), transparent 40%);
  }
  main {
    max-width: 780px;
    margin: 0 auto;
    padding: 5rem 1.5rem 4rem;
  }
  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--mono);
    font-size: 0.75rem;
    color: var(--accent-bright);
    background: rgba(129, 140, 248, 0.1);
    border: 1px solid rgba(129, 140, 248, 0.25);
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
  }
  .lang-switch {
    display: inline-flex;
    font-family: var(--mono);
    font-size: 0.75rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    overflow: hidden;
  }
  .lang-switch button {
    font-family: var(--mono);
    font-size: 0.75rem;
    background: transparent;
    color: var(--text-dim);
    border: none;
    padding: 0.35rem 0.75rem;
    cursor: pointer;
  }
  .lang-switch button.active {
    background: var(--accent);
    color: #0a0a0f;
    font-weight: 600;
  }
  h1 {
    font-size: clamp(2.2rem, 5vw, 3.2rem);
    line-height: 1.1;
    margin: 0 0 1rem;
    letter-spacing: -0.03em;
  }
  h1 span {
    background: linear-gradient(90deg, var(--accent-bright), #c4b5fd);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .lede {
    font-size: 1.15rem;
    color: var(--text-dim);
    line-height: 1.6;
    max-width: 56ch;
    margin: 0 0 2.5rem;
  }
  .cmd {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    font-family: var(--mono);
    font-size: 0.95rem;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1rem 1.2rem;
    margin-bottom: 1rem;
  }
  .cmd .prompt { color: var(--text-dim); user-select: none; }
  .cmd code { color: var(--accent-bright); overflow-x: auto; }
  .cmd button.copy {
    flex-shrink: 0;
    font-family: var(--sans);
    font-size: 0.8rem;
    color: var(--text-dim);
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 0.35rem 0.6rem;
    cursor: pointer;
  }
  .cmd button.copy:hover { color: var(--text); border-color: var(--accent); }
  .cta-row {
    display: flex;
    gap: 0.75rem;
    margin: 2rem 0 3rem;
    flex-wrap: wrap;
  }
  .btn {
    font-family: var(--sans);
    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
    padding: 0.65rem 1.2rem;
    border-radius: 8px;
    border: 1px solid var(--border);
    color: var(--text);
    transition: border-color 0.15s;
    cursor: pointer;
  }
  .btn:hover { border-color: var(--accent); }
  .btn.primary {
    background: var(--accent);
    border-color: var(--accent);
    color: #0a0a0f;
    font-weight: 600;
  }
  .btn.primary:hover { background: var(--accent-bright); }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }
  h2 {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-dim);
    margin: 0 0 1.25rem;
  }
  .demo {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1.5rem;
    margin-bottom: 3.5rem;
  }
  .demo-form {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
  }
  .demo-form input {
    flex: 1;
    min-width: 200px;
    font-family: var(--mono);
    font-size: 0.9rem;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.65rem 0.9rem;
    color: var(--text);
  }
  .demo-form input:focus {
    outline: none;
    border-color: var(--accent);
  }
  .demo-note {
    font-size: 0.78rem;
    color: var(--text-dim);
    margin: 0.9rem 0 0;
  }
  .demo-error {
    display: none;
    font-size: 0.85rem;
    color: var(--danger);
    margin: 0.9rem 0 0;
  }
  .demo-results { display: none; margin-top: 1.5rem; }
  .demo-results h3 {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-dim);
    margin: 1.4rem 0 0.6rem;
  }
  .demo-results h3:first-child { margin-top: 0; }
  .swatches { display: flex; flex-wrap: wrap; gap: 0.6rem; }
  .swatch {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--text-dim);
  }
  .swatch .chip {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    border: 1px solid var(--border);
  }
  .font-list { display: flex; flex-direction: column; gap: 0.6rem; }
  .font-item {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    font-size: 1.1rem;
  }
  .font-item .meta {
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--text-dim);
  }
  .spacing-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .spacing-pill {
    font-family: var(--mono);
    font-size: 0.78rem;
    color: var(--accent-bright);
    background: rgba(129, 140, 248, 0.1);
    border: 1px solid rgba(129, 140, 248, 0.25);
    border-radius: 999px;
    padding: 0.25rem 0.65rem;
  }
  .demo-logo { display: flex; align-items: center; gap: 0.8rem; }
  .demo-logo img {
    max-width: 120px;
    max-height: 48px;
    background: #fff;
    border-radius: 6px;
    padding: 0.4rem;
  }
  .spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(10, 10, 15, 0.3);
    border-top-color: #0a0a0f;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    margin-right: 0.4rem;
    vertical-align: -2px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 3.5rem;
  }
  .grid div {
    background: var(--bg-elevated);
    padding: 1.1rem 1.2rem;
    font-size: 0.9rem;
    color: var(--text-dim);
  }
  .grid strong { color: var(--text); display: block; margin-bottom: 0.2rem; }
  footer {
    border-top: 1px solid var(--border);
    padding-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 0.85rem;
    color: var(--text-dim);
  }
  footer a { color: var(--text-dim); text-decoration: none; }
  footer a:hover { color: var(--text); }
  .links { display: flex; gap: 1.5rem; }
</style>
</head>
<body>
<main>
  <div class="top-row">
    <span class="eyebrow">MIT &middot; Node.js CLI &middot; MCP-ready</span>
    <div class="lang-switch" role="group" aria-label="Language">
      <button type="button" data-lang="pt" id="btn-pt">PT</button>
      <button type="button" data-lang="en" id="btn-en">EN</button>
    </div>
  </div>

  <h1 id="h1">Qualquer site, <span>todo design token</span>, um comando.</h1>
  <p class="lede" data-i18n="lede">
    O DesignRefs extrai o design system de um site em segundos: logo, cores, tipografia,
    espaçamento, bordas, sombras, componentes e breakpoints — com pontuação de confiança
    em cada valor.
  </p>

  <div class="cmd">
    <div><span class="prompt">$</span> <code id="cmd-text">npx designrefs stripe.com</code></div>
    <button class="copy" data-i18n="copy" onclick="navigator.clipboard.writeText(document.getElementById('cmd-text').textContent)">Copiar</button>
  </div>

  <div class="cta-row">
    <a class="btn primary" data-i18n="cta1" href="https://github.com/hudsonargollo/designrefs">Ver no GitHub</a>
    <a class="btn" data-i18n="cta2" href="https://github.com/hudsonargollo/designrefs#readme">Documentação</a>
    <a class="btn" href="https://www.npmjs.com/package/designrefs">npm</a>
  </div>

  <div class="demo">
    <h2 data-i18n="demoTitle">Experimente agora, direto no navegador</h2>
    <form class="demo-form" id="demo-form">
      <input type="text" id="demo-url" data-i18n-placeholder="demoPlaceholder" placeholder="stripe.com" autocomplete="off" />
      <button type="submit" class="btn primary" id="demo-submit" data-i18n="demoButton">Extrair</button>
    </form>
    <p class="demo-note" data-i18n="demoNote">Prévia leve no navegador (cores, fontes, logo, espaçamento). Para a extração completa, use a CLI.</p>
    <p class="demo-error" id="demo-error"></p>
    <div class="demo-results" id="demo-results">
      <div id="demo-logo-wrap" class="demo-logo" style="display:none">
        <img id="demo-logo" alt="logo" />
      </div>
      <h3 data-i18n="demoColors">Cores</h3>
      <div class="swatches" id="demo-colors"></div>
      <h3 data-i18n="demoFonts">Tipografia</h3>
      <div class="font-list" id="demo-fonts"></div>
      <h3 data-i18n="demoSpacing">Espaçamento</h3>
      <div class="spacing-list" id="demo-spacing"></div>
    </div>
  </div>

  <h2 data-i18n="h2-1">O que ele extrai</h2>
  <div class="grid">
    <div><strong data-i18n="f1t">Cores</strong><span data-i18n="f1d">Papéis semânticos, paleta, variáveis CSS, gradientes</span></div>
    <div><strong data-i18n="f2t">Tipografia</strong><span data-i18n="f2d">Fontes, tamanhos, pesos, alturas de linha</span></div>
    <div><strong data-i18n="f3t">Espaçamento</strong><span data-i18n="f3d">Escala de margin/padding, inferência de grid</span></div>
    <div><strong data-i18n="f4t">Bordas</strong><span data-i18n="f4d">Raio, larguras, estilos, cores</span></div>
    <div><strong data-i18n="f5t">Sombras</strong><span data-i18n="f5d">Padrões de elevação</span></div>
    <div><strong data-i18n="f6t">Componentes</strong><span data-i18n="f6d">Botões, inputs, links, estados ARIA</span></div>
    <div><strong data-i18n="f7t">Breakpoints</strong><span data-i18n="f7d">Regras responsivas extraídas do CSS</span></div>
    <div><strong data-i18n="f8t">Ícones e frameworks</strong><span data-i18n="f8d">Font Awesome, Tailwind, MUI e mais</span></div>
  </div>

  <h2 data-i18n="h2-2">Também funciona como servidor MCP</h2>
  <div class="cmd">
    <div><span class="prompt">$</span> <code id="mcp-text">claude mcp add --transport stdio designrefs -- npx -y --package designrefs designrefs-mcp</code></div>
    <button class="copy" data-i18n="copy" onclick="navigator.clipboard.writeText(document.getElementById('mcp-text').textContent)">Copiar</button>
  </div>

  <footer>
    <span data-i18n="footer">DesignRefs &mdash; licenciado sob MIT</span>
    <div class="links">
      <a href="https://github.com/hudsonargollo/designrefs">GitHub</a>
      <a href="https://github.com/hudsonargollo/designrefs/issues" data-i18n="issues">Issues</a>
      <a href="https://www.npmjs.com/package/designrefs">npm</a>
    </div>
  </footer>
</main>
<script>
(function () {
  var STRINGS = {
    pt: {
      h1pre: "Qualquer site, ",
      h1span: "todo design token",
      h1post: ", um comando.",
      lede: "O DesignRefs extrai o design system de um site em segundos: logo, cores, tipografia, espaçamento, bordas, sombras, componentes e breakpoints — com pontuação de confiança em cada valor.",
      copy: "Copiar",
      cta1: "Ver no GitHub",
      cta2: "Documentação",
      "h2-1": "O que ele extrai",
      f1t: "Cores", f1d: "Papéis semânticos, paleta, variáveis CSS, gradientes",
      f2t: "Tipografia", f2d: "Fontes, tamanhos, pesos, alturas de linha",
      f3t: "Espaçamento", f3d: "Escala de margin/padding, inferência de grid",
      f4t: "Bordas", f4d: "Raio, larguras, estilos, cores",
      f5t: "Sombras", f5d: "Padrões de elevação",
      f6t: "Componentes", f6d: "Botões, inputs, links, estados ARIA",
      f7t: "Breakpoints", f7d: "Regras responsivas extraídas do CSS",
      f8t: "Ícones e frameworks", f8d: "Font Awesome, Tailwind, MUI e mais",
      "h2-2": "Também funciona como servidor MCP",
      footer: "DesignRefs — licenciado sob MIT",
      issues: "Issues",
      htmlLang: "pt-BR",
      title: "DesignRefs — de qualquer site a design tokens",
      description: "Extraia o design system de um site em segundos: logo, cores, tipografia, bordas e mais. Um comando.",
      demoTitle: "Experimente agora, direto no navegador",
      demoPlaceholder: "stripe.com",
      demoButton: "Extrair",
      demoButtonLoading: "Extraindo…",
      demoNote: "Prévia leve no navegador (cores, fontes, logo, espaçamento). Para a extração completa, use a CLI.",
      demoColors: "Cores",
      demoFonts: "Tipografia",
      demoSpacing: "Espaçamento",
      errMissingUrl: "Digite uma URL.",
      errInvalidUrl: "URL inválida.",
      errBlockedHostname: "Esse endereço não pode ser analisado.",
      errFailed: "Não foi possível analisar esse site. Tente outro endereço.",
      errBusy: "A demonstração está ocupada agora. Tente novamente em instantes."
    },
    en: {
      h1pre: "Any website, ",
      h1span: "every design token",
      h1post: ", one command.",
      lede: "DesignRefs extracts a website's design system in seconds: logo, colors, typography, spacing, borders, shadows, components, and breakpoints — with confidence scoring on every value.",
      copy: "Copy",
      cta1: "View on GitHub",
      cta2: "Documentation",
      "h2-1": "What it extracts",
      f1t: "Colors", f1d: "Semantic roles, palette, CSS variables, gradients",
      f2t: "Typography", f2d: "Font sources, sizes, weights, line heights",
      f3t: "Spacing", f3d: "Margin/padding scale, grid inference",
      f4t: "Borders", f4d: "Radius, widths, styles, colors",
      f5t: "Shadows", f5d: "Elevation patterns",
      f6t: "Components", f6d: "Buttons, inputs, links, ARIA states",
      f7t: "Breakpoints", f7d: "Responsive rules from CSS",
      f8t: "Icons & frameworks", f8d: "Font Awesome, Tailwind, MUI, and more",
      "h2-2": "Also works as an MCP server",
      footer: "DesignRefs — MIT licensed",
      issues: "Issues",
      htmlLang: "en",
      title: "DesignRefs — any website to design tokens",
      description: "Extract a website's design system into design tokens in seconds: logo, colors, typography, borders, and more. One command.",
      demoTitle: "Try it now, right in your browser",
      demoPlaceholder: "stripe.com",
      demoButton: "Extract",
      demoButtonLoading: "Extracting…",
      demoNote: "A lightweight in-browser preview (colors, fonts, logo, spacing). For the full extraction, use the CLI.",
      demoColors: "Colors",
      demoFonts: "Typography",
      demoSpacing: "Spacing",
      errMissingUrl: "Enter a URL.",
      errInvalidUrl: "Invalid URL.",
      errBlockedHostname: "That address can't be analyzed.",
      errFailed: "Couldn't analyze that site. Try a different address.",
      errBusy: "The demo is busy right now. Try again shortly."
    }
  };

  var currentLang = "pt";

  function grid8(lang) {
    var s = STRINGS[lang];
    var cells = document.querySelectorAll(".grid div");
    var keys = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"];
    cells.forEach(function (cell, i) {
      var k = keys[i];
      cell.querySelector("strong").textContent = s[k + "t"];
      cell.querySelector("span").textContent = s[k + "d"];
    });
  }

  function apply(lang) {
    var s = STRINGS[lang] || STRINGS.pt;
    currentLang = STRINGS[lang] ? lang : "pt";
    document.documentElement.lang = s.htmlLang;
    document.title = s.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", s.description);

    var h1 = document.getElementById("h1");
    h1.childNodes[0].textContent = s.h1pre;
    h1.querySelector("span").textContent = s.h1span;
    h1.childNodes[2].textContent = s.h1post;

    document.querySelector(".lede").textContent = s.lede;
    document.querySelectorAll('[data-i18n="copy"]').forEach(function (el) { el.textContent = s.copy; });
    document.querySelector('[data-i18n="cta1"]').textContent = s.cta1;
    document.querySelector('[data-i18n="cta2"]').textContent = s.cta2;
    document.querySelector('[data-i18n="h2-1"]').textContent = s["h2-1"];
    document.querySelector('[data-i18n="h2-2"]').textContent = s["h2-2"];
    document.querySelector('[data-i18n="footer"]').textContent = s.footer;
    document.querySelector('[data-i18n="issues"]').textContent = s.issues;
    document.querySelector('[data-i18n="demoTitle"]').textContent = s.demoTitle;
    document.querySelector('[data-i18n="demoButton"]').textContent = s.demoButton;
    document.querySelector('[data-i18n="demoNote"]').textContent = s.demoNote;
    document.querySelector('[data-i18n="demoColors"]').textContent = s.demoColors;
    document.querySelector('[data-i18n="demoFonts"]').textContent = s.demoFonts;
    document.querySelector('[data-i18n="demoSpacing"]').textContent = s.demoSpacing;
    document.getElementById("demo-url").placeholder = s.demoPlaceholder;
    grid8(lang);

    document.getElementById("btn-pt").classList.toggle("active", currentLang === "pt");
    document.getElementById("btn-en").classList.toggle("active", currentLang === "en");
    try { localStorage.setItem("designrefs-lang", currentLang); } catch (e) {}
  }

  var saved;
  try { saved = localStorage.getItem("designrefs-lang"); } catch (e) {}
  apply(saved === "en" ? "en" : "pt");

  document.getElementById("btn-pt").addEventListener("click", function () { apply("pt"); });
  document.getElementById("btn-en").addEventListener("click", function () { apply("en"); });

  // --- Live demo ---
  var form = document.getElementById("demo-form");
  var input = document.getElementById("demo-url");
  var submitBtn = document.getElementById("demo-submit");
  var errorBox = document.getElementById("demo-error");
  var results = document.getElementById("demo-results");
  var colorsBox = document.getElementById("demo-colors");
  var fontsBox = document.getElementById("demo-fonts");
  var spacingBox = document.getElementById("demo-spacing");
  var logoWrap = document.getElementById("demo-logo-wrap");
  var logoImg = document.getElementById("demo-logo");

  function showError(key) {
    var s = STRINGS[currentLang];
    errorBox.textContent = s[key] || s.errFailed;
    errorBox.style.display = "block";
    results.style.display = "none";
  }

  function clearError() {
    errorBox.style.display = "none";
    errorBox.textContent = "";
  }

  function renderResults(data) {
    colorsBox.innerHTML = "";
    (data.colors || []).forEach(function (hex) {
      var wrap = document.createElement("div");
      wrap.className = "swatch";
      var chip = document.createElement("div");
      chip.className = "chip";
      chip.style.background = hex;
      var label = document.createElement("span");
      label.textContent = hex;
      wrap.appendChild(chip);
      wrap.appendChild(label);
      colorsBox.appendChild(wrap);
    });

    fontsBox.innerHTML = "";
    (data.fonts || []).forEach(function (f) {
      var item = document.createElement("div");
      item.className = "font-item";
      var sample = document.createElement("span");
      sample.textContent = "Ag";
      sample.style.fontFamily = f.family;
      sample.style.fontWeight = f.weight;
      var meta = document.createElement("span");
      meta.className = "meta";
      meta.textContent = f.family + " · " + f.size + " · " + f.weight;
      item.appendChild(sample);
      item.appendChild(meta);
      fontsBox.appendChild(item);
    });

    spacingBox.innerHTML = "";
    (data.spacing || []).forEach(function (v) {
      var pill = document.createElement("span");
      pill.className = "spacing-pill";
      pill.textContent = Math.round(v) + "px";
      spacingBox.appendChild(pill);
    });

    if (data.logo) {
      logoImg.src = data.logo;
      logoWrap.style.display = "flex";
    } else {
      logoWrap.style.display = "none";
    }

    results.style.display = "block";
  }

  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    var url = input.value.trim();
    clearError();
    if (!url) {
      showError("errMissingUrl");
      return;
    }

    submitBtn.disabled = true;
    var originalLabel = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="spinner"></span>' + STRINGS[currentLang].demoButtonLoading;
    results.style.display = "none";

    fetch("/api/extract", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: url })
    })
      .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
      .then(function (r) {
        if (!r.ok) {
          if (r.data && r.data.error === "missing_url") showError("errMissingUrl");
          else if (r.data && r.data.error === "invalid_url") showError("errInvalidUrl");
          else if (r.data && r.data.error === "blocked_hostname") showError("errBlockedHostname");
          else if (r.data && r.data.error === "busy") showError("errBusy");
          else showError("errFailed");
          return;
        }
        renderResults(r.data);
      })
      .catch(function () { showError("errFailed"); })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = STRINGS[currentLang].demoButton;
      });
  });
})();
</script>
</body>
</html>`;

function extractTokens() {
  function toHex(colorStr) {
    var m = /rgba?\(([^)]+)\)/.exec(colorStr || "");
    if (!m) return null;
    var parts = m[1].split(",").map(function (s) { return parseFloat(s.trim()); });
    var r = parts[0], g = parts[1], b = parts[2], a = parts.length > 3 ? parts[3] : 1;
    if (a === 0 || isNaN(r) || isNaN(g) || isNaN(b)) return null;
    function h(n) {
      n = Math.max(0, Math.min(255, Math.round(n)));
      var s = n.toString(16);
      return s.length === 1 ? "0" + s : s;
    }
    return "#" + h(r) + h(g) + h(b);
  }

  var colorCounts = {};
  var fontCounts = {};
  var spacingCounts = {};

  var all = document.querySelectorAll("body, body *");
  var limit = Math.min(all.length, 3000);

  for (var i = 0; i < limit; i++) {
    var el = all[i];
    var rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;
    var cs = getComputedStyle(el);

    var bg = toHex(cs.backgroundColor);
    if (bg && bg !== "#ffffff" && bg !== "#000000") {
      colorCounts[bg] = (colorCounts[bg] || 0) + 1;
    }
    var fg = toHex(cs.color);
    if (fg) {
      colorCounts[fg] = (colorCounts[fg] || 0) + 1;
    }

    if (el.children.length === 0) {
      var text = (el.textContent || "").trim();
      if (text.length > 0) {
        var family = cs.fontFamily.split(",")[0].replace(/["']/g, "").trim();
        var key = family + "|" + cs.fontWeight;
        if (!fontCounts[key]) {
          fontCounts[key] = { count: 0, family: family, weight: cs.fontWeight, size: cs.fontSize };
        }
        fontCounts[key].count++;
      }
    }

    [cs.paddingTop, cs.paddingRight, cs.marginTop, cs.marginBottom].forEach(function (v) {
      var n = parseFloat(v);
      if (n > 0 && n < 200) {
        spacingCounts[n] = (spacingCounts[n] || 0) + 1;
      }
    });
  }

  var topColors = Object.keys(colorCounts)
    .sort(function (a, b) { return colorCounts[b] - colorCounts[a]; })
    .slice(0, 8);

  var topFonts = Object.keys(fontCounts)
    .map(function (k) { return fontCounts[k]; })
    .sort(function (a, b) { return b.count - a.count; })
    .slice(0, 4)
    .map(function (f) { return { family: f.family, weight: f.weight, size: f.size }; });

  var topSpacing = Object.keys(spacingCounts)
    .map(function (v) { return parseFloat(v); })
    .sort(function (a, b) { return spacingCounts[b] - spacingCounts[a]; })
    .slice(0, 8)
    .sort(function (a, b) { return a - b; });

  var logo = null;
  var logoSelectors = [
    'header img[src*="logo" i]',
    'nav img[src*="logo" i]',
    'img[alt*="logo" i]',
    'a[class*="logo" i] img',
    '[class*="logo" i] img'
  ];
  for (var s = 0; s < logoSelectors.length; s++) {
    var found = document.querySelector(logoSelectors[s]);
    if (found && found.src) { logo = found.src; break; }
  }
  if (!logo) {
    var iconLink = document.querySelector('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]');
    if (iconLink && iconLink.href) logo = iconLink.href;
  }
  if (!logo) {
    try { logo = new URL("/favicon.ico", location.href).toString(); } catch (e) { logo = null; }
  }

  return { colors: topColors, fonts: topFonts, spacing: topSpacing, logo: logo, title: document.title };
}

function isBlockedHostname(hostname) {
  hostname = hostname.toLowerCase();
  if (hostname === "localhost" || hostname === "0.0.0.0" || hostname === "::1") return true;
  if (hostname.endsWith(".local") || hostname.endsWith(".internal")) return true;
  if (/^127\./.test(hostname)) return true;
  if (/^10\./.test(hostname)) return true;
  if (/^192\.168\./.test(hostname)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(hostname)) return true;
  if (hostname.startsWith("169.254.")) return true;
  if (hostname.startsWith("fe80:") || hostname.startsWith("fc") || hostname.startsWith("fd")) return true;
  return false;
}

async function handleExtract(request, env) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const raw = (body && typeof body.url === "string" ? body.url : "").trim();
  if (!raw) {
    return Response.json({ error: "missing_url" }, { status: 400 });
  }

  let target;
  try {
    const hasScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw);
    target = new URL(hasScheme ? raw : "https://" + raw);
  } catch (e) {
    return Response.json({ error: "invalid_url" }, { status: 400 });
  }

  if (target.protocol !== "http:" && target.protocol !== "https:") {
    return Response.json({ error: "invalid_url" }, { status: 400 });
  }

  if (isBlockedHostname(target.hostname)) {
    return Response.json({ error: "blocked_hostname" }, { status: 400 });
  }

  let browser;
  try {
    browser = await launch(env.MYBROWSER);
    const page = await browser.newPage();
    await page.goto(target.toString(), { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(500);
    const data = await page.evaluate(extractTokens);
    await browser.close();
    return Response.json({ ok: true, url: target.toString(), ...data });
  } catch (err) {
    if (browser) {
      try { await browser.close(); } catch (e) {}
    }
    const message = err && err.message ? String(err.message) : "unknown_error";
    const busy = /concurrent|limit|capacity|exhausted/i.test(message);
    return Response.json(
      { error: busy ? "busy" : "extraction_failed", message: message.slice(0, 300) },
      { status: busy ? 503 : 502 }
    );
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/api/extract") {
      return handleExtract(request, env);
    }

    if (url.pathname !== "/" && url.pathname !== "") {
      return new Response("Not found", { status: 404 });
    }

    return new Response(HTML, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=300",
      },
    });
  },
};
