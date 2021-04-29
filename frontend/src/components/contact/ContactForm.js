import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormGroup, FormControl, FormLabel, Button, Modal, ModalTitle, ModalBody } from 'react-bootstrap'
import { sendVisitorMessage } from '../../actions/visitorMessageActions'
import { VISITOR_MESSAGE_SEND_RESET } from '../../actions/types'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import * as yup from 'yup'

const ContactForm = () => {

    const schema = yup.object().shape({
        email: yup.string().required('Email is required').email('Not a valid email'),
        message: yup.string().required('Write somthing here').min(5)
    })

    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [showModal, setShowModal] = useState(false)

    const [validated, setValidated] = useState(false)

    const { loading, error, success } = useSelector(state => state.visitorMessageSend)

    useEffect(() => {
        if (success) {
            setShowModal(true)
            setName('')
            setEmail('')
            setMessage('')
            dispatch({ type: VISITOR_MESSAGE_SEND_RESET })
        }
    }, [dispatch, success, error])

    const onSubmitHandler = (e) => {
        dispatch(sendVisitorMessage(name, email, message))
    }

    return (
        <div className='py-4'>
            <h4>Leave a message</h4>
            {loading && <loader />}
            {error && <Message variant='danger'>{error}</Message>}
            <Form noValidate validated={validated} onSubmit={onSubmitHandler} >
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
                            placeholder='Enter email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
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
                        required
                    ></FormControl>
                </FormGroup>
                <Button type='submit' className='w-100' >Submit</Button>
            </Form>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                keyboard={false}>
                <ModalHeader className='bg-success' closeButton></ModalHeader>
                <ModalBody className='text-center' >
                    <h1>Thank You!</h1>
                    <p>Your submission is received</p>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ContactForm