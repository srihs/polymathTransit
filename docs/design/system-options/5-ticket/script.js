/**
 * @file PolymathTransit – Design direction 5 "Ticket" – the only script.
 *
 * Enhances the four prototype pages; every page still reads without it
 * (brief section 2). One classic script in an IIFE so it runs from file://.
 *
 * Sections:
 *   1. Shared strings (brief 4.9, copied exactly)
 *   2. Small helpers (DOM, escaping, strings)
 *   3. Time and date formatting (NFR-12)
 *   4. Language switch (FR-65)
 *   5. Request form (FR-01 to FR-07, FR-09, FR-54, FR-55, US-01, US-03, US-05)
 *   6. The ticket renderer (live ticket and the received confirmation)
 *   7. Dashboard (FR-19, FR-29, US-16, US-22, US-26, BRL-21)
 *   8. Driver's route (FR-61, FR-67, US-60, NFR-18)
 *   9. Foundations page demos
 *   10. Start-up
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

  /*
   * Strings this direction needs beyond brief 4.9. Kept apart so the block
   * above stays an exact copy of the brief. Each Sinhala string here is a
   * draft by the ux-designer and is on the D-09 review list.
   *
   * done.status – the status stamp on the requester's confirmation. A request
   * that has just been sent is Submitted, not Confirmed (US-01 AC-5, FR-04,
   * specification 6.2), so the stamp says so in plain words (review 5.1).
   */
  STRINGS.en['done.status'] = 'Not confirmed yet';
  STRINGS.si['done.status'] = 'තවම තහවුරු කර නැත'; // Draft, D-09.

  // === Section: 2. Small helpers ===

  /**
   * Finds the first element that matches a selector.
   * @param {string} sel CSS selector.
   * @param {ParentNode} [root=document] Where to look.
   * @returns {?Element} The element, or null.
   */
  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  /**
   * Finds every element that matches a selector.
   * @param {string} sel CSS selector.
   * @param {ParentNode} [root=document] Where to look.
   * @returns {Element[]} The elements as an array.
   */
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /**
   * Escapes text for safe use inside an HTML string.
   * @param {*} value Any value; it is turned into a string.
   * @returns {string} The escaped text.
   */
  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** The current language of the public pages: 'en' or 'si'. */
  let lang = 'en';

  /**
   * Looks up a shared string in the current language and fills placeholders.
   * @param {string} key A key from STRINGS (for example 'form.title').
   * @param {Object<string, (string|number)>} [vars] Values for {placeholders}.
   * @returns {string} The string; falls back to English, then to the key.
   */
  function t(key, vars) {
    const table = STRINGS[lang] || STRINGS.en;
    let text = table[key] != null ? table[key] : (STRINGS.en[key] != null ? STRINGS.en[key] : key);
    if (vars) {
      Object.keys(vars).forEach(function (name) {
        text = text.split('{' + name + '}').join(String(vars[name]));
      });
    }
    return text;
  }

  // === Section: 3. Time and date formatting ===

  /**
   * Joins a time to its am/pm word with a no-break space, so "5:00 pm" or
   * "ප.ව. 5:00" never splits across two lines. Display only; the strings
   * themselves are unchanged.
   * @param {string} text Any display text.
   * @returns {string} The same text with times kept together.
   */
  function keepTimesTogether(text) {
    return text
      .replace(/(\d{1,2}:\d{2}) (am|pm)/g, '$1\u00A0$2')
      .replace(/(පෙ\.ව\.|ප\.ව\.) (\d)/g, '$1\u00A0$2');
  }

  /**
   * Formats a time of day the way NFR-12 asks: "8:45 am" in English and
   * "පෙ.ව. 8:45" in Sinhala (research.md question 6.1).
   * @param {number} hours 0 to 23.
   * @param {number} minutes 0 to 59.
   * @param {string} [language] 'en' or 'si'; defaults to the current one.
   * @returns {string} The formatted time, with no leading zero and no time zone.
   */
  function formatTime(hours, minutes, language) {
    const parts = timeParts(hours, minutes, language);
    return parts.before ? parts.before + ' ' + parts.clock : parts.clock + ' ' + parts.after;
  }

  /**
   * Splits a time into its clock figures and its am/pm word, so the stencil
   * face prints only the figures and the word sits on its own line.
   * @param {number} hours 0 to 23.
   * @param {number} minutes 0 to 59.
   * @param {string} [language] 'en' or 'si'.
   * @returns {{clock: string, before: string, after: string}} Sinhala puts
   *   the word before the figures, English after.
   */
  function timeParts(hours, minutes, language) {
    const l = language || lang;
    const h12 = hours % 12 === 0 ? 12 : hours % 12;
    const clock = h12 + ':' + (minutes < 10 ? '0' : '') + minutes;
    const word = STRINGS[l][hours < 12 ? 'time.am' : 'time.pm'];
    return l === 'si' ? { clock: clock, before: word, after: '' } : { clock: clock, before: '', after: word };
  }

  /**
   * Reads "HH:MM" (24-hour, as in option values and data attributes).
   * @param {string} value For example "08:45".
   * @returns {?{h: number, m: number, total: number}} Null when empty or wrong.
   */
  function parseHHMM(value) {
    const match = /^(\d{1,2}):(\d{2})$/.exec(value || '');
    if (!match) {
      return null;
    }
    const h = Number(match[1]);
    const m = Number(match[2]);
    return { h: h, m: m, total: h * 60 + m };
  }

  /**
   * Formats "HH:MM" for display in the current language.
   * @param {string} value For example "13:30".
   * @returns {string} For example "1:30 pm"; empty when the value is empty.
   */
  function formatHHMM(value) {
    const p = parseHHMM(value);
    return p ? formatTime(p.h, p.m) : '';
  }

  /**
   * Formats a date as DD/MM/YYYY (NFR-12), in both languages.
   * @param {Date} date A local date.
   * @returns {string} For example "13/10/2026".
   */
  function formatDate(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    return (d < 10 ? '0' : '') + d + '/' + (m < 10 ? '0' : '') + m + '/' + date.getFullYear();
  }

  /** Weekday string keys, Sunday first, matching Date.getDay(). */
  const DAY_KEYS = [null, 'day.monday', 'day.tuesday', 'day.wednesday', 'day.thursday', 'day.friday', null];

  /**
   * Formats a weekday and date, for example "Tuesday 13/10/2026" or
   * "අඟහරුවාදා 13/10/2026".
   * @param {Date} date A local date.
   * @returns {string} The weekday and date; only the date for weekends.
   */
  function formatWeekdayDate(date) {
    const key = DAY_KEYS[date.getDay()];
    return (key ? t(key) + ' ' : '') + formatDate(date);
  }

  /**
   * Reads an ISO date "YYYY-MM-DD" as a local date.
   * @param {string} iso For example "2026-10-13".
   * @returns {?Date} The date, or null when the text is not a date.
   */
  function parseIso(iso) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : null;
  }

  /**
   * Reads a typed date "DD/MM/YYYY" (also accepts single digits and - or .).
   * @param {string} text What the person typed.
   * @returns {?Date} The date, or null when it is not a real date.
   */
  function parseTypedDate(text) {
    const match = /^\s*(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})\s*$/.exec(text || '');
    if (!match) {
      return null;
    }
    const d = Number(match[1]);
    const m = Number(match[2]) - 1;
    const y = Number(match[3]);
    const date = new Date(y, m, d);
    return date.getFullYear() === y && date.getMonth() === m && date.getDate() === d ? date : null;
  }

  // === Section: 4. Language switch ===

  /** Functions each page registers to redraw its own dynamic parts. */
  const languageHooks = [];

  /**
   * Reads the remembered language. Some browsers block storage on file://,
   * so every access is wrapped (brief 3.5).
   * @returns {?string} 'en', 'si' or null.
   */
  function readStoredLang() {
    try {
      const value = window.localStorage.getItem('pt-lang');
      return value === 'en' || value === 'si' ? value : null;
    } catch (err) {
      return null;
    }
  }

  /**
   * Remembers the chosen language on this device (FR-65).
   * @param {string} value 'en' or 'si'.
   * @returns {void}
   */
  function storeLang(value) {
    try {
      window.localStorage.setItem('pt-lang', value);
    } catch (err) {
      /* Storage blocked: the choice lasts for this page only. */
    }
  }

  /**
   * Writes one translatable element's text, filling {time}, {min}, {done}
   * and {total} from its data-i18n-* attributes.
   * @param {HTMLElement} el An element with data-i18n.
   * @returns {void}
   */
  function applyI18n(el) {
    const vars = {};
    if (el.dataset.i18nTime) {
      vars.time = formatHHMM(el.dataset.i18nTime);
    }
    if (el.dataset.i18nMin) {
      vars.min = el.dataset.i18nMin;
    }
    if (el.dataset.i18nDone) {
      vars.done = el.dataset.i18nDone;
    }
    if (el.dataset.i18nTotal) {
      vars.total = el.dataset.i18nTotal;
    }
    el.textContent = keepTimesTogether(t(el.dataset.i18n, vars));
  }

  /**
   * Switches every label, option, hint, message and button to a language,
   * sets <html lang> and lets each page redraw its dynamic parts.
   * @param {string} next 'en' or 'si'.
   * @param {boolean} announce True when the person chose it (shows lang.note).
   * @returns {void}
   */
  function applyLanguage(next, announce) {
    lang = next === 'si' ? 'si' : 'en';
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(applyI18n);
    $$('[data-i18n-label]').forEach(function (el) {
      el.label = t(el.dataset.i18nLabel);
    });
    $$('[data-time-select] option').forEach(function (opt) {
      if (opt.value) {
        opt.textContent = formatHHMM(opt.value);
      }
    });
    $$('[data-time-text]').forEach(function (el) {
      const stub = el.closest('[data-time]');
      el.textContent = stub ? formatHHMM(stub.dataset.time) : el.textContent;
    });
    $$('.lang-switch__btn').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });
    languageHooks.forEach(function (hook) {
      hook();
    });
    const status = $('[data-lang-status]');
    if (status && announce) {
      status.textContent = t('lang.note');
    }
  }

  /**
   * Turns the two no-JS language links into toggle buttons (aria-pressed).
   * @returns {void}
   */
  function initLangSwitch() {
    $$('.lang-switch a.lang-switch__btn').forEach(function (link) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = link.className;
      btn.lang = link.lang;
      btn.dataset.lang = link.dataset.lang;
      btn.innerHTML = link.innerHTML;
      btn.addEventListener('click', function () {
        storeLang(btn.dataset.lang);
        applyLanguage(btn.dataset.lang, true);
      });
      link.replaceWith(btn);
    });
    const fromUrl = /[?&]lang=(en|si)/.exec(window.location.search);
    const start = (fromUrl && fromUrl[1]) || readStoredLang() || 'en';
    applyLanguage(start, false);
  }

  // === Section: 5. Request form ===

  /** The form's "now": Monday 12/10/2026, 2:40 pm (brief 4.4). */
  const FORM_TODAY = new Date(2026, 9, 12);

  /** Sample answers for PT-2026-0142 (brief 4.5). */
  const SAMPLE = {
    name: 'Kasun Jayasinghe', phone: '077 000 0142', purpose: 'sport', date: '2026-10-13',
    from: 'Branch B', to: 'Sports Centre', time: '08:45', flex: '10', pax: '4',
    ret: 'yes', retTime: '10:45'
  };

  /** Field order for the error summary (page order, brief 5.2). */
  const FIELD_ORDER = ['name', 'phone', 'purpose', 'date', 'from', 'to', 'time', 'pax', 'return', 'returnTime'];

  /**
   * Where each field's error shows, which control it marks, and where the
   * summary link goes.
   * @type {Object<string, {msg: string, controls: string, target: string}>}
   */
  const FIELDS = {
    name: { msg: '#name-error', controls: '#name', target: 'name' },
    phone: { msg: '#phone-error', controls: '#phone', target: 'phone' },
    purpose: { msg: '#purpose-error', controls: 'input[name="purpose"]', target: 'purpose-class' },
    date: { msg: '#date-error', controls: 'input[name="date"]', target: 'date-2026-10-13' },
    dateOther: { msg: '#date-other-error', controls: '#date-other-input', target: 'date-other-input' },
    from: { msg: '#from-error', controls: '#from, #from-address', target: 'from' },
    to: { msg: '#to-error', controls: '#to, #to-address', target: 'to' },
    time: { msg: '#time-error', controls: '#time', target: 'time' },
    pax: { msg: '#pax-error', controls: '#pax', target: 'pax' },
    'return': { msg: '#return-error', controls: 'input[name="return"]', target: 'return-yes' },
    returnTime: { msg: '#return-time-error', controls: '#return-time', target: 'return-time' }
  };

  /** Errors currently shown, field name to string key. */
  let shownErrors = {};
  /** Fields the person has typed in (blur validation only after typing). */
  const touched = {};
  /** The last date choice that was allowed, to undo a tap on a closed date. */
  let lastDate = null;
  /** The template for extra stops, taken from the no-JS rows. */
  let stopTemplate = null;
  /** The answers shown on the confirmation, kept to redraw it in Sinhala. */
  let receivedData = null;

  /**
   * Reads the form into a plain object.
   * @returns {Object} The current answers.
   */
  function readForm() {
    const form = $('#request-form');
    /**
     * Reads the value of the checked radio in a group.
     * @param {string} name The radio group's name.
     * @returns {string} The value, or an empty string when none is checked.
     */
    const checked = function (name) {
      const el = form.querySelector('input[name="' + name + '"]:checked');
      return el ? el.value : '';
    };
    const stops = $$('#stops-list .stop').map(function (row) {
      const kind = row.querySelector('input[type="radio"]:checked');
      return {
        place: row.querySelector('select').value,
        kind: kind ? kind.value : '',
        pax: row.querySelector('input[type="text"]').value.trim()
      };
    }).filter(function (s) {
      return s.place;
    });
    return {
      name: $('#name').value.trim(),
      phone: $('#phone').value.trim(),
      purpose: checked('purpose'),
      date: checked('date'),
      dateOther: $('#date-other-input').value.trim(),
      from: $('#from').value,
      fromAddress: $('#from-address').value.trim(),
      to: $('#to').value,
      toAddress: $('#to-address').value.trim(),
      stops: stops,
      time: $('#time').value,
      flex: checked('flex'),
      arrive: $('#arrive').value,
      pax: $('#pax').value.trim(),
      ret: checked('return'),
      retTime: $('#return-time').value,
      stay: $('#return-stay').checked
    };
  }

  /**
   * FR-03: a Sri Lankan number – 07X XXX XXXX, 0XX XXX XXXX or +94…
   * @param {string} value What the person typed.
   * @returns {boolean} True when it looks like a Sri Lankan number.
   */
  function isSriLankanPhone(value) {
    const digits = value.replace(/[\s\-()]/g, '');
    return /^0\d{9}$/.test(digits) || /^\+94\d{9}$/.test(digits) || /^94\d{9}$/.test(digits);
  }

  /**
   * Checks one field and returns the key of its error, if any.
   * @param {string} field A key of FIELDS.
   * @param {Object} data The answers from readForm().
   * @returns {?{field: string, key: string}} The error, or null when fine.
   */
  function checkField(field, data) {
    let key = null;
    let where = field;
    switch (field) {
      case 'name':
        key = data.name ? null : 'err.name';
        break;
      case 'phone':
        key = !data.phone ? 'err.phone.empty' : (isSriLankanPhone(data.phone) ? null : 'err.phone.format');
        break;
      case 'purpose':
        key = data.purpose ? null : 'err.purpose';
        break;
      case 'date':
        if (!data.date) {
          key = 'err.date';
        } else if (data.date === 'other') {
          where = 'dateOther';
          const typed = parseTypedDate(data.dateOther);
          if (!typed) {
            key = 'err.date.format';
          } else if (typed < FORM_TODAY) {
            key = 'err.date.past';
          } else if (typed.getTime() === FORM_TODAY.getTime()) {
            // BRL-13: today's requests closed at 7:00 am.
            key = 'cutoff.today.closed';
          }
        }
        break;
      case 'from':
        key = (!data.from || (data.from === 'other' && !data.fromAddress)) ? 'err.from' : null;
        break;
      case 'to':
        key = (!data.to || (data.to === 'other' && !data.toAddress)) ? 'err.to' : null;
        break;
      case 'time':
        key = data.time ? null : 'err.time';
        break;
      case 'pax': {
        // US-03 AC-4: whole numbers from 1 to 99.
        const n = /^\d{1,2}$/.test(data.pax) ? Number(data.pax) : 0;
        key = n >= 1 && n <= 99 ? null : 'err.pax';
        break;
      }
      case 'return':
        key = data.ret ? null : 'err.return';
        break;
      case 'returnTime':
        if (data.ret === 'yes') {
          const back = parseHHMM(data.retTime);
          const out = parseHHMM(data.time);
          if (!back) {
            key = 'err.return.empty';
          } else if (out && back.total <= out.total) {
            key = 'err.return.time';
          }
        }
        break;
      default:
        break;
    }
    return key ? { field: where, key: key } : null;
  }

  /**
   * Shows or clears the inline error for one field.
   * @param {string} field A key of FIELDS.
   * @param {?string} key The string key of the message, or null to clear.
   * @returns {void}
   */
  function setFieldError(field, key) {
    const conf = FIELDS[field];
    if (!conf) {
      return;
    }
    const msg = $(conf.msg);
    const span = msg.querySelector('span');
    const controls = $$(conf.controls);
    if (key) {
      span.dataset.i18n = key;
      applyI18n(span);
      msg.hidden = false;
      shownErrors[field] = key;
    } else {
      msg.hidden = true;
      delete span.dataset.i18n;
      delete shownErrors[field];
    }
    controls.forEach(function (control) {
      const ids = (control.getAttribute('aria-describedby') || '').split(/\s+/).filter(function (id) {
        return id && id !== msg.id;
      });
      if (key) {
        ids.unshift(msg.id);
        control.setAttribute('aria-invalid', 'true');
      } else {
        control.removeAttribute('aria-invalid');
      }
      if (ids.length) {
        control.setAttribute('aria-describedby', ids.join(' '));
      } else {
        control.removeAttribute('aria-describedby');
      }
    });
    const group = msg.closest('.field, .fieldset');
    if (group) {
      group.classList.toggle('has-error', !!$(FIELDS[field].msg + ':not([hidden])'));
    }
  }

  /**
   * Validates one field after the person leaves it (only if they typed).
   * @param {string} field A key of FIELD_ORDER.
   * @returns {void}
   */
  function validateOne(field) {
    const result = checkField(field, readForm());
    if (field === 'date') {
      setFieldError('date', null);
      setFieldError('dateOther', null);
    }
    if (result) {
      setFieldError(result.field, result.key);
    } else {
      setFieldError(field, null);
    }
  }

  /**
   * Validates the whole form on "Send request" and shows every error.
   * @returns {Array<{field: string, key: string}>} The errors in page order.
   */
  function validateAll() {
    const data = readForm();
    const errors = [];
    Object.keys(FIELDS).forEach(function (field) {
      setFieldError(field, null);
    });
    FIELD_ORDER.forEach(function (field) {
      const result = checkField(field, data);
      if (result) {
        errors.push(result);
        setFieldError(result.field, result.key);
      }
    });
    return errors;
  }

  /**
   * Fills the error summary with one link per error and moves focus to it
   * (US-01 AC-2).
   * @param {Array<{field: string, key: string}>} errors In page order.
   * @returns {void}
   */
  function showSummary(errors) {
    const box = $('#error-summary');
    const list = $('#error-summary-list');
    list.innerHTML = '';
    errors.forEach(function (err) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + FIELDS[err.field].target;
      a.dataset.i18n = err.key;
      a.dataset.target = FIELDS[err.field].target;
      applyI18n(a);
      li.appendChild(a);
      list.appendChild(li);
    });
    box.hidden = errors.length === 0;
    if (errors.length) {
      box.focus();
      box.scrollIntoView({ block: 'start' });
    }
  }

  /**
   * Opens or closes the panels that depend on an answer: "Another date",
   * "Another address" and the return coupon (FR-06).
   * @returns {void}
   */
  function syncReveals() {
    const data = readForm();
    $('#date-other-panel').classList.toggle('is-open', data.date === 'other');
    $('#from-address-panel').classList.toggle('is-open', data.from === 'other');
    $('#to-address-panel').classList.toggle('is-open', data.to === 'other');
    $('#return-panel').classList.toggle('is-open', data.ret === 'yes');
  }

  /**
   * Shows the cutoff message for the chosen date (FR-07, BRL-13).
   * @param {boolean} [closedFocused] True while the closed "Today" option has focus.
   * @returns {void}
   */
  function updateCutoff(closedFocused) {
    const box = $('#cutoff');
    const text = $('#cutoff-text');
    const date = readForm().date;
    let key = null;
    if (closedFocused) {
      key = 'cutoff.today.closed';
    } else if (!date || date === '2026-10-13') {
      // BRL-13: tomorrow closes at 5:00 pm today; shown by default.
      key = 'cutoff.open';
    } else if (date === '2026-10-19') {
      // BRL-13: Monday's cutoff is 7:00 am on the day.
      key = 'cutoff.monday';
    }
    box.hidden = !key;
    if (key) {
      text.dataset.i18n = key;
      applyI18n(text);
    }
    box.classList.toggle('alert--warning', key === 'cutoff.today.closed');
    box.classList.toggle('alert--info', key !== 'cutoff.today.closed');
  }

  /**
   * Shows the "more than one van" note above 12 passengers (US-03 AC-3) and
   * keeps the stepper's − button usable only above 1.
   * @returns {void}
   */
  function updatePax() {
    const raw = $('#pax').value.trim();
    const n = /^\d{1,2}$/.test(raw) ? Number(raw) : 0;
    $('#pax-split').classList.toggle('is-shown', n > 12);
    $('#pax-down').disabled = n <= 1;
  }

  /**
   * Moves the passenger count by one, within 1 to 99.
   * @param {number} step +1 or −1.
   * @returns {void}
   */
  function stepPax(step) {
    const input = $('#pax');
    const raw = input.value.trim();
    let n = /^\d{1,2}$/.test(raw) ? Number(raw) : 0;
    n = Math.min(99, Math.max(1, n + step));
    input.value = String(n);
    touched.pax = true;
    setFieldError('pax', null);
    updatePax();
    renderCheckTicket();
  }

  /**
   * Renumbers the extra-stop rows (ids, names, labels, legends).
   * @returns {void}
   */
  function renumberStops() {
    $$('#stops-list .stop').forEach(function (row, index) {
      const n = index + 1;
      row.querySelector('[data-stop-n]').textContent = String(n);
      $$('[id]', row).forEach(function (el) {
        el.id = el.id.replace(/^stop\d+/, 'stop' + n);
      });
      $$('[for]', row).forEach(function (el) {
        el.htmlFor = el.htmlFor.replace(/^stop\d+/, 'stop' + n);
      });
      $$('[aria-labelledby]', row).forEach(function (el) {
        el.setAttribute('aria-labelledby', el.getAttribute('aria-labelledby').replace(/^stop\d+/, 'stop' + n));
      });
      $$('[name]', row).forEach(function (el) {
        el.name = el.name.replace(/^stop\d+/, 'stop' + n);
      });
    });
    const count = $$('#stops-list .stop').length;
    // FR-54: up to 3 extra stops.
    $('#add-stop').hidden = count >= 3;
  }

  /**
   * Adds an extra stop row and moves focus to its place picker (FR-54).
   * @returns {void}
   */
  function addStop() {
    if (!stopTemplate || $$('#stops-list .stop').length >= 3) {
      return;
    }
    const row = stopTemplate.cloneNode(true);
    $('#stops-list').appendChild(row);
    renumberStops();
    applyLanguageTo(row);
    row.querySelector('select').focus();
    renderCheckTicket();
  }

  /**
   * Applies the current language to a newly added piece of the page.
   * @param {Element} root The new element.
   * @returns {void}
   */
  function applyLanguageTo(root) {
    $$('[data-i18n]', root).forEach(applyI18n);
    $$('[data-i18n-label]', root).forEach(function (el) {
      el.label = t(el.dataset.i18nLabel);
    });
  }

  /**
   * Sets up the extra stops: keeps one no-JS row as a template and replaces
   * the no-JS disclosure with the "+ Add a stop" button.
   * @returns {void}
   */
  function initStops() {
    const first = $('#stop-rows .stop');
    if (!first) {
      return;
    }
    stopTemplate = first.cloneNode(true);
    $$('select, input[type="text"]', stopTemplate).forEach(function (el) {
      el.value = '';
    });
    const list = document.createElement('div');
    list.id = 'stops-list';
    const details = $('.nojs-stops');
    details.parentNode.insertBefore(list, details);
    details.remove();
    $('#add-stop').addEventListener('click', addStop);
    list.addEventListener('click', function (event) {
      const btn = event.target.closest('[data-remove-stop]');
      if (btn) {
        btn.closest('.stop').remove();
        renumberStops();
        $('#add-stop').focus();
        renderCheckTicket();
      }
    });
  }

  /**
   * Makes the closed "Today" date focusable (aria-disabled) so its reason
   * can be read, and stops it from being chosen (FR-07, BRL-13).
   * @returns {void}
   */
  function initClosedDate() {
    const closed = $('#date-2026-10-12');
    closed.disabled = false;
    closed.setAttribute('aria-disabled', 'true');
    closed.addEventListener('click', function (event) {
      event.preventDefault();
      updateCutoff(true);
    });
    closed.addEventListener('change', function () {
      closed.checked = false;
      if (lastDate) {
        const prev = document.getElementById(lastDate);
        if (prev) {
          prev.checked = true;
        }
      }
      updateCutoff(true);
    });
    closed.addEventListener('focus', function () {
      updateCutoff(true);
    });
    closed.addEventListener('blur', function () {
      updateCutoff(false);
    });
  }

  /**
   * Puts the form back to empty, as on first load.
   * @returns {void}
   */
  function resetForm() {
    const form = $('#request-form');
    form.reset();
    $$('#stops-list .stop').forEach(function (row) {
      row.remove();
    });
    renumberStops();
    Object.keys(FIELDS).forEach(function (field) {
      setFieldError(field, null);
    });
    Object.keys(touched).forEach(function (k) {
      delete touched[k];
    });
    lastDate = null;
    $('#error-summary').hidden = true;
    $('#arrive-details').open = false;
    $('#extra-details').open = false;
    $$('.map-note').forEach(function (n) {
      n.textContent = '';
      delete n.dataset.i18n;
    });
    $('#done-view').hidden = true;
    $('#form-view').hidden = false;
    receivedData = null;
    syncReveals();
    updateCutoff(false);
    updatePax();
    renderCheckTicket();
  }

  /**
   * Fills the form with the sample answers for PT-2026-0142.
   * @returns {void}
   */
  function fillSample() {
    resetForm();
    $('#name').value = SAMPLE.name;
    $('#phone').value = SAMPLE.phone;
    $('#purpose-' + SAMPLE.purpose).checked = true;
    $('#date-' + SAMPLE.date).checked = true;
    lastDate = 'date-' + SAMPLE.date;
    $('#from').value = SAMPLE.from;
    $('#to').value = SAMPLE.to;
    $('#time').value = SAMPLE.time;
    $('#flex-' + SAMPLE.flex).checked = true;
    $('#pax').value = SAMPLE.pax;
    $('#return-' + SAMPLE.ret).checked = true;
    $('#return-time').value = SAMPLE.retTime;
    syncReveals();
    updateCutoff(false);
    updatePax();
    renderCheckTicket();
  }

  /**
   * Handles "Send request": shows errors, or shows the received ticket (FR-04).
   * @param {Event} [event] The submit event.
   * @returns {void}
   */
  function submitForm(event) {
    if (event) {
      event.preventDefault();
    }
    const errors = validateAll();
    showSummary(errors);
    if (!errors.length) {
      showConfirmation();
    }
  }

  /**
   * Replaces the form with the received ticket and moves focus to its
   * heading (US-01 AC-5). The ticket is not issued here: its strip stays
   * unfilled, because the purple strip means Confirmed and a request that
   * has just been sent is only Submitted (FR-04, review 5.1). It is issued
   * when a coordinator confirms the trip.
   * @returns {void}
   */
  function showConfirmation() {
    receivedData = readForm();
    $('#done-ticket').innerHTML = ticketHtml(receivedData, 'done');
    $('#form-view').hidden = true;
    $('#done-view').hidden = false;
    window.scrollTo(0, 0);
    $('#done-title').focus();
  }

  /**
   * Sets up the request page.
   * @returns {void}
   */
  function initRequest() {
    const form = $('#request-form');
    initStops();
    initClosedDate();

    form.addEventListener('input', function (event) {
      if (event.target.id) {
        touched[fieldOf(event.target)] = true;
      }
      if (event.target.id === 'pax') {
        updatePax();
      }
      renderCheckTicket();
    });

    form.addEventListener('change', function (event) {
      const el = event.target;
      if (el.name === 'date' && el.getAttribute('aria-disabled') !== 'true' && el.checked) {
        lastDate = el.id;
        validateIfShown('date');
      }
      if (el.name === 'purpose' || el.name === 'return') {
        validateIfShown(el.name);
      }
      syncReveals();
      updateCutoff(false);
      renderCheckTicket();
    });

    // Validate on leaving a field, only after typing in it (brief 5.2).
    form.addEventListener('focusout', function (event) {
      const field = fieldOf(event.target);
      if (field && touched[field] && FIELD_ORDER.indexOf(field) !== -1) {
        validateOne(field);
      }
    });

    form.addEventListener('submit', submitForm);
    $('#pax-down').addEventListener('click', function () {
      stepPax(-1);
    });
    $('#pax-up').addEventListener('click', function () {
      stepPax(1);
    });

    $$('[data-map-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        // The map service is not chosen yet (Q-17): show a short note.
        const note = document.getElementById(btn.getAttribute('aria-describedby'));
        note.dataset.i18n = 'driver.navnote';
        applyI18n(note);
      });
    });

    $('#error-summary').addEventListener('click', function (event) {
      const link = event.target.closest('a[data-target]');
      if (link) {
        event.preventDefault();
        const target = document.getElementById(link.dataset.target);
        if (target) {
          target.focus();
          target.scrollIntoView({ block: 'center' });
        }
      }
    });

    $('#another').addEventListener('click', function (event) {
      event.preventDefault();
      resetForm();
      window.scrollTo(0, 0);
      $('#form-view h1').setAttribute('tabindex', '-1');
      $('#form-view h1').focus();
    });

    $$('[data-proto]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const action = btn.dataset.proto;
        if (action === 'fill') {
          fillSample();
        } else if (action === 'errors') {
          resetForm();
          submitForm();
        } else if (action === 'confirm') {
          fillSample();
          submitForm();
        } else {
          resetForm();
          window.scrollTo(0, 0);
        }
      });
    });

    languageHooks.push(function () {
      renderCheckTicket();
      if (receivedData && !$('#done-view').hidden) {
        $('#done-ticket').innerHTML = ticketHtml(receivedData, 'done');
      }
    });

    syncReveals();
    updateCutoff(false);
    updatePax();
    renderCheckTicket();
  }

  /**
   * Maps a control to the field name used by validation.
   * @param {Element} el A form control.
   * @returns {string} The field name, or an empty string.
   */
  function fieldOf(el) {
    const map = { name: 'name', phone: 'phone', 'date-other-input': 'date', from: 'from', 'from-address': 'from',
      to: 'to', 'to-address': 'to', time: 'time', pax: 'pax', 'return-time': 'returnTime' };
    return map[el.id] || '';
  }

  /**
   * Re-checks a choice group if it is already showing an error, so the
   * message goes away as soon as it is fixed.
   * @param {string} field 'purpose', 'date' or 'return'.
   * @returns {void}
   */
  function validateIfShown(field) {
    if (shownErrors[field] || (field === 'date' && shownErrors.dateOther)) {
      validateOne(field);
    }
  }

  // === Section: 6. The ticket renderer ===

  /** Purpose values to string keys. */
  const PURPOSE_KEYS = { 'class': 'purpose.class', sport: 'purpose.sport', errand: 'purpose.errand', event: 'purpose.event', other: 'purpose.other' };

  /**
   * Builds one slot: a label over a value; empty slots keep their place and
   * show a dash (principle 1).
   * @param {string} labelKey String key of the slot label.
   * @param {string[]} lines Value lines as safe HTML; the first is the main value.
   * @param {string} [extra] Extra class names.
   * @returns {string} The slot's HTML.
   */
  function slotHtml(labelKey, lines, extra) {
    const empty = !lines.length || !lines[0];
    const value = empty ? '–' : lines.map(keepTimesTogether).map(function (line, i) {
      return i === 0 ? '<span class="slot__line">' + line + '</span>' : '<span class="slot__sub">' + line + '</span>';
    }).join('');
    return '<div class="slot' + (empty ? ' is-empty' : '') + (extra ? ' ' + extra : '') + '">' +
      '<dt class="slot__label">' + esc(t(labelKey)) + '</dt>' +
      '<dd class="slot__value">' + value + '</dd></div>';
  }

  /**
   * Wraps data entered by people (place names) so it keeps its English voice
   * and size on Sinhala pages.
   * @param {string} text Data text.
   * @returns {string} Safe HTML.
   */
  function dataHtml(text) {
    return '<span class="data" lang="en">' + esc(text) + '</span>';
  }

  /**
   * Turns a place answer into display HTML.
   * @param {string} value The select value.
   * @param {string} address The typed address, when "Another address" is chosen.
   * @returns {string} Safe HTML, or an empty string.
   */
  function placeHtml(value, address) {
    if (!value) {
      return '';
    }
    if (value === 'other') {
      return address ? dataHtml(address) : esc(t('place.other'));
    }
    return dataHtml(value);
  }

  /**
   * Builds the ticket for the request page: the live "Check your request"
   * ticket, or the received (not yet issued) confirmation with its
   * reference and its "Not confirmed yet" stamp.
   * @param {Object} d Answers from readForm().
   * @param {string} mode 'check' or 'done'.
   * @returns {string} The ticket's inner HTML.
   */
  function ticketHtml(d, mode) {
    const date = d.date === 'other' ? (parseTypedDate(d.dateOther) ? formatWeekdayDate(parseTypedDate(d.dateOther)) : esc(d.dateOther)) :
      (parseIso(d.date) ? esc(formatWeekdayDate(parseIso(d.date))) : '');
    const flexKey = { '0': 'flex.exact', '10': 'flex.10', '20': 'flex.20', '30': 'flex.30' }[d.flex];
    // The time is the most-checked fact, so it is the slot's main value; the
    // flexibility and the place sit under it, each on its own line.
    const pickup = d.time ? [esc(formatHHMM(d.time)), flexKey ? '(' + esc(t(flexKey)) + ')' : '', placeHtml(d.from, d.fromAddress)].filter(Boolean) :
      (d.from ? ['', placeHtml(d.from, d.fromAddress)] : []);
    const going = [placeHtml(d.to, d.toAddress)].concat(d.stops.map(function (s) {
      return esc(t('stop.label')) + ': ' + dataHtml(s.place);
    }));
    const pax = /^\d{1,2}$/.test(d.pax) && Number(d.pax) > 0 ? [esc(d.pax)] : [];
    const purpose = d.purpose ? [esc(t(PURPOSE_KEYS[d.purpose]))] : [];
    let ret = [];
    if (d.ret === 'no') {
      ret = [esc(t('no'))];
    } else if (d.ret === 'yes') {
      ret = d.retTime ? [esc(formatHHMM(d.retTime)), placeHtml(d.to, d.toAddress)].filter(Boolean) : [esc(t('yes'))];
    }

    let head;
    if (mode === 'done') {
      // Principle 2: the reference is the ticket's name; the serial (0142)
      // is the part people say aloud, so it is the largest.
      // Review 5.1: the request is Submitted, so the heading is plain text and
      // the stamp is the neutral Submitted stamp (tray icon, no tick, no
      // Confirmed colour) saying "Not confirmed yet" (US-01 AC-5, FR-04).
      head = '<div class="ticket__stamp-row ticket__stamp-row--received">' +
        '<h1 class="ticket__h1" id="done-title" tabindex="-1">' + esc(t('done.title')) + '</h1>' +
        '<p class="ticket__status"><span class="stamp stamp--large stamp--submitted">' +
        '<svg class="icon" aria-hidden="true"><use href="#i-submitted"/></svg>' +
        esc(t('done.status')) + '</span></p></div>' +
        '<div class="ticket__strip"><p class="ticket__ref-line"><span class="ticket__strip-label">' + esc(t('done.ref')) + '</span>' +
        '<span class="ref"><span class="ref__prefix">PT-2026-</span>0142</span></p></div>' +
        '<h2 class="ticket__trip-title">' + esc(t('section.trip')) + '</h2>';
    } else {
      head = '<div class="ticket__strip"><h2 class="ticket__title" id="ticket-title">' + esc(t('summary.title')) + '</h2></div>';
    }
    return head +
      '<dl class="slots slots--flex">' +
      slotHtml('label.date', date ? [date] : []) +
      slotHtml('label.pickup', pickup) +
      slotHtml('label.goingto', going[0] || going.length > 1 ? going : []) +
      slotHtml('label.passengers', pax) +
      slotHtml('label.purpose', purpose, 'slot--wide') +
      '</dl>' +
      '<div class="perf" aria-hidden="true"><span class="perf__notch perf__notch--start"></span><span class="perf__notch perf__notch--end"></span></div>' +
      '<dl class="slots">' + slotHtml('label.return', ret, 'slot--wide') + '</dl>';
  }

  /**
   * Redraws the live ticket from the current answers.
   * @returns {void}
   */
  function renderCheckTicket() {
    const ticket = $('#ticket');
    if (ticket) {
      ticket.innerHTML = ticketHtml(readForm(), 'check');
    }
  }

  // === Section: 7. Dashboard ===

  /**
   * The bookings on the trip day (brief 4.5 and 4.7), for the detail panel.
   * Status changes here drive the panel, timeline, list and counts.
   * @type {Object<string, Object>}
   */
  const BOOKINGS = {
    'PT-2026-0131': { status: 'confirmed', van: 'Van 1', flags: ['early'], pickup: ['7:30 am', 'Branch A (main branch)'], to: ['Branch C', 'arrives 7:55 am'],
      pax: 2, purpose: 'Staff errand', requester: ['Dilini Fernando', '077 000 0131'], ret: null,
      audit: 'Confirmed individually on 12/10/2026.' },
    'PT-2026-0119': { status: 'proposed', van: 'Van 1', flags: ['fixed'], pickup: ['9:05 am', 'Branch A (main branch)'], to: ['Aquatic Centre', 'arrives 9:30 am'],
      pax: 11, purpose: 'Sport: Grade 7 Swimming', requester: ['Ruwan Silva', '077 000 0119', 'series contact'],
      ret: ['11:30 am from Aquatic Centre', 'back at Branch A 11:55 am; van need not stay'],
      notes: ['Fixed trip series: Grade 7 Swimming – every Tuesday this term.'] },
    'PT-2026-0145': { status: 'proposed', van: 'Van 1', flags: ['gap'], pickup: ['10:00 am', 'Branch B'], to: ['Stationery supplier', 'then back to Branch B, 10:50 am'],
      pax: 1, purpose: 'Staff errand', requester: ['Shamila Rodrigo', '077 000 0145'], ret: ['Round trip with a wait', 'back at Branch B 10:50 am'],
      explain: ['Van 1: gap job while Grade 7 Swimming is at the Aquatic Centre.', 'Leaves the Aquatic Centre at 9:35 am and is back at 11:10 am,',
        '20 minutes before the 11:30 am return pickup (the safety buffer is 15 minutes).', 'No second van needed.'] },
    'PT-2026-0140': { status: 'proposed', van: 'Van 2', flags: ['shared'], pickup: ['8:25 am', 'Branch A (main branch)'], to: ['Branch C', 'arrives 8:55 am'],
      pax: 3, purpose: 'Meeting or event', requester: ['Nimal Perera', '077 000 0140'], ret: null,
      notes: ['Shared run with PT-2026-0142.'] },
    'PT-2026-0142': { status: 'proposed', van: 'Van 2', flags: ['shared'], pickup: ['8:40 am', 'Branch B · asked for 8:45 am ± 10 min'], to: ['Sports Centre', 'arrives 9:10 am'],
      pax: 4, purpose: 'Sport', requester: ['Kasun Jayasinghe', '077 000 0142'], ret: ['10:45 am from Sports Centre', 'back at Branch B 11:05 am'],
      explain: ['Van 2: added to the 8:25 am run from Branch A, shared with PT-2026-0140.', 'Pickup at Branch B at 8:40 am, within the requested 8:45 am ± 10 min.',
        '7 of 8 seats used at the busiest point.', 'The 3 passengers from Branch A ride 6 minutes longer, within their limit.',
        'Saves a separate 35-minute van run.', 'Van 1 not used: it must leave Branch A at 9:05 am for Grade 7 Swimming.'],
      run: { caption: 'Van 2 run, seats on board after each stop', seats: 8, rows: [['8:25 am', 'Branch A', 'Pick up 3', 3], ['8:40 am', 'Branch B', 'Pick up 4', 7],
        ['8:55 am', 'Branch C', 'Drop off 3', 4], ['9:10 am', 'Sports Centre', 'Drop off 4', 0]] } },
    'PT-2026-0147': { status: 'attention', van: 'Van 2 (route found)', flags: ['newreq'], pickup: ['11:20 am', 'Branch C'], to: ['Pin: "Opposite the temple, 2nd lane"', 'arrives 11:40 am'],
      pax: 3, purpose: 'Staff errand', requester: ['Sanduni Herath', '077 000 0147'], ret: null,
      explain: ['New requester: this phone number has not been used before. Check before approving.', 'Route found: Van 2, pickup at Branch C at 11:20 am.',
        'The drop-off was placed with a map pin and the note "Opposite the temple, 2nd lane".'] },
    'PT-2026-0149': { status: 'attention', van: 'Not placed', flags: [], pickup: ['1:00 pm', 'Branch A (main branch)'], to: ['Sports Centre', ''],
      pax: 20, purpose: 'Sport: Grade 9 inter-house practice', requester: ['Mahesh Kumara', '077 000 0149'], ret: ['3:00 pm from Sports Centre', ''], noApprove: true,
      explain: ['No single van fits: the group of 20 is larger than the largest van (12 seats).',
        'At 1:00 pm, Van 1 cannot help: it must be back at Branch A for 1:30 pm (PT-2026-0150).', 'Van 2 alone has 8 seats.'],
      alternatives: ['Split across Van 1 (12) and Van 2 (8), both leaving Branch A at 12:15 pm (45 minutes earlier).', 'Extra hire van needed for 1:00 pm.'] },
    'PT-2026-0150': { status: 'proposed', van: 'Van 1', flags: [], pickup: ['1:30 pm', 'Branch A (main branch)'], to: ['Branch B', 'arrives 1:45 pm'],
      pax: 6, purpose: 'Meeting or event', requester: ['Priyanka Wijesekara', '077 000 0150'], ret: ['3:30 pm from Branch B', 'back at Branch A 3:45 pm'] },
    'PT-2026-0153': { status: 'proposed', van: 'Van 2', flags: ['late'], pickup: ['2:15 pm', 'Branch C'], to: ['Branch A (main branch)', 'arrives 2:40 pm'],
      pax: 2, purpose: 'Staff errand', requester: ['Tharindu Bandara', '077 000 0153', 'by phone'], ret: null,
      notes: ['Late exception added by Ravi Gunasekara at 6:55 am today. Source: Phone.', 'Reason: "Exam papers must reach the main office."'],
      audit: 'Added by Ravi Gunasekara at 6:55 am on 13/10/2026 (late exception).' },
    'PT-2026-0151': { status: 'proposed', van: 'Van 2', flags: ['outhours'], pickup: ['5:45 pm', 'Branch B'], to: ['Branch A (main branch)', 'arrives 6:05 pm, after 6:00 pm'],
      pax: 7, purpose: 'Class trip: drama rehearsal', requester: ['Chathurika de Alwis', '077 000 0151'], ret: null }
  };

  /** Status words and icons (stamps), and flag words and icons. */
  const STATUS_LOOK = {
    proposed: { word: 'Proposed', icon: 'i-hourglass', cls: 'stamp--proposed' },
    confirmed: { word: 'Confirmed', icon: 'i-check', cls: 'stamp--confirmed' },
    attention: { word: 'Needs attention', icon: 'i-warning', cls: 'stamp--attention' }
  };
  const FLAG_LOOK = {
    early: ['Early trip', 'i-early'], fixed: ['Fixed trip', 'i-repeat'], gap: ['Gap job', 'i-gap'], shared: ['Shared', 'i-shared'],
    newreq: ['New requester', 'i-newreq'], late: ['Late (exception)', 'i-late'], outhours: ['Out of hours', 'i-outhours']
  };

  /** The statuses at 7:05 am, for Reset. */
  const INITIAL_STATUS = {};
  Object.keys(BOOKINGS).forEach(function (ref) {
    INITIAL_STATUS[ref] = BOOKINGS[ref].status;
  });

  /** The booking open in the panel. */
  let openRef = 'PT-2026-0142';
  /** Timer that hides the Undo after 10 seconds. */
  let undoTimer = null;
  /** Whether today's plan has been approved. */
  let planApproved = false;

  /**
   * Builds a status stamp.
   * @param {string} status 'proposed', 'confirmed' or 'attention'.
   * @returns {string} Safe HTML.
   */
  function stampHtml(status) {
    const look = STATUS_LOOK[status];
    return '<span class="stamp ' + look.cls + '"><svg class="icon" aria-hidden="true"><use href="#' + look.icon + '"/></svg>' + look.word + '</span>';
  }

  /**
   * Builds a flag.
   * @param {string} flag A key of FLAG_LOOK.
   * @returns {string} Safe HTML.
   */
  function flagHtml(flag) {
    const look = FLAG_LOOK[flag];
    return '<span class="flag"><svg class="icon" aria-hidden="true"><use href="#' + look[1] + '"/></svg>' + look[0] + '</span>';
  }

  /**
   * Builds the seat meter: filled cells plus the words "7 of 8".
   * @param {number} taken Seats in use.
   * @param {number} seats Seats in the van.
   * @returns {string} Safe HTML.
   */
  function seatsHtml(taken, seats) {
    let cells = '';
    for (let i = 0; i < seats; i += 1) {
      cells += '<span class="seats__cell' + (i < taken ? ' is-taken' : '') + '"></span>';
    }
    return '<span class="seats"><span class="seats__cells" aria-hidden="true">' + cells + '</span>' + taken + ' of ' + seats + '</span>';
  }

  /**
   * Builds the full ticket for one booking in the detail panel: reference,
   * stamp and flags, the six fixed slots, the return below the perforation,
   * and the explanation printed on the stub (FR-19, US-16).
   * @param {string} ref For example 'PT-2026-0142'.
   * @returns {string} Safe HTML.
   */
  function panelTicketHtml(ref) {
    const b = BOOKINGS[ref];
    /**
     * Builds one slot of the panel ticket.
     * @param {string} label The slot label (English: the dashboard is English only).
     * @param {string} main The main value, as safe HTML.
     * @param {string} [sub] A smaller second line, as safe HTML.
     * @param {string} [extra] Extra class names.
     * @returns {string} Safe HTML.
     */
    const slot = function (label, main, sub, extra) {
      return '<div class="slot' + (extra ? ' ' + extra : '') + '"><dt class="slot__label">' + label + '</dt><dd class="slot__value">' + main +
        (sub ? '<span class="slot__sub">' + sub + '</span>' : '') + '</dd></div>';
    };
    const tel = '+94' + b.requester[1].replace(/\s/g, '').slice(1);
    let html = '<div class="ticket__strip"><h2 class="panel__heading" id="panel-ref"><span class="ticket__strip-label">Request</span>' +
      '<span class="ref"><span class="ref__prefix">' + ref.slice(0, 8) + '</span>' + ref.slice(8) + '</span></h2>' +
      '<span class="panel__van">' + esc(b.van) + '</span></div>' +
      '<div class="ticket__stamp-row">' + stampHtml(b.status) + b.flags.map(flagHtml).join('') + '</div>' +
      '<dl class="slots slots--flex">' +
      slot('Date', 'Tuesday 13/10/2026') +
      slot('Pick up', esc(b.pickup[0]), esc(b.pickup[1])) +
      slot('Going to', esc(b.to[0]), esc(b.to[1])) +
      slot('Passengers', String(b.pax)) +
      slot('Trip for', esc(b.purpose)) +
      slot('Requester', esc(b.requester[0]), '<a href="tel:' + tel + '">' + esc(b.requester[1]) + '</a>' + (b.requester[2] ? ', ' + esc(b.requester[2]) : '')) +
      '</dl>' +
      '<div class="perf" aria-hidden="true"><span class="perf__notch perf__notch--start"></span><span class="perf__notch perf__notch--end"></span></div>' +
      '<dl class="slots">' + slot('Return', b.ret ? esc(b.ret[0]) : 'No', b.ret ? esc(b.ret[1]) : '', 'slot--wide') + '</dl>';

    const lines = (b.explain || []).concat(b.notes || []);
    if (lines.length || b.run) {
      html += '<div class="ticket__stub"><h3 class="label-caps ticket__stub-title">' + (b.explain ? 'Why this plan' : 'Notes') + '</h3><div class="explain">' +
        lines.map(function (line) {
          return '<p>' + esc(line) + '</p>';
        }).join('');
      if (b.alternatives) {
        html += '<p>Alternatives:</p><ol>' + b.alternatives.map(function (a) {
          return '<li>' + esc(a) + '</li>';
        }).join('') + '</ol>';
      }
      html += '</div>';
      if (b.run) {
        html += '<table class="table run"><caption>' + esc(b.run.caption) + '</caption><thead><tr><th scope="col">Time</th><th scope="col">Stop</th>' +
          '<th scope="col">Action</th><th scope="col">On board</th></tr></thead><tbody>' +
          b.run.rows.map(function (r) {
            const busiest = r[3] === Math.max.apply(null, b.run.rows.map(function (x) {
              return x[3];
            }));
            return '<tr' + (busiest ? ' class="is-busiest"' : '') + '><td>' + r[0] + '</td><th scope="row">' + esc(r[1]) + '</th><td>' + r[2] + '</td><td>' +
              seatsHtml(r[3], b.run.seats) + '</td></tr>';
          }).join('') + '</tbody></table>';
      }
      html += '</div>';
    }
    const audit = b.audit || (b.status === 'confirmed' && INITIAL_STATUS[ref] !== 'confirmed' ? 'Approved by Anoma Jayawardena at 7:06 am on 13/10/2026.' :
      'Planned by the system at 5:00 pm on 12/10/2026 (Optimise day).');
    html += '<p class="ticket__foot">' + esc(audit) + '</p>';
    return html;
  }

  /**
   * Builds the action buttons for the open booking. Decline is set apart
   * from Approve so it is not hit by mistake.
   * @param {string} ref The booking reference.
   * @returns {string} Safe HTML.
   */
  function panelActionsHtml(ref) {
    const b = BOOKINGS[ref];
    let left = '';
    if (b.status !== 'confirmed' && !b.noApprove) {
      left += '<button class="btn btn--primary btn--small" type="button" data-action="approve"><svg class="icon icon--20" aria-hidden="true"><use href="#i-check"/></svg>Approve</button>';
    }
    left += '<button class="btn btn--secondary btn--small" type="button" data-action="change">Change</button>';
    return '<div class="btn-row">' + left + '</div>' +
      '<button class="btn btn--danger btn--small" type="button" data-action="decline"><svg class="icon icon--20" aria-hidden="true"><use href="#i-cross"/></svg>Decline</button>';
  }

  /**
   * Opens a booking in the detail panel and marks it on the timeline and list.
   * @param {string} ref The booking reference.
   * @param {boolean} [keepStatus] True to keep the confirmation message.
   * @returns {void}
   */
  function openBooking(ref, keepStatus) {
    openRef = ref;
    const ticket = $('#panel-ticket');
    ticket.classList.toggle('is-issued', BOOKINGS[ref].status === 'confirmed');
    ticket.innerHTML = panelTicketHtml(ref);
    $('#panel-actions').innerHTML = panelActionsHtml(ref);
    if (!keepStatus) {
      clearPanelStatus();
    }
    $$('.tl__tag[data-ref]').forEach(function (tag) {
      if (tag.dataset.ref === ref && !tag.querySelector('.tl__leg')) {
        tag.setAttribute('aria-current', 'true');
      } else {
        tag.removeAttribute('aria-current');
      }
    });
    $$('tr[data-row-ref]').forEach(function (row) {
      if (row.dataset.rowRef === ref) {
        row.setAttribute('aria-current', 'true');
      } else {
        row.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Paints one booking's status on its timeline tickets and list row.
   * @param {string} ref The booking reference.
   * @returns {void}
   */
  function paintBooking(ref) {
    const status = BOOKINGS[ref].status;
    const look = STATUS_LOOK[status];
    $$('.tl__tag[data-ref="' + ref + '"]').forEach(function (tag) {
      tag.classList.remove('tl__tag--proposed', 'tl__tag--confirmed', 'tl__tag--attention');
      tag.classList.add('tl__tag--' + status);
      // Confirmed = issued: the purple strip turns on (principle 2).
      tag.classList.toggle('is-issued', status === 'confirmed');
      tag.querySelector('.tl__tag-l1 use').setAttribute('href', '#' + look.icon);
      tag.querySelector('[data-status-word]').textContent = look.word;
    });
    const cell = $('tr[data-row-ref="' + ref + '"] [data-status-cell]');
    if (cell) {
      cell.innerHTML = stampHtml(status);
    }
  }

  /**
   * Recounts "Awaiting approval" from the bookings (US-22).
   * @returns {void}
   */
  function updateCounts() {
    const waiting = Object.keys(BOOKINGS).filter(function (ref) {
      return BOOKINGS[ref].status === 'proposed';
    });
    $('[data-count="proposed"]').textContent = String(waiting.length);
    $('[data-count-refs="proposed"]').textContent = waiting.length ?
      waiting.map(function (ref, i) {
        return i === 0 ? ref : ref.slice(8);
      }).join(', ') : 'None waiting';
  }

  /**
   * Hides the panel's confirmation message and its Undo.
   * @returns {void}
   */
  function clearPanelStatus() {
    window.clearTimeout(undoTimer);
    const status = $('#panel-status');
    status.hidden = true;
    status.innerHTML = '';
  }

  /**
   * Approves one proposal: Confirmed in the panel, on the timeline and in the
   * counts, with a message and an Undo for 10 seconds.
   * @param {string} ref The booking reference.
   * @returns {void}
   */
  function approveBooking(ref) {
    const b = BOOKINGS[ref];
    const before = b.status;
    b.status = 'confirmed';
    paintBooking(ref);
    updateCounts();
    openBooking(ref, true);
    const status = $('#panel-status');
    status.hidden = false;
    status.setAttribute('tabindex', '-1');
    status.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg><p class="alert__body">' + esc(ref) + ' confirmed. ' +
      esc(b.requester[0]) + ' will get a text.</p><button class="btn btn--quiet btn--small" type="button" data-undo><svg class="icon icon--20" aria-hidden="true"><use href="#i-undo"/></svg>Undo</button>';
    status.focus();
    window.clearTimeout(undoTimer);
    undoTimer = window.setTimeout(function () {
      const undo = status.querySelector('[data-undo]');
      if (undo) {
        undo.remove();
      }
    }, 10000);
    status.querySelector('[data-undo]').addEventListener('click', function () {
      b.status = before;
      paintBooking(ref);
      updateCounts();
      openBooking(ref);
      const approve = $('#panel-actions [data-action="approve"]');
      if (approve) {
        approve.focus();
      }
    });
  }

  /**
   * Approves today's plan after the confirmation step (BRL-21, FR-34, FR-61):
   * every proposal is confirmed and the plan's ticket is issued.
   * @returns {void}
   */
  function approvePlan() {
    Object.keys(BOOKINGS).forEach(function (ref) {
      if (BOOKINGS[ref].status === 'proposed') {
        BOOKINGS[ref].status = 'confirmed';
        paintBooking(ref);
      }
    });
    planApproved = true;
    updateCounts();
    openBooking(openRef);
    $('#plan').classList.add('is-issued');
    $('[data-plan-state]').textContent = 'approved';
    $('#plan-foot').hidden = true;
    const done = $('#plan-done');
    done.className = 'plan__done alert alert--success';
    done.setAttribute('tabindex', '-1');
    done.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg><p class="alert__body">Plan approved at 7:06 am. ' +
      'Final details are going to 8 requesters and route links to 2 drivers.</p>';
    $('#updated').lastChild.textContent = 'Updated 7:06 am';
    done.focus();
  }

  /**
   * Opens the approve-plan confirmation dialog.
   * @returns {void}
   */
  function openPlanDialog() {
    const dialog = $('#plan-dialog');
    if (planApproved || dialog.open) {
      return;
    }
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      $('#plan-confirm').focus();
    } else if (window.confirm($('#plan-dialog-title').textContent + ' ' + $('#plan-dialog-text').textContent)) {
      approvePlan();
    }
  }

  /**
   * Switches between the timeline and the list view (FR-29).
   * @param {boolean} [toList] Force a view; toggles when left out.
   * @returns {void}
   */
  function setListView(toList) {
    const day = $('.day');
    const btn = $('#toggle-view');
    const list = typeof toList === 'boolean' ? toList : !day.classList.contains('is-list');
    day.classList.toggle('is-list', list);
    btn.setAttribute('aria-pressed', list ? 'true' : 'false');
    btn.querySelector('span').textContent = list ? 'Show as timeline' : 'Show as list';
  }

  /**
   * Puts the dashboard back to 7:05 am.
   * @returns {void}
   */
  function resetDashboard() {
    Object.keys(INITIAL_STATUS).forEach(function (ref) {
      BOOKINGS[ref].status = INITIAL_STATUS[ref];
      paintBooking(ref);
    });
    planApproved = false;
    updateCounts();
    $('#plan').classList.remove('is-issued');
    $('[data-plan-state]').textContent = 'ready to approve';
    $('#plan-foot').hidden = false;
    const done = $('#plan-done');
    done.className = 'plan__done';
    done.innerHTML = '';
    $('#updated').lastChild.textContent = 'Updated 7:05 am';
    setListView(false);
    openBooking('PT-2026-0142');
  }

  /**
   * Sets up the dashboard.
   * @returns {void}
   */
  function initDashboard() {
    const live = document.createElement('p');
    live.className = 'vh';
    live.setAttribute('role', 'status');
    document.body.appendChild(live);

    document.addEventListener('click', function (event) {
      const opener = event.target.closest('.tl__tag[data-ref], .link-btn[data-ref]');
      if (opener) {
        openBooking(opener.dataset.ref);
        live.textContent = opener.dataset.ref + ' is open in the detail panel.';
        return;
      }
      const action = event.target.closest('#panel-actions [data-action]');
      if (action && action.dataset.action === 'approve') {
        approveBooking(openRef);
      }
      const tile = event.target.closest('.tile');
      if (tile) {
        event.preventDefault();
        setListView(true);
        $('#list-view').focus();
      }
    });

    $('#toggle-view').addEventListener('click', function () {
      setListView();
    });
    $('#approve-plan').addEventListener('click', openPlanDialog);

    const dialog = $('#plan-dialog');
    $('#plan-confirm').addEventListener('click', function () {
      dialog.close('approve');
    });
    $('#plan-cancel').addEventListener('click', function () {
      dialog.close('cancel');
    });
    // Escape closes the dialog natively; focus goes back where it came from.
    dialog.addEventListener('close', function () {
      if (dialog.returnValue === 'approve') {
        approvePlan();
      } else {
        $('#approve-plan').focus();
      }
      dialog.returnValue = '';
    });

    $$('[data-proto]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const what = btn.dataset.proto;
        if (what === 'approve-plan') {
          openPlanDialog();
        } else if (what === 'open-0149') {
          openBooking('PT-2026-0149');
          $('#panel').focus();
        } else if (what === 'list') {
          setListView(true);
          $('#list-view').focus();
        } else {
          resetDashboard();
        }
      });
    });

    openBooking('PT-2026-0142');
  }

  // === Section: 8. Driver's route ===

  /** The driver page's "now" in minutes after midnight: 9:40 am, then 9:41 am after an action. */
  let driverNow = 9 * 60 + 40;
  /** Undo timers per stop number. */
  const stubTimers = {};

  /**
   * Lists the stops still to come, in route order.
   * @returns {HTMLElement[]} The stub elements not yet done or no-show.
   */
  function stopsAhead() {
    return $$('#stops-ahead .stub').filter(function (stub) {
      return !stub.classList.contains('is-done') && !stub.classList.contains('is-noshow');
    });
  }

  /**
   * Prints a stub's time: figures in the stencil, the am/pm word apart, in
   * the order each language uses.
   * @param {HTMLElement} stub A stub with data-time.
   * @returns {void}
   */
  function paintStubTime(stub) {
    const p = parseHHMM(stub.dataset.time);
    const parts = timeParts(p.h, p.m);
    stub.querySelector('.stub__clock').textContent = parts.clock;
    stub.querySelector('[data-mer-pre]').textContent = parts.before;
    stub.querySelector('[data-mer-post]').textContent = parts.after;
  }

  /**
   * Makes the first stop still to come the "Next stop" and shows "in N min".
   * @returns {void}
   */
  function updateNextStop() {
    const ahead = stopsAhead();
    $$('#stops-ahead .stub').forEach(function (stub) {
      stub.classList.remove('stub--next');
    });
    const next = ahead[0];
    if (next) {
      next.classList.add('stub--next');
      const minutes = parseHHMM(next.dataset.time).total - driverNow;
      const inEl = next.querySelector('[data-in]');
      if (minutes > 0) {
        inEl.dataset.i18n = 'driver.in';
        inEl.dataset.i18nMin = String(minutes);
        applyI18n(inEl);
      } else {
        inEl.textContent = '';
        delete inEl.dataset.i18n;
      }
    }
    updateProgress(next);
  }

  /**
   * Punches the progress holes and writes "N of 14 stops done".
   * @param {?HTMLElement} next The next stop's stub.
   * @returns {void}
   */
  function updateProgress(next) {
    const all = $$('.stub[data-stop]');
    const holes = $$('#holes .holes__hole');
    let done = 0;
    all.forEach(function (stub) {
      const n = Number(stub.dataset.stop);
      const hole = holes[n - 1];
      const isDone = stub.classList.contains('is-done');
      const isNoShow = stub.classList.contains('is-noshow');
      if (isDone || isNoShow) {
        done += 1;
      }
      hole.className = 'holes__hole' + (isDone ? ' is-punched' : '') + (isNoShow ? ' is-noshow' : '') + (stub === next ? ' is-next' : '');
    });
    const text = $('#progress-text');
    text.dataset.i18nDone = String(done);
    applyI18n(text);
  }

  /**
   * Finishes a stop as Done or No-show: punches the hole, writes the time,
   * folds the stub and offers Undo for 10 seconds (US-60).
   * @param {HTMLElement} stub The stop's stub.
   * @param {string} kind 'done' or 'noshow'.
   * @returns {void}
   */
  function finishStop(stub, kind) {
    driverNow = 9 * 60 + 41;
    closeNoShowConfirm(stub, false);
    stub.classList.add(kind === 'done' ? 'is-done' : 'is-noshow');
    const result = stub.querySelector('[data-result]');
    const text = result.querySelector('[data-result-text]');
    text.dataset.i18n = kind === 'done' ? 'driver.doneat' : 'driver.noshowat';
    text.dataset.i18nTime = '09:41';
    applyI18n(text);
    const undo = result.querySelector('[data-undo]');
    undo.hidden = false;
    result.setAttribute('tabindex', '-1');
    result.focus();
    const n = stub.dataset.stop;
    window.clearTimeout(stubTimers[n]);
    stubTimers[n] = window.setTimeout(function () {
      undo.hidden = true;
    }, 10000);
    updateNextStop();
    $('#route-live').textContent = text.textContent;
  }

  /**
   * Undoes Done or No-show on a stop and puts focus back on its Done button.
   * @param {HTMLElement} stub The stop's stub.
   * @returns {void}
   */
  function undoStop(stub) {
    stub.classList.remove('is-done', 'is-noshow');
    window.clearTimeout(stubTimers[stub.dataset.stop]);
    updateNextStop();
    stub.querySelector('[data-done]').focus();
  }

  /**
   * Asks before marking a no-show, inside the stub (brief 5.4).
   * @param {HTMLElement} stub The stop's stub.
   * @returns {void}
   */
  function askNoShow(stub) {
    const actions = stub.querySelector('.stub__actions');
    actions.hidden = true;
    const box = document.createElement('div');
    box.className = 'stub__confirm';
    box.innerHTML = '<p tabindex="-1" data-i18n="driver.noshow.confirm"></p><div class="stub__actions">' +
      '<button class="btn btn--danger-solid btn--block" type="button" data-noshow-yes><span data-i18n="driver.noshow.yes"></span></button>' +
      '<button class="btn btn--secondary btn--block" type="button" data-noshow-back><span data-i18n="driver.goback"></span></button></div>';
    actions.parentNode.insertBefore(box, actions.nextSibling);
    applyLanguageTo(box);
    box.querySelector('p').focus();
  }

  /**
   * Removes the no-show question and shows the stop's actions again.
   * @param {HTMLElement} stub The stop's stub.
   * @param {boolean} refocus True to put focus back on No-show.
   * @returns {void}
   */
  function closeNoShowConfirm(stub, refocus) {
    const box = stub.querySelector('.stub__confirm');
    if (box) {
      box.remove();
    }
    stub.querySelector('.stub__actions').hidden = false;
    if (refocus) {
      stub.querySelector('[data-noshow]').focus();
    }
  }

  /**
   * Puts the route back to 9:40 am.
   * @returns {void}
   */
  function resetDriver() {
    driverNow = 9 * 60 + 40;
    $$('#stops-ahead .stub').forEach(function (stub) {
      stub.classList.remove('is-done', 'is-noshow');
      closeNoShowConfirm(stub, false);
      window.clearTimeout(stubTimers[stub.dataset.stop]);
    });
    $$('.stub__note-out').forEach(function (note) {
      note.textContent = '';
      delete note.dataset.i18n;
    });
    $('#offline').hidden = true;
    $('#done-stops').open = false;
    updateNextStop();
    window.scrollTo(0, 0);
  }

  /**
   * Sets up the driver's route.
   * @returns {void}
   */
  function initDriver() {
    $('#stops-ahead').addEventListener('click', function (event) {
      const stub = event.target.closest('.stub');
      if (!stub) {
        return;
      }
      if (event.target.closest('[data-done]')) {
        finishStop(stub, 'done');
      } else if (event.target.closest('[data-noshow]')) {
        askNoShow(stub);
      } else if (event.target.closest('[data-noshow-yes]')) {
        finishStop(stub, 'noshow');
      } else if (event.target.closest('[data-noshow-back]')) {
        closeNoShowConfirm(stub, true);
      } else if (event.target.closest('[data-undo]')) {
        undoStop(stub);
      } else if (event.target.closest('[data-nav]')) {
        // Q-17: the map service is not chosen, so Navigate shows a note.
        const note = stub.querySelector('.stub__note-out');
        note.dataset.i18n = 'driver.navnote';
        applyI18n(note);
      }
    });

    $$('[data-proto]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const what = btn.dataset.proto;
        if (what === 'offline') {
          // NFR-18: the route stays on screen while offline.
          const banner = $('#offline');
          banner.hidden = !banner.hidden;
        } else if (what === 'done-next') {
          const next = stopsAhead()[0];
          if (next) {
            finishStop(next, 'done');
          }
        } else {
          resetDriver();
        }
      });
    });

    languageHooks.push(function () {
      $$('.stub[data-time]').forEach(paintStubTime);
    });
    $$('.stub[data-time]').forEach(paintStubTime);
    updateNextStop();
  }

  // === Section: 9. Foundations page demos ===

  /**
   * Wires the demos on index.html: the language switch sample, issuing a
   * received ticket when it is confirmed, and punching a stub.
   * @returns {void}
   */
  function initFoundations() {
    $$('.lang-switch--demo .lang-switch__btn').forEach(function (btn, i, all) {
      btn.addEventListener('click', function () {
        all.forEach(function (other) {
          other.setAttribute('aria-pressed', other === btn ? 'true' : 'false');
        });
      });
    });
    $$('[data-demo]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = document.getElementById(btn.getAttribute('aria-controls'));
        const cls = btn.dataset.demo;
        const on = !target.classList.contains(cls);
        target.classList.toggle(cls, on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    });
  }

  // === Section: 10. Start-up ===

  /**
   * Starts the right enhancements for the current page.
   * @returns {void}
   */
  function start() {
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');
    const page = document.body.dataset.page;
    if (page === 'request') {
      initRequest();
    } else if (page === 'dashboard') {
      initDashboard();
    } else if (page === 'driver') {
      initDriver();
    } else if (page === 'foundations') {
      initFoundations();
    }
    // FR-65: only the public pages switch language; staff pages stay English.
    if (page === 'request' || page === 'driver') {
      initLangSwitch();
    }
  }

  start();
}());
