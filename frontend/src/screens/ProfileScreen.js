import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFacultyProfileByUserId } from '../actions/facultyActions'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'
const ProfileScreen = ({ match, history }) => {

    const dispatch = useDispatch()
    const { loading, error, profile } = useSelector(state => state.facultyProfile)
    const { userInfo } = useSelector(state => state.userLogin)

    let id
    id = match.params.userId ? match.params.userId : userInfo ? userInfo._id : null

    useEffect(() => {
        if (userInfo) {
            dispatch(getFacultyProfileByUserId(id))
        } else {
            history.push('/login')
        }
    }, [dispatch, id, match.params.userId])

    return (
        <div>
            <h1>Profile</h1>
            {loading && <Loader />}
            {error ? <Message variant='danger'>{error}</Message> : (
                !profile && userInfo && !userInfo.isAdmin ? (
                    <>
                        <p>You do not have a profile. Please request an admin to create your profile</p>
                    </>
                ) : !profile && userInfo && userInfo.isAdmin ? (
                    <LinkContainer to={`/profile/${id}/create-profile`}>
                        <Button variant='primary' > Create Profile</Button>
                    </LinkContainer>
                ) : (
                    <h2>This is your profile</h2>
                )
            )}

        </div>
    )
}

export default ProfileScreen