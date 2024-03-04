import gsap from 'gsap';
import { pipe } from './utils';
import { scroller, line, img } from './common';

const id = '#contacts';

const options = {
  scrollTrigger: {
    trigger: id,
    start: 'top center',
  },
};

pipe(
  gsap.timeline(options),
  scroller(id),
);