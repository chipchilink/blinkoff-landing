import gsap from 'gsap';
import { pipe } from './utils';
import { scroller, shape, line, title, subtitle } from './common';

const id = '#about';

const options = {
  scrollTrigger: {
    trigger: id,
    start: 'top center',
  },
};

const l1 = 'start';

const teammate = (n, l) => (tl) => {
  return tl
    .addLabel(n, l || '-=0.3')
    .from(`#about .col:nth-child(${n}) img`, { opacity: 0, repeat: 2, duration: 0.1 }, n)
    .from(`#about .col:nth-child(${n}) h3`, { opacity: 0, y: 10 }, n)
    .from(`#about .col:nth-child(${n}) p`, { opacity: 0, x: 10 }, n);
}

pipe(
  gsap.timeline(options),
  (tl) => tl.addLabel(l1),
  title(id, l1),
  subtitle(id, l1),
  line(id, l1),
  scroller(id, l1 + '+=0.2'),
  teammate('1', l1),
  teammate('2', l1 + '+=0.2'),
  teammate('3', l1 + '+=0.4'),
  teammate('4', l1 + '+=0.6'),
);
