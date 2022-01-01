import React from 'react'
import "./repository.css"
import Card from "react-bootstrap/Card"
import { Link } from 'react-router-dom'

function Repository({ repo, changeFavorites, page }) {


    return (
        <Card id="repo-card">
            <Card.Img variant='top' src={repo.owner.avatar_url} alt={repo.owner.login} height={100}></Card.Img>
            <Card.Header>{repo.name}</Card.Header>
            <Card.Text>{new Date(repo.created_at).toLocaleDateString()}</Card.Text>
            <Card.Text>{repo.description}</Card.Text>
            <Card.Body>{repo.owner.login}</Card.Body>
            <Card.Footer>Language:{repo.language}</Card.Footer>
            {page === "home" ?
                < button onClick={() => changeFavorites(repo)}>
                        Add To Favorites
                </button>
                :
                < button onClick={() => changeFavorites(repo)}>
                        Remove From Favorites
                    </button>
            }
            {/* {repo.favorites ? "Remove From Favorites" : "Save To Favorites"} */}
        </Card>
    )
}

export default Repository
