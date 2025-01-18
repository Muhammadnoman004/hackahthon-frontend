import { Alert, Spin } from 'antd'
import React from 'react'
import { Container } from 'react-bootstrap'
import { FaArrowLeft } from 'react-icons/fa6'

export default function AssignmentDetailPage() {
    return (
        <Container>
            <div>
                <div className='flex justify-center items-center h-screen'>
                    <Spin size='large' />
                </div>

                <div className='p-4'>
                    <Alert message="Error" description={'error'} type='error' showIcon />
                </div>

                <div className='p-4'>
                    <Alert message="Assignment not found" description={'The requested assignment could not be found.'} type='warning' showIcon />
                </div>


                <div>
                    <header className='bg-teal-600 text-white p-4 rounded-lg mb-4'>
                        <h1 className='text-2xl font-semibold flex items-center gap-3'>
                            <button className='border-2 p-2 text-xl rounded-full hover:border-sky-blue transition-all'>
                                <FaArrowLeft />
                            </button>
                            Make a Restaurant Landing Page
                        </h1>
                        <p className='text-sm ml-14'>Make sure the landing page is responsive and good looking</p>
                    </header>
                </div>

            </div>
        </Container>
    )
}
