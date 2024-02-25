import gsap from 'gsap';
import { pipe } from './utils';
import { scroller, btn, line, rect } from './common';

const init = gsap.timeline()
  .from('.top-bar', { opacity: 0, y: -60, duration: 1 });

const l1 = 'head/init';
const l2 = 'head/rect';

pipe(
  init,
  (tl) => tl.addLabel(l1, '-=0.8'),
  (tl) => tl.from('#main-page-title', { opacity: 0, y: -40 }, l1),
  rect('#top', l1),
  (tl) => tl.addLabel(l2, '-=0.4'),
  line('#top', l1),
  (tl) => tl.from('#main-page-descr', { opacity: 0, x: 40 }, l1),
  btn('#top', l2),
  scroller('#top', l2, 0.1),
  (tl) => tl.from('#iphone-app img', { opacity: 0 }, l2),
  (tl) => tl.from('#incubator img', { opacity: 0, x: -100 }, l2),
);