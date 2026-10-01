/**
 * @file PolymathTransit – Direction 2 "Inscription" – the only script.
 *
 * Enhances the four pages of this direction; every page works without it
 * (brief section 2). Loaded with `defer` as a classic script, so it runs from
 * the file system (no modules, no fetch).
 *
 * Sections:
 *   1. Strings (shared, brief 4.9) and this direction's extra drafts
 *   2. Helpers (time, date, text, DOM)
 *   3. Language switch (FR-65)
 *   4. Request form (FR-01 to FR-09, FR-54, FR-55, US-01, US-03, US-05)
 *   5. Dashboard (FR-19, FR-29, FR-34, US-16, US-22, US-26)
 *   6. Driver route (FR-61, FR-67, US-60, NFR-18)
 *   7. Start
 */
(function () {
  'use strict';

  // === Section: Strings ===

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
   * Strings this direction needs that brief 4.9 does not hold: the step
   * ladder's words, the skip link and a few joins. The Sinhala is a draft
   * by the ux-designer for native-speaker review (D-09), like all Sinhala
   * here. "‍" is the zero-width joiner inside conjuncts such as ප්‍ර.
   * @type {{en: Object<string, string>, si: Object<string, string>}}
   */
  const EXTRA = {
    en: {
      'x.skip': 'Skip to main content',
      'x.step.submitted': 'Submitted',
      'x.step.proposed': 'Proposed',
      'x.step.confirmed': 'Confirmed',
      'x.step.completed': 'Completed',
      'x.ladder.next': 'Next, a coordinator checks your trip.',
      'x.pickup.summary': '{time} ({flex}) from {place}',
      'x.return.summary': '{time} from {place}',
      'x.pax': '{n} passengers',
      'x.pax.one': '1 passenger',
      'x.flag.early': 'Early trip',
      'x.flag.fixed': 'Fixed trip',
      'x.done.stops': 'Stops done',
      'x.later': 'Later stops',
      'x.toast': 'Stop {n}: {what}'
    },
    si: {
      'x.skip': 'ප්‍රධාන අන්තර්ගතයට යන්න',
      'x.step.submitted': 'ඉදිරිපත් කළා',
      'x.step.proposed': 'යෝජනා කළා',
      'x.step.confirmed': 'තහවුරු කළා',
      'x.step.completed': 'නිම වුණා',
      'x.ladder.next': 'ඊළඟට, සම්බන්ධීකාරකවරයෙක් ඔබේ ගමන පරීක්ෂා කරයි.',
      'x.pickup.summary': '{place} සිට, {time} ({flex})',
      'x.return.summary': '{place} සිට, {time}',
      'x.pax': 'මගීන් {n}',
      'x.pax.one': 'මගීන් 1',
      'x.flag.early': 'උදෑසන කලින් ගමන',
      'x.flag.fixed': 'ස්ථිර ගමන',
      'x.done.stops': 'නිම කළ නැවතුම්',
      'x.later': 'පසුව ඇති නැවතුම්',
      'x.toast': 'නැවතුම {n}: {what}'
    }
  };

  // === Section: Helpers ===

  /** Current interface language: 'en' or 'si'. */
  let lang = 'en';

  /** True when the person asked for less motion (brief 3.7). */
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Finds one element.
   * @param {string} selector CSS selector.
   * @param {ParentNode} [root=document] Where to look.
   * @returns {?Element} The first match, or null.
   */
  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  /**
   * Finds every matching element as an array.
   * @param {string} selector CSS selector.
   * @param {ParentNode} [root=document] Where to look.
   * @returns {Element[]} The matches.
   */
  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  /**
   * Looks up a string in the current language and fills its placeholders.
   * @param {string} key Key from STRINGS or EXTRA.
   * @param {Object<string, (string|number)>} [vars] Values for {placeholders}.
   * @returns {string} The text, or the key itself if it is missing.
   */
  function t(key, vars) {
    const table = Object.assign({}, STRINGS[lang], EXTRA[lang]);
    let text = table[key];
    if (text === undefined) {
      text = Object.assign({}, STRINGS.en, EXTRA.en)[key];
    }
    if (text === undefined) {
      return key;
    }
    if (vars) {
      Object.keys(vars).forEach(function (name) {
        text = text.split('{' + name + '}').join(String(vars[name]));
      });
    }
    return text;
  }

  /**
   * Formats a Sri Lanka time for people (NFR-12): "8:45 am" in English,
   * "පෙ.ව. 8:45" in Sinhala. Never shows a time zone.
   * @param {number} hours Hours, 0 to 23.
   * @param {number} minutes Minutes, 0 to 59.
   * @param {string} [language] 'en' or 'si'; defaults to the current one.
   * @returns {string} The formatted time.
   */
  function formatTime(hours, minutes, language) {
    const use = language || lang;
    const am = hours < 12;
    const h12 = hours % 12 === 0 ? 12 : hours % 12;
    const clock = h12 + ':' + String(minutes).padStart(2, '0');
    if (use === 'si') {
      return (am ? STRINGS.si['time.am'] : STRINGS.si['time.pm']) + ' ' + clock;
    }
    return clock + ' ' + (am ? 'am' : 'pm');
  }

  /**
   * Formats minutes after midnight as a time (see formatTime).
   * @param {number} total Minutes after midnight.
   * @returns {string} The formatted time.
   */
  function formatMinutes(total) {
    return formatTime(Math.floor(total / 60), total % 60);
  }

  /**
   * Reads an English time such as "7:06 am" or a 24-hour value "07:06".
   * @param {string} text The time to read.
   * @returns {?number} Minutes after midnight, or null if it cannot be read.
   */
  function parseTime(text) {
    const twelve = /^(\d{1,2}):(\d{2})\s*(am|pm)$/i.exec(text.trim());
    if (twelve) {
      let h = Number(twelve[1]) % 12;
      if (twelve[3].toLowerCase() === 'pm') { h += 12; }
      return h * 60 + Number(twelve[2]);
    }
    const day = /^(\d{2}):(\d{2})$/.exec(text.trim());
    return day ? Number(day[1]) * 60 + Number(day[2]) : null;
  }

  /**
   * Formats a date as DD/MM/YYYY in both languages (NFR-12).
   * @param {Date} date The date.
   * @returns {string} For example "13/10/2026".
   */
  function formatDate(date) {
    return String(date.getDate()).padStart(2, '0') + '/' +
      String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
  }

  /**
   * Weekday and date, for example "Tuesday 13/10/2026" or
   * "අඟහරුවාදා 13/10/2026".
   * @param {Date} date The date.
   * @returns {string} The weekday name and the date.
   */
  function weekdayDate(date) {
    const keys = ['day.sunday', 'day.monday', 'day.tuesday', 'day.wednesday', 'day.thursday', 'day.friday', 'day.saturday'];
    const name = t(keys[date.getDay()]);
    return (name.indexOf('day.') === 0 ? date.toLocaleDateString('en-GB', { weekday: 'long' }) : name) + ' ' + formatDate(date);
  }

  /**
   * Reads a DD/MM/YYYY date typed by a person.
   * @param {string} text What was typed.
   * @returns {?Date} The date, or null when the format or the date is wrong.
   */
  function parseDate(text) {
    const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(text.trim());
    if (!match) { return null; }
    const date = new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
    const valid = date.getDate() === Number(match[1]) && date.getMonth() === Number(match[2]) - 1;
    return valid ? date : null;
  }

  /**
   * Escapes text for safe use inside HTML built by this script.
   * @param {string} text Any text.
   * @returns {string} The text with &, <, > and quotes escaped.
   */
  function esc(text) {
    return String(text).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /**
   * Builds the markup of one icon from the page's sprite.
   * @param {string} name Icon name without the "i-" prefix.
   * @param {string} [extra] Extra classes, for example "icon--16".
   * @returns {string} An inline SVG that screen readers skip.
   */
  function icon(name, extra) {
    return '<svg class="icon' + (extra ? ' ' + extra : '') + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }

  /**
   * Builds the markup of a status ladder glyph (brief 6.2).
   * @param {string} status Status key, for example "proposed".
   * @returns {string} An inline SVG that screen readers skip.
   */
  function glyph(status) {
    return '<svg class="glyph" aria-hidden="true"><use href="#g-' + status + '"/></svg>';
  }

  /**
   * Makes a reached ladder step rise, unless motion is reduced.
   * @param {?Element} step The ladder step that was just reached.
   * @returns {void}
   */
  function riseStep(step) {
    if (!step || reduceMotion) { return; }
    step.classList.remove('is-rising');
    void step.offsetWidth; // restart the animation on repeat approvals
    step.classList.add('is-rising');
  }

  // === Section: Language switch ===

  /**
   * Reads the remembered language. Storage can be blocked on file://, so
   * any failure falls back to English.
   * @returns {string} 'en' or 'si'.
   */
  function readStoredLang() {
    const fromUrl = /[?&]lang=(en|si)\b/.exec(window.location.search);
    if (fromUrl) { return fromUrl[1]; }
    try {
      const stored = window.localStorage.getItem('pt-lang');
      return stored === 'si' ? 'si' : 'en';
    } catch (error) {
      return 'en';
    }
  }

  /**
   * Remembers the language on this phone (FR-65), when storage is allowed.
   * @param {string} value 'en' or 'si'.
   * @returns {void}
   */
  function storeLang(value) {
    try {
      window.localStorage.setItem('pt-lang', value);
    } catch (error) {
      // Storage is blocked (some browsers on file://); the choice lasts for this visit.
    }
  }

  /**
   * Puts every translatable text, attribute and time into the current
   * language. Data shown as entered (names, places) carries lang="en" in the
   * markup and is never translated.
   * @returns {void}
   */
  function translatePage() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-label]').forEach(function (el) { el.setAttribute('label', t(el.getAttribute('data-i18n-label'))); });
    $$('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    $$('[data-i18n-tpl]').forEach(function (el) {
      const vars = {};
      if (el.dataset.time) { vars.time = formatMinutes(parseTime(el.dataset.time)); }
      if (el.dataset.done) { vars.done = el.dataset.done; }
      if (el.dataset.total) { vars.total = el.dataset.total; }
      el.textContent = t(el.getAttribute('data-i18n-tpl'), vars);
    });
    // Time options keep their 24-hour value; only the visible text changes.
    $$('select option[value]').forEach(function (option) {
      if (/^\d{2}:\d{2}$/.test(option.value)) {
        const total = parseTime(option.value);
        option.textContent = formatMinutes(total);
      }
    });
    $$('.lang-switch__option').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-lang') === lang));
    });
  }

  /**
   * Turns the two no-script language links into toggle buttons and switches
   * the page language when one is chosen (brief 3.5).
   * @returns {void}
   */
  function initLangSwitch() {
    $$('.lang-switch__option').forEach(function (link) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = link.className;
      button.setAttribute('lang', link.getAttribute('lang'));
      button.setAttribute('data-lang', link.getAttribute('data-lang'));
      button.innerHTML = link.innerHTML;
      button.addEventListener('click', function () {
        const chosen = button.getAttribute('data-lang');
        if (chosen === lang) { return; }
        lang = chosen;
        storeLang(lang);
        translatePage();
        rerenderForLanguage();
        const status = $('#lang-status');
        if (status) { status.textContent = t('lang.note'); }
      });
      link.parentNode.replaceChild(button, link);
    });
  }

  /** Hooks that each page registers to redraw its own built content. */
  const languageHooks = [];

  /**
   * Redraws content that the script built (summaries, errors, the route)
   * after the language changes.
   * @returns {void}
   */
  function rerenderForLanguage() {
    languageHooks.forEach(function (hook) { hook(); });
  }

  // === Section: Request form ===

  /**
   * Sets up the public request form: reveals, extra stops, the cutoff
   * message, the passenger stepper, validation and the confirmation.
   * @returns {void}
   */
  function initRequestForm() {
    const form = $('#request-form');
    if (!form) { return; }
    form.setAttribute('novalidate', '');

    /** Field ids the person has typed in; only these validate on blur. */
    const touched = new Set();
    /** Errors on show, as {fieldId: stringKey}, kept to re-translate. */
    let shownErrors = {};
    /** The last valid answers, kept to redraw the confirmation. */
    let submitted = null;
    /** Each control's own descriptions (hints), kept so errors add to them. */
    const baseDescribedBy = {};

    // --- Reveals: shown only when their trigger is chosen (FR-06, FR-52) ---
    /**
     * Shows or hides every revealed group to match the answers so far.
     * @returns {void}
     */
    function syncReveals() {
      $$('[data-reveal]', form).forEach(function (wrap) {
        const trigger = document.getElementById(wrap.getAttribute('data-reveal'));
        wrap.hidden = !(trigger && trigger.checked);
      });
      $$('[data-reveal-select]', form).forEach(function (wrap) {
        const select = document.getElementById(wrap.getAttribute('data-reveal-select'));
        wrap.hidden = !(select && select.value === 'other');
      });
    }
    form.addEventListener('change', syncReveals);
    syncReveals();

    $$('.map-btn', form).forEach(function (button) {
      // The map pin needs scripts (FR-52), so its button only shows with them.
      button.hidden = false;
      button.addEventListener('click', function () {
        document.getElementById(button.getAttribute('data-map-note')).hidden = false;
      });
    });

    // --- Extra stops (FR-54): up to three, one at a time ---
    const stopsDisclosure = $('#stops');
    const addStop = $('#add-stop');
    const stopRows = $$('[data-stop]', form);
    stopsDisclosure.open = true;
    $('summary', stopsDisclosure).hidden = true;
    stopRows.forEach(function (row) { row.hidden = true; });
    addStop.hidden = false;

    /**
     * Numbers the visible stop rows 1, 2, 3 and shows "+ Add a stop" while
     * fewer than three are open.
     * @returns {void}
     */
    function syncStops() {
      let shown = 0;
      stopRows.forEach(function (row) {
        if (!row.hidden) {
          shown += 1;
          $('.stop-row__legend .num', row).textContent = String(shown);
        }
      });
      addStop.hidden = shown >= stopRows.length;
    }
    addStop.addEventListener('click', function () {
      const next = stopRows.filter(function (row) { return row.hidden; })[0];
      if (!next) { return; }
      next.hidden = false;
      $$('[data-remove-stop]', next).forEach(function (b) { b.hidden = false; });
      syncStops();
      $('select', next).focus();
    });
    stopRows.forEach(function (row) {
      $('[data-remove-stop]', row).addEventListener('click', function () {
        row.hidden = true;
        $$('input, select', row).forEach(function (field) {
          if (field.type === 'radio') { field.checked = false; } else { field.value = ''; }
        });
        syncStops();
        addStop.focus();
      });
    });

    // --- Cutoff message under "Date of trip" (FR-07, BRL-13) ---
    const cutoff = $('#cutoff');
    const cutoffText = $('#cutoff-text');
    let cutoffKey = 'cutoff.open';
    /**
     * Shows the cutoff that applies to the chosen date, or nothing when no
     * special cutoff applies. role="status" announces the change.
     * @param {?string} key String key, or null for no message.
     * @returns {void}
     */
    function setCutoff(key) {
      cutoffKey = key;
      cutoffText.removeAttribute('data-i18n');
      cutoffText.textContent = key ? t(key) : '';
      cutoff.classList.toggle('is-empty', !key);
    }
    /**
     * Picks the cutoff message for a date (BRL-13): tomorrow closes at
     * 5:00 pm today; a Monday closes at 7:00 am on the Monday; today has
     * already closed at 7:00 am.
     * @param {?Date} date The chosen date.
     * @returns {?string} The string key, or null.
     */
    function cutoffFor(date) {
      if (!date) { return null; }
      const ymd = formatDate(date);
      if (ymd === '12/10/2026') { return 'cutoff.today.closed'; }
      if (ymd === '13/10/2026') { return 'cutoff.open'; }
      if (date.getDay() === 1) { return 'cutoff.monday'; }
      return null;
    }
    $$('input[name="date"]', form).forEach(function (radio) {
      radio.addEventListener('change', function () {
        if (radio.value === 'other') {
          setCutoff(cutoffFor(parseDate($('#date-other').value)));
        } else {
          setCutoff(radio.getAttribute('data-cutoff'));
        }
      });
    });
    $('#date-other').addEventListener('blur', function () {
      setCutoff(cutoffFor(parseDate(this.value)));
    });

    // --- Passenger stepper (US-03) ---
    const pax = $('#pax');
    const paxDown = $('#pax-down');
    const paxUp = $('#pax-up');
    paxDown.hidden = false;
    paxUp.hidden = false;
    /**
     * Shows the split message above 12 passengers (US-03 AC-3: information,
     * not an error) and marks "one fewer" as unavailable at 1.
     * @returns {void}
     */
    function syncPax() {
      const value = Number(pax.value);
      $('#pax-split').hidden = !(value > 12 && value <= 99);
      paxDown.setAttribute('aria-disabled', String(!(value > 1)));
    }
    paxDown.addEventListener('click', function () {
      const value = Number(pax.value) || 0;
      if (value > 1) { pax.value = String(value - 1); }
      touched.add('pax');
      syncPax();
      if (shownErrors.pax) { validateField('pax'); }
    });
    paxUp.addEventListener('click', function () {
      const value = Number(pax.value) || 0;
      if (value < 99) { pax.value = String(value + 1); }
      touched.add('pax');
      syncPax();
      if (shownErrors.pax) { validateField('pax'); }
    });
    pax.addEventListener('input', syncPax);
    syncPax();

    // --- Validation (FR-03, US-01 AC-2 to AC-4, US-03 AC-4) ---
    /**
     * The value of a radio group.
     * @param {string} name The group's name.
     * @returns {string} The chosen value, or '' when none is chosen.
     */
    function radioValue(name) {
      const chosen = $('input[name="' + name + '"]:checked', form);
      return chosen ? chosen.value : '';
    }

    /**
     * Checks one question and returns the key of its error message.
     * @param {string} id Field or group id, for example "phone".
     * @returns {?string} A string key, or null when the answer is fine.
     */
    function check(id) {
      switch (id) {
        case 'name':
          return $('#name').value.trim() ? null : 'err.name';
        case 'phone': {
          const raw = $('#phone').value.trim();
          if (!raw) { return 'err.phone.empty'; }
          // FR-03: 07X XXX XXXX, 0XX XXX XXXX or +94 followed by 9 digits.
          const digits = raw.replace(/[\s-]/g, '');
          return /^0\d{9}$/.test(digits) || /^\+94\d{9}$/.test(digits) ? null : 'err.phone.format';
        }
        case 'purpose':
          return radioValue('purpose') ? null : 'err.purpose';
        case 'date':
          return radioValue('date') ? null : 'err.date';
        case 'date-other': {
          if (radioValue('date') !== 'other') { return null; }
          const date = parseDate($('#date-other').value);
          if (!date) { return 'err.date.format'; }
          // The form's "now" is Monday 12/10/2026 (brief 4.4).
          return date < new Date(2026, 9, 12) ? 'err.date.past' : null;
        }
        case 'from':
          return $('#from').value ? null : 'err.from';
        case 'to':
          return $('#to').value ? null : 'err.to';
        case 'time':
          return $('#time').value ? null : 'err.time';
        case 'pax': {
          const value = pax.value.trim();
          return /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 99 ? null : 'err.pax';
        }
        case 'return':
          return radioValue('return') ? null : 'err.return';
        case 'return-time': {
          if (radioValue('return') !== 'yes') { return null; }
          const back = $('#return-time').value;
          if (!back) { return 'err.return.empty'; }
          const out = $('#time').value;
          return out && back <= out ? 'err.return.time' : null;
        }
        default:
          return null;
      }
    }

    /** Questions in page order, with where an error link should land. */
    const ORDER = [
      { id: 'name', focus: 'name' },
      { id: 'phone', focus: 'phone' },
      { id: 'purpose', focus: 'purpose-class' },
      { id: 'date', focus: 'date-13' },
      { id: 'date-other', focus: 'date-other' },
      { id: 'from', focus: 'from' },
      { id: 'to', focus: 'to' },
      { id: 'time', focus: 'time' },
      { id: 'pax', focus: 'pax' },
      { id: 'return', focus: 'return-yes' },
      { id: 'return-time', focus: 'return-time' }
    ];

    /**
     * Shows or clears the inline error of one question: message with an
     * icon, a brick rule, aria-invalid and aria-describedby (brief 3.3).
     * @param {string} id Question id.
     * @param {?string} key Error string key, or null to clear.
     * @returns {void}
     */
    function showError(id, key) {
      const wrap = document.getElementById('field-' + id);
      const message = document.getElementById(id + '-error');
      const control = document.getElementById(id);
      const target = control || wrap;
      if (!wrap || !message) { return; }
      if (!(id in baseDescribedBy)) { baseDescribedBy[id] = target.getAttribute('aria-describedby') || ''; }
      const base = baseDescribedBy[id];
      if (key) {
        shownErrors[id] = key;
        $('span', message).textContent = t(key);
        message.hidden = false;
        wrap.classList.add('is-error');
        target.setAttribute('aria-describedby', (base ? base + ' ' : '') + message.id);
        if (control) { control.setAttribute('aria-invalid', 'true'); }
      } else {
        delete shownErrors[id];
        message.hidden = true;
        wrap.classList.remove('is-error');
        if (base) { target.setAttribute('aria-describedby', base); } else { target.removeAttribute('aria-describedby'); }
        if (control) { control.removeAttribute('aria-invalid'); }
      }
    }

    /**
     * Checks one question and shows the result next to it.
     * @param {string} id Question id.
     * @returns {?string} The error key, or null.
     */
    function validateField(id) {
      const key = check(id);
      showError(id, key);
      return key;
    }

    // Validate on leaving a field, only after the person typed in it; never
    // on each keystroke (brief 5.2).
    ['name', 'phone', 'date-other', 'pax'].forEach(function (id) {
      const field = document.getElementById(id);
      field.addEventListener('input', function () { touched.add(id); });
      field.addEventListener('blur', function () {
        if (touched.has(id) || shownErrors[id]) { validateField(id); }
      });
    });
    // Choices clear their own error as soon as one is made.
    form.addEventListener('change', function (event) {
      const name = event.target.name;
      const map = { purpose: 'purpose', date: 'date', from: 'from', to: 'to', time: 'time', return: 'return', return_time: 'return-time' };
      if (map[name] && shownErrors[map[name]]) { validateField(map[name]); }
      if (name === 'date' && shownErrors['date-other'] && event.target.value !== 'other') { showError('date-other', null); }
      if (name === 'return' && event.target.value === 'no') { showError('return-time', null); }
    });

    const summary = $('#error-summary');
    /**
     * Fills the error summary: one link per error, in page order.
     * @param {Array<{id: string, focus: string, key: string}>} errors Errors found.
     * @returns {void}
     */
    function fillSummary(errors) {
      const list = $('#error-summary-list');
      list.innerHTML = errors.map(function (error) {
        return '<li><a href="#' + error.focus + '" data-focus="' + error.focus + '">' + esc(t(error.key)) + '</a></li>';
      }).join('');
    }
    summary.addEventListener('click', function (event) {
      const link = event.target.closest('a[data-focus]');
      if (!link) { return; }
      event.preventDefault();
      const target = document.getElementById(link.getAttribute('data-focus'));
      const wrap = target.closest('.field') || target;
      wrap.scrollIntoView({ block: 'start' });
      target.focus({ preventScroll: true });
    });

    /**
     * Validates every question; on errors shows the summary and moves focus
     * to it, keeping everything typed; otherwise shows the confirmation.
     * @param {Event} [event] The submit event.
     * @returns {void}
     */
    function submit(event) {
      if (event) { event.preventDefault(); }
      const errors = [];
      ORDER.forEach(function (item) {
        const key = validateField(item.id);
        if (key) { errors.push({ id: item.id, focus: item.focus, key: key }); }
      });
      if (errors.length) {
        fillSummary(errors);
        summary.hidden = false;
        summary.focus();
        summary.scrollIntoView({ block: 'start' });
        return;
      }
      summary.hidden = true;
      submitted = collectAnswers();
      showConfirmation();
    }
    form.addEventListener('submit', submit);

    /**
     * Reads the answers that the confirmation repeats.
     * @returns {Object} The answers.
     */
    function collectAnswers() {
      const dateRadio = $('input[name="date"]:checked', form);
      const place = function (id) {
        const select = document.getElementById(id);
        return select.value === 'other' ? (document.getElementById(id + '-address').value.trim() || t('place.other')) : select.value;
      };
      return {
        purpose: radioValue('purpose'),
        date: dateRadio.value === 'other' ? parseDate($('#date-other').value) : parseDate(dateRadio.value),
        time: parseTime($('#time').value),
        flex: radioValue('flex') || '10',
        from: place('from'),
        to: place('to'),
        pax: Number(pax.value),
        returns: radioValue('return') === 'yes',
        returnTime: parseTime($('#return-time').value || '00:00')
      };
    }

    /**
     * Shows "Request received" with the reference, the step ladder and a
     * summary built from the answers (FR-04, US-01 AC-5); focus moves to the
     * heading.
     * @returns {void}
     */
    function showConfirmation() {
      drawSummary();
      $$('[data-view="form"]').forEach(function (el) { el.hidden = true; });
      $$('[data-view="done"]').forEach(function (el) { el.hidden = false; });
      riseStep($('.ladder__step.is-current'));
      const title = $('#page-title');
      title.setAttribute('data-i18n', 'done.title');
      title.textContent = t('done.title');
      title.focus();
      window.scrollTo(0, 0);
    }

    /**
     * Writes the confirmation summary in the current language.
     * @returns {void}
     */
    function drawSummary() {
      if (!submitted) { return; }
      const a = submitted;
      const flexText = t(a.flex === '0' ? 'flex.exact' : 'flex.' + a.flex);
      const rows = [
        ['label.purpose', esc(t('purpose.' + a.purpose))],
        ['label.date', esc(weekdayDate(a.date))],
        ['label.pickup', esc(t('x.pickup.summary', { time: formatMinutes(a.time), flex: flexText, place: '\u0001' })).replace('\u0001', '<span lang="en">' + esc(a.from) + '</span>')],
        ['label.goingto', '<span lang="en">' + esc(a.to) + '</span>'],
        ['label.passengers', String(a.pax)],
        ['label.return', a.returns ? esc(t('x.return.summary', { time: formatMinutes(a.returnTime), place: '\u0001' })).replace('\u0001', '<span lang="en">' + esc(a.to) + '</span>') : esc(t('no'))]
      ];
      $('#done-summary').innerHTML = rows.map(function (row) {
        return '<dt>' + esc(t(row[0])) + '</dt><dd>' + row[1] + '</dd>';
      }).join('');
    }

    languageHooks.push(function () {
      Object.keys(shownErrors).forEach(function (id) { showError(id, shownErrors[id]); });
      if (!summary.hidden) {
        fillSummary(ORDER.filter(function (item) { return shownErrors[item.id]; }).map(function (item) {
          return { id: item.id, focus: item.focus, key: shownErrors[item.id] };
        }));
      }
      setCutoff(cutoffKey);
      drawSummary();
    });

    // --- Prototype controls ---
    /**
     * Fills the form with the answers for PT-2026-0142 (brief 4.5).
     * @returns {void}
     */
    function fillSample() {
      $('#name').value = 'Kasun Jayasinghe';
      $('#phone').value = '077 000 0142';
      $('#purpose-sport').checked = true;
      $('#date-13').checked = true;
      setCutoff('cutoff.open');
      $('#from').value = 'Branch B';
      $('#to').value = 'Sports Centre';
      $('#time').value = '08:45';
      $('input[name="flex"][value="10"]', form).checked = true;
      pax.value = '4';
      $('#return-yes').checked = true;
      syncReveals();
      $('#return-time').value = '10:45';
      syncPax();
      ORDER.forEach(function (item) { showError(item.id, null); });
      summary.hidden = true;
    }
    /**
     * Puts the page back to an empty form.
     * @returns {void}
     */
    function resetForm() {
      form.reset();
      submitted = null;
      shownErrors = {};
      touched.clear();
      ORDER.forEach(function (item) { showError(item.id, null); });
      summary.hidden = true;
      stopRows.forEach(function (row) { row.hidden = true; });
      syncStops();
      $$('.map-note').forEach(function (n) { n.hidden = true; });
      $$('[data-view="form"]').forEach(function (el) { el.hidden = false; });
      $$('[data-view="done"]').forEach(function (el) { el.hidden = true; });
      $('#page-title').setAttribute('data-i18n', 'form.title');
      $('#page-title').textContent = t('form.title');
      setCutoff('cutoff.open');
      syncReveals();
      syncPax();
      window.scrollTo(0, 0);
    }
    $$('[data-proto]').forEach(function (button) {
      button.addEventListener('click', function () {
        const action = button.getAttribute('data-proto');
        if (action === 'fill') { resetForm(); fillSample(); }
        if (action === 'errors') { resetForm(); submit(); }
        if (action === 'confirm') { resetForm(); fillSample(); submit(); }
        if (action === 'reset') { resetForm(); $('#name').focus(); }
      });
    });
    $('#done-another').addEventListener('click', function (event) {
      event.preventDefault();
      resetForm();
      $('#main').focus();
    });
  }

  // === Section: Dashboard ===

  /**
   * Bookings for Tuesday 13/10/2026 (brief 4.5 and 4.7), as the dashboard's
   * detail panel shows them.
   * @type {Object<string, Object>}
   */
  const BOOKINGS = {
    'PT-2026-0131': { requester: 'Dilini Fernando', phone: '077 000 0131', purpose: 'Staff errand', route: 'Branch A (main branch) to Branch C', pickup: '7:30 am (arrives 7:55 am)', pax: 2, ret: 'No', van: 'Van 1', status: 'confirmed', flags: ['early'], audit: 'Confirmed individually on 12/10/2026.' },
    'PT-2026-0119': { requester: 'Ruwan Silva', phone: '077 000 0119', requesterNote: 'series contact', purpose: 'Sport: Grade 7 Swimming', route: 'Branch A (main branch) to Aquatic Centre', pickup: '9:05 am (arrives 9:30 am)', pax: 11, ret: 'Yes, 11:30 am from Aquatic Centre, back 11:55 am; van need not stay', van: 'Van 1', status: 'proposed', flags: ['fixed'], series: 'Grade 7 Swimming – every Tuesday this term' },
    'PT-2026-0145': { requester: 'Shamila Rodrigo', phone: '077 000 0145', purpose: 'Staff errand', route: 'Branch B to Stationery supplier and back to Branch B', pickup: '10:00 am (back 10:50 am)', pax: 1, ret: 'Round trip with a wait', van: 'Van 1', status: 'proposed', flags: ['gap'],
      explain: ['Van 1: gap job while Grade 7 Swimming is at the Aquatic Centre.', 'Leaves the Aquatic Centre at 9:35 am and is back at 11:10 am,', '20 minutes before the 11:30 am return pickup (the safety buffer is 15 minutes).', 'No second van needed.'] },
    'PT-2026-0140': { requester: 'Nimal Perera', phone: '077 000 0140', purpose: 'Meeting or event', route: 'Branch A (main branch) to Branch C', pickup: '8:25 am (arrives 8:55 am)', pax: 3, ret: 'No', van: 'Van 2', status: 'proposed', flags: ['shared'] },
    'PT-2026-0142': { requester: 'Kasun Jayasinghe', phone: '077 000 0142', purpose: 'Sport', route: 'Branch B to Sports Centre', pickup: '8:45 am ± 10 min; planned 8:40 am (arrives 9:10 am)', pax: 4, ret: 'Yes, 10:45 am from Sports Centre (back 11:05 am)', van: 'Van 2', status: 'proposed', flags: ['shared'],
      explain: ['Van 2: added to the 8:25 am run from Branch A, shared with PT-2026-0140.', 'Pickup at Branch B at 8:40 am, within the requested 8:45 am ± 10 min.', '7 of 8 seats used at the busiest point.', 'The 3 passengers from Branch A ride 6 minutes longer, within their limit.', 'Saves a separate 35-minute van run.', 'Van 1 not used: it must leave Branch A at 9:05 am for Grade 7 Swimming.'],
      run: { van: 'Van 2', seats: 8, stops: [['8:25 am', 'Branch A (main branch)', 'Pick up 3', 3, '3'], ['8:40 am', 'Branch B', 'Pick up 4', 7, '7 of 8'], ['8:55 am', 'Branch C', 'Drop off 3', 4, '4'], ['9:10 am', 'Sports Centre', 'Drop off 4', 0, '0']] } },
    'PT-2026-0147': { requester: 'Sanduni Herath', phone: '077 000 0147', purpose: 'Staff errand', route: 'Branch C to a map pin: "Opposite the temple, 2nd lane"', pickup: '11:20 am (arrives 11:40 am)', pax: 3, ret: 'No', van: 'Van 2 (route found)', status: 'attention', flags: ['newreq'],
      explain: ['New requester: this phone number has not been used before. Check before approving.', 'Route found: Van 2, pickup at Branch C at 11:20 am.', 'The drop-off was placed with a map pin and the note "Opposite the temple, 2nd lane".'] },
    'PT-2026-0149': { requester: 'Mahesh Kumara', phone: '077 000 0149', purpose: 'Sport: Grade 9 inter-house practice', route: 'Branch A (main branch) to Sports Centre', pickup: '1:00 pm', pax: 20, ret: 'Yes, 3:00 pm', van: 'Not placed', status: 'attention', flags: [],
      explain: ['No single van fits: the group of 20 is larger than the largest van (12 seats).', 'At 1:00 pm, Van 1 cannot help: it must be back at Branch A for 1:30 pm (PT-2026-0150).', 'Van 2 alone has 8 seats.', 'Alternatives:', '1. Split across Van 1 (12) and Van 2 (8), both leaving Branch A at 12:15 pm (45 minutes earlier).', '2. Extra hire van needed for 1:00 pm.'] },
    'PT-2026-0150': { requester: 'Priyanka Wijesekara', phone: '077 000 0150', purpose: 'Meeting or event', route: 'Branch A (main branch) to Branch B', pickup: '1:30 pm (arrives 1:45 pm)', pax: 6, ret: 'Yes, 3:30 pm from Branch B (back 3:45 pm)', van: 'Van 1', status: 'proposed', flags: [] },
    'PT-2026-0153': { requester: 'Tharindu Bandara', phone: '077 000 0153', requesterNote: 'by phone', purpose: 'Staff errand', route: 'Branch C to Branch A (main branch)', pickup: '2:15 pm (arrives 2:40 pm)', pax: 2, ret: 'No', van: 'Van 2', status: 'proposed', flags: ['late'],
      audit: 'Added by Ravi Gunasekara at 6:55 am today. Source: Phone. Reason: "Exam papers must reach the main office."' },
    'PT-2026-0151': { requester: 'Chathurika de Alwis', phone: '077 000 0151', purpose: 'Class trip: drama rehearsal', route: 'Branch B to Branch A (main branch)', pickup: '5:45 pm (arrives 6:05 pm)', pax: 7, ret: 'No', van: 'Van 2', status: 'proposed', flags: ['hours'] }
  };

  /** Order of the bookings in the list view and the tiles (by time). */
  const LIST_ORDER = ['PT-2026-0131', 'PT-2026-0140', 'PT-2026-0142', 'PT-2026-0119', 'PT-2026-0145', 'PT-2026-0147', 'PT-2026-0149', 'PT-2026-0150', 'PT-2026-0153', 'PT-2026-0151'];

  /** Status words and their ladder positions (brief 6.2 status treatment). */
  const STATUS = {
    submitted: { word: 'Submitted', step: 1 },
    proposed: { word: 'Proposed', step: 2 },
    confirmed: { word: 'Confirmed', step: 3 },
    completed: { word: 'Completed', step: 4 },
    attention: { word: 'Needs attention', drop: 2, colour: '' },
    declined: { word: 'Declined', drop: 3, colour: 'drop--brick' },
    noshow: { word: 'No-show', drop: 4, colour: 'drop--brick' },
    cancelled: { word: 'Cancelled', drop: 3, colour: 'drop--ink' }
  };

  /** Flag words and icons (brief 6.2: italic words with a small icon). */
  const FLAGS = {
    shared: ['shared', 'Shared'],
    gap: ['gap', 'Gap job'],
    early: ['early', 'Early trip'],
    late: ['late', 'Late (exception)'],
    fixed: ['repeat', 'Fixed trip'],
    newreq: ['newreq', 'New requester'],
    hours: ['hours', 'Out of hours']
  };

  /**
   * Builds a status badge: ladder glyph, the word, a rule and a tint.
   * @param {string} status Status key.
   * @returns {string} Badge markup.
   */
  function badge(status) {
    return '<span class="badge badge--' + status + '">' + glyph(status) + '<span class="badge__word">' + STATUS[status].word + '</span></span>';
  }

  /**
   * Builds a list of flags.
   * @param {string[]} flags Flag keys.
   * @returns {string} Flags markup, or '' when there are none.
   */
  function flagList(flags) {
    if (!flags.length) { return ''; }
    return '<ul class="flags">' + flags.map(function (f) {
      return '<li class="flag">' + icon(FLAGS[f][0], 'icon--16') + FLAGS[f][1] + '</li>';
    }).join('') + '</ul>';
  }

  /**
   * Builds the four-step ladder for a booking (signature, brief 6.2).
   * Steps before the status are done, the status's step is current; an
   * off-ladder status drops its step below the line and names it.
   * @param {string} status Status key.
   * @param {string} ref Booking reference, for the list's name.
   * @returns {string} Ladder markup.
   */
  function bookingLadder(status, ref) {
    const words = ['Submitted', 'Proposed', 'Confirmed', 'Completed'];
    const info = STATUS[status];
    return '<ol class="ladder panel__ladder" aria-label="Where ' + ref + ' stands">' + words.map(function (word, i) {
      const n = i + 1;
      let cls = '';
      let label = word;
      let current = '';
      if (info.step) {
        if (n < info.step) { cls = ' is-done'; }
        if (n === info.step) { cls = ' is-current'; current = ' aria-current="step"'; }
      } else {
        if (n < info.drop) { cls = ' is-done'; }
        if (n === info.drop) { cls = ' is-dropped ' + info.colour; label = info.word; current = ' aria-current="step"'; }
      }
      return '<li class="ladder__step' + cls + '"' + current + ' style="--rise: ' + n + '"><span class="ladder__block"></span><span class="ladder__drop"></span><span class="ladder__label">' +
        icon('check', 'icon--16') + ' ' + label + '</span></li>';
    }).join('') + '</ol>';
  }

  /**
   * Builds the run summary table with seats on board at each stop.
   * @param {Object} run Run data (van, seats, stops).
   * @returns {string} Table markup.
   */
  function runTable(run) {
    return '<div class="table-wrap"><table class="table run-table"><caption>Run summary, ' + run.van + '</caption>' +
      '<thead><tr><th scope="col">Time</th><th scope="col">Place</th><th scope="col">Action</th><th scope="col">On board</th></tr></thead><tbody>' +
      run.stops.map(function (s) {
        let seats = '';
        for (let i = 0; i < run.seats; i += 1) { seats += '<i' + (i < s[3] ? ' class="is-taken"' : '') + '></i>'; }
        return '<tr><td class="num">' + s[0] + '</td><th scope="row">' + s[1] + '</th><td>' + s[2] + '</td><td><span class="num">' + s[4] + '</span><span class="seats" aria-hidden="true">' + seats + '</span></td></tr>';
      }).join('') + '</tbody></table></div>';
  }

  /**
   * Builds the detail panel's contents for one booking.
   * @param {string} ref Booking reference.
   * @returns {string} Panel markup.
   */
  function panelMarkup(ref) {
    const b = BOOKINGS[ref];
    const facts = [
      ['Requester', b.requester + (b.requesterNote ? ' (' + b.requesterNote + ')' : '') + ', <span class="num">' + b.phone + '</span>'],
      ['Trip for', b.purpose],
      ['Date', 'Tuesday <span class="num">13/10/2026</span>'],
      ['Route', esc(b.route)],
      ['Pick up', b.pickup],
      ['Passengers', String(b.pax)],
      ['Return', b.ret],
      ['Van', b.van]
    ];
    if (b.series) { facts.splice(2, 0, ['Series', b.series]); }
    let actions = '';
    if (b.status === 'proposed' || ref === 'PT-2026-0147') {
      actions = '<button class="btn btn--primary" type="button" data-act="approve">' + icon('check') + 'Approve</button>' +
        '<button class="btn btn--secondary" type="button" data-act="change">Change</button>' +
        '<button class="btn btn--danger btn-row__apart" type="button" data-act="decline">' + icon('cross') + 'Decline</button>';
    } else if (b.status === 'attention') {
      actions = '<button class="btn btn--primary" type="button" data-act="change">Choose an alternative</button>' +
        '<button class="btn btn--danger btn-row__apart" type="button" data-act="decline">' + icon('cross') + 'Decline</button>';
    } else {
      actions = '<button class="btn btn--secondary" type="button" data-act="change">Change</button>';
    }
    const audit = b.audit || (b.status === 'proposed' || b.status === 'attention' ? 'Planned by the system at 5:00 pm on 12/10/2026 (Optimise day).' : '');
    return '<p class="t-inscription panel__kicker">Booking</p>' +
      '<div class="panel__head"><h2 class="t-title ref" id="panel-title" tabindex="-1">' + ref + '</h2>' + badge(b.status) + flagList(b.flags) + '</div>' +
      bookingLadder(b.status, ref) +
      '<div class="panel__grid"><div>' +
      '<dl class="facts">' + facts.map(function (f) { return '<dt>' + f[0] + '</dt><dd>' + f[1] + '</dd>'; }).join('') + '</dl>' +
      (b.explain ? '<div class="explain"><h3 class="t-inscription">Why this plan</h3><ul class="explain__lines t-voice">' +
        b.explain.map(function (line) { return '<li>' + esc(line) + '</li>'; }).join('') + '</ul></div>' : '') +
      '</div><div>' +
      (b.run ? runTable(b.run) : '') +
      '<div class="panel__status" id="panel-status" role="status"></div>' +
      '<div class="btn-row panel__actions">' + actions + '</div>' +
      (audit ? '<p class="audit">' + esc(audit) + '</p>' : '') +
      '</div></div>';
  }

  /**
   * Builds one row of the list view.
   * @param {string} ref Booking reference.
   * @returns {string} Table row markup.
   */
  function listRow(ref) {
    const b = BOOKINGS[ref];
    return '<tr data-ref="' + ref + '"><td class="num">' + b.pickup.split(' (')[0].split(' ±')[0] + '</td>' +
      '<th scope="row"><button class="table__ref" type="button" data-open="' + ref + '">' + ref + '</button></th>' +
      '<td>' + b.requester + '</td><td>' + esc(b.route) + '</td><td class="is-numeric num">' + b.pax + '</td><td>' + b.van + '</td>' +
      '<td>' + badge(b.status) + '</td><td>' + flagList(b.flags) + '</td></tr>';
  }

  /**
   * Sets up the dashboard: blocks open the panel, Approve with Undo, the
   * plan approval dialog, the list view and the prototype controls.
   * @returns {void}
   */
  function initDashboard() {
    const panel = $('#panel');
    if (!panel || !$('.dash')) { return; }
    let openRef = 'PT-2026-0142';
    let undoTimer = null;

    /**
     * Opens a booking in the detail panel and marks its blocks as open.
     * @param {string} ref Booking reference.
     * @param {boolean} moveFocus Whether focus moves to the panel's heading.
     * @returns {void}
     */
    function openBooking(ref, moveFocus) {
      openRef = ref;
      panel.innerHTML = panelMarkup(ref);
      $$('.tl-block').forEach(function (block) {
        if (block.getAttribute('data-ref') === ref) { block.setAttribute('aria-current', 'true'); } else { block.removeAttribute('aria-current'); }
      });
      if (!reduceMotion) {
        panel.classList.remove('is-entering');
        void panel.offsetWidth;
        panel.classList.add('is-entering');
      }
      if (moveFocus) {
        panel.scrollIntoView({ block: 'start' });
        $('#panel-title').focus({ preventScroll: true });
      }
    }

    /**
     * Shows the new status of a booking everywhere it appears: timeline
     * blocks (glyph, colour and name), list row and counts.
     * @param {string} ref Booking reference.
     * @returns {void}
     */
    function paintStatus(ref) {
      const status = BOOKINGS[ref].status;
      $$('.tl-block[data-ref="' + ref + '"]').forEach(function (block) {
        block.classList.remove('tl-block--proposed', 'tl-block--confirmed', 'tl-block--attention', 'tl-block--tentative');
        block.classList.add('tl-block--' + status);
        // A booking that needs attention is not in the plan: dashed edge.
        if (status === 'attention') { block.classList.add('tl-block--tentative'); }
        $('.glyph use', block).setAttribute('href', '#g-' + status);
        // Names are rebuilt from the original so Undo restores them exactly.
        if (!block.dataset.label) { block.dataset.label = block.getAttribute('aria-label'); }
        let name = block.dataset.label.replace(/Proposed|Confirmed|Needs attention/, STATUS[status].word);
        if (status !== 'attention') { name = name.replace(', route found but not in the plan', ''); }
        block.setAttribute('aria-label', name);
      });
      const row = $('#list-body tr[data-ref="' + ref + '"]');
      if (row) { row.outerHTML = listRow(ref); }
      const waiting = LIST_ORDER.filter(function (r) { return BOOKINGS[r].status === 'proposed'; });
      $('#count-proposed').textContent = String(waiting.length);
      $('#count-proposed-detail').textContent = waiting.length ? waiting.join(', ').replace(/, PT-2026-/g, ', ') : 'None';
    }

    /**
     * Approves one proposal (FR-30): Confirmed in the panel, the timeline
     * and the counts, with Undo for 10 seconds.
     * @param {string} ref Booking reference.
     * @returns {void}
     */
    function approve(ref) {
      BOOKINGS[ref].status = 'confirmed';
      openBooking(ref, false);
      paintStatus(ref);
      riseStep($('.panel__ladder .is-current', panel));
      const message = ref + ' confirmed. ' + BOOKINGS[ref].requester + ' will get a text.';
      // The panel was just redrawn, so its status region is new: fill it a
      // moment later so screen readers announce the message.
      window.setTimeout(function () {
        $('#panel-status').innerHTML = '<div class="toast">' + icon('check') + '<p class="toast__text">' + esc(message) + '</p>' +
          '<button class="btn btn--quiet" type="button" data-act="undo">' + icon('undo') + 'Undo</button></div>';
        $('[data-act="undo"]', panel).focus();
      }, 50);
      window.clearTimeout(undoTimer);
      undoTimer = window.setTimeout(function () {
        const box = $('#panel-status');
        if (box && openRef === ref) { box.innerHTML = '<p class="t-small">' + esc(message) + '</p>'; }
      }, 10000);
    }

    panel.addEventListener('click', function (event) {
      const button = event.target.closest('[data-act]');
      if (!button) { return; }
      const act = button.getAttribute('data-act');
      if (act === 'approve') { approve(openRef); }
      if (act === 'undo') {
        window.clearTimeout(undoTimer);
        BOOKINGS[openRef].status = openRef === 'PT-2026-0147' ? 'attention' : 'proposed';
        openBooking(openRef, false);
        paintStatus(openRef);
        $('#panel-status').innerHTML = '<p class="t-small">Approval undone. ' + openRef + ' is ' + STATUS[BOOKINGS[openRef].status].word.toLowerCase() + ' again.</p>';
        $('[data-act="approve"]', panel).focus();
      }
      if (act === 'change' || act === 'decline') {
        $('#panel-status').innerHTML = '<p class="proto-note">Prototype: "' + esc(button.textContent.trim()) + '" is not built in this option.</p>';
      }
    });

    $$('.tl-block').forEach(function (block) {
      block.addEventListener('click', function () { openBooking(block.getAttribute('data-ref'), true); });
    });
    $('#list-body').addEventListener('click', function (event) {
      const button = event.target.closest('[data-open]');
      if (button) { openBooking(button.getAttribute('data-open'), true); }
    });

    // --- List view toggle (FR-29) ---
    const toggle = $('#toggle-list');
    /**
     * Shows the bookings as a table or as the timeline.
     * @param {boolean} asList True for the table.
     * @returns {void}
     */
    function showList(asList) {
      toggle.setAttribute('aria-pressed', String(asList));
      $('#list-view').hidden = !asList;
      $('#timeline-view').hidden = asList;
    }
    toggle.addEventListener('click', function () { showList(toggle.getAttribute('aria-pressed') !== 'true'); });
    $$('.tile, .plan__note a').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        showList(true);
        $('#day-view').scrollIntoView({ block: 'start' });
        $('#list-view caption').setAttribute('tabindex', '-1');
        $('#list-view caption').focus({ preventScroll: true });
      });
    });

    // --- Approve today's plan (FR-34, BRL-21) ---
    const dialog = $('#approve-dialog');
    const trigger = $('#approve-plan');
    /**
     * Opens the confirmation step; Escape or "Not now" closes it and focus
     * returns to the button that opened it.
     * @returns {void}
     */
    function openDialog() {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      $('#approve-yes').focus();
    }
    /**
     * Closes the dialog and returns focus.
     * @param {?Element} [focusTo] Where focus goes; the trigger by default.
     * @returns {void}
     */
    function closeDialog(focusTo) {
      if (dialog.open) { dialog.close(); }
      (focusTo || trigger).focus();
    }
    trigger.addEventListener('click', openDialog);
    $('#approve-no').addEventListener('click', function () { closeDialog(); });
    dialog.addEventListener('cancel', function (event) {
      event.preventDefault();
      closeDialog();
    });
    $('#approve-yes').addEventListener('click', function () {
      LIST_ORDER.forEach(function (ref) {
        if (BOOKINGS[ref].status === 'proposed') {
          BOOKINGS[ref].status = 'confirmed';
          paintStatus(ref);
        }
      });
      openBooking(openRef, false);
      const steps = $$('#day-ladder .ladder__step');
      steps[0].classList.replace('is-current', 'is-done');
      steps[0].removeAttribute('aria-current');
      steps[1].classList.add('is-current');
      steps[1].setAttribute('aria-current', 'step');
      riseStep(steps[1]);
      $('#plan-state').textContent = 'Approved';
      $('#plan-deadline').hidden = true;
      trigger.hidden = true;
      const done = $('#plan-done');
      done.hidden = false;
      $('#plan-done-text').textContent = 'Plan approved at 7:06 am. Final details are going to 8 requesters and route links to 2 drivers.';
      done.setAttribute('tabindex', '-1');
      closeDialog(done);
    });

    // --- Prototype controls ---
    $$('[data-proto]').forEach(function (button) {
      button.addEventListener('click', function () {
        const action = button.getAttribute('data-proto');
        if (action === 'approve-plan') {
          if (trigger.hidden) { return; }
          trigger.scrollIntoView({ block: 'center' });
          openDialog();
        }
        if (action === 'open-0149') { showList(false); openBooking('PT-2026-0149', true); }
        if (action === 'list') { showList(true); $('#day-view').scrollIntoView({ block: 'start' }); }
        if (action === 'reset') { window.location.reload(); }
      });
    });

    // The static panel and list are the same markup, drawn again so that
    // later changes come from one place.
    $('#list-body').innerHTML = LIST_ORDER.map(listRow).join('');
    openBooking(openRef, false);
  }

  // === Section: Driver route ===

  /**
   * Van 1's stops for Tuesday 13/10/2026 (brief 4.6). Times are minutes
   * after midnight; doneAt is the actual time for stops already done.
   * @type {Array<Object>}
   */
  const STOPS = [
    { n: 1, at: 450, place: 'Branch A (main branch)', act: 'pickup', pax: 2, ref: 'PT-2026-0131', contact: ['Dilini Fernando', '077 000 0131', '+94770000131'], flag: 'early', doneAt: 451 },
    { n: 2, at: 475, place: 'Branch C', act: 'dropoff', pax: 2, ref: 'PT-2026-0131', doneAt: 476 },
    { n: 3, at: 545, place: 'Branch A (main branch)', act: 'pickup', pax: 11, ref: 'PT-2026-0119, Grade 7 Swimming', contact: ['Ruwan Silva', '077 000 0119', '+94770000119'], note: 'Swimming bags go in the back.', flag: 'fixed', doneAt: 546 },
    { n: 4, at: 570, place: 'Aquatic Centre', act: 'dropoff', pax: 11, ref: 'PT-2026-0119', note: 'Return pickup here at 11:30 am.', doneAt: 569 },
    { n: 5, at: 600, place: 'Branch B', act: 'pickup', pax: 1, ref: 'PT-2026-0145', contact: ['Shamila Rodrigo', '077 000 0145', '+94770000145'], flag: 'gap' },
    { n: 6, at: 620, place: 'Stationery supplier', act: 'dropoff', pax: 1, ref: 'PT-2026-0145', note: 'Wait about 15 minutes.' },
    { n: 7, at: 635, place: 'Stationery supplier', act: 'pickup', pax: 1, ref: 'PT-2026-0145', contact: ['Shamila Rodrigo', '077 000 0145', '+94770000145'], note: 'She returns with boxes.' },
    { n: 8, at: 650, place: 'Branch B', act: 'dropoff', pax: 1, ref: 'PT-2026-0145', note: 'Then go to the Aquatic Centre (arrive by 11:10 am).' },
    { n: 9, at: 690, place: 'Aquatic Centre', act: 'pickup', pax: 11, ref: 'PT-2026-0119', contact: ['Ruwan Silva', '077 000 0119', '+94770000119'] },
    { n: 10, at: 715, place: 'Branch A (main branch)', act: 'dropoff', pax: 11, ref: 'PT-2026-0119' },
    { n: 11, at: 810, place: 'Branch A (main branch)', act: 'pickup', pax: 6, ref: 'PT-2026-0150', contact: ['Priyanka Wijesekara', '077 000 0150', '+94770000150'] },
    { n: 12, at: 825, place: 'Branch B', act: 'dropoff', pax: 6, ref: 'PT-2026-0150' },
    { n: 13, at: 930, place: 'Branch B', act: 'pickup', pax: 6, ref: 'PT-2026-0150', contact: ['Priyanka Wijesekara', '077 000 0150', '+94770000150'] },
    { n: 14, at: 945, place: 'Branch A (main branch)', act: 'dropoff', pax: 6, ref: 'PT-2026-0150' }
  ];

  /** Flag icons and string keys on the driver page. */
  const DRIVER_FLAGS = { gap: ['gap', 'driver.gap'], early: ['early', 'x.flag.early'], fixed: ['repeat', 'x.flag.fixed'] };

  /**
   * Sets up the driver's route: next stop, Done and No-show with Undo,
   * Navigate, the offline banner and the prototype controls.
   * @returns {void}
   */
  function initDriver() {
    if (!$('#next-wrap')) { return; }
    /** The page's "now": 9:40 am; each action moves it on a minute. */
    let clock = 580;
    /** Results by stop number: {type: 'done'|'noshow', at: minutes}. */
    let results = {};
    /** Stop number whose No-show is waiting for "Yes" or "Go back". */
    let confirming = null;
    /** The stop number the toast's Undo would restore. */
    let lastAction = null;
    let toastTimer = null;
    STOPS.forEach(function (s) { if (s.doneAt) { results[s.n] = { type: 'done', at: s.doneAt }; } });

    /**
     * Passengers in the current language: "1 passenger", "මගීන් 11".
     * @param {number} n Number of passengers.
     * @returns {string} The text.
     */
    function paxText(n) {
      return n === 1 ? t('x.pax.one') : t('x.pax', { n: n });
    }

    /**
     * What happens at a stop, with icons.
     * @param {Object} s Stop.
     * @returns {string} Markup.
     */
    function whatMarkup(s) {
      return '<p class="stop__what">' + icon(s.act) + '<strong>' + esc(t(s.act === 'pickup' ? 'driver.pickup' : 'driver.dropoff')) + '</strong>' +
        '<span aria-hidden="true">·</span><span class="pax">' + icon('passengers', 'icon--20') + esc(paxText(s.pax)) + '</span></p>';
    }

    /**
     * Contact line with a Call link, when the stop has a contact.
     * @param {Object} s Stop.
     * @returns {string} Markup, or ''.
     */
    function contactMarkup(s) {
      if (!s.contact) { return ''; }
      return '<div class="contact"><span>' + esc(t('driver.contact')) + ': <span lang="en">' + s.contact[0] + '</span><br><span class="num" lang="en">' + s.contact[1] + '</span></span>' +
        '<a class="call-link" href="tel:' + s.contact[2] + '">' + icon('phone') + '<span>' + esc(t('driver.call')) + '</span><span class="visually-hidden" lang="en"> ' + s.contact[0] + '</span></a></div>';
    }

    /**
     * Flag and note lines.
     * @param {Object} s Stop.
     * @returns {string} Markup, or ''.
     */
    function extrasMarkup(s) {
      let out = '';
      if (s.flag) {
        out += '<ul class="flags"><li class="flag">' + icon(DRIVER_FLAGS[s.flag][0], 'icon--16') + '<span>' + esc(t(DRIVER_FLAGS[s.flag][1])) + '</span></li></ul>';
      }
      if (s.note) { out += '<p class="t-voice" lang="en">' + esc(s.note) + '</p>'; }
      return out;
    }

    /**
     * The actions of a stop, or the No-show question when it is asked.
     * Done and No-show are 48 px or taller, 12 px apart, and No-show is
     * quieter than Done (brief 5.4).
     * @param {Object} s Stop.
     * @param {boolean} isNext Whether this is the next stop.
     * @returns {string} Markup.
     */
    function actionsMarkup(s, isNext) {
      if (confirming === s.n) {
        return '<div class="confirm-box" data-confirm="' + s.n + '"><p tabindex="-1" id="confirm-' + s.n + '">' + esc(t('driver.noshow.confirm')) + '</p>' +
          '<div class="stop__actions"><button class="btn btn--danger-fill" type="button" data-noshow-yes="' + s.n + '">' + icon('cross') + '<span>' + esc(t('driver.noshow.yes')) + '</span></button>' +
          '<button class="btn btn--plain" type="button" data-noshow-back="' + s.n + '">' + esc(t('driver.goback')) + '</button></div></div>';
      }
      return '<div class="stop__actions" data-actions="' + s.n + '">' +
        '<button class="btn btn--secondary" type="button" data-nav="' + s.n + '">' + icon('navigate') + '<span>' + esc(t('driver.navigate')) + '</span></button>' +
        '<button class="btn ' + (isNext ? 'btn--primary' : 'btn--secondary') + ' btn--done" type="button" data-done="' + s.n + '">' + icon('check') + '<span>' + esc(t('driver.done')) + '</span></button>' +
        '<button class="btn btn--plain" type="button" data-noshow="' + s.n + '">' + icon('cross') + '<span>' + esc(t('driver.noshow')) + '</span></button>' +
        '</div><p class="t-small nav-note" id="nav-note-' + s.n + '" role="status"></p>';
    }

    /**
     * The next stop, set in the white opening on the band.
     * @param {Object} s Stop.
     * @returns {string} Markup.
     */
    function nextMarkup(s) {
      const minutes = s.at - 580;
      return '<section class="opening next-stop" aria-labelledby="next-title" id="next-stop">' +
        '<div class="next-stop__top"><h2 class="t-inscription" id="next-title" tabindex="-1">' + esc(t('driver.next')) + '</h2>' +
        (minutes > 0 ? '<span class="next-stop__in">' + esc(t('driver.in', { min: minutes })) + '</span>' : '') + '</div>' +
        '<p class="next-stop__time"><time class="num">' + formatMinutes(s.at) + '</time></p>' +
        '<p class="next-stop__place t-heading" lang="en">' + esc(s.place) + '</p>' +
        '<div class="next-stop__body">' + whatMarkup(s) +
        '<p class="t-small">' + esc(t('driver.stop')) + ' <span class="num">' + s.n + '</span> · <span class="ref" lang="en">' + esc(s.ref) + '</span></p>' +
        extrasMarkup(s) + contactMarkup(s) + '</div>' + actionsMarkup(s, true) + '</section>';
    }

    /**
     * A finished stop: compact, with what happened and when.
     * @param {Object} s Stop.
     * @returns {string} Markup.
     */
    function doneMarkup(s) {
      const r = results[s.n];
      const isNoShow = r.type === 'noshow';
      return '<li class="stop is-done"><p class="stop__time"><time class="num">' + formatMinutes(s.at) + '</time><small>' + esc(t('driver.stop')) + ' ' + s.n + '</small></p>' +
        '<div class="stop__body"><p class="stop__place" lang="en">' + esc(s.place) + '</p>' + whatMarkup(s) +
        '<p class="stop__done' + (isNoShow ? ' stop__done--noshow' : '') + '">' + icon(isNoShow ? 'cross' : 'check', 'icon--20') +
        '<span>' + esc(t(isNoShow ? 'driver.noshowat' : 'driver.doneat', { time: formatMinutes(r.at) })) + '</span></p></div></li>';
    }

    /**
     * A stop still to come, with all of its actions.
     * @param {Object} s Stop.
     * @returns {string} Markup.
     */
    function laterMarkup(s) {
      return '<li class="stop" id="stop-' + s.n + '"><p class="stop__time"><time class="num">' + formatMinutes(s.at) + '</time><small>' + esc(t('driver.stop')) + ' ' + s.n + '</small></p>' +
        '<div class="stop__body"><h3 class="stop__place" lang="en">' + esc(s.place) + '</h3>' + whatMarkup(s) +
        '<p class="t-small ref" lang="en">' + esc(s.ref) + '</p>' + extrasMarkup(s) + contactMarkup(s) + actionsMarkup(s, false) + '</div></li>';
    }

    /**
     * Draws the whole route from the current results.
     * @returns {void}
     */
    function render() {
      const open = STOPS.filter(function (s) { return !results[s.n]; });
      const finished = STOPS.filter(function (s) { return results[s.n]; });
      const next = open[0];
      $('#next-wrap').innerHTML = next ? nextMarkup(next) : '';
      $('#done-list').innerHTML = finished.map(doneMarkup).join('');
      $('#later-list').innerHTML = open.slice(1).map(laterMarkup).join('');
      $('#done-count').textContent = String(finished.length);
      const progress = $('#progress-text');
      progress.setAttribute('data-done', String(finished.length));
      progress.textContent = t('driver.progress', { done: finished.length, total: STOPS.length });
      $$('#progress-bar i').forEach(function (cell, i) { cell.classList.toggle('is-done', i < finished.length); });
    }

    /**
     * Records Done or No-show for a stop and offers Undo for 10 seconds.
     * @param {number} n Stop number.
     * @param {string} type 'done' or 'noshow'.
     * @returns {void}
     */
    function record(n, type) {
      clock += 1;
      results[n] = { type: type, at: clock };
      confirming = null;
      lastAction = n;
      render();
      const title = $('#next-title');
      if (title) { title.focus(); }
      showToast();
    }

    /**
     * Shows what just happened, with Undo, for 10 seconds (US-60).
     * @returns {void}
     */
    function showToast() {
      const n = lastAction;
      if (!n || !results[n]) { $('#toast').hidden = true; return; }
      const r = results[n];
      const what = t(r.type === 'noshow' ? 'driver.noshowat' : 'driver.doneat', { time: formatMinutes(r.at) });
      $('#toast-text').textContent = '';
      $('#toast').hidden = false;
      // Fill the text just after showing it, so screen readers announce it.
      window.setTimeout(function () { $('#toast-text').textContent = t('x.toast', { n: n, what: what }); }, 50);
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(function () { $('#toast').hidden = true; lastAction = null; }, 10000);
    }

    $('#toast-undo').addEventListener('click', function () {
      if (!lastAction) { return; }
      delete results[lastAction];
      lastAction = null;
      window.clearTimeout(toastTimer);
      $('#toast').hidden = true;
      render();
      $('#next-title').focus();
    });

    document.addEventListener('click', function (event) {
      const target = event.target.closest('button');
      if (!target) { return; }
      if (target.hasAttribute('data-done')) { record(Number(target.getAttribute('data-done')), 'done'); }
      if (target.hasAttribute('data-noshow')) {
        confirming = Number(target.getAttribute('data-noshow'));
        render();
        $('#confirm-' + confirming).focus();
      }
      if (target.hasAttribute('data-noshow-yes')) { record(Number(target.getAttribute('data-noshow-yes')), 'noshow'); }
      if (target.hasAttribute('data-noshow-back')) {
        const n = confirming;
        confirming = null;
        render();
        $('[data-noshow="' + n + '"]').focus();
      }
      if (target.hasAttribute('data-nav')) {
        // Q-17: the map service is not chosen yet; say what would happen.
        const note = $('#nav-note-' + target.getAttribute('data-nav'));
        note.innerHTML = icon('info', 'icon--16') + ' ' + esc(t('driver.navnote'));
        note.classList.add('inline');
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && confirming !== null) {
        const n = confirming;
        confirming = null;
        render();
        $('[data-noshow="' + n + '"]').focus();
      }
    });

    languageHooks.push(function () { render(); showToast(); });

    $$('[data-proto]').forEach(function (button) {
      button.addEventListener('click', function () {
        const action = button.getAttribute('data-proto');
        if (action === 'offline') {
          const banner = $('#offline');
          banner.hidden = !banner.hidden;
          button.textContent = banner.hidden ? 'Simulate offline' : 'Back online';
        }
        if (action === 'done') {
          const next = STOPS.filter(function (s) { return !results[s.n]; })[0];
          if (next) { record(next.n, 'done'); }
        }
        if (action === 'reset') { window.location.reload(); }
      });
    });

    render();
  }

  // === Section: Start ===

  /**
   * Starts the page: marks that scripts run, applies the remembered
   * language on the public pages (FR-65) and sets up the page's behaviour.
   * @returns {void}
   */
  function start() {
    document.documentElement.classList.add('has-js');
    const page = document.body.getAttribute('data-page');
    if (page === 'request' || page === 'driver') {
      lang = readStoredLang();
      initLangSwitch();
    }
    initRequestForm();
    initDashboard();
    initDriver();
    if (page === 'request' || page === 'driver') {
      translatePage();
      rerenderForLanguage();
    }
  }

  start();
}());
