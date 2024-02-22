import gsap from './init';
import { pipe } from './utils';
import { scroller, shape, line, title, subtitle } from './common';

const id = '#problem';

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
  shape(id),
);
