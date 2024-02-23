import gsap from './init';
import { pipe, useToggled } from './utils';
import { line, scroller } from './common';

// -------------------------------------------------------------------------------------
// common
// -------------------------------------------------------------------------------------

const blockProps = {
  from: { x: 40, opacity: 0 },
  to: { opacity: 0 },
  el: (id) => id + ' .typography',
};

const delayEnd = 0.2;

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

const linkActivateBy = (link) => {
  return useToggled((b) => {
    if(b) link.classList.add('-active');
    else link.classList.remove('-active');
  });
}

// -------------------------------------------------------------------------------------
// init
// -------------------------------------------------------------------------------------

const html = document.documentElement;
html.classList.add('-scroll-activate');

document.getElementById('nav-about').onclick = (e) => {
  gsap.to(window, { ...scrollCfg, scrollTo: "#about" });
  e.preventDefault();
};

document.getElementById('nav-contacts').onclick = (e) => {
  gsap.to(window, { ...scrollCfg, scrollTo: "#contacts" });
  e.preventDefault();
};

// -------------------------------------------------------------------------------------
// sections
// -------------------------------------------------------------------------------------

const init = (tl) => {
  return pipe(
    tl,
    (tl) => tl.addLabel('descr-init'),
    (tl) => tl.from('#descr-main-title', { y: -40, opacity: 0, }),
    (tl) => tl.from('.scroll-block-list a', { x: -40, opacity: 0, stagger: 0.1 }),
    line('.scroll-block:first-of-type', 'descr-init', 0.9),
    scroller('.scroll-block:first-of-type', 'descr-init'),
    (tl) => tl.fromTo('#descr .descr-right-shape', { height: 0 }, { height: '100%' }, 'descr-init'),
  );
};

const monitoring = (tl) => {
  const id = '#monitoring';

  const navLink = document.getElementById('nav-descr');
  const link = document.querySelector(byHref(id));

  const anchor = anchorById(tl, 'smartphone');
  navLink.onclick = anchor;
  link.onclick = anchor;
  const linkActivate = linkActivateBy(link);

  return tl
    .addLabel('head-monitoring')
    .add(linkActivate)
    .from(blockProps.el(id), blockProps.from, 'head-monitoring')
    .from('#descr1-smartphone-label', { x: '100%' }, 'head-monitoring')
    .from('#descr1-smartphone-img', { x: '-100%', opacity: 0 }, 'head-monitoring')
    .addLabel('smartphone')
    .from('#descr1-controller-label', { x: '100%' }, 'smartphone')
    .from('#descr1-controller-img', { y: '-100%', opacity: 0 }, 'smartphone')
    .addLabel('bluetooth')
    .from('#descr1-bluetooth', { opacity: 0 })
    .addLabel('controller')
    .from('#descr1-panel-controller-label', { x: '100%' }, 'controller')
    .from('#descr1-panel-controller-img', { x: '100%', opacity: 0 }, 'controller')
    .addLabel('wifi')
    .from('#descr1-wifi', { opacity: 0 })
    .addLabel('end-monitoring', '+=1')
    .to('#descr1-smartphone-label', { x: '100%' }, 'end-monitoring')
    .to('#descr1-smartphone-img', { x: '-100%', opacity: 0 }, 'end-monitoring')
    .to('#descr1-controller-label', { x: '100%' }, 'end-monitoring')
    .to('#descr1-controller-img', { y: '-100%', opacity: 0 }, 'end-monitoring')
    .to('#descr1-panel-controller-label', { x: '100%' }, 'end-monitoring')
    .to('#descr1-panel-controller-img', { x: '100%', opacity: 0 }, 'end-monitoring')
    .to('#descr1-bluetooth', { opacity: 0 }, 'end-monitoring')
    .to('#descr1-wifi', { opacity: 0 }, 'end-monitoring')
    .to(blockProps.el(id), blockProps.to, 'end-monitoring')
    .add(linkActivate, 'end-monitoring+=' + delayEnd);
};

