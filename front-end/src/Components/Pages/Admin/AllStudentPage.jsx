import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Space, Table, Form, Input, Modal } from 'antd';
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

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Container>
                <div className='flex justify-between m-4'>
                    <div>
                        <h1 className='font-bold text-xl'>All Students</h1>
                    </div>
                    <div>
                        <button className='p-1 px-3 w-auto  bg-sky-blue text-white rounded-md border-none hover:bg-sky-400 focus:shadow-lg' onClick={() => setOpen(true)}>Add Student</button>
                    </div>
                </div>

                <Table className='shadow-xl mb-5' bordered columns={columns} dataSource={data} />


                <Modal
                    open={open}
                    title="Add Teacher"
                    okText="Add"
                    cancelText="Cancel"
                    okButtonProps={{
                        autoFocus: true,
                        htmlType: 'submit',
                    }}
                    onCancel={() => setOpen(false)}
                    destroyOnClose
                    modalRender={(dom) => (
                        <Form
                            layout="vertical"
                            form={form}
                            name="form_in_modal"
                            initialValues={{
                                modifier: 'public',
                            }}
                            clearOnDestroy
                            onFinish={(values) => handleAddTeacher(values)}
                        >
                            {dom}
                        </Form>
                    )}
                >
                    <Form.Item
                        name="name"
                        label="Student Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter student name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter student email!',
                            },
                            {
                                type: 'email',
                                message: 'Please enter a valid email!'
                            }

                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter teacher password!',
                            },
                            {
                                min: 6,
                                message: 'Password must be at least 6 characters!'
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Modal>


            </Container>
        </div>
    )
}
