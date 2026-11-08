import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP = '(min-width: 1024px)';
const FINE_POINTER = '(hover: hover) and (pointer: fine)';

type ClockSetter = (value: string | undefined, animate?: boolean) => void;
type Marker = { value: string; stage: string; trigger: ScrollTrigger; el: HTMLElement; inTrack: boolean };

let trackTween: gsap.core.Tween | undefined;

function all<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

/* ------------------------------------------------------------------ */
/* Scroll: Lenis drives the page, ScrollTrigger listens.               */
/* ------------------------------------------------------------------ */

let lenis: Lenis | undefined;

function setupLenis() {
  lenis = new Lenis({ lerp: 0.09, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

function scrollToY(y: number, immediate = false) {
  if (lenis) lenis.scrollTo(y, immediate ? { immediate: true } : { duration: 1.4 });
  else window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' });
}

/* ------------------------------------------------------------------ */
/* Clock: one value, shown on the rail's thumb.                        */
/* ------------------------------------------------------------------ */

function createClock(onChange: (value: string) => void): ClockSetter {
  const target = document.querySelector<HTMLElement>('[data-clock-display]');
  let current = target?.textContent?.trim() ?? '';
  let roll: gsap.core.Timeline | undefined;

  return (value, animate = true) => {
    if (!target || !value || value === current) return;
    current = value;
    onChange(value);
    if (!animate) {
      target.textContent = value;
      return;
    }
    // Kill the previous roll entirely (its text swap included), or a fast jump leaves a stale value.
    roll?.kill();
    roll = gsap
      .timeline()
      .to(target, { yPercent: -120, duration: 0.16, ease: 'power2.in' })
      .add(() => {
        target.textContent = value;
      })
      .fromTo(target, { yPercent: 120 }, { yPercent: 0, duration: 0.4, ease: 'expo.out' });
  };
}

function setupClockMarkers(setClock: ClockSetter, containerAnimation?: gsap.core.Tween): Marker[] {
  const markers: Marker[] = [];
  for (const el of all('[data-clock]')) {
    const value = el.dataset.clock;
    if (!value) continue;
    const inTrack = Boolean(el.closest('[data-hscroll-track]'));
    const trigger =
      inTrack && containerAnimation
        ? ScrollTrigger.create({
            trigger: el,
            containerAnimation,
            start: 'left 55%',
            end: 'right 55%',
            // The last panel stays "active" once the track stops: only count it while pinned.
            onToggle: (self) => {
              if (self.isActive && containerAnimation.scrollTrigger?.isActive) setClock(value);
            },
          })
        : ScrollTrigger.create({
            trigger: el,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: (self) => self.isActive && setClock(value),
          });
    const stage = el.closest<HTMLElement>('[data-stage]')?.dataset.stage ?? 'ensuite';
    markers.push({ value, stage, trigger, el, inTrack: inTrack && Boolean(containerAnimation) });
  }
  return markers;
}

/* ------------------------------------------------------------------ */
/* Rail: the custom scrollbar carrying the hour ticks.                 */
/* ------------------------------------------------------------------ */

function setupRail(getMarkers: () => Marker[]) {
  const rail = document.querySelector<HTMLElement>('[data-rail]');
  const ruler = rail?.querySelector<HTMLElement>('[data-rail-ruler]');
  const ticksRoot = rail?.querySelector<HTMLElement>('[data-rail-ticks]');
  const needle = rail?.querySelector<HTMLElement>('[data-rail-needle]');
  const readout = rail?.querySelector<HTMLElement>('[data-rail-readout]');
  const stageLabel = rail?.querySelector<HTMLElement>('[data-rail-stage]');
  if (!rail || !ruler || !ticksRoot || !needle || !readout || !stageLabel) return () => {};

  const stageTitles: Record<string, string> = JSON.parse(rail.dataset.stageTitles ?? '{}');
  document.documentElement.classList.add('rail-on');
  let grads: { el: HTMLElement; y: number }[] = [];
  let ticks: { el: HTMLElement; value: string }[] = [];
  let activeValue = '';
  let activeStage = '';

  const limit = () => Math.max(1, ScrollTrigger.maxScroll(window));

  // Needle position, and a "loupe" on the graduations around it.
  const update = () => {
    const h = rail.clientHeight;
    const y = Math.min(1, Math.max(0, window.scrollY / limit())) * h;
    gsap.set(needle, { y });
    // Light ink when the needle sits over a dark section (checked under the needle itself).
    const probeX = Math.max(0, rail.getBoundingClientRect().left - 4);
    const probeY = rail.getBoundingClientRect().top + y;
    const under = document.elementsFromPoint(probeX, probeY).find((el) => !rail.contains(el));
    document.documentElement.classList.toggle('rail-dark', Boolean(under?.closest('[data-dark]')));
    for (const grad of grads) {
      const near = Math.max(0, 1 - Math.abs(grad.y - y) / 70);
      grad.el.style.transform = `scaleX(${1 + near * near * 2.6})`;
      grad.el.style.opacity = String(0.18 + near * 0.6);
    }
  };

  const build = () => {
    const h = rail.clientHeight;
    // Minor graduations every 7px.
    ruler.replaceChildren();
    grads = [];
    for (let y = 0; y <= h; y += 7) {
      const el = document.createElement('span');
      el.className = 'rail-grad';
      el.style.top = `${y}px`;
      ruler.append(el);
      grads.push({ el, y });
    }

    // Major ticks on the moments, placed where they happen in the page.
    ticksRoot.replaceChildren();
    ticks = [];
    const seen = new Set<string>();
    const pin = trackTween?.scrollTrigger;
    const pagePosition = (m: Marker) => {
      if (!m.inTrack || !pin) return m.trigger.start;
      const offset = gsap.utils.clamp(0, pin.end - pin.start, m.el.offsetLeft - window.innerWidth * 0.55);
      return pin.start + offset;
    };
    const markers = getMarkers()
      .map((m) => ({ value: m.value, start: Math.max(0, pagePosition(m)) }))
      .sort((a, b) => a.start - b.start);
    for (const { value, start } of markers) {
      if (seen.has(value)) continue;
      seen.add(value);
      const li = document.createElement('li');
      li.className = 'rail-tick';
      li.style.top = `${Math.min(1, start / limit()) * 100}%`;
      const label = document.createElement('span');
      label.textContent = value;
      li.append(label);
      li.toggleAttribute('data-active', value === activeValue);
      ticksRoot.append(li);
      ticks.push({ el: li, value });
    }
    update();
  };

  // Drag or click anywhere on the ruler, like a native scrollbar.
  let dragging = false;
  const seek = (clientY: number, immediate: boolean) => {
    const rect = rail.getBoundingClientRect();
    scrollToY(Math.min(1, Math.max(0, (clientY - rect.top) / rect.height)) * limit(), immediate);
  };
  ruler.addEventListener('pointerdown', (event) => {
    dragging = true;
    ruler.setPointerCapture(event.pointerId);
    seek(event.clientY, false);
  });
  ruler.addEventListener('pointermove', (event) => {
    if (dragging) seek(event.clientY, true);
  });
  ruler.addEventListener('pointerup', () => {
    dragging = false;
  });

  // On touch screens the readout only shows while scrolling.
  let idle: number | undefined;
  const touch = !window.matchMedia(FINE_POINTER).matches;
  if (touch) readout.style.opacity = '0';
  window.addEventListener(
    'scroll',
    () => {
      update();
      if (!touch) return;
      readout.style.opacity = '1';
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        readout.style.opacity = '0';
      }, 1200);
    },
    { passive: true },
  );

  ScrollTrigger.addEventListener('refresh', build);
  window.addEventListener('resize', build);
  build();

  return (value: string, stage?: string) => {
    activeValue = value;
    for (const tick of ticks) tick.el.toggleAttribute('data-active', tick.value === value);
    if (stage && stage !== activeStage && stageTitles[stage]) {
      activeStage = stage;
      gsap
        .timeline()
        .to(stageLabel, { opacity: 0, y: -4, duration: 0.15 })
        .add(() => {
          stageLabel.textContent = stageTitles[stage];
        })
        .fromTo(stageLabel, { y: 4 }, { opacity: 0.55, y: 0, duration: 0.35, ease: 'expo.out' });
    }
  };
}

/* ------------------------------------------------------------------ */
/* Reveals.                                                            */
/* ------------------------------------------------------------------ */

function revealWords(block: Element) {
  return gsap.fromTo(
    all('.split-word > span', block),
    { yPercent: 115, rotate: 4 },
    { yPercent: 0, rotate: 0, duration: 1.2, ease: 'expo.out', stagger: 0.05 },
  );
}

function setupReveals() {
  for (const block of all('[data-split]')) {
    gsap.set(all('.split-word > span', block), { yPercent: 115 });
    if (block.closest('[data-intro-title]')) continue;
    ScrollTrigger.create({ trigger: block, start: 'top 88%', once: true, onEnter: () => revealWords(block) });
  }

  for (const el of all('[data-fade]')) {
    if (el.closest('[data-opening]')) continue;
    gsap.from(el, {
      y: 28,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  }

  for (const bar of all('[data-chapter-bar]')) {
    if (bar.closest('[data-opening]')) continue;
    gsap
      .timeline({ scrollTrigger: { trigger: bar, start: 'top 85%', once: true } })
      .from(bar, { scaleX: 0, duration: 1.1, ease: 'expo.inOut' })
      .from(bar.children, { yPercent: 100, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'expo.out' }, '-=0.4');
  }

  for (const line of all('[data-line]')) {
    gsap.from(line, { scaleX: 0, ease: 'none', scrollTrigger: { trigger: line, start: 'top 80%', end: 'top 40%', scrub: true } });
  }

  for (const slot of all('[data-parallax]')) {
    const speed = Number(slot.dataset.parallax) || 0;
    gsap.fromTo(
      slot,
      { yPercent: speed * 100 },
      { yPercent: -speed * 100, ease: 'none', scrollTrigger: { trigger: slot, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  }

  for (const word of all('[data-word]')) {
    gsap.to(word, { color: '#111111', ease: 'none', scrollTrigger: { trigger: word, start: 'top 72%', end: 'top 45%', scrub: true } });
  }

  const footerLogo = document.querySelector('[data-footer-logo]');
  if (footerLogo) {
    gsap.from(footerLogo.children, {
      yPercent: 60,
      opacity: 0,
      stagger: 0.08,
      ease: 'none',
      scrollTrigger: { trigger: footerLogo, start: 'top bottom', end: 'bottom bottom', scrub: true },
    });
  }

  for (const [index, sheet] of all('[data-sheet]').entries()) {
    gsap.from(sheet, {
      y: 120,
      rotate: index % 2 ? 9 : -9,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: sheet, start: 'top 100%', end: 'top 55%', scrub: true },
    });
  }
}

/* ------------------------------------------------------------------ */
/* Desktop choreography: pinned 48h track, scattered OP-X cards.       */
/* ------------------------------------------------------------------ */

function setupLayout(mm: gsap.MatchMedia, onReady: (tween?: gsap.core.Tween) => void) {
  mm.add(DESKTOP, () => {
    const wrapper = document.querySelector<HTMLElement>('[data-hscroll]');
    const track = document.querySelector<HTMLElement>('[data-hscroll-track]');
    const progress = document.querySelector<HTMLElement>('[data-hscroll-progress]');
    let tween: gsap.core.Tween | undefined;
    if (wrapper && track) {
      const distance = () => track.scrollWidth - window.innerWidth;
      tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) gsap.set(progress, { scaleX: self.progress });
          },
        },
      });
      // Phase names drift against the track for depth.
      for (const title of all('[data-panel] h3', track)) {
        gsap.fromTo(
          title,
          { xPercent: 10 },
          {
            xPercent: -10,
            ease: 'none',
            scrollTrigger: { trigger: title, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
          },
        );
      }
    }
    onReady(tween);

    // Expertises: stop-scroll moment, the cards are dealt one by one over the big words.
    const deck = document.querySelector<HTMLElement>('[data-deck]');
    const cards = all('[data-card]');
    if (deck && cards.length) {
      const deal = gsap.timeline({
        scrollTrigger: {
          trigger: deck,
          start: 'top top',
          end: () => `+=${cards.length * 42}%`,
          pin: true,
          scrub: 0.7,
        },
      });
      deal.fromTo('[data-deck-title]', { scale: 0.9, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 1, ease: 'none' }, 0);
      cards.forEach((card, i) => {
        const r = Number(card.dataset.r) || 0;
        deal.fromTo(
          card,
          { opacity: 0, scale: 0.35, yPercent: 60, rotate: r + (i % 2 ? 24 : -24) },
          { opacity: 1, scale: 1, yPercent: 0, rotate: r, duration: 1, ease: 'back.out(1.7)' },
          0.4 + i * 0.75,
        );
      });
      deal.fromTo('[data-deck-aside]', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '>-0.2').to({}, { duration: 0.8 });
    }
  });

  mm.add(`not ${DESKTOP}`, () => onReady());
}

/* ------------------------------------------------------------------ */
/* Small interactions.                                                 */
/* ------------------------------------------------------------------ */

function setupHeader() {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (!header) return;
  // The hero already shows the logo in large: the header logo waits until we leave it.
  const hero = document.querySelector('[data-opening]');
  if (hero) {
    header.toggleAttribute('data-on-hero', true);
    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom 20%',
      onToggle: (self) => header.toggleAttribute('data-on-hero', self.isActive),
    });
  }
  ScrollTrigger.create({
    start: 160,
    end: 'max',
    onUpdate: (self) => header.toggleAttribute('data-hidden', self.direction === 1),
    onLeaveBack: () => header.removeAttribute('data-hidden'),
  });
}

function setupMarquee() {
  const track = document.querySelector<HTMLElement>('[data-marquee-track]');
  if (!track) return;
  let x = 0;
  let boost = 0;
  lenis?.on('scroll', (instance: Lenis) => {
    boost = gsap.utils.clamp(-40, 40, instance.velocity);
  });
  gsap.ticker.add((_time, delta) => {
    const half = track.scrollWidth / 2;
    boost *= 0.92;
    x -= (0.05 + Math.abs(boost) * 0.03) * delta;
    if (half > 0 && -x >= half) x += half;
    gsap.set(track, { x, skewX: gsap.utils.clamp(-8, 8, -boost * 0.25) });
  });
}

function setupCursor() {
  if (!window.matchMedia(FINE_POINTER).matches) return;
  const cursor = document.querySelector<HTMLElement>('[data-cursor]');
  if (!cursor) return;
  cursor.classList.remove('hidden');
  gsap.set(cursor, { xPercent: -50, yPercent: -50 });
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });
  window.addEventListener('pointermove', (event) => {
    xTo(event.clientX);
    yTo(event.clientY);
  });
  document.addEventListener('pointerover', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const interactive = target?.closest('a, button, [data-card], [data-eco-item], [data-doors] li, .rail-tick, [data-rail-thumb]');
    gsap.to(cursor, { scale: interactive ? 4 : 1, duration: 0.4, ease: 'expo.out' });
  });
}

