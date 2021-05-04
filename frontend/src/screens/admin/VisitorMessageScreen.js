import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalTitle, Table } from 'react-bootstrap'
import Loader from '../../components/layout/Loader'
import Message from '../../components/layout/Message'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { deleteVisitorMessage, getVisitorMessages } from '../../actions/visitorMessageActions'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

const VisitorMessageScreen = ({ history }) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [messageIndex, setmessageIndex] = useState(0)

    const { userInfo } = useSelector(state => state.userLogin)
    const { loading, error, messages: { messages } } = useSelector(state => state.visitorMessageList)

    const { error: deleteError, success: deleteSuccess } = useSelector(state => state.visitorMessageDelete)
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getVisitorMessages())
        } else {
            history.push('/login')
        }
    }, [dispatch, userInfo, deleteSuccess, history])

    const onDeleteClickHandler = (id) => {
        if (window.confirm('Are You sure? Delete action is irreversible'))
            dispatch(deleteVisitorMessage(id))
    }

    return (
        <>
            <h1>Messages</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    {deleteError && <Message variant='danger'>{deleteError}</Message>}
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead className='table-dark'>
                            <tr>
                                <th>#</th>
                                <th>EMAIL</th>
                                <th>NAME</th>
                                <th>MESSAGE</th>
                                <th>DATE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages && messages.length !== 0 && messages.map((message, index) => (
                                <tr key={message._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <a href={`mailto:${message.email}`}>{message.email}</a>
                                    </td>
                                    <td>{message.name}</td>
                                    <td
                                        role='button' onClick={() => {
                                            setmessageIndex(index)
                                            setShow(true)
                                        }}
                                    >{message.message.length > 50 ? `${message.message.substring(0, 50)}...` : message.message}</td>
                                    <td>{moment(message.createdAt).format('DD-MM-YY')}</td>
                                    <td>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => onDeleteClickHandler(message._id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
            {messages && messages.length !== 0 && messageIndex >= 0 &&
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    keyboard={false}
                >
                    <ModalHeader closeButton className='bg-primary' >
                        <ModalTitle>From:{' '}{messages[messageIndex].email}</ModalTitle>
                    </ModalHeader>
                    <ModalBody>{<p>{messages[messageIndex].message}</p>}</ModalBody>
                </Modal>
            }
        </>
    )
}

export default VisitorMessageScreen