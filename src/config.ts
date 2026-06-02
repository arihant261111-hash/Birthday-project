/**
 * ════════════════════════════════════════════════════════════════
 *   AVLINE'S BIRTHDAY WEBSITE — ALL YOUR EDITABLE CONTENT
 * ════════════════════════════════════════════════════════════════
 *
 *  This is the ONLY file you need to edit to personalise the site.
 *  Everything here is referenced by the rest of the app.
 *
 *  HOW TO EDIT PHOTOS:
 *   1. Drop your image files into /public/photos/ (create the folder).
 *   2. Reference them as "/photos/your-file.jpg" in the polaroids + timeline arrays.
 *
 *  HOW TO EDIT AUDIO:
 *   1. Drop your .mp3 / .m4a files into /public/audio/ (create the folder).
 *   2. Set the `src` field to "/audio/your-file.mp3".
 *
 *  ALL OTHER TEXT — just edit the strings directly.
 */

// ─────────────────────────────────────────
//  THE BASICS
// ─────────────────────────────────────────

export const BIRTHDAY_NAME = "Avline";
export const BIRTHDAY_AGE  = 18;

/**
 * Her birthday in IST (India Standard Time, UTC+5:30).
 * year / month (1–12) / day / hour / minute / second
 */
export const BIRTHDAY_DATE = {
  year:  2026,
  month: 7,    // July
  day:   30,   // July 30
  hour:  0,
  min:   0,
  sec:   0,
};

// ─────────────────────────────────────────
//  COUNTDOWN SCREEN (Section 1)
// ─────────────────────────────────────────

/** One message per day of the week (Sun → Sat). Can be any length. */
export const COUNTDOWN_MESSAGES = [
  '"Something beautiful is waiting."',
  '"Just a little longer."',
  '"The stars are counting too."',
  '"Every second brings you closer."',
  '"The universe has been preparing."',
  '"Almost there, love."',
  '"Some things are worth every wait."',
];

// ─────────────────────────────────────────
//  UNLOCK SCREEN (Section 2)
// ─────────────────────────────────────────

export const UNLOCK = {
  topLine:   "the day has finally arrived.",
  headline:  `Happy ${BIRTHDAY_AGE}th Birthday,\n${BIRTHDAY_NAME}.`,
  sub:       "Every star counted down for this moment.",
  btnLabel:  "Open Your Birthday Letter",
};

// ─────────────────────────────────────────
//  HERO LETTER (Section 3)
// ─────────────────────────────────────────

export const HERO = {
  eyebrow:  `For ${BIRTHDAY_NAME}`,
  headline: "Fifteen years of becoming\nsomeone unforgettable.",

  /** The opening letter — shows below the headline. */
  body: `You came into this world and changed the energy of every room you ever walked into. Fifteen years of laughing too loud, of caring too deeply, of being the kind of person poems are written about. This is not just a birthday — it is the beginning of everything you were always meant to become. And I have had the extraordinary privilege of watching it happen.`,
};

// ─────────────────────────────────────────
//  LANGUAGE LETTERS (Section 4)
// ─────────────────────────────────────────

export const LANGUAGE_CARDS = [
  {
    lang:    "English",
    message: `"Happy Birthday, ${BIRTHDAY_NAME}. Eighteen is the age where dreams stop being fantasies and start becoming your story. You are brilliant, radiant, and entirely unforgettable. The world is lucky to have you in it."`,
    sign:    "— with all my love ✦",
  },
  {
    lang:    "हिन्दी · Hindi",
    message: `"जन्मदिन मुबारक हो, अवलाइन। अठारह साल की उम्र में तुम जो बन गई हो, वो बहुत कम लोग बन पाते हैं — खूबसूरत, दिलेर, और दिल को छू लेने वाली। यह सफर और भी सुनहरा हो।"`,
    sign:    "— ढेर सारा प्यार के साथ ✦",
  },
  {
    lang:    "বাংলা · Bengali",
    message: `"শুভ জন্মদিন, অ্যাভলাইন। তুমি যে মানুষটা হয়ে উঠেছ, সে মানুষটা এই পৃথিবীকে আরও সুন্দর করে দিয়েছে। আঠারোয় পা দিয়ে তুমি যে অধ্যায়ে প্রবেশ করছ, সেটা হোক তোমার সবচেয়ে উজ্জ্বল অধ্যায়।"`,
    sign:    "— অনেক ভালোবাসায় ✦",
  },
  {
    lang:    "Deutsch · German",
    message: `"Herzlichen Glückwunsch zum Geburtstag, Avline. Mit achtzehn Jahren beginnt das schönste Kapitel deines Lebens. Du bist strahlend, klug und einzigartig — möge dieses Jahr dir alles bringen, was du dir erträumst."`,
    sign:    "— in Liebe und Bewunderung ✦",
  },
  // ── ADD MORE LANGUAGES BELOW ──────────────────────────────────────
  // {
  //   lang:    "Français · French",
  //   message: `"Joyeux anniversaire, Avline. ..."`,
  //   sign:    "— avec tout mon amour ✦",
  // },
];

