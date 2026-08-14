# Biohub

An open home for life-science projects, data and tools.

## Welcome page

[`index.html`](index.html) is a self-contained welcome page for this repository —
no build step, no dependencies, just open it.

```bash
# Open it directly
open index.html          # macOS
xdg-open index.html      # Linux

# ...or serve it locally
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

### Render

This repo includes a [`render.yaml`](render.yaml) blueprint, so Render can
configure the site automatically:

1. Go to the [Render dashboard](https://dashboard.render.com/) → **New → Blueprint**.
2. Connect the GitHub account that owns this repo and pick **OfficialBiohub/Biohub**.
3. Choose the branch to deploy, then **Apply**.

Render creates a free static site named `biohub-welcome` and gives it a permanent
URL like `https://biohub-welcome.onrender.com`. Every push to the selected branch
redeploys it automatically.

### GitHub Pages

Alternatively, publish it as-is with GitHub Pages
(**Settings → Pages → Deploy from a branch → `/ (root)`**).
