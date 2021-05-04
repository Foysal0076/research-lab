import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, InputGroup, FormControl, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/layout/Loader'
import Message from '../../components/layout/Message'
import { listUsers } from '../../actions/userActions'
import moment from 'moment'

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()
    const [keyword, setKeyword] = useState('')

    const { loading, error, users } = useSelector((state) => state.userList)

    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    const onChangeHandler = ((e) => {
        setKeyword(e.target.value)
        // dispatch(listUsers(keyword))
    })

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(listUsers(keyword))
    }

    return (
        <>
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
                            placeholder='Search Users...'
                        ></FormControl>
                    </InputGroup>
                    <Button type='submit' variant='outline-primary' className=''>Search</Button>
                </div>
            </Form>
            <div className="d-flex py-2 justify-content-between">
                <h1>Users</h1>
                <Button
                    variant='outline-primary'
                    onClick={() => history.push('/admin/users/create-user')}>
                    <i className="fas fa-user-plus"></i> Create User
            </Button>
            </div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead className='table-dark'>
                        <tr>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>DATE</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length !== 0 && users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </td>
                                <td> {moment(user.createdAt).format('DD-MM-YY')} </td>
                                <td>
                                    {user.isAdmin ? (
                                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                                    ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/users/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => history.push(`/admin/users/profiles/${user._id}`)}
                                    >
                                        <i className='fas fa-user'></i>
                                    </Button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserListScreen
