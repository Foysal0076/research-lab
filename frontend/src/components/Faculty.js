import React, { useState } from 'react'
import { Card, CardImg, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const Faculty = ({ member }) => {

    return (
        <>
            <Card className='text-center mb-3 p-0 shadow'>
                <Card.Body className='p-1' >
                    <Link to={`/faculty/${member._id}`}>
                        <CardImg src={member.image} />
                    </Link>
                    <Link to={`/faculty/${member._id}`}>
                        <h6 className='p-1 mb-0' > <strong>{member.name}</strong> </h6>
                    </Link>
                    <p style={{ fontSize: '.7rem' }} className=" text-primary mb-1">{member.occupationalDesignation}</p>
                    <p style={{ fontSize: '.7rem' }} className="text-muted mb-1"> {member.workPlace} </p>
                    <button type='button' data-target={'#a' + member._id} className="btn btn-outline-primary w-100 mb-1 btn-sm" data-toggle='collapse' aria-expanded="false"> Research Interest</button>
                    <div className="collapse" id={`a${member._id}`}>
                        {member.researchInterests && member.researchInterests.length !== 0 &&
                            <ListGroup>
                                {member.researchInterests.map((interest, index) => (
                                    <ListGroupItem key={index}>{interest}</ListGroupItem>
                                ))}
                            </ListGroup>
                        }
                    </div>
                </Card.Body>
            </Card>
            <>

            </>
        </>
    )
}

export default Faculty