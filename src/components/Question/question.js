import React, { useState } from "react"
import TextareaAutosize from 'react-textarea-autosize'
import * as questionStyle from "./question.module.css"
import { useForm } from 'react-hook-form'


function Question_({ data, order, onSubmit, getAnswer, getNote }) {
    const choice_label = ['A.', 'B.', 'C.', 'D.']
    const choice_data = data.choices.split('/+/')

    const [userChoice, setUserChoice] = useState(-1)
    const [isSubmit, submit] = useState(false)
    const [result, setResult] = useState('')
    const [takeNote, setNote] = useState(false)

    let handleSubmit = null
    let id =null
    if (getAnswer) {
        id = order
        handleSubmit = () => {
            submit(true)
            onSubmit({ id: order, correct: userChoice })
            setResult(`Nhập câu trả lời: ${choice_label[data.correct]} `)
        }
    } else {
        id = data.id
        handleSubmit = () => {
            submit(true)

            if (userChoice === data.correct) {
                onSubmit(true)
                setResult('Trả lời đúng')
            } else {
                onSubmit(false)
                setResult(`Trả lời sai - Đáp án: ${choice_label[data.correct]} `)
            }
        }
    }

    const setChoice = (i) => {
        if (!isSubmit) {
            setUserChoice(i)
        }
    }

    return (
        <div className={questionStyle.question}>
            <div className={questionStyle.content}>{(order + 1) + '. ' + data.question}</div>
            <div className={questionStyle.choices}>
                {choice_data.map((e, i) => {
                    return <button onClick={() => setChoice(i)}>{choice_label[i] + ' ' + e}</button>
                })}
            </div>
            <div >
                <span>You choose answer: {choice_label[userChoice]}</span>
                {userChoice !== -1 ?
                    <button onClick={handleSubmit} disabled={isSubmit} style={{ 'float': 'right' }}>
                        {isSubmit ? result : 'Summit'}
                    </button> : null} 
            </div>

            <button onClick={() => setNote(true) } disabled={takeNote}>
                Take note
            </button>

            {takeNote? <Note getNote={getNote} id={id}/> :null}

            {isSubmit && !getAnswer? (
                <div>
                    {data.note}
                </div>
            ): null}
        </div>
    )
}

const Note = ({getNote, id}) => {
        const { register, handleSubmit, formState: { errors } } = useForm();
    
        return (
            <form onSubmit={handleSubmit(data => getNote({note : data['note'], 'id' : id}))}>
                <TextareaAutosize className={questionStyle.answerNote} minRows={10}
                    {...register('note', { required: true })} />
                      
                {errors.note && <span>Bạn chưa điền note </span>}

                <input type="submit" value="Lưu Note" style={{'float': 'right'}}/>
            </form>
        )
}


export default function Question (props) {
    return (
        <Question_ {...props} getAnswer={false} />
    )
}


export function TeacherQuestion(props) {
    return (
        <Question_ {...props} getAnswer={true} />
    )
}