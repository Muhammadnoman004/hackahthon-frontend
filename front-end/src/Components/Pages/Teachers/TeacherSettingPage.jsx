import React, { useState } from 'react'
import { BellFilled } from '@ant-design/icons'
import { FaUserLock, FaBell } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { Button, Form, Input, Menu, Modal } from 'antd';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import { RiLockPasswordFill } from 'react-icons/ri';

const items = [
    {
        key: 'sub1',
        icon: <FaBell color='#87CEEB' />,
        label: 'Notifications',
        children: [
            {
                key: '1-1',
                label: 'Item 1',
                type: 'group',
                children: [
                    {
                        key: '1',
                        label: 'Option 1',
                    },
                    {
                        key: '2',
                        label: 'Option 2',
                    },
                ],
            },
            {
                key: '1-2',
                label: 'Item 2',
                type: 'group',
                children: [
                    {
                        key: '3',
                        label: 'Option 3',
                    },
                    {
                        key: '4',
                        label: 'Option 4',
                    },
                ],
            },
        ],
    },
    {
        key: 'sub2',
        icon: <Link to={'/trainer/profile'}><FaUser color='#87CEEB' /></Link>,
        label: 'Update profile',
    },
    {
        key: 'changePassword',
        label: 'Change password',
        icon: <FaUserLock color='#87CEEB' />,
    },
];


export default function TeacherSettingPage() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = () => {
        // setIsModalOpen(false);
        form.validateFields();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onClick = (e) => {
        if (e.key === 'changePassword') {
            setIsModalOpen(true)
        }
    };

    return (
        <div>
            <Container>
                <div className='flex m-4 text-2xl font-mono font-extrabold'>
                    <h1 className='flex-1'>Settings</h1>
                    <BellFilled className='flex-2 text-amber-400 hover:cursor-pointer' />
                </div>

                <Menu
                    onClick={onClick}
                    className='my-7 mx-7 sm:w-2/3 rounded-lg bg-stone-100 md:3/4'
                    mode="vertical"
                    items={items}
                />

                <div className='mx-4'>
                    <Button icon={<MdOutlineLogout />} className='text-lg'>Logout</Button>
                </div>


                <Modal
                    footer={null}
                    open={isModalOpen}
                    onOk={handleSubmit}
                    okButtonProps={{
                        autoFocus: true,
                        htmlType: 'submit',

                    }}
                    onCancel={handleCancel}
                    destroyOnClose
                >
                    <div>
                        <h1 className='text-lg text-center font-bold uppercase pb-3'>Update Password</h1>
                    </div>

                    <Form
                        layout="vertical"
                        form={form}
                        name="update-class-form"
                        initialValues={{
                            modifier: 'public',
                        }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="changePass"
                            label="Current Password"
                            rules={[{
                                required: true,
                                message: 'Please enter your old password!',
                            }]}
                        >
                            <Input.Password placeholder='Current Password' size='large' prefix={<FaUserLock />} />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="New Password"
                            rules={[{
                                required: true,
                                message: 'Please enter your updated password!',
                            },
                            {
                                min: 6,
                                message: 'Please must be at least 6 characters long'
                            }
                            ]}
                        >
                            <Input.Password placeholder='New Password' size='large' prefix={<RiLockPasswordFill />} />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            rules={[{
                                required: true,
                                message: 'Please confirm your password!'
                            }]}
                        >
                            <Input.Password placeholder='Confirm Password' size='large' prefix={<RiLockPasswordFill />} />
                        </Form.Item>
                    </Form>

                    <div className='flex justify-end'>
                        <Button type='primary' danger onClick={handleCancel}>Cancel</Button>
                        <Button type='primary' className='mx-2' onClick={handleSubmit}>Update</Button>
                    </div>

                </Modal>

            </Container>
        </div>
    )
}

