import gsap from './init';
import { pipe, only, desktopScreen } from './utils';
import { scroller, shape, line, title, subtitle } from './common';

const id = '#complect';

const options = {
  scrollTrigger: {
    trigger: id,
    start: 'top center',
  },
};

only(desktopScreen, () => {
  pipe(
    gsap.timeline(options),
    scroller(id),
  );
});
