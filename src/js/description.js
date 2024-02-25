import gsap from './init';
import { pipe } from './utils';
import { scroller } from './common';

// -------------------------------------------------------------------------------------
// common
// -------------------------------------------------------------------------------------

const noop = () => {};

const blockProps = {
  from: { x: 40, opacity: 0, paused: true },
  to: { opacity: 0, paused: true },
  el: (id) => id + ' .typography',
};

const byHref = (id) => `a[href="${id}"]`;

const scrollCfg = {
  duration: 1.5,
  ease: "power1.inOut",
};

const scrollTo = (tl, labelName) => {
  return {
    scrollTo: tl.scrollTrigger.labelToScroll(labelName),
    ...scrollCfg,
  };
};

const anchorById = (tl, id) => (e) => {
  gsap.to(window, scrollTo(tl, id));
  e.preventDefault();
}

const tween = (tl, tween) => {
  return () => {
    const dir = tl.scrollTrigger.direction;
    if(dir === 1) tween.play();
    else tween.reverse();
  };
}

const linkActivateBy = (tl, link) => {
  const dir = () => tl.scrollTrigger.direction;
  const add = () => link.classList.add('-active');
  const remove = () => link.classList.remove('-active');

  return {
    in: () => {
      if(dir() === 1) add();
      else remove();
    },
    out: () => {
      if(dir() === 1) remove();
      else add();
    },
  };
}

const makeLink = (idLink, toId) => {
  document.getElementById(idLink).onclick = (e) => {
    gsap.to(window, { ...scrollCfg, scrollTo: toId });
    e.preventDefault();
  };
};

// -------------------------------------------------------------------------------------
// init
// -------------------------------------------------------------------------------------

const html = document.documentElement;
html.classList.add('-scroll-activate');

makeLink('nav-descr', '#descr');
makeLink('nav-about', '#about');
makeLink('nav-contacts', '#contacts');

// -------------------------------------------------------------------------------------
// sections
// -------------------------------------------------------------------------------------

const monitoring = (tl) => {
  const id = '#monitoring';

  const link = document.querySelector(byHref(id));

  const anchor = anchorById(tl, 'end-monitoring');
  link.onclick = anchor;
  const linkActivate = linkActivateBy(tl, link);
  link.classList.add('-active');

  const leave = tween(tl, gsap.to(blockProps.el(id), blockProps.to));

  const l6 = 'end-monitoring';

  const scale = 0.9;
  const d = 30;

  return tl
    .addLabel('@@')
    .add(noop, '+=0.01')
    .addLabel(l6)
    .to('#descr1-smartphone-label', { x: '101%' }, l6)
    .to('#descr1-smartphone-img', { x: -d, opacity: 0, scale }, l6)
    .to('#descr1-controller-label', { x: '101%' }, l6)
    .to('#descr1-controller-img', { y: -d, opacity: 0, scale }, l6)
    .to('#descr1-panel-controller-label', { x: '101%' }, l6)
    .to('#descr1-panel-controller-img', { x: d, opacity: 0, scale }, l6)
    .to('#descr1-bluetooth', { opacity: 0 }, l6)
    .to('#descr1-wifi', { opacity: 0 }, l6)
    .add(leave)
    .add(linkActivate.out);
};
const controller = (tl) => {
  const id = '#controller';

  const link = document.querySelector(byHref(id));

  const anchor = anchorById(tl, 'end-controller');
  link.onclick = anchor;
  const linkActivate = linkActivateBy(tl, link);

  const enter = tween(tl, gsap.from(blockProps.el(id), blockProps.from));
  const leave = tween(tl, gsap.to(blockProps.el(id), blockProps.to));

  const l3 = 'end-controller';

  const scale = 0.9;
  const d = 30;

  return tl
    .add(linkActivate.in)
    .add(enter)
    .set('#descr2-parent-plata-img', { width: 503 })
    .from('#descr2-slave-plata-label', { x: '101%' })
    .from('#descr2-slave-plata-img', { x: -d, opacity: 0, scale }, '<')
    .from('#descr2-parent-plata-label', { x: '101%' }, '<')
    .from('#descr2-parent-plata-img', { x: -d, opacity: 0, scale }, '<')
    .addLabel(l3)
    .to('#descr2-slave-plata-label', { x: '101%' }, l3)
    .to('#descr2-slave-plata-img', { x: -d, opacity: 0, scale }, l3)
    .to('#descr2-parent-plata-label', { x: '101%' }, l3)
    .to('#descr2-parent-plata-img', { scale: 1.5, y: -200 }, l3)
    .add(leave)
    .add(linkActivate.out);
};

const specifications = (tl) => {
  const id = '#specifications';

  const link = document.querySelector(byHref(id));
  const anchor = anchorById(tl, 'end-specifications');
  link.onclick = anchor;
  const linkActivate = linkActivateBy(tl, link);

  const enter = tween(tl, gsap.from(blockProps.el(id), blockProps.from));
  const leave = tween(tl, gsap.to(blockProps.el(id), blockProps.to));

  const l4 = 'end-specifications';

  const scale = 0.9;
  const d = 30;

  return tl
    .add(linkActivate.in)
    .add(enter)
    .from('#tv-controller .point', { stagger: 0.1, scale: 0, y: 10 })
    .addLabel(l4)
    .to('#tv-controller .point', { stagger: 0.1, scale: 0, y: 10 }, l4)
    .to('#descr2-parent-plata-img', { x: -d, opacity: 0, scale })
    .add(leave)
    .add(linkActivate.out);
};

const androidBase = (tl) => {
  const id = '#android-base';

  const link = document.querySelector(byHref(id));
  const anchor = anchorById(tl, '@');
  link.onclick = anchor;
  const linkActivate = linkActivateBy(tl, link);

  const enter = tween(tl, gsap.from(blockProps.el(id), blockProps.from));

  const scale = 0.9;
  const d = 30;

  return tl
    .add(linkActivate.in)
    .add(enter)
    .from('#descr4-iphone-app-img', { x: -d, opacity: 0, scale })
    .addLabel('@');
};

// -------------------------------------------------------------------------------------
// main
// -------------------------------------------------------------------------------------

pipe(
  gsap.timeline({
    scrollTrigger: {
      start: 'top top',
      trigger: '#descr',
      scrub: true,
      snap: 'labelsDirectional',
      pin: true,
    },
  }),
  monitoring,
  controller,
  specifications,
  androidBase,
);

pipe(
  gsap.timeline({
    scrollTrigger: {
      trigger: '#descr',
      start: 'top center',
    },
  }),
  scroller('#descr'),
);
