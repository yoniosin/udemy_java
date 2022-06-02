document.getElementById('loan-form').addEventListener('submit', function (e) {
  document.getElementById('results').style.display = 'none';

  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

function calculateResults(e) {

  // get UI values
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalInterest = document.getElementById('total-interest');
  const totalPayment = document.getElementById('total-payment');

  // calculate needed values
  const principal = parseFloat(amount.value);
  const calcualtedInterst = parseFloat(interest.value) / 100 / 12;
  const calcualtedPayments = parseFloat(years.value) * 12;
  const x = Math.pow(1 + calcualtedInterst, calcualtedPayments);
  const monthly = (principal * x * calcualtedInterst) / (x - 1);

  // hide loader
  document.getElementById('loading').style.display = 'none';


  // if results are valid, show them. Otherwise, show error
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calcualtedPayments).toFixed(2);
    totalInterest.value = ((monthly * calcualtedPayments) - principal).toFixed(2);

    document.getElementById('results').style.display = 'block';

  } else {
    showError('Please check your numbers')
  }
}

function showError(message) {
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(message));

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 2000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
