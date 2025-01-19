import { Card, Progress, Tooltip } from 'antd'
import React from 'react'
import { Container } from 'react-bootstrap'
import { FaArrowLeft } from 'react-icons/fa6'

export default function AssignmentSubmissions() {
    return (
        <Container>
            <div className='pt-3'>
                <div className=''>
                    <h1 className='text-3xl font-bold mb-8 flex items-center gap-4'>
                        <button className='p-2 hover:bg-gray-300 bg-gray-100 rounded-full transition-all '
                            title='Back to previous page'
                        >
                            <FaArrowLeft />
                        </button>
                        Assignment Submissions
                    </h1>

                    <Card className='mb-8 bg-gray-100 shadow-md'>
                        <div className='flex justify-between items-center flex-wrap gap-3'>
                            <div>
                                <h2 className='text-xl font-semibold mb-4 break-words'>Submission Overview</h2>
                                <p>Total Students: 10</p>
                                <p>Submissions: 1</p>
                                <p>Remaining: 9</p>
                            </div>
                            <div className='w-full sm:w-auto flex justify-center'>
                                <Tooltip title={'submitted'}>
                                    <Progress
                                        type='circle'
                                        percent={20}
                                        size={120}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    </Card>

                </div>

            </div>
        </Container>
    )
}
