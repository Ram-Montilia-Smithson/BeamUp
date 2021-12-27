import React from 'react'
import "./organization.css"
import Card from "react-bootstrap/Card"

function Organization({ org, handleClickOnOrg }) {

    // a simple card component showing basic information of the org

    return (
        <Card id="org-card" onClick={() => handleClickOnOrg(org.login)}>
            <Card.Text>{org.login}</Card.Text>
            <Card.Img variant='top' src={org.avatar_url} alt={org.login} height="50"></Card.Img>
            {org.description && <Card.Footer>{org.description}</Card.Footer>}
        </Card>
    )
}

export default Organization
