import React, { useState } from 'react'
import { TeacherQuestion } from '../components/Question/question'
import { API, graphqlOperation } from 'aws-amplify'
import { createQuestion } from '../graphql/mutations'
import AuthStateApp from '../components/AmplifyAuth/AuthLogin'
import InputQuestions from '../components/WebEditor/QuestionEditor'

const TeacherPage = () => {
    const [data, setData] = useState([])
    const [count_answer, answer] = useState(0)
    const [updated_data, setSave] = useState(false)

    const updateCountAnswer = (ques) => {
        answer(count_answer + 1)

        let temp = data
        temp[ques.id]['correct'] = ques.correct
        setData(temp)
    }

    const saveQuestion = async () => {
        // TODO: change to batch update
        Promise.all(
            data.map(e => API.graphql(graphqlOperation(createQuestion, { input: { ...e } })))
        ).then(
            setSave(true)
        ).catch( err => console.log(err))

    }

    const getNote = ({id, note}) => {
        let temp = data
        temp[id]['note'] = note
        setData(temp)
    }

    return (
        <div>
            <InputQuestions action={setData} />
            Số câu đã trả lời: {count_answer} / {data.length} <br />

            {count_answer === data.length && count_answer > 0 ?
                <button onClick={saveQuestion} disabled={updated_data}>Save Question</button> : null} <br />

            {updated_data ? <strong>Data is Saved</strong> : null} <br />

            {data.map((e, i) => {
                return <TeacherQuestion data={e} order={i} onSubmit={updateCountAnswer} getNote={getNote}/>
            })}

        </div>
    )
}

const AuthTeacher = () => {
    return (
        <AuthStateApp>
            <TeacherPage />
        </AuthStateApp>
    )
}

export default AuthTeacher;