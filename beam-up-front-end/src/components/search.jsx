import React, { useState } from 'react'
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

function Search({ callGetAllRepos }) {

    const [orgName, setOrgName] = useState("")

    const handleSearch = (orgName) => {
        callGetAllRepos(orgName)
        setOrgName("")
    }

    return (
        <div>
            <Form.Group>
                <Form.Label>Search a GitHub organization and see all it's repositories below</Form.Label>
                <Form.Control
                    className='w-25 d-inline'
                    placeholder="search"
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                />
                <Button
                    className='d-inline'
                    disabled={!orgName}
                    onClick={() => handleSearch(orgName)}
                >
                    search
                </Button>
            </Form.Group>
            <p>Or click the button below</p>
        </div>
    )
}

export default Search