// ─────────────────────────────────────────
//  POLAROID MEMORY WALL (Section 5)
// ─────────────────────────────────────────

/**
 * For REAL photos: set `photo: "/photos/your-file.jpg"` and remove `emoji` / `bg`.
 * For placeholder gradients: leave `photo` blank and keep `emoji` + `bg`.
 * `tilt` is rotation in degrees (positive = clockwise, negative = counter-clockwise).
 */
export const POLAROIDS = [
  {
    photo:   "",                // set to "/photos/photo1.jpg" to use a real image
    emoji:   "🌸",
    bg:      "linear-gradient(135deg,#7b5ea7,#3d2a6e)",
    caption: "the very beginning ✦",
    tilt:    -4,
  },
  {
    photo:   "",
    emoji:   "🎂",
    bg:      "linear-gradient(135deg,#b89de0,#7b5ea7)",
    caption: "birthday girl ✦",
    tilt:    3,
  },
  {
    photo:   "",
    emoji:   "🌙",
    bg:      "linear-gradient(135deg,#3a1a6e,#9b7ec8)",
    caption: "late night dreams ✦",
    tilt:    -6,
  },
  {
    photo:   "",
    emoji:   "⭐",
    bg:      "linear-gradient(135deg,#2a4a7a,#6b8ec8)",
    caption: "shining always ✦",
    tilt:    5,
  },
  {
    photo:   "",
    emoji:   "🌺",
    bg:      "linear-gradient(135deg,#4a2a3a,#c87e9e)",
    caption: "in full bloom ✦",
    tilt:    -3,
  },
  {
    photo:   "",
    emoji:   "🍃",
    bg:      "linear-gradient(135deg,#2a5c3f,#7ec8a0)",
    caption: "wild and free ✦",
    tilt:    7,
  },
  {
    photo:   "",
    emoji:   "☕",
    bg:      "linear-gradient(135deg,#5c2a1a,#c89060)",
    caption: "cozy afternoons ✦",
    tilt:    -5,
  },
  {
    photo:   "",
    emoji:   "✨",
    bg:      "linear-gradient(135deg,#1a1a5c,#8080e0)",
    caption: "magic everywhere ✦",
    tilt:    4,
  },
  // ── ADD MORE POLAROIDS BY COPYING A BLOCK ABOVE ───────────────────
];

// ─────────────────────────────────────────
//  TIMELINE (Section 6)
// ─────────────────────────────────────────

/**
 * Alternates left/right automatically.
 * For a real photo: `photo: "/photos/timeline1.jpg"`.
 * Mark the last (current) entry with `isCurrent: true`.
 */
