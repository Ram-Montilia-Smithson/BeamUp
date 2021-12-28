import React from 'react'

function Entrance() {
    
    return (
        <div>
            <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`}>Enter</a>
        </div>
    )
}

export default Entrance
