import React from 'react'
import { BellFilled } from '@ant-design/icons'
import { Container } from 'react-bootstrap'
import { Button, Input, Select, Space, } from 'antd'
import { IoSearchSharp } from "react-icons/io5";
import { Progress } from 'antd';


export default function TeacherStudentPage() {
    return (
        <div>
            <Container>
                <div className='flex m-4 text-2xl font-mono font-extrabold'>
                    <h1 className='flex-1'>Students</h1>
                    <BellFilled className='flex-2 text-amber-400' />
                </div>

                <div className='bg-sky-blue w-auto p-4 rounded-lg'>
                    <div className='flex justify-between mb-4'>

                        <div>
                            <Input size="large" placeholder="Search" prefix={<IoSearchSharp />} className='rounded-3xl w-96' />
                        </div>

                        <div className='flex gap-4'>
                            <Space.Compact>
                                <Select defaultValue="Saad 4-6 (WMA)">
                                    <Select.Option value="Saad 4-6 (WMA)">Saad 4-6 (WMA)</Select.Option>
                                    <Select.Option value="Raja 7-9 (TTS)">Raja 7-9 (TTS)</Select.Option>
                                    <Select.Option value="Noman 2-4 (Sunday)">Noman 2-4 (SUNDAY)</Select.Option>
                                </Select>
                            </Space.Compact>
                            <Space.Compact>
                                <Select defaultValue="Batch-10">
                                    <Select.Option value="Batch-10">Batch-10</Select.Option>
                                    <Select.Option value="Batch-11">Batch-11</Select.Option>
                                    <Select.Option value="Batch-12">Batch-12</Select.Option>
                                </Select>
                            </Space.Compact>

                        </div>
                    </div>

                    <div className='flex gap-4 flex-col'>

                        <div className='flex justify-between p-3 rounded-md bg-gray-200 shadow-xl'>
                            <div>
                                <p className='font-semibold font-serif'>Noman</p>
                                <p className='text-xs font-mono mx-2 text-sky-600'>128066</p>
                            </div>
                            <div>Batch-10</div>
                            <div>
                                <Progress
                                    percent={100}
                                    percentPosition={{
                                        align: 'center',
                                        type: 'inner',
                                    }}
                                    size={[300, 20]}
                                />
                            </div>

                            <div>
                                <Button type='text' className='border-none'>
                                    View Overall Report
                                </Button>
                            </div>
                        </div>

                        <div className='flex justify-between p-3 rounded-md bg-gray-200 shadow-xl'>
                            <div>
                                <p className='font-semibold font-serif'>Huzaifa</p>
                                <p className='text-xs font-mono mx-2 text-sky-600'>128066</p>
                            </div>
                            <div>Batch-10</div>
                            <div>
                                <Progress
                                    percent={50}
                                    percentPosition={{
                                        align: 'center',
                                        type: 'inner',
                                    }}
                                    size={[300, 20]}
                                    strokeColor="#DDD70C"
                                />
                            </div>

                            <div>
                                <Button type='text' className='border-none'>
                                    View Overall Report
                                </Button>
                            </div>
                        </div>

                        <div className='flex justify-between p-3 rounded-md bg-gray-200 shadow-xl'>
                            <div>
                                <p className='font-semibold font-serif'>Jamsheed</p>
                                <p className='text-xs font-mono mx-2 text-sky-600'>128066</p>
                            </div>
                            <div>Batch-10</div>
                            <div>
                                <Progress
                                    percent={30}
                                    percentPosition={{
                                        align: 'center',
                                        type: 'inner',
                                    }}
                                    size={[300, 20]}
                                />
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