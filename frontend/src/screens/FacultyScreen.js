import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getFacultyList } from '../actions/facultyActions'
import Faculty from '../components/Faculty'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'


const FacultyScreen = () => {
    const dispatch = useDispatch()
    const [keyword, setKeyword] = useState('')

    const { loading, error, faculty } = useSelector(state => state.facultyList)

    useEffect(() => {
        dispatch(getFacultyList())
    }, [dispatch])

    return (
        <div>
            <Form className='py-4 w-100' >
                <div className="d-flex mx-2">
                    <FormControl
                        type='text'
                        name='q'
                        onChange={(e) => setKeyword(e.target.value)}
                        value={keyword}
                        placeholder='Search Faculty Members...'
                        ></FormControl>
                    <Button type='submit' variant='outline-success' className=''>Search</Button>
                </div>
            </Form>
            <h1 className='display-6' >Faculty</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div className="row row-cols-md-4 row-cols-lg-5">
                    {faculty.map((member, index) => (
                        <div className="col" key={index}>
                            <Faculty member={member} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FacultyScreen