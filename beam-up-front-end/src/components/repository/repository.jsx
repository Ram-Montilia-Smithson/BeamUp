import React, { useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

function Repository({ repo, changeFavorites, page }) {

    const [comment, setComment] = useState(repo.comment ? repo.comment : "")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    const addToFavorites = (repo) => {
        if (comment.length) repo.comment = comment
        // console.log(repo);
        changeFavorites(repo)
        handleClose()
    }



    return (
        <Card>
            <Card.Header className='h6'>{repo.name}</Card.Header>
            <Card.Body>By: {repo.owner.login}</Card.Body>
            
            {page === "home" ?
                <Button onClick={() => handleShow(repo)}>More Info</Button>
                :
                <>
                    {repo.comment && <Card.Footer>{repo.comment}</Card.Footer>}
                    <Button Button onClick={() => changeFavorites(repo)}>Remove From Favorites</Button>
                </>
            }
            <Modal size="sm" show={show} onHide={handleClose}>
                {repo.created_at && <Card.Text>Created At: {new Date(repo.created_at).toLocaleDateString()}</Card.Text>}
                {repo.description && <Card.Text>Description: {repo.description}</Card.Text>}
                <Card.Link href={repo.clone_url} target="_blank"> GitHub Link</Card.Link>
                <Card.Footer>{repo.language ? "Language:" : "-"}{repo.language}</Card.Footer>
                <Card.Footer>Size: {repo.size}</Card.Footer>
                <Form.Group>
                    <Form.Label>Wanna add a comment?</Form.Label>
                    <Form.Control
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        type="text"
                        placeholder={repo.comment ? repo.comment : "Your comment"} />
                </Form.Group>
                    <Button onClick={() => addToFavorites(repo)}>Add To Favorites</Button>
            </Modal>
        </Card>
    )
}

export default Repository
