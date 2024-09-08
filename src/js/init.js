import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { only, desktopScreen } from './utils';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

only(desktopScreen, () => {
  document.documentElement.classList.add('-is-screen');
});

export default gsap;
