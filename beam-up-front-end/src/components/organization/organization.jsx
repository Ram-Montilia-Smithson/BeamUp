import React from 'react'
import "./organization.css"
import Card from "react-bootstrap/Card"

function Organization({ org, callGetAllRepos }) {

    return (
        <Card id="org-card" onClick={() => callGetAllRepos(org.login)}>
            <Card.Text>{org.login}</Card.Text>
            <Card.Img variant='top' src={org.avatar_url} alt={org.login} height="50"></Card.Img>
            {org.description && <Card.Footer>{org.description}</Card.Footer>}
        </Card>
    )
}

export default Organization
