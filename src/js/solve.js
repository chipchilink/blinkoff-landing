import gsap from 'gsap';
import { pipe } from './utils';
import { scroller, line, title, img } from './common';

const id = '#solve';

const options = {
  scrollTrigger: {
    trigger: id,
    start: 'top center',
  },
};

const l1 = 'start';
const l2 = 'mid';

pipe(
  gsap.timeline(options),
  (tl) => tl.addLabel(l1),
  title(id, l1),
  line(id, l1),
  (tl) => tl.addLabel(l2, '-=0.4'),
  scroller(id, l2),
  img(id, l2),
  (tl) => tl.from('#solve-descr', { opacity: 0, x: 40 }, l2),
);

pipe(
  gsap.timeline({
    scrollTrigger: {
      trigger: id,
      start: 'center center',
    },
  }),
  (tl) => tl.from('#solve-sub-descr', { opacity: 0, repeat: 4, duration: 0.1, ease: 'power4.out' }),
  (tl) => tl.from('#solve-descr-list li', { opacity: 0, x: -40, stagger: 0.1 }),
);
