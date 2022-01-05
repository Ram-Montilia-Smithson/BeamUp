import React, { useState } from 'react'
import "./organization.css"
import Card from "react-bootstrap/Card"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

function Organization({ org, callGetAllRepos }) {

    // add description to the Modal and not Card component and the image as well maybe link as well

    const [show, setShow] = useState(false);

    const handleClose = () => {
        console.log(show);
        setShow(false)
    };
    const handleShow = () => setShow(true);

    // const handleClick = () => {
        // handleShow(true);
        // callGetAllRepos(org.login)
    // }

    return (
        <Card style={{ width: '5rem' }} id="org-card" >
            <Card.Text className='h6'>{org.login}</Card.Text>
            <Card.Link href={org.url}> GitHub Link</Card.Link>
            <button id='org-button' onClick={handleShow}> i </button>

            <Modal size="sm" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{org.login}</Modal.Title>
                </Modal.Header>
                <Modal.Body><img className='w-100' src={org.avatar_url} alt={org.login}/></Modal.Body>
                {org.description &&<Modal.Footer> {org.description} </Modal.Footer>}
            </Modal>
        </Card>
    )
}

export default Organization