export const TIMELINE = [
  {
    year:      "2006",
    event:     "The World Changes",
    text:      "A small but extraordinary person arrives, bringing with her the kind of light that doesn't dim. The universe rearranges itself, quietly.",
    photo:     "",
    emoji:     "🍼",
    photoBg:   "linear-gradient(135deg,#3d1a5c,#9b7ec8)",
    isCurrent: false,
  },
  {
    year:      "2012",
    event:     "The Reader Awakens",
    text:      "Words become her world. She discovers she can carry entire universes inside her and that words are the most powerful thing a person can hold.",
    photo:     "",
    emoji:     "📚",
    photoBg:   "linear-gradient(135deg,#1a3a5c,#6b8ec8)",
    isCurrent: false,
  },
  {
    year:      "2016",
    event:     "The Artist Emerges",
    text:      "She starts creating, finding that her hands can make the world look the way she feels it. Every creation is a small piece of her soul made visible.",
    photo:     "",
    emoji:     "🎨",
    photoBg:   "linear-gradient(135deg,#3a2a1a,#c8a060)",
    isCurrent: false,
  },
  {
    year:      "2020",
    event:     "The Dreamer Grows",
    text:      "Through a world turned upside-down, she stays curious, tender, and endlessly creative. Some people shrink in hard times. She only bloomed.",
    photo:     "",
    emoji:     "🌸",
    photoBg:   "linear-gradient(135deg,#1a3a2a,#60c890)",
    isCurrent: false,
  },
  {
    year:      "2024",
    event:     "Eighteen ✦",
    text:      "The most beautiful chapter begins. Every version of her that existed before was preparing for this: the one who knows who she is and is no longer afraid of it.",
    photo:     "",
    emoji:     "✨",
    photoBg:   "linear-gradient(135deg,#7b5ea7,#d4c5e8)",
    isCurrent: true,
  },
  // ── ADD MORE TIMELINE ENTRIES HERE ───────────────────────────────
];

// ─────────────────────────────────────────
//  15 THINGS (Section 7)
// ─────────────────────────────────────────

export const FIFTEEN_THINGS = [
  {
    title: "The way you love people",
    body:  "You love with your whole chest. No halfway, no conditions. When you care about someone, they feel it in every single interaction. That kind of love is rare, and you give it so freely.",
  },
  {
    title: "Your laugh",
    body:  "It fills every room like sunlight through glass. It is entirely unself-conscious and entirely contagious. The world sounds better when you laugh in it.",
  },
  {
    title: "How endlessly curious you are",
    body:  "You want to understand everything — why things work, how people feel, what makes the world spin the way it does. That hunger for understanding makes you extraordinary to talk to.",
  },
  {
    title: "Your creativity",
    body:  "You see the world differently than most people. Where others see ordinary, you see beautiful. Where others see blank space, you see possibility. That is an extraordinary gift.",
  },
  {
    title: "The passion you carry",
    body:  "When you care about something, you care about it completely. You do not do things halfway. That intensity — that fire — it is one of the most beautiful things about you.",
  },
  {
    title: "Your softness",
    body:  "In a world that tries to harden people, you remain tender. You feel things deeply and you refuse to apologise for it. Softness is not weakness — it is extraordinary strength.",
  },
  {
    title: "The way you make people feel seen",
    body:  "You listen like someone's words actually matter to you. You look at people like they are worth looking at. That attention, that presence — it is the rarest and most generous gift.",
  },
  {
    title: "Your taste in everything",
    body:  "Music, food, art, words — you have an eye and ear for beauty. Your taste is distinctly yours and it is impossibly good. Being around you is like being around someone who makes everything more interesting.",
  },
  {
    title: "How brave you are",
    body:  "Not the fearless kind — the better kind. You feel the fear and move forward anyway. You try things that scare you. You speak up even when your voice shakes. That is real courage.",
  },
  {
    title: "Your honesty",
    body:  "You say what you mean and you mean what you say. You do not perform or pretend. There is something so refreshing and rare about a person who is genuinely, consistently real.",
  },
  {
    title: "The way you carry sadness",
    body:  "You do not pretend pain does not exist. You sit with it, you feel it, and then you find your way through. Watching you navigate hard things with such grace has taught me more than you know.",
  },
  {
    title: "Your sense of humour",
    body:  "You are genuinely funny — not in a performative way, but in the kind that sneaks up on you and makes you laugh before you can stop yourself. Wit like yours is a gift to everyone around you.",
  },
  {
    title: "The dreams you carry",
    body:  "Your dreams are big and they are entirely your own. You know what you want, and you move toward it with this quiet, certain energy. The world does not know yet what is coming. I do.",
  },
  {
    title: "Your loyalty",
    body:  "You do not abandon people when things get hard. You stay. You show up. The people lucky enough to be loved by you know what it means to have someone truly in their corner.",
  },
  {
    title: "Who you are becoming",
    body:  "The most exciting thing about you is not even who you are right now — it is who you are still becoming. Every version of you has been extraordinary. I cannot wait to witness all the ones still to come.",
  },
  // ── YOU CAN EDIT ANY OF THESE, OR ADD MORE ───────────────────────
];

// ─────────────────────────────────────────
//  VOICE NOTES / AUDIO (Section 8)
// ─────────────────────────────────────────

/**
 * Set `src` to your audio file path, e.g. "/audio/message1.mp3"
 * Leave `src` blank ("") and it will show a friendly "add audio file" message.
 */
export const AUDIO_TRACKS = [
  {
    title:    "A Message Just For You",
    subtitle: "Something I have wanted to say for a long time",
    src:      "",   // ← e.g. "/audio/message1.mp3"
    color:    "#7b5ea7",
  },
  {
    title:    "Our Favourite Memory",
    subtitle: "The one I keep returning to when I think of you",
    src:      "",   // ← e.g. "/audio/memory.mp3"
    color:    "#b89de0",
  },
  {
    title:    `Happy Birthday, ${BIRTHDAY_NAME}`,
    subtitle: "Eighteen wishes, spoken softly",
    src:      "",   // ← e.g. "/audio/birthday.mp3"
    color:    "#d4c5e8",
  },
  // ── ADD MORE TRACKS BY COPYING A BLOCK ABOVE ─────────────────────
];

// ─────────────────────────────────────────
//  LITTLE THINGS (Section 9)
// ─────────────────────────────────────────

export const LITTLE_THINGS = [
  { icon: "🌸", label: "Favourite Flower",  value: "Gerbera Daisies" },
  { icon: "🍜", label: "Favourite Food",    value: "Momos & Ramen" },
  { icon: "🎨", label: "Favourite Colour",  value: "Deep Purple" },
  { icon: "💫", label: "Favourite Memory",  value: "The day everything changed for the better" },
  { icon: "🎵", label: "Favourite Song",    value: "Something that sounds like her" },
  { icon: "🌙", label: "Favourite Place",   value: "Wherever she feels most free" },
  // ── ADD / REMOVE / REORDER CARDS FREELY ──────────────────────────
];

// ─────────────────────────────────────────
//  FOUR WORDS (Section 10)
// ─────────────────────────────────────────

/** Exactly these 4 words will animate in one by one on scroll. */
export const FOUR_WORDS = ["Kind", "Brilliant", "Beautiful", "Unforgettable"];

export const FOUR_WORDS_COPY = {
  eyebrow:   "If I had to choose",
  mainLine:  "If I had only four words to describe you,\nthese would never be enough.",
  subLine:   "No language has ever been built for what you are.",
};

// ─────────────────────────────────────────
//  FINAL LETTER (Section 11)
// ─────────────────────────────────────────

export const FINAL_LETTER = {
  pullQuote: `"She is made of wildflower and starlight,\nof monsoon and melody —\nof every beautiful thing\nthe world has ever held."`,

  /** The "For [name], on her Nth birthday" line */
  addressee: `For ${BIRTHDAY_NAME}, on her ${BIRTHDAY_AGE}th birthday —`,

  /** The body of the letter — use \n\n for new paragraphs */
  body: `There are not enough pages in any book I have ever read to contain everything I want to say to you on this day. So I will say only this: you are one of the most extraordinary people I have ever had the privilege of knowing. Watching you grow has been the most beautiful thing.

At eighteen, you stand at the beginning of everything. Every dream you have ever whispered to yourself in the dark — this is when they start coming true. The world does not know yet what is coming. But I do.

You are going to do things that take your own breath away. You are going to love and be loved in ways that feel like something out of books. You are going to become, over and over again, more yourself than you have ever been.

On this day, I want you to know: you are already enough. You have always been enough. Every single version of you — even the uncertain, even the aching, even the in-between — has been exactly enough.

Happy birthday, ${BIRTHDAY_NAME}. Thank you for existing.`,

  signatureLine1: "With all my love,",
  signatureLine2: "— Ari ✦",  // ← change to your name
};