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
  TIMELINE,
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
  setText("heroPara",      HERO.body);

  // Four words — eyebrow and sub-line are optional; when they are
  // empty the elements are removed so they leave no gap behind.
  setOptional("wordsEyebrow", FOUR_WORDS_COPY.eyebrow);
  setHTML("wordsMainLine", FOUR_WORDS_COPY.mainLine.replace("\n", "<br>"));
  setOptional("wordsSubLine", FOUR_WORDS_COPY.subLine);

  // Final letter
  setText("finalAddressee",    FINAL_LETTER.addressee);
  setText("finalLetterBody",   FINAL_LETTER.body);
  setText("finalSigLine1",     FINAL_LETTER.signatureLine1);
  setText("finalSigLine2",     FINAL_LETTER.signatureLine2);
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
        <p class="lang-sign">${card.sign}</p>
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
   4. RENDER TIMELINE
══════════════════════════════════════════════════ */
function renderTimeline() {
  const wrap = el("timelineWrap");
  if (!wrap) return;
  wrap.innerHTML = "";

  TIMELINE.forEach((t, i) => {
    const isLeft = i % 2 === 0;
    const item = make("div", `timeline-item ${isLeft ? "reveal-left" : "reveal-right"}`);
    const dot  = make("div", `timeline-dot${t.isCurrent ? " timeline-dot--current" : ""}`);
    const card = make("div", `timeline-card${t.isCurrent ? " timeline-card--current" : ""}`);

    const photoPH = `<div class="timeline-placeholder" style="background:${t.photoBg}"><span>${t.emoji}</span></div>`;
    const photoHTML = t.photo
      ? `<img src="${t.photo}" alt="${t.event}" style="width:100%;height:120px;object-fit:cover;">`
      : photoPH;

    card.innerHTML = `
      <div class="timeline-photo">${photoHTML}</div>
      <div class="timeline-content">
        <span class="timeline-year">${t.year}</span>
        <h3 class="timeline-event">${t.event}</h3>
        <p class="timeline-text">${t.text}</p>
      </div>`;

    card.dataset.timelineIdx = String(i);
    item.appendChild(dot);
    item.appendChild(card);
    wrap.appendChild(item);
  });
}

/* ══════════════════════════════════════════════════
   TIMELINE — mobile scroll animations
══════════════════════════════════════════════════ */
function initTimelineMobile() {
  if (window.innerWidth > 640) return;

  const items = document.querySelectorAll<HTMLElement>(".timeline-item");
  if (!items.length) return;

  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        obs.unobserve(e.target); // animate in once, stay visible
      }
    }),
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach(item => obs.observe(item));
}

/* ══════════════════════════════════════════════════
   TIMELINE LIGHTBOX — tap any card to enlarge
══════════════════════════════════════════════════ */
function initTimelineLightbox() {
  const lb      = el("lightbox");
  const lbPh    = el<HTMLElement>("lightboxPlaceholder");
  const lbCap   = el("lightboxCaption");
  const lbContent = lb?.querySelector<HTMLElement>(".lightbox-content");
  if (!lb || !lbPh || !lbCap || !lbContent) return;

  function openTimeline(idx: number) {
    const t = TIMELINE[idx];
    if (!t) return;

    lbContent.classList.add("lightbox-content--timeline");

    if (t.photo) {
      lbPh.style.cssText = "";
      lbPh.innerHTML = `<img src="${t.photo}" alt="${t.event}" style="width:100%;height:auto;max-height:55vh;object-fit:contain;display:block;">`;
    } else {
      lbPh.innerHTML = "";
      lbPh.style.cssText = `background:${t.photoBg};display:flex;align-items:center;justify-content:center;aspect-ratio:4/3;font-size:clamp(4rem,12vw,7rem);`;
      lbPh.textContent = t.emoji;
    }

    lbCap.innerHTML = `
      <span style="display:block;font-size:0.65rem;letter-spacing:0.2em;color:var(--purple-light);text-transform:uppercase;margin-bottom:0.3rem">${t.year}</span>
      <span style="display:block;font-family:'Cormorant Garamond',serif;font-size:clamp(1.2rem,3vw,1.6rem);font-weight:600;color:var(--cream);margin-bottom:0.5rem">${t.event}</span>
      <span style="display:block;font-size:0.875rem;color:var(--cream-dim);line-height:1.7">${t.text}</span>`;

    lb.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeTimeline() {
    lb.classList.add("hidden");
    document.body.style.overflow = "";
    lbContent.classList.remove("lightbox-content--timeline");
    lbPh.innerHTML = "";
    lbPh.style.cssText = "";
    lbCap.innerHTML = "";
  }

  el("timelineWrap")?.addEventListener("click", e => {
    const card = (e.target as HTMLElement).closest<HTMLElement>(".timeline-card");
    if (card?.dataset.timelineIdx !== undefined) {
      openTimeline(Number(card.dataset.timelineIdx));
    }
  });

  el("lightboxClose")?.addEventListener("click", closeTimeline);
  el("lightboxBackdrop")?.addEventListener("click", closeTimeline);
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
  lineInterval:    1150,   // ms between each line appearing
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
      // Now the overlay background transitions from transparent navy → warm dark
      // This is the moment the "website disappears"
      overlay.style.transition = `background ${LETTER_T.dissolveDur}ms cubic-bezier(0.4,0,0.2,1)`;
      overlay.style.background = "radial-gradient(ellipse at 50% 44%, #1f120a 0%, #120a05 55%, #080402 100%)";

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
      overlay.style.transition = `background ${LETTER_T.dissolveDur}ms cubic-bezier(0.4,0,0.2,1), opacity ${LETTER_T.dissolveDur}ms ease`;
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
      lines.forEach((line, i) => {
        timers.push(setTimeout(() => {
          line.classList.add("lo-show");
          // auto-scroll paper gently as new lines appear
          const paper = document.getElementById("lo-paper");
          if (paper) paper.scrollTop = paper.scrollHeight;
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
  renderTimeline();
  initTimelineMobile();
  initTimelineLightbox();
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