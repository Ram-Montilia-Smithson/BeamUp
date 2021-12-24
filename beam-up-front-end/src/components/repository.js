import React from 'react'

function Repository({ repo }) {

    // a simple card component showing basic information of the repo with a save button

    return (
        <div>
            <div>{`${repo.name}`}</div>
        </div>
    )
}

export default Repository
