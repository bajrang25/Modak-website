# मोडक आंगन — Modak Aangan

**Live: https://deliciousmodak.netlify.app**

Hosted on Netlify from `main`. Every push to `main` redeploys automatically.

Pre-order website. A customer picks their modaks, fills a short form, and the
order lands in your WhatsApp fully formatted. You call, confirm, they collect.

Built with React 19 + Vite. No server, no database, no monthly cost.

---

## Running it

```bash
npm install     # once
npm run dev     # opens http://localhost:5173
npm run images  # re-shrink the photos (build does this for you)
npm run build   # produces dist/ — the folder you upload
```

---

## Photos

Full-size originals live in **`assets-src/`** and are **never shipped**.
`npm run images` shrinks them into `public/img/` as WebP + JPEG at two sizes
each, and generates the `og.jpg` link-preview card. It runs automatically
before every build.

| Original in `assets-src/` | Appears as |
|---|---|
| `chocolate-modak.png` | Chocolate Modak card |
| `pan-modak.png` | Paan Modak card |
| `steam-modak.png` | Classic Steam Modak card, and the Pickup section |
| `modaks.png` | Hero photo, and the WhatsApp / Instagram link preview |

**To swap a photo:** drop the new file into `assets-src/` under the same
filename, then run `npm run images`.

Never put big originals in `public/` — Vite copies that folder to customers
verbatim, so 2 MB photos would make the site crawl on 4G. The four originals
total 8.6 MB; what a phone actually downloads is about 195 KB.

---

## The two files you will actually edit

### 1. `src/data/shop.js` — prices, address, dates

| What you want to change | Where |
|---|---|
| A price | `PRODUCTS` → the variety → `packs` → `price` |
| Add a new variety | Copy a whole `{ ... }` block inside `PRODUCTS`, edit it. `theme` must be `'cocoa'`, `'leaf'` or `'ivory'` |
| Your pickup address | `SHOP.pickup.addressHi` / `addressEn` |
| Where the shop is | `SHOP.pickup.lat` / `lng` — every map link is built from these two numbers. Get them by long-pressing your spot in Google Maps and copying the pair it shows. Do **not** paste a long `maps.google.com` URL; those carry a session token that expires |
| Opening hours | `SHOP.pickup.hoursHi` / `hoursEn` |
| The countdown date | `SHOP.festivalDate` — **check this is right** |
| WhatsApp number | `SHOP.whatsapp` (country code + number, no `+`) |
| Pickup time slots | `SHOP.slots` |
| Stop same-day orders | `SHOP.minLeadDays` — `1` = tomorrow onwards, `2` = two days' notice |

### 2. `src/data/i18n.js` — the words

Every visible string, Hindi and English side by side. Change the text on the
right of the colon. If you add a key, add it to **both** `hi` and `en`.

---

## Still to do

- [ ] **Confirm `SHOP.festivalDate`** is the right Ganesh Chaturthi date. It
      drives the countdown on the homepage.
- [ ] Test the order form on your own phone — pickup and delivery — and check
      the WhatsApp message that arrives.
- [ ] Optional: add a PIN code to `SHOP.pickup.addressHi` / `addressEn`. The
      street address is published; only the postal code is missing.

Done already: the `og:` link-preview tags point at the live URL, so sharing the
link on WhatsApp shows the thali photo.

---

## Deploying a change

The site rebuilds itself. There is no folder to drag any more:

```bash
# edit a price in src/data/shop.js, then
git add -A
git commit -m "Update paan modak prices"
git push
```

Netlify sees the push, runs `npm run build`, and the live site updates in about
a minute. Watch it under **Deploys** in the Netlify dashboard.

`netlify.toml` holds the build settings, so there is nothing to configure in
the dashboard by hand.

### Attaching a real domain later

Buy one (e.g. `modakaangan.in`) and add it under **Domain management** in
Netlify. Nothing in the code changes — except the three absolute URLs in
`index.html` (`og:url`, `og:image`, `canonical`), which should be updated to
the new address so link previews keep working.

---

## How an order reaches you

1. Customer taps pack buttons on the menu. The cart total updates live.
2. They fill name, WhatsApp number, date, and pickup slot.
3. Pressing **Send order on WhatsApp** opens WhatsApp with the whole order
   pre-typed and addressed to `SHOP.whatsapp`.
