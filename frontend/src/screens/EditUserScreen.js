import React, { useEffect, useState } from 'react'
import { Button, Form, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { USER_EDIT_INFO_RESET } from '../actions/types'
import { editUserInfo, getUserInfo } from '../actions/userActions'
import FormContainer from '../components/layout/FormContainer'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'


const EditUserScreen = ({ match, history }) => {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [message, setMessage] = useState(null)

    const { userInfo } = useSelector(state => state.userLogin)
    const userId = match.params.id || userInfo._id
    const { loading, error, user } = useSelector(state => state.userInfo)
    const { loading: editLoading, error: editError, success: editSuccess } = useSelector(state => state.userEdit)


    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(editUserInfo(userId, name, email, isAdmin, password))
        }
    }

    useEffect(() => {
        if (editSuccess) {
            history.push('/admin/users')
            dispatch({ type: USER_EDIT_INFO_RESET })
        } else {
            if (!user || user._id !== userId) {
                dispatch(getUserInfo(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, history, userId, editSuccess, user])


    return (
        <FormContainer>
            <h1>Edit User Info</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {/* {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />} */}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
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
                {userInfo && userInfo.isAdmin && (
                    <FormCheck
                        className='mb-4'
                        type='checkbox'
                        label='Admin'
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    ></FormCheck>
                )}

                <Button type='submit' variant='outline-primary' block>
                    Submit
                </Button>
            </Form>
        </FormContainer>
    )
}

export default EditUserScreen