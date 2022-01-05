import React from 'react'
function Index() {

    return (
        <div style={{ height: "100vh", display: "flex" }}>
            <a style={{ margin: "auto" }} href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`}>Enter</a>
        </div>
    )
}
export default Index