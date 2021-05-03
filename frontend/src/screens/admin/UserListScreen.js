import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/layout/Loader'
import Message from '../../components/layout/Message'
import { listUsers } from '../../actions/userActions'
import { USER_CREATE_RESET } from '../../actions/types'

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const { loading, error, users } = useSelector((state) => state.userList)
    const { success: createUserSuccess } = useSelector((state) => state.userCreate)

    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch({ type: USER_CREATE_RESET })
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, createUserSuccess])

    return (
        <>
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
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length !== 0 && users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </td>
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
