/* ==========================================================================
   मोदक आंगन — MODAK AANGAN
   --------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED FOR DAY-TO-DAY CHANGES.
   Change a price, add a variety, update the address — all right here.
   Save the file and the page updates by itself.
   ========================================================================== */

export const SHOP = {
  /* --- Contact -------------------------------------------------------- */
  whatsapp: '918688439375', // country code + number. No "+", no spaces.
  phoneDisplay: '86884 39375',
  instagram: 'modak_aangan',

  /* --- Pickup details (shown in the Location section) ------------------
     Set both address lines to '' to keep the written address off the public
     page — the map pin and the "Get directions" button keep working, and the
     page instead offers to send the address on WhatsApp. Plenty of home
     kitchens prefer that.                                                 */
  pickup: {
    addressHi: 'पेटला बुर्ज, चारमहल गुरुद्वारा, हैदराबाद',
    addressEn: 'Petla Burj, Charmahal Gurudwara, Hyderabad',

    /* The shop's pin: 17°21'55.8"N 78°27'50.1"E.
       Everything map-related is built from these two numbers — the "view on
       map" preview, the Google Maps link and the Directions link. To move the
       shop, change only these.
       To get them: open Google Maps, long-press your spot, and copy the
       two numbers it shows. Do NOT paste a long maps.google.com URL here —
       those carry a session token that stops working after a while. */
    lat: 17.3654957,
    lng: 78.4639015,

    hoursHi: 'रोज़ सुबह 9:00 – रात 8:00',
    hoursEn: 'Daily 9:00 AM – 8:00 PM',
  },

  /* --- Countdown -------------------------------------------------------
     IMPORTANT: confirm this date and correct it if it is wrong.          */
  festivalDate: '2026-09-14',
  festivalNameHi: 'गणेश चतुर्थी',
  festivalNameEn: 'Ganesh Chaturthi',

  /* --- Order rules ----------------------------------------------------- */
  minLeadDays: 1, // 1 = no same-day orders. Set 2 to ask for two days' notice.
  currency: '₹',

  /* --- Pickup time slots ----------------------------------------------- */
  slots: [
    { id: 'morning', hi: 'सुबह 9:00 – 12:00', en: 'Morning 9:00 – 12:00' },
    { id: 'afternoon', hi: 'दोपहर 12:00 – 4:00', en: 'Afternoon 12:00 – 4:00' },
    { id: 'evening', hi: 'शाम 4:00 – 8:00', en: 'Evening 4:00 – 8:00' },
  ],

  /* --- Fulfilment ------------------------------------------------------
     true  = customers choose Pickup or Delivery, and Delivery asks for an
             address. Set false to go back to pickup-only; the choice and the
             address field disappear and nothing else needs changing.      */
  deliveryEnabled: true,
}

/* ==========================================================================
   THE MENU
   To change a price, edit the number.
   To add a variety, copy a whole { ... } block and edit it.

   theme: 'cocoa' | 'leaf' | 'ivory'   picks the card colour
   image: the photo's short name. The real files live in assets-src/ and are
          shrunk into public/img/ by `npm run images`. To swap a photo, drop
          the new one into assets-src/ under the same filename and re-run it.
   ========================================================================== */

export const PRODUCTS = [
  {
    id: 'chocolate',
    theme: 'cocoa',
    image: 'chocolate', // assets-src/chocolate-modak.png
    name: { hi: 'चॉकलेट मोदक', en: 'Chocolate Modak' },
    desc: {
      hi: 'चॉकलेट की भरपूर मिठास, हर बाइट में खास एहसास।',
      en: 'Deep, rich chocolate — a little celebration in every bite.',
    },
    packs: [
      { qty: 6, price: 150 },
      { qty: 11, price: 250 },
      { qty: 21, price: 500 },
    ],
  },
  {
    id: 'paan',
    theme: 'leaf',
    image: 'paan', // assets-src/pan-modak.png
    name: { hi: 'पान मोदक', en: 'Paan Modak' },
    desc: {
      hi: 'पान के ताज़ा स्वाद का अनोखा मिश्रण, जो मन मोह ले।',
      en: 'A cool, fragrant paan blend that wins everyone over.',
    },
    packs: [
      { qty: 6, price: 140 },
      { qty: 11, price: 230 },
      { qty: 21, price: 480 },
    ],
  },
  {
    id: 'classic',
    theme: 'ivory',
    image: 'classic', // assets-src/steam-modak.png
    name: { hi: 'क्लासिक स्टीम मोदक', en: 'Classic Steam Modak' },
    desc: {
      hi: 'पारंपरिक और कालजयी स्वाद, जो हमेशा दिल को भाए।',
      en: 'The timeless steamed classic, exactly the way it should taste.',
    },
    packs: [
      { qty: 6, price: 120 },
      { qty: 11, price: 210 },
      { qty: 21, price: 400 },
    ],
  },
]
