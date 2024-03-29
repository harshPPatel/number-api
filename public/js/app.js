var API_BASE_URL = 'https://cors-anywhere.herokuapp.com/http://numbersapi.com';
var API_REQUEST_TYPE;
var inputElement = document.getElementById('numberInput');
var outputElement = document.getElementById('output');
var loadingElement = document.getElementById('loading');
var errorElement = document.getElementById('error');
var reloadElement = document.getElementById('reload');

function validateInput() {
  return inputElement.value > 0 && inputElement.value < 10000;
}

async function fetchResult() {
  // Checking if the value is empty
  if (inputElement.value === '') {
    outputElement.textContent = 'Enter a number to find secret.';
    return;
  }

  if (validateInput()) {
    // Checking if input is valid.
    var inputNumber = inputElement.value;

    // Showing Loading Element
    loadingElement.style.display = 'inline-block';
    outputElement.textContent = '';

    await fetch(
      'https://us-central1-number-api-e04c9.cloudfunctions.net/numberApi'
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.text();
      })
      .then((data) => {
        outputElement.textContent = data;
        errorElement.style.display = 'none';
      })
      .catch(function () {
        errorElement.textContent = '500 - Internal Server Error!';
        errorElement.style.display = 'block';
      });

    // Hiding Loading Element
    loadingElement.style.display = 'none';
  } else {
    // Showing the error
    errorElement.textContent = 'Please enter valid number between 0 and 10000!';
    errorElement.style.display = 'block';
    return;
  }
}

// setting onChange event of Input Element
inputElement.addEventListener('input', fetchResult);

// Setting onClick event for reload element
reloadElement.addEventListener('click', function (e) {
  e.preventDefault();
  fetchResult();
});

// Stopping default behaviour of the form.
document.getElementById('api-form').addEventListener('submit', function (e) {
  e.preventDefault();
  fetchResult();
});
