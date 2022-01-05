import React, { useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import { useEffect } from 'react'

function Repository({ repo, changeFavorites, page, favorites }) {

    const [comment, setComment] = useState(repo.comment ? repo.comment : "")
    const [show, setShow] = useState(false);
    const [favorite, setFavorite] = useState(false)

    useEffect(() => {
        if (favorites.length) {
            const favorite = favorites.filter((element => element.name === repo.name))
            if (favorite.length) setFavorite(true)
            else setFavorite(false)
        }
    }, [favorites, repo])

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    const addToFavorites = (repo) => {
        if (comment.length) repo.comment = comment
        changeFavorites(repo)
        handleClose()
    }

    const removeFromFavorites = (repo) => {
        changeFavorites(repo)
        handleClose()
    }

    return (
        <Card>
            <Card.Header className='h6'>{repo.name}</Card.Header>
            {page === "home" ?
                <>
                    <Button
                        size='sm'
                        className='mx-auto my-1 rounded-circle'
                        style={{ width: 30, height: 30 }}
                        onClick={() => handleShow(repo)}
                    >
                        i
                    </Button>
                    <Card.Link href={repo.clone_url} target="_blank"> GitHub Link</Card.Link>
                </>
                :
                <Card style={{ width: "15rem" }}>
                    {repo.created_at && <Card.Text>Created At: {new Date(repo.created_at).toLocaleDateString()}</Card.Text>}
                    {repo.description && <Card.Text>Description: {repo.description}</Card.Text>}
                    <Card.Text>{repo.language ? "Language:" : "-"}{repo.language}</Card.Text>
                    <Card.Img src={repo.owner.avatar_url} />
                    <Button onClick={() => removeFromFavorites(repo)}>Remove From Favorites</Button>
                    {repo.comment && <Card.Footer>{repo.comment}</Card.Footer>}
                </Card>
            }
            <Modal size="sm" show={show} onHide={handleClose}>
                {repo.created_at && <Card.Text>Created At: {new Date(repo.created_at).toLocaleDateString()}</Card.Text>}
                {repo.description && <Card.Text>Description: {repo.description}</Card.Text>}
                <Card.Footer>{repo.language ? "Language:" : "-"}{repo.language}</Card.Footer>
                <Card.Footer>Size: {repo.size}</Card.Footer>
                {favorite ?
                    <>
                        {repo.comment && <Card.Footer>{repo.comment}</Card.Footer>}
                        <Button onClick={() => removeFromFavorites(repo)}>Remove From Favorites</Button>
                    </>
                    :
                    <>
                        <Form.Group>
                            <Form.Label>Wanna add a comment?</Form.Label>
                            <Form.Control
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                type="text"
                                placeholder={repo.comment ? repo.comment : "Your comment"} />
                        </Form.Group>
                        <Button onClick={() => addToFavorites(repo)}>Add To Favorites</Button>
                    </>
                }
            </Modal>
        </Card>
    )
}

export default Repository
