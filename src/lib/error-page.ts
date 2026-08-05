export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>A small detour</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      .eyebrow { color: #8a4b2b; font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.75rem; }
      h1 { font-size: 1.5rem; margin: 0 0 0.75rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.6rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="eyebrow">A small detour</div>
      <h1>We hit a bump in the road</h1>
      <p>This page did not load the way it should. Try once more, or head back to the front page.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try once more</button>
        <a class="secondary" href="/">Back to the front page</a>
      </div>
    </div>
  </body>
</html>`;
}
