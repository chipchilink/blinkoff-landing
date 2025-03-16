import gsap from './init';

const btnBuy1 = document.getElementById('buy-head');
const btnBuy2 = document.getElementById('buy');
const modal = document.getElementById('modal-buy');
const btnClose = document.getElementById('buy-close');

const open = (e) => {
  modal.classList.add('-open');
  document.body.classList.add('-modal-active');
  e.preventDefault();
};

const close = (e) => {
  modal.classList.remove('-open');
  document.body.classList.remove('-modal-active');
  e.preventDefault();
};

const scrollTo = (e) => {
  gsap.to(window, {
    duration: 1.5,
    ease: "power1.inOut",
    scrollTo: '#complect',
  });
  e.preventDefault();
};

btnBuy1.onclick = scrollTo;
btnBuy2.onclick = open;
btnClose.onclick = close;
