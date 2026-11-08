import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP = '(min-width: 1024px)';

function all<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

/** The header clock: rolls to a new value when the reader crosses a [data-clock] marker. */
function createClock() {
  const target = document.querySelector<HTMLElement>('header [data-clock]');
  let current = target?.textContent?.trim() ?? '';

  return (value: string | undefined, animate = true) => {
    if (!target || !value || value === current) return;
    current = value;
    if (!animate) {
      target.textContent = value;
      return;
    }
    gsap
      .timeline()
      .to(target, { yPercent: -110, opacity: 0, duration: 0.18, ease: 'power2.in' })
      .add(() => {
        target.textContent = value;
      })
      .fromTo(target, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'expo.out' });
  };
}

function setupStages() {
  const links = all<HTMLAnchorElement>('[data-stage-link]');
  for (const link of links) {
    const id = link.dataset.stageLink;
    const sections = all(`[data-stage="${id}"]`);
    const fill = link.querySelector<HTMLElement>('[data-stage-fill]');
    if (!sections.length || !fill) continue;
    ScrollTrigger.create({
      trigger: sections[0],
      endTrigger: sections[sections.length - 1],
      start: 'top 50%',
      end: 'bottom 50%',
      onUpdate: (self) => gsap.set(fill, { scaleX: self.progress }),
      onToggle: (self) => link.toggleAttribute('data-active', self.isActive),
      onLeave: () => gsap.set(fill, { scaleX: 1 }),
      onLeaveBack: () => gsap.set(fill, { scaleX: 0 }),
    });
  }
}

function setupClockMarkers(setClock: ReturnType<typeof createClock>, containerAnimation?: gsap.core.Tween) {
  const markers = all('[data-clock]').filter((el) => !el.closest('header'));
  for (const marker of markers) {
    const inTrack = Boolean(marker.closest('[data-hscroll-track]'));
    if (inTrack && containerAnimation) {
      ScrollTrigger.create({
        trigger: marker,
        containerAnimation,
        start: 'left 55%',
        end: 'right 55%',
        onToggle: (self) => self.isActive && setClock(marker.dataset.clock),
      });
    } else {
      ScrollTrigger.create({
        trigger: marker,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setClock(marker.dataset.clock),
      });
    }
  }
}

function setupReveals() {
  for (const block of all('[data-split]')) {
    const words = all('.split-word > span', block);
    gsap.from(words, {
      yPercent: 115,
      rotate: 4,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.045,
      scrollTrigger: { trigger: block, start: 'top 88%', once: true },
    });
  }

  for (const el of all('[data-fade]')) {
    gsap.from(el, {
      y: 28,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  }

  for (const bar of all('[data-chapter-bar]')) {
    gsap.from(bar, {
      scaleX: 0,
      duration: 1.2,
      ease: 'expo.inOut',
      scrollTrigger: { trigger: bar, start: 'top 85%', once: true },
    });
    gsap.from(bar.children, {
      opacity: 0,
      duration: 0.5,
      delay: 0.6,
      stagger: 0.1,
      scrollTrigger: { trigger: bar, start: 'top 85%', once: true },
    });
  }

  for (const line of all('[data-line]')) {
    gsap.from(line, {
      scaleX: 0,
      ease: 'none',
      scrollTrigger: { trigger: line, start: 'top 80%', end: 'top 40%', scrub: true },
    });
  }

  for (const slot of all('[data-parallax]')) {
    const speed = Number(slot.dataset.parallax) || 0;
    gsap.fromTo(
      slot,
      { yPercent: speed * 100 },
      {
        yPercent: -speed * 100,
        ease: 'none',
        scrollTrigger: { trigger: slot, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  }

  // "Ce qu'on tient": each word inks up as it crosses the middle of the screen.
  for (const word of all('[data-word]')) {
    gsap.to(word, {
      color: '#111111',
      ease: 'none',
      scrollTrigger: { trigger: word, start: 'top 72%', end: 'top 45%', scrub: true },
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

function setupDesktop(mm: gsap.MatchMedia, setClock: ReturnType<typeof createClock>) {
  mm.add(DESKTOP, () => {
    // 48h: pinned horizontal track.
    const wrapper = document.querySelector<HTMLElement>('[data-hscroll]');
    const track = document.querySelector<HTMLElement>('[data-hscroll-track]');
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
        },
      });
    }
    setupClockMarkers(setClock, tween);

    // Grille OP-X: cards scattered "sur la table", tidied up by the scroll.
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

  mm.add(`not ${DESKTOP}`, () => {
    setupClockMarkers(setClock);
  });
}

/** Floating preview that follows the cursor over the ecosystem list. */
function setupEcosystemPreview() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
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
      label.textContent = item.querySelector('.font-serif')?.textContent?.trim() ?? '';
      gsap.to(preview, { opacity: 1, scale: 1, rotate: -3, duration: 0.5, ease: 'expo.out' });
    });
  }
  list.addEventListener('pointerleave', () => {
    gsap.to(preview, { opacity: 0, scale: 0.85, rotate: 0, duration: 0.4, ease: 'power2.out' });
  });
}

function setupLenis() {
  const lenis = new Lenis({ lerp: 0.09, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function initHomeMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const setClock = createClock();
  const mm = gsap.matchMedia();

  if (reduced) {
    setupStages();
    setupClockMarkers((value) => setClock(value, false));
    return;
  }

  setupLenis();
  // Pins first, so every trigger created afterwards accounts for the pin spacing.
  setupDesktop(mm, setClock);
  setupReveals();
  setupStages();
  setupEcosystemPreview();

  // Fonts change line lengths: recompute positions once they are in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
