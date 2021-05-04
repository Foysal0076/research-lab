import React, { useEffect } from 'react'
import { Card, Col, Image, Row, ListGroup, ListGroupItem, Carousel } from 'react-bootstrap'
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
                    <Card className='my-2 p-0 shadow' >
                        <Card.Body>
                            <Row className='justify-content-between' >
                                <Col sm={12} md={8}>
                                    <h1>{member.name}</h1>
                                    <p className='py-4' >{member.intro}</p>
                                    <address>
                                        {member.labDesignation} <br />
                                    SEEDS LAB <br />
                                        <br />
                                        {member.occupationalDesignation} <br />
                                        {member.workPlace} <br />
                                        <a href={`mailto:${member.email}`}>{member.email}</a>
                                    </address>
                                </Col>
                                <Col sm={12} md={4} className='text-center'>
                                    <div className='profile-image-container' >
                                        <Image src={member.image} fluid />
                                        <Carousel.Caption className='d-flex flex-row mb-4  justify-content-between' >
                                            {member.social && member.social.facebook &&
                                                <div className="px-2 pad-x">
                                                    <a rel="noreferrer" target='_blank' href={member.social.facebook}> <i className="fab fa-facebook fa-2x"></i> </a>
                                                </div>
                                            }
                                            {/* {member.social && member.social.instagram &&
                        <div className="px-2 pad-x">
                          <a target='_blank' href={member.social.instagram}> <i className="fab fa-instagram fa-2x"></i> </a>
                        </div>
                      } */}
                                            {member.social && member.social.researchGate &&
                                                <div className="px-2 pad-x">
                                                    <a target='_blank' href={member.social.researchGate} rel="noreferrer"> <i className="fab fa-researchgate fa-2x"></i> </a>
                                                </div>
                                            }
                                            {member.social && member.social.github &&
                                                <div className="px-2 pad-x">
                                                    <a target='_blank' href={member.social.github} rel="noreferrer"> <i className="fab fa-github fa-2x"></i> </a>
                                                </div>
                                            }
                                            {member.social && member.social.linkedIn &&
                                                <div className="px-2 pad-x">
                                                    <a target='_blank' href={member.social.linkedIn} rel="noreferrer"> <i className="fab fa-linkedin fa-2x"></i> </a>
                                                </div>
                                            }
                                            {member.social && member.social.web &&
                                                <div className="px-2 pad-x">
                                                    <a target='_blank' href={member.social.web} rel="noreferrer"> <i className="fas fa-globe fa-2x"></i> </a>
                                                </div>
                                            }
                                        </Carousel.Caption>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card className='my-2 shadow'>
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
                    <Card className='my-2 shadow'>
                        <Card.Body>
                            <Card.Title>
                                <h4>Publications</h4>
                            </Card.Title>
                            {member.publications.length > 0
                                ? <PublicationsTable publications={member.publications} />
                                : <h6>{`${member.name} has no publication yet`}</h6>
                            }
                        </Card.Body>
                    </Card>

                </div>
            )}

        </div>
    )
}

export default FacultyDetailsScreen