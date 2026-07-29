/**
 * Avline's Birthday — runtime renderer + interactions
 * Pulls ALL content from ./config.ts
 * ─────────────────────────────────────────────────────
 * You should never need to edit this file.
 * Edit src/config.ts for all personalisation.
 */
import "./index.css";
import {
  HIDDEN_LETTER,
  UNLOCK,
  HERO,
  LANGUAGE_CARDS,
  POLAROIDS,
  MEMORY,
  AUDIO_TRACKS,
  LITTLE_THINGS,
  FOUR_WORDS,
  FOUR_WORDS_COPY,
  FINAL_LETTER,
} from "./config";

/* ══════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════ */
function el<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}
function make<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  cls?: string,
  inner?: string
): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls)   e.className   = cls;
  if (inner) e.innerHTML   = inner;
  return e;
}
function formatTime(s: number) {
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

/* ══════════════════════════════════════════════════
   1. INJECT STATIC TEXT FROM CONFIG
══════════════════════════════════════════════════ */
function applyStaticText() {
  // Unlock screen
  setText("unlockDate",     UNLOCK.topLine);
  setHTML("unlockHeadline", UNLOCK.headline.replace("\n", "<br>"));
  setText("unlockSub",      UNLOCK.sub);
  setText("unlockBtnText",  UNLOCK.btnLabel);

  // Hero
  setText("heroEyebrow",   HERO.eyebrow);
  setHTML("heroHeadline",  HERO.headline.replace("\n", "<br>"));
  // paragraph breaks in the body are real breaks, not collapsed space
  setHTML("heroPara",      HERO.body.replace(/\n/g, "<br><br>"));

  // Four words — eyebrow and sub-line are optional; when they are
  // empty the elements are removed so they leave no gap behind.
  setOptional("wordsEyebrow", FOUR_WORDS_COPY.eyebrow);
  // each line gets its own element so the second can be sized apart
  setHTML("wordsMainLine", FOUR_WORDS_COPY.mainLine.split("\n")
    .map((line, i) => `<span class="words-line words-line--${i + 1}">${line}</span>`)
    .join(""));
  setOptional("wordsSubLine", FOUR_WORDS_COPY.subLine);

  // Final letter
  setText("finalAddressee",    FINAL_LETTER.addressee);
  setText("finalLetterBody",   FINAL_LETTER.body);
}

function setText(id: string, val: string) {
  const e = el(id); if (e) e.textContent = val;
}
function setHTML(id: string, val: string) {
  const e = el(id); if (e) e.innerHTML = val;
}
/** Sets text, or removes the element entirely when the copy is blank. */
function setOptional(id: string, val: string) {
  const e = el(id); if (!e) return;
  if (val && val.trim()) e.textContent = val; else e.remove();
}

/* ══════════════════════════════════════════════════
   2. RENDER LANGUAGE CARDS
══════════════════════════════════════════════════ */
function renderLanguageCards() {
  const carousel = el("langCarousel");
  const dotsWrap = el("langDots");
  if (!carousel || !dotsWrap) return;

  carousel.innerHTML = "";
  dotsWrap.innerHTML = "";

  LANGUAGE_CARDS.forEach((card, i) => {
    const div = make("div", `lang-card${i === 0 ? " lang-card--active" : ""}`);
    div.innerHTML = `
      <div class="lang-card-inner">
        <p class="lang-label">${card.lang}</p>
        <div class="lang-deco">✦ ❀ ✦</div>
        <p class="lang-message">${card.message}</p>
        ${card.sign ? `<p class="lang-sign">${card.sign}</p>` : ""}
      </div>`;
    carousel.appendChild(div);

    const dot = make("button", `lang-dot${i === 0 ? " lang-dot--active" : ""}`);
    dot.dataset.idx = String(i);
    dot.setAttribute("aria-label", `Go to ${card.lang}`);
    dotsWrap.appendChild(dot);
  });
}

/* ══════════════════════════════════════════════════
   3. RENDER POLAROIDS
══════════════════════════════════════════════════ */
function renderPolaroids() {
  const grid = el("polaroidGrid");
  if (!grid) return;
  grid.innerHTML = "";

  POLAROIDS.forEach((p, i) => {
    const art = make("article", "polaroid");
    art.dataset.tilt  = String(p.tilt);
    art.dataset.photo = String(i);
    art.style.transform = `rotate(${p.tilt}deg)`;

    const imgDiv = make("div", "polaroid-img");
    if (p.photo) {
      const img = document.createElement("img");
      img.src = p.photo;
      img.alt = p.caption;
      img.style.cssText = "width:100%;height:100%;object-fit:cover;";
      imgDiv.appendChild(img);
    } else {
      const ph = make("div", "polaroid-placeholder");
      ph.style.background = p.bg;
      const emoji = make("span", "polaroid-emoji");
      emoji.textContent = p.emoji;
      ph.appendChild(emoji);
      imgDiv.appendChild(ph);
    }

    const cap = make("div", "polaroid-caption");
    cap.textContent = p.caption;

    art.appendChild(imgDiv);
    art.appendChild(cap);
    grid.appendChild(art);
  });
}

/* ══════════════════════════════════════════════════
   4. THE MEMORY — 2008 → 2026

   One stroke of ink leaves the first photograph, carries eighteen
   years, and finishes as the rule above the letter. It is the same
   path throughout; there is no separate divider.

   Three things this depends on, all of them learned the hard way:

   · The path is built from the *measured* corners of the rendered
     prints, so it meets them at any viewport, and is rebuilt on
     resize. Nothing is hard-coded.
   · The reveal is keyed to scroll through an arc-length table, so
     the pen's on-screen speed comes from the geometry: shallow
     stretches hurry, the vertical descent is deliberate. Tempo is
     not scripted.
   · The photograph scrolls upward one viewport-height for every
     viewport-height scrolled, so the ending cannot be slowed by
     spending more scroll — it would push her out of frame. The
     slowness comes from the pen stopping instead.
══════════════════════════════════════════════════ */
const MEM = {
  DW: 1000, DH: 3200,          /* design space of the section        */
  MID_T: [0.14, 0.36, 0.56, 0.76, 0.90],
  DEV:   [-26, -46, -38, -16, -4],   /* narrow band, left of centre  */
  N: 800,
  STALL: 0.22,                 /* scroll spent where nothing descends */
  ENDSLOW: 1.28,               /* the approach costs more scroll      */
  DWELL: 0.05,                 /* the silence after contact           */
  PRE: 0.05,                   /* paper warms before contact          */
  POST: 0.105,                 /* and resolves after the silence      */
  PENLINE: 0.62,               /* where on screen the pen tip rides   */
  RATE: 6,                     /* how fast the pen catches the scroll */
};

let memPath: SVGPathElement | null = null;
let memKeys = new Float32Array(MEM.N);
let memLens = new Float32Array(MEM.N);
let memLen = 0, memPen = 0;
let memTop = 0, memH = 1, memVh = 1, memReady = false;
let memContact = 0.8, memHoldTo = 0.85, memDevFrom = 0, memDevTo = 1;
let memRaf: number | null = null;

function renderMemory() {
  const section = el("memory");
  memPath = document.getElementById("memoryPath") as SVGPathElement | null;
  if (!section || !memPath) return;

  // fill the two photographs from config
  ([["Start", MEMORY.start], ["End", MEMORY.end]] as const).forEach(([k, p]) => {
    setText(`memory${k}Year`, p.year);
    const holder = el(`memory${k}Img`);
    if (holder && p.src) {
      const img = new Image();
      img.src = p.src;
      img.alt = p.alt;
      // if the file is not there yet the placeholder card simply stays
      img.onerror = () => img.remove();
      holder.appendChild(img);
    }
  });

  memBuild();
  memLastW = window.innerWidth;
  memLastH = window.innerHeight;
  window.addEventListener("resize", memOnResize);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    memPath.style.strokeDasharray = "none";
    memPath.style.strokeDashoffset = "0";
    memSetPhotos(1);
    return;
  }

  memSetPhotos(0);
  if (memReady) memPen = memTarget();
  memPaint();

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => (e.isIntersecting ? memStart() : memStop()));
  }, { rootMargin: "30% 0px 30% 0px" });
  io.observe(section);

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (y + memVh > memTop - memVh && y < memTop + memH + memVh) memStart();
  }, { passive: true });
}

