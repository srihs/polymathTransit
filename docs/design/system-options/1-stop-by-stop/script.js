/**
 * @file script.js – PolymathTransit, design direction 1 "Stop by Stop".
 *
 * The only script for the four pages of this direction. It enhances pages
 * that already work without it (brief 2, "Works without JavaScript"):
 *   - Language switch (request.html, driver.html): English and Sinhala,
 *     remembered in localStorage under "pt-lang" (FR-65, D-09).
 *   - Request form (request.html): reveals, the cutoff message, extra stops
 *     on the route spine, the passenger stepper, validation with an error
 *     summary, and the confirmation (FR-02 to FR-07, FR-54, FR-55, US-01,
 *     US-03, US-05).
 *   - Coordinator dashboard (dashboard.html): choosing timeline blocks,
 *     the detail panel, Approve with Undo, approving the day's plan, and the
 *     list view (FR-19, FR-29, FR-34, US-16, US-22, US-26).
 *   - Driver's route (driver.html): Done, No-show, Undo, Navigate, progress
 *     and the offline banner (FR-61, FR-67, US-60, NFR-18).
 *
 * Classic script, wrapped in an IIFE, loaded with "defer", so it runs when
 * the pages are opened straight from the file system (no modules, no fetch).
 *
 * Sections:
 *   1. Shared strings
 *   2. Helpers (text, time and date)
 *   3. Language switch
 *   4. Request form
 *   5. Coordinator dashboard
 *   6. Driver's route
 *   7. Start
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

  // === Section: 2. Helpers (text, time and date) ===

  /** The language of the page right now: "en" or "si". */
  var lang = 'en';

  /** Functions to run after the language changes (each page adds its own). */
  var langHooks = [];

  /**
   * Find the first element that matches a selector.
   * @param {string} sel CSS selector.
   * @param {ParentNode} [root=document] Where to look.
   * @returns {?Element} The element, or null.
   */
  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  /**
   * Find every element that matches a selector, as an array.
   * @param {string} sel CSS selector.
   * @param {ParentNode} [root=document] Where to look.
   * @returns {Element[]} The elements (possibly none).
   */
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /**
   * Look up a shared string in the current language and fill its
   * placeholders, such as {time} or {min}.
   * @param {string} key Key from STRINGS (brief 4.9).
   * @param {Object<string, (string|number)>} [vars] Values for the placeholders.
   * @returns {string} The text to show.
   */
  function t(key, vars) {
    var s = (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.en[key] || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.split('{' + k + '}').join(String(vars[k]));
      });
    }
    return s;
  }

  /**
   * Pad a number to two digits.
   * @param {number} n A number from 0 to 99.
   * @returns {string} For example "05".
   */
  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }

  /**
   * Format a time of day in the current language (NFR-12): English
   * "8:45 am" and "12:30 pm"; Sinhala "පෙ.ව. 8:45" and "ප.ව. 12:30".
   * Sri Lanka time; no time zone is ever shown.
   * @param {number} hours Hour, 0 to 23.
   * @param {number} minutes Minute, 0 to 59.
   * @param {string} [forLang] "en" or "si"; defaults to the page language.
   * @returns {string} The formatted time.
   */
  function formatTime(hours, minutes, forLang) {
    var l = forLang || lang;
    var am = hours < 12;
    var clock = (hours % 12 || 12) + ':' + pad2(minutes);
    if (l === 'si') {
      return STRINGS.si[am ? 'time.am' : 'time.pm'] + ' ' + clock;
    }
    return clock + ' ' + (am ? 'am' : 'pm');
  }

  /**
   * Turn an "HH:MM" value into minutes after midnight.
   * @param {string} value For example "08:45".
   * @returns {number} Minutes after midnight, or NaN if the value is empty.
   */
  function minutesOf(value) {
    if (!value) { return NaN; }
    var parts = value.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }

  /**
   * Format an "HH:MM" value as a time in the current language.
   * @param {string} value For example "13:30".
   * @returns {string} For example "1:30 pm".
   */
  function timeLabel(value) {
    var m = minutesOf(value);
    return formatTime(Math.floor(m / 60), m % 60);
  }

  /**
   * Read a date typed as DD/MM/YYYY.
   * @param {string} text What the person typed.
   * @returns {?Date} The date at midnight UTC, or null if it is not a real date.
   */
  function parseDate(text) {
    var m = /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(text || '');
    if (!m) { return null; }
    var d = new Date(Date.UTC(+m[3], +m[2] - 1, +m[1]));
    // Reject dates such as 31/02/2026, which Date would roll over.
    if (d.getUTCDate() !== +m[1] || d.getUTCMonth() !== +m[2] - 1) { return null; }
    return d;
  }

  /**
   * Format a date as DD/MM/YYYY (NFR-12), the same in both languages.
   * @param {Date} d A date at midnight UTC.
   * @returns {string} For example "13/10/2026".
   */
  function formatDate(d) {
    return pad2(d.getUTCDate()) + '/' + pad2(d.getUTCMonth() + 1) + '/' + d.getUTCFullYear();
  }

  /**
   * Weekday and date in the current language, for example
   * "Tuesday 13/10/2026" or "අඟහරුවාදා 13/10/2026". Weekends, which have no
   * shared string, show the date only.
   * @param {Date} d A date at midnight UTC.
   * @returns {string} The weekday and date.
   */
  function weekdayDate(d) {
    var keys = [null, 'day.monday', 'day.tuesday', 'day.wednesday', 'day.thursday', 'day.friday', null];
    var key = keys[d.getUTCDay()];
    return (key ? t(key) + ' ' : '') + formatDate(d);
  }

  /**
   * A passenger count in words for the driver's stops: "1 passenger",
   * "11 passengers", or in Sinhala "මගීන් 11" (word first, as in the shared
   * strings; for native-speaker review, D-09).
   * @param {number} n Number of passengers.
   * @returns {string} The count in words.
   */
  function paxLabel(n) {
    var word = t('driver.passengers');
    if (lang === 'si') { return word + ' ' + n; }
    return n + ' ' + (n === 1 ? word.replace(/s$/, '') : word);
  }

  /**
   * Add or remove one id in a space-separated attribute such as
   * aria-describedby, keeping the others.
   * @param {Element} el The element.
   * @param {string} attr Attribute name.
   * @param {string} id The id to add or remove.
   * @param {boolean} on True to add, false to remove.
   * @returns {void}
   */
  function setToken(el, attr, id, on) {
    var list = (el.getAttribute(attr) || '').split(/\s+/).filter(Boolean)
      .filter(function (x) { return x !== id; });
    if (on) { list.unshift(id); }
    if (list.length) { el.setAttribute(attr, list.join(' ')); } else { el.removeAttribute(attr); }
  }

  /**
   * Put a message in a polite live region so screen readers hear it. The
   * region is emptied first so the same message is announced again.
   * @param {?Element} region An element with role="status".
   * @param {string} text The message.
   * @returns {void}
   */
  function announce(region, text) {
    if (!region) { return; }
    region.textContent = '';
    window.setTimeout(function () { region.textContent = text; }, 50);
  }

  // === Section: 3. Language switch ===

  /**
   * Read the remembered language. Some browsers block storage on file://,
   * so failures fall back to English (brief 3.5).
   * @returns {?string} "en", "si" or null.
   */
  function readStoredLang() {
    try {
      return window.localStorage.getItem('pt-lang');
    } catch (e) {
      return null;
    }
  }

  /**
   * Remember the chosen language on this phone (FR-65).
   * @param {string} l "en" or "si".
   * @returns {void}
   */
  function storeLang(l) {
    try {
      window.localStorage.setItem('pt-lang', l);
    } catch (e) {
      // Storage blocked: the choice still applies to this visit.
    }
  }

  /**
   * Replace every translatable text on the page with the current language:
   * elements with data-i18n, optgroup labels with data-i18n-label, and the
   * time options of every time select. Then run each page's hooks.
   * @returns {void}
   */
  function applyStrings() {
    $$('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    $$('[data-i18n-label]').forEach(function (el) {
      el.setAttribute('label', t(el.getAttribute('data-i18n-label')));
    });
    $$('select[data-time-select] option').forEach(function (o) {
      if (o.value) { o.textContent = timeLabel(o.value); }
    });
    langHooks.forEach(function (fn) { fn(); });
  }

  /**
   * Switch the page language: set <html lang>, swap every string, mark the
   * current option with aria-pressed and remember the choice.
   * @param {string} l "en" or "si".
   * @param {boolean} [tell] True when the person chose it, to announce
   *   "Your language choice is remembered on this phone."
   * @returns {void}
   */
  function setLang(l, tell) {
    lang = l === 'si' ? 'si' : 'en';
    document.documentElement.setAttribute('lang', lang);
    applyStrings();
    $$('.lang-switch__btn').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    storeLang(lang);
    if (tell) { announce($('#lang-status'), t('lang.note')); }
  }

  /**
   * Turn the two language links (the no-script fallback) into toggle
   * buttons and apply the remembered language.
   * @returns {void}
   */
  function initLanguage() {
    $$('.lang-switch a.lang-switch__btn').forEach(function (a) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = a.className;
      b.setAttribute('data-lang', a.getAttribute('data-lang'));
      b.setAttribute('lang', a.getAttribute('lang'));
      b.innerHTML = a.innerHTML;
      b.addEventListener('click', function () { setLang(b.getAttribute('data-lang'), true); });
      a.parentNode.replaceChild(b, a);
    });
    // A ?lang= link (the no-script switch, or a link in a message) wins over
    // the remembered choice, as the server would render it in production.
    var asked = /[?&]lang=(en|si)/.exec(window.location.search);
    setLang(asked ? asked[1] : (readStoredLang() || 'en'), false);
  }

  // === Section: 4. Request form ===

  /**
   * Set up the public request form (request.html).
   * @returns {void}
   */
  function initRequest() {
    var form = $('#request-form');
    if (!form) { return; }

    // The form's "now" is 2:40 pm on Monday 12/10/2026 (brief 4.4).
    var TODAY = Date.UTC(2026, 9, 12);
    // FR-03: Sri Lankan numbers: 07X XXX XXXX, 0XX XXX XXXX or +94 then 9 digits.
    var PHONE_RE = /^(?:0\d{9}|\+94\d{9})$/;

    var state = { dirty: {}, errors: {}, summaryOn: false, lastDate: null, data: null };
    var summary = $('#error-summary');
    var summaryList = $('#error-summary-list');

    /**
     * The checked radio of a group, if any.
     * @param {string} name The radio group's name.
     * @returns {?HTMLInputElement} The checked radio, or null.
     */
    function checked(name) {
      return form.querySelector('input[name="' + name + '"]:checked');
    }

    /**
     * Check the date (FR-07, BRL-13). "Another date" must be DD/MM/YYYY and
     * not before today.
     * @returns {?string} An error key, or null when the date is fine.
     */
    function checkDate() {
      var c = checked('date');
      if (!c) { return 'err.date'; }
      if (c.value !== 'other') { return null; }
      var d = parseDate($('#date-other').value);
      if (!d) { return 'err.date.format'; }
      return d.getTime() < TODAY ? 'err.date.past' : null;
    }

    /**
     * Check the passenger number: a whole number from 1 to 99 (US-03 AC-4).
     * @returns {?string} An error key, or null.
     */
    function checkPax() {
      var v = $('#pax').value.trim();
      if (!/^\d+$/.test(v)) { return 'err.pax'; }
      var n = parseInt(v, 10);
      return n >= 1 && n <= 99 ? null : 'err.pax';
    }

    /**
     * Check the return pickup time (FR-06): needed when a return is wanted,
     * and after the pickup time.
     * @returns {?string} An error key, or null.
     */
    function checkReturnTime() {
      var r = $('#return-time').value;
      if (!r) { return 'err.return.empty'; }
      var p = $('#time').value;
      return p && minutesOf(r) <= minutesOf(p) ? 'err.return.time' : null;
    }

    // Fields in page order, so the error summary follows the page (brief 5.2).
    var FIELDS = [
      { id: 'name', box: 'field-name', input: 'name', check: function () { return $('#name').value.trim() ? null : 'err.name'; } },
      { id: 'phone', box: 'field-phone', input: 'phone', check: function () {
        var v = $('#phone').value.trim();
        if (!v) { return 'err.phone.empty'; }
        return PHONE_RE.test(v.replace(/[\s-]/g, '')) ? null : 'err.phone.format';
      } },
      { id: 'purpose', box: 'field-purpose', group: 'purpose', target: 'purpose-class', check: function () { return checked('purpose') ? null : 'err.purpose'; } },
      { id: 'date', box: 'field-date', group: 'date', target: 'date-1', check: checkDate },
      { id: 'from', box: 'field-from', input: 'from', check: function () { return $('#from').value ? null : 'err.from'; } },
      { id: 'to', box: 'field-to', input: 'to', check: function () { return $('#to').value ? null : 'err.to'; } },
      { id: 'time', box: 'field-time', input: 'time', check: function () { return $('#time').value ? null : 'err.time'; } },
      { id: 'pax', box: 'field-pax', input: 'pax', check: checkPax },
      { id: 'return', box: 'field-return', group: 'return', target: 'return-yes', check: function () { return checked('return') ? null : 'err.return'; } },
      { id: 'return-time', box: 'field-return-time', input: 'return-time', check: checkReturnTime,
        when: function () { var c = checked('return'); return !!c && c.value === 'yes'; } }
    ];
    var byId = {};
    FIELDS.forEach(function (f) { byId[f.id] = f; });

    /**
     * The control that the error summary link should move focus to.
     * @param {Object} f A field definition.
     * @returns {string} The control's id.
     */
    function targetOf(f) {
      if (f.id === 'date') {
        var c = checked('date');
        if (c && c.value === 'other') { return 'date-other'; }
        return (c && c.id) || f.target;
      }
      if (f.group) { var g = checked(f.group); return (g && g.id) || f.target; }
      return f.input;
    }

    /**
     * Show or clear one field's error next to the field: the red bar, the
     * icon and message, aria-invalid and aria-describedby (NFR-03).
     * @param {Object} f A field definition.
     * @param {?string} key The error key, or null to clear.
     * @returns {void}
     */
    function paintError(f, key) {
      var box = document.getElementById(f.box);
      var err = document.getElementById(f.id + '-error');
      box.classList.toggle('is-error', !!key);
      err.hidden = !key;
      err.querySelector('.field__error-text').textContent = key ? t(key) : '';
      if (key) { state.errors[f.id] = key; } else { delete state.errors[f.id]; }
      if (f.group) {
        setToken(box, 'aria-describedby', err.id, !!key);
        if (f.id === 'date') {
          var other = $('#date-other');
          var otherBad = !!key && checked('date') && checked('date').value === 'other';
          if (otherBad) { other.setAttribute('aria-invalid', 'true'); } else { other.removeAttribute('aria-invalid'); }
          setToken(other, 'aria-describedby', err.id, otherBad);
        }
      } else {
        var input = document.getElementById(f.input);
        if (key) { input.setAttribute('aria-invalid', 'true'); } else { input.removeAttribute('aria-invalid'); }
        setToken(input, 'aria-describedby', err.id, !!key);
      }
    }

    /**
     * Check one field and show or clear its error.
     * @param {Object} f A field definition.
     * @returns {?string} The error key, or null.
     */
    function validateField(f) {
      var key = (f.when && !f.when()) ? null : f.check();
      paintError(f, key);
      if (state.summaryOn) { renderSummary(); }
      return key;
    }

    /**
     * Draw the error summary: one link per error, in page order.
     * @returns {void}
     */
    function renderSummary() {
      summaryList.textContent = '';
      var any = false;
      FIELDS.forEach(function (f) {
        var key = state.errors[f.id];
        if (!key) { return; }
        any = true;
        var li = document.createElement('li');
        var a = document.createElement('a');
        var target = targetOf(f);
        a.href = '#' + target;
        a.textContent = t(key);
        a.addEventListener('click', function (e) {
          e.preventDefault();
          var el = document.getElementById(target);
          var box = document.getElementById(f.box);
          // Bring the question into view, then focus its control.
          box.scrollIntoView({ block: 'start' });
          el.focus({ preventScroll: true });
        });
        li.appendChild(a);
        summaryList.appendChild(li);
      });
      if (!any) { summary.hidden = true; state.summaryOn = false; }
    }

    // --- Reveals, cutoff message and conditional fields ---

    /**
     * Open or close a revealed block.
     * @param {Element} el The .reveal element.
     * @param {boolean} open True to show it.
     * @returns {void}
     */
    function setReveal(el, open) {
      el.classList.toggle('is-open', open);
    }

    /**
     * Show the cutoff message for the chosen date (FR-07, BRL-13), or hide it.
     * @param {?string} key A cutoff string key, or null for none.
     * @param {boolean} [closed] True for a closed date: warning style.
     * @returns {void}
     */
    function showCutoff(key, closed) {
      var box = $('#cutoff-msg');
      var text = $('#cutoff-text');
      if (!key) {
        box.hidden = true;
        text.removeAttribute('data-i18n');
        text.textContent = '';
        return;
      }
      box.hidden = false;
      box.className = 'alert alert--small fieldset__status ' + (closed ? 'alert--warning' : 'alert--info');
      $('#cutoff-icon').setAttribute('href', closed ? '#i-warning' : '#i-info');
      text.setAttribute('data-i18n', key);
      text.textContent = t(key);
    }

    /**
     * Bring the cutoff message, reveals and the split message in line with
     * the current answers.
     * @returns {void}
     */
    function syncAll() {
      var d = checked('date');
      // BRL-13: tomorrow's 5:00 pm cutoff shows until another date is chosen.
      if (!d) { showCutoff('cutoff.open'); } else { showCutoff(d.getAttribute('data-cutoff')); }
      state.lastDate = d;
      setReveal($('#date-other-wrap'), !!d && d.value === 'other');
      setReveal($('#from-other'), $('#from').value === 'other');
      setReveal($('#to-other'), $('#to').value === 'other');
      var r = checked('return');
      setReveal($('#return-wrap'), !!r && r.value === 'yes');
      updateSplit();
    }

    /**
     * Show "This group needs more than one van" above 12 passengers
     * (US-03 AC-3). Information, not an error.
     * @returns {void}
     */
    function updateSplit() {
      var n = parseInt($('#pax').value, 10);
      $('#pax-split-msg').hidden = !(n > 12 && n <= 99);
    }

    // Today is closed (BRL-13). It stays focusable so the reason can be read;
    // choosing it puts the previous choice back.
    var today = $('#date-0');
    today.disabled = false;
    today.setAttribute('aria-disabled', 'true');
    today.addEventListener('focus', function () { showCutoff('cutoff.today.closed', true); });
    today.addEventListener('blur', function () {
      var d = checked('date');
      showCutoff(d ? d.getAttribute('data-cutoff') : 'cutoff.open');
    });

    $$('input[name="date"]').forEach(function (r) {
      r.addEventListener('change', function () {
        if (r === today) {
          r.checked = false;
          if (state.lastDate && state.lastDate !== today) { state.lastDate.checked = true; }
          showCutoff('cutoff.today.closed', true);
          return;
        }
        syncAll();
        if (state.errors.date) { validateField(byId.date); }
      });
    });

    ['from', 'to'].forEach(function (id) {
      $('#' + id).addEventListener('change', syncAll);
    });

    $$('input[name="return"]').forEach(function (r) {
      r.addEventListener('change', function () {
        syncAll();
        if (state.errors['return']) { validateField(byId['return']); }
        if (r.value === 'no') { paintError(byId['return-time'], null); if (state.summaryOn) { renderSummary(); } }
      });
    });

    $$('input[name="purpose"]').forEach(function (r) {
      r.addEventListener('change', function () { if (state.errors.purpose) { validateField(byId.purpose); } });
    });

    // --- Validate on leaving a field, only once the person has typed in it ---
    var INPUT_FIELD = { 'name': 'name', 'phone': 'phone', 'pax': 'pax', 'date-other': 'date',
      'from': 'from', 'to': 'to', 'time': 'time', 'return-time': 'return-time' };
    Object.keys(INPUT_FIELD).forEach(function (id) {
      var el = document.getElementById(id);
      var f = byId[INPUT_FIELD[id]];
      var mark = function () { state.dirty[id] = true; };
      el.addEventListener('input', mark);
      el.addEventListener('change', mark);
      el.addEventListener('blur', function () {
        // Never on each keystroke; only on leaving, after typing (brief 5.2).
        if (state.dirty[id] || state.errors[f.id]) { validateField(f); }
      });
    });

    // --- Passenger stepper ---
    $$('.stepper__btn').forEach(function (b) {
      b.hidden = false;
      b.addEventListener('click', function () {
        var input = $('#pax');
        var step = parseInt(b.getAttribute('data-step'), 10);
        var v = parseInt(input.value, 10);
        if (isNaN(v)) { v = step > 0 ? 0 : 2; }
        input.value = Math.min(99, Math.max(1, v + step));
        state.dirty.pax = true;
        updateSplit();
        if (state.errors.pax) { validateField(byId.pax); }
      });
    });
    $('#pax').addEventListener('input', updateSplit);

    // --- Extra stops on the spine (FR-54) ---
    var stopsBox = $('#stops');
    var addWrap = $('#add-stop-wrap');
    var addBtn = $('#add-stop');
    var stops = $$('#stops-pool .stop');
    stops.forEach(function (s) {
      s.classList.add('route__stop');
      s.hidden = true;
      stopsBox.appendChild(s);
      $('.stop__remove', s).hidden = false;
    });
    var nojs = $('#stops-nojs-wrap');
    nojs.parentNode.removeChild(nojs);
    addWrap.hidden = false;

    /**
     * Number the visible stops 1, 2, 3 in order, and hide "+ Add a stop"
     * once three are shown.
     * @returns {void}
     */
    function renumberStops() {
      var shown = $$('.stop', stopsBox).filter(function (s) { return !s.hidden; });
      shown.forEach(function (s, i) { $('.stop__n', s).textContent = String(i + 1); });
      addWrap.hidden = shown.length >= 3;
    }

    /**
     * Put an extra stop on the spine, just before "Going to". The spine
     * grows down to its new crossbar (150 ms; instant with reduced motion).
     * @returns {void}
     */
    function addStop() {
      var next = $$('.stop', stopsBox).filter(function (s) { return s.hidden; })[0];
      if (!next) { return; }
      next.hidden = false;
      next.classList.add('is-new');
      window.setTimeout(function () { next.classList.remove('is-new'); }, 300);
      renumberStops();
      $('select', next).focus();
    }

    /**
     * Take an extra stop off the spine and clear what was in it.
     * @param {Element} s The stop's fieldset.
     * @returns {void}
     */
    function removeStop(s) {
      s.hidden = true;
      $$('select, input[type="number"]', s).forEach(function (el) { el.value = ''; });
      $$('input[type="radio"]', s).forEach(function (el) { el.checked = false; });
      stopsBox.appendChild(s);
      renumberStops();
      addBtn.focus();
    }

    addBtn.addEventListener('click', addStop);
    stops.forEach(function (s) {
      $('.stop__remove', s).addEventListener('click', function () { removeStop(s); });
    });

    // "Choose on map" is not built: show the prototype note (Q-17).
    $$('.address__map').forEach(function (b) {
      b.addEventListener('click', function () {
        document.getElementById(b.getAttribute('data-map-note')).hidden = false;
      });
    });

    // --- Submit, confirmation and the read-back on the spine ---

    /**
     * The visible name of the chosen place, or the typed address.
     * @param {string} selectId The place select's id.
     * @param {string} [addressId] The "another address" input's id.
     * @returns {string} The place as shown to the person.
     */
    function placeText(selectId, addressId) {
      var sel = document.getElementById(selectId);
      if (sel.value === 'other' && addressId) {
        return document.getElementById(addressId).value.trim() || t('place.other');
      }
      return sel.value ? sel.options[sel.selectedIndex].textContent : '';
    }

    /**
     * Gather the answers needed for the confirmation summary.
     * @returns {Object} The answers.
     */
    function collect() {
      var d = checked('date');
      var date = d.value === 'other' ? parseDate($('#date-other').value) : parseDate(d.value);
      var extra = $$('.stop', stopsBox).filter(function (s) { return !s.hidden && $('select', s).value; })
        .map(function (s) {
          var kind = $('input[type="radio"]:checked', s);
          return { place: placeText($('select', s).id), kind: kind ? kind.value : '', pax: $('input[type="number"]', s).value };
        });
      var ret = checked('return');
      return {
        purpose: checked('purpose').value,
        date: date,
        from: placeText('from', 'from-address'),
        to: placeText('to', 'to-address'),
        stops: extra,
        time: $('#time').value,
        flex: checked('flex') ? checked('flex').value : '10',
        pax: $('#pax').value.trim(),
        ret: ret.value,
        retTime: $('#return-time').value
      };
    }

    /**
     * Draw the "Your trip" summary in the current language, with pick-up,
     * stops and destination read back on the spine (FR-04, US-01 AC-5).
     * @returns {void}
     */
    function renderDone() {
      var d = state.data;
      if (!d) { return; }
      var dl = $('#done-summary');
      dl.textContent = '';
      dl.className = 'summary route';

      /**
       * Add one summary row.
       * @param {string} label The term.
       * @param {string} value The answer.
       * @param {string} [spine] "stop" or "end" to put the row on the spine.
       * @returns {void}
       */
      function row(label, value, spine) {
        var div = document.createElement('div');
        div.className = 'summary__row' + (spine ? ' route__stop' + (spine === 'end' ? ' route__stop--end' : '') : '');
        var dt = document.createElement('dt');
        dt.textContent = label;
        var dd = document.createElement('dd');
        dd.textContent = value;
        div.appendChild(dt);
        div.appendChild(dd);
        dl.appendChild(div);
      }

      var flex = d.flex === '0' ? t('flex.exact') : t('flex.' + d.flex);
      var time = timeLabel(d.time);
      row(t('label.purpose'), t('purpose.' + d.purpose));
      row(t('label.date'), weekdayDate(d.date));
      row(t('label.pickup'), lang === 'si' ? d.from + ', ' + time + ' (' + flex + ')' : time + ' (' + flex + ') from ' + d.from, 'stop');
      d.stops.forEach(function (s, i) {
        var bits = [s.place];
        if (s.kind) { bits.push(t(s.kind === 'pickup' ? 'driver.pickup' : 'driver.dropoff')); }
        if (s.pax) { bits.push(paxLabel(parseInt(s.pax, 10))); }
        row(t('stop.label') + ' ' + (i + 1), bits.join(' – '), 'stop');
      });
      row(t('label.goingto'), d.to, 'end');
      row(t('label.passengers'), d.pax);
      if (d.ret === 'yes') {
        var rt = timeLabel(d.retTime);
        row(t('label.return'), lang === 'si' ? d.to + ', ' + rt : rt + ' from ' + d.to);
      } else {
        row(t('label.return'), t('no'));
      }
    }

    /**
     * Switch the one page heading between "Request a van" and "Request
     * received" (with the check icon), so the page always has one h1.
     * @param {boolean} done True for the confirmation.
     * @returns {void}
     */
    function setTitle(done) {
      var text = $('#page-title-text');
      text.setAttribute('data-i18n', done ? 'done.title' : 'form.title');
      text.textContent = t(done ? 'done.title' : 'form.title');
      $('#page-title-icon').hidden = !done;
      $('#page-title').classList.toggle('done__title', done);
    }

    /**
     * Handle "Send request": check everything; show the error summary and
     * move focus to it, or replace the form with the confirmation.
     * @returns {void}
     */
    function handleSubmit() {
      var bad = FIELDS.filter(function (f) {
        var key = (f.when && !f.when()) ? null : f.check();
        paintError(f, key);
        return !!key;
      });
      if (bad.length) {
        state.summaryOn = true;
        summary.hidden = false;
        renderSummary();
        summary.focus();
        return;
      }
      summary.hidden = true;
      state.summaryOn = false;
      state.data = collect();
      renderDone();
      setTitle(true);
      $('#form-view').hidden = true;
      $('#done-view').hidden = false;
      window.scrollTo(0, 0);
      $('#page-title').focus();
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleSubmit();
    });

    // "Request another trip" returns to an empty form without a reload.
    $('#done-another').addEventListener('click', function (e) {
      e.preventDefault();
      resetForm();
      $('#main h1').focus();
    });

    /**
     * Put the form back to its first state.
     * @returns {void}
     */
    function resetForm() {
      form.reset();
      FIELDS.forEach(function (f) { paintError(f, null); });
      state.dirty = {};
      state.summaryOn = false;
      state.data = null;
      summary.hidden = true;
      $$('.stop', stopsBox).forEach(function (s) { if (!s.hidden) { removeStop(s); } });
      $$('#request-form details').forEach(function (d) { d.open = false; });
      $$('.proto-note').forEach(function (n) { n.hidden = true; });
      $('#done-view').hidden = true;
      $('#form-view').hidden = false;
      setTitle(false);
      syncAll();
      window.scrollTo(0, 0);
    }

    /**
     * Fill the form with the sample answers for PT-2026-0142 (brief 4.5).
     * @returns {void}
     */
    function fillSample() {
      resetForm();
      $('#name').value = 'Kasun Jayasinghe';
      $('#phone').value = '077 000 0142';
      $('#purpose-sport').checked = true;
      $('#date-1').checked = true;
      $('#from').value = 'branch-b';
      $('#to').value = 'sports';
      $('#time').value = '08:45';
      $('#flex-10').checked = true;
      $('#pax').value = '4';
      $('#return-yes').checked = true;
      $('#return-time').value = '10:45';
      syncAll();
    }


    // Prototype controls (brief 5.2).
    $$('[data-proto]').forEach(function (b) {
      b.addEventListener('click', function () {
        var what = b.getAttribute('data-proto');
        if (what === 'fill') { fillSample(); }
        if (what === 'errors') { resetForm(); handleSubmit(); }
        if (what === 'confirm') { fillSample(); handleSubmit(); }
        if (what === 'reset') { resetForm(); }
      });
    });

    // After a language change, redraw everything the script wrote.
    langHooks.push(function () {
      document.title = t('form.title') + ' – PolymathTransit';
      FIELDS.forEach(function (f) {
        if (state.errors[f.id]) { paintError(f, state.errors[f.id]); }
      });
      if (state.summaryOn) { renderSummary(); }
      renderDone();
    });

    syncAll();
  }

  // === Section: 5. Coordinator dashboard ===

  /**
   * Set up the coordinator dashboard (dashboard.html).
   * @returns {void}
   */
  function initDashboard() {
    var panel = $('#detail');
    if (!panel) { return; }

    var STATUS_WORD = { proposed: 'Proposed', attention: 'Needs attention', confirmed: 'Confirmed' };
    var FLAG_ICON = { 'Late (exception)': 'late', 'Shared': 'shared', 'Gap job': 'gap', 'Out of hours': 'outofhours',
      'New requester': 'newrequester', 'Fixed trip': 'repeat', 'Early trip': 'clock' };
    var OPTIMISED = 'Planned by the system at 5:00 pm on 12/10/2026 (Optimise day).';

    // Bookings on the timeline (brief 4.5, 4.7). run: [place, time, action, on board].
    var BASE = {
      'PT-2026-0131': { status: 'confirmed', van: 'Van 1', seats: 12, flags: ['Early trip'], requester: 'Dilini Fernando, 077 000 0131', purpose: 'Staff errand',
        pickup: 'Branch A (main branch), 7:30 am', to: 'Branch C, arrives 7:55 am', pax: 2, ret: 'No',
        run: [['Branch A', '7:30 am', 'Pick up 2', 2], ['Branch C', '7:55 am', 'Drop off 2', 0]],
        audit: OPTIMISED + ' Confirmed individually on 12/10/2026 (early trip).' },
      'PT-2026-0119': { status: 'proposed', van: 'Van 1', seats: 12, flags: ['Fixed trip'], requester: 'Ruwan Silva, 077 000 0119 (series contact)', purpose: 'Sport: Grade 7 Swimming',
        pickup: 'Branch A (main branch), 9:05 am', to: 'Aquatic Centre, arrives 9:30 am', pax: 11, ret: '11:30 am from Aquatic Centre (back 11:55 am); van need not stay',
        series: 'Grade 7 Swimming – every Tuesday this term',
        run: [['Branch A', '9:05 am', 'Pick up 11', 11], ['Aquatic Centre', '9:30 am', 'Drop off 11', 0], ['Aquatic Centre', '11:30 am', 'Pick up 11', 11], ['Branch A', '11:55 am', 'Drop off 11', 0]],
        audit: OPTIMISED },
      'PT-2026-0145': { status: 'proposed', van: 'Van 1', seats: 12, flags: ['Gap job'], requester: 'Shamila Rodrigo, 077 000 0145', purpose: 'Staff errand',
        pickup: 'Branch B, 10:00 am', to: 'Stationery supplier, then back to Branch B by 10:50 am', pax: 1, ret: 'Round trip with a wait',
        explainTitle: 'Why this plan',
        explain: ['Van 1: gap job while Grade 7 Swimming is at the Aquatic Centre.',
          'Leaves the Aquatic Centre at 9:35 am and is back at 11:10 am, 20 minutes before the 11:30 am return pickup (the safety buffer is 15 minutes).',
          'No second van needed.'],
        run: [['Branch B', '10:00 am', 'Pick up 1', 1], ['Stationery supplier', '10:20 am', 'Drop off 1', 0], ['Stationery supplier', '10:35 am', 'Pick up 1', 1], ['Branch B', '10:50 am', 'Drop off 1', 0]],
        audit: OPTIMISED },
      'PT-2026-0140': { status: 'proposed', van: 'Van 2', seats: 8, flags: ['Shared'], requester: 'Nimal Perera, 077 000 0140', purpose: 'Meeting or event',
        pickup: 'Branch A (main branch), 8:25 am', to: 'Branch C, arrives 8:55 am', pax: 3, ret: 'No',
        run: [['Branch A', '8:25 am', 'Pick up 3', 3], ['Branch B', '8:40 am', 'Pick up 4', 7], ['Branch C', '8:55 am', 'Drop off 3', 4], ['Sports Centre', '9:10 am', 'Drop off 4', 0]],
        audit: OPTIMISED },
      'PT-2026-0142': { status: 'proposed', van: 'Van 2', seats: 8, flags: ['Shared'], requester: 'Kasun Jayasinghe, 077 000 0142', purpose: 'Sport',
        pickup: 'Branch B, asked for 8:45 am ± 10 min; planned 8:40 am', to: 'Sports Centre, arrives 9:10 am', pax: 4, ret: '10:45 am from Sports Centre (back 11:05 am)',
        explainTitle: 'Why this plan',
        explain: ['Van 2: added to the 8:25 am run from Branch A, shared with PT-2026-0140.',
          'Pickup at Branch B at 8:40 am, within the requested 8:45 am ± 10 min.',
          '7 of 8 seats used at the busiest point.',
          'The 3 passengers from Branch A ride 6 minutes longer, within their limit.',
          'Saves a separate 35-minute van run.',
          'Van 1 not used: it must leave Branch A at 9:05 am for Grade 7 Swimming.'],
        run: [['Branch A', '8:25 am', 'Pick up 3', 3], ['Branch B', '8:40 am', 'Pick up 4', 7], ['Branch C', '8:55 am', 'Drop off 3', 4], ['Sports Centre', '9:10 am', 'Drop off 4', 0]],
        audit: OPTIMISED },
      'PT-2026-0147': { status: 'attention', van: 'Van 2 (route found)', seats: 8, flags: ['New requester'], requester: 'Sanduni Herath, 077 000 0147', purpose: 'Staff errand',
        pickup: 'Branch C, 11:20 am', to: 'Map pin: “Opposite the temple, 2nd lane”, arrives 11:40 am', pax: 3, ret: 'No',
        explainTitle: 'Why it needs attention',
        explain: ['New requester: this phone number has not been used before. Check before approving.',
          'Route found: Van 2, pickup at Branch C at 11:20 am.',
          'The drop-off was placed with a map pin and the note “Opposite the temple, 2nd lane”.'],
        run: [['Branch C', '11:20 am', 'Pick up 3', 3], ['Map pin', '11:40 am', 'Drop off 3', 0]],
        audit: 'Route found by the system at 5:00 pm on 12/10/2026 (Optimise day). Not in the plan until a coordinator checks it.' },
      'PT-2026-0149': { status: 'attention', van: 'Not placed', seats: 0, flags: [], requester: 'Mahesh Kumara, 077 000 0149', purpose: 'Sport: Grade 9 inter-house practice',
        pickup: 'Branch A (main branch), 1:00 pm', to: 'Sports Centre', pax: 20, ret: '3:00 pm',
        explainTitle: 'Why it needs attention',
        explain: ['No single van fits: the group of 20 is larger than the largest van (12 seats).',
          'At 1:00 pm, Van 1 cannot help: it must be back at Branch A for 1:30 pm (PT-2026-0150).',
          'Van 2 alone has 8 seats.'],
        alternatives: ['Split across Van 1 (12) and Van 2 (8), both leaving Branch A at 12:15 pm (45 minutes earlier).',
          'Extra hire van needed for 1:00 pm.'],
        audit: 'Checked by the system at 5:00 pm on 12/10/2026 (Optimise day). No van placed.' },
      'PT-2026-0150': { status: 'proposed', van: 'Van 1', seats: 12, flags: [], requester: 'Priyanka Wijesekara, 077 000 0150', purpose: 'Meeting or event',
        pickup: 'Branch A (main branch), 1:30 pm', to: 'Branch B, arrives 1:45 pm', pax: 6, ret: '3:30 pm from Branch B (back 3:45 pm)',
        run: [['Branch A', '1:30 pm', 'Pick up 6', 6], ['Branch B', '1:45 pm', 'Drop off 6', 0], ['Branch B', '3:30 pm', 'Pick up 6', 6], ['Branch A', '3:45 pm', 'Drop off 6', 0]],
        audit: OPTIMISED },
      'PT-2026-0153': { status: 'proposed', van: 'Van 2', seats: 8, flags: ['Late (exception)'], requester: 'Tharindu Bandara, 077 000 0153 (by phone)', purpose: 'Staff errand',
        pickup: 'Branch C, 2:15 pm', to: 'Branch A (main branch), arrives 2:40 pm', pax: 2, ret: 'No',
        late: 'Added by Ravi Gunasekara at 6:55 am today. Source: Phone. Reason: “Exam papers must reach the main office.”',
        run: [['Branch C', '2:15 pm', 'Pick up 2', 2], ['Branch A', '2:40 pm', 'Drop off 2', 0]],
        audit: 'Late exception added by Ravi Gunasekara at 6:55 am on 13/10/2026 (source: phone).' },
      'PT-2026-0151': { status: 'proposed', van: 'Van 2', seats: 8, flags: ['Out of hours'], requester: 'Chathurika de Alwis, 077 000 0151', purpose: 'Class trip: drama rehearsal',
        pickup: 'Branch B, 5:45 pm', to: 'Branch A (main branch), arrives 6:05 pm, after 6:00 pm', pax: 7, ret: 'No',
        run: [['Branch B', '5:45 pm', 'Pick up 7', 7], ['Branch A', '6:05 pm', 'Drop off 7', 0]],
        audit: OPTIMISED }
    };

    var data = {};
    var current = 'PT-2026-0142';
    var undoTimer = null;
    var planApproved = false;
    var live = $('#live');

    /**
     * Copy the starting statuses, so Reset can put them back.
     * @returns {void}
     */
    function resetData() {
      data = {};
      Object.keys(BASE).forEach(function (k) { data[k] = { status: BASE[k].status }; });
    }

    /**
     * Make an element with a class and optional text.
     * @param {string} tag Tag name.
     * @param {string} [cls] Class names.
     * @param {string} [text] Text content.
     * @returns {Element} The new element.
     */
    function el(tag, cls, text) {
      var e = document.createElement(tag);
      if (cls) { e.className = cls; }
      if (text !== undefined) { e.textContent = text; }
      return e;
    }

    /**
     * Inline SVG markup that uses a symbol from the page's sprite.
     * @param {string} id Symbol id, for example "i-check" or "m-proposed".
     * @param {string} cls Class names for the svg.
     * @returns {string} The markup.
     */
    function svgUse(id, cls) {
      return '<svg class="' + cls + '" aria-hidden="true" focusable="false"><use href="#' + id + '"/></svg>';
    }

    /**
     * Markup for a status badge: shape, then word (never colour alone).
     * @param {string} status "proposed", "attention" or "confirmed".
     * @returns {string} The markup.
     */
    function badgeHTML(status) {
      return '<span class="badge" data-badge>' + svgUse('m-' + status, 'marker marker--' + status) +
        '<span>' + STATUS_WORD[status] + '</span></span>';
    }

    /**
     * Draw the detail panel for one booking (FR-19, US-16): status and
     * flags, facts, the explanation as plain text, the run on the spine
     * with seats on board, the actions and the audit line.
     * @param {string} ref The booking reference.
     * @returns {void}
     */
    function renderPanel(ref) {
      var b = BASE[ref];
      var st = data[ref].status;
      $('#detail-title').textContent = ref;
      $('.detail__head .t-small', panel).textContent = b.van;
      var body = $('#detail-body');
      var msg = $('#detail-msg');
      body.textContent = '';
      body.appendChild(msg);

      var badges = el('div', 'badges');
      badges.innerHTML = badgeHTML(st) + b.flags.map(function (f) {
        return '<span class="flag">' + svgUse('i-' + FLAG_ICON[f], 'icon') + f + '</span>';
      }).join('');
      body.appendChild(badges);

      var dl = el('dl', 'facts');
      var facts = [['Requester', b.requester], ['Trip for', b.purpose], ['Pick up', b.pickup], ['Going to', b.to],
        ['Passengers', String(b.pax)], ['Return', b.ret]];
      if (b.series) { facts.push(['Fixed trip series', b.series]); }
      if (b.late) { facts.push(['Late exception', b.late]); }
      facts.forEach(function (f) { dl.appendChild(el('dt', '', f[0])); dl.appendChild(el('dd', '', f[1])); });
      body.appendChild(dl);

      if (b.explain) {
        var ex = el('div');
        ex.appendChild(el('h3', '', b.explainTitle));
        var ul = el('ul', 'explain');
        b.explain.forEach(function (line) { ul.appendChild(el('li', '', line)); });
        if (b.alternatives) {
          var li = el('li', '', 'Alternatives:');
          var ol = el('ol');
          b.alternatives.forEach(function (a) { ol.appendChild(el('li', '', a)); });
          li.appendChild(ol);
          ul.appendChild(li);
        }
        ex.appendChild(ul);
        body.appendChild(ex);
      }

      if (b.run) {
        var rw = el('div');
        rw.appendChild(el('h3', '', 'The run, with seats on board'));
        var list = el('ol', 'route route--read run');
        b.run.forEach(function (s, i) {
          var item = el('li', 'route__stop' + (i === b.run.length - 1 ? ' route__stop--end' : ''));
          item.appendChild(el('span', 'run__place', s[0] + ' ' + s[1]));
          var seat = el('span', 'run__seat');
          var bars = el('span', 'seats');
          bars.setAttribute('aria-hidden', 'true');
          for (var k = 0; k < b.seats; k++) { bars.appendChild(el('span', k < s[3] ? 'is-taken' : '')); }
          seat.appendChild(bars);
          seat.appendChild(document.createTextNode(s[3] + ' of ' + b.seats));
          item.appendChild(seat);
          item.appendChild(el('span', '', s[2]));
          list.appendChild(item);
        });
        rw.appendChild(list);
        body.appendChild(rw);
      }

      var actions = el('div', 'detail__actions');
      actions.id = 'detail-actions';
      if (st !== 'confirmed' && ref !== 'PT-2026-0149') {
        actions.innerHTML = '<button type="button" class="btn btn--primary" data-action="approve">' + svgUse('i-check', 'icon') + 'Approve</button>';
      }
      actions.innerHTML += '<button type="button" class="btn btn--secondary" data-action="change">Change</button>' +
        '<button type="button" class="btn btn--danger" data-action="decline">' + svgUse('i-cross', 'icon') + 'Decline</button>';
      body.appendChild(actions);
      body.appendChild(el('p', 'detail__audit', b.audit));
    }

    /**
     * Mark a booking's timeline blocks as the chosen one and open it in the
     * detail panel.
     * @param {string} ref The booking reference.
     * @param {boolean} [tell] True to announce the change.
     * @returns {void}
     */
    function select(ref, tell) {
      current = ref;
      $$('.tl-block').forEach(function (b) {
        if (b.getAttribute('data-ref') === ref) { b.setAttribute('aria-current', 'true'); } else { b.removeAttribute('aria-current'); }
      });
      $('#detail-msg').hidden = true;
      renderPanel(ref);
      if (tell) { announce(live, ref + ' is open in the detail panel.'); }
    }

    /**
     * Bring the timeline, the list and the tile counts in line with the
     * current statuses (FR-29, US-22).
     * @returns {void}
     */
    function paintStatuses() {
      Object.keys(data).forEach(function (ref) {
        var st = data[ref].status;
        $$('.tl-block[data-ref="' + ref + '"]').forEach(function (b) {
          var m = $('.tl-block__tag .marker', b);
          m.setAttribute('class', 'marker marker--' + st);
          $('use', m).setAttribute('href', '#m-' + st);
          var name = b.getAttribute('data-name').replace(/(Proposed|Needs attention|Confirmed)/, STATUS_WORD[st]);
          b.setAttribute('aria-label', name);
        });
        $$('.tl-line[data-line="' + ref + '"]').forEach(function (l) {
          l.className = 'tl-line tl-line--' + st;
        });
        var cell = $('tr[data-row="' + ref + '"] [data-status-cell]');
        if (cell) { cell.innerHTML = badgeHTML(st); }
      });
      // The shared run is solid only when both of its bookings are confirmed.
      var run = $('.tl-line[data-line="PT-2026-0140 PT-2026-0142"]');
      var both = data['PT-2026-0140'].status === 'confirmed' && data['PT-2026-0142'].status === 'confirmed';
      run.className = 'tl-line tl-line--' + (both ? 'confirmed' : 'proposed');

      var waiting = Object.keys(data).filter(function (r) { return data[r].status === 'proposed'; }).sort();
      var attention = Object.keys(data).filter(function (r) { return data[r].status === 'attention'; });
      $('[data-count="awaiting"]').textContent = String(waiting.length);
      $('[data-count="attention"]').textContent = String(attention.length);
      // Each reference stays on one line; lines break only between them.
      var refs = $('[data-count-refs="awaiting"]');
      refs.textContent = waiting.length ? '' : 'None waiting';
      waiting.forEach(function (r, i) {
        refs.appendChild(el('span', '', (i ? r.slice(-4) : r) + (i < waiting.length - 1 ? ',' : '')));
        if (i < waiting.length - 1) { refs.appendChild(document.createTextNode(' ')); }
      });
    }

    /**
     * Show a message at the top of the detail panel, with an Undo button
     * for 10 seconds when an undo is given.
     * @param {string} text The message.
     * @param {?Function} undo What Undo does, or null for no Undo.
     * @returns {void}
     */
    function panelMessage(text, undo) {
      var msg = $('#detail-msg');
      window.clearTimeout(undoTimer);
      msg.innerHTML = '';
      var box = el('div', 'alert alert--success');
      box.innerHTML = svgUse('i-check', 'icon');
      var bodyEl = el('div', 'alert__body');
      bodyEl.appendChild(el('p', '', text));
      if (undo) {
        var btn = el('button', 'btn btn--secondary');
        btn.type = 'button';
        btn.innerHTML = svgUse('i-undo', 'icon') + 'Undo';
        btn.addEventListener('click', function () { undo(); });
        bodyEl.appendChild(btn);
        undoTimer = window.setTimeout(function () { btn.parentNode && btn.parentNode.removeChild(btn); }, 10000);
      }
      box.appendChild(bodyEl);
      msg.appendChild(box);
      msg.hidden = false;
      announce(live, text);
    }

    /**
     * Approve one proposal: Confirmed in the panel, the timeline and the
     * counts, with Undo for 10 seconds (US-17).
     * @param {string} ref The booking reference.
     * @returns {void}
     */
    function approveOne(ref) {
      var before = data[ref].status;
      data[ref].status = 'confirmed';
      paintStatuses();
      renderPanel(ref);
      var name = BASE[ref].requester.split(',')[0];
      panelMessage(ref + ' confirmed. ' + name + ' will get a text.', function () {
        data[ref].status = before;
        paintStatuses();
        renderPanel(ref);
        panelMessage(ref + ' is back to ' + STATUS_WORD[before].toLowerCase() + '.', null);
        var a = $('[data-action="approve"]', panel);
        if (a) { a.focus(); }
      });
      var undoBtn = $('#detail-msg .btn');
      if (undoBtn) { undoBtn.focus(); }
    }

    panel.addEventListener('click', function (e) {
      var b = e.target.closest('[data-action]');
      if (!b) { return; }
      var what = b.getAttribute('data-action');
      if (what === 'approve') { approveOne(current); }
      if (what === 'change' || what === 'decline') {
        panelMessage('Prototype: "' + b.textContent.trim() + '" is not built in this prototype.', null);
      }
    });

    // --- Timeline blocks and tiles ---
    $$('.tl-block').forEach(function (b) {
      b.addEventListener('click', function () { select(b.getAttribute('data-ref'), true); });
    });

    $$('[data-open]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        showList(false);
        select(a.getAttribute('data-open'), true);
        panel.scrollIntoView({ block: 'nearest' });
        panel.focus({ preventScroll: true });
      });
    });

    $('[data-open-list]').addEventListener('click', function (e) {
      e.preventDefault();
      showList(true);
      $('#list-view').scrollIntoView({ block: 'nearest' });
      $('#toggle-list').focus();
    });

    /**
     * Show the bookings as a table (FR-29 list view) or as the timeline.
     * @param {boolean} on True for the table.
     * @returns {void}
     */
    function showList(on) {
      $('#toggle-list').setAttribute('aria-pressed', on ? 'true' : 'false');
      $('#list-view').hidden = !on;
      $('#timeline').hidden = on;
      $('#legend').hidden = on;
    }

    $('#toggle-list').addEventListener('click', function () {
      showList($('#toggle-list').getAttribute('aria-pressed') !== 'true');
    });

    // --- Approve today's plan (FR-34, FR-61, BRL-21) ---
    var dialog = $('#approve-dialog');
    var opener = null;

    /**
     * Open the confirmation step for approving the whole plan.
     * @returns {void}
     */
    function openApprove() {
      if (planApproved) { return; }
      opener = document.activeElement;
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      var title = $('#approve-dialog-title');
      title.setAttribute('tabindex', '-1');
      title.focus();
    }

    /**
     * Close the confirmation step and return focus to what opened it.
     * @returns {void}
     */
    function closeApprove() {
      if (dialog.open) {
        if (typeof dialog.close === 'function') { dialog.close(); } else { dialog.removeAttribute('open'); }
      }
      var back = opener && document.body.contains(opener) ? opener : $('#approve-plan');
      if (back && !back.hidden) { back.focus(); }
    }

    /**
     * Approve the plan: every proposal becomes Confirmed, the plan tile
     * shows the success message and the update time moves to 7:06 am.
     * @returns {void}
     */
    function approvePlan() {
      Object.keys(data).forEach(function (r) { if (data[r].status === 'proposed') { data[r].status = 'confirmed'; } });
      planApproved = true;
      paintStatuses();
      renderPanel(current);
      if (dialog.open) {
        if (typeof dialog.close === 'function') { dialog.close(); } else { dialog.removeAttribute('open'); }
      }
      $('#plan-title').textContent = "Today's plan – approved";
      $('#plan-deadline').hidden = true;
      $('#plan-facts').hidden = true;
      $('.tile-plan__action').hidden = true;
      var done = $('#plan-done');
      done.hidden = false;
      done.setAttribute('tabindex', '-1');
      done.focus();
      $('#updated').textContent = 'Updated 7:06 am';
      announce(live, $('#plan-done-text').textContent);
    }

    $('#approve-plan').addEventListener('click', openApprove);
    $('#approve-cancel').addEventListener('click', closeApprove);
    $('#approve-send').addEventListener('click', approvePlan);
    // Escape closes the dialog (native "cancel"); focus goes back to the opener.
    dialog.addEventListener('cancel', function (e) { e.preventDefault(); closeApprove(); });
    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); closeApprove(); }
    });

    /**
     * Put the dashboard back to 7:05 am with nothing approved.
     * @returns {void}
     */
    function resetDashboard() {
      resetData();
      planApproved = false;
      $('#plan-title').textContent = "Today's plan – ready to approve";
      $('#plan-deadline').hidden = false;
      $('#plan-facts').hidden = false;
      $('.tile-plan__action').hidden = false;
      $('#plan-done').hidden = true;
      $('#updated').textContent = 'Updated 7:05 am';
      showList(false);
      paintStatuses();
      select('PT-2026-0142', false);
    }

    $$('[data-proto]').forEach(function (b) {
      b.addEventListener('click', function () {
        var what = b.getAttribute('data-proto');
        if (what === 'approve-plan') { openApprove(); }
        if (what === 'open-0149') { showList(false); select('PT-2026-0149', true); panel.scrollIntoView({ block: 'nearest' }); }
        if (what === 'list') { showList(true); }
        if (what === 'reset') { resetDashboard(); }
      });
    });

    resetData();
    paintStatuses();
    select('PT-2026-0142', false);
  }

  // === Section: 6. Driver's route ===

  /**
   * Set up the driver's route link (driver.html).
   * @returns {void}
   */
  function initDriver() {
    var list = $('#droute');
    if (!list) { return; }
    var items = $$('.dstop', list);
    var live = $('#live');
    var START_CLOCK = 9 * 60 + 40; // "Now" is 9:40 am (brief 4.4).
    var clock = START_CLOCK;
    var collapsed = true;
    var undoTimer = null;
    var undoSnapshot = null;
    var initial = items.map(function (li) {
      return { state: li.getAttribute('data-state'), at: li.getAttribute('data-done-at') || '' };
    });

    /**
     * Read the state of every stop.
     * @returns {Array<{state: string, at: string}>} One entry per stop.
     */
    function snapshot() {
      return items.map(function (li) {
        return { state: li.getAttribute('data-state'), at: li.getAttribute('data-done-at') || '' };
      });
    }

    /**
     * Put every stop back to a saved state.
     * @param {Array<{state: string, at: string}>} snap From snapshot().
     * @returns {void}
     */
    function restore(snap) {
      items.forEach(function (li, i) {
        li.setAttribute('data-state', snap[i].state);
        if (snap[i].at) { li.setAttribute('data-done-at', snap[i].at); } else { li.removeAttribute('data-done-at'); }
      });
    }

    /**
     * Whether a stop has been dealt with (done or no-show).
     * @param {Element} li A stop.
     * @returns {boolean} True when finished.
     */
    function finished(li) {
      var s = li.getAttribute('data-state');
      return s === 'done' || s === 'noshow';
    }

    /**
     * Make the first unfinished stop the next stop; the rest are upcoming.
     * @returns {?Element} The next stop, or null at the end of the day.
     */
    function setNext() {
      var next = null;
      items.forEach(function (li) {
        if (finished(li)) { return; }
        if (!next) { next = li; li.setAttribute('data-state', 'next'); } else { li.setAttribute('data-state', 'upcoming'); }
      });
      return next;
    }

    /**
     * Format a clock in minutes after midnight as a time.
     * @param {number} m Minutes after midnight.
     * @returns {string} For example "9:41 am".
     */
    function clockLabel(m) {
      return formatTime(Math.floor(m / 60), m % 60);
    }

    /**
     * Redraw the route in the current language: states, the black travelled
     * sections, status lines, times, passenger counts, "in N min" and the
     * progress strip (US-60).
     * @returns {void}
     */
    function render() {
      var next = setNext();
      var done = items.filter(finished).length;
      var lastFinished = -1;
      items.forEach(function (li, i) { if (finished(li)) { lastFinished = i; } });

      items.forEach(function (li, i) {
        var st = li.getAttribute('data-state');
        // A section turns black once the van has reached the stop at its end.
        var after = items[i + 1];
        li.classList.toggle('is-travelled', !!after && finished(after));
        // Collapsed: finished stops hide, except the most recent one.
        li.classList.toggle('is-collapsed', collapsed && finished(li) && i < lastFinished);

        $('[data-time-label]', li).textContent = timeLabel(li.getAttribute('data-time'));
        $('[data-pax-label]', li).textContent = paxLabel(parseInt(li.getAttribute('data-pax'), 10));

        var status = $('[data-status]', li);
        if (st === 'done' || st === 'noshow') {
          var at = timeLabel(li.getAttribute('data-done-at'));
          status.innerHTML = '<svg class="marker marker--' + (st === 'done' ? 'completed' : 'noshow') +
            '" aria-hidden="true" focusable="false"><use href="#m-' + (st === 'done' ? 'completed' : 'noshow') + '"/></svg>';
          status.appendChild(document.createTextNode(t(st === 'done' ? 'driver.doneat' : 'driver.noshowat', { time: at })));
          status.hidden = false;
        } else {
          status.hidden = true;
          status.textContent = '';
        }

        var inEl = $('[data-in]', li);
        if (li === next) {
          var mins = minutesOf(li.getAttribute('data-time')) - clock;
          inEl.textContent = mins > 0 ? t('driver.in', { min: mins }) : '';
        } else {
          inEl.textContent = '';
        }
      });

      list.classList.toggle('has-collapsed', collapsed && items.some(function (li) { return li.classList.contains('is-collapsed'); }));
      $('#progress-text').textContent = t('driver.progress', { done: done, total: items.length });
      $$('#progress-strip span').forEach(function (s, i) { s.classList.toggle('is-done', finished(items[i])); });
      var prog = $('#progress');
      prog.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      var upd = $('#updated');
      upd.textContent = t('driver.updated', { time: timeLabel(upd.getAttribute('data-time')) });
    }

    /**
     * Show the black Undo bar for 10 seconds.
     * @param {string} text What just happened, for example "Done at 9:41 am".
     * @returns {void}
     */
    function showUndo(text) {
      var bar = $('#undo-bar');
      $('#undo-text').textContent = text;
      bar.hidden = false;
      window.clearTimeout(undoTimer);
      undoTimer = window.setTimeout(function () { bar.hidden = true; undoSnapshot = null; }, 10000);
      announce(live, text);
    }

    /**
     * Move focus to the next stop's heading after an action, so keyboard and
     * screen-reader users carry on from the right place.
     * @returns {void}
     */
    function focusNext() {
      var next = items.filter(function (li) { return li.getAttribute('data-state') === 'next'; })[0];
      var target = next ? $('.dstop__head', next) : $('.dstop__end');
      target.setAttribute('tabindex', '-1');
      target.focus();
    }

    /**
     * Mark a stop done or no-show at the simulated time, with Undo.
     * @param {Element} li The stop.
     * @param {string} state "done" or "noshow".
     * @returns {void}
     */
    function finish(li, state) {
      undoSnapshot = { snap: snapshot(), clock: clock, stop: li };
      clock += 1;
      li.setAttribute('data-state', state);
      li.setAttribute('data-done-at', pad2(Math.floor(clock / 60)) + ':' + pad2(clock % 60));
      closeConfirm(li, false);
      render();
      showUndo(t(state === 'done' ? 'driver.doneat' : 'driver.noshowat', { time: clockLabel(clock) }));
      focusNext();
    }

    /**
     * Open the inline "Mark as no-show?" question for a stop.
     * @param {Element} li The stop.
     * @returns {void}
     */
    function openConfirm(li) {
      $('.dstop__actions', li).hidden = true;
      var c = $('[data-confirm]', li);
      c.hidden = false;
      $('.confirm__q', c).focus();
    }

    /**
     * Close the no-show question.
     * @param {Element} li The stop.
     * @param {boolean} refocus True to put focus back on the No-show button.
     * @returns {void}
     */
    function closeConfirm(li, refocus) {
      $('[data-confirm]', li).hidden = true;
      $('.dstop__actions', li).hidden = false;
      if (refocus) { $('[data-act="noshow"]', li).focus(); }
    }

    list.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]');
      if (!b) { return; }
      var li = b.closest('.dstop');
      var act = b.getAttribute('data-act');
      if (act === 'done') { finish(li, 'done'); }
      if (act === 'noshow') { openConfirm(li); }
      if (act === 'noshow-yes') { finish(li, 'noshow'); }
      if (act === 'noshow-back') { closeConfirm(li, true); }
      if (act === 'navigate') {
        // Q-17: the map service is not chosen yet, so Navigate shows a note.
        $('.dstop__navnote', li).hidden = false;
      }
    });

    // Escape closes the no-show question and returns focus (brief 3.3).
    list.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') { return; }
      var c = e.target.closest('[data-confirm]');
      if (c && !c.hidden) { closeConfirm(c.closest('.dstop'), true); }
    });

    $('#undo-btn').addEventListener('click', function () {
      if (!undoSnapshot) { return; }
      restore(undoSnapshot.snap);
      clock = undoSnapshot.clock;
      var stop = undoSnapshot.stop;
      undoSnapshot = null;
      $('#undo-bar').hidden = true;
      render();
      announce(live, t('driver.undo'));
      $('[data-act="done"]', stop).focus();
    });

    $('#progress').addEventListener('click', function () {
      collapsed = !collapsed;
      render();
    });

    /**
     * Put the route back to 9:40 am: stops 1 to 4 done, stop 5 next.
     * @returns {void}
     */
    function resetDriver() {
      restore(initial);
      clock = START_CLOCK;
      collapsed = true;
      undoSnapshot = null;
      window.clearTimeout(undoTimer);
      $('#undo-bar').hidden = true;
      $('#offline').hidden = true;
      items.forEach(function (li) { closeConfirm(li, false); $('.dstop__navnote', li).hidden = true; });
      render();
    }

    $$('[data-proto]').forEach(function (b) {
      b.addEventListener('click', function () {
        var what = b.getAttribute('data-proto');
        if (what === 'offline') { $('#offline').hidden = !$('#offline').hidden; }
        if (what === 'done') {
          var next = items.filter(function (li) { return li.getAttribute('data-state') === 'next'; })[0];
          if (next) { finish(next, 'done'); }
        }
        if (what === 'reset') { resetDriver(); }
      });
    });

    langHooks.push(function () {
      document.title = t('driver.title') + ' – ' + t('driver.van') + ' 1 – PolymathTransit';
      render();
      if (!$('#undo-bar').hidden && undoSnapshot) {
        var li = undoSnapshot.stop;
        var st = li.getAttribute('data-state');
        $('#undo-text').textContent = t(st === 'done' ? 'driver.doneat' : 'driver.noshowat', { time: timeLabel(li.getAttribute('data-done-at')) });
      }
    });

    render();
  }

  // === Section: 7. Start ===

  /**
   * Run the parts of the script that this page needs.
   * @returns {void}
   */
  function start() {
    document.documentElement.classList.add('js');
    var page = document.body.getAttribute('data-page');
    // Order matters: pages register their language hooks before the first
    // language is applied.
    if (page === 'request') { initRequest(); }
    if (page === 'driver') { initDriver(); }
    if (page === 'dashboard') { initDashboard(); }
    if (page === 'request' || page === 'driver') { initLanguage(); }
    runProtoFromUrl();
  }

  /**
   * Prototype only: run prototype controls named in the address, for
   * example "request.html?proto=errors" or "driver.html?proto=offline,done",
   * so each state can be linked to and screenshotted.
   * @returns {void}
   */
  function runProtoFromUrl() {
    var m = /[?&]proto=([a-z0-9,-]+)/.exec(window.location.search);
    if (!m) { return; }
    m[1].split(',').forEach(function (name) {
      var b = $('[data-proto="' + name + '"]');
      if (b) { b.click(); }
    });
  }

  start();
}());
