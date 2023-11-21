<div align="center">

  <h1>Country Quiz</h1>

[![Build Status](https://travis-ci.org/nicograef/country-quiz.svg?branch=master)](https://travis-ci.org/nicograef/country-quiz) [![Coverage Status](https://coveralls.io/repos/github/nicograef/country-quiz/badge.svg?branch=master)](https://coveralls.io/github/nicograef/country-quiz?branch=master) [![npm](https://img.shields.io/npm/v/country-quiz)](https://npmjs.com/package/country-quiz) [![License](https://img.shields.io/github/license/nicograef/country-quiz)](https://github.com/nicograef/country-quiz/blob/master/LICENSE) [![npm bundle size](https://img.shields.io/bundlephobia/min/country-quiz?label=size)](https://npmjs.com/package/country-quiz) [![GitHub last commit](https://img.shields.io/github/last-commit/nicograef/country-quiz)](https://github.com/nicograef/country-quiz/commits/master)

</div>

This node module lets you create questions and quizzes (with multiple questions) about countries, their flag and their capital (or vice versa).
Data, Quizzes and Questions are accessed offline from a data file (data originally from https://restcountries.eu/) but the SVG-Files for the Flags need an internet connection.

## Installation

```sh
npm i country-quiz
# or
yarn add country-quiz
```

Then import into your project

```javascript
/* Common JS */
const countryQuiz = require('country-quiz')
const quiz = countryQuiz.newQuiz()

/* ES Module */
import { newQuiz, newQuestion, newRandomQuestion } from 'country-quiz'
const quiz = newQuiz()
```

## Usage

**newQuiz**
Returns an object with an array of questions of the specified quiz mode.
If quiz mode is 'mixed' then the quiz mode for every question in the quiz is randomly selected.

```javascript
newQuiz()
// returns (for example):
{
  quizMode: 'flag-to-country',
  questions: [
    {
      question: 'https://restcountries.eu/data/sau.svg',
      answer: 'Saudi Arabia',
      options: ['Austria', 'Saudi Arabia', 'Nepal', 'Svalbard and Jan Mayen']
    },
    {
      question: 'https://restcountries.eu/data/mus.svg',
      answer: 'Mauritius',
      options: ['Venezuela (Bolivarian Republic of)', 'Brunei Darussalam', 'Mauritius', 'Curaçao']
    },
    {
      question: 'https://restcountries.eu/data/gnb.svg',
      answer: 'Guinea-Bissau',
      options: ['Holy See', 'Rwanda', 'Falkland Islands (Malvinas)', 'Guinea-Bissau']
    },
    {
      question: 'https://restcountries.eu/data/hrv.svg',
      answer: 'Croatia',
      options: ['Croatia', 'Costa Rica', 'Heard Island and McDonald Islands', 'Comoros']
    },
    {
      question: 'https://restcountries.eu/data/khm.svg',
      answer: 'Cambodia',
      options: ['Tanzania, United Republic of', 'Mauritius', 'Cambodia', 'Antigua and Barbuda']
    }
  ]
}
```

```javascript
// or with quizMode
const quiz = newQuiz('country-to-capital')

// or with quizMode and numberOfQuestions
const quiz = newQuiz('mixed', 5)

// or with quizMode, numberOfQuestions and numberOfOptions
const quiz = newQuiz('capital-to-flag', 3, 6)
```

| argument          | type   | default         | description                                             |
| ----------------- | ------ | --------------- | ------------------------------------------------------- |
| quizMode          | string | flag-to-country | Types of questions and options. See below.              |
| numberOfQuestions | number | 5               | Number of questions in this quiz.                       |
| numberOfOptions   | number | 4               | Number of options (i.e. possible answers) per question. |

---

**newQuestion**
Returns an object with one question of the specified quiz mode.

```javascript
// create a new question
const question = newQuestion()

// or with quizMode and numberOfOptions
newQuestion('country-to-capital', 5)
// returns (for example):
{
  question: 'Burundi',
  answer: 'Bujumbura',
  options: ['Jamestown', 'Bujumbura', 'Berlin', 'Flying Fish Cove', 'Taipei']
}
```

| argument        | type   | default         | description                                                  |
| --------------- | ------ | --------------- | ------------------------------------------------------------ |
| quizMode        | string | flag-to-country | Types of the question and possible options. See below.       |
| numberOfOptions | number | 4               | Number of options (i.e. possible answers) for this question. |

---

**newRandomQuestion**
Returns an object with one question of a random quiz mode.

```javascript
newRandomQuestion()
// returns (for example):
{
  quizMode: 'capital-to-country',
  question: 'Papeetē',
  answer: 'French Polynesia',
  options: [ 'Mali', 'French Polynesia', 'China', 'Germany' ]
}

// or with numberOfOptions
const randomQuestion = newRandomQuestion(5)
```

| argument        | type   | default | description                                                  |
| --------------- | ------ | ------- | ------------------------------------------------------------ |
| numberOfOptions | number | 4       | Number of options (i.e. possible answers) for this question. |

---

**Quiz Modes**

Works in the Schema [question]-to-[answer].
mixed is only possible for newQuiz().

- mixed
- flag-to-country
- flag-to-capital
- country-to-flag
- country-to-capital
- capital-to-flag
- capital-to-country

## Copyright

Data and Flag SVGs are from the REST Countries Project: https://restcountries.eu

---

## Development

To update the country data run `node update-data.mjs`.
This fetches fresh data from `https://restcountries.com/v3.1/all?fields=name,capital,flags` and converts it to the librarie's format.
The result is saved to a `new-data.json` file.
The content of this file needs to be copied to `src/data.js` into the `const data = [...]` variable.
