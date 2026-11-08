import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP = '(min-width: 1024px)';
const FINE_POINTER = '(hover: hover) and (pointer: fine)';

type ClockSetter = (value: string | undefined, animate?: boolean) => void;
type Marker = { value: string; trigger: ScrollTrigger; el: HTMLElement; inTrack: boolean };

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

  return (value, animate = true) => {
    if (!target || !value || value === current) return;
    current = value;
    onChange(value);
    if (!animate) {
      target.textContent = value;
      return;
    }
    gsap.killTweensOf(target);
    gsap
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
            onToggle: (self) => self.isActive && setClock(value),
          })
        : ScrollTrigger.create({
            trigger: el,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: (self) => self.isActive && setClock(value),
          });
    markers.push({ value, trigger, el, inTrack: inTrack && Boolean(containerAnimation) });
  }
  return markers;
}

/* ------------------------------------------------------------------ */
/* Rail: the custom scrollbar carrying the hour ticks.                 */
/* ------------------------------------------------------------------ */

function setupRail(getMarkers: () => Marker[]) {
  const rail = document.querySelector<HTMLElement>('[data-rail]');
  const ticksRoot = rail?.querySelector<HTMLElement>('[data-rail-ticks]');
  const thumb = rail?.querySelector<HTMLElement>('[data-rail-thumb]');
  const pill = rail?.querySelector<HTMLElement>('[data-rail-pill]');
  if (!rail || !ticksRoot || !thumb || !pill) return () => {};

  document.documentElement.classList.add('rail-on');
  let ticks: { el: HTMLElement; value: string }[] = [];
  let thumbH = 0;
  let activeValue = '';

  const limit = () => Math.max(1, ScrollTrigger.maxScroll(window));

  const update = () => {
    const progress = Math.min(1, Math.max(0, window.scrollY / limit()));
    gsap.set(thumb, { y: progress * (rail.clientHeight - thumbH) });
  };

  const place = () => {
    thumbH = Math.max(28, (window.innerHeight / (limit() + window.innerHeight)) * rail.clientHeight);
    thumb.style.height = `${thumbH}px`;
    update();
  };

  const build = () => {
    ticksRoot.replaceChildren();
    ticks = [];
    const seen = new Set<string>();
    let lastTop = -Infinity;
    const h = rail.clientHeight;
    const pin = trackTween?.scrollTrigger;
    // Markers inside the pinned track live in horizontal space: map them back to page scroll.
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
      const ratio = Math.min(1, start / limit());
      const li = document.createElement('li');
      li.className = 'rail-tick';
      li.style.top = `${ratio * 100}%`;
      const label = document.createElement('span');
      label.textContent = value;
      li.append(label);
      const top = ratio * h;
      if (top - lastTop < 16) li.toggleAttribute('data-crowded', true);
      else lastTop = top;
      li.toggleAttribute('data-active', value === activeValue);
      li.addEventListener('click', () => scrollToY(start + 2));
      ticksRoot.append(li);
      ticks.push({ el: li, value });
    }
    place();
  };

  // Drag the thumb or click the line, like a native scrollbar.
  let dragging = false;
  const seek = (clientY: number, immediate: boolean) => {
    const rect = rail.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientY - rect.top - thumbH / 2) / (rect.height - thumbH)));
    scrollToY(ratio * limit(), immediate);
  };
  const line = rail.querySelector<HTMLElement>('[data-rail-line]');
  for (const target of [thumb, line]) {
    if (!target) continue;
    target.addEventListener('pointerdown', (event) => {
      dragging = true;
      target.setPointerCapture(event.pointerId);
      seek(event.clientY, target === thumb);
    });
    target.addEventListener('pointermove', (event) => {
      if (dragging) seek(event.clientY, true);
    });
    target.addEventListener('pointerup', () => {
      dragging = false;
    });
  }

  // On touch screens the clock pill only shows while scrolling.
  let idle: number | undefined;
  const touch = !window.matchMedia(FINE_POINTER).matches;
  if (touch) pill.style.opacity = '0';
  window.addEventListener(
    'scroll',
    () => {
      update();
      if (!touch) return;
      pill.style.opacity = '1';
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        pill.style.opacity = '0';
      }, 1200);
    },
    { passive: true },
  );

  ScrollTrigger.addEventListener('refresh', build);
  window.addEventListener('resize', place);
  build();

  return (value: string) => {
    activeValue = value;
    for (const tick of ticks) tick.el.toggleAttribute('data-active', tick.value === value);
  };
}

/** The rail switches to light ink over dark sections. */
function setupDarkZones(containerAnimation?: gsap.core.Tween) {
  const root = document.documentElement;
  const active = new Set<Element>();
  const sync = () => root.classList.toggle('rail-dark', active.size > 0);
  for (const el of all('[data-dark]')) {
    const toggle = (self: ScrollTrigger) => {
      if (self.isActive) active.add(el);
      else active.delete(el);
      sync();
    };
    const inTrack = Boolean(el.closest('[data-hscroll-track]'));
    if (inTrack && containerAnimation) {
      ScrollTrigger.create({ trigger: el, containerAnimation, start: 'left right-=48', end: 'right right-=48', onToggle: toggle });
    } else {
      ScrollTrigger.create({ trigger: el, start: 'top 50%', end: 'bottom 50%', onToggle: toggle });
    }
  }
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

    const cards = all('[data-card]');
    if (cards.length) {
      gsap.fromTo(
        cards,
        {
          xPercent: (i: number) => Number(cards[i].dataset.x),
          y: (i: number) => Number(cards[i].dataset.y) * 3,
          rotate: (i: number) => Number(cards[i].dataset.r),
        },
        {
          xPercent: 0,
          y: 0,
          rotate: 0,
          ease: 'power2.out',
          scrollTrigger: { trigger: '[data-cards]', start: 'top 95%', end: 'top 25%', scrub: 0.8 },
        },
      );
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
    gsap.set(track, { x });
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
  if (title) tl.add(revealWords(title), loader ? '-=0.55' : 0);
  tl.from('[data-opening] [data-fade]', { y: 24, opacity: 0, duration: 1, stagger: 0.08, ease: 'expo.out' }, '<0.3');
}

/* ------------------------------------------------------------------ */

export function initHomeMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let markers: Marker[] = [];
  let onClock: (value: string) => void = () => {};
  const setClock = createClock((value) => onClock(value));

  if (reduced) {
    document.querySelector('[data-loader]')?.remove();
    markers = setupClockMarkers((value) => setClock(value, false));
    setupDarkZones();
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
    setupDarkZones(tween);
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
