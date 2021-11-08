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

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyDnAZBpGrm189HyAJUKG0BaSSY0o4TQO14',
    authDomain: 'number-api-e04c9.firebaseapp.com',
    projectId: 'number-api-e04c9',
    storageBucket: 'number-api-e04c9.appspot.com',
    messagingSenderId: '483649442386',
    appId: '1:483649442386:web:33212d6ea7377dc125058b',
    measurementId: 'G-VTJPFY4S9V',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const functions = getFunctions(app);

  if (validateInput()) {
    // Checking if input is valid.
    var inputNumber = inputElement.value;

    // Showing Loading Element
    loadingElement.style.display = 'inline-block';
    outputElement.textContent = '';

    const addMessage = httpsCallable(functions, 'numberApi');
    addMessage({ number: inputNumber })
      .then((result) => {
        const data = result.data;
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
