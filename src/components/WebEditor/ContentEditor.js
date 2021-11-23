import React, { useState } from "react";
import { useForm } from 'react-hook-form'
import * as mutations from '../../graphql/mutations'
import { useStaticQuery, graphql } from "gatsby";
import slugify from '@sindresorhus/slugify';
import { Auth, Storage, API, graphqlOperation } from 'aws-amplify';
import GatsbyEditorWrapper from "../Teacher/Editor/GatsbyEditorWrapper";

const TeacherEdit = () => {

    const s3_bucket = useStaticQuery(graphql`
    {
      awsResource(id: {eq: "aws_user_files_s3_bucket"}) {
        internal {
          content
        }
      }
    }
  `)['awsResource']['internal']['content']


    const [html, setHTML] = React.useState()
    const { register, handleSubmit, formState: { errors }, } = useForm()

    const onSubmit = async (data) => {
        const { username } = await Auth.currentAuthenticatedUser()
        data['url'] = data['url'].split('/').map(e => slugify(e)).join('/') // standardlize url
        data['lastUpdateUser'] = username
        const s3_file_name = `${data['url'].replace('/','-')}-${Date.now()}`
        data['S3_URL'] = `${s3_bucket}/public/content/${s3_file_name}`

        Storage.put(`content/${s3_file_name}.html`, html, {
            contentType: 'Text/html',
            level: 'public'
        }).then(
            API.graphql(graphqlOperation(mutations.createContentFiles, { input: { ...data } }))
                .catch(err => console.log(err))
        ).catch(err => console.log(err));
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="title" {...register('title', { required: true })} />
                <input placeholder="url" {...register('url', { required: true })} />


                {errors.title && <span>Title is required</span>}
                {errors.url && <span>URL is required</span>}
                <button type="submit">Save</button>
            </form>
            <GatsbyEditorWrapper action={setHTML} withStyle={true}/>
        </div>

    )
}

export default TeacherEdit
