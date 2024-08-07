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
    },
    {
        title: 'Student Name',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'No. of enrolled classes',
        dataIndex: 'enrolled',
        key: 'enrolled',
        render: (number) => <a>{number}</a>,
        sorter: (a, b) => a.enrolled - b.enrolled,
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
        name: 'Asad',
        email: 'Asad@gmail.com',
        enrolled: 0
    },
    {
        key: '2',
        serialNo: '02',
        name: 'Talha',
        email: 'Talha@gmail.com',
        enrolled: 2
    },
    {
        key: '3',
        serialNo: '03',
        name: 'Saad',
        email: 'Saad@gmail.com',
        enrolled: 1
    },
    {
        key: '4',
        serialNo: '04',
        name: 'Khan',
        email: 'Khan@gmail.com',
        enrolled: 0
    },
    {
        key: '5',
        serialNo: '05',
        name: 'Hamza',
        email: 'Hamza@gmail.com',
        enrolled: 2
    },
    {
        key: '6',
        serialNo: '06',
        name: 'Aman',
        email: 'Aman@gmail.com',
        enrolled: 0
    },
];


export default function AllStudentPage() {
    return (
        <div>
            <Container>
                <div className='flex justify-between m-4'>
                    <div>
                        <h1 className='font-bold text-xl'>All Students</h1>
                    </div>
                    <div>
                        <button className='p-1 px-3 w-auto  bg-sky-blue text-white rounded-md border-none hover:bg-sky-400 focus:shadow-lg'>Add Student</button>
                    </div>
                </div>

                <Table className='shadow-xl' bordered columns={columns} dataSource={data} />

            </Container>
        </div>
    )
}
