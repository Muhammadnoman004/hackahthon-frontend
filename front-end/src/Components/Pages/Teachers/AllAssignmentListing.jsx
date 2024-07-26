import { BellFilled } from '@ant-design/icons'
import { Button, Progress } from 'antd'
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

                <div className='mt-8'>

                    <div className='flex justify-between my-4'>
                        <div>
                            <h1 className='font-bold text-lg'>All Assignments</h1>
                            <p className='text-xs'>View and manage all assignments</p>
                        </div>
                        <div>
                            <button className='p-1 px-3 w-auto  bg-sky-blue text-white rounded-md border-none hover:bg-sky-400 focus:shadow-lg'>Create Assignment</button>
                        </div>
                    </div>

                    <div className='flex gap-4 flex-col'>

                        <div className='flex justify-between p-3 rounded-md bg-gray-200 shadow-xl font-bold'>
                            <div>
                                <h1>Name</h1>
                            </div>
                            <div><h1>Due Date</h1></div>
                            <div>
                                <h1>Status</h1>
                            </div>

                            <div>
                                <h1>Actions</h1>
                            </div>
                        </div>

                        <div className='flex justify-between p-3 rounded-md bg-gray-200 shadow-xl'>
                            <div>
                                <p className='font-serif'>Assignment 1</p>
                                <p className='text-xs font-mono text-sky-600'>description 1</p>
                            </div>
                            <div><p>25-08-2024</p></div>
                            <div>
                                <p>Pending</p>
                            </div>

                            <div>
                                <Button type='text' className='border-none'>
                                    View Overall Report
                                </Button>
                            </div>
                        </div>

                        <div className='flex justify-between p-3 rounded-md bg-gray-200 shadow-xl'>
                            <div>
                                <p className='font-serif'>Assignment 2</p>
                                <p className='text-xs font-mono text-sky-600'>descrption 2</p>
                            </div>
                            <div><p>27-08-2024</p></div>
                            <div>
                                <p>Expired</p>
                            </div>

                            <div>
                                <Button type='text' className='border-none'>
                                    View Overall Report
                                </Button>
                            </div>
                        </div>

                        <div className='flex justify-between p-3 rounded-md bg-gray-200 shadow-xl'>
                            <div>
                                <p className='font-serif'>Assignment 3</p>
                                <p className='text-xs font-mono text-sky-600'>descrption 3</p>
                            </div>
                            <div><p>30-08-2024</p></div>
                            <div>
                                <p>Submitted</p>
                            </div>

                            <div>
                                <Button type='text' className='border-none'>
                                    View Overall Report
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>


            </Container>
        </div>
    )
}