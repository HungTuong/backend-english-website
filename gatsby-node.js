const {aws_configure} = require('./aws_config_adapter')


exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {

  const { createNode } = actions
  try {

    for (const [key, value] of Object.entries(aws_configure)) {
      createNode(
        {
          id: key,
          parent: null,
          children: [],
          internal: {
            type: 'aws_resource',
            content: String(value),
            contentDigest: createContentDigest(value),
          }
        }
      )
    }
  } catch (error) {
    console.log(error)
  }
}

exports.onCreateNode = async ({ node, actions, createNodeId, createContentDigest, loadNodeContent }) => {
  const { createNode, createNodeField } = actions

  //ignore none html file
  if (node.internal.type !== 'File' || node.internal.mediaType !== 'text/html') return;

  // load html
  const nodeContent = await loadNodeContent(node);

  try {
    createNode(
      {
        id: createNodeId(node.relativePath),
        name: node.name,
        content: nodeContent,
        internal: {
          type: 'HTMLContent',
          contentDigest: createContentDigest(nodeContent),
        },
        parent: null,
        children: [],
      }
    )
  } catch (error) {
    console.log(error);
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
  })
}