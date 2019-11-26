const hamburger = document.getElementById('js-hamburger');
const menuBars = document.querySelectorAll('.hamburger__stack');
const mainMenu = document.getElementById('js-main-menu');

hamburger.addEventListener('click', () => {
  if (mainMenu.classList.contains('active')) {
    mainMenu.classList.remove('active');

    menuBars.forEach((menuBars) => {
      menuBars.classList.remove('active');
    });
  } else {
    mainMenu.classList.add('active');
    
    menuBars.forEach((menuBars) => {
      menuBars.classList.add('active');
    });
  }
});