import React, { useState } from 'react'
import { Button, Form, Input, Modal } from 'antd';

export default function ClassModal() {

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();


    const handleSubmit = (e) => {
        console.log(e);

    }

    return (
        <div>

            <Button onClick={() => setOpen(true)}>Modal</Button>
            <Modal
                open={open}
                title={'Create Class'}
                okText={'Add'}
                cancelText="Cancel"
                okButtonProps={{
                    autoFocus: true,
                    htmlType: 'submit',

                }}
                onCancel={() => setOpen(false)}
                destroyOnClose
            >
                <Form
                    layout="vertical"
                    form={form}
                    name="form_in_modal"
                    initialValues={{
                        modifier: 'public',
                    }}
                    onFinish={handleSubmit}
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
                </Form>
            </Modal>


        </div>
    )
}
