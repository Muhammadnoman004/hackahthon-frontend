import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Space, Table, Form, Input, Modal } from 'antd';
import { BiSolidUserDetail } from "react-icons/bi";
import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import api from '../../../api/api';
import { toast } from 'react-toastify';
import loader from '../../../Context/LoaderContext';
import Loader from '../../Loader/Loader';
import { useNavigate } from 'react-router-dom';


export default function AllStudentPage() {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [loading, setloading] = useContext(loader);
    const [students, setStudents] = useState([]);
    const [load, setload] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedStudent, setEditedStudent] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (students.length === 0) {
            getAllStudents()
        }
    }, [students]);

    useEffect(() => {
        if (open) {
            if (isEditing && editedStudent) {
                form.setFieldsValue({
                    name: editedStudent.username,
                    email: editedStudent.email,
                    password: ''
                })
            } else {
                form.resetFields();
            }
        }
    }, [open, isEditing, editedStudent, form])

    const showModal = () => {
        setOpen(true);
        setIsEditing(false);
        setEditedStudent(null);
    };

    const showEditModal = (student) => {
        setOpen(true);
        setIsEditing(true);
        setEditedStudent(student);
        console.log(editedStudent);

    };

    const handleAddStudent = (values) => {
        setloading(true);
        api.post("/api/users/student", {
            username: values.name,
            email: values.email,
            password: values.password,
            role: "student"
        })
            .then(res => {
                setloading(false);
                setOpen(false);
                toast.success('Student added successfully!', {
                    onClose: () => {
                        getAllStudents()
                    }
                });

            })
            .catch(err => {
                setloading(false);
                toast.error(err.response?.data || err.message);
            });

    }

    const handleEditStudent = (values) => {
        setOpen(false);
        setloading(true);
        setload(true);
        api.put(`/api/users/student/${editedStudent._id}`, {
            username: values.name,
            email: values.email,
        })
            .then((res) => {
                setloading(false);
                setload(false);
                toast.success("Student updated successfully!");
                getAllStudents();

            })
            .catch(err => {
                setloading(false);
                setload(false);
                toast.error(err.response?.data || err.message);
            })
    }

    const handleDeleteTeacher = (values) => {
        setloading(true);
        setload(true);
        api.delete(`/api/users/student/${values}`)
            .then((res) => {
                setloading(false);
                setload(false);
                toast.success("Student deleted successfully!");
                getAllStudents();
            })
            .catch(err => {
                setloading(false);
                setload(false);
                toast.error(err.response?.data || err.message);
            })
    }


    const getAllStudents = async () => {
        setload(true);
        try {
            const res = await api.get("api/users/students")
            const studentWithSerial = res.data.map((student, index) => ({
                ...student,
                serialNo: index + 1,
                key: student._id

            }))
            setload(false);
            console.log(res.data);
            setStudents(studentWithSerial);
        }
        catch (error) {
            setload(false)
            toast.error(error.response?.data || error.message)
        }
    }


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
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Is Verified',
            dataIndex: 'isVerified',
            key: 'isVerified',
            render: (text) => <span className={`w-full flex justify-center items-center p-1 rounded-lg text-white ${text ? 'bg-green-500' : 'bg-red-500'} text-sm`}>{text ? 'Yes' : 'No'}</span>,
        },
        {
            title: 'No. of enrolled classes',
            dataIndex: 'classes',
            key: 'classes',
            filter: [
                { text: '0 classes', value: 0 },
                { text: '1-3 classes', value: [1, 2, 3] },
                { text: '4+ classes', value: 4 },
            ],
            onFilter: (value, record) => {
                const classCount = record.classes ? record.classes.length : 0;
                if (Array.isArray(value)) {
                    return value.includes(classCount);
                }
                return value === 4 ? classCount >= 4 : classCount === value;
            },
            sorter: (a, b) => (a.classes ? a.classes.length : 0) - (b.classes ? b.classes.length : 0),
            render: (classes) => <span style={{ display: "block", width: "100%", textAlign: "center" }}>{classes ? classes.length : 0}</span>,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a className='text-xl hover:text-sky-blue'><BiSolidUserDetail title='View Details' onClick={() => navigate(`/admin/student/${record._id}`)} /></a>
                    <a className='text-xl hover:text-green-500'><FaEdit title='Edit Student' onClick={() => showEditModal(record)} /></a>
                    <a className='text-xl hover:text-red-500'><FaDeleteLeft title='Delete Student' onClick={() => handleDeleteTeacher(record._id)} /></a>
                </Space>
            ),
        },
    ];


    return (
        <div>
            <Container>
                <div className='flex justify-between mb-4 mx-1 my-4'>
                    <div>
                        <h1 className='font-bold text-xl'>All Students</h1>
                    </div>
                    <div>
                        <button className='p-1 px-3 w-auto  bg-sky-blue text-white rounded-md border-none hover:bg-sky-400 focus:shadow-lg' onClick={showModal}>Add Student</button>
                    </div>
                </div>

                <Table
                    className='shadow-xl mb-5 overflow-x-auto'
                    bordered
                    pagination={false}
                    columns={columns}
                    dataSource={students}
                    loading={load}
                    rowKey={(record) => record._id}
                />

                <Modal
                    open={open}
                    title={isEditing ? 'Edit Student' : 'Add Student'}
                    okText={isEditing ? 'Update' : 'Add'}
                    cancelText="Cancel"
                    okButtonProps={{
                        autoFocus: true,
                        htmlType: 'submit',
                        form: 'studentForm'
                    }}
                    onCancel={() => setOpen(false)}
                    destroyOnClose
                >
                    <Form
                        layout="vertical"
                        form={form}
                        id='studentForm'
                        name="form_in_modal"
                        initialValues={{
                            modifier: 'public',
                        }}
                        onFinish={isEditing ? handleEditStudent : handleAddStudent}
                    >
                        <Form.Item
                            name="name"
                            label="Student Name"
                            rules={[{
                                required: true,
                                message: 'Please enter student name!',
                            }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{
                                required: true,
                                message: 'Please enter student email!',
                            },
                            {
                                type: 'email',
                                message: 'Please enter a valid email!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                        {!isEditing && (
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[{
                                    required: true,
                                    message: 'Please enter student password!',
                                },
                                {
                                    min: 6,
                                    message: 'Password must be at least 6 characters!'
                                }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        )}
                    </Form>
                    {loading && <Loader />} {/* Show loader only if loading */}
                </Modal>

            </Container>
        </div >
    )
}
