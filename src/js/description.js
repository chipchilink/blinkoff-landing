import gsap from './init';
import { pipe } from './utils';
import { line, scroller } from './common';

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

const scrolledTo = (id) => {
  gsap.to(window, { ...scrollCfg, scrollTo: id });
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
    (tl) => tl.addLabel('descr-init-end'),
    (tl) => tl.fromTo('#descr .descr-right-shape', { height: 0 }, { height: '100%' }, 'descr-init-end'),
  );
};

const monitoring = (tl) => {
  const id = '#monitoring';

  const navLink = document.getElementById('nav-descr');
  const link = document.querySelector(byHref(id));

  const anchor = anchorById(tl, 'smartphone');
  navLink.onclick = anchor;
  link.onclick = anchor;
  const linkActivate = linkActivateBy(tl, link);

  const enter = tween(tl, gsap.from(blockProps.el(id), blockProps.from));
  const leave = tween(tl, gsap.to(blockProps.el(id), blockProps.to));

  const onStart = () => {
    linkActivate.in();
    enter();
  };

  const onEnd = () => {
    linkActivate.out();
    leave();
  };

  const l1 = 'head-monitoring';
  const l2 = 'smartphone';
  const l3 = 'bluetooth';
  const l4 = 'controller';
  const l5 = 'wifi';
  const l6 = 'end-monitoring';
  const l7 = 'final-monitoring';

  const scale = 0.9;
  const d = 30;

  return tl
    .add(noop, '+=0.01')
    .addLabel(l1)
    .add(onStart, l1)
    .from('#descr1-smartphone-label', { x: '100%' }, l1)
    .from('#descr1-smartphone-img', { x: -d, opacity: 0, scale }, l1)
    .addLabel(l2)
    .from('#descr1-controller-label', { x: '100%' }, l2)
    .from('#descr1-controller-img', { y: -d, opacity: 0, scale }, l2)
    .addLabel(l3)
    .from('#descr1-bluetooth', { opacity: 0 })
    .addLabel(l4)
    .from('#descr1-panel-controller-label', { x: '100%' }, l4)
    .from('#descr1-panel-controller-img', { x: d, opacity: 0, scale }, l4)
    .addLabel(l5)
    .from('#descr1-wifi', { opacity: 0 })
    .addLabel(l6, '+=1')
    .to('#descr1-smartphone-label', { x: '100%' }, l6)
    .to('#descr1-smartphone-img', { x: -d, opacity: 0, scale }, l6)
    .to('#descr1-controller-label', { x: '100%' }, l6)
    .to('#descr1-controller-img', { y: -d, opacity: 0, scale }, l6)
    .to('#descr1-panel-controller-label', { x: '100%' }, l6)
    .to('#descr1-panel-controller-img', { x: d, opacity: 0, scale }, l6)
    .to('#descr1-bluetooth', { opacity: 0 }, l6)
    .to('#descr1-wifi', { opacity: 0 }, l6)
    .addLabel(l7)
    .add(onEnd, l7);
};

const controller = (tl) => {
  const id = '#controller';

  const link = document.querySelector(byHref(id));

  const anchor = anchorById(tl, 'descr2-fix');
  link.onclick = anchor;
  const linkActivate = linkActivateBy(tl, link);

  const enter = tween(tl, gsap.from(blockProps.el(id), blockProps.from));
  const leave = tween(tl, gsap.to(blockProps.el(id), blockProps.to));

  const onStart = () => {
    linkActivate.in();
    enter();
  };

  const onEnd = () => {
    linkActivate.out();
    leave();
  };

  const l1 = 'head-controller';
  const l2 = 'descr2-fix';
  const l3 = 'end-controller';
  const l4 = 'final-controller';

  const scale = 0.9;
  const d = 30;

  return tl
    .addLabel(l1)
    .add(onStart, l1)
    .set('#descr2-parent-plata-img', { width: 503 })
    .from('#descr2-slave-plata-label', { x: '100%' }, l1)
    .from('#descr2-slave-plata-img', { x: -d, opacity: 0, scale }, l1)
    .from('#descr2-parent-plata-label', { x: '100%' }, l1)
    .from('#descr2-parent-plata-img', { x: -d, opacity: 0, scale }, l1)
    .addLabel(l2)
    .addLabel(l3, '+=1')
    .to('#descr2-slave-plata-label', { x: '100%' }, l3)
    .to('#descr2-slave-plata-img', { x: -d, opacity: 0, scale }, l3)
    .to('#descr2-parent-plata-label', { x: '100%' }, l3)
    .to('#descr2-parent-plata-img', { scale: 1.5, y: -200 }, l3)
    .addLabel(l4)
    .add(onEnd, l4);
};

