var API_BASE_URL = 'https://cors-anywhere.herokuapp.com/http://numbersapi.com';
var API_REQUEST_TYPE;
var inputElement = document.getElementById('numberInput');
var outputElement = document.getElementById('output');
var loadingElement = document.getElementById('loading');
var errorElement = document.getElementById('error');
var reloadElement = document.getElementById('reload');

function getRequestType() {
  var returnType;
  var randomNumber = Math.floor(Math.random() * 4);
  // converting random number to return types
  switch (randomNumber) {
    case 0:
      returnType = 'trivia';
      break;
    case 1:
      returnType = 'math';
      break;
    case 2:
      returnType = 'date';
      break;
    default:
      returnType = 'year';
      break;
  }
  // Returning the value
  return returnType;
}

function validateInput() {
  return (inputElement.value > 0 && inputElement.value < 10000);
}

async function fetchResult() {
  API_REQUEST_TYPE = getRequestType();

  // Checking if the value is empty
  if(inputElement.value === "") {
    outputElement.textContent = "Enter a number to find secret.";
    return;
  }

  // Checking if input is valid.
  if(validateInput()) {
    var inputNumber = inputElement.value;
    // Creating Url fro api request
    var API_URL = `${API_BASE_URL}/${inputNumber}/${API_REQUEST_TYPE}`;
    // Showing Loading Element
    loadingElement.style.display = 'inline-block';
    outputElement.textContent = '';
    // Fetching data from the API
    await fetch(API_URL)
      .then(function(res) {
        if (res.status !== 200) {
          throw new Error('500 - Internal Server Error!');
        }
        return res.text();
      })
      .then(function(data) {
        outputElement.textContent = data;
        errorElement.style.display = 'none';
      })
      .catch(function() {
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
reloadElement.addEventListener('click', function(e) {
  e.preventDefault();
  fetchResult();
});

// Stopping default behaviour of the form.
document.getElementById('api-form').addEventListener('submit', function(e) {
  e.preventDefault();
  fetchResult();
});
