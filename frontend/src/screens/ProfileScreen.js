import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFacultyProfileByUserId } from '../actions/facultyActions'
import { Button, Card, Carousel, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'
import PublicationsTable from '../components/PublicationsTable'
const ProfileScreen = ({ match, history }) => {

    const dispatch = useDispatch()
    const { loading, error, profile } = useSelector(state => state.facultyProfile)
    const { userInfo } = useSelector(state => state.userLogin)

    const id = match.params.userId ? match.params.userId : userInfo ? userInfo._id : null

    useEffect(() => {
        if (userInfo) {
            dispatch(getFacultyProfileByUserId(id))
        } else {
            history.push('/login')
        }
    }, [dispatch, id, match.params.userId])

    return (
        <div>
            <h1>Profile</h1>
            {loading && <Loader />}
            {error ? <Message variant='danger'>{error}</Message> : (
                !profile && userInfo && !userInfo.isAdmin ? (
                    <>
                        <p>You do not have a profile. Please request an admin to create your profile</p>
                    </>
                ) : !profile && userInfo && userInfo.isAdmin ? (
                    <LinkContainer to={`/profile/${id}/create-profile`}>
                        <Button variant='primary' > Create Profile</Button>
                    </LinkContainer>
                ) : (
                    <div>
                        <Card className='my-2 p-0' >
                            <Card.Body>
                                <Row className='justify-content-between' >
                                    <Col sm={12} md={8}>
                                        <div className="d-flex flex-row justify-content-between">
                                            <h1>{profile.name}</h1>
                                            <Button
                                                variant='outline-primary'
                                                onClick={() => history.push(`/admin/users/profiles/${profile.user}/edit`)}
                                            >Edit Profile</Button>
                                        </div>
                                        <p className='py-4' >{profile.intro}</p>
                                        <address>
                                            {profile.labDesignation} <br />
                                    SEEDS LAB <br />
                                            <br />
                                            {profile.occupationalDesignation} <br />
                                            {profile.workPlace} <br />
                                            <a href={`mailto:${profile.email}`}>{profile.email}</a>
                                        </address>
                                    </Col>
                                    <Col sm={12} md={4} className='text-center'>
                                        <div className='profile-image-container' >
                                            <Image src={profile.image} style={{}} fluid />
                                            <Carousel.Caption className='d-flex flex-row mb-4  justify-content-between' >
                                                {profile.social && profile.social.facebook &&
                                                    <div className="px-2 pad-x">
                                                        <a rel="noreferrer" target='_blank' href={profile.social.facebook}> <i className="fab fa-facebook fa-2x"></i> </a>
                                                    </div>
                                                }
                                                {/* {profile.social && profile.social.instagram &&
                        <div className="px-2 pad-x">
                          <a target='_blank' href={profile.social.instagram}> <i className="fab fa-instagram fa-2x"></i> </a>
                        </div>
                      } */}
                                                {profile.social && profile.social.researchGate &&
                                                    <div className="px-2 pad-x">
                                                        <a target='_blank' href={profile.social.researchGate} rel="noreferrer"> <i className="fab fa-researchgate fa-2x"></i> </a>
                                                    </div>
                                                }
                                                {profile.social && profile.social.github &&
                                                    <div className="px-2 pad-x">
                                                        <a target='_blank' href={profile.social.github} rel="noreferrer"> <i className="fab fa-github fa-2x"></i> </a>
                                                    </div>
                                                }
                                                {profile.social && profile.social.linkedIn &&
                                                    <div className="px-2 pad-x">
                                                        <a target='_blank' href={profile.social.linkedIn} rel="noreferrer"> <i className="fab fa-linkedin fa-2x"></i> </a>
                                                    </div>
                                                }
                                                {profile.social && profile.social.web &&
                                                    <div className="px-2 pad-x">
                                                        <a target='_blank' href={profile.social.web} rel="noreferrer"> <i className="fas fa-globe fa-2x"></i> </a>
                                                    </div>
                                                }
                                            </Carousel.Caption>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h4>Research Interest</h4>
                                </Card.Title>
                                {profile.researchInterests && profile.researchInterests.length !== 0 &&
                                    <ListGroup>
                                        {profile.researchInterests.map((interest, index) => (
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
                                <PublicationsTable publications={profile.publications} />
                            </Card.Body>
                        </Card>

                    </div>
                )
            )}

        </div>
    )
}

export default ProfileScreen