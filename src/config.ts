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
  headline: "Eighteen years of becoming\nsomeone unforgettable.",

  /** The opening letter — shows below the headline. */
  body: `You came into this world and changed the energy of every room you ever walked into. Eighteen years of laughing too loud, of caring too deeply, of being the kind of person poems are written about. This is not just a birthday — it is the beginning of everything you were always meant to become. And I have had the extraordinary privilege of watching it happen.`,
};

// ─────────────────────────────────────────
//  LANGUAGE LETTERS (Section 4)
// ─────────────────────────────────────────

/**
 * NOTE: the Dutch and Nepali messages use the informal register
 * (Dutch je/jij, Nepali तिमी) because this is written friend-to-friend.
 * Please have a native speaker read both before this is sent.
 */
export const LANGUAGE_CARDS = [
  {
    lang:    "English",
    message: `"Happy Birthday, ${BIRTHDAY_NAME}. Eighteen is the age where dreams stop being fantasies and start becoming your story. You are brilliant, radiant, and entirely unforgettable. The world is lucky to have you in it."`,
    sign:    "— with all my love ✦",
  },
  {
    lang:    "Nederlands · Dutch",
    message: `"Gefeliciteerd met je verjaardag, ${BIRTHDAY_NAME}. Achttien is de leeftijd waarop dromen geen fantasie meer zijn, maar jouw verhaal worden. Je bent schitterend, warm en volstrekt onvergetelijk. De wereld mag blij zijn met jou."`,
    sign:    "— met al mijn liefde ✦",
  },
  {
    lang:    "नेपाली · Nepali",
    message: `"जन्मदिनको धेरै धेरै शुभकामना, अवलाइन। अठार वर्षको उमेर त्यो हो जहाँ सपनाहरू कल्पना रहँदैनन्, तिम्रो कथा बन्न थाल्छन्। तिमी उज्यालो छौ, न्यानो छौ, र कहिल्यै बिर्सन नसकिने छौ। यो संसार तिमी भएकोमा भाग्यमानी छ।"`,
    sign:    "— अशेष मायाका साथ ✦",
  },
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
//  VOICE NOTES / AUDIO (Section 8)
// ─────────────────────────────────────────

/**
 * Set `src` to your audio file path, e.g. "/audio/message1.mp3"
 * Leave `src` blank ("") and it will show a friendly "add audio file" message.
 */
/** Two, deliberately. They sit as one balanced row. */
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

/**
 * Her words, not mine. She chose these when asked to describe herself.
 * They animate in one by one on scroll.
 */
export const FOUR_WORDS = ["Understanding", "Curious", "Thoughtful", "Wise"];

export const FOUR_WORDS_COPY = {
  /** Left empty on purpose — this section speaks more quietly than the rest. */
  eyebrow:   "",
  mainLine:  "When I asked you to describe yourself,\nthis is what you said.",
  subLine:   "",
};

// ─────────────────────────────────────────
//  FINAL LETTER (Section 11)
// ─────────────────────────────────────────

export const FINAL_LETTER = {
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
/* ══════════════════════════════════════════════════
   HIDDEN LETTER — the final experience
   Write your real letter here, Ari.
   Each string in LETTER_LINES is one line that
   appears on screen, ~1.15s apart.
══════════════════════════════════════════════════ */
export const HIDDEN_LETTER = {
  // The whisper line shown before the dissolve
  whisperLine: "some things were never meant for a screen.",

  // Fixed opening lines (do not change these)
  openingLines: [
    "My dearest Avline,",
    "You told me once that you wished someone would write you a real letter.",
    "I couldn't press paper into your hands through a screen — so I made the screen become paper instead.",
    "Everything before this was the gift. This is the part that's only yours.",
  ],

  // ── YOUR REAL WORDS GO HERE ──────────────────────
  // Add as many lines as you want. Each string = one line reveal.
  personalLines: [
    "[ your real words, in your real voice ]",
    "[ add more lines as needed ]",
  ],

  // Signature
  signature: "— Ari",
};