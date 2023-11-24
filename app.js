// app.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/checkLoanEligibility', (req, res) => {
  const { age, income, creditScore } = req.body;
  const isEligible = age >= 18 && income >= 50000 && creditScore >= 700;
  res.json({ isEligible });
});

app.listen(port, () => {
  console.log(`Microservice listening at http://localhost:${port}`);
});

module.exports = app; // Export the app for testing


package.json:
{
  "name": "loan-eligibility-microservice",
  "version": "1.0.0",
  "scripts": {
    "test": "jest"
  },
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1"
  },
  "devDependencies": {
    "jest": "^27.0.6",
    "supertest": "^6.1.6"
  }
}

tests/unit.test.js (Unit Test):
// tests/unit.test.js

const app = require('../app');
const request = require('supertest');

test('Loan eligibility calculation', () => {
  const result = app.calculateLoanEligibility(25, 60000, 750);
  expect(result).toBe(true);
});

tests/integration.test.js (Integration Test):
// tests/integration.test.js

const request = require('supertest');
const app = require('../app');

test('Loan eligibility API endpoint', async () => {
  const response = await request(app).post('/checkLoanEligibility').send({
    age: 25,
    income: 60000,
    creditScore: 750
  });
  expect(response.status).toBe(200);
  expect(response.body.isEligible).toBe(true);
});


CI/CD Pipeline using GitHub Actions:
Create a .github/workflows/main.yml file in your GitHub repository.
# .github/workflows/main.yml

name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '14'

    - name: Install dependencies
      run: npm install

    - name: Run tests
      run: npm test

  deploy:
    runs-on: ubuntu-latest

    needs: build

    steps:
    - name: Deploy to Kubernetes
      uses: appleboy/kubernetes-action@v1
      with:
        kubeconfig: ${{ secrets.KUBE_CONFIG }}
        manifest_files: deployment.yaml 
