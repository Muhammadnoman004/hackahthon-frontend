import React from 'react'
import { Container } from 'react-bootstrap'

export default function TeacherClassDetailPage() {
    return (
        <Container>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-2 mt-4'>
                <section>
                    <div className='bg-gray-100 rounded-lg p-2 mb-3'>
                        <h2 className='text-xl mb-3'>Class code</h2>
                        <div className='bg-white p-3 rounded-lg shadow mb-3'>
                            <p>U4vKeko</p>
                        </div>
                    </div>
                    <div className='bg-gray-100 rounded-lg p-2'>
                        <h2 className='text-xl mb-3'>Upcoming</h2>
                        <div className='bg-white p-3 rounded-lg shadow mb-3'>
                            <p>Woohoo, no work due soon!</p>
                        </div>
                    </div>
                </section>
            </div>
        </Container>
    )
}