function setupMagnetic() {
  if (!window.matchMedia(FINE_POINTER).matches) return;
  for (const el of all('[data-magnetic]')) {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'expo.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'expo.out' });
    el.addEventListener('pointermove', (event) => {
      const r = el.getBoundingClientRect();
      xTo((event.clientX - r.left - r.width / 2) * 0.3);
      yTo((event.clientY - r.top - r.height / 2) * 0.4);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  }
}

function setupOpeningNappes() {
  if (!window.matchMedia(FINE_POINTER).matches) return;
  const nappes = document.querySelector<HTMLElement>('[data-opening-nappes]');
  if (!nappes) return;
  const xTo = gsap.quickTo(nappes, 'x', { duration: 2, ease: 'power3.out' });
  const yTo = gsap.quickTo(nappes, 'y', { duration: 2, ease: 'power3.out' });
  window.addEventListener('pointermove', (event) => {
    xTo((event.clientX / window.innerWidth - 0.5) * 120);
    yTo((event.clientY / window.innerHeight - 0.5) * 80);
  });
}

function setupEcosystemPreview() {
  if (!window.matchMedia(FINE_POINTER).matches) return;
  const preview = document.querySelector<HTMLElement>('[data-eco-preview]');
  const label = document.querySelector<HTMLElement>('[data-eco-preview-label]');
  const list = document.querySelector<HTMLElement>('[data-eco]');
  if (!preview || !label || !list) return;

  preview.classList.remove('hidden');
  const xTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'expo.out' });
  const yTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'expo.out' });
  list.addEventListener('pointermove', (event) => {
    xTo(event.clientX + 32);
    yTo(event.clientY - preview.offsetHeight / 2);
  });
  for (const item of all('[data-eco-item]', list)) {
    item.addEventListener('pointerenter', () => {
      label.textContent = item.querySelector('[data-eco-name]')?.textContent?.trim() ?? '';
      gsap.to(preview, { opacity: 1, scale: 1, rotate: -3, duration: 0.5, ease: 'expo.out' });
    });
  }
  list.addEventListener('pointerleave', () => {
    gsap.to(preview, { opacity: 0, scale: 0.85, rotate: 0, duration: 0.4, ease: 'power2.out' });
  });
}

