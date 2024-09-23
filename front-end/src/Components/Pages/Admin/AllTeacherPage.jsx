import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Radio } from 'antd';
import { Container } from 'react-bootstrap'
import { Space, Table } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import api from '../../../api/api';
import { toast } from 'react-toastify';

// const data = [
//     {
//         key: '1',
//         serialNo: '01',
//         name: 'Jamsheed',
//         email: 'Jamsheed@gmail.com',
//     },
//     {
//         key: '2',
//         serialNo: '02',
//         name: 'Huzaifa',
//         email: 'Huzaifa@gmail.com',
//     },
//     {
//         key: '3',
//         serialNo: '03',
//         name: 'Basit',
//         email: 'Basit@gmail.com',
//     },
//     {
//         key: '4',
//         serialNo: '04',
//         name: 'Tayyab',
//         email: 'Tayyab@gmail.com',
//     },
// ];


export default function AllTeacherPage() {


    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState();
    const [open, setOpen] = useState(false);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        getAllTeachers()
    }, [setTeachers])


    const handleAddTeacher = (values) => {

        api.post("/api/users/trainer", {
            username: values.name,
            email: values.email,
            password: values.password,
            role: 'trainer'
        })
            .then((res) => {
                toast.success("Teacher added successfully!", {
                    onClose: () => {

                        console.log(res.data);
                        getAllTeachers();
                    }
                })
            })
            .catch(err => console.log(err))

        setFormValues(values);
        setOpen(false);
    };

    const getAllTeachers = async () => {
        try {
            const res = await api.get("/api/users/trainers")
            const teachersWithSerial = res.data.map((teacher, index) => ({
                ...teacher,
                serialNo: index + 1,
                key: teacher._id
            }))
            setTeachers(teachersWithSerial);
            console.log(teachersWithSerial);

        } catch (error) {
            console.log(error);
        }
    }

    const columns = [
        {
            title: 'S/No',
            dataIndex: 'serialNo',
            key: 'serialNo',
            width: '10%',
            render: (number) => <span>{number}</span>,
            sorter: (a, b) => a.serialNo - b.serialNo,
        },
        {
            title: 'Teacher Name',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
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

    return (
        <div>
            <Container>
                <div className='flex justify-between m-4'>
                    <div>
                        <h1 className='font-bold text-xl'>All Teachers</h1>
                    </div>
                    <div>
                        <button className='p-1 px-3 w-auto  bg-sky-blue text-white rounded-md border-none hover:bg-sky-400 focus:shadow-lg' onClick={() => setOpen(true)}>Add Teacher</button>
                    </div>
                </div>

                <Table
                    className='shadow-xl mb-5'
                    bordered
                    columns={columns}
                    dataSource={teachers}
                />


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
                        label="Teacher Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter teacher name!',
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
                                message: 'Please enter teacher email!',
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
