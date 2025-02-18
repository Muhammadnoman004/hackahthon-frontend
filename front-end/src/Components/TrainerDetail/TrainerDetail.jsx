import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'

function TrainerDetail() {
    return (
        <div className='ms-3'>
            <div className='max-w-3xl mx-auto px-3 mt-3 mb-3 '>
                <div className='rounded-lg shadow-md overflow-hidden border-2'>
                    <div className='px-3 py-4'>
                        <h1 className='text-2xl font-bold break-words'><ArrowLeftOutlined className='hover:bg-gray-300 p-2 rounded-full cursor-pointer' title='Back to Previous' /> Trainer Detail</h1>
                    </div>
                    <div className='px-3 py-5 pt-0'>
                        <div className='flex justify-between gap-4 px-3 flex-wrap'>
                            <div>
                                <p>Name:</p>
                                <h2 className='text-lg font-semibold capitalize'>Zain Khan</h2>
                            </div>
                            <div>
                                <p>Trainer Email:</p>
                                <h2 className='text-lg font-semibold'>zain@gmail.com</h2>
                            </div>
                        </div>
                        <div className='border-2 my-6' />
                        <h2 className='text-lg font-semibold mb-3'>Enrolled Classes</h2>
                        <div className='flex flex-col gap-3'>
                            <Card style={{ body: { padding: "10px 15px" } }} className='hover:shadow-lg cursor-pointer hover:-translate-y-1 bg-sky-100'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='text-2xl font-bold'>B11 4 to 6 <span className='font-light text-md'>(fdmQVDY)</span></h1>
                                    <ArrowRightOutlined className='hover:bg-gray-300 p-2 rounded-full h-fit cursor-pointer' title='See Detail!' />
                                </div>
                                <div className='mt-1 text-lg'>
                                    <p>Saylani B11 4 to 6</p>
                                    <p>No. of students: 4</p>
                                </div>
                            </Card>
                            <Card style={{ body: { padding: "10px 15px" } }} className='hover:shadow-lg cursor-pointer hover:-translate-y-1 bg-sky-100'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='text-2xl font-bold'>B11 4 to 6 <span className='font-light text-md'>(fdmQVDY)</span></h1>
                                    <ArrowRightOutlined className='hover:bg-gray-300 p-2 rounded-full h-fit cursor-pointer' title='See Detail!' />
                                </div>
                                <div className='mt-1 text-lg'>
                                    <p>Saylani B11 4 to 6</p>
                                    <p>No. of students: 4</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrainerDetail