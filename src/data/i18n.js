/* ==========================================================================
   TRANSLATIONS — every word on the site lives here.
   Add a key to BOTH hi and en, then use it as t('your.key') in a component.
   ========================================================================== */

export const I18N = {
  hi: {
    'lang.other': 'English',
    'nav.menu': 'मेन्यू',
    'nav.order': 'ऑर्डर करें',
    'nav.why': 'क्यों हम',
    'nav.pickup': 'लोकेशन',

    'hero.preorder': 'प्री ऑर्डर शुरू है!',
    'hero.tagline': 'पारंपरिक स्वाद, प्यार के साथ',
    'hero.badge1': 'ताज़ा',
    'hero.badge2': 'शुद्ध',
    'hero.badge3': 'घरेलू स्वाद',
    'hero.headline1': 'खुशियाँ हर',
    'hero.headline2': 'निवाले में!',
    'hero.body':
      'पारंपरिक विधि से, बेहतरीन सामग्री के साथ तैयार किए गए हमारे स्वादिष्ट मोदक, जो लाते हैं शुद्धता, परंपरा और प्रेम का स्वाद।',
    'hero.cta': 'अभी ऑर्डर करें',
    'hero.cta2': 'मेन्यू देखें',
    'hero.note': 'आज ऑर्डर करें, कल मिठास पाएँ',

    'count.label': 'में बाकी',
    'count.days': 'दिन',
    'count.hours': 'घंटे',
    'count.mins': 'मिनट',
    'count.secs': 'सेकंड',

    'menu.eyebrow': 'अपना मनपसंद मोदक चुनें',
    'menu.title': 'हमारे मोदक',
    'menu.limited': 'सीमित मात्रा प्रतिदिन!',
    'menu.pieces': 'पीस',
    'menu.add': 'जोड़ें',
    'menu.plus': 'एक और जोड़ें',
    'menu.minus': 'एक कम करें',

    'order.eyebrow': 'प्री ऑर्डर अभी करें',
    'order.title': 'आपका ऑर्डर',
    'order.sub':
      'नीचे अपनी जानकारी भरें। ऑर्डर सीधे हमारे WhatsApp पर आएगा — फिर हम आपको कॉल करके कन्फर्म करेंगे।',
    'order.empty':
      'अभी तक कोई मोदक नहीं चुना गया। ऊपर मेन्यू से अपना मनपसंद मोदक चुनें।',
    'order.emptyCta': 'मेन्यू पर जाएँ',
    'order.items': 'चुने हुए मोदक',
    'order.total': 'कुल राशि',
    'order.clear': 'सब हटाएँ',

    'form.name': 'आपका नाम',
    'form.namePh': 'जैसे: राहुल शर्मा',
    'form.phone': 'WhatsApp नंबर',
    'form.phonePh': '10 अंकों का नंबर',
    'form.date': 'कब चाहिए?',
    'form.slotPickup': 'पिकअप का समय',
    'form.slotDelivery': 'डिलीवरी का समय',
    'form.slotPh': 'समय चुनें',
    'form.notes': 'कुछ और कहना है? (वैकल्पिक)',
    'form.notesPh': 'जैसे: कम मीठा, गिफ्ट पैकिंग चाहिए',
    'form.submit': 'WhatsApp पर ऑर्डर भेजें',

    'form.mode': 'ऑर्डर कैसे चाहिए?',
    'form.pickup': 'पिकअप',
    'form.delivery': 'डिलीवरी',
    'form.address': 'डिलीवरी का पूरा पता',
    'form.addressPh': 'फ्लैट / मकान नं., गली, लैंडमार्क, इलाका, पिन कोड',
    'form.or': 'या',

    'geo.title': 'मैप पर डिलीवरी लोकेशन',
    'geo.hint':
      'पता लिखें या मैप पर पिन लगाएँ। दोनों दे दें तो डिलीवरी सबसे आसान हो जाती है।',
    'geo.useMine': 'मेरी लोकेशन इस्तेमाल करें',
    'geo.locating': 'लोकेशन ढूँढ रहे हैं…',
    'geo.pickMap': 'मैप पर चुनें',
    'geo.hide': 'मैप बंद करें',
    'geo.drag': 'पिन को खींचकर या मैप पर टैप करके अपनी सही जगह चुनें।',
    'geo.mapLoading': 'मैप लोड हो रहा है…',
    'geo.mapFailed': 'मैप लोड नहीं हो पाया। कृपया ऊपर वाले बॉक्स में अपना पता लिख दीजिए — वही काफ़ी है।',
    'geo.set': 'लोकेशन चुन ली गई',
    'geo.accuracy': 'लगभग',
    'geo.change': 'मैप पर बदलें',
    'geo.done': 'मैप बंद करें',
    'geo.clear': 'हटाएँ',
    'geo.denied':
      'लोकेशन की अनुमति नहीं मिली। कोई बात नहीं — नीचे मैप पर खुद पिन लगा दीजिए।',
    'geo.failed': 'लोकेशन नहीं मिल पाई। कृपया नीचे मैप पर पिन लगाएँ।',
    'geo.unsupported': 'इस ब्राउज़र में लोकेशन उपलब्ध नहीं है। मैप पर पिन लगाएँ।',
    'form.pickupNote':
      'ऑर्डर तैयार होने पर आप उसे नीचे दी गई लोकेशन से ले सकते हैं।',
    'form.deliveryNote':
      'डिलीवरी चार्ज आपके इलाके के हिसाब से लगेगा — कन्फर्मेशन कॉल पर बता देंगे।',

    'err.empty': 'कृपया पहले मेन्यू से मोदक चुनें।',
    'err.name': 'कृपया अपना नाम लिखें।',
    'err.phone': 'कृपया सही 10 अंकों का WhatsApp नंबर लिखें।',
    'err.date': 'कृपया तारीख़ चुनें।',
    'err.slot': 'कृपया समय चुनें।',
    'err.address': 'कृपया पता लिखें या मैप पर अपनी लोकेशन चुनें।',
    'err.addressShort':
      'पता थोड़ा और पूरा लिखिए — मकान/फ्लैट नं., गली और पास का लैंडमार्क। या मैप पर पिन लगा दीजिए।',

    'sent.title': 'WhatsApp खुल रहा है',
    'sent.body':
      'आपका ऑर्डर WhatsApp में तैयार है। बस भेजें दबाएँ — तभी हमें ऑर्डर मिलेगा।',
    'sent.retry': 'WhatsApp नहीं खुला? यहाँ दबाएँ',
    'sent.close': 'ठीक है',

    'why.eyebrow': 'क्यों मोडक आंगन',
    'why.title': 'हर मोदक में हमारा भरोसा',
    'why.1t': 'ताज़ा और ऑर्डर पर बनाया जाता है',
    'why.1b': 'हर मोदक स्वच्छता और देखभाल के साथ तैयार किया जाता है।',
    'why.2t': 'शुद्ध और सर्वोत्तम सामग्री',
    'why.2b': 'केवल बेहतरीन सामग्री से बनता है हमारा हर मोदक।',
    'why.3t': 'हर अवसर के लिए बेहतरीन',
    'why.3b': 'त्योहार, शुभ अवसर, गिफ्टिंग, पूजा और मीठी क्रेविंग के लिए।',
    'why.4t': 'समय पर डिलीवरी',
    'why.4b': 'सुरक्षित पैकिंग के साथ, आपके दरवाज़े तक स्वाद और प्रेम पहुँचाते हैं।',

    'pickup.eyebrow': 'लोकेशन',
    'pickup.title': 'पिकअप या डिलीवरी',
    'pickup.addr': 'पता',
    'pickup.hours': 'समय',
    'pickup.maps': 'गूगल मैप्स में खोलें',
    'pickup.directions': 'रास्ता देखें',
    'pickup.showMap': 'मैप पर देखें',
    'pickup.hideMap': 'मैप बंद करें',
    'pickup.mapAria': 'मोडक आंगन की लोकेशन का मैप',
    'pickup.ask': 'ऑर्डर कन्फर्म होते ही हम आपको WhatsApp पर पूरा पता भेज देंगे।',
    'pickup.viaMap':
      'नीचे “रास्ता देखें” दबाइए — गूगल मैप्स सीधे हम तक का रास्ता दिखा देगा।',
    'pickup.delivery': 'नहीं आ सकते? हम आपके दरवाज़े तक भी पहुँचाते हैं — ऑर्डर करते समय डिलीवरी चुनें।',
    'pickup.askCta': 'पता पूछें',
    'pickup.note':
      'ऑर्डर कन्फर्म होने के बाद हम आपको कॉल करेंगे, और तैयार होने पर WhatsApp पर बता देंगे।',

    'foot.follow': 'हमें फ़ॉलो करें',
    'foot.dm': 'ऑर्डर के लिए DM करें',
    'foot.tag1': 'शुद्ध सामग्री',
    'foot.tag2': 'घरेलू स्वाद',
    'foot.tag3': 'परंपरा का स्वाद, प्रेम के साथ',
    'foot.rights': 'सभी अधिकार सुरक्षित।',

    'fab.aria': 'WhatsApp पर चैट करें',
  },

  en: {
    'lang.other': 'हिंदी',
    'nav.menu': 'Menu',
    'nav.order': 'Order',
    'nav.why': 'Why Us',
    'nav.pickup': 'Location',

    'hero.preorder': 'Pre-orders are open!',
    'hero.tagline': 'Traditional taste, made with love',
    'hero.badge1': 'Fresh',
    'hero.badge2': 'Pure',
    'hero.badge3': 'Homemade',
    'hero.headline1': 'Joy in every',
    'hero.headline2': 'single bite!',
    'hero.body':
      'Made the traditional way with the finest ingredients, our modaks carry the taste of purity, tradition and love straight to your home.',
    'hero.cta': 'Order now',
    'hero.cta2': 'See the menu',
    'hero.note': 'Order today, sweetness tomorrow',

    'count.label': 'to go until',
    'count.days': 'Days',
    'count.hours': 'Hours',
    'count.mins': 'Mins',
    'count.secs': 'Secs',

    'menu.eyebrow': 'Choose your favourite modak',
    'menu.title': 'Our Modaks',
    'menu.limited': 'Limited quantity daily!',
    'menu.pieces': 'pcs',
    'menu.add': 'Add',
    'menu.plus': 'Add one more',
    'menu.minus': 'Remove one',

    'order.eyebrow': 'Pre-order now',
    'order.title': 'Your Order',
    'order.sub':
      'Fill in your details below. The order goes straight to our WhatsApp, then we call you to confirm.',
    'order.empty':
      'No modaks picked yet. Choose your favourites from the menu above.',
    'order.emptyCta': 'Go to menu',
    'order.items': 'Selected modaks',
    'order.total': 'Total',
    'order.clear': 'Clear all',

    'form.name': 'Your name',
    'form.namePh': 'e.g. Rahul Sharma',
    'form.phone': 'WhatsApp number',
    'form.phonePh': '10-digit number',
    'form.date': 'When do you need it?',
    'form.slotPickup': 'Pickup time',
    'form.slotDelivery': 'Delivery time',
    'form.slotPh': 'Choose a time',
    'form.notes': 'Anything else? (optional)',
    'form.notesPh': 'e.g. less sweet, gift packing',
    'form.submit': 'Send order on WhatsApp',

    'form.mode': 'How would you like it?',
    'form.pickup': 'Pickup',
    'form.delivery': 'Delivery',
    'form.address': 'Full delivery address',
    'form.addressPh': 'Flat / house no., street, landmark, area, PIN code',
    'form.or': 'or',

    'geo.title': 'Delivery location on the map',
    'geo.hint':
      'Type the address or drop a pin on the map. Giving both makes delivery easiest.',
    'geo.useMine': 'Use my current location',
    'geo.locating': 'Finding your location…',
    'geo.pickMap': 'Choose on map',
    'geo.hide': 'Hide map',
    'geo.drag': 'Drag the pin, or tap the map, to place it exactly.',
    'geo.mapLoading': 'Loading the map…',
    'geo.mapFailed': 'The map could not load. Please just type your address in the box above — that is enough.',
    'geo.set': 'Location pinned',
    'geo.accuracy': 'about',
    'geo.change': 'Adjust on map',
    'geo.done': 'Hide map',
    'geo.clear': 'Remove',
    'geo.denied':
      'Location permission was declined. No problem — place the pin yourself on the map below.',
    'geo.failed': 'Could not find your location. Please place the pin on the map below.',
    'geo.unsupported': 'This browser cannot share your location. Place the pin on the map.',
    'form.pickupNote':
      'Collect your order from the location below once it is ready.',
    'form.deliveryNote':
      'Delivery charge depends on your area — we will tell you on the confirmation call.',

    'err.empty': 'Please pick some modaks from the menu first.',
    'err.name': 'Please enter your name.',
    'err.phone': 'Please enter a valid 10-digit WhatsApp number.',
    'err.date': 'Please choose a date.',
    'err.slot': 'Please choose a time.',
    'err.address': 'Please write the address or pick your location on the map.',
    'err.addressShort':
      'Please add a bit more — house/flat no., street and a nearby landmark. Or drop a pin on the map.',

    'sent.title': 'Opening WhatsApp',
    'sent.body':
      'Your order is ready in WhatsApp. Just press Send — we only receive it after that.',
    'sent.retry': 'WhatsApp did not open? Tap here',
    'sent.close': 'Got it',

    'why.eyebrow': 'Why Modak Aangan',
    'why.title': 'Our promise in every modak',
    'why.1t': 'Fresh, made to order',
    'why.1b': 'Every modak is prepared with care and full hygiene.',
    'why.2t': 'Pure, finest ingredients',
    'why.2b': 'Nothing but the best goes into each one of our modaks.',
    'why.3t': 'Perfect for every occasion',
    'why.3b': 'Festivals, poojas, gifting, and plain old sweet cravings.',
    'why.4t': 'On-time delivery',
    'why.4b': 'Safely packed and brought to your door, taste and love intact.',

    'pickup.eyebrow': 'Location',
    'pickup.title': 'Pickup or delivery',
    'pickup.addr': 'Address',
    'pickup.hours': 'Hours',
    'pickup.maps': 'Open in Google Maps',
    'pickup.directions': 'Get directions',
    'pickup.showMap': 'Show on map',
    'pickup.hideMap': 'Hide map',
    'pickup.mapAria': 'Map showing the Modak Aangan location',
    'pickup.ask': 'We will send you the full address on WhatsApp as soon as your order is confirmed.',
    'pickup.viaMap':
      'petla burj, Charmahal gurudwara',
    'pickup.delivery': 'Cannot come over? We deliver to your door too — just choose Delivery when you order.',
    'pickup.askCta': 'Ask for the address',
    'pickup.note':
      'We will call you after confirming, and message you on WhatsApp when the order is ready.',

    'foot.follow': 'Follow us',
    'foot.dm': 'DM us to order',
    'foot.tag1': 'Pure ingredients',
    'foot.tag2': 'Homemade taste',
    'foot.tag3': 'The taste of tradition, made with love',
    'foot.rights': 'All rights reserved.',

    'fab.aria': 'Chat on WhatsApp',
  },
}
