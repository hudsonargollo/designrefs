# DesignRefs.

[![npm version](https://img.shields.io/npm/v/designrefs.svg)](https://www.npmjs.com/package/designrefs)
[![npm downloads](https://img.shields.io/npm/dm/designrefs.svg)](https://www.npmjs.com/package/designrefs)
[![license](https://img.shields.io/npm/l/designrefs.svg)](https://github.com/hudsonargollo/designrefs/blob/main/LICENSE)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-me-pink?style=flat&logo=github-sponsors)](https://github.com/sponsors/hudsonargollo)

Extract a website's design system into design tokens in a few seconds: logo, colors, typography, borders, and more. One command.

![DesignRefs: Any website to design tokens](https://raw.githubusercontent.com/hudsonargollo/designrefs/main/docs/images/banner.png)

## Install

Install globally: `npm install -g designrefs`

```bash
designrefs designrefs.com
```

Or use npx without installing: `npx designrefs designrefs.com`

Requires Node.js 18+

## AI Agent Integration (MCP)

Use DesignRefs as a tool in Claude Code, Cursor, Windsurf, or any MCP-compatible client. Ask your agent to "extract the color palette from designrefs.com" and it calls DesignRefs automatically.

```bash
claude mcp add --transport stdio designrefs -- npx -y --package designrefs designrefs-mcp
```

Or add to your project's `.mcp.json`:

```json
{
  "mcpServers": {
    "designrefs": {
      "command": "npx",
      "args": ["-y", "--package", "designrefs", "designrefs-mcp"]
    }
  }
}
```

Available tools include `get_design_tokens`, `get_color_palette`, `get_typography`, `get_component_styles`, `get_surfaces`, `get_spacing`, and `get_brand_identity`, plus drift, report, and job-control tools.

## What to expect from extraction?

- Colors (semantic, palette, CSS variables, gradients)
- Typography (fonts, sizes, weights, sources)
- Spacing (margin/padding scales)
- Borders (radius, widths, styles, colors)
- Shadows
- Motion (duration scale, easing curves, hover patterns per component type)
- Components (buttons, badges, inputs, links)
- Breakpoints
- Icons & frameworks

## Usage

```bash
designrefs <url>                        # Basic extraction (terminal display only)
designrefs designrefs.com --json-only     # Output raw JSON to terminal (no formatted display, no file save)
designrefs designrefs.com --save-output   # Save JSON to output/designrefs.com/YYYY-MM-DDTHH-MM-SS.json
designrefs designrefs.com --dtcg          # Export in W3C Design Tokens (DTCG) format (auto-saves as .tokens.json)
designrefs designrefs.com --dark-mode     # Extract colors from dark mode variant
designrefs designrefs.com --mobile        # Use mobile viewport (390x844) for responsive analysis
designrefs designrefs.com --slow          # 3x longer timeouts (24s hydration) for JavaScript-heavy sites
designrefs designrefs.com --brand-guide   # Generate a brand guide PDF
designrefs designrefs.com --design-md     # Generate a DESIGN.md file for AI agents
designrefs designrefs.com /pricing /docs  # Extract specific paths and merge results into one output
designrefs designrefs.com --crawl 5       # Analyze 5 pages (homepage + 4 discovered pages), merges results
designrefs designrefs.com --sitemap       # Discover pages from sitemap.xml instead of DOM links
designrefs designrefs.com --crawl 10 --sitemap # Combine: up to 10 pages discovered via sitemap
designrefs designrefs.com --no-sandbox    # Disable Chromium sandbox (required for Docker/CI)
designrefs designrefs.com --key dmb_···  # Push a snapshot to a DesignRefs-compatible API (self-hosted; no public instance is provided by this project)
                                       # Set DESIGNREFS_API_URL to your endpoint; DESIGNREFS_KEY env var can supply the key instead of --key
designrefs designrefs.com --browser=firefox # Use Firefox instead of Chromium (better for Cloudflare bypass)
designrefs designrefs.com --wcag          # WCAG 2.1 contrast analysis — real DOM pairs, AA/AAA grades
designrefs designrefs.com --stealth       # Opt-in anti-detection: navigator spoofing + human mouse simulation (use only when authorized)
designrefs designrefs.com --locale fi-FI --timezone Europe/Helsinki # Browser fingerprint: locale and timezone
designrefs designrefs.com --user-agent "Mozilla/5.0 ..."           # Custom user agent string
designrefs designrefs.com --accept-language "fi,en;q=0.9"          # Custom Accept-Language header
designrefs designrefs.com --screen-size 2560x1440                  # Physical screen resolution to report
```

Default: formatted terminal display only. Use `--save-output` to persist results as JSON files. Browser automatically retries in visible mode if headless extraction fails.

### Multi-Page Extraction

Analyze multiple pages to get a more complete picture of a site's design system. Results are merged into a single unified output with cross-page confidence boosting: tokens appearing on multiple pages get higher confidence scores.

```bash
# Analyze homepage + 4 auto-discovered pages (default: 5 total)
designrefs designrefs.com --crawl 5

# Use sitemap.xml for page discovery instead of DOM link scraping
designrefs designrefs.com --sitemap

# Combine both: up to 10 pages from sitemap
designrefs designrefs.com --crawl 10 --sitemap
```

**Page discovery** works two ways:
- **DOM links** (default): Reads navigation, header, and footer links from the homepage, prioritizing key pages like /pricing, /about, /features
- **Sitemap** (`--sitemap`): Parses sitemap.xml (checks robots.txt first), follows sitemapindex references, and scores URLs by importance

Pages are fetched sequentially with polite delays. Failed pages are skipped without aborting the run.

### Browser Selection

By default, designrefs uses Chromium. If you encounter bot detection or timeouts (especially on sites behind Cloudflare), try Firefox which is often more successful at bypassing these protections:

```bash
# Use Firefox instead of Chromium
designrefs designrefs.com --browser=firefox

# Combine with other flags
designrefs designrefs.com --browser=firefox --save-output --dtcg
```

**When to use Firefox:**
- Sites behind Cloudflare or other bot detection systems
- Timeout issues on heavily protected sites
- WSL environments where headless Chromium may struggle

**Installation:**
Browsers are installed on demand, not by `npm install` (designrefs depends on the lean `playwright-core`, which carries no browser binaries). Fetch the engine you need, matched to the installed `playwright-core`:

```bash
npm run install-browser   # chromium (default)
# or a specific engine:
npx playwright@$(node -p "require('playwright-core/package.json').version") install firefox
```

If you get `Executable doesn't exist` when using `--browser firefox`, the version resolved above may not match the `playwright-core` bundled inside the global designrefs install (which can happen if you run the command from inside a project that pins a different version). Use `playwright-core` directly with the exact version designrefs ships:

```bash
npx playwright-core@$(node -p "require('playwright-core/package.json').version") install firefox
```

Run this from your home directory (outside any Node.js project) so `require` resolves against the global designrefs install rather than a local `node_modules`.

### Connect to an existing browser (CDP)

Skip the bundled browser entirely and drive an already-running Chromium over the DevTools Protocol. Useful in CI or containers where a browser is already up, and it needs no local browser download at all:

```bash
BROWSER_CDP_ENDPOINT=http://localhost:9222 designrefs designrefs.com --browser chromium
```

CDP is supported only with `--browser chromium`.

### W3C Design Tokens (DTCG) Format

Use `--dtcg` to export in the standardized [W3C Design Tokens Community Group](https://www.designtokens.org/) format:

```bash
designrefs designrefs.com --dtcg
# Saves to: output/designrefs.com/TIMESTAMP.tokens.json
```

The DTCG format is an industry-standard JSON schema that can be consumed by design tools and token transformation libraries like [Style Dictionary](https://styledictionary.com).

### DESIGN.md

Use `--design-md` to generate a [DESIGN.md](https://stitch.withgoogle.com/docs/design-md) file, a plain-text design system document readable by AI agents. The export follows Google's DESIGN.md draft format: YAML design tokens in front matter plus ordered Markdown guidance sections.

```bash
designrefs designrefs.com --design-md
# Saves to: output/designrefs.com/DESIGN.md
```

DESIGN.md reports only what DesignRefs observed on the source site. Exact values (colors, typography, spacing, radii, shadows) live in the YAML front matter when available, and the Markdown body adds human-readable context. Sections with no extracted evidence are omitted rather than filled with invented defaults. For example, the elevation section is dropped when the site uses no box-shadow tokens.

### WCAG Contrast Analysis

Use `--wcag` to check accessibility contrast ratios across the page. Unlike palette-based checkers, designrefs walks the actual DOM and finds what color is rendered on top of what background — per element.

```bash
designrefs designrefs.com --wcag
```

Returns every text/background pair with contrast ratio and WCAG 2.1 grade (AA, AA-Large, AAA, or fail), sorted by how often each pair appears. Results are shown in terminal and included in JSON output as `wcag`.

Also captures **interactive state contrast**: designrefs simulates hover, focus, and disabled states on buttons, links, and inputs and checks contrast on each state. State pairs are tagged `[hover]`, `[focus]`, or `[disabled]` in output so you can catch contrast failures that only appear on interaction.

### Motion Tokens

Motion tokens are extracted automatically on every run — no flag needed. DesignRefs analyzes CSS transitions and animations across the page and returns a structured motion profile.

```bash
designrefs designrefs.com
```

Returns:
- **Duration scale**: all unique animation durations found on the page
- **Easing curves**: named easing types (ease-out, spring, custom cubic-bezier) with usage counts
- **Per-context profiles**: motion behavior by component type (button, nav, card, modal, hero)
- **Hover interaction deltas**: which properties animate on hover (transform, opacity, background, color) and the pattern (scale-up, fade-in, color-shift, slide-y)

Motion data is included in JSON output as `motion` and printed in terminal under a dedicated Motion section.

### ML-powered brand color detection (experimental)

```bash
designrefs designrefs.com --ai
#   ⚡ ML primary → #533afd (score 0.93 · 68% acc)
```

Replaces the heuristic with a trained model — 2× more accurate (68% vs 32%). Requires the optional `onnxruntime-node` dep (`npm install onnxruntime-node`). Without the flag nothing changes.

### Brand Guide PDF

Use `--brand-guide` to generate a printable PDF summarizing the extracted design system: colors, typography, components, and logo on a single document.

```bash
designrefs designrefs.com --brand-guide
# Saves to: output/designrefs.com/TIMESTAMP.brand-guide.pdf
```

## Continuous integration

DesignRefs drives a real browser, so the browser revision must match `playwright-core`.

If you are not using the Playwright container image, install the browser revision that matches `playwright-core`:

```bash
# in designrefs's own repo
npm run install-browser
# elsewhere — derive the version so it always matches
npx playwright@$(node -p "require('playwright-core/package.json').version") install --with-deps chromium
```

A mismatched version fails with "Executable doesn't exist". The container image avoids this entirely — just match its tag (`v1.60.0`) to the `playwright-core` version.

### Drift gate

Compare an extraction against a committed baseline and fail the job on drift:

```bash
# capture a baseline once (same environment you will check against)
designrefs https://app.example.com --json-only > baseline.json

# in CI — exits non-zero on drift; writes a report artifact
designrefs https://app.example.com --compare baseline.json --html report.html
```

When the change is intended, accept it as the new baseline — `--approve` overwrites the local baseline file and passes instead of failing:

```bash
designrefs https://app.example.com --compare baseline.json --approve
```

Add `--json-only` to a `--compare` run to get the drift report as machine-readable JSON under a `drift` key — `score`, `status`, `summary`, and per-token `changes[]` (each with `category`, `kind`, `before`, `after`, `delta`). A CI gate can render exactly which tokens moved (e.g. in a PR comment) from this instead of parsing the HTML report:

```bash
designrefs https://app.example.com --compare baseline.json --json-only
```

**Any CI.** The gate is platform-neutral — it is just the exit code plus the drift JSON, so it drops into any runner:

```bash
designrefs "$PREVIEW/checkout" --compare base.json --json-only > drift.json
# exit 1 = drift. Read drift.json (.drift.changes) and surface it however your
# platform does: a GitLab MR note, an Azure DevOps PR thread, a Jenkins status,
# a Slack message, or an auto-filed Jira/Linear ticket.
```

A ready-to-use **GitHub Actions** workflow (preview vs production, per-page PR comment with the exact tokens that changed, run summary, report artifact, host-auth bypass) is in [`examples/drift-gate.yml`](examples/drift-gate.yml) as one full reference. The result-surfacing step (annotations, PR comment) is the only platform-specific part; the extract → compare → branch-on-exit-code core is identical on GitLab CI, Jenkins, and Azure DevOps.

### Exit codes

A pipeline can branch on the exit code; "design drifted" and "extraction broke" are distinct:

| Code | Meaning |
|---|---|
| `0` | Success, or stable (no drift) under `--compare` |
| `1` | Drift detected (`--compare`) |
| `2` | Extraction failure (`EXTRACTION_FAILED`, `BROWSER_UNAVAILABLE`) |
| `67` | Navigation/connection timeout (`NAVIGATION_TIMEOUT`) — retryable, try `--slow` |

With `--json-only`, a failure also prints a machine-readable `{ "error": { "code", "message" } }` to stdout.

## Recipes

**Quick brand scan**
```bash
designrefs designrefs.com
```

**Compare two sites**
```bash
designrefs designrefs.com --save-output
designrefs braintree.com --save-output
# Compare output/designrefs.com and output/braintree.com side by side
```

**Multi-page audit** — get a fuller picture across the whole site
```bash
designrefs designrefs.com --crawl 10 --sitemap --save-output
```

**Spot-check a value** — verify a specific token fast
```bash
designrefs designrefs.com --json-only | grep -i "border-radius"
```

**Export for Tailwind** — get spacing and color values into your config
```bash
designrefs designrefs.com --dtcg --save-output
# Use the .tokens.json with Style Dictionary to generate tailwind.config.js
```

**Export for Tokens Studio / Figma**
```bash
designrefs designrefs.com --dtcg --save-output
# Import the .tokens.json directly into Tokens Studio
```

**Generate DESIGN.md for your AI agent**
```bash
designrefs designrefs.com --design-md
# Point your agent at the output DESIGN.md
```

**Accessibility audit** — check contrast on any live URL
```bash
designrefs designrefs.com --wcag
```

**Regression baseline** — snapshot now, catch drift later
```bash
designrefs myapp.com --save-output --dtcg
# Store output as baseline, re-run after deploys and diff
```

**CI / headless environments**
```bash
designrefs myapp.com --no-sandbox --save-output
```

## Use Cases

- Design system documentation
- Multi-site design consolidation
- Internal design audits on your own properties
- Learning how design tokens map to real CSS

## How It Works

Uses Playwright to render the page, reads computed styles from the DOM, analyzes color usage and confidence, groups similar typography, detects spacing patterns, and returns design tokens.

### Extraction Process

1. Browser Launch - Launches browser (Chromium by default, Firefox optional) with stealth configuration
2. Anti-Detection - Injects scripts to bypass bot detection
3. Navigation - Navigates to target URL with retry logic
4. Hydration - Waits for SPAs to fully load (8s initial + 4s stabilization)
5. Content Validation - Verifies page content is substantial (>500 chars)
6. Parallel Extraction - Runs all extractors concurrently for speed
7. Analysis - Analyzes computed styles, DOM structure, and CSS variables
8. Scoring - Assigns confidence scores based on context and usage

### Color Confidence

- High: Logo, primary interactive elements
- Medium: Secondary interactive elements, icons, navigation
- Low: Generic UI components (filtered from display)
- Only shows high and medium confidence colors in terminal. Full palette in JSON.

## Limitations

- Dark mode requires `--dark-mode` flag (not automatically detected)
- Hover/focus states extracted from CSS (not fully interactive)
- Canvas/WebGL-rendered sites cannot be analyzed (no DOM to read)
- JavaScript-heavy sites require hydration time (8s initial + 4s stabilization)
- Some dynamically-loaded content may be missed
- Default viewport is 1920x1080 (use `--mobile` for 390x844 mobile viewport)

## Intended Use

DesignRefs reads publicly available CSS and computed styles from website DOMs for documentation, learning, and analysis of design systems you own or have permission to analyze.

Only run DesignRefs against sites whose Terms of Service permit automated access, or against your own properties. Do not use extracted material to reproduce third-party brand identities, logos, or trademarks. Respect robots.txt, rate limits, and copyright.

DesignRefs does not host, redistribute, or claim rights to any third-party brand assets.

## Sponsors

The CLI is MIT-licensed and free. Sponsorship funds ongoing maintenance and development, including the `--compare` drift gate and MCP tooling.

[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-me-pink?style=flat&logo=github-sponsors)](https://github.com/sponsors/hudsonargollo)

<!-- sponsors -->
<!-- Backer ($25+) and Lead sponsor ($500+) logos appear here. -->
<!-- sponsors -->

## Contributing

Bugs, weird sites, pull requests. All welcome.

Open an [Issue](https://github.com/hudsonargollo/designrefs/issues) or PR.

Maintained by [@hudsonargollo](https://github.com/hudsonargollo). Forked from dembrandt by thevangelist.

MIT. Do whatever you want with it.
