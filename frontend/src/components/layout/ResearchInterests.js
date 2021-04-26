import React from 'react'
import { ListGroupItem } from 'react-bootstrap'

const ResearchInterestList = ({ id, researchInterests }) => {

    return (
        <div className='list-group ' >
            { researchInterests && researchInterests.length !== 0 && researchInterests.map((interest, index) => {
                return (
                    <ListGroupItem key={index}>{interest}</ListGroupItem>
                )
            })}
        </div>
    )
}

export default ResearchInterestList