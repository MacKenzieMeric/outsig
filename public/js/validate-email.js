const button = document.getElementById('js-mailing-list__button');
const ghost = document.getElementById('js-mailing-list__ghost');
const input = document.getElementById('js-mailing-list__input');

const reset = () => {
  if (result === true) {
    button.disabled = true;
  } else {
    input.placeholder = 'Enter a valid email';
    input.style.border = '0.1rem solid rgb(255, 100, 100)';
    input.value = null;
  }
};

const validate = () => {
  const expression = /\S+@\S+\.\S+/;
  const result = expression.test(input.value);

  if (result === true) {
    button.disabled = false;
    ghost.style.zIndex = 0;
    input.style.border = '0.1rem solid rgb(255, 255, 255)';
  } else {
    button.disabled = true;
    ghost.style.zIndex = 10;
  }

  return result;
};

const result = validate();

ghost.addEventListener('click', reset);
input.addEventListener('input', validate);
