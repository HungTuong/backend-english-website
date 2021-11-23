import Loadable from 'react-loadable';
import React from 'react';

const GatsbyEditorWrapper = Loadable({
    loader: () => import('./EditorWrapper'),
    loading() {
        return <div>Loading...</div>
    }
});

export default GatsbyEditorWrapper