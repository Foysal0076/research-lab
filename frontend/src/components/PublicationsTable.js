import React, { useState } from 'react'
import { Table } from 'react-bootstrap'


const PublicationsTable = ({ publications }) => {
    const [source, setSource] = useState('')

    return (
        <Table striped responsive hover >
            <thead className='table-dark' >
                <tr>
                    <th>#</th>
                    <th>TITLE</th>
                    <th>TYPE</th>
                    <th>AUTHORS</th>
                </tr>
            </thead>
            <tbody>
                {publications && publications.length !== 0 && (
                    publications.map((publication, index) => (
                        <tr key={publication._id} role='button' onClick={() => publication.source && window.open(publication.source)} >
                            <td>{index + 1}</td>
                            <td>{publication.title}</td>
                            <td>{publication.type}</td>
                            <td>{publication.authorNames}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </Table>
    )
}

export default PublicationsTable