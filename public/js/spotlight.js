const button = document.getElementById('js-add__button');
const ghost = document.getElementById('ghost');
const images = document.querySelectorAll('.product__images');
const notify = document.getElementById('notify');
const size = document.getElementsByName('size');

const checkExist = () => {
  const card = document.getElementById('js-card');
  card.style.display = 'block';

  if (typeof(card) !== 'undefined' && card !== null) {
    setTimeout(() => {
      card.style.display = 'none';
      setTimeout(() => {
        card.parentNode.removeChild(card);
      }, 1000);
    }, 5000);
  }
};

const checkSize = () => { // Use forEach()
  for (var i = 0; i < size.length; i++) {
    if (size[0].checked || size[1].checked || size[2].checked || size[3].checked) {
      button.style.zIndex = 10;
      ghost.style.zIndex = 0;
      notify.style.display = 'none';
    } else {
      button.style.zIndex = 0;
      ghost.style.zIndex = 10;
      notify.style.display = 'block';
    }
  }
};

const loopList = (list, e, fn) => {
  list.forEach((list) => {
    list.addEventListener(e, fn);
  });
};

const swapImages = (e) => {
  const spotlight = document.getElementById('js-product__image');

  images.forEach((images) => {
    if (images !== e.target) {
      images.style.opacity = 0.5;
    } else if (images === e.target) {
      spotlight.src = e.target.src;
      e.target.style.opacity = 1;
    }
  });
};

loopList(images, 'click', swapImages);
loopList(size, 'click', checkSize);
ghost.addEventListener('click', checkSize);
window.onload = checkExist;