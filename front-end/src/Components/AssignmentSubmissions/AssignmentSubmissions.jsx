import { CheckCircleOutlined, CheckCircleTwoTone, FileOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Progress, Tabs, Tooltip } from 'antd'
import React from 'react'
import { Container } from 'react-bootstrap'
import { FaArrowLeft } from 'react-icons/fa6'

export default function AssignmentSubmissions() {

    const renderStudentCard = () => {
        <Card
            key={1}
            className='w-full mb-4 hover:shadow-lg transition-shadow duration-300 p-0 h-fit'
            styles={{ body: { padding: "20px 10px", width: "100%", display: "flex", flexWrap: "wrap", gap: "10px" } }}
            actions={
                <Tooltip title="Evaluate">
                    <Button type='primary' icon={<CheckCircleOutlined />}>
                        Evaluate
                    </Button>
                </Tooltip>
            }
        >

            <Card.Meta
                avatar={<UserOutlined className='text-2xl' />}
                title={"sheraz"}
                description={"sheraz@gmail.com"}
                className='flex items-center'
            />

            <div className='mt-4'>
                <p className='text-sm text-gray-500'>Submitted: {new Date().toLocaleDateString()}</p>
                <p className='mt-2'>description</p>
                <a
                    href="#"
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 hover:underline mt-2 inline-flex items-center'
                >
                    <FileOutlined className='mr-1' /> View Submitted File
                </a>

                <div className='mt-4'>
                    Obtained marks: 10
                    <p className='text-sm mt-2'>rating</p>
                    <p className='text-sm mt-1'>remarks</p>
                </div>

            </div>

        </Card>
    }

    const tabItems = [
        {
            label: (
                <span><CheckCircleTwoTone className='pe-1' />
                    Submitted 2
                </span>
            ),
            key: '1',
            children:
                // (
                //     <p className='text-center text-gray-500 py-4'>No submissions yet.</p>
                // )
                (
                    <div className='!block sm:!grid sm:gap-3 sm:grid-cols-2 md:grid-cols-3'>
                        <renderStudentCard />
                    </div>
                )
        },
        {
            label: (
                <span><CheckCircleTwoTone className='pe-1' />
                    Not Submitted 8
                </span>
            ),
            key: '2',
            children:
                // (
                //     <p className='text-center text-gray-500 py-4'>All students have submitted.</p>
                // )
                (
                    <div className='!block sm:!grid sm:gap-3 sm:grid-cols-2 md:grid-cols-3'>
                        <renderStudentCard />
                    </div>
                )
        }
    ]

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


                    <Tabs defaultActiveKey='1' type='card'
                        className='bg-gray-100 p-4 rounded-lg shadow-md w-full'
                        items={tabItems}
                    />

                </div>

            </div>
        </Container>
    )
}
