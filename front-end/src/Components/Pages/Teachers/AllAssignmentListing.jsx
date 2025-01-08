import { Space, Table } from 'antd'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import CreateAssignmentModal from '../../CreateAssignmentModal/CreateAssignmentModal';

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
        title: 'Due date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Total Marks',
        key: 'marks',
        dataIndex: 'marks',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="small">
                <div className='flex justify-between items-center gap-2'>
                    <button className='text-sm text-black border-dashed border-2 border-teal-600 p-2 rounded-md hover:bg-teal-600 duration-500 transition-all'>View Assignment</button>
                    <button className='text-sm text-white bg-teal-600 p-2 rounded-md hover:bg-teal-700'>View Submissions</button>
                    <button className='text-sm text-white bg-green-600 p-2 rounded-md hover:bg-green-700'>Edit</button>
                    <button className='text-sm text-white bg-red-600 p-2 rounded-md hover:bg-red-700'>Delete</button>
                </div>
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
        marks: 100
    },
    {
        key: '2',
        serialNo: 2,
        name: 'Assignment',
        date: '12-05-24',
        marks: 10
    },
    {
        key: '3',
        serialNo: 3,
        name: 'Assignment',
        date: '14-05-24',
        marks: 50
    },
    {
        key: '4',
        serialNo: 4,
        name: 'Assignment',
        date: '16-05-24',
        marks: 20
    },
];

export default function AllAssignmentListing() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <Container>
                <div className='mt-4 border rounded-lg p-2'>

                    <div className='flex flex-col mb-4 sm:flex-row sm:m-4 justify-between space-y-3.5 border-b pb-3'>
                        <div>
                            <h1 className='font-bold text-lg'>All Assignments</h1>
                            <p className='text-xs'>View and manage all assignments</p>
                        </div>
                        <div>
                            <button className='p-1 px-3 w-auto  bg-sky-blue text-white rounded-md border-none hover:bg-sky-400 focus:shadow-lg' onClick={() => setIsModalOpen(true)}>Create Assignment</button>
                        </div>
                    </div>

                    <Table columns={columns} dataSource={data} className='overflow-x-auto' />
                </div>

            </Container>

            <CreateAssignmentModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    )
}