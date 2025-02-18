import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, Modal } from 'antd';
import { Container } from 'react-bootstrap'
import { Space, Table } from 'antd';
import { BiSolidUserDetail } from "react-icons/bi";
import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import api from '../../../api/api';
import { toast } from 'react-toastify';
import loader from '../../../Context/LoaderContext';
import Loader from '../../Loader/Loader';
import { useNavigate } from 'react-router-dom';

export default function AllTeacherPage() {


    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState();
    const [open, setOpen] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [loading, setloading] = useContext(loader);
    const [load, setload] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTeacher, setEditedTeacher] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        getAllTeachers()
    }, [setTeachers])

    useEffect(() => {
        if (open) {
            if (isEditing && editedTeacher) {
                form.setFieldsValue({
                    name: editedTeacher.username,
                    email: editedTeacher.email,
                    password: ''
                })
            } else {
                form.resetFields();
            }
        }
    }, [open, isEditing, editedTeacher, form])


    const showModal = () => {
        setOpen(true);
        setIsEditing(false);
        setEditedTeacher(null);
    };

    const showEditModal = (teacher) => {
        setOpen(true);
        setIsEditing(true);
        setEditedTeacher(teacher);
        console.log(editedTeacher);

    };


    const handleAddTeacher = (values) => {
        setloading(true);
        api.post("/api/users/trainer", {
            username: values.name,
            email: values.email,
            password: values.password,
            role: 'trainer'
        })
            .then((res) => {
                setloading(false);
                setOpen(false);
                toast.success("Teacher added successfully!", {
                    onClose: () => {

                        getAllTeachers();
                    }
                });

            })
            .catch((err) => {
                setloading(false);
                toast.error(err.response?.data || err.message);
            });

        setFormValues(values);
    };

    const handleDeleteTeacher = (id) => {
        setloading(true);
        setload(true);
        api.delete(`/api/users/trainer/${id}`)
            .then((res) => {
                setloading(false);
                setload(false);
                toast.success("Teacher deleted successfully!");
                getAllTeachers();

            })
            .catch(err => {
                setloading(false);
                setload(false);
                toast.error(err.response?.data || err.message);
            })
    }

    const handleEditTeacher = (values) => {
        setOpen(false);
        setloading(true);
        setload(true)
        api.put(`/api/users/trainer/${editedTeacher._id}`, {
            username: values.name,
            email: values.email
        })
            .then((res) => {
                setloading(false);
                setload(false);
                toast.success("Teacher updated successfully!");
                getAllTeachers();
            })
            .catch(err => {
                setloading(false);
                setload(false);
                toast.error(err.response?.data || err.message);
            })

    }

    const getAllTeachers = async () => {
        setload(true);
        try {
            const res = await api.get("/api/users/trainers")
            const teachersWithSerial = res.data.map((teacher, index) => ({
                ...teacher,
                serialNo: index + 1,
                key: teacher._id
            }))
            setload(false);
            setTeachers(teachersWithSerial);
            console.log(teachersWithSerial);

        } catch (error) {
            setload(false);
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
                    <a className='text-xl hover:text-sky-blue'><BiSolidUserDetail title='View Details' onClick={() => navigate(`/admin/teacher/${record._id}`)} /></a>
                    <a className='text-xl hover:text-green-500'><FaEdit title='Edit Teacher' onClick={() => showEditModal(record)} /></a>
                    <a className='text-xl hover:text-red-500'><FaDeleteLeft title='Delete Teacher' onClick={() => handleDeleteTeacher(record._id)} /></a>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Container>
                <div className='flex justify-between mb-4 mx-1 my-4'>
                    <div>
                        <h1 className='font-bold text-xl'>All Teachers</h1>
                    </div>
                    <div>
                        <button className='p-1 px-3 w-auto  bg-sky-blue text-white rounded-md border-none hover:bg-sky-400 focus:shadow-lg' onClick={showModal}>Add Teacher</button>
                    </div>
                </div>

                <Table
                    className='shadow-xl mb-5 overflow-x-auto'
                    bordered
                    pagination={false}
                    columns={columns}
                    dataSource={teachers}
                    loading={load}
                    rowKey={(record) => record._id}
                />

                <Modal
                    open={open}
                    title={!isEditing ? 'Add Teacher' : 'Edit Teacher'}
                    okText={!isEditing ? 'Add' : 'Update'}
                    cancelText="Cancel"
                    okButtonProps={{
                        autoFocus: true,
                        htmlType: 'submit',
                        form: 'teacherForm'
                    }}
                    onCancel={() => setOpen(false)}
                    destroyOnClose
                >
                    <Form
                        layout="vertical"
                        form={form}
                        id='teacherForm'
                        onFinish={isEditing ? handleEditTeacher : handleAddTeacher}  // Calls either handleAddTeacher or handleEditTeacher
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
                        {!isEditing && (
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
                                        message: 'Password must be at least 6 characters!',
                                    }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        )}
                        {loading && <Loader />}
                    </Form>
                </Modal>
            </Container>
        </div>
    )
}
