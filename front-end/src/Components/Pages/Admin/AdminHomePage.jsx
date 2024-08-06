import React from 'react'
import { Space, Table } from 'antd';
import { Container } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';

const columns = [
    {
        title: 'S/No',
        dataIndex: 'serialNo',
        key: 'serialNo',
        width: '10%',
        render: (number) => <a>{number}</a>,
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Course Name',
        dataIndex: 'name',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        width: '20%',
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
        serialNo: '01',
        name: 'Web Development',
        age: 32,
    },
    {
        key: '2',
        serialNo: '02',
        name: 'Mobile App Development',
        age: 42,
    },
    {
        key: '3',
        serialNo: '03',
        name: 'Python',
        age: 32,
    },
    {
        key: '4',
        serialNo: '04',
        name: 'Graphic Designing',
        age: 32,
    },
];

export default function AdminHomePage() {
    return (
        <div>
            <Container>
                <div className='m-4 text-2xl font-mono font-extrabold'>
                    <h1>Admin Dashboard</h1>
                </div>

                <div className='flex justify-between m-4'>
                    <div>
                        <h1 className='font-bold text-xl'>All Courses</h1>
                    </div>
                    <div>
                        <button className='p-1 px-3 w-auto  bg-sky-blue text-white rounded-md border-none hover:bg-sky-400 focus:shadow-lg'>Add Course</button>
                    </div>
                </div>
                <Table columns={columns} dataSource={data} />
            </Container>
        </div >
    )
}