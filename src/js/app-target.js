import gsap from 'gsap';
import { pipe } from './utils';
import { scroller, line, img } from './common';

const id = '#app-target';

const options = {
  scrollTrigger: {
    trigger: id,
    start: 'top center',
  },
};

const l1 = 'start';

pipe(
  gsap.timeline(options),
  (tl) => tl.addLabel(l1),
  line(id, l1),
  scroller(id, l1),
  img(id, l1, { pos: 'top-right', scale: 1.05 }),
  (tl) => tl.from('#app-target-title', { y: -40, opacity: 0 }, l1 + '+=0.3'),
  (tl) => tl.from('#app-target-content', { x: 40, opacity: 0 }, l1 + '+=0.4'),
);
