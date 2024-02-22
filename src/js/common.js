import gsap from 'gsap';
import { useToggled } from './utils';

export const line = (container, label) => (tl) => {
  return tl
    .fromTo(container + ' .line .line-view', { width: 0 }, { width: '100%' }, label || '+=0');
};

export const title = (container, label) => (tl) => {
  return tl
    .from(container + ' .-a-title', { y: -40, opacity: 0, }, label);
};

export const subtitle = (container, label) => (tl) => {
  return tl
    .from(container + ' .-a-subtitle', { x: 40, opacity: 0 }, label);
};

export const img = (container, label, o = { scale: 1 }) => (tl) => {
  const l1 = container + 'start';

  let x = 0;
  let y = 0;

  switch(o.pos){
    case 'top-right':{
      x = 35;
      y = -35;
      break;
    }
    case 'top-left':{
      x = -35;
      y = -35;
    }
  }

  return tl
    .addLabel(l1, label || '+=0')
    .fromTo(container + ' .img-back', { scale: 0 }, { x, y, scale: o.scale }, l1)
    .from(container + ' .img-view', { opacity: 0, repeat: 2, duration: 0.1, ease: 'power4.out' }, l1 + '+=0.4')
};

export const shape = (container, label) => (tl) => {
  const l1 = container + 'start';
  return tl
    .addLabel(l1, label || '+=0')
    .to(container + ' .shape-1', { y: '100%', stagger: 0.1 }, l1)
    .to(container + ' .shape-2', { y: '100%', stagger: 0.1 }, l1 + '+=0.4')
};

export const btn = (container, label) => (tl) => {
  const l1 = container + 'first';
  const l2 = container + 'second';

  return tl
    .addLabel(l1, label || '+=0')
    .fromTo(container + ' .btn .line-2', { width: 0 }, { width: '70%' }, l1)
    .fromTo(container + ' .btn .line-4', { height: 0 }, { height: '80%' }, l1)
    .fromTo(container + ' .btn .line-6', { width: 0 }, { width: '60%' }, l1)
    .fromTo(container + ' .btn .line-8', { height: 0 }, { height: '70%' }, l1)
    .addLabel(l2)
    .from(container + ' .btn .btn-text', { opacity: 0 }, l2)
    .fromTo(container + ' .btn .line-1', { width: 0 }, { width: '30%' }, l2)
    .fromTo(container + ' .btn .line-3', { height: 0 }, { height: '20%' }, l2)
    .fromTo(container + ' .btn .line-5', { width: 0 }, { width: '40%' }, l2)
    .fromTo(container + ' .btn .line-7', { height: 0 }, { height: '30%' }, l2);
};

export const rect = (container, label) => (tl) => {
  const l1 = container + 'first';
  const l2 = container + 'second';

  return tl
    .addLabel(l1, label || '+=0')
    .fromTo(container + ' .rect .line-tl', { width: 0 }, { width: '100%' }, l1)
    .fromTo(container + ' .rect .line-rb', { height: 0 }, { height: '60%' }, l1)
    .fromTo(container + ' .rect .line-lb', { height: 0 }, { height: '60%' }, l1)
    .fromTo(container + ' .rect .line-bl', { width: 0 }, { width: '30%' }, l1)
    .addLabel(l2, '-=0.4')
    .fromTo(container + ' .rect .line-rt', { height: 0 }, { height: '40%' }, l2)
    .fromTo(container + ' .rect .line-br', { width: 0 }, { width: '70%' }, l2);
};

export const scroller = (container, label, t = 0.9) => (tl) => {

  const animate = gsap.from(container + ' .scrolled .scroll-line', {
    duration: 0.5,
    flexGrow: t,
    repeat: -1,
    yoyo: true,
    ease: 'power4.inOut', 
    paused: true,
  });

  const lineScroll = useToggled((b) => {
    if(b) animate.play();
    else animate.pause();
  });

  const l1 = container + 'line';
  const l2 = container + 'end';

  return tl
    .from(container + ' .scrolled .mouse', { y: -10, opacity: 0 }, (label || '') + '+=0.2')
    .addLabel(l1, '-=0.2')
    .from(container + ' .scrolled .scroll-line', { opacity: 0 }, l1)
    .from(container + ' .scrolled .scroll-line-end', { opacity: 0 }, l1)
    .addLabel(l2, '-=0.2')
    .fromTo(container + ' .scrolled .scroll-line', { flexGrow: 0 }, { flexGrow: 1 }, l2)
    .add(lineScroll, l2 + '+=0.2');
};
