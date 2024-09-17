const burger = document.getElementById('burger');
const nav = document.querySelector('.mobile-head');
const links = nav.querySelectorAll('a');

const navMarker = () => {
  const scrollY = window.pageYOffset;

  links.forEach((link) => {
    const id = link.getAttribute('href');
    const section = document.querySelector(id);
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 50;
    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ){
      link.classList.add('-current');
    } else {
      link.classList.remove('-current');
    }
  });
};

window.addEventListener("scroll", navMarker);

links.forEach((link) => {
  link.onclick = () => {
    nav.classList.remove('-active');
    document.body.classList.remove('-menu-active');
  };
});

burger.onclick = () => {
  nav.classList.toggle('-active');
  document.body.classList.toggle('-menu-active');
};
