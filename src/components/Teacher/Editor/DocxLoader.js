import { convertToHtml } from 'mammoth/mammoth.browser'
import React from 'react'
import { useForm } from 'react-hook-form'

const DocxInput = ({ action }) => {
    const { register, handleSubmit, formState: { errors }, } = useForm()

    const parseWordDocxFile = (files) => {
        if (!files.length) return;
        let file = files[0]

        let reader = new FileReader();
        reader.onloadend = (e) => {
            convertToHtml({ arrayBuffer: reader.result }).then(function (resultObject) {
                console.log(resultObject.value)
                action(resultObject.value)
            })
        }

        reader.readAsArrayBuffer(file)
    }

    const onSubmit = (data) => {
        parseWordDocxFile(data['docx'])
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="file"{...register('docx', { required: true })} />

            {errors.docx && "Docx is required"}
            <button type="submit">Submit</button>
        </form>
    )
}

export default DocxInput;