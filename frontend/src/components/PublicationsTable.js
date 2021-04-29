import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

const PublicationsTable = ({ publications }) => {

    const { userInfo } = useSelector(state => state.userLogin)

    return (
        <Table striped responsive hover >
            <thead className='table-dark' >
                <tr>
                    <th>#</th>
                    <th>TITLE</th>
                    <th>TYPE</th>
                    <th>AUTHORS</th>
                    {userInfo && userInfo.isAdmin && <th></th>}
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
                            {userInfo && userInfo.isAdmin && (
                                <td>
                                    <LinkContainer to={`/admin/user/${publication._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    {/* <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(publication._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button> */}
                                </td>
                            )}
                        </tr>
                    ))
                )}
            </tbody>
        </Table>
    )
}

export default PublicationsTable