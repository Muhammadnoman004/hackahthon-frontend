import React from 'react';
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, FileOutlined, PlusOutlined, UploadOutlined, WarningOutlined } from '@ant-design/icons';

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        sorter: (a, b) => a.title.localeCompare(b.title),
        width: 130,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: 200,
    },
    {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
        width: 130,
        sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        width: 150,
        filters: [
            { text: 'Todo', value: 'todo' },
            { text: 'Submitted', value: 'submitted' },
            { text: 'Evaluated', value: 'evaluated' },
            { text: 'Expired', value: 'expired' },
        ],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value),
        render: (status) => {
            let color = 'green';
            let icon = <CheckCircleOutlined />;
            if (status === 'expired') {
                color = 'red';
                icon = <WarningOutlined />;
            } else if (status === 'todo') {
                color = 'orange';
                icon = <ClockCircleOutlined />;
            } else if (status === 'evaluated') {
                color = 'blue';
                icon = <CheckCircleOutlined />;
            }
            return (
                <Tag color={color} icon={icon}>
                    {status.toUpperCase()}
                </Tag>
            );
        },
    },
    {
        title: 'Total Marks',
        dataIndex: 'totalMarks',
        key: 'totalMarks',
        width: 100,
        sorter: (a, b) => a.totalMarks - b.totalMarks,
        render: (marks) => <span>{marks} points</span>,
    },
    {
        title: 'Action',
        key: 'action',
        width: 200,
        render: (_, record) => (
            <Space size="small">
                <Tooltip title="View Assignment">
                    <Button
                        type="primary"
                        icon={<FileOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(record.fileLink, '_blank');
                        }}
                        disabled={!record.fileLink}
                        size="small"
                    >
                        View
                    </Button>
                </Tooltip>
                <Tooltip title={record.submitted ? "Already Submitted" : record.status === 'expired' ? "Submission Closed" : "Submit Assignment"}>
                    <Button
                        type="default"
                        icon={<UploadOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSubmit(record);
                        }}
                        disabled={record.submitted || record.status === 'expired'}
                        size="small"
                    >
                        Submit
                    </Button>
                </Tooltip>
            </Space>
        ),
    },

];

const data = [
    {
        key: '1',
        number: 'Assignment 1',
        date: '10-05-24',
        topic: 'Html , Css',
        tags: ['submitted'],
    },
    {
        key: '2',
        number: 'Assignment 2',
        date: '12-05-24',
        topic: 'JavaScript , React JS',
        tags: ['expired'],
    },
    {
        key: '3',
        number: 'Assignment 3',
        date: '14-05-24',
        topic: 'Express JS , MongoDB',
        tags: ['pending'],
    },
    {
        key: '4',
        number: 'Assignment 4',
        date: '16-05-24',
        topic: 'Node JS',
        tags: ['submitted'],
    },
];
const StudentListingTable = () => {
    return (
        <div className='px-2'>
            <div className='flex justify-between items-center mb-3 flex-wrap gap-3'>
                <h2 className='text-2xl font-bold '>Class Assignment</h2>
                <Space className='flex flex-wrap break-words'>
                    <Button>Clear filters</Button>
                    <Button className='break-words'>Clear filters and sorters</Button>
                </Space>
            </div>
            <Table
                className='min-w-full bg-white shadow-lg rounded-lg overflow-x-auto px-3 mb-5 hover:cursor-pointer'
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                }}
            />
        </div>
    )
}
export default StudentListingTable;