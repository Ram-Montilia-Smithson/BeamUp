import React from 'react'
import "./repository.css"
import Card from "react-bootstrap/Card"

function Repository({ repo, page, favorites }) {

    // a simple card component showing basic information of the repo with a save to favorites button
    // make pretty

    return (
        <Card id="repo-card">
            <Card.Img variant='top' src={repo.owner.avatar_url} alt={repo.owner.login} height={100}></Card.Img>
            <Card.Header>{repo.name}</Card.Header>
            <Card.Text>{new Date(repo.created_at).toLocaleDateString()}</Card.Text>
            <Card.Text>{repo.description}</Card.Text>
            <Card.Body>{repo.owner.login}</Card.Body>
            <Card.Footer>Language:{repo.language}</Card.Footer>
            {
                page === "home" ? <button onClick={() => favorites(repo)}>Save To Favorites</button>
                : page === "favorites" ? <button onClick={() => favorites(repo)}>Remove From Favorites</button>
                : <></>
            }
        </Card>
    )
}

export default Repository
