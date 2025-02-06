import { Form, Input, Modal, Upload } from 'antd'
import React from 'react'

export default function UpdateClassModal({ open, closeModal, getClassDetail, detail }) {

    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields();
    }

    const handleCancel = () => {
        closeModal();
        form.resetFields();
    }

    return (
        <div>
            <Modal
                open={open}
                title={'Update Class'}
                okText={'Update'}
                onOk={handleSubmit}
                cancelText="Cancel"
                okButtonProps={{
                    autoFocus: true,
                    htmlType: 'submit',

                }}
                onCancel={handleCancel}
                destroyOnClose
            >
                <Form
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: 'public',
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Class Name:"
                        rules={[{
                            required: true,
                            message: 'Please enter class name!',
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Class Description:"
                        rules={[{
                            required: true,
                            message: 'Please enter class description!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Class Image:">
                        <Upload
                            action="" // Prevent automatic upload
                            listType="picture-circle"
                            className="avatar-uploader"
                        >
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
