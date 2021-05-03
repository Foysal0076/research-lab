import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, FormControl, FormGroup, FormLabel, FormText, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addAuthorPubLink, editPublication, getPublication, removeAuthorPubLink } from '../../actions/publicationActions'
import { AUTHOR_PUB_LINK_RESET, AUTHOR_PUB_REMOVE_LINK_RESET, PUBLICATION_EDIT_RESET } from '../../actions/types'
import Loader from '../../components/layout/Loader'
import Message from '../../components/layout/Message'
import AuthorList from '../../components/AuthorList'
import { listUsers } from '../../actions/userActions'

const EditPublicationsScreen = ({ history, match }) => {

    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [source, setSource] = useState('')
    const [authorNames, setAuthorNames] = useState('')
    const [authors, setAuthors] = useState([])

    const { userInfo } = useSelector(state => state.userLogin)
    const { loading, error, publication } = useSelector(state => state.publication)
    const { error: authorError, users: authorList } = useSelector(state => state.userList)
    const { loading: editLoading, error: editError, success: editSuccess } = useSelector(state => state.publicationEdit)
    const { error: linkingError, success: linkingSuccess } = useSelector(state => state.authorPubLink)
    const { error: removeLinkingError, success: removeLinkingSuccess } = useSelector(state => state.authorPubRemoveLink)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            if (editSuccess) {
                window.history.back()
                dispatch({ type: PUBLICATION_EDIT_RESET })
            } else {
                if (!publication || publication._id !== match.params.id || linkingSuccess || removeLinkingSuccess) {
                    dispatch(getPublication(match.params.id))
                } else {
                    setTitle(publication.title)
                    setType(publication.type)
                    setSource(publication.source)
                    setAuthorNames(publication.authorNames)
                    setAuthors(publication.authors)
                }
                dispatch({ type: AUTHOR_PUB_LINK_RESET })
                dispatch({ type: AUTHOR_PUB_REMOVE_LINK_RESET })

            }
        } else {
            history.push('/login')
        }
    }, [dispatch, history, editSuccess, userInfo, match.params.id, authorList, publication, linkingSuccess, removeLinkingSuccess,])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(editPublication(match.params.id, title, type, source, authorNames))
    }

    const onAuthorAddClick = (author) => {
        authors.findIndex(a => a.name === author.name) === -1 ? dispatch(addAuthorPubLink(author._id, match.params.id)) : window.alert('Author already exist')

    }

    const onAuthorDeleteClick = (author) => {
        // const newAuthors = authors.filter(a => a._id !== author._id)
        // setAuthors(newAuthors)
        dispatch(removeAuthorPubLink(author._id, match.params.id))
    }

    return (
        <>
            <h3 className='text-center' >Edit Publication</h3>
            {error && <Message variant='danger'>{error}</Message>}
            {loading ? <Loader /> : editLoading ? <Loader /> : (
                <>
                    {editError && <Message variant='danger'>{editError}</Message>}
                    <Row>
                        <Col md={6}>
                            <>
                                <Card>
                                    <Card.Body>
                                        <Form onSubmit={onSubmitHandler} >
                                            <FormGroup>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl
                                                    as='textarea'
                                                    rows={5}
                                                    value={title}
                                                    required
                                                    onChange={(e) => setTitle(e.target.value)}></FormControl>
                                            </FormGroup>

                                            <FormGroup>
                                                <FormLabel>Type</FormLabel>
                                                <FormControl
                                                    as='select'
                                                    value={type}
                                                    required
                                                    onChange={(e) => setType(e.target.value)}>
                                                    <option value='' >Select Publication Type...</option>
                                                    <option value='Journal' >Journal</option>
                                                    <option value='Conference Paper' >Conference Paper</option>
                                                    <option value='Book' >Book</option>
                                                    <option value='Editorship' >EditorShip</option>
                                                </FormControl>
                                            </FormGroup>

                                            <FormGroup>
                                                <FormLabel>Source</FormLabel>
                                                <FormControl
                                                    type='text'
                                                    value={source}
                                                    onChange={(e) => setSource(e.target.value)}></FormControl>
                                            </FormGroup>

                                            <FormGroup>
                                                <FormLabel>Authors</FormLabel>
                                                <FormControl
                                                    type='text'
                                                    required
                                                    placeholder='Enter author names...'
                                                    value={authorNames}
                                                    onChange={(e) =>
                                                        setAuthorNames(e.target.value)
                                                    }>
                                                </FormControl>
                                                <FormText className='text-muted' >Comma seperated. ex: Brat William,John Doe,Scott Robinson</FormText>
                                            </FormGroup>
                                            <Button type='submit' block variant='outline-primary'>Submit</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </>
                        </Col>
                        <Col md={6}>
                            <Card className='mb-2' >
                                <Card.Body>
                                    <h5 className='text-center' >Authors</h5>
                                    {linkingError && <Message variant='danger'>{linkingError}</Message>}
                                    {removeLinkingError && <Message variant='danger'>{removeLinkingError}</Message>}
                                    {publication && (
                                        <AuthorList authors={authors} onDeleteClick={onAuthorDeleteClick} />
                                    )}
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Body>
                                    <h6 className='text-center' >Add Authors to this publication</h6>

                                    <FormControl
                                        type='text'
                                        placeholder='Search by author name...'
                                        onChange={(e) => dispatch(listUsers(e.target.value))}
                                    ></FormControl>
                                    {authorError ? <Message variant='danger'>{error}</Message> : (
                                        <ListGroup>
                                            {authorList && authorList.map((author, index) => (
                                                <ListGroupItem key={index} className='p-1' >
                                                    <Row>
                                                        <Col sm={6} >
                                                            <p className='m-0' >{author.email}</p>
                                                        </Col>
                                                        <Col sm={4}>
                                                            <p className='m-0'>{author.name}</p>
                                                        </Col>
                                                        <Col sm={2} className='p-0' >
                                                            <Button
                                                                role='button'
                                                                onClick={() => onAuthorAddClick(author)}
                                                            >
                                                                <i className="fas fa-plus"></i>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            ))}
                                        </ListGroup>
                                    )}

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default EditPublicationsScreen