const controller = (tl) => {
  const id = '#controller';

  const link = document.querySelector(byHref(id));

  const anchor = anchorById(tl, 'descr2-fix');
  link.onclick = anchor;
  const linkActivate = linkActivateBy(link);

  return tl
    .addLabel('head-controller')
    .add(linkActivate)
    .from(blockProps.el(id), blockProps.from, 'head-controller')
    .from('#descr2-slave-plata-label', { x: '100%' }, 'head-controller')
    .from('#descr2-slave-plata-img', { x: '-100%', opacity: 0 }, 'head-controller')
    .from('#descr2-parent-plata-label', { x: '100%' }, 'head-controller')
    .from('#descr2-parent-plata-img', { x: '-100%', opacity: 0, width: 503 }, 'head-controller')
    .to('#descr2-parent-plata-img', { width: 503 }, 'head-controller')
    .addLabel('descr2-fix', '+=0.2')
    .addLabel('end-controller', '+=0.8')
    .to('#descr2-slave-plata-label', { x: '100%' }, 'end-controller')
    .to('#descr2-slave-plata-img', { x: '-100%', opacity: 0 }, 'end-controller')
    .to('#descr2-parent-plata-label', { x: '100%' }, 'end-controller')
    .to(blockProps.el(id), blockProps.to, 'end-controller')
    .add(linkActivate, 'end-controller+=' + delayEnd);
};

const specifications = (tl) => {
  const id = '#specifications';

  const link = document.querySelector(byHref(id));
  const anchor = anchorById(tl, 'specifications-fix');
  link.onclick = anchor;
  const linkActivate = linkActivateBy(link);

  return tl
    .addLabel('head-specifications')
    .add(linkActivate)
    .from(blockProps.el(id), blockProps.from, 'head-specifications')
    .to('#descr2-parent-plata-img', { scale: 1.5, y: -200 }, 'head-specifications')
    .addLabel('body-specifications')
    .from('#tv-controller .point', {
      stagger: 0.1,
      scale: 0,
      y: 10,
    }, 'body-specifications')
    .from(id + ' .-a-list li', {
      stagger: 0.1,
      opacity: 0,
      x: 40,
    }, 'body-specifications')
    .addLabel('specifications-fix')
    .addLabel('end-specifications', '+=1')
    .to('#tv-controller .point', {
      stagger: 0.1,
      scale: 0,
      y: 10,
    }, 'end-specifications')
    .addLabel('points-end')
    .to('#descr2-parent-plata-img', { x: '-100%', opacity: 0 }, 'points-end')
    .to(blockProps.el(id), blockProps.to, 'points-end')
    .add(linkActivate, 'points-end+=' + delayEnd);
};

const androidBase = (tl) => {
  const id = '#android-base';

  const link = document.querySelector(byHref(id));
  const anchor = anchorById(tl, 'android-base-fix');
  link.onclick = anchor;
  const linkActivate = linkActivateBy(link);

  return tl
    .addLabel('head-android-base')
    .add(linkActivate)
    .from(blockProps.el(id), blockProps.from, 'head-android-base')
    .from('#descr4-iphone-app-img', { x: '-100%', opacity: 0 }, 'head-android-base')
    .addLabel('android-base-fix')
    .addLabel('end-android-base', '+=1')
    .to('#descr4-iphone-app-img', { x: '-100%', opacity: 0 }, 'end-android-base')
    // .to(blockProps.el(id), blockProps.to, 'end-android-base')
    .add(linkActivate, 'android-base-fix+=' + delayEnd);
};

// -------------------------------------------------------------------------------------
// main
// -------------------------------------------------------------------------------------

const options = {
  scrollTrigger: {
    pin: true,
    trigger: '#descr',
    start: 'top top',
    end: '+=5000',
    scrub: true,
  },
};

pipe(
  gsap.timeline(options),
  init,
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
  (tl) => {
    return tl
      .fromTo('#descr .descr-left-shape', { width: 0 }, { width: '100%' });
  },
);
