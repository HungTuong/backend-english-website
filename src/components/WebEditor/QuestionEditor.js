import React from 'react';
import GatsbyEditorWrapper from '../Teacher/Editor/GatsbyEditorWrapper';
import { useState, useEffect } from 'react';
import { QuestionLoader } from './util/QuestionLoader';



const InputQuestions = ({ action }) => {

    const ques_pattern = /^\d+[\.)]\s/
    const ans_pattern = /[A-Da-d]\.\s/
    const answer_length = 4
    const parser = new DOMParser()

    const [html, setHTML] = useState()
    const [err, setErr] = useState()

    useEffect(() => {
        const question_loader = new QuestionLoader(ques_pattern, ans_pattern, answer_length)
        const htmlDoc = parser.parseFromString(html, 'text/html')
        const contents = Array.from(htmlDoc.getElementsByTagName('p')).map(e => e.innerText).filter(e => e !== '')

        try {
            contents.forEach(e => question_loader.push(e))

            action(question_loader.content)
            setErr()
        } catch (e) {
            setErr(e)
        }
    }, [html])

    return (
        <div>
            <GatsbyEditorWrapper action={setHTML} withStyle={false} />
            <div style={{'color':'red'}}>
                {JSON.stringify(err)}
            </div>
        </div>
    )
}

export default InputQuestions