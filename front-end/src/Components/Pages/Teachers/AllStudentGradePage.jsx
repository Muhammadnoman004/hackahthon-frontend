import { BellFilled } from '@ant-design/icons'
import { Input, Select, Space } from 'antd'
import React from 'react'
import { Container } from 'react-bootstrap'
import { IoSearchSharp } from 'react-icons/io5'

export default function AllStudentGradePage() {
    return (
        <div>
            <Container>
                <div className='flex m-4 text-2xl font-mono font-extrabold'>
                    <h1 className='flex-1'>Grade</h1>
                    <BellFilled className='flex-2 text-amber-400' />
                </div>

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
            </Container>
        </div>
    )
}