const specifications = (tl) => {
  const id = '#specifications';

  const link = document.querySelector(byHref(id));
  const anchor = anchorById(tl, 'specifications-fix');
  link.onclick = anchor;
  const linkActivate = linkActivateBy(tl, link);

  const enter = tween(tl, gsap.from(blockProps.el(id), blockProps.from));
  const leave = tween(tl, gsap.to(blockProps.el(id), blockProps.to));

  const l1 = 'head-specifications';
  const l2 = 'body-specifications';
  const l3 = 'specifications-fix';
  const l4 = 'end-specifications';
  const l5 = 'points-end';
  const l6 = 'finally-specifications';

  const scale = 0.9;
  const d = 30;

  return tl
    .addLabel(l1)
    .add(linkActivate.in, l1)
    .add(enter, l1)
    .addLabel(l2)
    .from('#tv-controller .point', { stagger: 0.1, scale: 0, y: 10 }, l2)
    .from(id + ' .-a-list li', { stagger: 0.1, opacity: 0, x: 40 }, l2)
    .addLabel(l3)
    .addLabel(l4, '+=1')
    .to('#tv-controller .point', { stagger: 0.1, scale: 0, y: 10 }, l4)
    .addLabel(l5)
    .to('#descr2-parent-plata-img', { x: -d, opacity: 0, scale }, l5)
    .addLabel(l6)
    .add(leave, l6)
    .add(linkActivate.out, l6);
};

const androidBase = (tl) => {
  const id = '#android-base';

  const link = document.querySelector(byHref(id));
  const anchor = anchorById(tl, 'android-base-fix');
  link.onclick = anchor;
  const linkActivate = linkActivateBy(tl, link);

  const enter = tween(tl, gsap.from(blockProps.el(id), blockProps.from));
  const leave = tween(tl, gsap.to(blockProps.el(id), blockProps.to));

  const l1 = 'head-android-base';
  const l2 = 'android-base-fix';
  const l3 = 'end-android-base';
  const l4 = 'finally-android-base';

  const scale = 0.9;
  const d = 30;

  return tl
    .addLabel(l1)
    .add(linkActivate.in, l1)
    .add(enter, l1)
    .from('#descr4-iphone-app-img', { x: -d, opacity: 0, scale }, l1)
    .addLabel(l2)
    .addLabel(l3, '+=1')
    .to('#descr4-iphone-app-img', { x: -d, opacity: 0, scale }, l3)
    .addLabel(l4)
    .add(leave, l4)
    .add(linkActivate.out, l4)
    .add(noop, '+=0.01');
};

// -------------------------------------------------------------------------------------
// main
// -------------------------------------------------------------------------------------

const t = pipe(
  gsap.timeline({
    scrollTrigger: {
      pin: true,
      trigger: '#descr',
      start: 'top top',
      end: '+=5000',
      scrub: true,
    },
    onComplete: () => {
      scrolledTo('#complect');
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
      start: 'top center',
      trigger: '#descr',
      onEnter: () => {
        gsap.to(window, scrollTo(t, 'smartphone'));
      },
    }
  }),
  init,
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
