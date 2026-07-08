const HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>DesignRefs — any website to design tokens</title>
<meta name="description" content="Extract a website's design system into design tokens in seconds: logo, colors, typography, borders, and more. One command." />
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
    padding: 6rem 1.5rem 4rem;
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
    margin-bottom: 1.5rem;
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
  .cmd button {
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
  .cmd button:hover { color: var(--text); border-color: var(--accent); }
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
  <span class="eyebrow">MIT &middot; Node.js CLI &middot; MCP-ready</span>
  <h1>Any website, <span>every design token</span>, one command.</h1>
  <p class="lede">
    DesignRefs extracts a website's design system in seconds: logo, colors, typography,
    spacing, borders, shadows, components, and breakpoints — with confidence scoring on
    every value.
  </p>

  <div class="cmd">
    <div><span class="prompt">$</span> <code id="cmd-text">npx designrefs stripe.com</code></div>
    <button onclick="navigator.clipboard.writeText(document.getElementById('cmd-text').textContent)">Copy</button>
  </div>

  <div class="cta-row">
    <a class="btn primary" href="https://github.com/hudsonargollo/designrefs">View on GitHub</a>
    <a class="btn" href="https://github.com/hudsonargollo/designrefs#readme">Documentation</a>
    <a class="btn" href="https://www.npmjs.com/package/designrefs">npm</a>
  </div>

  <h2>What it extracts</h2>
  <div class="grid">
    <div><strong>Colors</strong>Semantic roles, palette, CSS variables, gradients</div>
    <div><strong>Typography</strong>Font sources, sizes, weights, line heights</div>
    <div><strong>Spacing</strong>Margin/padding scale, grid inference</div>
    <div><strong>Borders</strong>Radius, widths, styles, colors</div>
    <div><strong>Shadows</strong>Elevation patterns</div>
    <div><strong>Components</strong>Buttons, inputs, links, ARIA states</div>
    <div><strong>Breakpoints</strong>Responsive rules from CSS</div>
    <div><strong>Icons &amp; frameworks</strong>Font Awesome, Tailwind, MUI, and more</div>
  </div>

  <h2>Also works as an MCP server</h2>
  <div class="cmd">
    <div><span class="prompt">$</span> <code id="mcp-text">claude mcp add --transport stdio designrefs -- npx -y --package designrefs designrefs-mcp</code></div>
    <button onclick="navigator.clipboard.writeText(document.getElementById('mcp-text').textContent)">Copy</button>
  </div>

  <footer>
    <span>DesignRefs &mdash; MIT licensed</span>
    <div class="links">
      <a href="https://github.com/hudsonargollo/designrefs">GitHub</a>
      <a href="https://github.com/hudsonargollo/designrefs/issues">Issues</a>
      <a href="https://www.npmjs.com/package/designrefs">npm</a>
    </div>
  </footer>
</main>
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
