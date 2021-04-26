import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPublications } from '../actions/publicationActions'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'
import PublicationsTable from '../components/PublicationsTable'


const PublicationScreen = () => {
    const dispatch = useDispatch()
    const { loading, error, publications } = useSelector(state => state.publicationList)

    useEffect(() => {
        dispatch(getPublications())
    }, [dispatch])
    return (
        <>
        {loading?(
            <Loader/>
        ):error?(
            <Message variant='danger'>{error}</Message>
        ):(
            <>
            <h1>Publications</h1>
            <PublicationsTable publications={publications} />
            </>
        )}
        </>

    )
}

export default PublicationScreen