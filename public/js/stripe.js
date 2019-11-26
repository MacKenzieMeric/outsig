const stripe = Stripe('pk_test_D4OqB1OTaDCQS2o4aOUdF5vf'); // Initialize Stripe with the public key.

const elements = stripe.elements();
const stripeForm = document.getElementById('stripe-form');
const stripeButton = document.getElementById('stripe-button');

const style = {
  base: {
    color: 'rgb(255, 255, 255)',
    iconColor: 'rgb(180, 190, 200)',
    fontFamily: '"Roboto Condensed", sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '12px',
    '::placeholder': {
      color: 'rgb(180, 190, 200)',
    },
    lineHeight: '40px'
  },
  invalid: {
    color: 'rgb(255, 100, 100)',
    iconColor: 'rgb(255, 100, 100)'
  }
};

const card = elements.create('card', {
  hidePostalCode: true,
  style,
});

card.mount('#card-element');

card.addEventListener('change', (event) => {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

stripeForm.addEventListener('submit', (event) => {
  event.preventDefault();

  stripe.createToken(card).then((result) => {
    if (result.error) {
      const errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      stripeTokenHandler(result.token);
    }
  });

  const stripeTokenHandler = (token) => {
    const form = document.getElementById('stripe-form');
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    form.submit();
  }
});
