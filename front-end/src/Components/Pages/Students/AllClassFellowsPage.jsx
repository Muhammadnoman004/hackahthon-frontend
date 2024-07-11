import { BellFilled } from '@ant-design/icons'
import React from 'react'
import { Container } from 'react-bootstrap'

export default function AllClassFellowsPage() {
    return (
        <div>
            <Container>
                <div className='flex m-4 text-2xl font-mono font-extrabold'>
                    <h1 className='flex-1'>Classmates</h1>
                    <BellFilled className='flex-2 text-amber-400' />
                </div>

                <div className='bg-stone-100 w-2/5 h-96 my-7 mx-8 p-3 rounded-lg border-solid border-2 border-sky-500'>
                    <h1 className='text-center text-2xl font-bold text-stone-500'>Students</h1>
                </div>
            </Container>
        </div>
    )
}