let memLastW = 0, memLastH = 0;

/**
 * iOS fires resize every time the URL bar collapses or expands while
 * you scroll. Rebuilding the path on those would re-cut the geometry
 * mid-gesture and jump the ink. Only a width change or a real height
 * change — a rotation, not browser chrome — earns a rebuild; anything
 * smaller just refreshes the measurements the scroll maths needs.
 */
function memOnResize() {
  const w = window.innerWidth, h = window.innerHeight;
  const structural = w !== memLastW || Math.abs(h - memLastH) > 120;
  memLastW = w; memLastH = h;

  if (structural) { memBuild(); return; }

  const section = el("memory");
  if (!section || !section.offsetHeight) return;
  memTop = section.getBoundingClientRect().top + window.scrollY;
  memH   = section.offsetHeight;
  memVh  = h;
}

/** Catmull-Rom through the waypoints; shape comes from the points
    alone, so it stays smooth at any viewport without tuned angles. */
function memCurve(P: number[][]): string {
  const n = P.length, m: number[][] = [];
  for (let i = 0; i < n; i++) {
    const a = P[Math.max(0, i - 1)], b = P[Math.min(n - 1, i + 1)];
    m.push([(b[0] - a[0]) * 0.5, (b[1] - a[1]) * 0.5]);
  }
  let d = `M ${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const p = P[i], q = P[i + 1];
    const chord = Math.hypot(q[0] - p[0], q[1] - p[1]);
    const k1 = Math.min(1, chord * 0.4 / (Math.hypot(m[i][0], m[i][1]) / 3 || 1e-6));
    const k2 = Math.min(1, chord * 0.4 / (Math.hypot(m[i + 1][0], m[i + 1][1]) / 3 || 1e-6));
    d += ` C ${(p[0] + m[i][0] / 3 * k1).toFixed(1)} ${(p[1] + m[i][1] / 3 * k1).toFixed(1)}`
       + `, ${(q[0] - m[i + 1][0] / 3 * k2).toFixed(1)} ${(q[1] - m[i + 1][1] / 3 * k2).toFixed(1)}`
       + `, ${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
  }
  return d;
}

