import * as functions from 'firebase-functions';
import axios from 'axios';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import * as cors from 'cors';
const CORS = cors();
// const cors = require('cors')({ origin: true });

const API_BASE_URL = 'http://numbersapi.com';

function getRequestType() {
  let returnType;
  const randomNumber = Math.floor(Math.random() * 4);
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

function validateInput(value: number) {
  console.log(value);
  return value > 0 && value < 10000;
}

export const numberApi = functions.https.onRequest((request, response) => {
  CORS(request, response, async () => {
    const API_REQUEST_TYPE = getRequestType();
    const inputNumber = request.body.data.number;

    // Checking if input is valid.
    if (validateInput(Number(inputNumber))) {
      // Creating Url fro api request
      const API_URL = `${API_BASE_URL}/${inputNumber}/${API_REQUEST_TYPE}`;
      // Fetching data from the API
      await axios
        .get(API_URL)
        .then(function (res) {
          if (res.status !== 200) {
            throw new Error('500 - Internal Server Error!');
          }
          return res.data;
        })
        .then(function (data) {
          return response.send(data);
        })
        .catch(function () {
          response.status(500).send('500 - Internal Server Error!');
        });
    } else {
      response
        .status(400)
        .send('Please enter valid number between 0 and 10000!');
    }
  });
});
