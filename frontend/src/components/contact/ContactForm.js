import React, { useState } from 'react'
import { Form, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap'

const ContactForm = () => {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [message, setMessage] = useState()


  return (
    <div className='py-4'>
      <h4>Leave a message</h4>
      <Form>
        <div className='d-flex flex-row justify-content-center m-0 d-block' >

          <FormGroup className='col-md-6 pl-0'>
            <FormLabel>Full Name</FormLabel>
            <FormControl
              type='text'
              placeholder='Enter name'
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></FormControl>
          </FormGroup>

          <FormGroup className=' col-md-6 px-0'>
            <FormLabel>Email</FormLabel>
            <FormControl
              type='email'
              placeholder='Enter name'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></FormControl>
          </FormGroup>
        </div>

        <FormGroup>
          <FormLabel>Leave a message</FormLabel>
          <FormControl
            as='textarea'
            placeholder='Write your message here...'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></FormControl>
        </FormGroup>
        <Button type='submit' className='w-100' >Submit</Button>
      </Form>
    </div>
  )
}

export default ContactForm