function memBuild() {
  const section = el("memory");
  if (!section || !memPath) return;
  const h = window.innerHeight, sh = section.offsetHeight, sw = section.offsetWidth;
  if (!h || !sh || !sw) { memReady = false; return; }   // hidden / pre-render

  const S = section.getBoundingClientRect();
  const rect = (id: string) => {
    const e = el(id); if (!e) return null;
    const r = e.getBoundingClientRect();
    return {
      x1: (r.left  - S.left) / S.width  * MEM.DW, x2: (r.right  - S.left) / S.width  * MEM.DW,
      y1: (r.top   - S.top)  / S.height * MEM.DH, y2: (r.bottom - S.top)  / S.height * MEM.DH,
    };
  };
  const startPrint = rect("memoryStart")!, endPrint = rect("memoryEnd")!;
  const sImg = rect("memoryStartImg")!, eImg = rect("memoryEndImg")!;
  if (!startPrint || !endPrint) return;
  const margin = 10 / sw * MEM.DW;

  // begins on the first print's own lower margin, beneath the picture
  const A: number[] = [sImg.x2 - (sImg.x2 - sImg.x1) * 0.22, sImg.y2 + (startPrint.y2 - sImg.y2) * 0.4];
  // contact: the waiting print's top-left corner
  const C: number[] = [eImg.x1 - margin * 0.5, eImg.y1 - margin * 0.5];

  const room = sw >= 700 ? 1 : 0.5;
  const P: number[][] = [A];
  MEM.MID_T.forEach((t, i) => {
    const x = A[0] + (C[0] - A[0]) * t + MEM.DEV[i] * room;
    P.push([Math.max(70, Math.min(MEM.DW - 70, x)), A[1] + (C[1] - A[1]) * t]);
  });
  P.push(C);
  // down the print's own margin — never across the picture
  P.push([C[0], (eImg.y1 + eImg.y2) / 2]);
  P.push([C[0], eImg.y2 + margin * 0.4]);
  // and out, turning into the rule above the letter
  P.push([endPrint.x1 - (endPrint.x2 - endPrint.x1) * 0.10, endPrint.y2 + 34]);
  P.push([endPrint.x1 - (endPrint.x2 - endPrint.x1) * 0.55, endPrint.y2 + 52]);
  P.push([Math.max(90, endPrint.x1 - (endPrint.x2 - endPrint.x1) * 1.05), endPrint.y2 + 60]);

  const keep = memLen > 0 ? memPen : 0;
  memPath.setAttribute("d", memCurve(P));
  memLen = memPath.getTotalLength();

  const step = memLen / (MEM.N - 1);
  let contactLen = memLen;
  for (let i = 1; i < MEM.N; i++) {
    if (memPath.getPointAtLength(step * i).y >= C[1]) { contactLen = step * i; break; }
  }
  const slowFrom = contactLen - memLen * 0.12;

  // base cost of each step in scroll, plus the extras
  const base = new Float64Array(MEM.N), extra = new Float64Array(MEM.N);
  let extraTotal = MEM.DWELL, dwellAt = -1;
  let prev = memPath.getPointAtLength(0);
  for (let i = 1; i < MEM.N; i++) {
    const len = step * i, pt = memPath.getPointAtLength(len);
    base[i] = Math.max((pt.y - prev.y) / MEM.DH, (step / MEM.DH) * MEM.STALL);
    if (len >= slowFrom) { extra[i] = base[i] * (MEM.ENDSLOW - 1); extraTotal += extra[i]; }
    if (dwellAt < 0 && len >= contactLen) dwellAt = i;
    prev = pt;
  }
  if (dwellAt < 0) dwellAt = MEM.N - 1;

  // cap the drift, or the pen finishes above the fold
  const cap = 0.52 * (h / sh);
  let dwell = MEM.DWELL;
  if (extraTotal > cap) {
    const k = cap / extraTotal;
    dwell *= k;
    for (let i = 0; i < MEM.N; i++) extra[i] *= k;
  }

  // start the schedule at the ink's own height, so one unit of
  // descent really is one unit of scroll and the tip rides the pen line
  let key = memPath.getPointAtLength(0).y / MEM.DH;
  memKeys[0] = key; memLens[0] = 0;
  for (let i = 1; i < MEM.N; i++) {
    if (i === dwellAt) { memContact = key; key += dwell; }
    key += base[i] + extra[i];
    memKeys[i] = key; memLens[i] = step * i;
  }

  memHoldTo  = memContact + dwell;
  memDevFrom = memContact - MEM.PRE;
  memDevTo   = memHoldTo + MEM.POST;

  memTop = S.top + window.scrollY;
  memH = sh; memVh = h; memReady = true;
  memPen = keep;
}

function memLookup(pf: number): number {
  if (pf <= memKeys[0]) return 0;
  if (pf >= memKeys[MEM.N - 1]) return memLen;
  let lo = 0, hi = MEM.N - 1;
  while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (memKeys[mid] <= pf) lo = mid; else hi = mid; }
  const t = (pf - memKeys[lo]) / (memKeys[hi] - memKeys[lo] || 1);
  return memLens[lo] + t * (memLens[hi] - memLens[lo]);
}

function memTarget(): number {
  return (window.scrollY + MEM.PENLINE * memVh - memTop) / memH;
}

function memSmooth(t: number): number {
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  return t * t * (3 - 2 * t);
}

let memLastStart = -1, memLastEnd = -1;

/** The first photograph settles; the second develops. */
function memSetPhotos(_force?: number) {
  const a = el("memoryStartImg"), b = el("memoryEndImg");
  if (!a || !b) return;

  const sp = memSmooth(memPen / 0.85);
  if (Math.abs(sp - memLastStart) > 0.005) {
    memLastStart = sp;
    a.style.filter = `sepia(${(0.12 * sp).toFixed(3)}) `
      + `saturate(${(1 - 0.06 * sp).toFixed(3)}) contrast(${(1 - 0.04 * sp).toFixed(3)})`;
  }

  let d: number;
  if (memPen <= memDevFrom)        d = 0;
  else if (memPen < memContact)    d = memSmooth((memPen - memDevFrom) / (memContact - memDevFrom)) * 0.08;
  else if (memPen < memHoldTo)     d = 0.08 + ((memPen - memContact) / (memHoldTo - memContact)) * 0.02;
  else                             d = 0.10 + memSmooth((memPen - memHoldTo) / (memDevTo - memHoldTo)) * 0.90;

  if (Math.abs(d - memLastEnd) > 0.004) {
    memLastEnd = d;
    const gray = d < 0.5 ? 1 : Math.max(0.08, 1 - ((d - 0.5) / 0.5) * 0.92);
    b.style.opacity = Math.min(1, d / 0.4).toFixed(3);
    b.style.filter =
        `grayscale(${gray.toFixed(3)}) sepia(${Math.max(0, 0.45 - d * 0.45).toFixed(3)}) `
      + `brightness(${(1.5 - 0.5 * d).toFixed(3)}) contrast(${(0.3 + 0.68 * d).toFixed(3)}) `
      + `saturate(${(0.55 + 0.37 * d).toFixed(3)})`;
  }
}

function memPaint() {
  if (!memPath || !memLen) return;
  memPath.style.strokeDashoffset = String(100 * (1 - memLookup(memPen) / memLen));
}

