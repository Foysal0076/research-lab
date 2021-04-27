import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import HomeCarousel from '../components/layout/HomeCarousel'
import { useDispatch, useSelector } from 'react-redux'
import Notice from '../components/Notice'
import { getNotices } from '../actions/noticeActions'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'
import { Link } from 'react-router-dom'

const HomeScreen = () => {

    const dispatch = useDispatch()

    const { loading, error, notices } = useSelector(state => state.notice)

    useEffect(() => {
        dispatch(getNotices())
    }, [dispatch])

    return (
        <>
            <HomeCarousel />
            <Row className='py-4' >
                <Col md={8}>
                    <h1>About</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem culpa ab obcaecati, veritatis in, fuga quibusdam odio ut consequuntur eaque provident, porro modi id et molestias! Eius vel iure sed consequatur voluptate tenetur debitis minima, reprehenderit asperiores voluptates? Porro fugiat obcaecati quia modi quasi veritatis deserunt id illum eligendi aliquam ut iste cumque neque iusto fugit eius reiciendis aperiam, unde eaque rerum nam corporis ad. Enim, totam corrupti, quasi itaque, fuga atque perferendis accusamus nostrum cum magni hic architecto consectetur eveniet? Molestias excepturi placeat repudiandae voluptates quasi, numquam cum maiores? Tempora recusandae sapiente sint asperiores ea. Quo cumque similique molestias!</p>
                </Col>
                <Col md={4}>
                    <h2>Notice Board</h2>
                    {loading
                        ? <Loader />
                        : error ? (
                            <Message variant='danger' >{error}</Message>
                        ) : (
                            <Notice notices={notices} />
                        )}
                    <Link to='/noticeboard' >See all notice</Link>

                </Col>
            </Row>
        </>
    )
}

export default HomeScreen