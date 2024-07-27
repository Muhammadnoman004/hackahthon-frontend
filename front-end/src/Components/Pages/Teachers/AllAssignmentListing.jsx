import { BellFilled } from '@ant-design/icons'
import { Space, Table, Tag } from 'antd'
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import React from 'react'
import { Container } from 'react-bootstrap'

const columns = [
    {
        title: 'S/No',
        dataIndex: 'serialNo',
        key: 'serialNo',
        width: 100,
        render: (number) => <a>{number}</a>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Topic',
        dataIndex: 'topic',
        key: 'address',
    },
    {
        title: 'Due date',
        dataIndex: 'date',
        key: 'date',
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
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a className='text-xl hover:text-green-500'><FaEdit /></a>
                <a className='text-xl hover:text-red-500'><FaDeleteLeft /></a>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        serialNo: 1,
        name: 'Assignment',
        date: '10-05-24',
        topic: 'Html , Css',
        tags: ['submitted'],
    },
    {
        key: '2',
        serialNo: 2,
        name: 'Assignment',
        date: '12-05-24',
        topic: 'JavaScript , React JS',
        tags: ['expired'],
    },
    {
        key: '3',
        serialNo: 3,
        name: 'Assignment',
        date: '14-05-24',
        topic: 'Express JS , MongoDB',
        tags: ['pending'],
    },
    {
        key: '4',
        serialNo: 4,
        name: 'Assignment',
        date: '16-05-24',
        topic: 'Node JS',
        tags: ['submitted'],
    },
];

export default function AllAssignmentListing() {
    return (
        <div>
            <Container>
                <div className='flex m-4 text-2xl font-mono font-extrabold'>
                    <h1 className='flex-1'>Assignments</h1>
                    <BellFilled className='flex-2 text-amber-400' />
                </div>

                <div className='mt-8'>

                    <div className='flex justify-between m-4'>
                        <div>
                            <h1 className='font-bold text-lg'>All Assignments</h1>
                            <p className='text-xs'>View and manage all assignments</p>
                        </div>
                        <div>
                            <button className='p-1 px-3 w-auto  bg-sky-blue text-white rounded-md border-none hover:bg-sky-400 focus:shadow-lg'>Create Assignment</button>
                        </div>
                    </div>

                    <Table columns={columns} dataSource={data} />
                </div>

            </Container>
        </div>
    )
}