const { QuestionLoader } = require('./QuestionLoader')

const Answer = (ques, answer) => {
    return { question: ques, choices: answer }
}

const ques_pattern = /^\d+\.\s/
const ans_pattern = /[A-D]\.\s/
const answer_length = 4
var question_loader

beforeEach(() => {
    question_loader = new QuestionLoader(ques_pattern, ans_pattern, answer_length)
})

describe('single question test', () => {
    const input = ['1. When I last saw him, he ___ in London', 'A. has lived B. is living C. was living D. has been living']

    test('push first question only', () => {
        question_loader.push(input[0])

        expect(question_loader.lastElement.question).toEqual('When I last saw him, he ___ in London')
    })

    test('push one full question', () => {
        question_loader.push(input[0])
        question_loader.push(input[1])

        expect(question_loader.lastElement).toEqual(Answer('When I last saw him, he ___ in London',
            'has lived/+/is living/+/was living/+/has been living'))

    })
})

describe('Answers break in multiple lines', () => {
    const input = ['1. When I last saw him, he ___ in London', 'A. has lived',
        'B. is living', 'C. was living D. has been living']

    test('push 1 question and 4 answers', () => {
        input.forEach(e => question_loader.push(e))

        expect(question_loader.lastElement).toEqual(Answer('When I last saw him, he ___ in London',
            'has lived/+/is living/+/was living/+/has been living'))
    })
})

describe('Multiple question', () => {
    const input = ["1. When I last saw him, he ___ in London.",
        "A. has lived B. is living C. was living D. has been living",
        "2. We ___ Dorothy since last Saturday.",
        "A. don‘t see B. haven‘t seen C. didn‘t see D. hadn‘t seen"]

    test('push 1 question and 4 answers', () => {
        input.forEach(e => question_loader.push(e))

        expect(question_loader.content).toEqual([
            Answer('When I last saw him, he ___ in London.',
                'has lived/+/is living/+/was living/+/has been living'),
            Answer('We ___ Dorothy since last Saturday.',
                'don‘t see/+/haven‘t seen/+/didn‘t see/+/hadn‘t seen')
        ])
    })
})

