import React from 'react'

function Organization({ org, handleClickOnOrg }) {

    // a simple card component showing basic information of the org

    return (
        <div>
            <div
                // onClick={() => handleClickOnOrg(org.login)}
            >{`${org.login}`}</div>
        </div>
    )
}

export default Organization
