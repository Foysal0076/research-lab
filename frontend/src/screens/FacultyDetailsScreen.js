import React, { useEffect } from 'react'
import { Card, Col, Image, Row, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getFacultyDetails } from '../actions/facultyActions'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'
import PublicationsTable from '../components/PublicationsTable'

const FacultyDetailsScreen = ({ match }) => {
    const dispatch = useDispatch()

    const { loading, error, facultyDetails: member } = useSelector(state => state.facultyDetails)

    useEffect(() => {
        dispatch(getFacultyDetails(match.params.id))
    }, [dispatch, match])

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : member && (
                <div>
                    <Card className='my-2 p-0' >
                        <Card.Body>
                            <Row className='justify-content-between' >
                                <Col sm={12} md={8}>
                                    <h1>{member.name}</h1>
                                    <p className='py-4' >{member.intro}</p>
                                    <address>
                                        {member.labDesignation} <br />
                                    SEEDS LAB <br />
                                        {member.occupationalDesignation} <br />
                                        {member.workPlace} <br />
                                        {member.email} <br />
                                    </address>
                                </Col>
                                <Col sm={12} md={4}>
                                    <Image src={member.image} style={{}} fluid />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h4>Research Interest</h4>
                            </Card.Title>
                            {member.researchInterests && member.researchInterests.length !== 0 &&
                                <ListGroup>
                                    {member.researchInterests.map((interest, index) => (
                                        <ListGroupItem key={index}>{interest}</ListGroupItem>
                                    ))}
                                </ListGroup>
                            }
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h4>Publications</h4>
                            </Card.Title>
                            <PublicationsTable publications={member.publications} />
                        </Card.Body>
                    </Card>

                </div>
            )}

        </div>
    )
}

export default FacultyDetailsScreen