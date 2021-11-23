import * as queries from '../graphql/customeQueries'
import React, { useState, useEffect } from "react";
import SortableTree, { addNodeUnderParent, changeNodeAtPath, removeNodeAtPath } from 'react-sortable-tree';
import tree_data_loader from '../components/WebEditor/util/tree-data-loader'
import { API, graphqlOperation } from 'aws-amplify';
import slugify from '@sindresorhus/slugify';
import TeacherEdit from '../components/WebEditor/ContentEditor'

// Create enum type
const EditMode = {
    NONE: 0,
    FILE: 1,
    FOLDER: 2,
}
Object.freeze(EditMode)

const EditWeb = () => {
    const [list_url, setURL] = useState([])
    const [tree_data, setTree] = useState([])
    const [editingMode, changeModeEdit] = useState(EditMode.NONE)

    const fetch_url = async () => {
        let data = await API.graphql(graphqlOperation(queries.listContentFiless))
        data = data.data.listContentFiless.items
        data.forEach(e => {
            e['updatedAt'] = new Date(e['updatedAt']).toLocaleString('en-GB')
        })
        return data
    }

    // initial fetch data
    useEffect(() => {
        fetch_url().then(e => setURL(e))
    }, [])

    // reload-tree 
    useEffect(() => {
        setTree(tree_data_loader(list_url))
    }, [list_url])

    const addFile = (node, path) => {
        if (editingMode) {
            alert('Save your change before editing new file')
            return
        }

        setTree(addNodeUnderParent({
            treeData: tree_data,
            parentKey: path[path.length - 1],
            expandParent: true,
            getNodeKey: ({ treeIndex }) => treeIndex,
            newNode: {
                title: 'Editing',
                subtitle: 'Edit File Content Bellow',
                editing: true
            }
        }).treeData)

        changeModeEdit(EditMode.FILE)
    }

    const addFolder = (node, path) => {
        if (editingMode) {
            alert('Save your change before editing new file')
            return
        }

        setTree(addNodeUnderParent({
            treeData: tree_data,
            parentKey: path[path.length - 1],
            expandParent: true,
            getNodeKey: ({ treeIndex }) => treeIndex,
            newNode: {
                title: 'New Folder',
                editing: true,
                children: []
            }
        }).treeData)

        changeModeEdit(EditMode.FOLDER)
    }

    const editFile = (node, path) => {
        if (editingMode) {
            alert('Save your change before editing new file')
            return
        }

        node.editing = true
        changeModeEdit(EditMode.FILE)
    }

    const removeEmptyFolder = (node, path) => {
        setTree(removeNodeAtPath({
            treeData: tree_data,
            path,
            getNodeKey: ({ treeIndex }) => treeIndex,
        }))
    }

    const saveFolderName = (node, path) => {
        node.editing = false
        node.title = slugify(node.title)
        changeModeEdit(EditMode.NONE)
    }

    const load_button = (node, path) => {
        if (node.editing)
            return [<button onClick={() => saveFolderName(node, path)}>Save</button>]

        if (!node.subtitle)
            return [
                <button onClick={() => addFolder(node, path)}>Create Folder</button>,
                <button onClick={() => addFile(node, path)}>Create File</button>,
                // <button onClick={() => rename_node(node, path)}>Rename </button>
                node.children.length === 0 ? <button onClick={() => removeEmptyFolder(node, path)}>Remove</button> : null
            ]

        return [
            <button disabled={editingMode !== EditMode.NONE}
                onClick={() => editFile(node, path)}>
                Edit
            </button>]
    }

    return (
        <div>
            <div style={{ height: 400 }}>
                <SortableTree
                    treeData={tree_data}
                    onChange={data => setTree(data)}
                    generateNodeProps={({ node, path }) => ({
                        buttons: load_button(node, path),
                        title: node.editing && editingMode === EditMode.FOLDER  ?
                            <form>
                                <input value={node.title} onChange={(event) => {
                                    node.title = event.target.value
                                    setTree(changeNodeAtPath({
                                        treeData: tree_data,
                                        path,
                                        getNodeKey: ({ treeIndex }) => treeIndex,
                                        newNode: node
                                    }))
                                }} />
                            </form> : node.title
                    })}
                    canDrag={false}
                />
            </div>
            {editingMode === EditMode.FILE ? <TeacherEdit /> : null}
        </div>
    )
}

export default EditWeb

