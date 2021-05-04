import React, { useState, useEffect } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/layout/FormContainer'
import Message from '../../components/layout/Message'
import Loader from '../../components/layout/Loader'
import { createUser } from '../../actions/userActions'


const CreateUserScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const { loading, error, success, newUser } = useSelector((state) => state.userCreate)

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            password.length < 5
                ? setMessage('Password must be at least 6 characters')
                : dispatch(createUser(name, email, password))
        }
    }

    useEffect(() => {
        success && newUser && history.push(`/admin/users/profiles/${newUser._id}`)
    }, [success, newUser, history])

    return (
        <div >
            <Button
                variant='outline-primary'
                className='my-2'
                onClick={() => history.push('/admin/users')}
            > <i className="fas fa-arrow-left"></i> Go Back</Button>
            {loading ? <Loader /> : (
                <FormContainer>
                    <Card className='bg-light shadow' >
                        <Card.Body>
                            <h1 className='text-center' >Create User</h1>
                            {message && <Message variant='danger'>{message}</Message>}
                            {error && <Message variant='danger'>{error}</Message>}
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter name'
                                        value={name}
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter email'
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Enter password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='confirmPassword'>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Confirm password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Button type='submit' variant='primary' block>
                                    Create User
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </FormContainer>
            )}
        </div>
    )
}

export default CreateUserScreen
