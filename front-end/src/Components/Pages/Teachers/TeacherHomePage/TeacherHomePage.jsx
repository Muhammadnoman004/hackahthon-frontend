import React from 'react'
import { BellFilled } from '@ant-design/icons'
import { Container } from 'react-bootstrap'

export default function TeacherHomePage() {
    return (
        <div>
            <Container>
                <div className='flex m-4 text-2xl font-mono font-extrabold'>
                    <h1 className='flex-1'>Trainer Dashboard</h1>
                    <BellFilled className='flex-2 text-amber-400' />
                </div>
                <div className='m-4 text-2xl font-serif font-semibold'>
                    <h1>Welcome Noman,</h1>
                </div>
            </Container>
        </div>
    )
}