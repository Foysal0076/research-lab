import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, FormLabel, Modal, ModalBody, ModalTitle, Table, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createNotice, deleteNotice, editNotice, getNotices } from '../actions/noticeActions'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'
import moment from 'moment'
import Linkify from 'react-linkify'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

const NoticeScreen = () => {
    const dispatch = useDispatch()
    const [noticeIndex, setNoticeIndex] = useState(0)
    const [editNoticeId, setEditNoticeId] = useState(null)
    const [editNoticeIndex, setEditNoticeIndex] = useState(0)
    const [edit, setEdit] = useState(false)
    const [show, setShow] = useState(false)
    const [showEditNoticeModal, setShowEditNoticeModal] = useState(false)

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [footnote, setFootnote] = useState('')

    const { userInfo } = useSelector(state => state.userLogin)

    const { loading, error, notices } = useSelector(state => state.notice)
    const { error: createError, success: createSuccess } = useSelector(state => state.noticeCreate)
    const { error: editError, success: editSuccess } = useSelector(state => state.noticeEdit)
    const { error: deleteError, success: deleteSuccess } = useSelector(state => state.noticeDelete)

    useEffect(() => {
        dispatch(getNotices())
        if (createSuccess || editSuccess) {
            setShow(false)
            setShowEditNoticeModal(false)
        }
    }, [dispatch, createSuccess, editSuccess, deleteSuccess])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (edit) {
            dispatch(editNotice(editNoticeId, title, body, footnote))
        } else {
            dispatch(createNotice(title, body, footnote))
        }
    }

    const onDeleteClickHandler = (id) => {
        if (window.confirm('Are you sure? Delete action is irreversible ')) {
            dispatch(deleteNotice(id))
        }
    }

    return (
        <>
            <div className="d-flex flex-row justify-content-between py-2 ">
                <h2>All Notice</h2>
                {userInfo && userInfo.isAdmin &&
                    <Button
                        variant='outline-primary'
                        onClick={() => setShowEditNoticeModal(true)}
                    >
                        <i className="fas fa-plus"></i>  Add Notice
                    </Button>
                }
            </div>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    {createError && <Message variant='danger'>{createError}</Message>}
                    {editError && <Message variant='danger'>{editError}</Message>}
                    {deleteError && <Message variant='danger'>{deleteError}</Message>}
                    <Table striped bordered hover responsive className='table-sm '>
                        <thead className='table-dark'>
                            <tr>
                                <th>#</th>
                                <th>TITLE</th>
                                <th>DATE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {notices.map((notice, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td
                                        role="button" key={notice._id} onClick={() => {
                                            setEdit(false)
                                            setNoticeIndex(index)
                                            setShow(true)
                                        }}
                                    >{notice.title}</td>
                                    <td>{moment(notice.createdAt).format('DD MMMM, YYYY')}</td>
                                    <td>
                                        {userInfo && userInfo.isAdmin &&
                                            <>
                                                <Button
                                                    onClick={() => {
                                                        setEdit(true)
                                                        setEditNoticeId(notice._id)
                                                        setEditNoticeIndex(index)
                                                        setTitle(notice.title)
                                                        setBody(notice.body)
                                                        setFootnote(notice.footnote)
                                                        setShowEditNoticeModal(true)
                                                    }}
                                                    variant='light'
                                                    className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                                <Button
                                                    onClick={() => onDeleteClickHandler(notice._id)}
                                                    variant='danger'
                                                    className='btn-sm'>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {notices.length !== 0 && noticeIndex >= 0 &&
                        <Modal
                            show={show}
                            onHide={() => {
                                setTitle('')
                                setBody('')
                                setFootnote('')
                                setShow(false)
                            }}
                            keyboard={false}>
                            <ModalHeader closeButton>
                                <ModalTitle className='text-white' >{notices[noticeIndex].title}</ModalTitle>
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
            {editNoticeIndex >= 0 &&
                <Modal
                    show={showEditNoticeModal}
                    onHide={() => {
                        setTitle('')
                        setBody('')
                        setFootnote('')
                        setShowEditNoticeModal(false)
                    }}
                    keyboard={false}>
                    <ModalHeader closeButton>
                        <ModalTitle>
                            {edit ? 'Edit Notice' : 'Add Notice'}
                        </ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={onSubmitHandler} >
                            <FormGroup>
                                <FormLabel>Title</FormLabel>
                                <FormControl
                                    type='text'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                ></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Body</FormLabel>
                                <FormControl
                                    as='textarea'
                                    rows={12}
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    required
                                ></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Footnote</FormLabel>
                                <FormControl
                                    type='text'
                                    value={footnote}
                                    onChange={(e) => setFootnote(e.target.value)}
                                ></FormControl>
                            </FormGroup>
                            <Button
                                type='submit'
                                variant='outline-primary'
                                block
                            >Publish Notice</Button>
                        </Form>

                    </ModalBody>
                </Modal>
            }
        </>
    )
}

export default NoticeScreen