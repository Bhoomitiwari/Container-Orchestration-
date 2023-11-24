//Implement Microservice:
//Create a file named app.js:
// app.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/checkLoanEligibility', (req, res) => {
  const { age, income, creditScore } = req.body;

  // Simple eligibility criteria for demonstration
  const isEligible = age >= 18 && income >= 50000 && creditScore >= 700;

  res.json({ isEligible });
});

app.listen(port, () => {
  console.log(`Microservice listening at http://localhost:${port}`);
});

