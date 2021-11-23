
const state = {
    UPDATING_QUESTION: 0,
    UPDATING_ANSWER: 1,
    NEW: -1
}

Object.freeze(state)

class QuestionLoader {

    constructor(ques_pattern, ans_pattern, answer_length) {
        this.state = state.NEW
        this.length = 0
        this.answer_length = answer_length
        this.current_answer_length = 0
        this.content = []
        this.ques_pattern = ques_pattern
        this.ans_pattern = ans_pattern

    }

    

    push(val) {

        if (this.state === state.NEW) {
            if (this.ques_pattern.test(val)) {
                this.content.push({ 'question': val.replace(this.ques_pattern,'').replace(/[_\.\-]{3,}/g, '___'), 'choices': '' })
                this.length += 1
                this.lastElement = this.content[this.length - 1]

                this.state = state.UPDATING_QUESTION
                this.current_answer_length = 0
            }
            else {
                throw val
            }
        }

        else if (this.state === state.UPDATING_QUESTION || this.state === state.UPDATING_ANSWER) {
            if (this.ans_pattern.test(val)) {
                const choices = val.split(this.ans_pattern).filter(e => e !== '').map(e => e.trim())
                const update_string = ( this.current_answer_length === 0? '' : '/+/'  )+ choices.join('/+/')
                this.current_answer_length += choices.length
                this.lastElement.choices += update_string

                if (this.current_answer_length > 4) {
                    throw val
                }

                if (this.current_answer_length === 4) {
                    this.state = state.NEW
                }

                if (this.current_answer_length < 4) {
                    this.state = state.UPDATING_ANSWER
                }
            }
        }
    }
}



export {QuestionLoader}