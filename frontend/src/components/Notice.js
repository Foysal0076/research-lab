import React, { useState } from 'react'
import { Badge, ListGroup, ListGroupItem, Modal, ModalBody, ModalTitle } from 'react-bootstrap'
import moment from 'moment'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

const Notice = ({ notices }) => {
    const [show, setShow] = useState(false)
    const [noticeIndex, setNoticeIndex] = useState(0)

    return (
        <div>
            <ListGroup>
                {notices.map((notice, index) => (
                    <ListGroupItem key={notice._id} action className='d-flex justify-content-between' onClick={() => {
                        setNoticeIndex(index)
                        setShow(true)
                    }}  >
                        <p className="m-0">{notice.title}{' '} {(new Date() - new Date(notice.createdAt)) / 1000 < 5 * 86400 && <Badge pill variant='danger'>New</Badge>}</p>
                        <span style={{ fontSize: '.8rem' }} >{moment(notice.createdAt).format("DD MMM, YY")} </span>
                    </ListGroupItem>
                ))}
            </ListGroup>
            {notices.length !== 0 && noticeIndex >= 0 &&
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    centered
                    keyboard={false}
                >
                    <ModalHeader closeButton>
                        <ModalTitle>{notices[noticeIndex].title}</ModalTitle>
                    </ModalHeader>
                    <ModalBody>{<p>{notices[noticeIndex].body}</p>}</ModalBody>
                </Modal>
            }
        </div>
    )
}

export default Notice