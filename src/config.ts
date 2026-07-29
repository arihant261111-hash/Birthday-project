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
    lang:    "Nederlands · Dutch",
    message: `Oké, eerst... Ik heb Google Translate gebruikt. Ik spreek geen Nederlands. Maar ik dacht: jij woont in België, dus misschien moet ik ook Nederlands proberen. 😭 Maar nu serieus... Gefeliciteerd met je verjaardag! ❤️`,
    sign:    "",
  },
  {
    lang:    "English",
    message: `Woahhhh okayy, someone's as old as a fossil now lmao, now you can actually use your famous line<br>" I AM 18 " 😹 and sadly i can't get to say<br>" You still have a few days left "<br>Sed, but oh well... You owe me a party !!!`,
    sign:    "",
  },
  {
    lang:    "नेपाली · Nepali",
    message: `Aabo hajur ta ka European vayera, pahila Dutch ra english ma lekhe ewta, ewta para kina vaane kei tha nepali birsinu bha ki? Bahahahahaha ikik malai tyo line pura maan parcha hehehe. Tara saachi ambooo di ta Kati thulo manche omggg 18?!! Ani aajai ek palta..<br>Happy Birthday!!!!`,
    sign:    "",
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
// ─────────────────────────────────────────
//  THE MEMORY — 2008 → 2026 (Section 6)
// ─────────────────────────────────────────

/**
 * Two photographs and one line of ink between them. That is the whole
 * section; there is nothing else in it, on purpose.
 *
 * Drop the files into /public/photos/ and reference them as
 * "/photos/your-file.jpg". Leave `src` empty and a quiet placeholder
 * card shows instead, so the section still works before the real
 * pictures arrive.
 *
 * Portrait images suit the frames best — they are cropped to 4:5 and
 * centred. The years appear exactly as written here.
 */
export const MEMORY = {
  start: {
    year: "2008",
    src:  "/photos/2008.jpg",
    alt:  BIRTHDAY_NAME + " as a baby, 2008",
  },
  end: {
    year: "2026",
    src:  "/photos/2026.jpg",
    alt:  BIRTHDAY_NAME + " at eighteen, 2026",
  },
};

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

  /**
   * Deliberately empty. The letter below opens by saying this in
   * Ari's own words, and the letter should not be introduced by
   * anyone else's.
   */
  openingLines: [] as string[],

  // ── ARI'S WORDS. Do not edit these but for typos. ────────────────
  // Each string is one line, revealed about 1.15s after the last.
  personalLines: [
    "Well, once you told me you'd like someone to write you a letter.",
    "Sadly, I can't really write one on a piece of paper and send it all the way to Belgium.",
    "But I can make your screen become that letter.",
    "So... here I am, writing that very letter.",
    "I've never really been much of a writer. I don't claim to be one either. So I'm sorry if this letter isn't perfect.",
    "Yeah... I wouldn't expect me to write a perfect letter, honestly.",
    "But enough about me.",
    "It's your day, after all.",
    "Actually... before that... sorry for being selfish, let's talk about me for one last time.",
    "I'm sorry that I'm not really good at showing how much you actually mean to me.",
    "I'm pretty horrible at it.",
    "And I've done some really stupid things that may have upset you, or hurt you... maybe both.",
    "I ignored you.",
    "And I'm sorry for that.",
    "But okay...",
    "Seriously though, that's enough about me 😭",
    "It's your day after all...",
    "18.",
    "Crazy.",
    "You're actually legal now.",
    "Wow.",
    "Hope you don't stop talking to me though.",
    "Lmao 😹",
    "Well... I don't wanna make you spend your entire day reading this",
    "I want you to actually enjoy your birthday.",
    "And besides, I feel like you've already read way too much.",
    "I don't want your eyes to start hurting.",
    "Or maybe you'll start blaming me for it. 😭",
    "So...",
    "I hope today is filled with happiness.",
    "And more than anything, I hope this year is kinder to you than the last.",
    "Because trust me...",
    "I know how cruel last year was for you.",
    "So...",
    "For the last time..",
    "Happy Birthday, Avline.",
  ],

  // Signature
  signature: "— Ari",
};