function memFrame(now: number) {
  const dt = Math.min((now - memLastT) / 1000, 0.05);
  memLastT = now;
  if (!memReady) memBuild();
  const t = memReady ? memTarget() : 0;
  if (!isFinite(memPen)) memPen = t;
  if (isFinite(t)) {
    memPen += (t - memPen) * (1 - Math.exp(-dt * MEM.RATE));
    if (Math.abs(t - memPen) < 0.0002) memPen = t;
    memPaint();
    memSetPhotos();
  }
  memRaf = requestAnimationFrame(memFrame);
}
let memLastT = 0;

function memStart() {
  if (memRaf === null) { memLastT = performance.now(); memRaf = requestAnimationFrame(memFrame); }
}
function memStop() {
  if (memRaf !== null) {
    cancelAnimationFrame(memRaf); memRaf = null;
    if (memReady) { memPen = memTarget(); memPaint(); memSetPhotos(); }
  }
}

/* ══════════════════════════════════════════════════
   6. RENDER AUDIO CARDS
══════════════════════════════════════════════════ */
function renderAudioCards() {
  const wrap = el("audioCards");
  if (!wrap) return;
  wrap.innerHTML = "";

  AUDIO_TRACKS.forEach(track => {
    const card = make("div", "audio-card reveal-up");
    card.innerHTML = `
      <div class="audio-card-header">
        <div class="audio-card-icon">
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="19" fill="#17163a" stroke="${track.color}" stroke-width="1.5"/>
            <ellipse cx="20" cy="20" rx="6" ry="6" fill="${track.color}" opacity="0.3"/>
            <path d="M15 15 L28 20 L15 25 Z" fill="#d4c5e8"/>
          </svg>
        </div>
        <div class="audio-card-info">
          <h4>${track.title}</h4>
          <p>${track.subtitle}</p>
        </div>
      </div>
      <div class="audio-player" data-audio="${track.src ?? ""}">
        <button class="audio-play-btn" data-playing="false">
          <svg class="icon-play" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
          <svg class="icon-pause hidden" viewBox="0 0 24 24"><path d="M6 19h4V5H6zm8-14v14h4V5z" fill="currentColor"/></svg>
        </button>
        <div class="audio-progress-wrap">
          <div class="audio-progress-bar"><div class="audio-progress-fill"></div></div>
          <span class="audio-time">0:00 / 0:00</span>
        </div>
      </div>`;
    wrap.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════
   7. RENDER LITTLE THINGS CARDS
══════════════════════════════════════════════════ */
const FLORAL_CYCLE = ["❀", "✿", "❀", "✾", "✿", "❁", "❀", "✿"];
function renderLittleThings() {
  const grid = el("thingsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  LITTLE_THINGS.forEach((t, i) => {
    const card = make("div", "thing-card reveal-up");
    card.innerHTML = `
      <div class="thing-card-bg"></div>
      <div class="thing-icon">${t.icon}</div>
      <h3 class="thing-label">${t.label}</h3>
      <p class="thing-value">${t.value}</p>
      <div class="thing-floral">${FLORAL_CYCLE[i % FLORAL_CYCLE.length]}</div>`;
    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════
   8. RENDER FOUR WORDS
══════════════════════════════════════════════════ */
function renderFourWords() {
  const wrap = el("fourWordsWrap");
  if (!wrap) return;
  wrap.innerHTML = "";

  FOUR_WORDS.forEach((word, i) => {
    const div = make("div", `word-reveal word-reveal--${i + 1}`);
    const span = make("span", "big-word");
    span.textContent = word;
    div.appendChild(span);
    wrap.appendChild(div);
  });

  fitFourWords();
  window.addEventListener("resize", fitFourWords);
  // The webfont arrives after first paint and is wider than the
  // fallback serif, so a word that fitted while measuring can overflow
  // once Cormorant swaps in. Measure again when the fonts settle.
  document.fonts?.ready.then(() => fitFourWords());
}

/**
 * A long word cannot wrap — it has no break opportunity — so at the
 * CSS size "Understanding" runs past the container and .word-reveal's
 * overflow:hidden slices the end off it. Rather than pick a font size
 * small enough for the longest word anyone might ever write here,
 * measure the words and step the size down only when it is needed.
 * All four share one size, so they still read as a set.
 */
function fitFourWords() {
  const wrap = el("fourWordsWrap");
  if (!wrap) return;
  const words = Array.from(wrap.querySelectorAll<HTMLElement>(".big-word"));
  if (!words.length) return;

  // measure at the size the stylesheet intends
  words.forEach(w => { w.style.fontSize = ""; });
  const base = parseFloat(getComputedStyle(words[0]).fontSize) || 0;
  if (!base) return;

  const avail = wrap.clientWidth;
  if (!avail) return;

  let widest = 0;
  for (const w of words) {
    // scrollWidth reports the full text width even while it overflows
    if (w.scrollWidth > widest) widest = w.scrollWidth;
  }
  if (widest <= avail) return;          // nothing to do

  const fitted = Math.floor(base * (avail / widest) * 0.98);
  words.forEach(w => { w.style.fontSize = `${fitted}px`; });
}

/* ══════════════════════════════════════════════════
   TRANSITIONS
══════════════════════════════════════════════════ */
function showUnlockScreenDirect() {
  const us = el("unlock-screen");
  if (us) {
    us.classList.remove("hidden", "pre-visible");
    us.classList.add("is-visible");
  }
}

function transitionToMain() {
  const us   = el("unlock-screen");
  const main = el("main-content");
  if (!us || !main) return;
  us.classList.add("fade-out");
  setTimeout(() => {
    // Drop the state class as well as adding `hidden`. `.hidden` alone
    // loses the specificity contest with #unlock-screen.is-visible, and
    // the dismissed overlay would stay in the layout and in the
    // accessibility tree for the rest of the visit.
    us.classList.remove("is-visible", "pre-visible", "fade-out");
    us.classList.add("hidden");
    main.classList.remove("hidden");
    main.classList.add("is-visible");
    setFinalDate();
    initScrollReveal();
    initFourWords();
    // Only now does #main-content have a size. Anything that measures
    // itself has to wait until here — at boot these are all zero.
    //
    // The words are fitted three times on purpose. A display:none
    // element does not trigger a font load, so document.fonts.ready
    // can resolve before Cormorant is ever requested for them; the
    // words then get wider the moment they become visible. Measuring
    // now, again when the fonts settle, and once more shortly after
    // covers every order those can happen in.
    fitFourWords();
    document.fonts?.ready.then(() => fitFourWords());
    setTimeout(fitFourWords, 300);
    renderMemory();
    // Start listening for scroll-to-bottom AFTER main is revealed
    initHiddenLetter();
  }, 950);
}

/* ══════════════════════════════════════════════════
   LANGUAGE CAROUSEL
══════════════════════════════════════════════════ */
let langIdx = 0;
function goToLang(idx: number) {
  const total    = LANGUAGE_CARDS.length;
  langIdx        = ((idx % total) + total) % total;
  const carousel = el("langCarousel");
  if (carousel) carousel.style.transform = `translateX(-${langIdx * 100}%)`;
  document.querySelectorAll<HTMLElement>(".lang-card")
    .forEach((c, i) => c.classList.toggle("lang-card--active", i === langIdx));
  document.querySelectorAll<HTMLElement>(".lang-dot")
    .forEach((d, i) => d.classList.toggle("lang-dot--active", i === langIdx));
}

function initLangCarousel() {
  el("langPrev")?.addEventListener("click", () => goToLang(langIdx - 1));
  el("langNext")?.addEventListener("click", () => goToLang(langIdx + 1));
  el("langDots")?.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>(".lang-dot");
    if (btn) goToLang(Number(btn.dataset.idx));
  });

  let tx = 0;
  const wrap = document.querySelector(".lang-carousel-wrap");
  wrap?.addEventListener("touchstart", (e) => { tx = (e as TouchEvent).touches[0].clientX; }, { passive: true });
  wrap?.addEventListener("touchend",   (e) => {
    const dx = (e as TouchEvent).changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) goToLang(dx < 0 ? langIdx + 1 : langIdx - 1);
  }, { passive: true });
}

/* ══════════════════════════════════════════════════
   POLAROID LIGHTBOX
══════════════════════════════════════════════════ */
function initPolaroids() {
  const lb  = el("lightbox");
  const lbPh  = el<HTMLElement>("lightboxPlaceholder");
  const lbCap = el("lightboxCaption");

  function open(idx: number) {
    const p = POLAROIDS[idx];
    if (!p || !lb || !lbPh || !lbCap) return;
    if (p.photo) {
      lbPh.innerHTML = `<img src="${p.photo}" alt="${p.caption}" style="width:100%;height:100%;object-fit:contain;">`;
    } else {
      lbPh.style.background = p.bg;
      lbPh.style.cssText    = `background:${p.bg};display:flex;align-items:center;justify-content:center;font-size:clamp(5rem,15vw,8rem);`;
      lbPh.textContent      = p.emoji;
    }
    lb.querySelector(".lightbox-content")?.classList.remove("lightbox-content--timeline");
    lbCap.textContent = p.caption;
    lb.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
  function close() {
    lb?.classList.add("hidden");
    document.body.style.overflow = "";
  }

  el("polaroidGrid")?.addEventListener("click", (e) => {
    const art = (e.target as HTMLElement).closest<HTMLElement>(".polaroid");
    if (art) open(Number(art.dataset.photo));
  });
  el("lightboxClose")?.addEventListener("click", close);
  el("lightboxBackdrop")?.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lb?.classList.contains("hidden")) close();
  });
}

/* ══════════════════════════════════════════════════
   AUDIO PLAYERS
══════════════════════════════════════════════════ */
function initAudioPlayers() {
  document.querySelectorAll<HTMLElement>(".audio-player").forEach(player => {
    const btn       = player.querySelector<HTMLButtonElement>(".audio-play-btn");
    const fill      = player.querySelector<HTMLElement>(".audio-progress-fill");
    const bar       = player.querySelector<HTMLElement>(".audio-progress-bar");
    const timeEl    = player.querySelector<HTMLElement>(".audio-time");
    const playIcon  = btn?.querySelector<SVGElement>(".icon-play");
    const pauseIcon = btn?.querySelector<SVGElement>(".icon-pause");
    const src       = player.dataset.audio ?? "";

    if (!btn) return;

    if (!src) {
      btn.addEventListener("click", () => {
        if (timeEl) {
          const orig = timeEl.textContent;
          timeEl.textContent = "add audio file ✦";
          setTimeout(() => { if (timeEl) timeEl.textContent = orig; }, 2000);
        }
      });
      return;
    }

    const audio = new Audio(src);
    let playing = false;

    btn.addEventListener("click", () => {
      if (playing) {
        audio.pause();
        playing = false;
        playIcon?.classList.remove("hidden");
        pauseIcon?.classList.add("hidden");
      } else {
        audio.play().catch(() => {});
        playing = true;
        playIcon?.classList.add("hidden");
        pauseIcon?.classList.remove("hidden");
      }
    });
    audio.addEventListener("timeupdate", () => {
      if (fill && audio.duration) fill.style.width = (audio.currentTime / audio.duration * 100) + "%";
      if (timeEl && !isNaN(audio.duration))
        timeEl.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    });
    audio.addEventListener("ended", () => {
      playing = false;
      playIcon?.classList.remove("hidden");
      pauseIcon?.classList.add("hidden");
      if (fill) fill.style.width = "0%";
    });
    bar?.addEventListener("click", (e) => {
      if (!audio.duration) return;
      const r = bar.getBoundingClientRect();
      audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
    });
    bar?.addEventListener("touchstart", (e) => {
      e.preventDefault();
      if (!audio.duration) return;
      const r   = bar.getBoundingClientRect();
      const tx  = (e as TouchEvent).touches[0].clientX;
      audio.currentTime = Math.max(0, Math.min(1, (tx - r.left) / r.width)) * audio.duration;
    }, { passive: false });
    bar?.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (!audio.duration) return;
      const r   = bar.getBoundingClientRect();
      const tx  = (e as TouchEvent).touches[0].clientX;
      audio.currentTime = Math.max(0, Math.min(1, (tx - r.left) / r.width)) * audio.duration;
    }, { passive: false });
  });
}

