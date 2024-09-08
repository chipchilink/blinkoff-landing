import gsap from 'gsap';
import { pipe, only, desktopScreen } from './utils';
import { scroller, line, img } from './common';

const id = '#app-target';

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
