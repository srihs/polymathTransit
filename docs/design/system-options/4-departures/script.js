/**
 * @file PolymathTransit – Direction 4 "Departures" – the only script.
 *
 * Enhances the four static pages of this direction. Every page works without
 * it; the script adds the language switch, the request form's reveals,
 * validation and confirmation, the driver's Done / No-show / Undo, and the
 * dashboard's drawer, approvals, dialog and list view.
 *
 * Classic script in an IIFE (pages open from file://, where ES modules are
 * blocked), loaded with `defer`, so the DOM is ready when it runs.
 *
 * Sections:
 *   1. Strings (brief 4.9, plus this direction's additions)
 *   2. Booking data for the dashboard (brief 4.5 to 4.7)
 *   3. Utilities (DOM, strings, times and dates)
 *   4. Language switch (FR-65)
 *   5. Request form (FR-01 to FR-09, FR-54, FR-55, US-01, US-03, US-05)
 *   6. Driver's route (US-60, FR-67, NFR-18)
 *   7. Dashboard (FR-19, FR-29, US-16, US-22, US-26, BRL-21)
 *   8. Foundations page
 *   9. Start
 */
(function () {
  'use strict';

  // === Section 1: Strings ===


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
   * Strings this direction needs beyond the shared set: the remarks in the
   * date departures list (brief 6.4) and the dashboard's undo message. The
   * Sinhala is a draft built from the shared cutoff strings and must be
   * reviewed by native speakers (D-09).
   * @type {{en: Object<string, string>, si: Object<string, string>}}
   */
  const EXTRA_STRINGS = {
    en: {
      'remark.open': 'Open',
      'remark.closes.today': 'Closes 5:00 pm today',
      'remark.closes.monday': 'Closes 7:00 am on Monday'
    },
    si: {
      'remark.open': 'විවෘතයි',
      'remark.closes.today': 'අද ප.ව. 5:00ට අවසන් වේ',
      'remark.closes.monday': 'සඳුදා පෙ.ව. 7:00ට අවසන් වේ'
    }
  };
  Object.assign(STRINGS.en, EXTRA_STRINGS.en);
  Object.assign(STRINGS.si, EXTRA_STRINGS.si);

  // === Section 2: Booking data for the dashboard ===

  /** The audit line for proposals made by Optimise day at the cutoff. */
  const AUDIT_OPT = 'Planned by the system at 5:00 pm on 12/10/2026 (Optimise day).';
  /** Van 2's shared 8:25 am run (PT-2026-0140 and PT-2026-0142). */
  const RUN_V2_SHARED = { van: 'Van 2', seats: 8, stops: [['08:25', 'Branch A', 'Pick up 3', 3], ['08:40', 'Branch B', 'Pick up 4', 7], ['08:55', 'Branch C', 'Drop off 3', 4], ['09:10', 'Sports Centre', 'Drop off 4', 0]] };
  /**
   * The trip day's bookings (brief 4.5) with the explanations word for word
   * (brief 4.7) and each run with seats on board at every stop (brief 4.6).
   * English only: the dashboard is English (FR-65).
   * @type {Object<string, Object>}
   */
  const BOOKINGS = {
    'PT-2026-0131': { t: '07:30', status: 'confirmed', flags: ['early'], requester: 'Dilini Fernando', phone: '077 000 0131', purpose: 'Staff errand', route: 'Branch A → Branch C', pickup: '7:30 am (arrives 7:55 am)', pax: 2, ret: 'No', van: 'Van 1', run: { van: 'Van 1', seats: 12, stops: [['07:30', 'Branch A', 'Pick up 2', 2], ['07:55', 'Branch C', 'Drop off 2', 0]] }, audit: 'Confirmed individually on 12/10/2026.' },
    'PT-2026-0140': { t: '08:25', status: 'proposed', flags: ['shared'], requester: 'Nimal Perera', phone: '077 000 0140', purpose: 'Meeting or event', route: 'Branch A → Branch C', pickup: '8:25 am (arrives 8:55 am)', pax: 3, ret: 'No', van: 'Van 2', run: RUN_V2_SHARED, audit: AUDIT_OPT },
    'PT-2026-0142': { t: '08:40', status: 'proposed', flags: ['shared'], requester: 'Kasun Jayasinghe', phone: '077 000 0142', purpose: 'Sport', route: 'Branch B → Sports Centre', pickup: 'Requested 8:45 am ± 10 min; planned 8:40 am (arrives 9:10 am)', pax: 4, ret: '10:45 am from Sports Centre (back 11:05 am)', van: 'Van 2',
      why: ['Van 2: added to the 8:25 am run from Branch A, shared with PT-2026-0140.', 'Pickup at Branch B at 8:40 am, within the requested 8:45 am ± 10 min.', '7 of 8 seats used at the busiest point.', 'The 3 passengers from Branch A ride 6 minutes longer, within their limit.', 'Saves a separate 35-minute van run.', 'Van 1 not used: it must leave Branch A at 9:05 am for Grade 7 Swimming.'],
      run: RUN_V2_SHARED, audit: AUDIT_OPT },
    'PT-2026-0119': { t: '09:05', status: 'proposed', flags: ['fixed'], requester: 'Ruwan Silva', phone: '077 000 0119', contactNote: 'series contact', purpose: 'Sport: Grade 7 Swimming', route: 'Branch A → Aquatic Centre', pickup: '9:05 am (arrives 9:30 am)', pax: 11, ret: '11:30 am from Aquatic Centre, back 11:55 am; van need not stay', van: 'Van 1', note: ['Fixed trip', 'Grade 7 Swimming – every Tuesday this term'],
      run: { van: 'Van 1', seats: 12, stops: [['09:05', 'Branch A', 'Pick up 11', 11], ['09:30', 'Aquatic Centre', 'Drop off 11', 0], ['11:30', 'Aquatic Centre', 'Pick up 11', 11], ['11:55', 'Branch A', 'Drop off 11', 0]] }, audit: AUDIT_OPT },
    'PT-2026-0145': { t: '10:00', status: 'proposed', flags: ['gap'], requester: 'Shamila Rodrigo', phone: '077 000 0145', purpose: 'Staff errand', route: 'Branch B → Stationery supplier → Branch B', pickup: '10:00 am (back 10:50 am)', pax: 1, ret: 'Round trip with a wait', van: 'Van 1',
      why: ['Van 1: gap job while Grade 7 Swimming is at the Aquatic Centre.', 'Leaves the Aquatic Centre at 9:35 am and is back at 11:10 am, 20 minutes before the 11:30 am return pickup (the safety buffer is 15 minutes).', 'No second van needed.'],
      run: { van: 'Van 1', seats: 12, stops: [['10:00', 'Branch B', 'Pick up 1', 1], ['10:20', 'Stationery supplier', 'Drop off 1', 0], ['10:35', 'Stationery supplier', 'Pick up 1', 1], ['10:50', 'Branch B', 'Drop off 1', 0]] }, audit: AUDIT_OPT },
    'PT-2026-0147': { t: '11:20', status: 'attention', flags: ['newreq'], requester: 'Sanduni Herath', phone: '077 000 0147', purpose: 'Staff errand', route: 'Branch C → pin "Opposite the temple, 2nd lane"', pickup: '11:20 am (arrives 11:40 am)', pax: 3, ret: 'No', van: 'Van 2 (route found)',
      why: ['New requester: this phone number has not been used before. Check before approving.', 'Route found: Van 2, pickup at Branch C at 11:20 am.', 'The drop-off was placed with a map pin and the note "Opposite the temple, 2nd lane".'],
      run: { van: 'Van 2', seats: 8, stops: [['11:20', 'Branch C', 'Pick up 3', 3], ['11:40', 'Pin: "Opposite the temple, 2nd lane"', 'Drop off 3', 0]] }, audit: AUDIT_OPT },
    'PT-2026-0149': { t: '13:00', status: 'attention', flags: [], requester: 'Mahesh Kumara', phone: '077 000 0149', purpose: 'Sport: Grade 9 inter-house practice', route: 'Branch A → Sports Centre', pickup: '1:00 pm', pax: 20, ret: '3:00 pm', van: 'Not placed',
      why: ['No single van fits: the group of 20 is larger than the largest van (12 seats).', 'At 1:00 pm, Van 1 cannot help: it must be back at Branch A for 1:30 pm (PT-2026-0150).', 'Van 2 alone has 8 seats.', 'Alternatives:'],
      alternatives: ['Split across Van 1 (12) and Van 2 (8), both leaving Branch A at 12:15 pm (45 minutes earlier).', 'Extra hire van needed for 1:00 pm.'],
      run: null, audit: '' },
    'PT-2026-0150': { t: '13:30', status: 'proposed', flags: [], requester: 'Priyanka Wijesekara', phone: '077 000 0150', purpose: 'Meeting or event', route: 'Branch A → Branch B', pickup: '1:30 pm (arrives 1:45 pm)', pax: 6, ret: '3:30 pm from Branch B (back 3:45 pm)', van: 'Van 1',
      run: { van: 'Van 1', seats: 12, stops: [['13:30', 'Branch A', 'Pick up 6', 6], ['13:45', 'Branch B', 'Drop off 6', 0], ['15:30', 'Branch B', 'Pick up 6', 6], ['15:45', 'Branch A', 'Drop off 6', 0]] }, audit: AUDIT_OPT },
    'PT-2026-0153': { t: '14:15', status: 'proposed', flags: ['late'], requester: 'Tharindu Bandara', phone: '077 000 0153', contactNote: 'by phone', purpose: 'Staff errand', route: 'Branch C → Branch A', pickup: '2:15 pm (arrives 2:40 pm)', pax: 2, ret: 'No', van: 'Van 2', note: ['Late (exception)', 'Added by Ravi Gunasekara at 6:55 am today. Source: Phone. Reason: "Exam papers must reach the main office."'],
      run: { van: 'Van 2', seats: 8, stops: [['14:15', 'Branch C', 'Pick up 2', 2], ['14:40', 'Branch A', 'Drop off 2', 0]] }, audit: 'Added by Ravi Gunasekara at 6:55 am today.' },
    'PT-2026-0151': { t: '17:45', status: 'proposed', flags: ['ooh'], requester: 'Chathurika de Alwis', phone: '077 000 0151', purpose: 'Class trip: drama rehearsal', route: 'Branch B → Branch A', pickup: '5:45 pm (arrives 6:05 pm)', pax: 7, ret: 'No', van: 'Van 2', note: ['Out of hours', 'Ends after 6:00 pm.'],
      run: { van: 'Van 2', seats: 8, stops: [['17:45', 'Branch B', 'Pick up 7', 7], ['18:05', 'Branch A', 'Drop off 7', 0]] }, audit: AUDIT_OPT }
  };

  /** Status words and glyph symbols, one per status (brief 6.4). */
  const STATUS = {
    submitted: { glyph: 'g-submitted', word: 'Submitted' },
    proposed: { glyph: 'g-proposed', word: 'Proposed' },
    attention: { glyph: 'g-attention', word: 'Needs attention' },
    confirmed: { glyph: 'g-confirmed', word: 'Confirmed' },
    declined: { glyph: 'g-declined', word: 'Declined' },
    cancelled: { glyph: 'g-cancelled', word: 'Cancelled' },
    completed: { glyph: 'g-completed', word: 'Completed' },
    noshow: { glyph: 'g-noshow', word: 'No-show' }
  };

  /** Flags: icon symbol and word. */
  const FLAGS = {
    early: { icon: 'i-clock', word: 'Early trip' },
    fixed: { icon: 'i-repeat', word: 'Fixed trip' },
    gap: { icon: 'i-gap', word: 'Gap job' },
    shared: { icon: 'i-shared', word: 'Shared' },
    newreq: { icon: 'i-newreq', word: 'New requester' },
    late: { icon: 'i-late', word: 'Late (exception)' },
    ooh: { icon: 'i-outofhours', word: 'Out of hours' }
  };

  // === Section 3: Utilities ===

  /**
   * Find the first element matching a selector.
   * @param {string} selector CSS selector.
   * @param {ParentNode} [root=document] Where to search.
   * @returns {?Element} The element, or null.
   */
  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  /**
   * Find every element matching a selector.
   * @param {string} selector CSS selector.
   * @param {ParentNode} [root=document] Where to search.
   * @returns {Element[]} The elements, as an array.
   */
  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  /**
   * Escape text for safe use inside innerHTML.
   * @param {string|number} value The text.
   * @returns {string} The escaped text.
   */
  function esc(value) {
    return String(value).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /** The current language: 'en' or 'si'. */
  let lang = 'en';

  /**
   * Look up a string in the current language and fill its placeholders.
   * @param {string} key String key from STRINGS.
   * @param {Object<string, (string|number)>} [vars] Values for {placeholders}.
   * @returns {string} The string, or the key itself if it is missing.
   */
  function t(key, vars) {
    const table = STRINGS[lang] || STRINGS.en;
    let text = table[key] !== undefined ? table[key] : (STRINGS.en[key] !== undefined ? STRINGS.en[key] : key);
    if (vars) {
      Object.keys(vars).forEach(function (name) {
        text = text.split('{' + name + '}').join(String(vars[name]));
      });
    }
    return text;
  }

  /**
   * Turn a string into HTML for display. In Sinhala, runs of Latin letters and
   * digits (SMS, WhatsApp, 077 123 4567, 5:00) are marked with class "latin"
   * so CSS keeps them at their English size: the 1.2 size factor is for
   * Sinhala letters only (brief 6.4, research.md 3.2).
   * @param {string} text The string.
   * @returns {string} Escaped HTML.
   */
  function richText(text) {
    const s = String(text);
    if (lang !== 'si') { return esc(s); }
    const re = /[A-Za-z0-9][A-Za-z0-9 .,:+\-()]*[A-Za-z0-9)]|[A-Za-z0-9]/g;
    let out = '';
    let last = 0;
    let m;
    while ((m = re.exec(s)) !== null) {
      out += esc(s.slice(last, m.index)) + '<span class="latin">' + esc(m[0]) + '</span>';
      last = m.index + m[0].length;
    }
    return out + esc(s.slice(last));
  }

  /**
   * Set an element's text through richText().
   * @param {Element} el The element.
   * @param {string} text The text.
   * @returns {void}
   */
  function setText(el, text) {
    el.innerHTML = richText(text);
  }

  /**
   * Narrow the colon in times set in B612 Mono. The mono face gives the colon
   * a full cell, so "10:30" reads as "10: 30"; a span lets CSS close the gap.
   * Runs on the whole page and again after the script redraws anything.
   * @param {Node} root Where to look.
   * @returns {void}
   */
  function tightenColons(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        const p = n.parentElement;
        if (!p || !/\d:\d/.test(n.nodeValue) || p.closest('select, option, script, style, .colon')) { return NodeFilter.FILTER_REJECT; }
        return /B612 Mono/.test(window.getComputedStyle(p).fontFamily) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) { nodes.push(walker.currentNode); }
    nodes.forEach(function (n) {
      const parts = n.nodeValue.split(/(\d):(?=\d)/);
      const frag = document.createDocumentFragment();
      for (let i = 0; i < parts.length; i += 1) {
        if (i % 2 === 1) {
          frag.appendChild(document.createTextNode(parts[i]));
          const c = document.createElement('span');
          c.className = 'colon';
          c.textContent = ':';
          frag.appendChild(c);
        } else if (parts[i]) {
          frag.appendChild(document.createTextNode(parts[i]));
        }
      }
      n.parentNode.replaceChild(frag, n);
    });
  }

  /**
   * Split "HH:MM" into numbers.
   * @param {string} hm A 24-hour time such as "08:45".
   * @returns {number[]} [hours, minutes].
   */
  function parseHM(hm) {
    const parts = String(hm).split(':');
    return [parseInt(parts[0], 10), parseInt(parts[1], 10)];
  }

  /**
   * Minutes after midnight for "HH:MM".
   * @param {string} hm A 24-hour time.
   * @returns {number} Minutes after midnight.
   */
  function toMinutes(hm) {
    const p = parseHM(hm);
    return p[0] * 60 + p[1];
  }

  /**
   * The parts of a displayed time, so the period can be set smaller.
   * NFR-12: English "8:45 am"; Sinhala "පෙ.ව. 8:45" (research.md 6.1).
   * @param {number} hours 0 to 23.
   * @param {number} minutes 0 to 59.
   * @param {string} [language] 'en' or 'si'; defaults to the current one.
   * @returns {{num: string, per: string, perFirst: boolean}} Digits, period,
   *     and whether the period comes first (Sinhala).
   */
  function timeParts(hours, minutes, language) {
    const l = language || lang;
    const h12 = hours % 12 === 0 ? 12 : hours % 12;
    const num = h12 + ':' + (minutes < 10 ? '0' : '') + minutes;
    const pm = hours >= 12;
    if (l === 'si') {
      return { num: num, per: pm ? STRINGS.si['time.pm'] : STRINGS.si['time.am'], perFirst: true };
    }
    return { num: num, per: pm ? 'pm' : 'am', perFirst: false };
  }

  /**
   * Format a time for display: "8:45 am", "12:30 pm", "පෙ.ව. 8:45".
   * @param {number} hours 0 to 23.
   * @param {number} minutes 0 to 59.
   * @param {string} [language] 'en' or 'si'.
   * @returns {string} The formatted time.
   */
  function formatTime(hours, minutes, language) {
    const p = timeParts(hours, minutes, language);
    return p.perFirst ? p.per + ' ' + p.num : p.num + ' ' + p.per;
  }

  /**
   * Format "HH:MM" for display.
   * @param {string} hm A 24-hour time.
   * @param {string} [language] 'en' or 'si'.
   * @returns {string} The formatted time.
   */
  function formatHM(hm, language) {
    const p = parseHM(hm);
    return formatTime(p[0], p[1], language);
  }

  /**
   * Format "HH:MM" as HTML for the board-time style: digits large, the period
   * at 55 % (the board time in the driver's strip).
   * @param {string} hm A 24-hour time.
   * @returns {string} HTML.
   */
  function boardTimeHTML(hm) {
    const p = parseHM(hm);
    const parts = timeParts(p[0], p[1]);
    // The space sits inside the small period span, so it is small too.
    const num = esc(parts.num).replace(':', '<span class="colon">:</span>');
    return parts.perFirst
      ? '<span class="per">' + esc(parts.per) + '&nbsp;</span>' + num
      : num + '<span class="per">&nbsp;' + esc(parts.per) + '</span>';
  }

  /**
   * Format a date as DD/MM/YYYY (NFR-12).
   * @param {Date} date The date.
   * @returns {string} For example "13/10/2026".
   */
  function formatDate(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    return (d < 10 ? '0' : '') + d + '/' + (m < 10 ? '0' : '') + m + '/' + date.getFullYear();
  }

  /** String keys for weekdays; Sunday (0) and Saturday (6) have none. */
  const DAY_KEYS = [null, 'day.monday', 'day.tuesday', 'day.wednesday', 'day.thursday', 'day.friday', null];

  /**
   * Weekday and date: "Tuesday 13/10/2026" or "අඟහරුවාදා 13/10/2026".
   * @param {Date} date The date.
   * @returns {string} The weekday (if a school day) and the date.
   */
  function weekdayDate(date) {
    const key = DAY_KEYS[date.getDay()];
    return (key ? t(key) + ' ' : '') + formatDate(date);
  }

  /**
   * Read "YYYY-MM-DD" as a local date.
   * @param {string} iso The date.
   * @returns {Date} The date at local midnight.
   */
  function fromISO(iso) {
    const p = iso.split('-');
    return new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
  }

  /**
   * Restart the remark flip on an element (brief 6.4 motion). CSS turns the
   * animation off under prefers-reduced-motion.
   * @param {?Element} el The remark slot that changed.
   * @returns {void}
   */
  function flip(el) {
    if (!el) { return; }
    el.classList.remove('is-flipping');
    void el.offsetWidth; // Restart the animation by forcing a reflow.
    el.classList.add('is-flipping');
    el.addEventListener('animationend', function done() {
      el.classList.remove('is-flipping');
      el.removeEventListener('animationend', done);
    });
  }

  /**
   * Build the HTML of a remark slot (status) for the light or board theme.
   * @param {string} status Key in STATUS.
   * @param {string} [id] Optional id for the slot.
   * @returns {string} HTML.
   */
  function remarkHTML(status, id) {
    const s = STATUS[status];
    return '<span class="remark remark--' + status + '"' + (id ? ' id="' + id + '"' : '') + '>' +
      '<svg class="glyph" aria-hidden="true"><use href="#' + s.glyph + '"/></svg><span>' + esc(s.word) + '</span></span>';
  }

  /**
   * Build the HTML of a flag list.
   * @param {string[]} keys Keys in FLAGS.
   * @returns {string} HTML, or an empty string when there are no flags.
   */
  function flagsHTML(keys) {
    if (!keys || !keys.length) { return ''; }
    return '<ul class="flags">' + keys.map(function (k) {
      return '<li class="flag"><svg class="icon" aria-hidden="true"><use href="#' + FLAGS[k].icon + '"/></svg>' + esc(FLAGS[k].word) + '</li>';
    }).join('') + '</ul>';
  }

  // === Section 4: Language switch (FR-65) ===

  const LANG_KEY = 'pt-lang';
  /** Functions each page registers to redraw script-built text. */
  const langHooks = [];

  /**
   * Read the remembered language. Storage can be blocked on file://, so any
   * error means "nothing remembered".
   * @returns {?string} 'en', 'si' or null.
   */
  function readLang() {
    try {
      const v = window.localStorage.getItem(LANG_KEY);
      return v === 'si' || v === 'en' ? v : null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Remember the language on this phone (FR-65).
   * @param {string} l 'en' or 'si'.
   * @returns {void}
   */
  function saveLang(l) {
    try {
      window.localStorage.setItem(LANG_KEY, l);
    } catch (e) {
      // Storage blocked (for example on file:// in some browsers): the choice
      // still applies to this page view.
    }
  }

  /**
   * Values for a string's placeholders, taken from data attributes.
   * @param {Element} el An element with data-i18n.
   * @returns {?Object<string, (string|number)>} Placeholder values, or null.
   */
  function varsFor(el) {
    const vars = {};
    let any = false;
    if (el.dataset.time) { vars.time = formatHM(el.dataset.time); any = true; }
    if (el.dataset.min) { vars.min = el.dataset.min; any = true; }
    if (el.dataset.done) { vars.done = el.dataset.done; any = true; }
    if (el.dataset.total) { vars.total = el.dataset.total; any = true; }
    return any ? vars : null;
  }

  /**
   * Translate every marked element inside a root: text, optgroup labels and
   * times. Used for the page and for newly added parts (extra stops).
   * @param {ParentNode} root Where to translate.
   * @returns {void}
   */
  function translateIn(root) {
    $$('[data-i18n]', root).forEach(function (el) {
      setText(el, t(el.dataset.i18n, varsFor(el)));
    });
    $$('[data-i18n-label]', root).forEach(function (el) {
      el.label = t(el.dataset.i18nLabel);
    });
    $$('select.select--time option', root).forEach(function (opt) {
      if (opt.value) { opt.textContent = formatHM(opt.value); }
    });
    $$('time[data-t]', root).forEach(function (el) {
      if (el.closest('.board-time')) {
        el.innerHTML = boardTimeHTML(el.dataset.t);
      } else {
        setText(el, formatHM(el.dataset.t));
      }
    });
  }

  /**
   * Switch the page language: every label, option, hint, message and button,
   * the <html lang>, the title, and the switch's own state (FR-65).
   * @param {string} l 'en' or 'si'.
   * @returns {void}
   */
  function applyLang(l) {
    lang = l === 'si' ? 'si' : 'en';
    document.documentElement.lang = lang;
    translateIn(document);
    $$('.lang__btn').forEach(function (btn) {
      const on = btn.dataset.setLang === lang;
      if (btn.tagName === 'BUTTON') { btn.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    });
    if (document.body.dataset.titleKey) {
      document.title = t(document.body.dataset.titleKey) + ' – PolymathTransit';
    }
    langHooks.forEach(function (fn) { fn(); });
  }

  /**
   * Turn the no-JS language links into toggle buttons and start in the
   * remembered (or linked) language.
   * @returns {void}
   */
  function initLangSwitch() {
    const links = $$('a.lang__btn');
    if (!links.length) { return; }
    links.forEach(function (a) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lang__btn';
      btn.lang = a.lang;
      btn.dataset.setLang = a.dataset.setLang;
      btn.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>' + esc(a.textContent.trim());
      btn.addEventListener('click', function () {
        applyLang(btn.dataset.setLang);
        saveLang(btn.dataset.setLang);
      });
      a.replaceWith(btn);
    });
    const fromUrl = /[?&]lang=(si|en)\b/.exec(window.location.search);
    applyLang(readLang() || (fromUrl ? fromUrl[1] : 'en'));
  }

  // === Section 5: Request form ===

  /**
   * Set up the public request form: reveals, extra stops, the passenger
   * stepper, the date departures list, validation and the confirmation.
   * @returns {void}
   */
  function initRequest() {
    const form = $('#request-form');
    if (!form) { return; }
    document.body.dataset.titleKey = 'form.title';

    // BRL-13: the form's "now" is Monday 12/10/2026, 2:40 pm, so today is
    // closed and tomorrow closes at 5:00 pm today.
    const TODAY = new Date(2026, 9, 12);
    const MAX_STOPS = 3; // FR-54: up to three extra stops.

    const touched = new Set();
    const errors = {};
    let done = false;

    // --- Progressive enhancement: hide what only the no-JS form needs. ---
    $$('.nojs-suffix').forEach(function (el) { el.remove(); });
    ['#date-other-box', '#from-other', '#to-other', '#return-box'].forEach(function (s) { $(s).hidden = true; });
    $('#pax-down').hidden = false;
    $('#pax-up').hidden = false;

    // Extra stops: keep the first no-JS row as the template.
    const stopTemplate = $('#stop-1').cloneNode(true);
    $('#stops-nojs').remove();
    const stopsBox = $('#stops-js');
    const addStopBtn = $('#add-stop');
    stopsBox.hidden = false;
    addStopBtn.hidden = false;

    // A polite live region for the cutoff message, so it is announced even
    // when the visible box is hidden for dates with no message.
    const cutoffLive = document.createElement('p');
    cutoffLive.className = 'vh';
    cutoffLive.setAttribute('role', 'status');
    $('#f-date').appendChild(cutoffLive);
    const cutoffText = $('#cutoff');
    cutoffText.removeAttribute('role');

    // --- Date departures list (FR-07, BRL-13, US-05) ---
    const closedRadio = $('#date-0');
    // Keep the closed date focusable so its reason can be read (brief 5.2):
    // aria-disabled instead of disabled, and the script refuses the choice.
    closedRadio.disabled = false;
    closedRadio.setAttribute('aria-disabled', 'true');
    closedRadio.setAttribute('aria-describedby', 'cutoff');
    $('label[for="date-0"]').setAttribute('aria-disabled', 'true');
    let lastDate = '';

    /**
     * The cutoff message key for a chosen date (BRL-13).
     * @param {string} value The date radio's value.
     * @returns {string} A string key, or '' for no message.
     */
    function cutoffKeyFor(value) {
      if (value === '2026-10-12') { return 'cutoff.today.closed'; }
      if (value === '2026-10-13' || value === '') { return 'cutoff.open'; } // Tomorrow: 5:00 pm today.
      if (value === '2026-10-19') { return 'cutoff.monday'; } // Monday: 7:00 am on the day.
      return '';
    }

    /**
     * Show the cutoff message for a date, or hide the box when there is none.
     * @param {string} value The date radio's value ('' for none chosen).
     * @param {boolean} announce Whether to announce the change.
     * @returns {void}
     */
    function showCutoff(value, announce) {
      const key = cutoffKeyFor(value);
      cutoffText.dataset.i18n = key || 'cutoff.open';
      setText(cutoffText, key ? t(key) : '');
      $('#cutoff-box').hidden = !key;
      if (announce) { cutoffLive.textContent = key ? t(key) : ''; }
    }

    closedRadio.addEventListener('focus', function () { showCutoff('2026-10-12', true); });
    closedRadio.addEventListener('blur', function () { showCutoff(lastDate, false); });
    $('label[for="date-0"]').addEventListener('click', function (e) { e.preventDefault(); closedRadio.focus(); });

    $$('input[name="date"]').forEach(function (r) {
      r.addEventListener('change', function () {
        if (r === closedRadio) {
          // Refuse the closed date: put back the previous choice.
          r.checked = false;
          const prev = lastDate && $('input[name="date"][value="' + lastDate + '"]');
          if (prev) { prev.checked = true; }
          showCutoff('2026-10-12', true);
          return;
        }
        lastDate = r.value;
        showCutoff(r.value, true);
        $('#date-other-box').hidden = r.value !== 'other';
        if (errors.date) { validateField('date'); }
      });
    });

    // --- Places: "Another address" reveals the address, map and landmark. ---
    ['from', 'to'].forEach(function (name) {
      const sel = $('#' + name);
      sel.addEventListener('change', function () {
        $('#' + name + '-other').hidden = sel.value !== 'other';
        touched.add(name);
        if (errors[name]) { validateField(name); }
      });
    });
    $$('[data-map-note]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        // The map service is not chosen yet (Q-17); prototype note only.
        $('#' + btn.dataset.mapNote).textContent = 'Prototype: the map is not built yet. In the product you would place a pin here.';
      });
    });

    // --- Extra stops (FR-54) ---
    /**
     * Give each extra stop its number and matching ids, names and labels.
     * @returns {void}
     */
    function renumberStops() {
      $$('.stop', stopsBox).forEach(function (fs, i) {
        const n = String(i + 1);
        fs.id = 'stop-' + n;
        $('.stop__n', fs).textContent = n;
        $$('[id],[for],[name]', fs).forEach(function (el) {
          ['id', 'for', 'name'].forEach(function (attr) {
            const v = el.getAttribute(attr);
            if (v) { el.setAttribute(attr, v.replace(/stop([-_])\d+/, 'stop$1' + n)); }
          });
        });
      });
      addStopBtn.hidden = $$('.stop', stopsBox).length >= MAX_STOPS;
    }

    addStopBtn.addEventListener('click', function () {
      if ($$('.stop', stopsBox).length >= MAX_STOPS) { return; }
      const fs = stopTemplate.cloneNode(true);
      $$('select', fs).forEach(function (s) { s.selectedIndex = 0; });
      $$('input', fs).forEach(function (i) { if (i.type === 'radio') { i.checked = false; } else { i.value = ''; } });
      $('.stop__remove', fs).hidden = false;
      stopsBox.appendChild(fs);
      renumberStops();
      translateIn(fs);
      $('select', fs).focus();
    });
    stopsBox.addEventListener('click', function (e) {
      const btn = e.target.closest('.stop__remove');
      if (!btn) { return; }
      btn.closest('.stop').remove();
      renumberStops();
      addStopBtn.focus();
    });

    // --- Passenger stepper (US-03) ---
    const pax = $('#pax');
    const paxDown = $('#pax-down');
    const paxUp = $('#pax-up');

    /**
     * Show or hide the split message and set the stepper's limits. Above 12
     * is information, not an error (US-03 AC-3): no van has more than 12 seats.
     * @param {boolean} announce Whether to announce the new value.
     * @returns {void}
     */
    function updatePax(announce) {
      const v = parseInt(pax.value, 10);
      const big = !isNaN(v) && v > 12;
      $('#pax-split-box').hidden = !big;
      paxDown.setAttribute('aria-disabled', !isNaN(v) && v > 1 ? 'false' : 'true');
      paxUp.setAttribute('aria-disabled', !isNaN(v) && v >= 99 ? 'true' : 'false');
      if (announce) {
        $('#pax-live').textContent = (isNaN(v) ? '' : String(v)) + (big ? '. ' + t('pax.split') : '');
      }
    }

    /**
     * Step the passenger count by one, within 1 to 99.
     * @param {number} delta +1 or -1.
     * @returns {void}
     */
    function stepPax(delta) {
      let v = parseInt(pax.value, 10);
      if (isNaN(v)) { v = delta > 0 ? 0 : 2; }
      v = Math.min(99, Math.max(1, v + delta));
      pax.value = String(v);
      touched.add('pax');
      if (errors.pax) { validateField('pax'); }
      updatePax(true);
    }
    paxDown.addEventListener('click', function () { stepPax(-1); });
    paxUp.addEventListener('click', function () { stepPax(1); });
    pax.addEventListener('input', function () { updatePax(false); });

    // --- Return trip (FR-06) ---
    $$('input[name="return"]').forEach(function (r) {
      r.addEventListener('change', function () {
        const yes = $('#return-yes').checked;
        $('#return-box').hidden = !yes;
        if (!yes) { setError('returnTime', ''); }
        if (errors['return']) { validateField('return'); }
      });
    });

    // --- Validation (FR-03, US-01 AC-2 to AC-4, US-03 AC-4) ---

    /**
     * Each validated field: the element to focus, its error element, the
     * element that shows the error state, and its check. A check returns the
     * string key of the message, or '' when the field is fine. Order is page
     * order, which the error summary follows.
     */
    const FIELDS = [
      { key: 'name', focus: '#name', err: '#name-error', box: '#f-name', input: '#name',
        check: function () { return $('#name').value.trim() ? '' : 'err.name'; } },
      { key: 'phone', focus: '#phone', err: '#phone-error', box: '#f-phone', input: '#phone',
        check: function () {
          const raw = $('#phone').value.trim();
          if (!raw) { return 'err.phone.empty'; }
          // FR-03: 07X XXX XXXX, 0XX XXX XXXX or +94 followed by nine digits.
          const digits = raw.replace(/[\s\-().]/g, '');
          return /^0\d{9}$/.test(digits) || /^\+94\d{9}$/.test(digits) ? '' : 'err.phone.format';
        } },
      { key: 'purpose', focus: '#purpose-class', err: '#purpose-error', box: '#f-purpose',
        check: function () { return $('input[name="purpose"]:checked') ? '' : 'err.purpose'; } },
      { key: 'date', focus: '#date-1', err: '#date-error', box: '#f-date',
        check: function () { return $('input[name="date"]:checked') ? '' : 'err.date'; } },
      { key: 'dateText', focus: '#date-text', err: '#date-text-error', box: '#f-date-text', input: '#date-text',
        when: function () { return $('#date-other').checked; },
        check: function () {
          const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec($('#date-text').value.trim());
          if (!m) { return 'err.date.format'; }
          const d = new Date(+m[3], +m[2] - 1, +m[1]);
          if (d.getDate() !== +m[1] || d.getMonth() !== +m[2] - 1) { return 'err.date.format'; }
          return d < TODAY ? 'err.date.past' : '';
        } },
      { key: 'from', focus: '#from', err: '#from-error', box: '#f-from', input: '#from',
        check: function () {
          const v = $('#from').value;
          return !v || (v === 'other' && !$('#from-address').value.trim()) ? 'err.from' : '';
        } },
      { key: 'to', focus: '#to', err: '#to-error', box: '#f-to', input: '#to',
        check: function () {
          const v = $('#to').value;
          return !v || (v === 'other' && !$('#to-address').value.trim()) ? 'err.to' : '';
        } },
      { key: 'time', focus: '#time', err: '#time-error', box: '#f-time', input: '#time',
        check: function () { return $('#time').value ? '' : 'err.time'; } },
      { key: 'pax', focus: '#pax', err: '#pax-error', box: '#f-pax', input: '#pax',
        check: function () {
          const v = $('#pax').value.trim();
          return /^\d{1,2}$/.test(v) && +v >= 1 && +v <= 99 ? '' : 'err.pax';
        } },
      { key: 'return', focus: '#return-yes', err: '#return-error', box: '#f-return',
        check: function () { return $('input[name="return"]:checked') ? '' : 'err.return'; } },
      { key: 'returnTime', focus: '#return-time', err: '#return-time-error', box: '#f-return-time', input: '#return-time',
        when: function () { return $('#return-yes').checked; },
        check: function () {
          const r = $('#return-time').value;
          if (!r) { return 'err.return.empty'; }
          const p = $('#time').value;
          return p && r <= p ? 'err.return.time' : '';
        } }
    ];

    /**
     * Find a field definition.
     * @param {string} key Field key.
     * @returns {Object} The definition.
     */
    function field(key) {
      return FIELDS.filter(function (f) { return f.key === key; })[0];
    }

    /**
     * Show or clear one field's error: message with icon, red edge,
     * aria-invalid, and the message tied to the field by aria-describedby.
     * @param {string} key Field key.
     * @param {string} msgKey Message string key, or '' to clear.
     * @returns {void}
     */
    function setError(key, msgKey) {
      const f = field(key);
      const errEl = $(f.err);
      const box = $(f.box);
      const input = f.input ? $(f.input) : null;
      if (msgKey) { errors[key] = msgKey; } else { delete errors[key]; }
      errEl.hidden = !msgKey;
      setText($('.error-msg__text', errEl), msgKey ? t(msgKey) : '');
      box.classList.toggle('is-error', !!msgKey);
      const target = input || box;
      const ids = (target.getAttribute('aria-describedby') || '').split(/\s+/).filter(function (id) { return id && id !== errEl.id; });
      if (msgKey) { ids.unshift(errEl.id); }
      if (ids.length) { target.setAttribute('aria-describedby', ids.join(' ')); } else { target.removeAttribute('aria-describedby'); }
      if (input) {
        if (msgKey) { input.setAttribute('aria-invalid', 'true'); } else { input.removeAttribute('aria-invalid'); }
      } else {
        $$('input', box).forEach(function (i) {
          if (msgKey) { i.setAttribute('aria-invalid', 'true'); } else { i.removeAttribute('aria-invalid'); }
        });
      }
    }

    /**
     * Check one field now and show the result.
     * @param {string} key Field key.
     * @returns {string} The message key, or ''.
     */
    function validateField(key) {
      const f = field(key);
      const msg = !f.when || f.when() ? f.check() : '';
      setError(key, msg);
      if (!$('#err-summary').hidden) { renderSummary(false); }
      return msg;
    }

    /**
     * Draw the error summary: one link per error, in page order.
     * @param {boolean} moveFocus Whether to move focus to the summary.
     * @returns {void}
     */
    function renderSummary(moveFocus) {
      const list = $('#err-list');
      const keys = FIELDS.map(function (f) { return f.key; }).filter(function (k) { return errors[k]; });
      list.innerHTML = keys.map(function (k) {
        return '<li><a href="' + field(k).focus + '" data-focus="' + field(k).focus + '">' + richText(t(errors[k])) + '</a></li>';
      }).join('');
      $('#err-summary').hidden = keys.length === 0;
      if (moveFocus && keys.length) { $('#err-summary').focus(); }
    }

    $('#err-list').addEventListener('click', function (e) {
      const a = e.target.closest('a[data-focus]');
      if (!a) { return; }
      e.preventDefault();
      const target = $(a.dataset.focus);
      target.focus();
      target.scrollIntoView({ block: 'center' });
    });

    // Validate on leaving a field, only after the person has typed in it;
    // never on each keystroke (brief 5.2).
    FIELDS.forEach(function (f) {
      if (!f.input) { return; }
      const el = $(f.input);
      el.addEventListener('input', function () { touched.add(f.key); });
      el.addEventListener('change', function () { touched.add(f.key); });
      el.addEventListener('blur', function () { if (touched.has(f.key)) { validateField(f.key); } });
    });
    $('#from-address').addEventListener('blur', function () { if (errors.from) { validateField('from'); } });
    $('#to-address').addEventListener('blur', function () { if (errors.to) { validateField('to'); } });
    $$('input[name="purpose"]').forEach(function (r) {
      r.addEventListener('change', function () { if (errors.purpose) { validateField('purpose'); } });
    });

    /**
     * Check every field. Keeps everything the person typed.
     * @returns {number} How many fields are in error.
     */
    function validateAll() {
      FIELDS.forEach(function (f) {
        setError(f.key, !f.when || f.when() ? f.check() : '');
      });
      return Object.keys(errors).length;
    }

    // --- Confirmation (FR-04, US-01 AC-5) ---

    /**
     * The place a select stands for: its option text, or the typed address.
     * @param {string} name 'from' or 'to'.
     * @returns {string} The place as entered.
     */
    function placeOf(name) {
      const sel = $('#' + name);
      if (sel.value === 'other') { return $('#' + name + '-address').value.trim(); }
      return sel.options[sel.selectedIndex].textContent;
    }

    /**
     * Build the "Your trip" summary from what was entered, as board rows:
     * the time leads, then the place.
     * @returns {void}
     */
    function buildSummary() {
      const purpose = $('input[name="purpose"]:checked');
      const dateR = $('input[name="date"]:checked');
      let dateText = '';
      if (dateR && dateR.value === 'other') {
        const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec($('#date-text').value.trim());
        dateText = m ? weekdayDate(new Date(+m[3], +m[2] - 1, +m[1])) : $('#date-text').value;
      } else if (dateR) {
        dateText = weekdayDate(fromISO(dateR.value));
      }
      const flex = $('input[name="flex"]:checked');
      const flexText = flex ? (flex.value === '0' ? t('flex.exact') : t('flex.' + flex.value)) : '';
      const rows = [
        ['label.purpose', richText(t('purpose.' + purpose.value))],
        ['label.date', '<span class="mono">' + richText(dateText) + '</span>'],
        ['label.pickup', '<span class="mono">' + richText(formatHM($('#time').value)) + '</span> (' + richText(flexText) + ') · <span lang="en">' + esc(placeOf('from')) + '</span>'],
        ['label.goingto', '<span lang="en">' + esc(placeOf('to')) + '</span>'],
        ['label.passengers', '<span class="mono latin">' + esc($('#pax').value.trim()) + '</span>'],
        ['label.return', $('#return-yes').checked
          ? '<span class="mono">' + richText(formatHM($('#return-time').value)) + '</span> · <span lang="en">' + esc(placeOf('to')) + '</span>'
          : richText(t('no'))]
      ];
      // Extra stops sit between pickup and destination.
      $$('.stop', stopsBox).forEach(function (fs, i) {
        const sel = $('select', fs);
        if (!sel.value) { return; }
        const act = $('input[type="radio"]:checked', fs);
        rows.splice(3 + i, 0, ['stop.label', '<span lang="en">' + esc(sel.value) + '</span>' + (act ? ' · ' + richText(t('driver.' + act.value)) : '')]);
      });
      $('#summary').innerHTML = rows.map(function (r) {
        return '<div><dt class="colhead">' + esc(t(r[0])) + '</dt><dd>' + r[1] + '</dd></div>';
      }).join('');
    }

    /**
     * Swap the form for the confirmation and move focus to its heading.
     * @returns {void}
     */
    function showDone() {
      done = true;
      buildSummary();
      form.hidden = true;
      $('#err-summary').hidden = true;
      $('#intro').hidden = true;
      $('#refbox').hidden = false;
      $('#titlebox').classList.add('board');
      const h1 = $('#page-title');
      h1.dataset.i18n = 'done.title';
      h1.textContent = t('done.title');
      document.body.dataset.titleKey = 'done.title';
      document.title = t('done.title') + ' – PolymathTransit';
      $('#done-view').hidden = false;
      window.scrollTo(0, 0);
      h1.focus();
    }

    /**
     * Handle "Send request": stop on errors with the summary, else confirm.
     * @param {Event} [e] The submit event.
     * @returns {void}
     */
    function handleSubmit(e) {
      if (e) { e.preventDefault(); }
      if (validateAll() > 0) {
        renderSummary(true);
        return;
      }
      showDone();
    }
    form.addEventListener('submit', handleSubmit);

    /**
     * Put the page back to an empty form.
     * @returns {void}
     */
    function resetForm() {
      done = false;
      form.reset();
      Object.keys(errors).forEach(function (k) { setError(k, ''); });
      touched.clear();
      stopsBox.innerHTML = '';
      renumberStops();
      ['#date-other-box', '#from-other', '#to-other', '#return-box'].forEach(function (s) { $(s).hidden = true; });
      $$('[data-map-note]').forEach(function (b) { $('#' + b.dataset.mapNote).textContent = ''; });
      lastDate = '';
      showCutoff('', false);
      updatePax(false);
      $('#err-summary').hidden = true;
      form.hidden = false;
      $('#intro').hidden = false;
      $('#refbox').hidden = true;
      $('#titlebox').classList.remove('board');
      $('#done-view').hidden = true;
      const h1 = $('#page-title');
      h1.dataset.i18n = 'form.title';
      h1.textContent = t('form.title');
      document.body.dataset.titleKey = 'form.title';
      document.title = t('form.title') + ' – PolymathTransit';
    }

    /**
     * Fill in the answers for PT-2026-0142 (brief 4.5).
     * @returns {void}
     */
    function fillSample() {
      resetForm();
      $('#name').value = 'Kasun Jayasinghe';
      $('#phone').value = '077 000 0142';
      $('#purpose-sport').checked = true;
      $('#date-1').checked = true;
      lastDate = '2026-10-13';
      showCutoff(lastDate, false);
      $('#from').value = 'Branch B';
      $('#to').value = 'Sports Centre';
      $('#time').value = '08:45';
      $('#flex-10').checked = true;
      $('#pax').value = '4';
      $('#return-yes').checked = true;
      $('#return-box').hidden = false;
      $('#return-time').value = '10:45';
      updatePax(false);
    }

    $('#again').addEventListener('click', function (e) {
      e.preventDefault();
      resetForm();
      window.scrollTo(0, 0);
      $('#page-title').focus();
    });

    // Prototype controls (brief 5.2).
    $$('[data-proto]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const what = btn.dataset.proto;
        if (what === 'fill') { fillSample(); }
        if (what === 'errors') { resetForm(); handleSubmit(); }
        if (what === 'confirm') { fillSample(); handleSubmit(); }
        if (what === 'reset') { resetForm(); window.scrollTo(0, 0); $('#page-title').focus(); }
      });
    });

    // Redraw script-built text in the new language.
    langHooks.push(function () {
      Object.keys(errors).forEach(function (k) { setError(k, errors[k]); });
      if (!$('#err-summary').hidden) { renderSummary(false); }
      const checked = $('input[name="date"]:checked');
      showCutoff(checked ? checked.value : '', false);
      if (done) { buildSummary(); }
    });

    showCutoff('', false);
    updatePax(false);
  }

  // === Section 6: Driver's route (US-60, FR-67, NFR-18) ===

  /**
   * Set up the driver's route: next stop strip, Done with Undo, No-show with
   * a check first, Navigate note, offline banner and progress.
   * @returns {void}
   */
  function initDriver() {
    const list = $('#stops');
    if (!list) { return; }
    document.body.dataset.titleKey = 'driver.title';

    const TOTAL = 14;
    const DONE_BEFORE = 4; // Stops 1 to 4 were done before 9:40 am.
    const UNDO_MS = 10000; // US-60: Undo is offered for 10 seconds.
    const stops = $$('.stop', list);
    const state = { now: '09:40', outcomes: {}, timers: {}, offline: false };

    /**
     * The first stop that is not done yet.
     * @returns {?Element} The stop, or null at the end of the day.
     */
    function nextStop() {
      return stops.filter(function (li) { return !state.outcomes[li.dataset.stop]; })[0] || null;
    }

    /**
     * Redraw the next-stop strip, the highlight and the progress.
     * @returns {void}
     */
    function renderNext() {
      const next = nextStop();
      stops.forEach(function (li) { li.classList.toggle('is-next', li === next); });
      const doneCount = DONE_BEFORE + Object.keys(state.outcomes).length;
      const prog = $('#progress');
      prog.dataset.done = String(doneCount);
      setText(prog, t('driver.progress', { done: doneCount, total: TOTAL }));
      $$('#progress-cells .meter__cell').forEach(function (c, i) { c.classList.toggle('is-on', i < doneCount); });

      const row = $('#nextrow');
      if (!next) {
        row.innerHTML = '<p class="colhead nextrow__label">' + richText(t('driver.next')) + '</p><p class="nextrow__place">' + richText(t('driver.end')) + '</p>';
        return;
      }
      const tHM = next.dataset.t;
      $('#next-no').textContent = next.dataset.stop;
      const timeEl = $('#next-time');
      timeEl.dataset.t = tHM;
      timeEl.setAttribute('datetime', tHM);
      timeEl.innerHTML = boardTimeHTML(tHM);
      const mins = toMinutes(tHM) - toMinutes(state.now);
      const inEl = $('#next-in');
      inEl.dataset.min = String(mins);
      setText(inEl, t('driver.in', { min: mins }));
      inEl.hidden = mins < 0;
      $('#next-place').textContent = $('.stop__place [lang="en"]', next).textContent;
      const act = next.dataset.act;
      $('#next-action').dataset.i18n = 'driver.' + act;
      setText($('#next-action'), t('driver.' + act));
      $('#next-icon use').setAttribute('href', '#i-' + act);
      $('#next-pax').textContent = next.dataset.pax;
      $('#next-ref').textContent = next.dataset.ref;
      $('#next-link').setAttribute('href', '#' + next.id);
    }

    /**
     * Draw a stop's outcome line ("Done at 9:41 am", "No-show at 9:41 am").
     * @param {Element} li The stop.
     * @returns {void}
     */
    function renderOutcome(li) {
      const o = state.outcomes[li.dataset.stop];
      const out = $('.stop__outcome', li);
      if (!o) { out.innerHTML = ''; return; }
      const key = o.type === 'done' ? 'driver.doneat' : 'driver.noshowat';
      const icon = o.type === 'done'
        ? '<svg class="icon icon--sm" aria-hidden="true"><use href="#i-check"/></svg>'
        : '<svg class="glyph" aria-hidden="true"><use href="#g-noshow"/></svg>';
      out.innerHTML = '<span class="remark remark--' + (o.type === 'done' ? 'confirmed' : 'noshow') + '">' + icon +
        '<span>' + richText(t(key, { time: formatHM(o.time) })) + '</span></span>';
    }

    /**
     * Record Done or No-show on a stop, offer Undo for 10 seconds and move
     * the next stop on (US-60).
     * @param {Element} li The stop.
     * @param {string} type 'done' or 'noshow'.
     * @returns {void}
     */
    function finish(li, type) {
      // The prototype's clock moves on one minute: "Done at 9:41 am".
      state.now = '09:41';
      state.outcomes[li.dataset.stop] = { type: type, time: '09:41' };
      $('.stop__confirm', li).hidden = true;
      li.classList.add('is-done');
      const result = $('.stop__result', li);
      result.hidden = false;
      const undoBtn = $('.btn--undo', result);
      undoBtn.hidden = false;
      renderOutcome(li);
      flip($('.stop__outcome .remark', li));
      renderNext();
      const next = nextStop();
      $('#route-live').textContent = $('.stop__outcome', li).textContent +
        (next ? '. ' + t('driver.next') + ': ' + formatHM(next.dataset.t) + ', ' + $('.stop__place [lang="en"]', next).textContent : '');
      undoBtn.focus();
      clearTimeout(state.timers[li.dataset.stop]);
      state.timers[li.dataset.stop] = setTimeout(function () {
        const hadFocus = document.activeElement === undoBtn;
        undoBtn.hidden = true;
        if (hadFocus) { $('.stop__outcome', li).focus(); }
      }, UNDO_MS);
    }

    /**
     * Undo Done or No-show on a stop and give it back its actions.
     * @param {Element} li The stop.
     * @returns {void}
     */
    function undo(li) {
      clearTimeout(state.timers[li.dataset.stop]);
      delete state.outcomes[li.dataset.stop];
      li.classList.remove('is-done');
      $('.stop__result', li).hidden = true;
      renderOutcome(li);
      renderNext();
      $('#route-live').textContent = t('driver.undo') + ': ' + formatHM(li.dataset.t) + ', ' + $('.stop__place [lang="en"]', li).textContent;
      $('[data-act="done"]', li).focus();
    }

    /**
     * Close the No-show question without recording anything.
     * @param {Element} li The stop.
     * @returns {void}
     */
    function closeConfirm(li) {
      $('.stop__confirm', li).hidden = true;
      $('.stop__actions', li).hidden = false;
      $('[data-act="noshow"]', li).focus();
    }

    list.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-act]');
      if (!btn) { return; }
      const li = btn.closest('.stop');
      const act = btn.dataset.act;
      if (act === 'done') { finish(li, 'done'); }
      if (act === 'noshow') {
        // Ask first: a no-show tells the coordinators (US-60).
        $('.stop__actions', li).hidden = true;
        $('.stop__confirm', li).hidden = false;
        $('.stop__question', li).focus();
      }
      if (act === 'noshow-yes') { $('.stop__actions', li).hidden = false; finish(li, 'noshow'); }
      if (act === 'noshow-back') { closeConfirm(li); }
      if (act === 'undo') { undo(li); }
      if (act === 'nav') {
        // The map service is not chosen yet (Q-17): show what would happen.
        const note = $('.stop__navnote', li);
        note.dataset.i18n = 'driver.navnote';
        setText(note, t('driver.navnote'));
      }
    });
    list.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') { return; }
      const box = e.target.closest('.stop__confirm');
      if (box && !box.hidden) { closeConfirm(box.closest('.stop')); }
    });

    /**
     * Show or hide the offline banner; the route stays visible (NFR-18).
     * @param {boolean} on Whether the phone is offline.
     * @returns {void}
     */
    function setOffline(on) {
      state.offline = on;
      $('#offline').hidden = !on;
      setText($('#offline-text'), on ? t('driver.offline') : '');
      const b = $('[data-proto="offline"]');
      if (b) { b.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    }

    $$('[data-proto]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const what = btn.dataset.proto;
        if (what === 'offline') { setOffline(!state.offline); }
        if (what === 'donenext') {
          const next = nextStop();
          if (next) { finish(next, 'done'); }
        }
        if (what === 'reset') { window.location.reload(); }
      });
    });

    langHooks.push(function () {
      renderNext();
      stops.forEach(renderOutcome);
      if (state.offline) { setText($('#offline-text'), t('driver.offline')); }
    });
    renderNext();
  }

  // === Section 7: Dashboard (FR-19, FR-29, US-16, US-22, US-26, BRL-21) ===

  /**
   * Set up the coordinator dashboard: choosing runs, the detail drawer,
   * Approve with Undo, the plan approval dialog and the list view.
   * @returns {void}
   */
  function initDashboard() {
    if (document.body.dataset.page !== 'dashboard') { return; }
    const UNDO_MS = 10000;
    const status = {};
    Object.keys(BOOKINGS).forEach(function (ref) { status[ref] = BOOKINGS[ref].status; });
    let selected = 'PT-2026-0142';
    let opener = null;
    let undoTimer = null;

    // Keep each run's accessible name with a slot for its status word.
    $$('.blk').forEach(function (b) {
      b.dataset.label = b.getAttribute('aria-label').replace(/Confirmed|Proposed|Needs attention/, '{status}');
    });

    /**
     * The seat meter for one stop of a run: one cell per seat, filled for
     * each passenger on board, with the words beside it (never cells alone).
     * @param {number} seats Seats in the van.
     * @param {number} onBoard Passengers on board.
     * @returns {string} HTML of the seat meter (cells and "n of m").
     */
    function meterHTML(seats, onBoard) {
      let cells = '';
      for (let i = 0; i < seats; i += 1) {
        cells += '<span class="meter__cell' + (i < onBoard ? ' is-on' : '') + '"></span>';
      }
      return '<span class="meter"><span class="meter__cells" aria-hidden="true">' + cells + '</span><span class="meter__text">' + onBoard + ' of ' + seats + '</span></span>';
    }

    /**
     * Draw the detail drawer for a booking (FR-19, US-16): status, flags,
     * requester, trip, the explanation word for word, the run with seats on
     * board at each stop, the actions and the audit line.
     * @param {string} ref Booking reference.
     * @returns {void}
     */
    function renderDrawer(ref) {
      const b = BOOKINGS[ref];
      const st = status[ref];
      $('#d-ref').textContent = ref;
      $('#d-status').innerHTML = remarkHTML(st, 'd-remark') + flagsHTML(b.flags);
      $('#d-lead').innerHTML = '<span class="mono">' + esc(formatHM(b.t, 'en')) + '</span> ' + esc(b.route) + ' · ' + esc(b.van);

      let html = '<section aria-labelledby="d-who-h"><h3 id="d-who-h">Requester</h3><p>' + esc(b.requester) +
        ' · <span class="mono">' + esc(b.phone) + '</span>' + (b.contactNote ? ' (' + esc(b.contactNote) + ')' : '') + '</p></section>';
      html += '<section aria-labelledby="d-trip-h"><h3 id="d-trip-h">Trip</h3><dl class="facts-list">' +
        '<dt>Trip for</dt><dd>' + esc(b.purpose) + '</dd>' +
        '<dt>From → To</dt><dd>' + esc(b.route) + '</dd>' +
        '<dt>Pickup</dt><dd>' + esc(b.pickup) + '</dd>' +
        '<dt>Passengers</dt><dd class="mono">' + esc(b.pax) + '</dd>' +
        '<dt>Return</dt><dd>' + esc(b.ret) + '</dd>' +
        '<dt>Van</dt><dd>' + esc(b.van) + '</dd></dl></section>';
      if (b.note) {
        html += '<section aria-labelledby="d-note-h"><h3 id="d-note-h">' + esc(b.note[0]) + '</h3><p>' + esc(b.note[1]) + '</p></section>';
      }
      if (b.why) {
        html += '<section aria-labelledby="d-why-h"><h3 id="d-why-h">Why this plan</h3><ul class="explain">' +
          b.why.map(function (line) { return '<li>' + esc(line) + '</li>'; }).join('') + '</ul>' +
          (b.alternatives ? '<ol class="alts">' + b.alternatives.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ol>' : '') +
          '</section>';
      }
      if (b.run) {
        html += '<div><table class="run"><caption id="d-run-h">Run summary: ' + esc(b.run.van) + ', ' + b.run.seats + ' seats</caption>' +
          '<thead><tr><th scope="col">Time</th><th scope="col">Stop</th><th scope="col">Action</th><th scope="col">On board</th></tr></thead><tbody>' +
          b.run.stops.map(function (s) {
            return '<tr><td class="t">' + esc(formatHM(s[0], 'en')) + '</td><th scope="row">' + esc(s[1]) + '</th><td>' + esc(s[2]) + '</td><td>' + meterHTML(b.run.seats, s[3]) + '</td></tr>';
          }).join('') + '</tbody></table></div>';
      }
      $('#d-body').innerHTML = html;

      // Actions depend on the status. Decline is separated from the others.
      let actions = '';
      if (st === 'proposed' || (st === 'attention' && b.run)) {
        actions += '<button type="button" class="btn btn--primary" data-action="approve"><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>Approve</button>';
      }
      actions += '<button type="button" class="btn btn--secondary" data-action="change">Change</button>';
      if (st !== 'confirmed') {
        actions += '<span class="actions__sep"><button type="button" class="btn btn--danger" data-action="decline">Decline</button></span>';
      }
      $('#d-actions').innerHTML = actions;
      $('#d-audit').textContent = b.audit;
      $('#d-audit').hidden = !b.audit;
    }

    /**
     * Mark the chosen booking in the chart and the table.
     * @param {string} ref Booking reference.
     * @returns {void}
     */
    function markSelected(ref) {
      $$('.blk').forEach(function (blk) {
        if (blk.dataset.refs.split(' ').indexOf(ref) > -1) {
          blk.setAttribute('aria-current', 'true');
        } else {
          blk.removeAttribute('aria-current');
        }
      });
      $$('#trip-table tbody tr').forEach(function (tr) { tr.classList.toggle('is-selected', tr.dataset.ref === ref); });
    }

    /**
     * Open a booking in the drawer.
     * @param {string} ref Booking reference.
     * @param {?Element} from The control that opened it, for Escape.
     * @param {boolean} moveFocus Whether to move focus to the drawer heading.
     * @returns {void}
     */
    function select(ref, from, moveFocus) {
      selected = ref;
      opener = from || null;
      $('#d-live').innerHTML = '';
      renderDrawer(ref);
      markSelected(ref);
      if (moveFocus) { $('#d-ref').focus(); }
    }

    /**
     * Redraw every place a booking's status shows: chart labels and bars,
     * table remarks, tile counts and, if open, the drawer.
     * @param {string[]} changed References whose status changed (flipped).
     * @returns {void}
     */
    function renderStatuses(changed) {
      $$('.blk').forEach(function (blk) {
        const refs = blk.dataset.refs.split(' ');
        refs.forEach(function (r) {
          const use = $('.blk__ref[data-ref="' + r + '"] use', blk);
          if (use) { use.setAttribute('href', '#' + STATUS[status[r]].glyph); }
        });
        const all = refs.map(function (r) { return status[r]; });
        const runStatus = all.indexOf('attention') > -1 ? 'attention' : (all.every(function (s) { return s === 'confirmed'; }) ? 'confirmed' : 'proposed');
        blk.classList.remove('blk--confirmed', 'blk--proposed', 'blk--attention');
        blk.classList.add('blk--' + runStatus);
        blk.setAttribute('aria-label', blk.dataset.label.replace('{status}', STATUS[runStatus].word));
        if (changed.some(function (r) { return refs.indexOf(r) > -1; })) { flip($('.blk__label', blk)); }
      });
      $$('#trip-table tbody tr').forEach(function (tr) {
        const cell = $('.remark', tr).parentNode;
        cell.innerHTML = remarkHTML(status[tr.dataset.ref]);
        if (changed.indexOf(tr.dataset.ref) > -1) { flip($('.remark', cell)); }
      });
      const awaiting = Object.keys(status).filter(function (r) { return status[r] === 'proposed'; })
        .sort(); // Reference order, as the tile lists them (brief 4.8).
      $('#count-awaiting').textContent = String(awaiting.length);
      $('#refs-awaiting').textContent = awaiting.length
        ? 'PT-2026-' + awaiting.map(function (r) { return r.slice(8); }).join(', ')
        : 'None waiting';
      $('#count-attention').textContent = String(Object.keys(status).filter(function (r) { return status[r] === 'attention'; }).length);
      renderDrawer(selected);
      if (changed.indexOf(selected) > -1) { flip($('#d-remark')); }
    }

    /**
     * Approve one proposal: Confirmed everywhere, with a status message and
     * Undo for 10 seconds.
     * @param {string} ref Booking reference.
     * @returns {void}
     */
    function approve(ref) {
      const before = status[ref];
      status[ref] = 'confirmed';
      renderStatuses([ref]);
      const b = BOOKINGS[ref];
      $('#d-live').innerHTML = '<div class="toast"><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg><span>' +
        esc(ref + ' confirmed. ' + b.requester + ' will get a text.') + '</span>' +
        '<button type="button" class="btn btn--quiet" data-undo="' + ref + '" data-before="' + before + '"><svg class="icon" aria-hidden="true"><use href="#i-undo"/></svg>Undo</button></div>';
      clearTimeout(undoTimer);
      undoTimer = setTimeout(function () {
        const u = $('#d-live [data-undo]');
        if (!u) { return; }
        const hadFocus = document.activeElement === u;
        u.remove();
        if (hadFocus) { $('#d-ref').focus(); }
      }, UNDO_MS);
    }

    // Choosing a run or a table reference opens it in the drawer.
    $$('.blk').forEach(function (blk) {
      blk.addEventListener('click', function () { select(blk.dataset.ref, blk, true); });
    });
    $('#trip-table').addEventListener('click', function (e) {
      const btn = e.target.closest('[data-open]');
      if (btn) { select(btn.dataset.open, btn, true); }
    });

    // Drawer actions.
    const drawer = $('#drawer');
    drawer.addEventListener('click', function (e) {
      const act = e.target.closest('[data-action]');
      if (act && act.dataset.action === 'approve') { approve(selected); $('#d-ref').focus(); }
      const u = e.target.closest('[data-undo]');
      if (u) {
        clearTimeout(undoTimer);
        status[u.dataset.undo] = u.dataset.before;
        renderStatuses([u.dataset.undo]);
        $('#d-live').innerHTML = '<div class="toast"><span>' + esc(u.dataset.undo + ' is back to ' + STATUS[u.dataset.before].word + '.') + '</span></div>';
        $('#d-ref').focus();
      }
    });
    // Escape in the drawer returns focus to the run or row that opened it.
    drawer.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && opener && document.contains(opener)) { opener.focus(); }
    });

    // --- Approve today's plan: confirm first (FR-34, FR-61, BRL-21). ---
    const dialog = $('#plan-dialog');
    let dialogOpener = null;

    /**
     * Open the approval dialog. The native dialog traps focus and closes on
     * Escape; focus returns to the control that opened it.
     * @param {?Element} from The control that opened it.
     * @returns {void}
     */
    function openPlanDialog(from) {
      if (!$('#approve-plan')) { return; }
      dialogOpener = from || $('#approve-plan');
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      $('#dlg-yes').focus();
    }

    /**
     * Close the dialog and give focus back.
     * @param {?Element} [focusTo] Where focus goes; defaults to the opener.
     * @returns {void}
     */
    function closePlanDialog(focusTo) {
      if (dialog.open) { dialog.close(); }
      const target = focusTo || dialogOpener;
      if (target && document.contains(target)) { target.focus(); }
    }

    /**
     * Approve the whole plan: every proposal becomes Confirmed; the two
     * requests that need attention stay open (BRL-21).
     * @returns {void}
     */
    function approvePlan() {
      const changed = Object.keys(status).filter(function (r) { return status[r] === 'proposed'; });
      changed.forEach(function (r) { status[r] = 'confirmed'; });
      renderStatuses(changed);
      $('#plan-deadline').remove();
      $('#plan-title').textContent = "Today's plan – approved";
      $('#plan-title').setAttribute('tabindex', '-1');
      $('#plan-live').innerHTML = '<div class="plan-done"><span class="remark remark--confirmed"><svg class="glyph" aria-hidden="true"><use href="#g-confirmed"/></svg><span>Approved</span></span>' +
        '<p>Plan approved at 7:06 am. Final details are going to 8 requesters and route links to 2 drivers.</p></div>';
      flip($('#plan-live .remark'));
      $('#updated').innerHTML = 'Updated <span class="mono">7:06 am</span>';
    }

    $('#approve-plan').addEventListener('click', function (e) { openPlanDialog(e.currentTarget); });
    $('#dlg-no').addEventListener('click', function () { closePlanDialog(); });
    dialog.addEventListener('cancel', function (e) { e.preventDefault(); closePlanDialog(); });
    $('#dlg-yes').addEventListener('click', function () {
      approvePlan();
      closePlanDialog($('#plan-title'));
    });

    // --- List view (FR-29) ---
    const toggle = $('#toggle-list');
    toggle.hidden = false;

    /**
     * Show the chart or the list of the same bookings.
     * @param {boolean} showList Whether to show the list.
     * @returns {void}
     */
    function setListView(showList) {
      toggle.setAttribute('aria-pressed', showList ? 'true' : 'false');
      $('#chart-view').hidden = showList;
      $('#list-view').hidden = !showList;
    }
    toggle.addEventListener('click', function () { setListView(toggle.getAttribute('aria-pressed') !== 'true'); });
    $$('[data-open-list]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        setListView(true);
        $('#trip-table caption').setAttribute('tabindex', '-1');
        $('#trip-table caption').focus();
      });
    });

    $$('[data-proto]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const what = btn.dataset.proto;
        if (what === 'plan') { openPlanDialog(btn); }
        if (what === 'open0149') { setListView(false); select('PT-2026-0149', btn, true); }
        if (what === 'list') { setListView(true); }
        if (what === 'reset') { window.location.reload(); }
      });
    });

    setListView(false);
    select(selected, null, false);
  }

  // === Section 8: Foundations page ===

  /**
   * On the foundations page, let the reader run the remark flip and the
   * language specimen without leaving the page.
   * @returns {void}
   */
  function initFoundations() {
    const btn = $('#flip-demo');
    if (!btn) { return; }
    btn.hidden = false;
    let on = false;
    btn.addEventListener('click', function () {
      on = !on;
      const slot = $('#flip-slot');
      slot.outerHTML = remarkHTML(on ? 'confirmed' : 'proposed', 'flip-slot');
      flip($('#flip-slot'));
      $('#flip-live').textContent = 'Status: ' + (on ? 'Confirmed' : 'Proposed');
    });
  }

  // === Section 9: Start ===

  /**
   * Run every page's setup. Each setup returns at once on pages it does not
   * belong to.
   * @returns {void}
   */
  function start() {
    initRequest();
    initDriver();
    initDashboard();
    initFoundations();
    initLangSwitch();
    // Times in B612 Mono: narrow the colon now and after every redraw.
    tightenColons(document.body);
    let queued = false;
    new MutationObserver(function () {
      if (queued) { return; }
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        tightenColons(document.body);
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  start();
}());