/* ------------------------------------------------------------------ */
/* Intro: the loader shows the first clock value, then lifts.          */
/* ------------------------------------------------------------------ */

function playIntro() {
  const loader = document.querySelector<HTMLElement>('[data-loader]');
  const title = document.querySelector('[data-intro-title]');
  const tl = gsap.timeline();
  if (loader) {
    loader.style.animation = 'none';
    lenis?.stop();
    tl.from('[data-loader-clock]', { yPercent: 110, duration: 0.9, ease: 'expo.out' })
      .to('[data-loader-bar]', { scaleX: 1, duration: 0.8, ease: 'expo.inOut' }, '<0.1')
      .to(loader, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '+=0.15')
      .add(() => {
        loader.remove();
        lenis?.start();
      });
  }
  const logo = all('[data-hero-logo] > *');
  if (logo.length) tl.from(logo, { yPercent: 105, duration: 1.2, stagger: 0.08, ease: 'expo.out' }, loader ? '-=0.6' : 0);
  if (title) tl.add(revealWords(title), '<0.15');
  tl.from('[data-opening] [data-chapter-bar]', { scaleX: 0, duration: 1.1, ease: 'expo.inOut' }, '<0.2');
  tl.from('[data-opening] [data-fade]', { y: 24, opacity: 0, duration: 1, stagger: 0.08, ease: 'expo.out' }, '<0.3');
}

/* ------------------------------------------------------------------ */

export function initHomeMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let markers: Marker[] = [];
  let onClock: (value: string, stage?: string) => void = () => {};
  const setClock = createClock((value) => onClock(value, markers.find((m) => m.value === value)?.stage));

  if (reduced) {
    document.querySelector('[data-loader]')?.remove();
    markers = setupClockMarkers((value) => setClock(value, false));
    onClock = setupRail(() => markers);
    return;
  }

  setupLenis();
  const mm = gsap.matchMedia();
  let first = true;
  // Pins first, so every trigger created afterwards accounts for the pin spacing.
  setupLayout(mm, (tween) => {
    trackTween = tween;
    markers = setupClockMarkers(setClock, tween);
    if (!first) ScrollTrigger.refresh();
    first = false;
  });
  setupReveals();
  setupHeader();
  onClock = setupRail(() => markers);
  setupMarquee();
  setupCursor();
  setupMagnetic();
  setupOpeningNappes();
  setupEcosystemPreview();
  playIntro();

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