/* ══════════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════════ */
function initScrollReveal() {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("is-visible"); }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right, .section--languages").forEach(e => obs.observe(e));
}

function initFourWords() {
  // BUG 2 FIX: Replay animation every time the section enters the viewport.
  // Strategy: observe the SECTION element (not individual words) so we get a
  // single clean enter/leave signal. When it enters → add is-visible to words
  // one by one with staggered timeouts. When it leaves → remove is-visible so
  // the next entry replays the animation from scratch.
  // We do NOT unobserve, so the observer keeps firing on every crossing.

  const section = document.getElementById("four-words");
  if (!section) return;

  // Clear any pending timeouts when the section leaves so partial animations
  // don't fire after the user has scrolled away.
  let pendingTimers: ReturnType<typeof setTimeout>[] = [];

  const obs = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const words = section.querySelectorAll<HTMLElement>(".big-word");
        const conclusion = section.querySelector<HTMLElement>(".words-conclusion");

        if (entry.isIntersecting) {
          // Section entered — stagger each word in
          pendingTimers.forEach(clearTimeout);
          pendingTimers = [];

          words.forEach((word, i) => {
            const t = setTimeout(() => {
              word.classList.add("is-visible");
            }, i * 500); // 500ms between each word
            pendingTimers.push(t);
          });

          // Conclusion fades in after all words
          const conclusionDelay = words.length * 500 + 500;
          const tc = setTimeout(() => {
            conclusion?.classList.add("is-visible");
          }, conclusionDelay);
          pendingTimers.push(tc);

        } else {
          // Section left — cancel pending timers and reset
          pendingTimers.forEach(clearTimeout);
          pendingTimers = [];
          words.forEach(word => word.classList.remove("is-visible"));
          conclusion?.classList.remove("is-visible");
        }
      });
    },
    // threshold:0 fires as soon as ANY pixel enters/leaves the viewport.
    // rootMargin gives a small buffer so the reset doesn't trigger too eagerly.
    { threshold: 0, rootMargin: "0px 0px -10% 0px" }
  );

  obs.observe(section);
}

/* ══════════════════════════════════════════════════
   FINAL DATE
══════════════════════════════════════════════════ */
function setFinalDate() {
  const e = el("finalDate");
  if (e) e.textContent = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}

/* ══════════════════════════════════════════════════
   BUG 4 FIX — ACHIEVEMENT SYSTEM
══════════════════════════════════════════════════ */
interface Achievement {
  id:    string;
  icon:  string;
  title: string;
  desc:  string;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: "curious",    icon: "🔍", title: "The Curious One",    desc: "Scrolled all the way to the end." },
  { id: "keeper",     icon: "📸", title: "Memory Keeper",       desc: "Opened 3 different memories." },
  { id: "collector",  icon: "✦",  title: "Word Collector",      desc: "Watched all four words appear." },
  { id: "momo",       icon: "🥟", title: "Momo Enthusiast",     desc: "Found the hidden food doodle." },
  { id: "owl",        icon: "🌙", title: "Night Owl",           desc: "Visiting after midnight — as expected." },
];

const earned = new Set<string>();
let toastQueue: Achievement[] = [];
let toastBusy  = false;

function earnAchievement(id: string) {
  if (earned.has(id)) return;
  const ach = ACHIEVEMENTS.find(a => a.id === id);
  if (!ach) return;
  earned.add(id);
  toastQueue.push(ach);
  drainToastQueue();
}

function drainToastQueue() {
  if (toastBusy || toastQueue.length === 0) return;
  toastBusy = true;
  const ach = toastQueue.shift()!;
  showAchievementToast(ach, () => {
    toastBusy = false;
    drainToastQueue();
  });
}

function showAchievementToast(ach: Achievement, onDone: () => void) {
  // Build toast element
  const toast = document.createElement("div");
  toast.className = "achievement-toast";
  toast.innerHTML = `
  <div class="achievement-toast-icon">${ach.icon}</div>
  <div class="achievement-toast-body">
    <span class="achievement-toast-label">Achievement Unlocked</span>
    <span class="achievement-toast-title">${ach.title}</span>
    <span class="achievement-toast-desc">${ach.desc}</span>
  </div>
`;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { toast.classList.add("is-visible"); });
  });

  // Auto-dismiss after 3.5s
  setTimeout(() => {
    toast.classList.remove("is-visible");
    toast.addEventListener("transitionend", () => {
      toast.remove();
      onDone();
    }, { once: true });
  }, 3500);
}

