import gsap from 'gsap';
import { pipe, only, desktopScreen } from './utils';
import { scroller } from './common';

const id = '#solve';

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
