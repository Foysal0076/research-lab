import React from 'react'
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap'


const AuthorList = ({ authors, onDeleteClick }) => {
    return (
        <ListGroup>
            {authors.map((author, index) => (
                <ListGroupItem key={index} className='p-1' >
                    <Row>
                        <Col sm={7} >
                            <p className='m-0' >{author.email}</p>
                        </Col>
                        <Col sm={4}>
                            <p className='m-0'>{author.name}</p>
                        </Col>
                        <Col sm={1} className='p-0' >
                            <i
                                role='button'
                                className="fas fa-trash"
                                style={{ color: 'red' }}
                                onClick={() => onDeleteClick(author)}
                            ></i>
                        </Col>
                    </Row>
                </ListGroupItem>
            ))}
        </ListGroup>
    )
}

export default AuthorList