import React from 'react'
import { Container } from 'react-bootstrap'

export default function AllTeacherPage() {
    return (
        <div>
            <Container>
                <div className='flex justify-between m-4'>
                    <div>
                        <h1 className='font-bold text-xl'>All Teachers</h1>
                    </div>
                    <div>
                        <button className='p-1 px-3 w-auto  bg-sky-blue text-white rounded-md border-none hover:bg-sky-400 focus:shadow-lg'>Add Teacher</button>
                    </div>
                </div>
            </Container>
        </div>
    )
}
