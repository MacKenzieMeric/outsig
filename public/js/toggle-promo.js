const arrow = document.getElementById('js-summary__arrow');
const promo = document.getElementById('js-summary__promo');
const promoToggle = document.getElementById('promo-toggle');

const toggle = () => {
  if (promoToggle.classList.contains('show')) {
    promo.style.height = '6rem';
    promoToggle.classList.remove('show');
    arrow.classList.remove('rotate');
  } else {
    promoToggle.classList.add('show');
    promo.style.height = 'auto';
    promo.classList.add('expand');
    arrow.classList.add('rotate');
  }
};

arrow.addEventListener('click', toggle);
