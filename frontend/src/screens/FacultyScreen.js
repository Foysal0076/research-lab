import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, Row } from 'react-bootstrap'
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
    dispatch(getFacultyList(keyword))
  }, [dispatch])

  const onSearchChangeHandler = ((e) => {
    setKeyword(e.target.value)
    // dispatch(getFacultyList(keyword))
  })
  const searchClickHandler = ((e) => {
    e.preventDefault()
    dispatch(getFacultyList(keyword))
  })

  return (
    <div>
      <Form className='py-4 w-100' onSubmit={searchClickHandler} >
        <div className="d-flex mx-2">
          <FormControl
            type='text'
            name='q'
            onChange={onSearchChangeHandler}
            value={keyword}
            placeholder='Search Faculty Members...'
          ></FormControl>
          <Button type='submit' variant='outline-success'>Search</Button>
        </div>
      </Form>
      <h2>Faculty</h2>
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