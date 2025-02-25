import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Card } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom'

function StudentDetail() {

    const navigate = useNavigate();

    return (
        <div className='ms-3'>
            <div className='max-w-3xl mx-auto px-3 mt-3 mb-3 '>
                <div className='rounded-lg shadow-md overflow-hidden border-2'>
                    <div className='px-3 py-4'>
                        <h1 className='text-2xl font-bold break-words'><ArrowLeftOutlined className='hover:bg-gray-300 p-2 rounded-full cursor-pointer' title='Back to Previous' onClick={() => navigate(-1)} /> Student Detail</h1>
                    </div>
                    <div className='px-3 py-5 pt-0'>
                        <div className='flex justify-between gap-4 px-3 flex-wrap'>
                            <div>
                                <p>Name:</p>
                                <h2 className='text-lg font-semibold capitalize'>Asad</h2>
                            </div>
                            <div>
                                <p>Student Email:</p>
                                <h2 className='text-lg font-semibold'>asad@gmail.com</h2>
                            </div>
                        </div>
                        <div className='border-2 my-6' />
                        <h2 className='text-lg font-semibold mb-3'>Enrolled Classes</h2>
                        <div className='flex flex-col gap-3'>
                            <Card style={{ body: { padding: "10px 15px" } }} className='hover:shadow-lg cursor-pointer hover:-translate-y-1 bg-sky-100'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='text-2xl font-bold'>A10 6 to 8</h1>
                                    <ArrowRightOutlined className='hover:bg-gray-300 p-2 rounded-full h-fit cursor-pointer' title='See Detail!' onClick={() => navigate(-1)} />
                                </div>
                                <div className='mt-1 flex justify-between'>
                                    <div className='flex-wrap gap-2'>
                                        <p>Trainer:</p>
                                        <p>Email:</p>
                                    </div>
                                    <div className='font-bold text-end flex-wrap gap-2'>
                                        <p>zain Khan 25</p>
                                        <p className='break-all'>zain@gmail.com</p>
                                    </div>
                                </div>
                            </Card>
                            <Card style={{ body: { padding: "10px 15px" } }} className='hover:shadow-lg cursor-pointer hover:-translate-y-1 bg-sky-100'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='text-2xl font-bold'>A10 6 to 8</h1>
                                    <ArrowRightOutlined className='hover:bg-gray-300 p-2 rounded-full h-fit cursor-pointer' title='See Detail!' onClick={() => navigate(-1)} />
                                </div>
                                <div className='mt-1 flex justify-between'>
                                    <div className='flex-wrap gap-2'>
                                        <p>Trainer:</p>
                                        <p>Email:</p>
                                    </div>
                                    <div className='font-bold text-end flex-wrap gap-2'>
                                        <p>zain Khan 25</p>
                                        <p className='break-all'>zain@gmail.com</p>
                                    </div>
                                </div>
                            </Card>

                            <h1 className='text-center'>Student is not enrolled in any class!</h1>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDetail