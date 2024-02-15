import gsap from 'gsap';

const topBar = gsap.from('.top-bar', { opacity: 0, y: -60, duration: 1 });
const headContent = gsap.from('.head-content', { opacity: 0, duration: 1 })

const head = gsap.timeline();
head.add(headContent, '>');
head.add(topBar, '>-0.5');
