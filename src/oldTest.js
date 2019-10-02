const { newQuiz, newQuestion, newRandomQuestion } = require('./index')
const { quizModes } = require('./data')

console.log('starting tests ...')

/*
  TESTING newQuiz
*/

// Test Default Arguments
const quiz1 = newQuiz()
if (
  quiz1.quizMode !== 'flag-to-country' ||
  quiz1.questions.length !== 5 ||
  quiz1.questions[0].options.length !== 4 ||
  quiz1.questions[0].quizMode !== undefined
) {
  throw new Error('newQuiz(): Default arguments do not work.')
}

// Test with Arguments
const quiz2 = newQuiz('capital-to-country', 1, 3)
if (
  quiz2.quizMode !== 'capital-to-country' ||
  quiz2.questions.length !== 1 ||
  quiz2.questions[0].options.length !== 3
) {
  throw new Error('newQuiz(): Arguments do not match output.')
}

// Test Mixed Mode
const quiz3 = newQuiz('mixed', 1, 2)
if (
  quiz3.quizMode !== 'mixed' ||
  !quizModes.includes(quiz3.questions[0].quizMode)
) {
  throw new Error('newQuiz(): Mixed mode does not work.')
}

// Test Data of Response
const quiz4 = newQuiz('capital-to-country', 3, 8)
if (
  typeof quiz4 !== 'object' ||
  typeof quiz4.quizMode !== 'string' ||
  !Array.isArray(quiz4.questions) ||
  typeof quiz4.questions[0].question !== 'string' ||
  typeof quiz4.questions[0].answer !== 'string' ||
  !Array.isArray(quiz4.questions[0].options)
) {
  throw new Error('newQuiz(): Response data is not correct.')
}

/*
  TESTING newQuestion
*/

// Test Default Arguments
const question1 = newQuestion()
if (!question1.question.includes('.svg') || question1.options.length !== 4) {
  throw new Error('newQuestion(): Default arguments do not work.')
}

// Test with Arguments
const question2 = newQuestion('capital-to-flag', 2)
if (!question2.answer.includes('.svg') || question2.options.length !== 2) {
  throw new Error('newQuestion(): Arguments do not match output.')
}

// Test Data of Response
const question3 = newQuestion('country-to-capital', 4)
if (
  typeof question3 !== 'object' ||
  typeof question3.question !== 'string' ||
  typeof question3.answer !== 'string' ||
  !Array.isArray(question3.options)
) {
  throw new Error('newQuestion(): Response data is not correct.')
}

/*
  TESTING newRandomQuestion
*/

// Test Default Arguments
const randomQuestion1 = newRandomQuestion()
if (randomQuestion1.options.length !== 4) {
  throw new Error('newRandomQuestion(): Default arguments do not work.')
}

// Test with Arguments
const randomQuestion2 = newRandomQuestion(2)
if (randomQuestion2.options.length !== 2) {
  throw new Error('newRandomQuestion(): Arguments do not match output.')
}

// Test Data of Response
const randomQuestion3 = newRandomQuestion(1)
if (
  typeof randomQuestion3 !== 'object' ||
  typeof randomQuestion3.quizMode !== 'string' ||
  !quizModes.includes(randomQuestion3.quizMode) ||
  typeof randomQuestion3.question !== 'string' ||
  typeof randomQuestion3.answer !== 'string' ||
  !Array.isArray(randomQuestion3.options)
) {
  throw new Error('newRandomQuestion(): Response data is not correct.')
}

console.log('tests completed')