function initAchievements() {
  // 1. "Curious" — reached the bottom of main content
  const finalSection = document.getElementById("final-letter");
  if (finalSection) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) earnAchievement("curious");
    }, { threshold: 0.3 }).observe(finalSection);
  }

  // 2. "Memory Keeper" — opened 3 different polaroids
  const openedPolaroids = new Set<string>();
  el("polaroidGrid")?.addEventListener("click", e => {
    const art = (e.target as HTMLElement).closest<HTMLElement>(".polaroid");
    if (art?.dataset.photo !== undefined) {
      openedPolaroids.add(art.dataset.photo);
      if (openedPolaroids.size >= 3) earnAchievement("keeper");
    }
  });

  // 3. "Word Collector" — four words section fully played
  //    We hook onto the same section observer used by initFourWords.
  //    Use a small delay so it fires after words animate in.
  const wordsSection = document.getElementById("four-words");
  if (wordsSection) {
    let wordAchTriggered = false;
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !wordAchTriggered) {
        const words = wordsSection.querySelectorAll(".big-word");
        setTimeout(() => {
          const allVisible = [...words].every(w => w.classList.contains("is-visible"));
          if (allVisible) { wordAchTriggered = true; earnAchievement("collector"); }
        }, words.length * 500 + 600);
      }
    }, { threshold: 0.5 }).observe(wordsSection);
  }

  // 4. "Momo Enthusiast" — click any food doodle 5 times
  let momoClicks = 0;
  let momoTimer: ReturnType<typeof setTimeout> | null = null;
  document.querySelectorAll(".food-doodle").forEach(doodle => {
    doodle.addEventListener("click", () => {
      momoClicks++;
      if (momoTimer) clearTimeout(momoTimer);
      momoTimer = setTimeout(() => { momoClicks = 0; }, 2500);
      if (momoClicks >= 5) {
        momoClicks = 0;
        earnAchievement("momo");
      }
    });
  });

  // 5. "Night Owl" — visiting between 11 PM and 3 AM
  const h = new Date().getHours();
  if (h >= 23 || h < 3) {
    setTimeout(() => earnAchievement("owl"), 4000);
  }
}

/* ══════════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════
   HIDDEN LETTER SEQUENCE
   All timings in milliseconds. Edit here to adjust pacing.
════════════════════════════════════════════════════════════ */
const LETTER_T = {
  stillness:       4000,   // how long the final message sits still
  dateFade:        4000,   // when date starts fading
  dateDuration:    1000,
  sigFade:         5000,   // when "Always, Ari" fades
  sigDuration:     1300,
  petalStart:      6300,   // petal begins drifting
  whisperStart:    8000,   // whisper line fades in
  dissolveStart:   9500,   // website begins dissolving
  dissolveDur:     5000,   // slow, cinematic dissolve
  envelopeShow:   12500,   // envelope rests in warm dark
  sealSwell:      14500,   // wax seal swells
  sealBreak:      15300,   // seal disappears
  flapOpen:       15600,   // flap rotates open
  letterRise:     16000,   // letter rises, envelope sinks
  textStart:      21000,   // first line of text (after 3s paper rest)
  lineInterval:    1400,   // ms between each line appearing
};

