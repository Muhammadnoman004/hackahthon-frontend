import { BellFilled } from '@ant-design/icons'
import { Input, Select, Space, Table, Tag } from 'antd'
import React from 'react'
import { Container } from 'react-bootstrap'
import { IoSearchSharp } from 'react-icons/io5'

const columns = [
    {
        title: 'S/No',
        dataIndex: 'serialNo',
        key: 'serialNo',
        width: 50,
        render: (number) => <a>{number}</a>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
            <div>
                <div>{text}</div>
                <div style={{ marginTop: '10px', fontSize: '12px', color: 'gray' }}>{record.rollNum}</div>
            </div>
        )
    },
    {
        title: 'Batch',
        dataIndex: 'batch',
        key: 'batch',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Point',
        dataIndex: 'point',
        key: 'point',
        render: (number) => <a>{number}</a>,
    },
    {
        title: 'Grade',
        dataIndex: 'grade',
        key: 'grade',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Status',
        key: 'tags',
        dataIndex: 'tags',
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
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text) => <a>{text}</a>,
    },
    // Add more columns as needed
];

const dataSource = [
    {
        key: '1',
        serialNo: 1,
        name: 'M. Noman',
        rollNum: '101',
        batch: 'Batch-10',
        point: 90,
        grade: 'A+1',
        tags: ['submitted'],
        action: 'Preview'
    },
    {
        key: '2',
        serialNo: 2,
        name: 'Huzaifa Khan',
        rollNum: '102',
        point: 'N / A',
        batch: 'Batch-11',
        grade: 'N / A',
        tags: ['pending'],
        action: 'Preview'

    },
    {
        key: '3',
        serialNo: 3,
        name: 'Jamsheed Khan',
        rollNum: '103',
        point: 100,
        batch: 'Batch-12',
        grade: 'A+1',
        tags: ['submitted'],
        action: 'Preview'

    },
    {
        key: '4',
        serialNo: 4,
        name: 'Tayyab',
        rollNum: '104',
        point: 'N / A',
        batch: 'Batch-10',
        grade: 'N / A',
        tags: ['expired'],
        action: 'Preview'

    }
    // Add more data as needed
];

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
                <Table dataSource={dataSource} columns={columns} />

            </Container>
        </div>
    )
}