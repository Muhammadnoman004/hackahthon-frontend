import React from 'react'
import { BellFilled } from '@ant-design/icons'
import { Container } from 'react-bootstrap'
import { Input, Select, Space, Table, Tag } from 'antd'
import { IoSearchSharp } from "react-icons/io5";

const columns = [
    {
        title: 'Serial No.',
        dataIndex: 'serialNo',
        key: 'serialNo',
        width: 100
    },
    {
        title: 'Topic',
        dataIndex: 'topic',
        key: 'topic',
        width: 250
    },
    {
        title: 'Issues Date',
        dataIndex: 'issueDate',
        key: 'issueDate',
        width: 150,
    },
    {
        title: 'Due Date',
        dataIndex: 'expireDate',
        key: 'expireDate',
        width: 150,
    },
    {
        title: 'Status',
        key: 'tags',
        dataIndex: 'tags',
        width: 100,
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'expired') {
                        color = 'volcano';
                    }
                    if (tag === 'submitted') {
                        color = 'geekblue'
                    }
                    if (tag === 'pending') {
                        color = 'green'
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
];

const data = [
    {
        key: '1',
        serialNo: '01',
        issueDate: '02-06-24',
        expireDate: '10-08-24',
        topic: 'HTML',
        tags: ['submitted'],

    },
    {
        key: '2',
        serialNo: '02',
        issueDate: '04-06-24',
        expireDate: '12-08-24',
        topic: 'CSS',
        tags: ['expired'],

    },
    {
        key: '3',
        serialNo: '03',
        issueDate: '06-06-24',
        expireDate: '14-08-24',
        topic: 'JavaScript',
        tags: ['pending'],

    },
    {
        key: '4',
        serialNo: '04',
        issueDate: '08-06-24',
        expireDate: '16-08-24',
        topic: 'React JS',
        tags: ['submitted'],

    },
];


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

                    <div>
                        <Table
                            columns={columns}
                            dataSource={data}
                            bordered={false} // Set bordered to false to remove borders
                            pagination={false} // Remove pagination
                        />
                    </div>
                </div>

            </Container>
        </div>
    )
}