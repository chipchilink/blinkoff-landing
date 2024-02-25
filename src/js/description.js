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

document.getElementById('nav-descr').onclick = (e) => {
  gsap.to(window, { ...scrollCfg, scrollTo: "#descr" });
  e.preventDefault();
};

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
  const id = '#monitoring';

  const link = document.querySelector(byHref(id));
  const linkActivate = linkActivateBy(tl, link);
  const enter = tween(tl, gsap.from(blockProps.el(id), blockProps.from));
  const onStart = () => {
    linkActivate.in();
    enter();
  };

  const scale = 0.9;
  const d = 30;

  return pipe(
    tl,
    (tl) => tl.addLabel('descr-init'),
    (tl) => tl.from('#descr-main-title', { y: -40, opacity: 0, }, '<'),
    (tl) => tl.from('.scroll-block-list a', { x: -40, opacity: 0, stagger: 0.1 }, '<'),
    line('.scroll-block:first-of-type', 'descr-init', 0.9),
    scroller('.scroll-block:first-of-type', 'descr-init'),
    (tl) => tl
      .fromTo('#descr .descr-right-shape', { height: 0 }, { height: '100%' }, '<')
      .add(onStart, '<')
      .from('#descr1-smartphone-label', { x: '101%' }, '<')
      .from('#descr1-smartphone-img', { x: -d, opacity: 0, scale }, '<')
      .from('#descr1-controller-label', { x: '101%' }, '<')
      .from('#descr1-controller-img', { y: -d, opacity: 0, scale }, '<')
      .from('#descr1-bluetooth', { opacity: 0 }, '<' + '+=0.2')
      .from('#descr1-panel-controller-label', { x: '101%' }, '<')
      .from('#descr1-panel-controller-img', { x: d, opacity: 0, scale }, '<')
      .from('#descr1-wifi', { opacity: 0 }, '<' + '+=0.2'),
  );
};

const monitoring = (tl) => {
  const id = '#monitoring';

  const link = document.querySelector(byHref(id));

  const anchor = anchorById(tl, 'end-monitoring');
  link.onclick = anchor;
  const linkActivate = linkActivateBy(tl, link);

  const leave = tween(tl, gsap.to(blockProps.el(id), blockProps.to));

  const onEnd = () => {
    linkActivate.out();
    leave();
  };

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
    .add(onEnd);
};
const controller = (tl) => {
  const id = '#controller';

  const link = document.querySelector(byHref(id));

  const anchor = anchorById(tl, 'end-controller');
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

  const l3 = 'end-controller';

  const scale = 0.9;
  const d = 30;

  return tl
    .add(onStart)
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
    .add(onEnd)
    .add(noop, '+=0.01');
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
      pin: true,
      trigger: '#descr',
      start: 'top top',
      end: '+=5000',
      scrub: true,
      snap: 'labelsDirectional'
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
      start: 'top 70%',
      trigger: '#descr',
    }
  }),
  init,
);

pipe(
  gsap.timeline({
    scrollTrigger: {
      trigger: '#descr',
      start: 'top 70%',
    },
  }),
  (tl) => {
    return tl
      .fromTo('#descr .descr-left-shape', { width: 0, opacity: 0 }, { width: '100%', opacity: 1 });
  },
);
