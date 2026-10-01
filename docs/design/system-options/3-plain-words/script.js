/**
 * @file script.js – The only script for direction 3, "Plain Words".
 *
 * It enhances pages that already work without it (brief section 2):
 *   - the English / සිංහල switch on the request form and the driver's route
 *     (FR-65), remembered in localStorage under "pt-lang";
 *   - the request form: reveals, the passenger stepper, extra stops, blur and
 *     submit validation with an error summary, the live "Check your request"
 *     sentence (this direction's signature) and the confirmation state;
 *   - the coordinator dashboard: choosing bookings, Approve with Undo, the
 *     approve-plan dialog and the list view (FR-19, FR-29, FR-34, US-22);
 *   - the driver's route: Done, No-show, Undo, Navigate and offline (US-60).
 *
 * The dashboard and driver renderers return HTML strings and touch no DOM, so
 * the same functions produced the static HTML in dashboard.html and
 * driver.html. In a browser the file is a classic script in an IIFE (it must
 * run from file://, where ES modules are blocked). Under Node it only exports
 * the renderers.
 *
 * Sections:
 *   1. Shared strings (brief 4.9) and this direction's extra strings
 *   2. Small helpers (DOM, escaping, icons)
 *   3. Time and date formatting (NFR-12)
 *   4. Language switch (FR-65)
 *   5. Request form
 *   6. Dashboard data and renderers
 *   7. Dashboard behaviour
 *   8. Driver data and renderers
 *   9. Driver behaviour
 *  10. Start-up and Node export
 */
/**
 * Wraps the whole script so nothing leaks into the page's global scope; runs
 * at once (the script is loaded with defer, so the DOM is ready).
 * @returns {void}
 */
