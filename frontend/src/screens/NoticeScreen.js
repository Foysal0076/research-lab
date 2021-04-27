import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalTitle, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getNotices } from '../actions/noticeActions'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'
import moment from 'moment'
import Linkify from 'react-linkify'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

const NoticeScreen = () => {
    const dispatch = useDispatch()
    const [noticeIndex, setNoticeIndex] = useState(0)
    const [show, setShow] = useState(false)

    const { loading, error, notices } = useSelector(state => state.notice)

    useEffect(() => {
        dispatch(getNotices())
    }, [dispatch])

    return (
        <>
            <h2>All Notice</h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>TITLE</th>
                                <th>DATE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {notices.map((notice, index) => (
                                <tr role="button" key={notice._id} onClick={() => {
                                    setNoticeIndex(index)
                                    setShow(true)
                                }} >
                                    <td>{index + 1}</td>
                                    <td>{notice.title}</td>
                                    <td>{moment(notice.createdAt).format('DD MMMM, YYYY')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {notices.length !== 0 && noticeIndex >= 0 &&
                        <Modal
                            show={show}
                            onHide={() => setShow(false)}
                            backDrop='static'
                            keyboard={false}>
                            <ModalHeader closeButton>
                                <ModalTitle>{notices[noticeIndex].title}</ModalTitle>
                            </ModalHeader>
                            <ModalBody>
                                <Linkify properties={{ target: '_blank', style: { color: 'red', fontWeight: 'bold' } }}>
                                    {<p>{notices[noticeIndex].body}</p>}
                                    {<p>{notices[noticeIndex].footnote}</p>}
                                </Linkify>
                            </ModalBody>

                        </Modal>
                    }
                </>
            )}
        </>
    )
}

export default NoticeScreen