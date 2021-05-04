import React, { useEffect, useState } from 'react'
import { Button, Card, Form, FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap'
import FormContainer from '../../components/layout/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { addPublications } from '../../actions/publicationActions'
import { PUBLICATION_ADD_RESET } from '../../actions/types'
import Loader from '../../components/layout/Loader'
import Message from '../../components/layout/Message'

const AddPublicationsScreen = ({ history }) => {

    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [source, setSource] = useState('')
    const [authorNames, setAuthorNames] = useState('')

    const { userInfo } = useSelector(state => state.userLogin)
    const { loading, error, success } = useSelector(state => state.publicationAdd)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            if (success) {
                window.history.back()
                dispatch({ type: PUBLICATION_ADD_RESET })
            }
        } else {
            history.push('/login')
        }
    }, [dispatch, history, success, userInfo])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(addPublications(title, type, source, authorNames))
    }

    return (
        <>
            <Button
                variant='outline-primary'
                className='my-2'
                onClick={() => history.push('/admin/publications')}
            > <i className="fas fa-arrow-left"></i> Go Back</Button>
            <h1 className='text-center' >Add Publication</h1>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            <FormContainer>
                <Card className='mb-4 bg-light shadow' >
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
                                    placeholder='Web link where this publication can be found..'
                                    onChange={(e) => setSource(e.target.value)}></FormControl>
                                <FormText className='text-muted'>Don't forget to include http://</FormText>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Authors</FormLabel>
                                <FormControl
                                    type='text'
                                    required
                                    placeholder='Enter author names...'
                                    value={authorNames}
                                    onChange={(e) => setAuthorNames(e.target.value)}></FormControl>
                                <FormText className='text-muted' >Comma seperated. ex: Brat William,John Doe,Scott Robinson</FormText>
                            </FormGroup>
                            <Button type='submit' block variant='outline-primary'>Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </FormContainer>
        </>
    )
}

export default AddPublicationsScreen