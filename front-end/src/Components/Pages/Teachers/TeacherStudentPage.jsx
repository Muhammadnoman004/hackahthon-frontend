import React from 'react'
import { BellFilled } from '@ant-design/icons'
import { Container } from 'react-bootstrap'
import { Input, Select, Space, Table, } from 'antd'
import { IoSearchSharp } from "react-icons/io5";
import { Progress } from 'antd';

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
        title: 'Progrees',
        dataIndex: 'progrees',
        key: 'progrees',
        render: (progress) => {
            let strokeColor = '';
            if (progress <= 40) {
                strokeColor = 'red';
            } else if (progress <= 70) {
                strokeColor = '#d5d017';
            }



            return (
                <a>
                    <Progress
                        percent={progress}
                        strokeColor={strokeColor}
                        percentPosition={{
                            align: 'center',
                            type: 'inner',
                        }}
                        size={[200, 20]}
                    />
                </a>
            );
        },
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
        rollNum: '128066',
        batch: 'Batch-10',
        progrees: 100,
        action: 'View Overall Report'
    },
    {
        key: '2',
        serialNo: 2,
        name: 'Huzaifa Khan',
        rollNum: '128088',
        batch: 'Batch-11',
        progrees: 90,
        action: 'View Overall Report'

    },
    {
        key: '3',
        serialNo: 3,
        name: 'Jamsheed Khan',
        rollNum: '128089',
        batch: 'Batch-12',
        progrees: 50,
        action: 'View Overall Report'

    },
    {
        key: '4',
        serialNo: 4,
        name: 'Tayyab',
        rollNum: '128090',
        batch: 'Batch-10',
        progrees: 30,
        action: 'View Overall Report'

    }
    // Add more data as needed
];



export default function TeacherStudentPage() {
    return (
        <div>
            <Container>
                <div className='flex m-4 text-2xl font-mono font-extrabold'>
                    <h1 className='flex-1'>Students</h1>
                    <BellFilled className='flex-2 text-amber-400' />
                </div>

                <div className='p-4 rounded-lg'>
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

                </div>

            </Container>
        </div>
    )
}