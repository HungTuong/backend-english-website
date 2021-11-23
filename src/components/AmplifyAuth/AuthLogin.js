import { AmplifyAuthenticator, AmplifySignOut, AmplifyAuthContainer } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import React, { useEffect, useState } from 'react'

const AuthStateApp = ({children}) => {
    const [authState, setAuthState] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState)
            setUser(authData)
        })
    })

    return authState === AuthState.SignedIn && user ? (
        <div>
            {children}
            <AmplifySignOut />
        </div>
    ) : (
        <AmplifyAuthContainer>
            <AmplifyAuthenticator />
        </AmplifyAuthContainer>
        );
}

export default AuthStateApp;