import gsap from 'gsap';
import { pipe, only, desktopScreen } from './utils';
import { scroller, shape, line, title, subtitle } from './common';

const id = '#problem';

const options = {
  scrollTrigger: {
    trigger: id,
    start: 'top center',
  },
};

const l1 = 'start';

only(desktopScreen, () => {
  pipe(
    gsap.timeline(options),
    (tl) => tl.addLabel(l1),
    title(id, l1),
    subtitle(id, l1),
    line(id, l1),
    scroller(id, l1 + '+=0.2'),
    shape(id, l1 + '+=0.3'),
  );
});
