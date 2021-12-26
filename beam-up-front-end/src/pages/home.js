import React from 'react'

function Home() {

    // should handle errors regarding user entrance
    // passwords don't match, email already exist
    // deal with user entrance to app using github's authorization
    
    return (
        <div>
            {/* scope=user:email& */}
            <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`}>Enter</a>
        </div>
    )
}

export default Home
