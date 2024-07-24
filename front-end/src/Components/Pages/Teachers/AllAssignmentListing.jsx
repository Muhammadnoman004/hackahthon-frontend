import { BellFilled } from '@ant-design/icons'
import React from 'react'
import { Container } from 'react-bootstrap'

export default function AllAssignmentListing() {
    return (
        <div>
            <Container>
                <div className='flex m-4 text-2xl font-mono font-extrabold'>
                    <h1 className='flex-1'>Assignments</h1>
                    <BellFilled className='flex-2 text-amber-400' />
                </div>
            </Container>
        </div>
    )
}