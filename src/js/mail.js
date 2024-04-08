import gsap from 'gsap';

const sender = document.getElementById('mail-sender');
const contactName = sender.querySelector('input[name="contanct-name"]');
const phone = sender.querySelector('input[name="phone"]');
const email = sender.querySelector('input[name="email"]');
const success = sender.querySelector('.success');

sender.onsubmit = (e) => {

  const formData = new FormData();
  formData.append('contanct-name', contactName.value);
  formData.append('phone', phone.value);
  formData.append('email', email.value);

  fetch('/mail.php', {
    method: 'POST',
    body: formData,
  })
    .then(() => {
      success.classList.add('-active');
      gsap.from(success.querySelector('.success-text'), { opacity: 0, y: -40 });
    });

  e.preventDefault();
};
