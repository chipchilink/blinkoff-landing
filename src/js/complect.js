import gsap from './init';
import { pipe } from './utils';
import { scroller, shape, line, title, subtitle } from './common';

const id = '#complect';

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
  title(id, l1),
  subtitle(id, l1),
  line(id, l1),
  scroller(id),
  (tl) => tl.to(id + ' .scene-bg', { height: '100%' }, l1),
  (tl) =>
    tl
      .addLabel('a', '-=0.5')
      .from(id + ' .-a-list li:nth-child(1)', { opacity: 0, x: 40 }, 'a')
      .from('#complect-controller-img', { opacity: 0, y: 40 }, 'a')
      .from('#complect-controller-label', { x: '100%' }, 'a')
      .addLabel('b', '+=0.2')
      .from(id + ' .-a-list li:nth-child(2)', { opacity: 0, x: 40 }, 'b')
      .from('#complect-skorlupa-img', { opacity: 0, y: 40 }, 'b')
      .from('#complect-skorlupa-label', { x: '100%' }, 'b')
      .addLabel('с', '+=0.2')
      .from(id + ' .-a-list li:nth-child(3)', { opacity: 0, x: 40 }, 'с')
      .from('#complect-temperature-img', { opacity: 0, y: 40 }, 'с')
      .from('#complect-temperature-label', { x: '100%' }, 'с')
);
