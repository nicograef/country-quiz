/*!
 * country-quiz
 * Copyright(c) 2019 Nico Gräf
 * MIT Licensed
 */

'use strict'

import { countries, quizModes } from './data'

/**
 * Module exports.
 * @public
 */
export const newQuiz = createQuiz
export const newQuestion = createQuestion
export const newRandomQuestion = createRandomQuestion

/* Public Functions */

/**
 * Creates a new quiz with random questions.
 *
 * @param {string} quizMode Selects quiz mode (i.e. types of questions and options).  Possible values: flag-to-country, flag-to-capital, country-to-flag, country-to-capital, capital-to-flag, capital-to-country or mixed.
 * @param {number} numberOfQuestions Number of questions in this quiz.
 * @param {number} numberOfOptions Number of options (i.e. possible answers) per question.
 * @returns {object} Quiz object with the selected quiz mode and an array of questions. If quiz mode is 'mixed' then the quiz mode for every question in the quiz is randomly selected.
 */
function createQuiz (
  quizMode = 'flag-to-country',
  numberOfQuestions = 5,
  numberOfOptions = 4
) {
  const newQuiz = {
    quizMode,
    questions: []
  }
  for (let i = 0; i < numberOfQuestions; i++) {
    const newQuestion =
      quizMode === 'mixed'
        ? createRandomQuestion(numberOfOptions)
        : createQuestion(quizMode, numberOfOptions)
    newQuiz.questions.push(newQuestion)
  }
  return newQuiz
}

/**
 * Creates a single question for the selected quiz mode.
 *
 * @param {string} quizMode Selects quiz mode (i.e. types of questions and options). Possible values: flag-to-country, flag-to-capital, country-to-flag, country-to-capital, capital-to-flag or capital-to-country.
 * @param {number} numberOfOptions Number of options (i.e. possible answers) for this question.
 * @returns {object} Question object with the question, the answers and the options.
 */
function createQuestion (quizMode = 'flag-to-country', numberOfOptions = 4) {
  const [from, to] = quizMode.split('-to-')
  const randomCountries = getRandomCountries(numberOfOptions)
  const solutionIndex = Math.floor(Math.random() * randomCountries.length)
  const solution = randomCountries[solutionIndex]

  const newQuestion = {
    question: solution[from],
    answer: solution[to],
    options: randomCountries.map(c => c[to])
  }

  return newQuestion
}

/**
 * Creates a single question with random quiz mode.
 *
 * @param {number} numberOfOptions Number of options (i.e. possible answers) for this question.
 * @returns {object} Question object with the quiz mode, question, the answer and the options.
 */
function createRandomQuestion (numberOfOptions = 4) {
  const randomQuizMode = getRandomQuizMode()
  const randomQuestion = createQuestion(randomQuizMode, numberOfOptions)
  randomQuestion.quizMode = randomQuizMode
  return randomQuestion
}

/* Private Functions */

function getRandomCountries (numberOfCountries) {
  const randomCountries = []
  const indices = []
  let index
  for (let i = 0; i < numberOfCountries; i++) {
    index = Math.floor(Math.random() * countries.length)
    if (!indices.includes(index)) {
      indices.push(index)
      randomCountries.push(countries[index])
    } else i--
  }
  return randomCountries
}

function getRandomQuizMode () {
  const randomIndex = Math.floor(Math.random() * quizModes.length)
  return quizModes[randomIndex]
}