/* ════════════════════════════════════
   LETTER SEQUENCE CONTROLLER
════════════════════════════════════ */
function initHiddenLetter() {
  const finalSection = document.getElementById("final-letter");
  const overlay = document.getElementById("letterOverlay");
  if (!finalSection || !overlay) return;

  let triggered = false;
  const timers: ReturnType<typeof setTimeout>[] = [];
  const T = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

  // Helper: get overlay child elements
  const lo = (id: string) => document.getElementById(id) as HTMLElement | null;

  // ── Observe the final section ─────────────────────────────
  // Trigger when user scrolls to the very bottom of the page.
  // This works regardless of viewport size or zoom level.
  function onScroll() {
    const scrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 80;
    if (scrolledToBottom && !triggered) {
      triggered = true;
      window.removeEventListener("scroll", onScroll);
      runLetterSequence();
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  // Also check immediately in case already at bottom
  onScroll();

  function runLetterSequence() {
    // ── Build the letter lines from config ──────────────────
    const linesContainer = document.getElementById("lo-lines");
    if (!linesContainer) return;

    const allLines: { text: string; cls: string }[] = [];

    // fixed opening
    HIDDEN_LETTER.openingLines.forEach((line, i) => {
      allLines.push({ text: line, cls: i === 0 ? "lo-line lo-line--greeting" : "lo-line lo-line--personal" });
    });

    // personal lines
    HIDDEN_LETTER.personalLines.forEach(line => {
      allLines.push({ text: line, cls: "lo-line lo-line--italic" });
    });

    // signature
    allLines.push({ text: HIDDEN_LETTER.signature, cls: "lo-line lo-line--signature" });

    // closing petal SVG
    allLines.push({
      text: `<svg width="24" height="36" viewBox="0 0 40 60"><ellipse cx="20" cy="30" rx="10" ry="24" fill="#c87a96" opacity="0.8"/><ellipse cx="20" cy="30" rx="5" ry="20" fill="#d894ac" opacity="0.6"/></svg>`,
      cls: "lo-line lo-line--petal"
    });

    // Inject lines into DOM
    allLines.forEach(({ text, cls }) => {
      const p = document.createElement("p");
      p.className = cls;
      p.innerHTML = text;
      linesContainer.appendChild(p);
    });

    // ── ACT 1: lock scroll. Overlay stays INVISIBLE for now.
    // The final section is still fully visible beneath it.
    // We only activate the overlay when Act 3 dissolve begins.
    overlay.classList.add("lo-active"); // pointer-events, but opacity stays 0
    document.body.style.overflow = "hidden";

    // ── ACT 2: final message elements fade out one by one ──
    // Date fades first
    T(() => {
      const eDate = document.getElementById("eDate") as HTMLElement | null;
      if (eDate) { eDate.style.transition = "opacity 1s ease"; eDate.style.opacity = "0"; }
    }, LETTER_T.dateFade);

    // Signature and eyebrow fade
    T(() => {
      ["eAlways","eAri","eEyebrow"].forEach(id => {
        const el = document.getElementById(id) as HTMLElement | null;
        if (el) { el.style.transition = "opacity 1.3s ease"; el.style.opacity = "0"; }
      });
    }, LETTER_T.sigFade);

    // Petal drifts (overlay still transparent — petal floats over the real page)
    T(() => {
      overlay.style.transition = "opacity 0.01s";
      overlay.style.opacity = "1"; // now visible just enough for the petal layer
      const petal = document.getElementById("lo-petal");
      if (petal) petal.classList.add("lo-drift");
    }, LETTER_T.petalStart);

    // Whisper line — fades in slowly over 2s (was 1.5s, now more patient)
    T(() => {
      const wt = document.getElementById("lo-whisperText");
      if (wt) {
        wt.textContent = HIDDEN_LETTER.whisperLine;
        wt.style.transition = "opacity 2.2s ease";
        wt.classList.add("lo-show");
      }
    }, LETTER_T.whisperStart);

    // ── ACT 3: dissolve ────────────────────────────────────
    T(() => {
      // The warm light arrives by fading a layer in over the navy,
      // rather than recolouring the overlay's own background. A
      // gradient-to-gradient transition is not reliably interpolated
      // and lands as a jump; opacity always cross-fades.
      const wash = document.getElementById("lo-warmwash") as HTMLElement | null;
      if (wash) {
        wash.style.transition = `opacity ${LETTER_T.dissolveDur}ms cubic-bezier(0.4,0,0.2,1)`;
        requestAnimationFrame(() => { wash.style.opacity = "1"; });
      }

      // Whisper fades as the world changes
      const wt = document.getElementById("lo-whisperText");
      if (wt) { wt.style.transition = "opacity 1.5s ease"; wt.style.opacity = "0"; }

      // Site layer very gradually blurs, dims and recedes
      // We split it into two stages so it feels like slow recession
      const siteLayer = document.getElementById("siteLayer") as HTMLElement | null;
      if (siteLayer) {
        // Stage 1: start the blur and slight scale (first half)
        siteLayer.style.transition = `opacity ${LETTER_T.dissolveDur}ms cubic-bezier(0.4,0,0.2,1), filter ${LETTER_T.dissolveDur}ms ease, transform ${LETTER_T.dissolveDur}ms cubic-bezier(0.4,0,0.2,1)`;
        siteLayer.style.opacity = "0";
        siteLayer.style.filter = "blur(10px)";
        siteLayer.style.transform = "scale(1.08)";
      }
      // Gradually fade the overlay IN over the dissolve duration
      // so the warm background reveals itself slowly
      overlay.style.opacity = "0";
      overlay.style.transition = `opacity ${LETTER_T.dissolveDur}ms ease`;
      requestAnimationFrame(() => { overlay.style.opacity = "1"; });
    }, LETTER_T.dissolveStart);

    // ── ACT 4: envelope rests ──────────────────────────────
    T(() => {
      const env = document.getElementById("lo-envelope");
      if (env) env.classList.add("lo-show");
      // ambient petals drift in
      document.querySelectorAll<HTMLElement>(".lo-amb").forEach((a, i) => {
        setTimeout(() => a.classList.add("lo-show"), i * 400);
      });
    }, LETTER_T.envelopeShow);

    // seal swells
    T(() => {
      const wax = document.getElementById("lo-wax");
      if (wax) wax.classList.add("lo-swell");
    }, LETTER_T.sealSwell);

    // seal breaks
    T(() => {
      const wax = document.getElementById("lo-wax");
      if (wax) { wax.classList.remove("lo-swell"); wax.classList.add("lo-break"); }
    }, LETTER_T.sealBreak);

    // flap opens + shadow appears
    T(() => {
      const flap = document.getElementById("lo-flap");
      const shadow = document.getElementById("lo-flapShadow");
      if (flap) flap.classList.add("lo-open");
      if (shadow) shadow.classList.add("lo-show");
    }, LETTER_T.flapOpen);

    // letter rises, envelope sinks, shadow sweeps away
    T(() => {
      const paper = document.getElementById("lo-paper");
      const env   = document.getElementById("lo-envelope");
      const shadow = document.getElementById("lo-flapShadow");
      if (paper) paper.classList.add("lo-rise");
      if (env)   env.classList.add("lo-sink");
      if (shadow) { shadow.classList.remove("lo-show"); shadow.classList.add("lo-sweep"); }
    }, LETTER_T.letterRise);

    // ── TEXT REVEAL ────────────────────────────────────────
    // Starts at textStart (21s) — paper has settled for 3s
    T(() => {
      const lines = linesContainer.querySelectorAll<HTMLElement>(".lo-line");

      // Hidden lines are opacity:0, not display:none, so the paper is
      // already at its full height before a single word is visible.
      // Scrolling to scrollHeight therefore jumped to the end of the
      // letter immediately and pinned there. Follow the newest line
      // instead — and stop following the moment she scrolls herself,
      // so she can always go back and re-read.
      let lastAuto = -1;
      let readerTookOver = false;

      lines.forEach((line, i) => {
        timers.push(setTimeout(() => {
          line.classList.add("lo-show");

          const paper = document.getElementById("lo-paper");
          if (!paper) return;
          if (lastAuto >= 0 && Math.abs(paper.scrollTop - lastAuto) > 8) {
            readerTookOver = true;
          }
          if (readerTookOver) return;

          // keep the newest line a little above the halfway mark
          const target = Math.max(0, line.offsetTop - paper.clientHeight * 0.55);
          if (target > paper.scrollTop) {
            paper.scrollTop = target;
            lastAuto = paper.scrollTop;
          }
        }, i * LETTER_T.lineInterval));
      });
    }, LETTER_T.textStart);

    // ── DONE — no further events, sequence is over ─────────
    // The letter remains. The user remains. Silence is the ending.
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Render all config-driven sections into the DOM
  applyStaticText();
  renderLanguageCards();
  renderPolaroids();
  renderAudioCards();
  renderLittleThings();
  renderFourWords();

  // 2. Show the unlock screen (no countdown — the site opens right away).
  //    ?preview=main still skips straight to the main experience.
  const previewMode = new URLSearchParams(window.location.search).get("preview");
  showUnlockScreenDirect();
  if (previewMode === "main") {
    setTimeout(() => transitionToMain(), 10);
  }

  // 3. Interactions
  initLangCarousel();
  initPolaroids();
  initAudioPlayers();
  el("unlockBtn")?.addEventListener("click", transitionToMain);
  // BUG 4 FIX: boot achievement system
  initAchievements();
  // Hidden letter is initialized inside transitionToMain()
});