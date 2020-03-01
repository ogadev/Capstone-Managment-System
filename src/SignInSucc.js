import React from 'react'
import { Auth } from "aws-amplify";

function SignInSucc() {

    function signOut() {
        Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Sign out?</h1>
            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    )
}

export default SignInSucc;