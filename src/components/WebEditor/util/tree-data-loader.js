const tree_data_loader = (list_file_info) => {
    class Node {
        constructor(title, data, subtitle, children) {
            this.title = title
            this.subtitle = subtitle
            this.data = data
            this.children = children
            this.editing = false
        }
    }

    const addFolder = (leftTree, rightNode) => {
        let found = leftTree.find(e => rightNode.title === e.title)
        if (found) {
            addFolder(found.children, rightNode.children[0])
        } else {
            leftTree.push(rightNode)
        }

        return leftTree
    }

    const createNode = (urls, data, i) => {
        i++
        if (i === urls.length) {
            const {title, S3_URL, lastUpdateUser,updatedAt } = data
            console.log(title)
            const subtitle = `Title: ${title} - lastUpdatedBy: ${lastUpdateUser} - ${updatedAt}` 
            return new Node(urls[i - 1], S3_URL, subtitle, [])
        }
        else
            return new Node(urls[i - 1], null, null, [createNode(urls, data, i)])
    }

    return list_file_info
        .map(({ url, ...data }) => {
            const urls = url.split('/')
            return createNode(urls, data, 0)
        })
        .reduce(addFolder, [])
}

export default tree_data_loader