4. **They still have to press Send inside WhatsApp.** If they close the app
   before that, the order never reaches you and there is no record of it.

Every order gets a short reference like `MA-7K3Q`, shown to the customer and
included in the message — useful when you call them back.

### If you later want a backup copy of every order

Right now orders exist only in WhatsApp. To also log them somewhere, add the
call inside `submitOrder()` in [`src/lib/order.js`](src/lib/order.js) — there is
a marked spot and a commented example. Nothing else in the app needs to change.

---

## Pickup and delivery

Both are on. `SHOP.deliveryEnabled: true` makes the order form show a
**Pickup / Delivery** choice:

- **Pickup** — customer collects. The Location section gives them a
  **"रास्ता देखें / Get directions"** button that opens Google Maps already
  routing to your shop, a **"मैप पर देखें"** toggle that shows an inline map
  without leaving the page, and a plain "Open in Google Maps" link underneath.
- **Delivery** — a required full-address box appears, and the address travels
  in the WhatsApp message. The mode is printed in bold with an icon
  (`🛵 डिलीवरी` / `🏠 पिकअप`) so you can see it at a glance.

Set `deliveryEnabled: false` to go back to pickup only — the choice and the
address field disappear and nothing else needs changing.

### How a customer gives their delivery location

Two ways, and **either one alone is enough** — giving both is ideal:

1. **Type the full address** — flat/house no., street, landmark, area, PIN.
2. **Drop a pin on the map** — either "मेरी लोकेशन इस्तेमाल करें" (one tap, uses
   the phone's GPS) or "मैप पर चुनें" to place it by hand. The pin is draggable
   either way, because GPS is routinely 10–30 m out and in a flat complex that
   is the difference between two buildings.

The pin arrives in your WhatsApp as a **tappable Google Maps link**:

```
*🛵 डिलीवरी*
*पता:* फ्लैट 302, श्री रेजिडेंसी, हैदराबाद 500008
*📍 मैप लोकेशन:* https://www.google.com/maps/search/?api=1&query=17.365496,78.463902
_GPS सटीकता लगभग 12 m_
```

Tapping it opens Maps on the exact spot with a Directions button — no typing
an address into Maps yourself.

**Notes on the map:** it uses Leaflet with free OpenStreetMap tiles, so there
is no Google Maps API key and no billing account. Leaflet is a separate 43 KB
chunk that downloads **only** when a customer actually opens the map — pickup
customers never fetch it. OpenStreetMap's tiles are free for modest traffic
like this; if the site ever gets very busy, switch the tile URL in
`src/components/LocationPicker.jsx` to a provider like MapTiler.

Browser location needs HTTPS, which Netlify gives you automatically. If a
customer declines the permission, the map still opens and they place the pin
themselves.

**Delivery charge** is not shown on the site. The copy tells the customer it
depends on their area and that you will quote it on the confirmation call,
which matches how you actually work. If you ever want a flat charge displayed
and added to the total, that needs a small change in the cart — ask for it.

### The published street address

`SHOP.pickup.addressHi` / `addressEn` hold the shop's address, shown in the
Location section next to the map pin:

```
पेटला बुर्ज, चारमहल गुरुद्वारा, हैदराबाद
Petla Burj, Charmahal Gurudwara, Hyderabad
```

Clear both to go back to showing only the pin and a "Get directions" button —
a perfectly normal choice for a home kitchen that would rather not publish an
address. The map pin and directions work either way.

---

## Project layout

```
src/
├── data/
│   ├── shop.js          ← prices, contact, address, rules
│   └── i18n.js          ← all Hindi + English text
├── lib/order.js         ← builds the WhatsApp message (the only exit point)
├── hooks/
│   ├── useCart.js       ← cart state and totals
│   └── useCountdown.js  ← festival countdown
├── context/LanguageContext.jsx
├── components/          ← one file per section
└── styles/global.css    ← the poster palette lives at the top
```

## Colours

Sampled from the shop poster and defined once at the top of `global.css`:

| | |
|---|---|
| Oxblood maroon | `#7B1523` |
| Antique gold | `#C9A227` |
| Parchment cream | `#FBF1DC` |
| Forest green | `#2E4A2A` |
| Chocolate | `#4A251A` |
| Marigold | `#E8952A` |
