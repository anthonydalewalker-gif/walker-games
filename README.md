# Walker Games – PWA Hub
Static, framework-free storefront for your PWA apps/games. Files: `index.html`, `style.css`, `app.js`, `apps.json`, `privacy.html`, `manifest.webmanifest`, `sw.js`, `ads.txt`, `icons/`.

## Add an app
Edit `apps.json` (replace the 3 PLACEHOLDER entries). Fields:
`id` (unique, no spaces), `name`, `description`, `icon` (path/URL, square), `url` (your PWA's URL), `category` (auto-builds filter chips), `price` (`"free"` or e.g. `"$2.99"`), `premium` (true/false), `paymentLink` (Stripe Payment Link, used when premium), `tags` (array).
Bump `CACHE` in `sw.js` (e.g. `wg-hub-v2`) whenever you change files so users get updates. Deep link: `yoursite/#app-<id>`.

## Monetize
- **AdSense**: in `index.html` replace every `ca-pub-XXXXXXXXXXXXXXXX` with your publisher ID, replace `data-ad-slot` values (`1111111111`, `2222222222`) with your ad unit IDs, uncomment the blocks. Uncomment the line in `ads.txt` with your `pub-` ID. AdSense requires a custom domain-or-approved site, real content and the privacy page.
- **Tips**: replace `YOUR_KOFI_USERNAME`, `YOUR_BMC_USERNAME`, `https://buy.stripe.com/YOUR_TIP_LINK` in `index.html`.
- **Premium**: create a Stripe Payment Link (Dashboard → Payment Links) and put it in the app's `paymentLink`.
- **Privacy**: replace `YOUR_EMAIL@example.com` and `[DATE]` in `privacy.html`.

## Deploy (main path): GitHub Pages on anthonydalewalker-gif
1. On github.com (signed in as **anthonydalewalker-gif**) create a public repo, e.g. `walker-games` (or `anthonydalewalker-gif.github.io` to make the hub your root site).
2. Upload the contents of this folder (Add file → Upload files, drag everything incl. `icons/`) and commit to `main`. Or via CLI:
   ```
   git init && git add . && git commit -m "Walker Games hub"
   git branch -M main
   git remote add origin https://github.com/anthonydalewalker-gif/walker-games.git
   git push -u origin main
   ```
3. Repo → Settings → Pages → Source: *Deploy from a branch*, Branch `main` / `(root)` → Save.
4. Live in ~1 min at **https://anthonydalewalker-gif.github.io/walker-games/** (or `https://anthonydalewalker-gif.github.io/` for the user-site repo). Run N Rumble already lives at `/run-n-rumble/` on the same account.
5. For AdSense, a custom domain (Settings → Pages → Custom domain) is recommended; `ads.txt` must sit at the domain root.

### Alternatives
- Netlify: drag the folder onto app.netlify.com/drop.
- Vercel: `npx vercel` in the folder (framework: Other).

Local test: `python3 -m http.server 8080` → http://localhost:8080