(function () {
  'use strict';

  // === Section: 1. Shared strings ===

  /**
   * Shared English and Sinhala strings for the public pages (brief section 4.9).
   * All Sinhala is a draft for native-speaker review (D-09). Placeholders in braces
   * ({time}, {min}, {done}, {total}) are replaced by the script.
   * @type {{en: Object<string, string>, si: Object<string, string>}}
   */
  const STRINGS = {
    en: {
      "form.title": "Request a van",
      "form.intro": "It takes about 2 minutes. We'll send you a text when a coordinator confirms your trip.",
      "lang.label": "Language",
      "section.you": "About you",
      "section.trip": "Your trip",
      "section.extra": "Anything special?",
      "name.label": "Your name",
      "phone.label": "Your phone number",
      "phone.hint": "For example, 077 123 4567",
      "whatsapp.label": "Send my updates on WhatsApp instead of SMS",
      "email.label": "Email (optional)",
      "email.hint": "We'll send a copy of your updates here.",
      "purpose.legend": "What is the trip for?",
      "purpose.class": "Class trip",
      "purpose.sport": "Sport",
      "purpose.errand": "Staff errand",
      "purpose.event": "Meeting or event",
      "purpose.other": "Other",
      "date.label": "Date of trip",
      "date.hint": "For example, 13/10/2026",
      "cutoff.open": "Requests for tomorrow close at 5:00 pm today.",
      "cutoff.closed": "Requests for tomorrow are closed. For urgent transport, call the transport office on 011 000 0100.",
      "from.label": "Pick up from",
      "to.label": "Going to",
      "place.branches": "Our branches",
      "place.venues": "Venues",
      "place.address": "Type another address",
      "place.map": "Choose on map",
      "stop.add": "+ Add a stop",
      "time.label": "Pickup time",
      "flex.legend": "How flexible is your pickup time?",
      "flex.exact": "Exact time",
      "flex.10": "± 10 min",
      "flex.20": "± 20 min",
      "flex.30": "± 30 min",
      "arrive.label": "Must arrive by (optional)",
      "pax.label": "How many passengers (not counting the driver)?",
      "pax.decrease": "One fewer passenger",
      "pax.increase": "One more passenger",
      "pax.split": "This group needs more than one van – we'll arrange this.",
      "return.legend": "Do you need a return trip?",
      "yes": "Yes",
      "no": "No",
      "return.time": "Return pickup time",
      "return.stay": "Van must stay with us (for example, for equipment or safety)",
      "special.wheelchair": "Wheelchair access needed",
      "special.equipment": "Large equipment",
      "special.notes": "Anything else we should know?",
      "submit": "Send request",
      "privacy": "We use your name and phone number only to plan this trip. Transport coordinators and the van driver will see them. We keep them for 24 months.",
      "privacy.link": "How we use your details",
      "err.summary": "There is a problem",
      "err.name": "Please enter your name",
      "err.phone.empty": "Please enter a phone number",
      "err.phone.format": "Enter a phone number like 077 123 4567",
      "err.purpose": "Choose what the trip is for",
      "err.date.past": "The date of the trip must be today or later",
      "err.from": "Choose where to pick you up",
      "err.to": "Choose where you are going",
      "err.time": "Enter a pickup time",
      "err.pax": "Please enter a number between 1 and 99",
      "err.return": "Choose Yes or No",
      "err.return.time": "The return pickup time must be after the pickup time",
      "done.title": "Request received",
      "done.ref": "Your reference is",
      "done.next": "We'll send you a text when a coordinator confirms your trip. Final pickup details come on the morning of the trip.",
      "done.another": "Request another trip",
      "driver.title": "Today's route",
      "driver.stop": "Stop",
      "driver.pickup": "Pick up",
      "driver.dropoff": "Drop off",
      "driver.passengers": "passengers",
      "driver.navigate": "Navigate",
      "driver.call": "Call",
      "driver.done": "Done",
      "driver.noshow": "No-show",
      "driver.next": "Next stop",
      "driver.offline": "You are offline. This is the route as last loaded at 9:38 am.",
      "driver.gap": "Gap job",
      "driver.end": "End of day at Branch A",
      "lang.note": "Your language choice is remembered on this phone.",
      "day.today": "Today",
      "day.tomorrow": "Tomorrow",
      "day.monday": "Monday",
      "day.tuesday": "Tuesday",
      "day.wednesday": "Wednesday",
      "day.thursday": "Thursday",
      "day.friday": "Friday",
      "date.closed": "Closed",
      "date.other": "Another date",
      "cutoff.monday": "Requests for Monday close at 7:00 am on Monday.",
      "cutoff.today.closed": "Requests for today closed at 7:00 am. For urgent transport, call the transport office on 011 000 0100.",
      "time.choose": "Choose a time",
      "time.morning": "Morning",
      "time.afternoon": "Afternoon",
      "time.am": "am",
      "time.pm": "pm",
      "hours.warning": "Trips after 6:00 pm are outside our normal hours. A coordinator will check your request.",
      "place.choose": "Choose a place",
      "place.other": "Another address",
      "place.landmark": "Landmark or directions (optional)",
      "stop.label": "Extra stop",
      "stop.remove": "Remove this stop",
      "arrive.add": "Add a time you must arrive by",
      "err.date": "Choose the date of the trip",
      "err.date.format": "Enter a date like 13/10/2026",
      "err.return.empty": "Choose a return pickup time",
      "summary.title": "Check your request",
      "done.what": "What happens next",
      "label.purpose": "Trip for",
      "label.date": "Date",
      "label.pickup": "Pick up",
      "label.goingto": "Going to",
      "label.passengers": "Passengers",
      "label.return": "Return",
      "driver.driver": "Driver",
      "driver.van": "Van",
      "driver.in": "in {min} min",
      "driver.doneat": "Done at {time}",
      "driver.noshowat": "No-show at {time}",
      "driver.undo": "Undo",
      "driver.noshow.confirm": "Mark as no-show? We will tell the transport coordinators.",
      "driver.noshow.yes": "Yes, mark no-show",
      "driver.goback": "Go back",
      "driver.contact": "Contact",
      "driver.progress": "{done} of {total} stops done",
      "driver.updated": "Route updated at {time}",
      "driver.navnote": "Opens your map app"
    },
    si: {
      "form.title": "වෑන් රථයක් ඉල්ලන්න",
      "form.intro": "මිනිත්තු 2ක් පමණ ගත වේ. සම්බන්ධීකාරකවරයෙක් ඔබේ ගමන තහවුරු කළ විට අපි ඔබට කෙටි පණිවිඩයක් එවන්නෙමු.",
      "lang.label": "භාෂාව",
      "section.you": "ඔබ ගැන",
      "section.trip": "ඔබේ ගමන",
      "section.extra": "විශේෂ අවශ්‍යතා තිබේද?",
      "name.label": "ඔබේ නම",
      "phone.label": "ඔබේ දුරකථන අංකය",
      "phone.hint": "උදාහරණය: 077 123 4567",
      "whatsapp.label": "මගේ යාවත්කාලීන තොරතුරු SMS වෙනුවට WhatsApp මඟින් එවන්න",
      "email.label": "ඊමේල් (අවශ්‍ය නම් පමණක්)",
      "email.hint": "ඔබේ යාවත්කාලීන තොරතුරුවල පිටපතක් මෙයට එවන්නෙමු.",
      "purpose.legend": "ගමන කුමක් සඳහාද?",
      "purpose.class": "පන්ති චාරිකාව",
      "purpose.sport": "ක්‍රීඩා",
      "purpose.errand": "කාර්ය මණ්ඩල රාජකාරි ගමන",
      "purpose.event": "රැස්වීම හෝ උත්සවය",
      "purpose.other": "වෙනත්",
      "date.label": "ගමනේ දිනය",
      "date.hint": "උදාහරණය: 13/10/2026",
      "cutoff.open": "හෙට දිනයේ ගමන් සඳහා ඉල්ලීම් අද ප.ව. 5:00ට අවසන් වේ.",
      "cutoff.closed": "හෙට දිනයේ ගමන් සඳහා ඉල්ලීම් අවසන්. හදිසි ප්‍රවාහනය සඳහා ප්‍රවාහන කාර්යාලයට 011 000 0100 අමතන්න.",
      "from.label": "ගමන ආරම්භ වන ස්ථානය",
      "to.label": "යන ස්ථානය",
      "place.branches": "අපේ ශාඛා",
      "place.venues": "ක්‍රියාකාරකම් ස්ථාන",
      "place.address": "වෙනත් ලිපිනයක් ලියන්න",
      "place.map": "සිතියමෙන් තෝරන්න",
      "stop.add": "+ නැවතුමක් එක් කරන්න",
      "time.label": "පිටත් වන වේලාව",
      "flex.legend": "පිටත් වන වේලාව කොපමණ වෙනස් විය හැකිද?",
      "flex.exact": "නියමිත වේලාවටම",
      "flex.10": "± විනාඩි 10",
      "flex.20": "± විනාඩි 20",
      "flex.30": "± විනාඩි 30",
      "arrive.label": "පැමිණිය යුතු අවසන් වේලාව (අවශ්‍ය නම් පමණක්)",
      "pax.label": "මගීන් කී දෙනෙක්ද? (රියදුරු හැර)",
      "pax.decrease": "මගීන් එක් අයෙකු අඩු කරන්න",
      "pax.increase": "මගීන් එක් අයෙකු වැඩි කරන්න",
      "pax.split": "මෙම කණ්ඩායමට වෑන් රථ එකකට වඩා අවශ්‍යයි – අපි එය සකස් කරන්නෙමු.",
      "return.legend": "ආපසු ගමනක් අවශ්‍යද?",
      "yes": "ඔව්",
      "no": "නැත",
      "return.time": "ආපසු පිටත් වන වේලාව",
      "return.stay": "වෑන් රථය අප සමඟ රැඳී සිටිය යුතුයි (උදා: උපකරණ හෝ ආරක්ෂාව සඳහා)",
      "special.wheelchair": "රෝද පුටු පහසුකම අවශ්‍යයි",
      "special.equipment": "විශාල උපකරණ",
      "special.notes": "අප දැනගත යුතු වෙනත් යමක් තිබේද?",
      "submit": "ඉල්ලීම යවන්න",
      "privacy": "ඔබේ නම සහ දුරකථන අංකය මෙම ගමන සැලසුම් කිරීමට පමණක් භාවිත කරමු. ප්‍රවාහන සම්බන්ධීකාරකවරුන්ට සහ වෑන් රියදුරුට ඒවා පෙනේ. අපි ඒවා මාස 24ක් තබා ගනිමු.",
      "privacy.link": "ඔබේ තොරතුරු භාවිත කරන ආකාරය",
      "err.summary": "ගැටලුවක් ඇත",
      "err.name": "කරුණාකර ඔබේ නම ඇතුළත් කරන්න",
      "err.phone.empty": "කරුණාකර දුරකථන අංකයක් ඇතුළත් කරන්න",
      "err.phone.format": "දුරකථන අංකය 077 123 4567 ආකාරයට ඇතුළත් කරන්න",
      "err.purpose": "ගමන කුමක් සඳහාද යන්න තෝරන්න",
      "err.date.past": "ගමනේ දිනය අද හෝ ඊට පසු දිනයක් විය යුතුයි",
      "err.from": "ගමන ආරම්භ වන ස්ථානය තෝරන්න",
      "err.to": "යන ස්ථානය තෝරන්න",
      "err.time": "පිටත් වන වේලාව ඇතුළත් කරන්න",
      "err.pax": "කරුණාකර 1 සිට 99 දක්වා අංකයක් ඇතුළත් කරන්න",
      "err.return": "ඔව් හෝ නැත තෝරන්න",
      "err.return.time": "ආපසු පිටත් වන වේලාව පිටත් වන වේලාවට පසුව විය යුතුයි",
      "done.title": "ඉල්ලීම ලැබුණා",
      "done.ref": "ඔබේ යොමු අංකය",
      "done.next": "සම්බන්ධීකාරකවරයෙක් ඔබේ ගමන තහවුරු කළ විට අපි ඔබට කෙටි පණිවිඩයක් එවන්නෙමු. අවසන් ගමන් විස්තර ගමන් දිනයේ උදෑසන ලැබේ.",
      "done.another": "තවත් ගමනක් ඉල්ලන්න",
      "driver.title": "අද ගමන් මාර්‍ගය",
      "driver.stop": "නැවතුම",
      "driver.pickup": "මගීන් නංවා ගන්න",
      "driver.dropoff": "මගීන් බස්සන්න",
      "driver.passengers": "මගීන්",
      "driver.navigate": "මඟ පෙන්වන්න",
      "driver.call": "අමතන්න",
      "driver.done": "නිම කළා",
      "driver.noshow": "මගීන් පැමිණියේ නැත",
      "driver.next": "ඊළඟ නැවතුම",
      "driver.offline": "ඔබ අන්තර්ජාලයට සම්බන්ධ නැත. මෙය පෙ.ව. 9:38ට අවසන් වරට ලබාගත් ගමන් මාර්‍ගයයි.",
      "driver.gap": "අතරමැදි ගමන",
      "driver.end": "දවස A ශාඛාවෙන් අවසන්",
      "lang.note": "ඔබේ භාෂා තේරීම මෙම දුරකථනයේ මතක තබා ගනී.",
      "day.today": "අද",
      "day.tomorrow": "හෙට",
      "day.monday": "සඳුදා",
      "day.tuesday": "අඟහරුවාදා",
      "day.wednesday": "බදාදා",
      "day.thursday": "බ්‍රහස්පතින්දා",
      "day.friday": "සිකුරාදා",
      "date.closed": "වසා ඇත",
      "date.other": "වෙනත් දිනයක්",
      "cutoff.monday": "සඳුදා දිනයේ ගමන් සඳහා ඉල්ලීම් සඳුදා පෙ.ව. 7:00ට අවසන් වේ.",
      "cutoff.today.closed": "අද දිනයේ ගමන් සඳහා ඉල්ලීම් පෙ.ව. 7:00ට අවසන් විය. හදිසි ප්‍රවාහනය සඳහා ප්‍රවාහන කාර්යාලයට 011 000 0100 අමතන්න.",
      "time.choose": "වේලාවක් තෝරන්න",
      "time.morning": "උදෑසන",
      "time.afternoon": "පස්වරුව",
      "time.am": "පෙ.ව.",
      "time.pm": "ප.ව.",
      "hours.warning": "ප.ව. 6:00ට පසු ගමන් අපගේ සාමාන්‍ය වේලාවෙන් පිටතය. සම්බන්ධීකාරකවරයෙක් ඔබේ ඉල්ලීම පරීක්ෂා කරනු ඇත.",
      "place.choose": "ස්ථානයක් තෝරන්න",
      "place.other": "වෙනත් ලිපිනයක්",
      "place.landmark": "සලකුණක් හෝ මඟ විස්තර (අවශ්‍ය නම් පමණක්)",
      "stop.label": "අමතර නැවතුම",
      "stop.remove": "මෙම නැවතුම ඉවත් කරන්න",
      "arrive.add": "පැමිණිය යුතු වේලාවක් එක් කරන්න",
      "err.date": "ගමනේ දිනය තෝරන්න",
      "err.date.format": "දිනය 13/10/2026 ආකාරයට ඇතුළත් කරන්න",
      "err.return.empty": "ආපසු පිටත් වන වේලාව තෝරන්න",
      "summary.title": "ඔබේ ඉල්ලීම පරීක්ෂා කරන්න",
      "done.what": "ඊළඟට සිදු වන්නේ",
      "label.purpose": "ගමනේ අරමුණ",
      "label.date": "දිනය",
      "label.pickup": "පිටත් වීම",
      "label.goingto": "යන ස්ථානය",
      "label.passengers": "මගීන්",
      "label.return": "ආපසු ගමන",
      "driver.driver": "රියදුරු",
      "driver.van": "වෑන්",
      "driver.in": "විනාඩි {min}කින්",
      "driver.doneat": "{time}ට නිම කළා",
      "driver.noshowat": "{time}ට මගීන් පැමිණියේ නැත",
      "driver.undo": "ආපසු හරවන්න",
      "driver.noshow.confirm": "මගීන් පැමිණියේ නැති බව සටහන් කරන්නද? අපි ප්‍රවාහන සම්බන්ධීකාරකවරුන්ට දැනුම් දෙන්නෙමු.",
      "driver.noshow.yes": "ඔව්, සටහන් කරන්න",
      "driver.goback": "ආපසු යන්න",
      "driver.contact": "සම්බන්ධ කරගන්න",
      "driver.progress": "නැවතුම් {total}න් {done}ක් නිම කළා",
      "driver.updated": "ගමන් මාර්‍ගය {time}ට යාවත්කාලීන කළා",
      "driver.navnote": "ඔබේ සිතියම් යෙදුම විවෘත කරයි"
    }
  };

  /**
   * Strings this direction adds for its own parts (the sentence, labels the
   * shared table does not cover). The Sinhala is a draft by the ux-designer
   * for native-speaker review (D-09), like the shared strings.
   * @type {{en: Object<string, string>, si: Object<string, string>}}
   */
  const EXTRA = {
    en: {
      'x.office': 'Transport office',
      'x.place.saved': 'Other places',
      'x.map.note': 'The map is not part of this sample. Type the address instead.',
      'x.stop.action': 'Pick up or drop off?',
      'x.stop.pax': 'Passengers getting on or off',
      'x.error': 'Error:',
      'x.gaps': 'Words in [brackets] are still missing. Choose one to answer it.',
      'x.complete': 'If this is right, send your request.',
      'x.gap.pax': '[how many]',
      'x.gap.from': '[pick up place]',
      'x.gap.to': '[where to]',
      'x.gap.date': '[date]',
      'x.gap.time': '[pickup time]',
      'x.gap.return': '[return trip?]',
      'x.gap.rtime': '[return time]',
      'x.stays': 'The van stays with you.',
      'x.day.saturday': 'Saturday',
      'x.day.sunday': 'Sunday',
      'x.later': 'Later stops',
      'x.booking': 'Booking',
      'x.note': 'Note',
      'x.passenger': 'passenger'
    },
    si: {
      'x.office': 'ප්‍රවාහන කාර්යාලය',
      'x.place.saved': 'වෙනත් ස්ථාන',
      'x.map.note': 'සිතියම මෙම නිදර්ශනයේ කොටසක් නොවේ. ඒ වෙනුවට ලිපිනය ලියන්න.',
      'x.stop.action': 'මගීන් නංවා ගන්නද, බස්සන්නද?',
      'x.stop.pax': 'නගින හෝ බසින මගීන් ගණන',
      'x.error': 'දෝෂය:',
      'x.gaps': '[වරහන් තුළ] ඇති කොටස් තවම පුරවා නැත. පිළිතුරු දීමට එකක් තෝරන්න.',
      'x.complete': 'මෙය නිවැරදි නම්, ඔබේ ඉල්ලීම යවන්න.',
      'x.gap.pax': '[කී දෙනෙක්ද]',
      'x.gap.from': '[ආරම්භ ස්ථානය]',
      'x.gap.to': '[යන ස්ථානය]',
      'x.gap.date': '[දිනය]',
      'x.gap.time': '[පිටත් වන වේලාව]',
      'x.gap.return': '[ආපසු ගමනක්?]',
      'x.gap.rtime': '[ආපසු වේලාව]',
      'x.stays': 'වෑන් රථය ඔබ සමඟ රැඳී සිටී.',
      'x.day.saturday': 'සෙනසුරාදා',
      'x.day.sunday': 'ඉරිදා',
      'x.later': 'ඉතිරි නැවතුම්',
      'x.booking': 'වෙන්කිරීම',
      'x.note': 'සටහන',
      'x.passenger': 'මගීන්'
    }
  };

  /** The language currently shown on a public page: "en" or "si". */
  let lang = 'en';

  /**
   * Looks up a string in the current language and fills its placeholders.
   * Falls back to English if a key is missing in Sinhala.
   * @param {string} key - A key from STRINGS or EXTRA, for example "form.title".
   * @param {Object<string, (string|number)>} [vars] - Values for {placeholders}.
   * @param {string} [inLang] - Language to use instead of the current one.
   * @returns {string} The finished string, or the key itself if unknown.
   */
  function t(key, vars, inLang) {
    const l = inLang || lang;
    let s = (STRINGS[l] && STRINGS[l][key]) || (EXTRA[l] && EXTRA[l][key]) ||
      STRINGS.en[key] || EXTRA.en[key] || key;
    if (vars) {
      for (const name of Object.keys(vars)) {
        s = s.split('{' + name + '}').join(String(vars[name]));
      }
    }
    return s;
  }

  // === Section: 2. Small helpers ===

  /**
   * Finds the first element matching a selector.
   * @param {string} sel - CSS selector.
   * @param {ParentNode} [root] - Where to search; the document by default.
   * @returns {?Element} The element, or null.
   */
  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  /**
   * Finds every element matching a selector, as a real array.
   * @param {string} sel - CSS selector.
   * @param {ParentNode} [root] - Where to search; the document by default.
   * @returns {Element[]} The elements, possibly none.
   */
  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /**
   * Escapes text for safe use inside HTML.
   * @param {(string|number)} value - Any text, including data typed by people.
   * @returns {string} The text with &, <, >, " and ' escaped.
   */
  function esc(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Returns the markup for one icon from the page's inline SVG sprite. Icons
   * are decoration beside words, so they are hidden from screen readers.
   * @param {string} name - Icon name without the "i-" prefix.
   * @param {string} [extraClass] - More classes for the <svg>.
   * @returns {string} The <svg> markup.
   */
  function icon(name, extraClass) {
    return '<svg class="icon' + (extraClass ? ' ' + extraClass : '') +
      '" aria-hidden="true" focusable="false"><use href="#i-' + name + '"/></svg>';
  }

  /**
   * Wraps English data (a place or a person's name) so that, on a Sinhala
   * page, it is marked as English and keeps its visual size (brief 3.5).
   * @param {string} text - The data as entered.
   * @returns {string} Escaped HTML, wrapped in <span lang="en"> when needed.
   */
  function data(text) {
    return lang === 'si' ? '<span lang="en">' + esc(text) + '</span>' : esc(text);
  }

  /**
   * Escapes text and keeps booking references (PT-2026-0142) on one line, so
   * a reference is never split across two lines in a sentence.
   * @param {string} text - Plain text that may contain references.
   * @returns {string} Escaped HTML.
   */
  function escRefs(text) {
    return esc(text).replace(/(PT-\d{4}-\d{4})/g, '<span class="nowrap">$1</span>');
  }

  /**
   * Turns a Sri Lankan phone number as shown ("077 000 0145") into a tel:
   * link target ("tel:+94770000145").
   * @param {string} shown - The number with spaces and a leading 0.
   * @returns {string} The tel: URL.
   */
  function telHref(shown) {
    return 'tel:+94' + shown.replace(/\s+/g, '').replace(/^0/, '');
  }

  // === Section: 3. Time and date formatting (NFR-12) ===

  /**
   * Formats a time of day. English: "8:45 am", "12:30 pm" (lower case, a
   * space, no leading zero). Sinhala: "පෙ.ව. 8:45", "ප.ව. 12:30"
   * (research.md question 6.1). Sri Lanka time; no time zone is ever shown.
   * @param {number} hours - 0 to 23.
   * @param {number} minutes - 0 to 59.
   * @param {string} [inLang] - "en" or "si"; the current language by default.
   * @returns {string} The formatted time.
   */
  function formatTime(hours, minutes, inLang) {
    const l = inLang || lang;
    const pm = hours >= 12;
    const h12 = hours % 12 === 0 ? 12 : hours % 12;
    const clock = h12 + ':' + String(minutes).padStart(2, '0');
    if (l === 'si') {
      return t(pm ? 'time.pm' : 'time.am', null, 'si') + ' ' + clock;
    }
    return clock + ' ' + (pm ? 'pm' : 'am');
  }

  /**
   * Converts "HH:MM" (24-hour, as stored in option values) to minutes.
   * @param {string} value - For example "08:45".
   * @returns {number} Minutes after midnight, or NaN if empty.
   */
  function toMinutes(value) {
    if (!value) {
      return NaN;
    }
    const parts = value.split(':');
    return Number(parts[0]) * 60 + Number(parts[1]);
  }

  /**
   * Formats minutes after midnight as a time of day.
   * @param {number} mins - Minutes after midnight.
   * @param {string} [inLang] - "en" or "si".
   * @returns {string} For example "10:45 am".
   */
  function minutesToTime(mins, inLang) {
    return formatTime(Math.floor(mins / 60), mins % 60, inLang);
  }

  /**
   * Formats a date as DD/MM/YYYY in both languages (NFR-12).
   * @param {Date} d - The date.
   * @returns {string} For example "13/10/2026".
   */
  function formatDate(d) {
    return String(d.getDate()).padStart(2, '0') + '/' +
      String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
  }

  /**
   * Formats a weekday and date: "Tuesday 13/10/2026" or
   * "අඟහරුවාදා 13/10/2026".
   * @param {Date} d - The date.
   * @param {string} [inLang] - "en" or "si".
   * @returns {string} The weekday name, a space and the date.
   */
  function formatWeekdayDate(d, inLang) {
    const keys = ['x.day.sunday', 'day.monday', 'day.tuesday', 'day.wednesday',
      'day.thursday', 'day.friday', 'x.day.saturday'];
    return t(keys[d.getDay()], null, inLang) + ' ' + formatDate(d);
  }

  /**
   * Reads an ISO date ("2026-10-13") as a local date.
   * @param {string} iso - Year, month and day joined by hyphens.
   * @returns {Date} The date at local midnight.
   */
  function fromIso(iso) {
    const p = iso.split('-');
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  /**
   * Reads a date typed as DD/MM/YYYY and checks it is a real date.
   * @param {string} text - What the person typed.
   * @returns {?Date} The date, or null if the format or date is wrong.
   */
  function parseTypedDate(text) {
    const m = /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(text);
    if (!m) {
      return null;
    }
    const d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
    if (d.getDate() !== Number(m[1]) || d.getMonth() !== Number(m[2]) - 1) {
      return null;
    }
    return d;
  }

  // === Section: 4. Language switch (FR-65) ===

  /**
   * Reads the remembered language. Storage can be blocked on file://, so a
   * failure simply means English.
   * @returns {string} "en" or "si".
   */
  function readStoredLang() {
    try {
      const v = window.localStorage.getItem('pt-lang');
      return v === 'si' ? 'si' : 'en';
    } catch (e) {
      return 'en';
    }
  }

  /**
   * Remembers the chosen language on this phone (FR-65).
   * @param {string} value - "en" or "si".
   * @returns {void}
   */
  function storeLang(value) {
    try {
      window.localStorage.setItem('pt-lang', value);
    } catch (e) {
      // Storage is blocked (some browsers on file://): the choice lasts for
      // this visit only, which is acceptable for the prototype.
    }
  }

  /** Functions each page registers to redraw its own text after a switch. */
  const languageHooks = [];

  /**
   * Shows the page in a language: swaps every marked string, the optgroup
   * labels, the aria-labels and the time options, sets <html lang>, marks
   * the current button, then lets the page redraw its own parts.
   * @param {string} value - "en" or "si".
   * @returns {void}
   */
  function applyLanguage(value) {
    lang = value;
    document.documentElement.lang = value;
    for (const el of $all('[data-i18n]')) {
      el.textContent = t(el.getAttribute('data-i18n'));
    }
    for (const el of $all('[data-i18n-label]')) {
      el.label = t(el.getAttribute('data-i18n-label'));
    }
    for (const el of $all('[data-i18n-aria]')) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    }
    for (const opt of $all('[data-time-select] option')) {
      if (opt.value) {
        opt.textContent = minutesToTime(toMinutes(opt.value));
      }
    }
    for (const btn of $all('[data-lang]')) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === value));
    }
    for (const hook of languageHooks) {
      hook();
    }
  }

  /**
   * Handles a press on English or සිංහල: switches, remembers the choice and
   * says so in a status message.
   * @param {MouseEvent} event - The click on a language button.
   * @returns {void}
   */
  function onLanguageClick(event) {
    const btn = event.currentTarget;
    const value = btn.getAttribute('data-lang');
    applyLanguage(value);
    storeLang(value);
    const status = $('[data-lang-status]');
    if (status) {
      status.textContent = t('lang.note');
    }
  }

  /**
   * Turns on the language switch: shows the buttons (the no-JS links are
   * hidden by CSS) and applies the remembered language.
   * @returns {void}
   */
  function initLanguage() {
    const list = $('[data-lang-buttons]');
    if (!list) {
      return;
    }
    list.hidden = false;
    for (const btn of $all('[data-lang]')) {
      btn.addEventListener('click', onLanguageClick);
    }
    applyLanguage(readStoredLang());
  }

  // === Section: 5. Request form ===

  /** "Now" for the request form: Monday 12/10/2026, 2:40 pm (brief 4.4). */
  const FORM_TODAY = new Date(2026, 9, 12);

  /** Form state that is not held by the fields themselves. */
  const form = {
    el: null,
    dirty: {},
    submitted: false,
    done: false,
    liveTimer: 0
  };

  /**
   * The questions in page order, each with how to check it. Each check
   * returns a string key for the error message, or null when the answer is
   * fine (FR-03, US-01 AC-2 to AC-4, US-03 AC-4).
   * @type {Array<{id: string, field: string, error: string, question: string, group?: string, check: function(): ?string, when?: function(): boolean}>}
   */
  const QUESTIONS = [
    { id: 'name', field: 'name', error: 'name-error', question: 'q-name', check: checkName },
    { id: 'phone', field: 'phone', error: 'phone-error', question: 'q-phone', check: checkPhone },
    { id: 'purpose', field: 'purpose-class', error: 'purpose-error', question: 'q-purpose', group: 'purpose', check: checkPurpose },
    { id: 'date', field: 'date-tue', error: 'date-error', question: 'q-date', group: 'date', check: checkDate },
    { id: 'date-other', field: 'date-other-input', error: 'date-other-error', question: 'q-date', check: checkOtherDate, when: isOtherDate },
    { id: 'from', field: 'from', error: 'from-error', question: 'q-from', check: checkFrom },
    { id: 'to', field: 'to', error: 'to-error', question: 'q-to', check: checkTo },
    { id: 'time', field: 'time', error: 'time-error', question: 'q-time', check: checkTime },
    { id: 'pax', field: 'pax', error: 'pax-error', question: 'q-pax', check: checkPax },
    { id: 'return', field: 'return-yes', error: 'return-error', question: 'q-return', group: 'return', check: checkReturn },
    { id: 'rtime', field: 'rtime', error: 'rtime-error', question: 'q-rtime', check: checkReturnTime, when: isReturnYes }
  ];

  /**
   * Gets a form field by id.
   * @param {string} id - The element id.
   * @returns {?HTMLElement} The element.
   */
  function field(id) {
    return document.getElementById(id);
  }

  /**
   * Gets the value of the checked radio in a group.
   * @param {string} name - The radio group's name.
   * @returns {string} The value, or "" if none is checked.
   */
  function radioValue(name) {
    const el = $('input[name="' + name + '"]:checked');
    return el ? el.value : '';
  }

  /**
   * US-01 AC-2: the name is required.
   * @returns {?string} Error key or null.
   */
  function checkName() {
    return field('name').value.trim() ? null : 'err.name';
  }

  /**
   * FR-03: accept 07X XXX XXXX, 0XX XXX XXXX and +94 numbers; spaces,
   * hyphens and brackets are ignored.
   * @returns {?string} Error key or null.
   */
  function checkPhone() {
    const raw = field('phone').value.trim();
    if (!raw) {
      return 'err.phone.empty';
    }
    const digits = raw.replace(/[\s\-()]/g, '');
    return /^(?:0\d{9}|\+94\d{9})$/.test(digits) ? null : 'err.phone.format';
  }

  /**
   * FR-02: a purpose must be chosen.
   * @returns {?string} Error key or null.
   */
  function checkPurpose() {
    return radioValue('purpose') ? null : 'err.purpose';
  }

  /**
   * A date must be chosen (the typed "another date" is checked separately).
   * @returns {?string} Error key or null.
   */
  function checkDate() {
    return radioValue('date') ? null : 'err.date';
  }

  /**
   * Whether "Another date" is chosen.
   * @returns {boolean} True when the typed date applies.
   */
  function isOtherDate() {
    return radioValue('date') === 'other';
  }

  /**
   * The typed date must be DD/MM/YYYY and today or later.
   * @returns {?string} Error key or null.
   */
  function checkOtherDate() {
    const d = parseTypedDate(field('date-other-input').value);
    if (!d) {
      return 'err.date.format';
    }
    return d < FORM_TODAY ? 'err.date.past' : null;
  }

  /**
   * Checks a place question: a place is chosen, and "Another address" has an
   * address typed.
   * @param {string} id - "from" or "to".
   * @returns {boolean} True when the answer is complete.
   */
  function placeAnswered(id) {
    const v = field(id).value;
    if (!v) {
      return false;
    }
    return v !== 'other' || field(id + '-address').value.trim() !== '';
  }

  /**
   * FR-05: where to pick up.
   * @returns {?string} Error key or null.
   */
  function checkFrom() {
    return placeAnswered('from') ? null : 'err.from';
  }

  /**
   * FR-05: where to go.
   * @returns {?string} Error key or null.
   */
  function checkTo() {
    return placeAnswered('to') ? null : 'err.to';
  }

  /**
   * A pickup time is required.
   * @returns {?string} Error key or null.
   */
  function checkTime() {
    return field('time').value ? null : 'err.time';
  }

  /**
   * US-03 AC-4: passengers must be a whole number from 1 to 99.
   * @returns {?string} Error key or null.
   */
  function checkPax() {
    const v = field('pax').value.trim();
    const n = Number(v);
    return /^\d{1,2}$/.test(v) && n >= 1 && n <= 99 ? null : 'err.pax';
  }

  /**
   * FR-06: Yes or No must be chosen for the return trip (no default).
   * @returns {?string} Error key or null.
   */
  function checkReturn() {
    return radioValue('return') ? null : 'err.return';
  }

  /**
   * Whether a return trip is wanted.
   * @returns {boolean} True when "Yes" is chosen.
   */
  function isReturnYes() {
    return radioValue('return') === 'yes';
  }

  /**
   * FR-06: the return time is required and must be after the pickup time.
   * @returns {?string} Error key or null.
   */
  function checkReturnTime() {
    const r = field('rtime').value;
    if (!r) {
      return 'err.return.empty';
    }
    const p = field('time').value;
    return p && toMinutes(r) <= toMinutes(p) ? 'err.return.time' : null;
  }

  /**
   * The elements an error applies to: one input, or every radio in a group.
   * @param {Object} q - An entry from QUESTIONS.
   * @returns {HTMLElement[]} Inputs to mark with aria-invalid.
   */
  function errorTargets(q) {
    return q.group ? $all('input[name="' + q.group + '"]') : [field(q.field)];
  }

  /**
   * Adds or removes one id in an element's aria-describedby list.
   * @param {HTMLElement} el - The element.
   * @param {string} id - The id to add or remove.
   * @param {boolean} on - True to add, false to remove.
   * @returns {void}
   */
  function toggleDescribedBy(el, id, on) {
    const ids = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    const i = ids.indexOf(id);
    if (on && i === -1) {
      ids.unshift(id);
    } else if (!on && i !== -1) {
      ids.splice(i, 1);
    }
    if (ids.length) {
      el.setAttribute('aria-describedby', ids.join(' '));
    } else {
      el.removeAttribute('aria-describedby');
    }
  }

  /**
   * Shows the message for one question, next to its field, with an icon and
   * the hidden word "Error:"; marks the field invalid. The key is kept on the
   * element so the language switch can re-word it.
   * @param {Object} q - An entry from QUESTIONS.
   * @param {string} key - The error message key.
   * @returns {void}
   */
  function showFieldError(q, key) {
    const msg = field(q.error);
    msg.setAttribute('data-error-key', key);
    msg.innerHTML = icon('error') + '<span><span class="visually-hidden">' +
      esc(t('x.error')) + ' </span>' + esc(t(key)) + '</span>';
    msg.hidden = false;
    for (const el of errorTargets(q)) {
      el.setAttribute('aria-invalid', 'true');
      if (!q.group) {
        toggleDescribedBy(el, q.error, true);
      }
    }
    if (q.group) {
      toggleDescribedBy(field(q.question), q.error, true);
    }
    field(q.question).classList.add('is-error');
  }

  /**
   * Removes one question's error message and invalid marks.
   * @param {Object} q - An entry from QUESTIONS.
   * @returns {void}
   */
  function clearFieldError(q) {
    const msg = field(q.error);
    msg.hidden = true;
    msg.textContent = '';
    msg.removeAttribute('data-error-key');
    for (const el of errorTargets(q)) {
      el.removeAttribute('aria-invalid');
      if (!q.group) {
        toggleDescribedBy(el, q.error, false);
      }
    }
    if (q.group) {
      toggleDescribedBy(field(q.question), q.error, false);
    }
    const stillWrong = QUESTIONS.some(/** Whether another check on the same question still shows an error. @param {Object} other - An entry from QUESTIONS. @returns {boolean} True if its message is visible. */ function hasError(other) {
      return other.question === q.question && !field(other.error).hidden;
    });
    if (!stillWrong) {
      field(q.question).classList.remove('is-error');
    }
  }

  /**
   * Checks one question and shows or clears its message.
   * @param {Object} q - An entry from QUESTIONS.
   * @returns {?string} The error key, or null when the answer is fine.
   */
  function validateQuestion(q) {
    if (q.when && !q.when()) {
      clearFieldError(q);
      return null;
    }
    const key = q.check();
    if (key) {
      showFieldError(q, key);
    } else {
      clearFieldError(q);
    }
    return key;
  }

  /**
   * Finds the QUESTIONS entry for a field id.
   * @param {string} id - The field id or the question id.
   * @returns {?Object} The entry, or null.
   */
  function questionFor(id) {
    for (const q of QUESTIONS) {
      if (q.field === id || q.id === id) {
        return q;
      }
    }
    return null;
  }

  /**
   * Moves focus to a field and scrolls its whole question into view, so the
   * label is visible above it. Used by the error summary and the sentence's
   * [gap] links.
   * @param {string} id - The field id.
   * @returns {void}
   */
  function focusField(id) {
    const el = field(id);
    if (!el) {
      return;
    }
    const q = el.closest('.question') || el;
    q.scrollIntoView({ block: 'start' });
    el.focus({ preventScroll: true });
  }

  /**
   * Handles a click on a link in the error summary or a [gap] in the
   * sentence: focuses the field instead of only jumping to it.
   * @param {MouseEvent} event - The click.
   * @returns {void}
   */
  function onFieldLinkClick(event) {
    const link = event.target.closest('a[data-field]');
    if (!link) {
      return;
    }
    event.preventDefault();
    focusField(link.getAttribute('data-field'));
  }

  /**
   * Validates everything on "Send request". With errors, it shows the error
   * summary (one link per error, in page order) and moves focus to it; it
   * keeps everything the person typed (US-01 AC-2).
   * @returns {boolean} True when the form is valid.
   */
  function validateAll() {
    const errors = [];
    for (const q of QUESTIONS) {
      const key = validateQuestion(q);
      if (key) {
        errors.push({ q: q, key: key });
      }
    }
    renderErrorSummary(errors);
    return errors.length === 0;
  }

  /**
   * Draws the error summary from the errors currently shown.
   * @param {Array<{q: Object, key: string}>} errors - Errors in page order.
   * @returns {void}
   */
  function renderErrorSummary(errors) {
    const box = field('error-summary');
    const list = field('error-summary-list');
    if (!errors.length) {
      box.hidden = true;
      list.innerHTML = '';
      return;
    }
    list.innerHTML = errors.map(/** One link in the error summary. @param {{q: Object, key: string}} e - An error. @returns {string} The <li>. */ function errorItem(e) {
      return '<li><a href="#' + e.q.field + '" data-field="' + e.q.field + '">' +
        esc(t(e.key)) + '</a></li>';
    }).join('');
    box.hidden = false;
  }

  /**
   * Re-reads the errors currently on screen into the summary (after a
   * language switch, or after a field was fixed).
   * @returns {void}
   */
  function refreshErrorSummary() {
    if (field('error-summary').hidden) {
      return;
    }
    const errors = [];
    for (const q of QUESTIONS) {
      const msg = field(q.error);
      if (!msg.hidden) {
        errors.push({ q: q, key: msg.getAttribute('data-error-key') });
      }
    }
    renderErrorSummary(errors);
  }

  /**
   * Re-words every visible error message in the current language.
   * @returns {void}
   */
  function rewordErrors() {
    for (const q of QUESTIONS) {
      const msg = field(q.error);
      if (!msg.hidden && msg.getAttribute('data-error-key')) {
        showFieldError(q, msg.getAttribute('data-error-key'));
      }
    }
    refreshErrorSummary();
  }

  /**
   * Remembers that the person has typed in a field, so leaving it may
   * validate it (validate on blur only after typing; never per keystroke).
   * @param {Event} event - The input event.
   * @returns {void}
   */
  function onFieldInput(event) {
    form.dirty[event.target.id] = true;
  }

  /**
   * Validates a text field when the person leaves it, if they typed in it.
   * @param {FocusEvent} event - The blur event.
   * @returns {void}
   */
  function onFieldBlur(event) {
    const id = event.target.id;
    const q = questionFor(id);
    if (q && form.dirty[id]) {
      validateQuestion(q);
      refreshErrorSummary();
    }
  }

  /**
   * After a choice changes, clears its error if the answer is now fine, but
   * does not add new errors (they wait for blur or Send request).
   * @param {Event} event - The change event.
   * @returns {void}
   */
  function onChoiceChange(event) {
    const target = event.target;
    const q = questionFor(target.type === 'radio' ? target.name : target.id);
    if (q && !field(q.error).hidden && !q.check()) {
      clearFieldError(q);
      refreshErrorSummary();
    }
  }

  /**
   * Shows or hides a block that belongs to an answer, and clears errors of
   * fields that are hidden.
   * @param {string} id - The block's id.
   * @param {boolean} show - True to show it.
   * @returns {void}
   */
  function reveal(id, show) {
    const el = field(id);
    if (el) {
      el.hidden = !show;
    }
  }

  /**
   * Applies every answer-dependent reveal: another date, another address
   * (FR-52), and the return-trip details (FR-06). Also sets the cutoff
   * message for the chosen date (FR-07, BRL-13).
   * @returns {void}
   */
  function updateReveals() {
    reveal('date-other-field', isOtherDate());
    reveal('from-other', field('from').value === 'other');
    reveal('to-other', field('to').value === 'other');
    reveal('return-details', isReturnYes());
    if (!isOtherDate()) {
      clearFieldError(questionFor('date-other'));
    }
    if (!isReturnYes()) {
      clearFieldError(questionFor('rtime'));
    }
    updateCutoff();
  }

  /**
   * Sets the cutoff message under "Date of trip". Tomorrow's message shows by
   * default because it is the likeliest choice; Monday has its own cutoff;
   * other dates need no message (BRL-13: 5:00 pm the day before, 7:00 am on
   * the day for Mondays). The paragraph is a status region, so the change is
   * announced.
   * @returns {void}
   */
  function updateCutoff() {
    const v = radioValue('date');
    const text = field('cutoff-text');
    const note = field('cutoff-note');
    let key = '';
    if (v === '' || v === '2026-10-13') {
      key = 'cutoff.open';
    } else if (v === '2026-10-19') {
      key = 'cutoff.monday';
    }
    if (key) {
      text.setAttribute('data-i18n', key);
      text.textContent = t(key);
      note.classList.remove('is-empty');
    } else {
      text.removeAttribute('data-i18n');
      text.textContent = '';
      note.classList.add('is-empty');
    }
  }

  // --- The passenger stepper (US-03) ---

  /**
   * Updates the stepper: the minus button is unavailable at 1 or below, and
   * more than 12 passengers shows the split message as information, not an
   * error (US-03 AC-3: the largest van has 12 seats).
   * @returns {void}
   */
  function updateStepper() {
    const n = Number(field('pax').value);
    const minus = $('[data-step="-1"]');
    if (minus) {
      minus.setAttribute('aria-disabled', String(!(n > 1)));
    }
    field('pax-split').hidden = !(n > 12 && n <= 99);
  }

  /**
   * Adds or takes away one passenger. Empty plus one is 1; the number stays
   * between 1 and 99.
   * @param {MouseEvent} event - The click on − or +.
   * @returns {void}
   */
  function onStep(event) {
    const btn = event.currentTarget;
    if (btn.getAttribute('aria-disabled') === 'true') {
      return;
    }
    const input = field('pax');
    const step = Number(btn.getAttribute('data-step'));
    const current = /^\d+$/.test(input.value) ? Number(input.value) : 0;
    const next = Math.min(99, Math.max(1, current + step));
    input.value = String(next);
    clearFieldError(questionFor('pax'));
    refreshErrorSummary();
    updateStepper();
    scheduleSentence();
  }

  // --- Extra stops (FR-54) ---

  /**
   * Gets the extra-stop rows.
   * @returns {HTMLElement[]} The three stop fieldsets.
   */
  function stopRows() {
    return $all('[data-stop-row]');
  }

  /**
   * Renumbers the visible stops 1, 2, 3 and shows "+ Add a stop" only while
   * fewer than three are open.
   * @returns {void}
   */
  function updateStops() {
    let n = 0;
    for (const row of stopRows()) {
      if (!row.hidden) {
        n += 1;
        $('.stop-num', row).textContent = String(n);
      }
    }
    field('add-stop').hidden = n >= 3;
  }

  /**
   * Opens the next extra-stop row and moves focus to its place.
   * @returns {void}
   */
  function onAddStop() {
    const row = stopRows().filter(/** Whether a stop row is closed. @param {HTMLElement} r - A stop row. @returns {boolean} True when hidden. */ function isHidden(r) { return r.hidden; })[0];
    if (!row) {
      return;
    }
    row.hidden = false;
    updateStops();
    $('select', row).focus();
    scheduleSentence();
  }

  /**
   * Removes a stop: empties it, hides it, moves it to the end so the open
   * stops stay in order, and returns focus to "+ Add a stop".
   * @param {MouseEvent} event - The click on "Remove this stop".
   * @returns {void}
   */
  function onRemoveStop(event) {
    const row = event.currentTarget.closest('[data-stop-row]');
    for (const el of $all('select, input[type="text"]', row)) {
      el.value = '';
    }
    for (const el of $all('input[type="radio"]', row)) {
      el.checked = false;
    }
    row.hidden = true;
    row.parentNode.appendChild(row);
    updateStops();
    field('add-stop').focus();
    scheduleSentence();
  }

  /**
   * Moves the three stop rows out of their no-JS disclosure, hides them and
   * shows "+ Add a stop" instead.
   * @returns {void}
   */
  function initStops() {
    const live = field('stops-live');
    for (const row of stopRows()) {
      row.hidden = true;
      live.appendChild(row);
      const remove = $('[data-remove-stop]', row);
      remove.hidden = false;
      remove.addEventListener('click', onRemoveStop);
    }
    field('stops-disclosure').hidden = true;
    field('add-stop').hidden = false;
    field('add-stop').addEventListener('click', onAddStop);
  }

  // --- The plain sentence (signature) ---

  /**
   * Reads one place question for the sentence and the summary.
   * @param {string} id - "from", "to" or a stop's select id.
   * @returns {?{name: string, article: string}} The place, or null.
   */
  function readPlace(id) {
    const sel = field(id);
    if (!sel || !sel.value) {
      return null;
    }
    if (sel.value === 'other') {
      const typed = field(id + '-address') ? field(id + '-address').value.trim() : '';
      return typed ? { name: typed, article: '' } : null;
    }
    const opt = sel.options[sel.selectedIndex];
    return { name: opt.getAttribute('data-short'), article: opt.getAttribute('data-article') || '' };
  }

  /**
   * Reads every answer the sentence and the confirmation need.
   * @returns {Object} The answers; missing ones are null or "".
   */
  function readAnswers() {
    const dateValue = radioValue('date');
    let date = null;
    if (dateValue === 'other') {
      const d = parseTypedDate(field('date-other-input').value);
      date = d && d >= FORM_TODAY ? d : null;
    } else if (dateValue) {
      date = fromIso(dateValue);
    }
    const stops = [];
    for (const row of stopRows()) {
      if (!row.hidden) {
        const place = readPlace($('select', row).id);
        if (place) {
          stops.push(place);
        }
      }
    }
    const paxText = field('pax').value.trim();
    return {
      purpose: radioValue('purpose'),
      date: date,
      from: readPlace('from'),
      to: readPlace('to'),
      stops: stops,
      time: field('time').value,
      flex: radioValue('flex') || '10',
      arrive: field('arrive').value,
      pax: checkPax() ? null : Number(paxText),
      ret: radioValue('return'),
      rtime: field('rtime').value,
      stay: field('stay').checked,
      wheelchair: field('wheelchair').checked,
      equipment: field('equipment').checked
    };
  }

  /**
   * Builds the sentence as a list of pieces: plain glue words, answered parts
   * (shown bold) and gaps (shown in [brackets] as links to the question).
   * English: "A van for 4 people from Branch B to the Sports Centre on
   * Tuesday 13/10/2026, picking up at 8:45 am (± 10 min), coming back at
   * 10:45 am." Sinhala uses the same parts in Sinhala order (draft, D-09).
   * @param {Object} a - Answers from readAnswers().
   * @returns {Array<{text: string, kind: string, field?: string, data?: boolean}>} The pieces.
   */
  function sentencePieces(a) {
    const out = [];
    /**
     * Adds glue words.
     * @param {string} text - Plain words.
     * @returns {void}
     */
    function glue(text) { out.push({ text: text, kind: 'glue' }); }
    /**
     * Adds an answered part.
     * @param {string} text - The answer in words.
     * @param {boolean} [isData] - True for English data (places).
     * @returns {void}
     */
    function part(text, isData) { out.push({ text: text, kind: 'part', data: !!isData }); }
    /**
     * Adds a gap that links to its question.
     * @param {string} key - The gap string key.
     * @param {string} fieldId - The field to focus.
     * @returns {void}
     */
    function gap(key, fieldId) { out.push({ text: t(key), kind: 'gap', field: fieldId }); }
    /**
     * Adds a place, with "the" before venues in English.
     * @param {?{name: string, article: string}} p - The place.
     * @param {string} key - Gap key if missing.
     * @param {string} fieldId - The field to focus.
     * @returns {void}
     */
    function place(p, key, fieldId) {
      if (!p) { gap(key, fieldId); return; }
      if (lang === 'en' && p.article) { glue(p.article + ' '); }
      part(p.name, true);
    }
    const flexText = a.flex === '0' ? t('flex.exact') : t('flex.' + a.flex);
    const time = a.time ? minutesToTime(toMinutes(a.time)) : '';

    if (lang === 'si') {
      if (a.date) { part(formatWeekdayDate(a.date)); } else { gap('x.gap.date', 'date-tue'); }
      glue(' දින, ');
      place(a.from, 'x.gap.from', 'from');
      for (const s of a.stops) { glue(' (' + t('stop.label') + ': '); place(s, '', ''); glue(')'); }
      glue(' සිට ');
      place(a.to, 'x.gap.to', 'to');
      glue(' දක්වා, මගීන් ');
      if (a.pax) { part(String(a.pax)); } else { gap('x.gap.pax', 'pax'); }
      glue(' දෙනෙකු සඳහා වෑන් රථයක්. ' + t('time.label') + ': ');
      if (time) { part(time + ' (' + flexText + ')'); } else { gap('x.gap.time', 'time'); }
      if (a.arrive) { glue('; ' + t('arrive.label').replace(/\s*\(.*\)\s*$/, '') + ': '); part(minutesToTime(toMinutes(a.arrive))); }
      glue('. ');
      if (a.ret === 'yes') {
        glue(t('return.time') + ': ');
        if (a.rtime) { part(minutesToTime(toMinutes(a.rtime))); } else { gap('x.gap.rtime', 'rtime'); }
        glue('.');
      } else if (a.ret === 'no') {
        part('ආපසු ගමනක් නැත.');
      } else {
        gap('x.gap.return', 'return-yes');
      }
    } else {
      glue('A van for ');
      if (a.pax) { part(a.pax + (a.pax === 1 ? ' person' : ' people')); } else { gap('x.gap.pax', 'pax'); glue(' people'); }
      glue(' from ');
      place(a.from, 'x.gap.from', 'from');
      for (const s of a.stops) { glue(', stopping at '); place(s, '', ''); }
      glue(' to ');
      place(a.to, 'x.gap.to', 'to');
      glue(' on ');
      if (a.date) { part(formatWeekdayDate(a.date)); } else { gap('x.gap.date', 'date-tue'); }
      glue(', picking up at ');
      if (time) { part(time + ' (' + flexText + ')'); } else { gap('x.gap.time', 'time'); }
      if (a.arrive) { glue(', arriving by '); part(minutesToTime(toMinutes(a.arrive))); }
      glue(', ');
      if (a.ret === 'yes') {
        glue('coming back at ');
        if (a.rtime) { part(minutesToTime(toMinutes(a.rtime))); } else { gap('x.gap.rtime', 'rtime'); }
      } else if (a.ret === 'no') {
        part('one way only');
      } else {
        gap('x.gap.return', 'return-yes');
      }
      glue('.');
    }
    const extras = [];
    if (a.ret === 'yes' && a.stay) { extras.push(t('x.stays')); }
    if (a.wheelchair) { extras.push(t('special.wheelchair') + '.'); }
    if (a.equipment) { extras.push(t('special.equipment') + '.'); }
    if (extras.length) { glue(' '); part(extras.join(' ')); }
    return out;
  }

  /**
   * Turns sentence pieces into HTML.
   * @param {Array<Object>} pieces - From sentencePieces().
   * @param {boolean} withLinks - True to make gaps links (the live box).
   * @returns {string} The sentence's inner HTML.
   */
  function piecesToHTML(pieces, withLinks) {
    return pieces.map(/** One piece of the sentence as HTML. @param {Object} p - A piece from sentencePieces(). @returns {string} HTML. */ function pieceHTML(p) {
      if (p.kind === 'gap') {
        return withLinks
          ? '<a class="sentence__gap" href="#' + p.field + '" data-field="' + p.field + '">' + esc(p.text) + '</a>'
          : esc(p.text);
      }
      if (p.kind === 'part') {
        return '<span class="sentence__part">' + (p.data ? data(p.text) : esc(p.text)) + '</span>';
      }
      return esc(p.text);
    }).join('');
  }

  /**
   * Redraws the sentence box at once, so sighted people see each answer land.
   * @returns {void}
   */
  function renderSentence() {
    const box = field('sentence-box');
    if (!box) {
      return;
    }
    const pieces = sentencePieces(readAnswers());
    field('sentence').innerHTML = piecesToHTML(pieces, true);
    const missing = pieces.some(/** Whether a piece is a missing answer. @param {Object} p - A sentence piece. @returns {boolean} True for a gap. */ function isGap(p) { return p.kind === 'gap'; });
    field('sentence-help').textContent = t(missing ? 'x.gaps' : 'x.complete');
    return pieces;
  }

  /**
   * Updates the sentence now and, after a pause in answering, the hidden
   * live region, so screen readers hear the sentence once rather than after
   * every keystroke (brief 6.3: debounced, polite).
   * @returns {void}
   */
  function scheduleSentence() {
    const pieces = renderSentence();
    window.clearTimeout(form.liveTimer);
    form.liveTimer = window.setTimeout(/** Puts the sentence in the live region after the pause. @returns {void} */ function announce() {
      field('sentence-live').textContent = pieces.map(/** The plain words of a piece. @param {Object} p - A sentence piece. @returns {string} Its text. */ function text(p) { return p.text; }).join('');
    }, 1500);
  }

  // --- Confirmation (FR-04, US-01 AC-5) ---

  /**
   * Builds the confirmation's "Your trip" list in the current language.
   * @param {Object} a - Answers from readAnswers().
   * @returns {string} <div> rows for the <dl>.
   */
  function summaryRows(a) {
    const rows = [];
    /**
     * Adds one row.
     * @param {string} labelKey - String key for the term.
     * @param {string} valueHTML - The value, already escaped.
     * @returns {void}
     */
    function row(labelKey, valueHTML) {
      rows.push('<div class="summary-list__row"><dt>' + esc(t(labelKey)) + '</dt><dd>' + valueHTML + '</dd></div>');
    }
    const flex = a.flex === '0' ? t('flex.exact') : t('flex.' + a.flex);
    const pickup = minutesToTime(toMinutes(a.time));
    row('label.purpose', esc(t('purpose.' + a.purpose)));
    row('label.date', esc(formatWeekdayDate(a.date)));
    if (lang === 'si') {
      row('label.pickup', data(a.from.name) + ', ' + esc(pickup + ' (' + flex + ')'));
    } else {
      row('label.pickup', esc(pickup + ' (' + flex + ') from ') + data(a.from.name));
    }
    for (const s of a.stops) {
      row('stop.label', data(s.name));
    }
    row('label.goingto', data(a.to.name));
    row('label.passengers', esc(String(a.pax)));
    if (a.ret === 'yes') {
      const back = minutesToTime(toMinutes(a.rtime));
      row('label.return', lang === 'si' ? data(a.to.name) + ', ' + esc(back) : esc(back + ' from ') + data(a.to.name));
    } else {
      row('label.return', esc(t('no')));
    }
    return rows.join('');
  }

  /**
   * Fills the confirmation view from the answers in the current language.
   * @returns {void}
   */
  function renderDone() {
    const a = readAnswers();
    field('done-sentence').innerHTML = piecesToHTML(sentencePieces(a), false);
    field('done-summary').innerHTML = summaryRows(a);
  }

  /**
   * Replaces the form with the confirmation, retitles the page and moves
   * focus to the heading (FR-04, US-01 AC-5). The reference is the sample's.
   * @returns {void}
   */
  function showDone() {
    form.done = true;
    renderDone();
    field('form-view').hidden = true;
    field('done-view').hidden = false;
    const title = field('page-title');
    title.setAttribute('data-i18n', 'done.title');
    title.textContent = t('done.title');
    window.scrollTo(0, 0);
    title.focus();
  }

  /**
   * Handles "Send request": stops the page from posting, validates, and
   * shows either the error summary (focused) or the confirmation.
   * @param {SubmitEvent} event - The submit event.
   * @returns {void}
   */
  function onSubmit(event) {
    event.preventDefault();
    form.submitted = true;
    if (validateAll()) {
      showDone();
    } else {
      const box = field('error-summary');
      box.scrollIntoView({ block: 'start' });
      box.focus({ preventScroll: true });
    }
  }

  /**
   * Empties the form and returns to the first view (used by "Request another
   * trip" and the Reset control).
   * @returns {void}
   */
  function resetForm() {
    form.el.reset();
    form.dirty = {};
    form.done = false;
    for (const q of QUESTIONS) {
      clearFieldError(q);
    }
    renderErrorSummary([]);
    for (const row of stopRows()) {
      row.hidden = true;
    }
    updateStops();
    field('special').open = false;
    field('arrive-disclosure').open = false;
    for (const note of $all('[data-map-note]')) {
      note.textContent = '';
    }
    updateReveals();
    updateStepper();
    field('form-view').hidden = false;
    field('done-view').hidden = true;
    const title = field('page-title');
    title.setAttribute('data-i18n', 'form.title');
    title.textContent = t('form.title');
    scheduleSentence();
    window.scrollTo(0, 0);
  }

  /**
   * Fills the form with the answers for PT-2026-0142 (brief 4.5): Kasun
   * Jayasinghe, Sport, Tuesday, Branch B to the Sports Centre at 8:45 am
   * ± 10 min, 4 passengers, back at 10:45 am.
   * @returns {void}
   */
  function fillSample() {
    resetForm();
    field('name').value = 'Kasun Jayasinghe';
    field('phone').value = '077 000 0142';
    field('purpose-sport').checked = true;
    field('date-tue').checked = true;
    field('from').value = 'branch-b';
    field('to').value = 'sports';
    field('time').value = '08:45';
    field('flex-10').checked = true;
    field('pax').value = '4';
    field('return-yes').checked = true;
    field('rtime').value = '10:45';
    updateReveals();
    updateStepper();
    scheduleSentence();
  }

  /**
   * Runs a prototype control on the request page.
   * @param {string} action - "fill", "errors", "confirm" or "reset".
   * @returns {void}
   */
  function requestProto(action) {
    if (action === 'fill') {
      fillSample();
    } else if (action === 'errors') {
      resetForm();
      form.el.requestSubmit ? form.el.requestSubmit() : onSubmit(new Event('submit'));
    } else if (action === 'confirm') {
      fillSample();
      form.el.requestSubmit ? form.el.requestSubmit() : onSubmit(new Event('submit'));
    } else if (action === 'reset') {
      resetForm();
    }
  }

  /**
   * Shows the short note under "Choose on map": the map is not built
   * (FR-52; the map service is still open, Q-17).
   * @param {MouseEvent} event - The click.
   * @returns {void}
   */
  function onMapClick(event) {
    const note = $('[data-map-note]', event.currentTarget.parentNode);
    note.textContent = t('x.map.note');
  }

  /**
   * Redraws the request page's own words after a language switch.
   * @returns {void}
   */
  function requestLanguageHook() {
    updateCutoff();
    rewordErrors();
    for (const note of $all('[data-map-note]')) {
      if (note.textContent) {
        note.textContent = t('x.map.note');
      }
    }
    scheduleSentence();
    if (form.done) {
      renderDone();
    }
  }

  /**
   * Handles any change in the form: reveals, the stepper and the sentence.
   * @param {Event} event - An input or change event from the form.
   * @returns {void}
   */
  function onFormChange(event) {
    if (event.type === 'change') {
      updateReveals();
      onChoiceChange(event);
    }
    if (event.target.id === 'pax') {
      updateStepper();
    }
    scheduleSentence();
  }

  /**
   * Starts the request page.
   * @returns {void}
   */
  function initRequest() {
    form.el = field('request-form');
    for (const el of $all('.js-hide')) {
      el.classList.remove('js-hide');
    }
    initStops();
    for (const id of ['name', 'phone', 'date-other-input', 'pax']) {
      field(id).addEventListener('input', onFieldInput);
      field(id).addEventListener('blur', onFieldBlur);
    }
    form.el.addEventListener('input', onFormChange);
    form.el.addEventListener('change', onFormChange);
    form.el.addEventListener('submit', onSubmit);
    form.el.addEventListener('click', onFieldLinkClick);
    field('error-summary').addEventListener('click', onFieldLinkClick);
    for (const btn of $all('[data-step]')) {
      btn.hidden = false;
      btn.addEventListener('click', onStep);
    }
    for (const btn of $all('[data-map-button]')) {
      btn.hidden = false;
      btn.addEventListener('click', onMapClick);
    }
    field('request-another').addEventListener('click', /** "Request another trip": an empty form in place, without a reload. @param {MouseEvent} event - The click. @returns {void} */ function onAnother(event) {
      event.preventDefault();
      resetForm();
      field('page-title').focus();
    });
    field('sentence-box').hidden = false;
    languageHooks.push(requestLanguageHook);
    initLanguage();
    updateReveals();
    updateStepper();
    scheduleSentence();
    bindProto(requestProto);
  }

  /**
   * Wires the prototype controls bar to a page's handler.
   * @param {function(string): void} handler - Receives the control's action.
   * @returns {void}
   */
  function bindProto(handler) {
    for (const btn of $all('[data-proto]')) {
      btn.addEventListener('click', /** Passes this control's action to the page. @returns {void} */ function onProto() {
        handler(btn.getAttribute('data-proto'));
      });
    }
  }

  // === Section: 6. Dashboard data and renderers ===

  /** Status words and icons (brief 6.3: a word in a box, an icon before it). */
  const STATUS = {
    submitted: { word: 'Submitted', icon: 'submitted' },
    proposed: { word: 'Proposed', icon: 'proposed' },
    attention: { word: 'Needs attention', icon: 'warning' },
    confirmed: { word: 'Confirmed', icon: 'confirmed' },
    declined: { word: 'Declined', icon: 'declined' },
    cancelled: { word: 'Cancelled', icon: 'cancelled' },
    completed: { word: 'Completed', icon: 'completed' },
    noshow: { word: 'No-show', icon: 'noshow' }
  };

  /** Flag words and icons (plain words in ink, no box). */
  const FLAGS = {
    late: { word: 'Late (exception)', icon: 'late' },
    shared: { word: 'Shared', icon: 'shared' },
    gap: { word: 'Gap job', icon: 'gap' },
    hours: { word: 'Out of hours', icon: 'hours' },
    newreq: { word: 'New requester', icon: 'newperson' },
    fixed: { word: 'Fixed trip', icon: 'repeat' },
    early: { word: 'Early trip', icon: 'early' },
    unconfirmed: { word: 'Completion not confirmed', icon: 'unconfirmed' }
  };

  const PLANNED = 'Planned by the system at 5:00 pm on 12/10/2026 (Optimise day).';

  /**
   * Tuesday 13/10/2026's bookings (brief 4.5 to 4.7), in pickup order. The
   * sentences restate the data; the explanations are word for word (FR-19).
   * @type {Array<Object>}
   */
  const BOOKINGS = [
    {
      ref: 'PT-2026-0131', name: 'Dilini Fernando', phone: '077 000 0131', purpose: 'Staff errand',
      van: 'Van 1', time: '7:30 am', route: 'Branch A → Branch C', pax: 2, status: 'confirmed', flags: ['early'],
      sentence: 'a van for 2 people from Branch A to Branch C at 7:30 am, arriving 7:55 am, one way.',
      details: [['Pick up', '7:30 am at Branch A (main branch)'], ['Going to', 'Branch C, arriving 7:55 am'], ['Return', 'No']],
      explain: ['Early trip: confirmed individually on 12/10/2026.'],
      run: { caption: 'The run: Van 1, 7:30 am to 7:55 am', rows: [['7:30 am', 'Branch A (main branch)', 'Pick up 2', '2 of 12'], ['7:55 am', 'Branch C', 'Drop off 2', '0 of 12']] },
      audit: 'Confirmed individually on 12/10/2026.'
    },
    {
      ref: 'PT-2026-0140', name: 'Nimal Perera', phone: '077 000 0140', purpose: 'Meeting or event',
      van: 'Van 2', time: '8:25 am', route: 'Branch A → Branch C', pax: 3, status: 'proposed', flags: ['shared'],
      sentence: 'a van for 3 people from Branch A to Branch C at 8:25 am, one way, shared with PT-2026-0142.',
      details: [['Pick up', '8:25 am at Branch A (main branch)'], ['Going to', 'Branch C, arriving 8:55 am'], ['Return', 'No']],
      explain: ['Shared with PT-2026-0142 on Van 2’s 8:25 am run from Branch A.'],
      run: 'van2am', audit: PLANNED
    },
    {
      ref: 'PT-2026-0142', name: 'Kasun Jayasinghe', phone: '077 000 0142', purpose: 'Sport',
      van: 'Van 2', time: '8:40 am', route: 'Branch B → Sports Centre', pax: 4, status: 'proposed', flags: ['shared'],
      sentence: 'a van for 4 people from Branch B to the Sports Centre at 8:40 am (asked for 8:45 am ± 10 min), coming back at 10:45 am, shared with PT-2026-0140.',
      details: [['Pick up', '8:40 am at Branch B (asked for 8:45 am ± 10 min)'], ['Going to', 'Sports Centre, arriving 9:10 am'], ['Return', '10:45 am from Sports Centre, back 11:05 am']],
      explain: [
        'Van 2: added to the 8:25 am run from Branch A, shared with PT-2026-0140.',
        'Pickup at Branch B at 8:40 am, within the requested 8:45 am ± 10 min.',
        '7 of 8 seats used at the busiest point.',
        'The 3 passengers from Branch A ride 6 minutes longer, within their limit.',
        'Saves a separate 35-minute van run.',
        'Van 1 not used: it must leave Branch A at 9:05 am for Grade 7 Swimming.'
      ],
      run: 'van2am', audit: PLANNED
    },
    {
      ref: 'PT-2026-0119', name: 'Ruwan Silva', phone: '077 000 0119', purpose: 'Sport: Grade 7 Swimming',
      van: 'Van 1', time: '9:05 am', route: 'Branch A → Aquatic Centre', pax: 11, status: 'proposed', flags: ['fixed'],
      sentence: 'a van for 11 people from Branch A to the Aquatic Centre at 9:05 am, coming back at 11:30 am. Grade 7 Swimming, every Tuesday this term.',
      details: [['Pick up', '9:05 am at Branch A (main branch)'], ['Going to', 'Aquatic Centre, arriving 9:30 am'], ['Return', '11:30 am from Aquatic Centre, back 11:55 am; the van need not stay'], ['Series', 'Grade 7 Swimming – every Tuesday this term']],
      explain: ['Fixed trip: Grade 7 Swimming – every Tuesday this term. Ruwan Silva is the series contact.'],
      run: { caption: 'The runs: Van 1, 9:05 am to 11:55 am', rows: [['9:05 am', 'Branch A (main branch)', 'Pick up 11', '11 of 12'], ['9:30 am', 'Aquatic Centre', 'Drop off 11', '0 of 12'], ['11:30 am', 'Aquatic Centre', 'Pick up 11', '11 of 12'], ['11:55 am', 'Branch A (main branch)', 'Drop off 11', '0 of 12']] },
      audit: PLANNED
    },
    {
      ref: 'PT-2026-0145', name: 'Shamila Rodrigo', phone: '077 000 0145', purpose: 'Staff errand',
      van: 'Van 1', time: '10:00 am', route: 'Branch B → Stationery supplier → Branch B', pax: 1, status: 'proposed', flags: ['gap'],
      sentence: 'a van for 1 person from Branch B to the Stationery supplier and back, 10:00 am to 10:50 am, while Grade 7 Swimming is at the Aquatic Centre.',
      details: [['Pick up', '10:00 am at Branch B'], ['Going to', 'Stationery supplier, waiting about 15 minutes'], ['Return', 'Round trip, back at Branch B at 10:50 am']],
      explain: [
        'Van 1: gap job while Grade 7 Swimming is at the Aquatic Centre.',
        'Leaves the Aquatic Centre at 9:35 am and is back at 11:10 am, 20 minutes before the 11:30 am return pickup (the safety buffer is 15 minutes).',
        'No second van needed.'
      ],
      run: { caption: 'The run: Van 1, 10:00 am to 10:50 am', rows: [['10:00 am', 'Branch B', 'Pick up 1', '1 of 12'], ['10:20 am', 'Stationery supplier', 'Drop off 1', '0 of 12'], ['10:35 am', 'Stationery supplier', 'Pick up 1', '1 of 12'], ['10:50 am', 'Branch B', 'Drop off 1', '0 of 12']] },
      audit: PLANNED
    },
    {
      ref: 'PT-2026-0147', name: 'Sanduni Herath', phone: '077 000 0147', purpose: 'Staff errand',
      van: 'Van 2 (route found)', time: '11:20 am', route: 'Branch C → map pin', pax: 3, status: 'attention', flags: ['newreq'], note: 'route found on Van 2',
      sentence: 'a van for 3 people from Branch C to a map pin, “Opposite the temple, 2nd lane”, at 11:20 am, one way.',
      details: [['Pick up', '11:20 am at Branch C'], ['Going to', 'Map pin: “Opposite the temple, 2nd lane”, arriving 11:40 am'], ['Return', 'No']],
      explain: [
        'New requester: this phone number has not been used before. Check before approving.',
        'Route found: Van 2, pickup at Branch C at 11:20 am.',
        'The drop-off was placed with a map pin and the note “Opposite the temple, 2nd lane”.'
      ],
      run: { caption: 'The run found: Van 2, 11:20 am to 11:40 am (not yet in the plan)', rows: [['11:20 am', 'Branch C', 'Pick up 3', '3 of 8'], ['11:40 am', 'Pin: “Opposite the temple, 2nd lane”', 'Drop off 3', '0 of 8']] },
      audit: 'Checked by the system at 5:00 pm on 12/10/2026 (Optimise day). Not in the plan until a coordinator checks it.'
    },
    {
      ref: 'PT-2026-0149', name: 'Mahesh Kumara', phone: '077 000 0149', purpose: 'Sport: Grade 9 inter-house practice',
      van: 'Not placed', time: '1:00 pm', route: 'Branch A → Sports Centre', pax: 20, status: 'attention', flags: [], note: 'not placed',
      sentence: 'a van for 20 people from Branch A to the Sports Centre at 1:00 pm, coming back at 3:00 pm. No single van fits.',
      details: [['Pick up', '1:00 pm at Branch A (main branch)'], ['Going to', 'Sports Centre'], ['Return', '3:00 pm']],
      explain: [
        'No single van fits: the group of 20 is larger than the largest van (12 seats).',
        'At 1:00 pm, Van 1 cannot help: it must be back at Branch A for 1:30 pm (PT-2026-0150).',
        'Van 2 alone has 8 seats.'
      ],
      alternatives: [
        'Split across Van 1 (12) and Van 2 (8), both leaving Branch A at 12:15 pm (45 minutes earlier).',
        'Extra hire van needed for 1:00 pm.'
      ],
      run: null,
      audit: 'Checked by the system at 5:00 pm on 12/10/2026 (Optimise day). Not placed.'
    },
    {
      ref: 'PT-2026-0150', name: 'Priyanka Wijesekara', phone: '077 000 0150', purpose: 'Meeting or event',
      van: 'Van 1', time: '1:30 pm', route: 'Branch A → Branch B', pax: 6, status: 'proposed', flags: [],
      sentence: 'a van for 6 people from Branch A to Branch B at 1:30 pm, coming back at 3:30 pm.',
      details: [['Pick up', '1:30 pm at Branch A (main branch)'], ['Going to', 'Branch B, arriving 1:45 pm'], ['Return', '3:30 pm from Branch B, back 3:45 pm']],
      explain: [],
      run: { caption: 'The runs: Van 1, 1:30 pm to 3:45 pm', rows: [['1:30 pm', 'Branch A (main branch)', 'Pick up 6', '6 of 12'], ['1:45 pm', 'Branch B', 'Drop off 6', '0 of 12'], ['3:30 pm', 'Branch B', 'Pick up 6', '6 of 12'], ['3:45 pm', 'Branch A (main branch)', 'Drop off 6', '0 of 12']] },
      audit: PLANNED
    },
    {
      ref: 'PT-2026-0153', name: 'Tharindu Bandara', phone: '077 000 0153', purpose: 'Staff errand',
      van: 'Van 2', time: '2:15 pm', route: 'Branch C → Branch A', pax: 2, status: 'proposed', flags: ['late'],
      sentence: 'a van for 2 people from Branch C to Branch A at 2:15 pm, one way. Added late, by phone.',
      details: [['Pick up', '2:15 pm at Branch C'], ['Going to', 'Branch A (main branch), arriving 2:40 pm'], ['Return', 'No']],
      explain: ['Late exception: added by Ravi Gunasekara at 6:55 am today. Source: Phone. Reason: “Exam papers must reach the main office.”'],
      run: { caption: 'The run: Van 2, 2:15 pm to 2:40 pm', rows: [['2:15 pm', 'Branch C', 'Pick up 2', '2 of 8'], ['2:40 pm', 'Branch A (main branch)', 'Drop off 2', '0 of 8']] },
      audit: 'Added by Ravi Gunasekara at 6:55 am on 13/10/2026 (late exception).'
    },
    {
      ref: 'PT-2026-0151', name: 'Chathurika de Alwis', phone: '077 000 0151', purpose: 'Class trip: drama rehearsal',
      van: 'Van 2', time: '5:45 pm', route: 'Branch B → Branch A', pax: 7, status: 'proposed', flags: ['hours'],
      sentence: 'a van for 7 people from Branch B to Branch A at 5:45 pm, one way. It ends at 6:05 pm, after normal hours.',
      details: [['Pick up', '5:45 pm at Branch B'], ['Going to', 'Branch A (main branch), arriving 6:05 pm'], ['Return', 'No']],
      explain: ['Out of hours: the trip ends at 6:05 pm, after the 6:00 pm end of normal hours.'],
      run: { caption: 'The run: Van 2, 5:45 pm to 6:05 pm', rows: [['5:45 pm', 'Branch B', 'Pick up 7', '7 of 8'], ['6:05 pm', 'Branch A (main branch)', 'Drop off 7', '0 of 8']] },
      audit: PLANNED
    }
  ];

  /** The shared 8:25 am run on Van 2 (brief 4.7), used by 0140 and 0142. */
  const RUN_VAN2_AM = {
    caption: 'The run: Van 2, 8:25 am to 9:10 am',
    rows: [
      ['8:25 am', 'Branch A (main branch)', 'Pick up 3', '3 of 8'],
      ['8:40 am', 'Branch B', 'Pick up 4', '7 of 8 (busiest point)'],
      ['8:55 am', 'Branch C', 'Drop off 3', '4 of 8'],
      ['9:10 am', 'Sports Centre', 'Drop off 4', '0 of 8']
    ]
  };

  /**
   * The day timeline (FR-29, US-26): rows per van and the "Not placed" row.
   * Times are "HH:MM"; the axis runs from 7:00 am to 6:30 pm so the trip
   * past 6:00 pm shows beyond the edge marker.
   */
  const TIMELINE = {
    start: 7 * 60,
    end: 18 * 60 + 30,
    edge: 18 * 60,
    now: 7 * 60 + 5,
    rows: [
      {
        name: 'Van 1', meta: '12 seats', hours: '7:00 am to 6:00 pm', items: [
          { kind: 'block', ref: 'PT-2026-0131', from: '07:30', to: '07:55', what: 'Branch A to Branch C' },
          { kind: 'block', ref: 'PT-2026-0119', from: '09:05', to: '09:30', what: 'Branch A to Aquatic Centre' },
          { kind: 'wait', from: '09:30', to: '11:30', label: 'Wait: Aquatic Centre' },
          { kind: 'block', ref: 'PT-2026-0145', from: '09:35', to: '11:10', what: 'gap job during the swimming wait: to Branch B, the Stationery supplier and back' },
          { kind: 'block', ref: 'PT-2026-0119', from: '11:30', to: '11:55', what: 'return, Aquatic Centre to Branch A' },
          { kind: 'block', ref: 'PT-2026-0150', from: '13:30', to: '13:45', what: 'Branch A to Branch B' },
          { kind: 'block', ref: 'PT-2026-0150', from: '15:30', to: '15:45', what: 'return, Branch B to Branch A' }
        ]
      },
      {
        name: 'Van 2', meta: '8 seats', hours: '7:00 am to 6:00 pm', tall: true, items: [
          { kind: 'run', from: '08:25', to: '09:10', label: 'Shared run', refs: ['PT-2026-0140', 'PT-2026-0142'], what: 'shared run: Branch A, Branch B, Branch C, Sports Centre' },
          { kind: 'block', ref: 'PT-2026-0142', from: '10:45', to: '11:05', what: 'return, Sports Centre to Branch B' },
          { kind: 'block', ref: 'PT-2026-0147', from: '11:20', to: '11:40', what: 'Branch C to a map pin', tentative: true },
          { kind: 'block', ref: 'PT-2026-0153', from: '14:15', to: '14:40', what: 'Branch C to Branch A' },
          { kind: 'block', ref: 'PT-2026-0151', from: '17:45', to: '18:05', what: 'Branch B to Branch A, past 6:00 pm' }
        ]
      },
      {
        name: 'Not placed', meta: 'Needs a decision', hours: '', items: [
          { kind: 'block', ref: 'PT-2026-0149', from: '13:00', to: '15:00', what: 'Branch A to Sports Centre and back' }
        ]
      }
    ]
  };

  /**
   * Makes the dashboard's starting state: every booking at its 7:05 am
   * status, PT-2026-0142 open in the panel, the plan not yet approved.
   * @returns {Object} A fresh state object.
   */
  function initialDashState() {
    const status = {};
    for (const b of BOOKINGS) {
      status[b.ref] = b.status;
    }
    return { status: status, approvedAt: {}, selected: 'PT-2026-0142', planApproved: false, listView: false, fromTimeline: false };
  }

  /**
   * Finds a booking by reference.
   * @param {string} ref - For example "PT-2026-0142".
   * @returns {?Object} The booking.
   */
  function booking(ref) {
    for (const b of BOOKINGS) {
      if (b.ref === ref) {
        return b;
      }
    }
    return null;
  }

  /**
   * A status badge: the word in bold, an icon before it, the border and tint
   * in the status colour (never colour alone).
   * @param {string} status - A key of STATUS.
   * @returns {string} The badge's HTML.
   */
  function badgeHTML(status) {
    const s = STATUS[status];
    return '<span class="badge badge--' + status + '">' + icon(s.icon) + s.word + '</span>';
  }

  /**
   * The flags as plain words with icons, separated by " · ".
   * @param {string[]} flags - Keys of FLAGS.
   * @returns {string} The list's HTML, or "" when there are none.
   */
  function flagsHTML(flags) {
    if (!flags || !flags.length) {
      return '';
    }
    return '<ul class="flags">' + flags.map(/** One flag as a list item. @param {string} f - A key of FLAGS. @returns {string} The <li>. */ function flagItem(f) {
      return '<li class="flag">' + icon(FLAGS[f].icon) + FLAGS[f].word + '</li>';
    }).join('') + '</ul>';
  }

  /**
   * The sentence a row and the panel lead with; it says the status in words
   * too ("Proposed for Van 2: …", brief 6.3).
   * @param {Object} b - A booking.
   * @param {string} status - Its current status.
   * @returns {string} The sentence, escaped.
   */
  function leadSentence(b, status) {
    let head;
    if (status === 'attention') {
      head = 'Needs attention, ' + b.note;
    } else if (status === 'proposed' || status === 'confirmed') {
      head = STATUS[status].word + ' for ' + b.van;
    } else {
      head = STATUS[status].word;
    }
    return '<strong>' + esc(head) + ':</strong> ' + escRefs(b.sentence);
  }

  /**
   * One row in "What needs you now".
   * @param {Object} b - A booking.
   * @param {Object} state - Dashboard state.
   * @returns {string} The <li>.
   */
  function rowHTML(b, state) {
    const status = state.status[b.ref];
    const selected = state.selected === b.ref;
    const action = selected
      ? '<span class="row__showing">' + icon('chevron', 'icon--right') + 'Shown in the panel</span>'
      : '<button type="button" class="button button--quiet button--small row__open" data-open="' + b.ref + '">Open<span class="visually-hidden"> ' + b.ref + '</span></button>';
    return '<li class="row' + (selected ? ' is-selected' : '') + '"' + (selected ? ' aria-current="true"' : '') + '>' +
      '<p class="row__sentence">' + leadSentence(b, status) + '</p>' +
      '<p class="row__meta">' + badgeHTML(status) + ' <span class="ref">' + b.ref + '</span> ' +
      '<span class="row__who">' + esc(b.name) + '</span> ' + flagsHTML(b.flags) + '</p>' + action + '</li>';
  }

  /**
   * Counts for the sentences at the top (US-22 AC-1, brief 4.8).
   * @param {Object} state - Dashboard state.
   * @returns {{attention: number, awaiting: number, late: number, trips: number}} The counts.
   */
  function counts(state) {
    const c = { attention: 0, awaiting: 0, late: 0, trips: BOOKINGS.length };
    for (const b of BOOKINGS) {
      const s = state.status[b.ref];
      if (s === 'attention') { c.attention += 1; }
      if (s === 'proposed') { c.awaiting += 1; }
      if (b.flags.indexOf('late') !== -1) { c.late += 1; }
    }
    return c;
  }

  /**
   * Picks "1 request" or "2 requests".
   * @param {number} n - The count.
   * @param {string} one - Singular words.
   * @param {string} many - Plural words.
   * @returns {string} The count in bold and the right words.
   */
  function plural(n, one, many) {
    return '<strong>' + n + '</strong> ' + (n === 1 ? one : many);
  }

  /**
   * "Today at a glance": the counts written as sentences, each a link to its
   * list (brief 6.3: no tiles with big numbers).
   * @param {Object} state - Dashboard state.
   * @returns {string} The <li> items.
   */
  function glanceHTML(state) {
    const c = counts(state);
    const items = [
      ['#needs-attention', c.attention ? plural(c.attention, 'request needs your attention.', 'requests need your attention.') : 'Nothing needs your attention.'],
      ['#awaiting', c.awaiting ? plural(c.awaiting, 'proposal is waiting for approval.', 'proposals are waiting for approval.') : 'No proposals are waiting for approval.'],
      ['#late', plural(c.late, 'late exception was added today.', 'late exceptions were added today.')],
      ['#trips', plural(c.trips, 'trip today.', 'trips today.')]
    ];
    return items.map(/** One count sentence as a link. @param {string[]} i - Target and words. @returns {string} The <li>. */ function glanceItem(i) {
      return '          <li><a href="' + i[0] + '">' + i[1] + '</a></li>';
    }).join('\n');
  }

  /**
   * Today's plan, the largest "tile", as a sentence with its one action
   * (BRL-21: approve by 7:10 am; early trips before 7:40 am are confirmed
   * individually).
   * @param {Object} state - Dashboard state.
   * @returns {string} The plan box's inner HTML.
   */
  function planHTML(state) {
    if (state.planApproved) {
      return '      <h2 class="sentence-box__title" id="plan-title" tabindex="-1">Today\'s plan is approved</h2>\n' +
        '      <p class="note note--ok">' + icon('confirmed') + '<span>Plan approved at 7:06 am. Final details are going to 8 requesters and route links to 2 drivers.</span></p>';
    }
    return '      <h2 class="sentence-box__title" id="plan-title" tabindex="-1">Today\'s plan is ready to approve</h2>\n' +
      '      <p class="sentence">Tuesday 13/10/2026: <strong>2 vans, 8 trips</strong>, optimised at 5:00 pm yesterday. The early trip at 7:30 am is already confirmed. <strong>Approve by 7:10 am.</strong> 2 requests that need attention are not in the plan.</p>\n' +
      '      <div class="button-row plan__actions"><button type="button" class="button button--primary" id="plan-approve" aria-haspopup="dialog">Approve today\'s plan</button></div>';
  }

  /**
   * "What needs you now": requests that need attention, the late exception,
   * then the proposals waiting for approval (folded, because the plan
   * approves them together).
   * @param {Object} state - Dashboard state.
   * @returns {string} The lists' HTML.
   */
  function needsHTML(state) {
    const c = counts(state);
    const attention = BOOKINGS.filter(/** Whether a booking needs attention now. @param {Object} b - A booking. @returns {boolean} True if so. */ function isAttention(b) { return state.status[b.ref] === 'attention'; });
    const late = BOOKINGS.filter(/** Whether a booking is a late exception. @param {Object} b - A booking. @returns {boolean} True if so. */ function isLate(b) { return b.flags.indexOf('late') !== -1; });
    const awaiting = BOOKINGS.filter(/** Whether a booking waits for approval. @param {Object} b - A booking. @returns {boolean} True if Proposed. */ function isAwaiting(b) { return state.status[b.ref] === 'proposed'; });
    /**
     * Rows for some bookings.
     * @param {Object[]} list - Bookings.
     * @returns {string} The <li> rows.
     */
    function rows(list) {
      return list.map(/** One row for a booking. @param {Object} b - A booking. @returns {string} The <li>. */ function oneRow(b) { return rowHTML(b, state); }).join('');
    }
    // Needs attention first, by urgency of the decision: not placed, then new requester.
    attention.sort(/** Puts "not placed" before other needs-attention rows. @param {Object} a - A booking. @param {Object} b - Another booking. @returns {number} Sort order. */ function byNote(a, b) { return a.note === 'not placed' ? -1 : (b.note === 'not placed' ? 1 : 0); });
    let html = '<h3 id="needs-attention" class="needs__title">Needs your attention (' + c.attention + ')</h3>';
    html += attention.length ? '<ul class="rows">' + rows(attention) + '</ul>' : '<p class="needs__empty">Nothing needs your attention.</p>';
    html += '<h3 id="late" class="needs__title">Late exception (' + c.late + ')</h3><ul class="rows">' + rows(late) + '</ul>';
    html += '<h3 id="awaiting" class="needs__title">Waiting for your approval (' + c.awaiting + ')</h3>';
    if (awaiting.length) {
      html += '<details class="disclosure needs__more" open><summary class="disclosure__summary">' + icon('chevron') +
        '<span>The ' + c.awaiting + (c.awaiting === 1 ? ' proposal' : ' proposals') + ', earliest first</span></summary><ul class="rows">' + rows(awaiting) + '</ul></details>';
    } else {
      html += '<p class="needs__empty">No proposals are waiting. Every trip in today\'s plan is confirmed.</p>';
    }
    return html;
  }

  /**
   * The selected-booking panel: status, flags, the lead sentence, the trip
   * details, the explanation as plain paragraphs (FR-19, US-16), the run with
   * seats on board, the actions (Decline set apart) and the audit line.
   * @param {Object} state - Dashboard state.
   * @returns {string} The panel's inner HTML.
   */
  function panelHTML(state) {
    const b = booking(state.selected);
    const status = state.status[b.ref];
    const out = [];
    out.push('<p class="panel__eyebrow">Selected booking</p>');
    out.push('<h2 class="panel__title" id="panel-title" tabindex="-1"><span class="ref">' + b.ref + '</span> ' + badgeHTML(status) + '</h2>');
    if (b.flags.length) {
      out.push('<p class="panel__flags">' + flagsHTML(b.flags) + '</p>');
    }
    out.push('<p class="panel__lead">' + leadSentence(b, status) + '</p>');
    out.push('<dl class="summary-list summary-list--panel">');
    const rows = [['Requester', esc(b.name) + '<br><span class="ref">' + esc(b.phone) + '</span>'], ['Trip for', esc(b.purpose)]]
      .concat(b.details.map(/** Escapes one detail pair. @param {string[]} d - Label and value. @returns {string[]} Label and escaped value. */ function detail(d) { return [d[0], esc(d[1])]; }))
      .concat([['Passengers', String(b.pax)], ['Van', esc(b.van)]]);
    for (const r of rows) {
      out.push('<div class="summary-list__row"><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>');
    }
    out.push('</dl>');
    if (b.explain.length || b.alternatives) {
      out.push('<section class="panel__section" aria-labelledby="why-title"><h3 id="why-title">Why this plan</h3>');
      for (const p of b.explain) {
        out.push('<p>' + escRefs(p) + '</p>');
      }
      if (b.alternatives) {
        out.push('<p>Alternatives:</p><ol>' + b.alternatives.map(/** One alternative as a list item. @param {string} a - The alternative. @returns {string} The <li>. */ function alt(a) { return '<li>' + escRefs(a) + '</li>'; }).join('') + '</ol>');
      }
      out.push('</section>');
    }
    const run = b.run === 'van2am' ? RUN_VAN2_AM : b.run;
    if (run) {
      // The run as one short sentence per stop, with the seats on board:
      // words first, and it reads at the panel's narrow width.
      out.push('<section class="panel__section" aria-labelledby="run-title"><h3 id="run-title">' + esc(run.caption) + '</h3><ol class="run">' +
        run.rows.map(/** One stop of the run as a sentence. @param {string[]} r - Time, place, stop and seats. @returns {string} The <li>. */ function runRow(r) {
          return '<li><span class="run__time">' + r[0] + '</span> <span>' + esc(r[1]) + ': ' + r[2].toLowerCase() + '. On board: <strong>' + r[3] + '</strong>.</span></li>';
        }).join('') + '</ol></section>');
    }
    out.push('<div class="panel__actions"><div class="button-row">');
    if (status === 'proposed' || (status === 'attention' && b.note !== 'not placed')) {
      out.push('<button type="button" class="button button--primary button--small" data-approve="' + b.ref + '">' + icon('tick') + 'Approve</button>');
    }
    if (status !== 'cancelled' && status !== 'declined') {
      out.push('<button type="button" class="button button--secondary button--small" data-change="' + b.ref + '">Change</button>');
    }
    out.push('</div>');
    // Decline sits on its own line, apart from Approve, so it is not hit by
    // mistake.
    if (status === 'proposed' || status === 'attention') {
      out.push('<div class="panel__decline"><button type="button" class="button button--danger button--small" data-decline="' + b.ref + '">' + icon('cross') + 'Decline</button></div>');
    }
    out.push('</div>');
    let audit = b.audit;
    if (state.approvedAt[b.ref]) {
      audit += ' Approved by Anoma Jayawardena at ' + state.approvedAt[b.ref] + '.';
    }
    out.push('<p class="panel__audit">' + esc(audit) + '</p>');
    if (state.fromTimeline) {
      out.push('<p class="panel__back"><a href="#trips" data-back>Back to the timeline</a></p>');
    }
    return out.map(/** Indents a line of generated HTML. @param {string} l - The line. @returns {string} The indented line. */ function indent(l) { return '        ' + l; }).join('\n');
  }

  /**
   * The list view of the day (FR-29): the same bookings as the timeline.
   * @param {Object} state - Dashboard state.
   * @returns {string} The <tr> rows.
   */
  function tableHTML(state) {
    return BOOKINGS.map(/** One row of the list view. @param {Object} b - A booking. @returns {string} The <tr>. */ function tableRow(b) {
      const sel = state.selected === b.ref;
      return '              <tr' + (sel ? ' class="is-selected"' : '') + '><td>' + b.time + '</td>' +
        '<td><button type="button" class="table__open ref" data-open="' + b.ref + '"' + (sel ? ' aria-current="true"' : '') + '>' + b.ref + '</button></td>' +
        '<td>' + esc(b.name) + '</td><td>' + esc(b.route) + '</td><td class="num">' + b.pax + '</td><td>' + esc(b.van) + '</td>' +
        '<td>' + badgeHTML(state.status[b.ref]) + '</td><td>' + flagsHTML(b.flags) + '</td></tr>';
    }).join('\n');
  }

  /**
   * Position of a time on the axis, as a percentage of the track.
   * @param {number} mins - Minutes after midnight.
   * @returns {number} 0 to 100.
   */
  function pct(mins) {
    return ((mins - TIMELINE.start) / (TIMELINE.end - TIMELINE.start)) * 100;
  }

  /**
   * The accessible name of a timeline block: reference, van, times, places,
   * status and flags (brief 3.3). It starts with the reference so it
   * contains the visible label.
   * @param {Object} item - A timeline item.
   * @param {string} ref - The booking reference.
   * @param {string} van - The row's name.
   * @param {Object} state - Dashboard state.
   * @returns {string} The label.
   */
  function blockLabel(item, ref, van, state) {
    const b = booking(ref);
    const status = state.status[ref];
    const flags = b.flags.map(/** A flag's word in lower case, for an accessible name. @param {string} f - A key of FLAGS. @returns {string} The word. */ function flagWord(f) { return FLAGS[f].word.toLowerCase(); });
    const where = van === 'Not placed' ? 'not placed' : van;
    return ref + ': ' + where + ', ' + minutesToTime(toMinutes(item.from), 'en') + ' to ' +
      minutesToTime(toMinutes(item.to), 'en') + ', ' + item.what + ', ' + STATUS[status].word +
      (item.tentative && status === 'attention' ? ', not yet in the plan' : '') +
      (flags.length ? ', ' + flags.join(', ') : '');
  }

  /**
   * One booking block: a button with the short reference above a bar whose
   * edge style and icon carry the status (dashed for Proposed, solid for
   * Confirmed, amber with a black edge for Needs attention).
   * @param {Object} item - The timeline item.
   * @param {string} ref - The booking reference.
   * @param {string} van - The row's name.
   * @param {Object} state - Dashboard state.
   * @param {string} style - Inline position, or "" inside a shared run.
   * @returns {string} The <button>.
   */
  function blockHTML(item, ref, van, state, style) {
    const b = booking(ref);
    const status = state.status[ref];
    const cls = 'block block--' + status + (item.tentative && status === 'attention' ? ' block--tentative' : '');
    const icons = icon(STATUS[status].icon, 'icon-status') + b.flags.map(/** A flag's icon. @param {string} f - A key of FLAGS. @returns {string} The <svg>. */ function flagIcon(f) { return icon(FLAGS[f].icon); }).join('');
    // Blocks of an hour or more carry the reference inside the bar; shorter
    // ones carry it above, where it has room (inside a shared run the run's
    // name is above, so the reference goes in the bar).
    const inside = !style || toMinutes(item.to) - toMinutes(item.from) >= 60;
    return '<button type="button" class="' + cls + '"' + (style ? ' style="' + style + '"' : '') + ' data-open="' + ref + '" data-block="' + ref +
      '" aria-current="' + (state.selected === ref) + '" aria-label="' + esc(blockLabel(item, ref, van, state)) + '">' +
      (style ? '<span class="block__ref">' + (inside ? '' : ref.slice(-4)) + '</span>' : '') + '<span class="block__bar">' +
      (inside ? '<span class="block__short">' + ref.slice(-4) + '</span>' : '') + icons + '</span></button>';
  }

  /**
   * The whole day timeline with its axis, rows, wait, shared run, now line
   * and 6:00 pm edge (FR-29, US-26 AC-1).
   * @param {Object} state - Dashboard state.
   * @returns {string} The timeline's HTML.
   */
  function timelineHTML(state) {
    const out = [];
    const nowPos = pct(TIMELINE.now).toFixed(3);
    const edgePos = pct(TIMELINE.edge).toFixed(3);
    out.push('<div class="timeline" id="timeline">');
    out.push('  <div class="timeline__axis" aria-hidden="true"><span></span><div class="timeline__scale">');
    out.push('    <span class="timeline__mark" style="left:' + nowPos + '%">Now 7:05 am</span>');
    out.push('    <span class="timeline__mark timeline__mark--end" style="right:' + (100 - pct(TIMELINE.edge)).toFixed(3) + '%">6:00 pm: end of hours</span>');
    for (let h = 7; h <= 18; h += 1) {
      out.push('    <span class="timeline__tick" style="left:' + pct(h * 60).toFixed(3) + '%">' + minutesToTime(h * 60, 'en') + '</span>');
    }
    out.push('  </div></div>');
    for (const row of TIMELINE.rows) {
      out.push('  <div class="timeline__row" role="group" aria-label="' + esc(row.name + (row.hours ? ', ' + row.meta + ', available ' + row.hours : ', ' + row.meta.toLowerCase())) + '">');
      out.push('    <div class="timeline__van"><strong>' + esc(row.name) + '</strong><span>' + esc(row.meta) + '</span>' + (row.hours ? '<span>' + esc(row.hours) + '</span>' : '') + '</div>');
      out.push('    <div class="timeline__track' + (row.tall ? ' timeline__track--tall' : '') + '">');
      for (let h = 8; h <= 18; h += 1) {
        out.push('      <span class="timeline__hour" style="left:' + pct(h * 60).toFixed(3) + '%"></span>');
      }
      out.push('      <span class="timeline__after" style="left:' + edgePos + '%"></span>');
      for (const item of row.items) {
        const left = pct(toMinutes(item.from)).toFixed(3);
        const width = (pct(toMinutes(item.to)) - pct(toMinutes(item.from))).toFixed(3);
        const style = 'left:' + left + '%;width:' + width + '%';
        if (item.kind === 'wait') {
          out.push('      <span class="timeline__wait" style="' + style + '"><span class="timeline__wait-label">' + esc(item.label) + '</span></span>');
        } else if (item.kind === 'run') {
          out.push('      <div class="timeline__run" style="' + style + '" role="group" aria-label="' + esc(item.label + ', 8:25 am to 9:10 am') + '"><span class="timeline__run-label" aria-hidden="true">' + esc(item.label) + '</span><div class="timeline__run-body">');
          for (const ref of item.refs) {
            out.push('        ' + blockHTML(item, ref, row.name, state, ''));
          }
          out.push('      </div></div>');
        } else {
          out.push('      ' + blockHTML(item, item.ref, row.name, state, style));
        }
      }
      out.push('      <span class="timeline__edge" style="left:' + edgePos + '%"></span>');
      out.push('      <span class="timeline__now" style="left:' + nowPos + '%"></span>');
      out.push('    </div>');
      out.push('  </div>');
    }
    out.push('</div>');
    return out.map(/** Indents a line of generated HTML. @param {string} l - The line. @returns {string} The indented line. */ function indent(l) { return '        ' + l; }).join('\n');
  }

  // === Section: 7. Dashboard behaviour ===

  let dash = null;
  let dashUndoTimer = 0;

  /**
   * Redraws every part of the dashboard that depends on state.
   * @returns {void}
   */
  function renderDash() {
    $('#plan').innerHTML = planHTML(dash);
    const details = $('#needs-lists details');
    const wasOpen = details ? details.open : true;
    $('#needs-lists').innerHTML = needsHTML(dash);
    const newDetails = $('#needs-lists details');
    if (newDetails) {
      newDetails.open = wasOpen;
    }
    $('#glance').innerHTML = glanceHTML(dash);
    $('#panel').innerHTML = panelHTML(dash);
    $('#trip-rows').innerHTML = tableHTML(dash);
    $('#timeline').outerHTML = timelineHTML(dash).trim();
    // Pressed shows a tick as well as the fill, like the language switch.
    $('#list-toggle').setAttribute('aria-pressed', String(dash.listView));
    $('#list-toggle').innerHTML = (dash.listView ? icon('tick') : '') + 'Show as list';
    $('#timeline-view').hidden = dash.listView;
    $('#trip-list').hidden = !dash.listView;
  }

  /**
   * Opens a booking in the panel. From the timeline, focus moves to the
   * panel's heading so keyboard and screen reader users land on it; a "Back
   * to the timeline" link returns them.
   * @param {string} ref - The booking reference.
   * @param {boolean} fromTimeline - True when chosen on the timeline.
   * @returns {void}
   */
  function openBooking(ref, fromTimeline) {
    dash.selected = ref;
    dash.fromTimeline = fromTimeline;
    dash.lastBlock = fromTimeline ? ref : null;
    renderDash();
    if (fromTimeline) {
      const title = $('#panel-title');
      title.scrollIntoView({ block: 'start' });
      title.focus({ preventScroll: true });
    }
  }

  /**
   * Shows a message above the panel, with Undo for 10 seconds when given.
   * @param {string} text - The message.
   * @param {?function(): void} undo - What Undo does, or null for none.
   * @returns {void}
   */
  function dashMessage(text, undo) {
    window.clearTimeout(dashUndoTimer);
    const box = $('#panel-status');
    box.innerHTML = '<p class="toast" tabindex="-1">' + icon('confirmed') + '<span>' + esc(text) + '</span>' +
      (undo ? '<button type="button" class="button button--secondary button--small" data-undo>' + icon('undo') + 'Undo</button>' : '') + '</p>';
    if (undo) {
      $('[data-undo]', box).addEventListener('click', /** Undo: reverses the action and returns focus to the panel. @returns {void} */ function onUndo() {
        window.clearTimeout(dashUndoTimer);
        undo();
        box.innerHTML = '';
        $('#panel-title').focus();
      });
      dashUndoTimer = window.setTimeout(/** Ends the 10-second Undo window. @returns {void} */ function endUndo() {
        const btn = $('[data-undo]', box);
        if (btn) {
          const hadFocus = document.activeElement === btn;
          btn.remove();
          if (hadFocus) {
            $('#panel-title').focus();
          }
        }
      }, 10000);
    }
  }

  /**
   * Approves one proposal: Confirmed in the panel, the timeline block, the
   * lists and the counts, with Undo for 10 seconds (US-17, FR-30).
   * @param {string} ref - The booking reference.
   * @returns {void}
   */
  function approve(ref) {
    const before = dash.status[ref];
    dash.status[ref] = 'confirmed';
    dash.approvedAt[ref] = '7:05 am';
    renderDash();
    const b = booking(ref);
    dashMessage(ref + ' confirmed. ' + b.name + ' will get a text.', /** Puts the booking back to its earlier status. @returns {void} */ function undoApprove() {
      dash.status[ref] = before;
      delete dash.approvedAt[ref];
      renderDash();
    });
    $('#panel-status .toast').focus();
  }

  /**
   * Opens the approve-plan confirmation (brief 4.8). Escape or "Not now"
   * closes it and returns focus to the button.
   * @returns {void}
   */
  function openPlanDialog() {
    const dialog = $('#plan-dialog');
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    $('#plan-confirm').focus();
  }

  /**
   * Closes the approve-plan dialog.
   * @param {boolean} approved - True when "Approve and send" was chosen.
   * @returns {void}
   */
  function closePlanDialog(approved) {
    const dialog = $('#plan-dialog');
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
    if (approved) {
      // BRL-21 and FR-34: approving the plan confirms every proposal in it;
      // the requests that need attention stay open.
      for (const b of BOOKINGS) {
        if (dash.status[b.ref] === 'proposed') {
          dash.status[b.ref] = 'confirmed';
          dash.approvedAt[b.ref] = '7:06 am';
        }
      }
      dash.planApproved = true;
      renderDash();
      $('#plan-title').focus();
    } else {
      const btn = $('#plan-approve');
      if (btn) {
        btn.focus();
      }
    }
  }

  /**
   * Handles clicks anywhere on the dashboard (one listener for content that
   * is redrawn).
   * @param {MouseEvent} event - The click.
   * @returns {void}
   */
  function onDashClick(event) {
    const el = event.target.closest('button, a');
    if (!el) {
      return;
    }
    if (el.hasAttribute('data-open')) {
      openBooking(el.getAttribute('data-open'), el.hasAttribute('data-block'));
    } else if (el.hasAttribute('data-approve')) {
      approve(el.getAttribute('data-approve'));
    } else if (el.hasAttribute('data-change')) {
      dashMessage('Change is not part of this design sample.', null);
    } else if (el.hasAttribute('data-decline')) {
      dashMessage('Decline asks for a reason first. It is not part of this design sample.', null);
    } else if (el.id === 'plan-approve') {
      openPlanDialog();
    } else if (el.id === 'list-toggle') {
      dash.listView = !dash.listView;
      renderDash();
      $('#list-toggle').focus();
    } else if (el.hasAttribute('data-back')) {
      event.preventDefault();
      const block = $('[data-block="' + dash.lastBlock + '"]');
      if (block) {
        block.focus();
      }
    } else if (el.hasAttribute('data-not-built') || el.hasAttribute('data-signout')) {
      event.preventDefault();
      $('#nav-status').textContent = el.textContent.replace(' (current page)', '') + ' is not part of this design sample.';
    }
  }

  /**
   * Runs a prototype control on the dashboard.
   * @param {string} action - "approve-plan", "open-0149", "list" or "reset".
   * @returns {void}
   */
  function dashProto(action) {
    if (action === 'approve-plan') {
      if (dash.planApproved) {
        return;
      }
      openPlanDialog();
    } else if (action === 'open-0149') {
      openBooking('PT-2026-0149', true);
    } else if (action === 'list') {
      dash.listView = true;
      renderDash();
      $('#trip-list').scrollIntoView({ block: 'start' });
    } else if (action === 'reset') {
      dash = initialDashState();
      $('#panel-status').innerHTML = '';
      $('#nav-status').textContent = '';
      renderDash();
      window.scrollTo(0, 0);
    }
  }

  /**
   * Starts the dashboard.
   * @returns {void}
   */
  function initDashboard() {
    dash = initialDashState();
    $('#list-toggle').hidden = false;
    renderDash();
    document.body.addEventListener('click', onDashClick);
    $('#plan-confirm').addEventListener('click', /** "Approve and send". @returns {void} */ function onConfirm() { closePlanDialog(true); });
    $('#plan-cancel').addEventListener('click', /** "Not now". @returns {void} */ function onCancel() { closePlanDialog(false); });
    // Escape closes a modal <dialog> natively; this returns focus too.
    $('#plan-dialog').addEventListener('cancel', /** Escape on the dialog: close it and return focus. @param {Event} event - The cancel event. @returns {void} */ function onEscape(event) {
      event.preventDefault();
      closePlanDialog(false);
    });
    $('.filters').addEventListener('submit', /** The filters are visible only in this sample. @param {SubmitEvent} event - The submit. @returns {void} */ function onFilter(event) {
      event.preventDefault();
      $('#nav-status').textContent = 'Filters are not part of this design sample.';
    });
    bindProto(dashProto);
  }

  // === Section: 8. Driver data and renderers ===

  /**
   * Van 1's stops on Tuesday 13/10/2026 (brief 4.6). Notes and names are
   * data, shown as entered in both languages; "Gap job" is a label and is
   * translated (driver.gap).
   * @type {Array<Object>}
   */
  const STOPS = [
    { n: 1, time: '07:30', place: 'Branch A (main branch)', action: 'pickup', pax: 2, ref: 'PT-2026-0131', contact: 'Dilini Fernando', phone: '077 000 0131', note: 'Early trip' },
    { n: 2, time: '07:55', place: 'Branch C', action: 'dropoff', pax: 2, ref: 'PT-2026-0131' },
    { n: 3, time: '09:05', place: 'Branch A (main branch)', action: 'pickup', pax: 11, ref: 'PT-2026-0119', bookingName: 'Grade 7 Swimming', contact: 'Ruwan Silva', phone: '077 000 0119', note: 'Swimming bags go in the back.' },
    { n: 4, time: '09:30', place: 'Aquatic Centre', article: 'the', action: 'dropoff', pax: 11, ref: 'PT-2026-0119', note: 'Return pickup here at 11:30 am.' },
    { n: 5, time: '10:00', place: 'Branch B', action: 'pickup', pax: 1, ref: 'PT-2026-0145', contact: 'Shamila Rodrigo', phone: '077 000 0145', gap: true },
    { n: 6, time: '10:20', place: 'Stationery supplier', article: 'the', action: 'dropoff', pax: 1, ref: 'PT-2026-0145', note: 'Wait about 15 minutes.' },
    { n: 7, time: '10:35', place: 'Stationery supplier', article: 'the', action: 'pickup', pax: 1, ref: 'PT-2026-0145', contact: 'Shamila Rodrigo', phone: '077 000 0145', note: 'She returns with boxes.' },
    { n: 8, time: '10:50', place: 'Branch B', action: 'dropoff', pax: 1, ref: 'PT-2026-0145', note: 'Then go to the Aquatic Centre (arrive by 11:10 am).' },
    { n: 9, time: '11:30', place: 'Aquatic Centre', article: 'the', action: 'pickup', pax: 11, ref: 'PT-2026-0119', contact: 'Ruwan Silva', phone: '077 000 0119' },
    { n: 10, time: '11:55', place: 'Branch A (main branch)', action: 'dropoff', pax: 11, ref: 'PT-2026-0119' },
    { n: 11, time: '13:30', place: 'Branch A (main branch)', action: 'pickup', pax: 6, ref: 'PT-2026-0150', contact: 'Priyanka Wijesekara', phone: '077 000 0150' },
    { n: 12, time: '13:45', place: 'Branch B', action: 'dropoff', pax: 6, ref: 'PT-2026-0150' },
    { n: 13, time: '15:30', place: 'Branch B', action: 'pickup', pax: 6, ref: 'PT-2026-0150', contact: 'Priyanka Wijesekara', phone: '077 000 0150' },
    { n: 14, time: '15:45', place: 'Branch A (main branch)', action: 'dropoff', pax: 6, ref: 'PT-2026-0150', note: 'End of day at Branch A.' }
  ];

  /**
   * The driver page's starting state at 9:40 am: stops 1 to 4 done at their
   * actual times.
   * @returns {Object} A fresh state object.
   */
  function initialDriverState() {
    return {
      result: { 1: { kind: 'done', at: 451 }, 2: { kind: 'done', at: 476 }, 3: { kind: 'done', at: 546 }, 4: { kind: 'done', at: 569 } },
      now: 9 * 60 + 40,
      confirming: 0,
      navNote: 0,
      offline: false,
      undo: null
    };
  }

  /**
   * The stop's action as a sentence. English: "Pick up 1 passenger at
   * Branch B." and, for the next stop, "Next: pick up 1 passenger at Branch B
   * at 10:00 am." Sinhala builds the same parts from the shared strings
   * (draft, D-09).
   * @param {Object} s - A stop.
   * @param {boolean} isNext - True for the next stop.
   * @returns {string} The sentence's HTML.
   */
  function stopSentence(s, isNext) {
    const time = minutesToTime(toMinutes(s.time));
    if (lang === 'si') {
      const action = t(s.action === 'pickup' ? 'driver.pickup' : 'driver.dropoff');
      const body = data(s.place) + ' හිදී ' + esc(action) + ' (' + esc(t('driver.passengers')) + ' ' + s.pax + ')';
      return isNext ? esc(t('driver.next')) + ': ' + esc(time) + ' · ' + body + '.' : body + '.';
    }
    const verb = s.action === 'pickup' ? 'pick up' : 'drop off';
    const who = s.pax + ' ' + (s.pax === 1 ? t('x.passenger') : t('driver.passengers'));
    const where = (s.article ? s.article + ' ' : '') + esc(s.place);
    if (isNext) {
      return 'Next: ' + verb + ' ' + who + ' at ' + where + ' at ' + esc(time) + '.';
    }
    return verb.charAt(0).toUpperCase() + verb.slice(1) + ' ' + who + ' at ' + where + '.';
  }

  /**
   * One stop on the route, in the current language.
   * @param {Object} s - A stop from STOPS.
   * @param {Object} state - Driver state.
   * @param {boolean} isNext - True for the next stop.
   * @returns {string} The <li>.
   */
  function stopHTML(s, state, isNext) {
    const r = state.result[s.n];
    const out = [];
    const mins = toMinutes(s.time) - state.now;
    out.push('<li class="stop' + (r ? ' is-' + r.kind : '') + '" id="stop-' + s.n + '">');
    out.push('<h3 class="stop__head"><span class="stop__time">' + esc(minutesToTime(toMinutes(s.time))) + '</span> <span class="stop__num">' +
      esc(t('driver.stop')) + ' ' + s.n + '</span>' +
      (isNext && mins > 0 ? ' <span class="stop__in">' + esc(t('driver.in', { min: mins })) + '</span>' : '') + '</h3>');
    out.push('<p class="stop__sentence">' + stopSentence(s, isNext) + '</p>');
    if (r) {
      const key = r.kind === 'done' ? 'driver.doneat' : 'driver.noshowat';
      out.push('<p class="stop__result">' + icon(r.kind === 'done' ? 'confirmed' : 'noshow') + '<span>' + esc(t(key, { time: minutesToTime(r.at) })) + '</span></p>');
      out.push('</li>');
      return out.join('');
    }
    out.push('<dl class="stop__facts"><div><dt>' + esc(t('x.booking')) + '</dt><dd><span class="ref">' + s.ref + '</span>' +
      (s.bookingName ? ', ' + data(s.bookingName) : '') + '</dd></div>' +
      (s.contact ? '<div><dt>' + esc(t('driver.contact')) + '</dt><dd>' + data(s.contact) + ' <span class="stop__phone">' + esc(s.phone) + '</span></dd></div>' : '') +
      '</dl>');
    if (s.gap) {
      out.push('<p class="stop__note">' + icon('gap') + ' <strong>' + esc(t('driver.gap')) + '</strong></p>');
    } else if (s.note) {
      out.push('<p class="stop__note"><strong>' + esc(t('x.note')) + ':</strong> ' + data(s.note) + '</p>');
    }
    out.push('<div class="stop__tools"><button type="button" class="button button--secondary" data-navigate="' + s.n + '">' + icon('navigate') +
      '<span>' + esc(t('driver.navigate')) + '</span><span class="visually-hidden"> ' + esc(t('driver.stop')) + ' ' + s.n + '</span></button>' +
      (s.contact ? '<a class="button button--secondary" href="' + telHref(s.phone) + '">' + icon('phone') + '<span>' + esc(t('driver.call')) +
        '</span><span class="visually-hidden"> ' + esc(s.contact) + '</span></a>' : '') + '</div>');
    out.push('<p class="stop__navnote" role="status">' + (state.navNote === s.n ? esc(t('driver.navnote')) : '') + '</p>');
    if (state.confirming === s.n) {
      out.push('<div class="stop__confirm"><p id="confirm-' + s.n + '" tabindex="-1">' + esc(t('driver.noshow.confirm')) + '</p><div class="stop__actions">' +
        '<button type="button" class="button button--danger" data-noshow-yes="' + s.n + '">' + esc(t('driver.noshow.yes')) + '</button>' +
        '<button type="button" class="button button--secondary" data-noshow-back="' + s.n + '">' + esc(t('driver.goback')) + '</button></div></div>');
    } else {
      // Only the next stop's Done is the primary action; later stops keep a
      // full-size but quieter Done (one primary action per view).
      out.push('<div class="stop__actions"><button type="button" class="button ' + (isNext ? 'button--primary button--large' : 'button--secondary') + '" data-done="' + s.n + '">' + icon('tick') +
        '<span>' + esc(t('driver.done')) + '</span><span class="visually-hidden">, ' + esc(t('driver.stop')) + ' ' + s.n + '</span></button>' +
        '<button type="button" class="button ' + (isNext ? 'button--secondary' : 'button--quiet button--noshow') + '" data-noshow="' + s.n + '" id="noshow-' + s.n + '"><span>' + esc(t('driver.noshow')) +
        '</span><span class="visually-hidden">, ' + esc(t('driver.stop')) + ' ' + s.n + '</span></button></div>');
    }
    out.push('</li>');
    return out.join('');
  }

  /**
   * Splits the stops into done, next and later from the state.
   * @param {Object} state - Driver state.
   * @returns {{done: Object[], next: ?Object, later: Object[]}} The three groups.
   */
  function splitStops(state) {
    const done = [];
    const open = [];
    for (const s of STOPS) {
      (state.result[s.n] ? done : open).push(s);
    }
    return { done: done, next: open[0] || null, later: open.slice(1) };
  }

  /**
   * The route's facts line: van, day and driver.
   * @returns {string} HTML.
   */
  function factsHTML() {
    return '      ' + esc(t('driver.van')) + ' 1 · ' + esc(t('day.tuesday')) + ' 13/10/2026 · ' + esc(t('driver.driver')) + ': ' + data('Sunil Rathnayake');
  }

  /**
   * "Route updated at 7:06 am".
   * @returns {string} HTML.
   */
  function updatedHTML() {
    return '      ' + esc(t('driver.updated', { time: formatTime(7, 6) }));
  }

  /**
   * The folded list of done stops; its summary is the progress sentence.
   * @param {Object} state - Driver state.
   * @returns {string} The <summary> and the list.
   */
  function doneHTML(state) {
    const g = splitStops(state);
    return '      <summary class="disclosure__summary">' + icon('chevron') + '<h2 class="route__progress" id="progress">' +
      esc(t('driver.progress', { done: g.done.length, total: STOPS.length })) + '</h2></summary>\n' +
      '      <ol class="stops stops--done">' + g.done.map(/** One done stop. @param {Object} s - A stop. @returns {string} The <li>. */ function doneStop(s) { return stopHTML(s, state, false); }).join('') + '</ol>';
  }

  /**
   * The next stop, as a sentence in the sentence box.
   * @param {Object} state - Driver state.
   * @returns {string} The <li>, or an end-of-day line.
   */
  function nextHTML(state) {
    const g = splitStops(state);
    return '        ' + (g.next ? stopHTML(g.next, state, true) : '<li class="stop"><p class="stop__sentence">' + esc(t('driver.end')) + '</p></li>');
  }

  /**
   * The stops after the next one.
   * @param {Object} state - Driver state.
   * @returns {string} The <li> items.
   */
  function laterHTML(state) {
    return splitStops(state).later.map(/** One later stop. @param {Object} s - A stop. @returns {string} The <li>. */ function laterStop(s) { return '        ' + stopHTML(s, state, false); }).join('\n');
  }

  // === Section: 9. Driver behaviour ===

  let route = null;
  let routeUndoTimer = 0;

  /**
   * Redraws the route from state in the current language.
   * @returns {void}
   */
  function renderRoute() {
    $('#route-facts').innerHTML = factsHTML();
    $('#route-updated').innerHTML = updatedHTML();
    const details = $('#done-stops');
    const wasOpen = details.open;
    details.innerHTML = doneHTML(route);
    details.open = wasOpen;
    $('#next-list').innerHTML = nextHTML(route);
    $('#later-list').innerHTML = laterHTML(route);
    $('#offline-status').innerHTML = route.offline
      ? '<p class="toast toast--offline">' + icon('offline') + '<span>' + esc(t('driver.offline')) + '</span></p>' : '';
    renderRouteMessage();
  }

  /**
   * Draws the "Done at 9:41 am" message with Undo while Undo is allowed.
   * @returns {void}
   */
  function renderRouteMessage() {
    const box = $('#stop-status');
    const u = route.undo;
    if (!u) {
      box.innerHTML = '';
      return;
    }
    const key = u.kind === 'done' ? 'driver.doneat' : 'driver.noshowat';
    box.innerHTML = '<p class="toast" tabindex="-1">' + icon(u.kind === 'done' ? 'confirmed' : 'noshow') + '<span>' +
      esc(t('driver.stop')) + ' ' + u.n + ': ' + esc(t(key, { time: minutesToTime(u.at) })) + '</span>' +
      (u.live ? '<button type="button" class="button button--secondary" data-undo>' + icon('undo') + '<span>' + esc(t('driver.undo')) + '</span></button>' : '') + '</p>';
  }

  /**
   * Records Done or No-show for a stop at the next minute, moves "Next stop"
   * on, and offers Undo for 10 seconds (US-60). Focus goes to the message so
   * Undo is the next thing reached.
   * @param {number} n - The stop number.
   * @param {string} kind - "done" or "noshow".
   * @returns {void}
   */
  function recordStop(n, kind) {
    route.now += 1;
    route.result[n] = { kind: kind, at: route.now };
    route.confirming = 0;
    route.navNote = 0;
    route.undo = { n: n, kind: kind, at: route.now, live: true };
    window.clearTimeout(routeUndoTimer);
    routeUndoTimer = window.setTimeout(/** Ends the 10-second Undo window. @returns {void} */ function endUndo() {
      if (route.undo) {
        const hadFocus = document.activeElement && document.activeElement.hasAttribute('data-undo');
        route.undo.live = false;
        renderRouteMessage();
        if (hadFocus) {
          $('#stop-status .toast').focus();
        }
      }
    }, 10000);
    renderRoute();
    $('#stop-status .toast').focus();
  }

  /**
   * Handles clicks on the route (one listener for content that is redrawn).
   * @param {MouseEvent} event - The click.
   * @returns {void}
   */
  function onRouteClick(event) {
    const el = event.target.closest('button');
    if (!el) {
      return;
    }
    if (el.hasAttribute('data-done')) {
      recordStop(Number(el.getAttribute('data-done')), 'done');
    } else if (el.hasAttribute('data-noshow')) {
      // No-show asks first, so it is hard to record by mistake (US-60).
      route.confirming = Number(el.getAttribute('data-noshow'));
      renderRoute();
      $('#confirm-' + route.confirming).focus();
    } else if (el.hasAttribute('data-noshow-yes')) {
      recordStop(Number(el.getAttribute('data-noshow-yes')), 'noshow');
    } else if (el.hasAttribute('data-noshow-back')) {
      goBackFromNoShow();
    } else if (el.hasAttribute('data-navigate')) {
      // The map service is not chosen yet (Q-17): say what would happen.
      route.navNote = Number(el.getAttribute('data-navigate'));
      renderRoute();
      $('[data-navigate="' + route.navNote + '"]').focus();
    } else if (el.hasAttribute('data-undo')) {
      const n = route.undo.n;
      delete route.result[n];
      route.undo = null;
      window.clearTimeout(routeUndoTimer);
      renderRoute();
      const btn = $('[data-done="' + n + '"]');
      if (btn) {
        btn.focus();
      }
    }
  }

  /**
   * Closes the No-show question and returns focus to No-show.
   * @returns {void}
   */
  function goBackFromNoShow() {
    const n = route.confirming;
    route.confirming = 0;
    renderRoute();
    const btn = $('#noshow-' + n);
    if (btn) {
      btn.focus();
    }
  }

  /**
   * Escape closes the No-show question, like a dialog.
   * @param {KeyboardEvent} event - The key press.
   * @returns {void}
   */
  function onRouteKey(event) {
    if (event.key === 'Escape' && route.confirming) {
      goBackFromNoShow();
    }
  }

  /**
   * Runs a prototype control on the driver page.
   * @param {string} action - "offline", "done-next" or "reset".
   * @returns {void}
   */
  function driverProto(action) {
    if (action === 'offline') {
      route.offline = !route.offline;
      renderRoute();
    } else if (action === 'done-next') {
      const next = splitStops(route).next;
      if (next) {
        recordStop(next.n, 'done');
      }
    } else if (action === 'reset') {
      window.clearTimeout(routeUndoTimer);
      route = initialDriverState();
      renderRoute();
      window.scrollTo(0, 0);
    }
  }

  /**
   * Starts the driver page.
   * @returns {void}
   */
  function initDriver() {
    route = initialDriverState();
    languageHooks.push(renderRoute);
    initLanguage();
    renderRoute();
    $('#main').addEventListener('click', onRouteClick);
    $('#main').addEventListener('keydown', onRouteKey);
    bindProto(driverProto);
  }

  // === Section: 10. Start-up and Node export ===

  /**
   * Starts whichever page this is, from <body data-page>. Pages without a
   * data-page (index.html) only get the language helpers they use.
   * @returns {void}
   */
  function start() {
    document.documentElement.classList.add('js');
    const page = document.body.getAttribute('data-page');
    if (page === 'request') {
      initRequest();
    } else if (page === 'dashboard') {
      initDashboard();
    } else if (page === 'driver') {
      initDriver();
    }
  }

  if (typeof document !== 'undefined') {
    start();
  } else if (typeof module !== 'undefined') {
    // Node only: the renderers that produced the static HTML of the
    // dashboard and driver pages. Browsers never reach this branch.
    module.exports = {
      initialDashState: initialDashState, planHTML: planHTML, needsHTML: needsHTML, glanceHTML: glanceHTML,
      panelHTML: panelHTML, tableHTML: tableHTML, timelineHTML: timelineHTML, badgeHTML: badgeHTML, flagsHTML: flagsHTML,
      STATUS: STATUS, FLAGS: FLAGS, BOOKINGS: BOOKINGS,
      initialDriverState: initialDriverState, factsHTML: factsHTML, updatedHTML: updatedHTML, doneHTML: doneHTML,
      nextHTML: nextHTML, laterHTML: laterHTML, formatTime: formatTime, STRINGS: STRINGS, EXTRA: EXTRA
    };
  }
}());
