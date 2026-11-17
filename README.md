# eFarmer — Farmer to Dealer Platform

A small, beginner-friendly static website where farmers list their grains and
wholesalers/dealers buy directly, without a middleman.

Built with **plain HTML, CSS and a little JavaScript**. No frameworks, no npm,
no build step. Just open the file or put it on GitHub Pages.

---

## Pages

| File | What it does |
|------|--------------|
| `index.html` | Home page — hero, stats, how it works, crop tiles |
| `market.html` | Marketplace — all dealer listings with search + crop/state filters, dealer popup |
| `sell.html` | Farmer form to add a crop listing (saved in the browser) |
| `dealers.html` | Directory of verified dealers |
| `about.html` | Story and mission |
| `contact.html` | Contact form (opens the visitor's mail app) |

## Folder structure

```
eFarmer/          (all files flat, in the repo root)
├── index.html
├── market.html
├── sell.html
├── dealers.html
├── about.html
├── contact.html
├── style.css
├── app.js
├── hero-farmer.jpg
├── advisory.jpg
├── paddy-field.jpg
├── grain-sieve.jpg
├── rice-grains.jpg
├── wheat-hand.jpg
└── README.md
```

All files sit in the same folder, so every page links to `style.css`,
`app.js` and the photos by plain filename (for example `hero-farmer.jpg`).

## Run it locally

1. Download and unzip the folder.
2. Double-click `index.html`.

That's it. Everything works from the file system.

If you want a local server (optional):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## Put it on GitHub Pages (live link)

1. Create a new repository on GitHub, for example `efarmer`.
2. Upload **all 15 files** to the repo root, flat. Do not create `css/`, `js/`
   or `images/` folders — the pages link to `style.css`, `app.js` and the photos
   by plain filename.
   Or use git:

   ```bash
   git init
   git add .
   git commit -m "eFarmer: farmer to dealer platform"
   git branch -M main
   git remote add origin https://github.com/<your-username>/efarmer.git
   git push -u origin main
   ```

3. In the repo, go to **Settings → Pages**.
4. Under *Build and deployment*, set **Source = Deploy from a branch**,
   **Branch = main**, **Folder = / (root)**. Click **Save**.
5. Wait about a minute. Your live link will be:

   ```
   https://<your-username>.github.io/efarmer/
   ```

All internal links are relative, so the site works from a subfolder without any change.

---

## Where to edit things

**Products in the marketplace** — `app.js`, the `PRODUCTS` array near the top.
Copy one block and change the values:

```js
{
  id: 10,
  crop: 'Soybean',
  variety: 'JS 335',
  dealer: 'New Dealer Name',
  city: 'Ujjain',
  state: 'Madhya Pradesh',
  qty: 75,
  price: 4600,
  img: 'grain-sieve.jpg',
  verified: true
}
```

`id` must be unique. `img` must be a photo filename that exists in the repo root, e.g. `grain-sieve.jpg`.

**Colours and spacing** — `style.css`, the `:root` block at the very top.
Change `--green` and `--green-dark` to re-theme the whole site.

**Dealer directory** — edit the cards in `dealers.html`.

**Contact email** — `app.js`, in `initContactForm()`: replace
`hello@efarmer.example` with your real address. Also update it in `contact.html`.

---

## How the JavaScript works (short version)

`app.js` has small, separate functions, and every one is called at the bottom
inside `DOMContentLoaded`:

- `initNav()` — opens and closes the mobile menu.
- `initMarket()` — reads the `PRODUCTS` array, builds the cards, and filters them
  as you type or change a dropdown. The crop and state dropdowns are filled
  automatically from the data, so you never edit them by hand.
- `openDealerModal()` — shows the dealer details popup.
- `initSellForm()` — validates the form and saves listings to `localStorage`,
  then draws them under "My listings". Remove deletes one.
- `initContactForm()` — checks the fields and opens a `mailto:` link.

Each function starts with `if (!element) return;` so it is safe to load the same
`app.js` on every page — it only runs the parts that page needs.

---

## Limitations (this is a front-end demo)

- Listings are stored in **your browser's** `localStorage`. They do not go to a
  server, so other people cannot see them, and clearing browser data removes them.
- Phone numbers shown for dealers are generated demo values.
- The contact form uses `mailto:` — it needs a mail app on the device.
- To make it a real product you would add a backend (Node/Express, Firebase or
  Supabase) and swap `localStorage` calls for API calls.

---

## Credits

Images are provided by the project owner. Code is free to use for learning.


---

## Troubleshooting on GitHub Pages

**Page loads but looks like plain text, images broken.** The browser cannot find
`style.css`, `app.js` or the photos. Check that those files sit in the repo root
next to `index.html`, and that the filenames match exactly (Linux servers are
case sensitive: `Style.css` will not load `style.css`).

**404 page.** `index.html` must be at the repo root, not inside a subfolder.

**Site not publishing.** Settings -> Pages must show Branch `main` and
Folder `/ (root)`, and the repo must be public on a free account.

**Changed a file but the live site is old.** Pages takes about a minute. Then
hard refresh with Ctrl+Shift+R (or Cmd+Shift+R on Mac).
