import { newQuiz, newQuestion, newRandomQuestion } from './index'

describe('newQuestion', () => {
  it('should have question, answer and options', () => {
    const question = newQuestion()
    expect(question).toHaveProperty('question')
    expect(question).toHaveProperty('answer')
    expect(question).toHaveProperty('options')
  })

  it('should have 4 options by default', () => {
    const question = newQuestion()
    expect(question.options.length).toBe(4)
  })

  it('should accept a numberOfOptions argument', () => {
    const question = newQuestion(undefined, 2)
    expect(question.options.length).toBe(2)
  })

  it('should accept a quizMode argument ', () => {
    const question = newQuestion('capital-to-country')
    expect(question.question).not.toMatch(/.svg/)
    expect(question.answer).not.toMatch(/.svg/)
  })
})

describe('newRandomQuestion', () => {
  it('should have question, answer, options and quizMode', () => {
    const question = newRandomQuestion()
    expect(question).toHaveProperty('question')
    expect(question).toHaveProperty('answer')
    expect(question).toHaveProperty('options')
    expect(question).toHaveProperty('quizMode')
  })

  it('should accept a numberOfOptions argument', () => {
    const question = newRandomQuestion(2)
    expect(question.options.length).toBe(2)
  })
})

describe('newQuiz', () => {
  it('should have a quizMode of flag-to-country by default', () => {
    const quiz = newQuiz()
    expect(quiz).toHaveProperty('quizMode', 'flag-to-country')
  })

  it('should have 5 questions by default', () => {
    const quiz = newQuiz()
    expect(quiz.questions.length).toBe(5)
  })

  it('should accept a quizMode argument', () => {
    const quiz = newQuiz('flag-to-capital')
    expect(quiz).toHaveProperty('quizMode', 'flag-to-capital')
  })

  it('should accept a numberOfQuestions argument', () => {
    const quiz = newQuiz(undefined, 8)
    expect(quiz.questions.length).toBe(8)
  })

  it('should accept a numberOfOptions argument', () => {
    const quiz = newQuiz(undefined, undefined, 2)
    expect(quiz.questions[0].options.length).toBe(2)
  })

  it('should use random questions in mixed mode', () => {
    const quiz = newQuiz('mixed')
    expect(quiz).toHaveProperty('quizMode', 'mixed')
    quiz.questions.forEach(question => {
      expect(question).toHaveProperty('quizMode')
    })
  })
})
