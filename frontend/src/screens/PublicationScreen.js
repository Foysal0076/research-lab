import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, FormCheck, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getPublications } from '../actions/publicationActions'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'
import PublicationsTable from '../components/PublicationsTable'


const PublicationScreen = ({ history }) => {
    const dispatch = useDispatch()
    const [keyword, setKeyword] = useState('')
    const [filters, setFilters] = useState([])
    const [journalCheck, setJournalCheck] = useState(false)
    const [conferenceCheck, setConferenceCheck] = useState(false)
    const [bookCheck, setBookCheck] = useState(false)
    const [magazineCheck, setMagazineCheck] = useState(false)
    const [editorshipCheck, setEditorshipCheck] = useState(false)
    const [patentCheck, setPatentCheck] = useState(false)


    const { userInfo } = useSelector(state => state.userLogin)
    const { loading, error, publications } = useSelector(state => state.publicationList)

    useEffect(() => {
        dispatch(getPublications(keyword, filters))
    }, [dispatch, filters, keyword])

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setFilters([...filters, e.target.value])
        } else {
            setFilters(filters.filter((item) => item !== e.target.value))
        }
    }

    const onChangeHandler = ((e) => {
        setKeyword(e.target.value)
        // dispatch(getPublications(keyword))
    })

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(getPublications(keyword, filters))
    }

    return (
        <div>
            <Form className='py-4 w-100' onSubmit={onSubmitHandler}>
                <div className="d-flex mx-2">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text> <i style={{ color: '#008cba' }} className="fas fa-search"></i> </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type='text'
                            name='q'
                            onChange={onChangeHandler}
                            value={keyword}
                            placeholder='Search Publications...'
                        ></FormControl>
                    </InputGroup>
                    <Button type='submit' variant='outline-primary' className=''>Search</Button>
                </div>
            </Form>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <div className="d-flex py-2 justify-content-between">
                        <h2>Publications</h2>
                        {userInfo && userInfo.isAdmin && (
                            <Button
                                variant='outline-primary'
                                onClick={() => history.push('/admin/publications/add-publication')}
                            >
                                <i className="fas fa-plus"></i>
                                {' '}Add Publication
                            </Button>
                        )}
                    </div>
                    <Card className='py-2'>
                        <Card.Body className='p-2' >
                            <h4>Filter</h4>
                            <Row className='align-items-center'>
                                <Col className='col-auto'>
                                    <div className="d-flex flex-row">

                                        <FormCheck
                                            type='checkbox'
                                            value='Journal'
                                            label='Journal'
                                            onChange={(e) => {
                                                setJournalCheck(!journalCheck)
                                                handleCheckboxChange(e)
                                            }}
                                            checked={journalCheck}
                                            className='mr-2'
                                        ></FormCheck>

                                        <FormCheck
                                            type='checkbox'
                                            value='Conference Paper'
                                            label='Conference'
                                            onChange={(e) => {
                                                setConferenceCheck(!conferenceCheck)
                                                handleCheckboxChange(e)
                                            }}
                                            checked={conferenceCheck}
                                            className='mr-2'
                                        ></FormCheck>

                                        <FormCheck
                                            type='checkbox'
                                            value='Patent'
                                            label='Patent'
                                            onChange={(e) => {
                                                setPatentCheck(!patentCheck)
                                                handleCheckboxChange(e)
                                            }}
                                            checked={patentCheck}
                                            className='mr-2'
                                        ></FormCheck>
                                    </div>
                                </Col>

                                <Col className='col-auto'>
                                    <div className="d-flex flex-row">
                                        <FormCheck
                                            type='checkbox'
                                            value='Magazine'
                                            label='Magazine'
                                            onChange={(e) => {
                                                setMagazineCheck(!magazineCheck)
                                                handleCheckboxChange(e)
                                            }}
                                            checked={magazineCheck}
                                            className='mr-2'
                                        ></FormCheck>

                                        <FormCheck
                                            type='checkbox'
                                            value='Editorship'
                                            label='Editorship'
                                            onChange={(e) => {
                                                setEditorshipCheck(!editorshipCheck)
                                                handleCheckboxChange(e)
                                            }}
                                            checked={editorshipCheck}
                                            className='mr-2'
                                        ></FormCheck>

                                        <FormCheck
                                            type='checkbox'
                                            value='Book'
                                            label='Book'
                                            onChange={(e) => {
                                                setBookCheck(!bookCheck)
                                                handleCheckboxChange(e)
                                            }}
                                            checked={bookCheck}
                                            className='mr-2'
                                        ></FormCheck>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    { publications.length === 0 ? <h5>No Publication Found</h5> : (
                        <PublicationsTable publications={publications} />
                    )}
                </>
            )}
        </div>
    )
}

export default PublicationScreen