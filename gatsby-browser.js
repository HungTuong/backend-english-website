import "./src/styles/index.css"

import Amplify from "@aws-amplify/core"
import awsconfig from './src/aws-exports'
import 'react-sortable-tree/style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


Amplify.configure(awsconfig)

