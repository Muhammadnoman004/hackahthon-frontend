import React from 'react'
import { Container } from 'react-bootstrap'
import { Space, Table } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';

const columns = [
    {
        title: 'S/No',
        dataIndex: 'serialNo',
        key: 'serialNo',
        width: '10%',
        render: (number) => <a>{number}</a>,
        sorter: (a, b) => a.serialNo - b.serialNo,
    },
    {
        title: 'Teacher Name',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Action',
        dataIndex: 'action',
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
        name: 'Jamsheed',
        email: 'Jamsheed@gmail.com',
    },
    {
        key: '2',
        serialNo: '02',
        name: 'Huzaifa',
        email: 'Huzaifa@gmail.com',
    },
    {
        key: '3',
        serialNo: '03',
        name: 'Basit',
        email: 'Basit@gmail.com',
    },
    {
        key: '4',
        serialNo: '04',
        name: 'Tayyab',
        email: 'Tayyab@gmail.com',
    },
];


export default function AllTeacherPage() {
    return (
        <div>
            <Container>
                <div className='flex justify-between m-4'>
                    <div>
                        <h1 className='font-bold text-xl'>All Teachers</h1>
                    </div>
                    <div>
                        <button className='p-1 px-3 w-auto  bg-sky-blue text-white rounded-md border-none hover:bg-sky-400 focus:shadow-lg'>Add Teacher</button>
                    </div>
                </div>

                <Table bordered columns={columns} dataSource={data} />

            </Container>
        </div>
    )
}
