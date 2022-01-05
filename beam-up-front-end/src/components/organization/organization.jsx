import React, { useState } from 'react'
import Card from "react-bootstrap/Card"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

function Organization({ org, callGetAllRepos }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    const handleClick = () => {
        callGetAllRepos(org.login)
        handleClose()
    }

    return (
        <Card>
            <Card.Text className='h6'>{org.login}</Card.Text>
            <Button size='sm' className='m-auto rounded-circle' style={{ width: 30, height: 30 }} onClick={handleShow}>
                i
            </Button>
            <Card.Link href={"https://github.com/" + org.login} target="_blank"> GitHub Link</Card.Link>
            <Modal size="sm" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{org.login}</Modal.Title>
                </Modal.Header>
                <Modal.Body><img className='w-100' src={org.avatar_url} alt={org.login}/></Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleClick()}>Get Repos</Button>
                    {org.description && <p>{org.description}</p>}
                </Modal.Footer>
            </Modal>
        </Card>
    )
}

export default Organization
