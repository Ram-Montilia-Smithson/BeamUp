import React from 'react'

function Login() {

    // should handle errors regarding user entrance
    // passwords don't match, email already exist

    return (
        <div>
            Sign up
            <form>
                name
                password
                email
                savedRepos
            </form>
            Log in
            <form>
                email
                password
            </form>
        </div>
    )
}

export default Login
