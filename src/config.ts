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

  /** The opening letter — shows below the headline. Ari's words. */
  body: `Insane, to think you’re already eighteen, omgg Miss Legal person. Yeah yeah, now you can say you’re a grown ass woman as much as you like and there’s nothing I can do about it 😞 but hey it’s fine I know how to drive and you don’t BAHAHAHHAHAHAH, so I have that over you hehehe.\nWell on a more serious note, it’s amazing to see you turn an age where your dreams start becoming reality.. Eighteen years full of bakchodi? And here I am witnessing it, really glad I got the chance!`,
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
    photo:   "/photos/polaroid-1.jpg",                // set to "/photos/photo1.jpg" to use a real image
    emoji:   "🌸",
    bg:      "linear-gradient(135deg,#7b5ea7,#3d2a6e)",
    caption: "Mouse jasto cha ta hwww 😹",
    tilt:    -4,
  },
  {
    photo:   "/photos/polaroid-2.png",
    emoji:   "🎂",
    bg:      "linear-gradient(135deg,#b89de0,#7b5ea7)",
    caption: "Minecraft?!?!",
    tilt:    3,
  },
  {
    photo:   "/photos/polaroid-3.jpg",
    emoji:   "🌙",
    bg:      "linear-gradient(135deg,#3a1a6e,#9b7ec8)",
    caption: "Amuniiii sleeping beauty hare ni taaa",
    tilt:    -6,
  },
  {
    photo:   "/photos/polaroid-4.jpg",
    emoji:   "⭐",
    bg:      "linear-gradient(135deg,#2a4a7a,#6b8ec8)",
    caption: "Meow Meow?",
    tilt:    5,
  },
  {
    photo:   "/photos/polaroid-5.png",
    emoji:   "🌺",
    bg:      "linear-gradient(135deg,#4a2a3a,#c87e9e)",
    caption: "The Thinker 🗿",
    tilt:    -3,
  },
  {
    photo:   "/photos/polaroid-6.jpg",
    emoji:   "🍃",
    bg:      "linear-gradient(135deg,#2a5c3f,#7ec8a0)",
    caption: "Not even gonna pretend I know what's going on... ",
    tilt:    7,
  },
  // ── Six, so they fill two rows of three exactly. Adding a
  //    seventh will leave one stranded on a row of its own. ────────
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
/** One. It is a birthday song; a second card would only dilute it. */
export const AUDIO_TRACKS = [
  {
    title:    "Happy Birthday, Avline",
    subtitle: "I'm not a singer either. Sorry in advance.",
    src:      "/audio/1.mp4",   // audio-only MP4 (AAC), 46s, 0.7 MB
    color:    "#7b5ea7",
  },
];

// ─────────────────────────────────────────
//  LITTLE THINGS (Section 9)
// ─────────────────────────────────────────

export const LITTLE_THINGS = [
  { icon: "🌸", label: "Flower you like",   value: "Gerbera, Peonies" },
  { icon: "🍜", label: "Favourite Food",    value: "Momos & Ramen" },
  { icon: "🎨", label: "Favourite Colour",  value: "Purple" },
  { icon: "💫", label: "Favourite Memory",  value: "The Ragebait game" },
  { icon: "🎵", label: "Favourite Artist",  value: "Tribal Rain" },
  { icon: "🌙", label: "Favourite Place",   value: "The Bed" },
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

  /**
   * Ari's words. The element is white-space: pre-wrap, so every line
   * break here is a real one on screen. Do not reflow this.
   */
  body: `Well,
You finally made it to the end of this website.
I really hope at least some of the things I made managed to make you smile and actually made you happy on your birthday.
Because you've told me before that you don't really feel happy on your birthdays anymore.
So...
I hope I managed to change that, even if it was just for today.

You're 18 now.
And I really hope your dreams slowly start becoming reality instead of just staying dreams.
I genuinely pray that they do.
Seeing you succeed is also a part of my dream.

I know you were probably planning on moving out sometime this year.
Sadly, because of everything that's happened and other stuff you can't right now.
But that's okay.
There's still time.
There's no need to rush.

Before you go...
There are just a few more things I want to say.

I want you to know that you are enough.
You always have been.
You're human, Of course you're going to doubt yourself sometimes but at the end of the day,
You're you yk?

And for who you are, You are more than enough.
You make people smile, No matter what your family says.
You really are one of the kindest people I've ever met.
The stress from work, school, family
That feeling of being helpless...
Yeah ik it sucks, it really fucking sucks
I know.
But,
It's your birthday today.
So let's forget about all of that, even if it's just for one day.
Deal?

It's honestly funny thinking about everything.
Last year, I had literally forgotten your name,
Now I've probably written "Avline" over a hundred times because of all the testing I had to do for this website.
Trust me...
It had me crashing out. 😭

At the beginning,
You didn't really want to talk to me.
You were pretty avoidant.
Which is completely fair.
I was really annoying back then.
(still am, honestly. 😭)
But then,
You slowly started warming up to me.
Then came Among Us.
Then chess.
Then all those all nighters on calls that lasted seven hours.
Those were something else, the talks we had.
( The deep talks and gossips ! )

Then came that ragebait game-
Ong,, it was pure chaos... The crashing out.
We spent 44 fucking minutes trying to beat
one level.
ONE !!!! 😭
Honestly...
I still think that's one of my favourite memories.
We were absolutely crashing out.

And somehow...

From me forgetting your name last year...
To us talking every single day now...
Here we are, and also !!!

You still owe me a party, by the way.
Don't think I've forgotten that. 😹
Anyways-
There's one last gift I've prepared for you.
So...
Go on.
Open it.`,

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
  openingLines: ["Dear Avline,"],

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