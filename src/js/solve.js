import gsap from 'gsap';
import { pipe } from './utils';
import { scroller } from './common';

const id = '#solve';

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
