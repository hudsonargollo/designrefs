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
    margin: 2rem 0 4rem;
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
  }
  .btn:hover { border-color: var(--accent); }
  .btn.primary {
    background: var(--accent);
    border-color: var(--accent);
    color: #0a0a0f;
    font-weight: 600;
  }
  .btn.primary:hover { background: var(--accent-bright); }
  h2 {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-dim);
    margin: 0 0 1.25rem;
  }
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
      description: "Extraia o design system de um site em segundos: logo, cores, tipografia, bordas e mais. Um comando."
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
      description: "Extract a website's design system into design tokens in seconds: logo, colors, typography, borders, and more. One command."
    }
  };

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
    grid8(lang);

    document.getElementById("btn-pt").classList.toggle("active", lang === "pt");
    document.getElementById("btn-en").classList.toggle("active", lang === "en");
    try { localStorage.setItem("designrefs-lang", lang); } catch (e) {}
  }

  var saved;
  try { saved = localStorage.getItem("designrefs-lang"); } catch (e) {}
  apply(saved === "en" ? "en" : "pt");

  document.getElementById("btn-pt").addEventListener("click", function () { apply("pt"); });
  document.getElementById("btn-en").addEventListener("click", function () { apply("en"); });
})();
</script>
</body>
</html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
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
