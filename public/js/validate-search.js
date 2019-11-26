const button = document.getElementById('js-search__button');
const ghost = document.getElementById('js-search__ghost');
const input = document.getElementById('js-search__input');

const validate = () => {
  const expression = /./;
  const result = expression.test(input.value);

  if (result === true) {
    ghost.style.zIndex = 0;
    button.disabled = false;
  } else {
    ghost.style.zIndex = 10;
    button.disabled = true;
  }

  return result;
}

const result = validate();

const reset = () => {
  if (result === true) {
    button.disabled = true;
  } else {
    input.value = null;
  }
}

input.addEventListener('input', validate);
ghost.addEventListener('click', reset);
