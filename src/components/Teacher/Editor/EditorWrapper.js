import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import htmlToDraft from "html-to-draftjs";
import DocxLoader from './DocxLoader'
import * as style from './editor.module.css'
import sanitizeHtml from 'sanitize-html';
import {stateToHTML} from 'draft-js-export-html';
import draftToHtml from 'draftjs-to-html';

const EditorWrapper = ({ action, withStyle }) => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    
    const [isSaved, Save] = React.useState(false)

    const loadHTMLToDraft = (html) => {
        const blocksFromHtml = htmlToDraft(html);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
    }

    const saveHTML = () => { // TODO: may need to refactor this
        // draftToHtml can not keep underline with is essential to question editor
        // therefore withStyle parameter is provided in case of General ContentEditer 
        // else question with stateToHTML
        const html = withStyle? draftToHtml(convertToRaw(editorState.getCurrentContent())) : stateToHTML(editorState.getCurrentContent())
        action(sanitizeHtml(html))
        Save(true)
    }

    return (
        <div>
            <button onClick={saveHTML} disabled={isSaved}>Confirm Content </button>
            <DocxLoader action={loadHTMLToDraft} />
            <Editor editorClassName={style.editor} readOnly={isSaved} editorState={editorState} onEditorStateChange={setEditorState} />
        </div>
    )
}


// to solve problem related to build time in gatsby due to the lack of window component


export default EditorWrapper;