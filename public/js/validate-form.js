const button = document.getElementById('stripe-button');
const ghost = document.getElementById('ghost');
const heading = document.querySelectorAll('.shipping__span'); // Change name
const input = document.querySelectorAll('.shipping__input');

const addressLine1 = document.getElementById('address-line-1');
const addressLine2 = document.getElementById('address-line-2');
const city = document.getElementById('city');
const country = document.getElementById('country');
const email = document.getElementById('email');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const phone = document.getElementById('phone');
const postalCode = document.getElementById('g-8');
const state = document.getElementById('g-7');
const stateOption = document.getElementById('state');

const items = [addressLine1, city, email, firstName, lastName, phone, postalCode];

const ifEmpty = () => {
  items.forEach((items) => {
    if (items.value === '') {
      items.style.border = '1px solid rgb(255, 100, 100)';
      items.addEventListener('input', ifEmpty);
    } else if (items.value !== '') {
      items.style.border = '0';
      items.removeEventListener('input', ifEmpty);
    }
  });
};

const position = () => {
  for (var i = 0; i < input.length; i++) {
    input[i].addEventListener('input', position);
    if (input[i].value === '') {
      heading[i].style.top = '14px';
      input[i].style.paddingTop = '0px';
    } else if (input[i].value !== '') {
      heading[i].style.top = '5px';
      input[i].style.paddingTop = '11px';
    }
  }
};

const postal = () => {
  if (country.value !== 'United States' && window.screen.width <= '640') {
    postalCode.style.gridColumn = '1 / 5';
    state.style.display = 'none';
    stateOption.value = '';
  } else if (country.value == 'United States' && window.screen.width <= '640') {
    postalCode.style.gridColumn = '3 / 5';
    state.style.display = 'inline-block';
    stateOption.selectedIndex = 0;
  } else if (country.value !== 'United States') {
    postalCode.style.gridColumn = '3 / 5';
    state.style.display = 'none';
    stateOption.value = '';
  } else {
    postalCode.style.gridColumn = '4 / 5'
    state.style.display = 'inline-block';
    stateOption.selectedIndex = 0;
  }
};

const toggleGhost = () => {
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('input', toggleGhost);
    const test = items.some((item) => {
      if (item.value === '') {
        button.style.zIndex = 0;
        ghost.style.zIndex = 10;
        return true;
      } else if (item.value !== '') {
        button.style.zIndex = 10;
        ghost.style.zIndex = 0;
      }
    });
  }
};

window.onload = () => {
  position();
  toggleGhost();
};

country.addEventListener('input', postal);
ghost.addEventListener('click', ifEmpty);
