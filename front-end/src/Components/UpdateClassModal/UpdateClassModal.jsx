import { Form, Input, Modal, Upload } from 'antd'
import React from 'react'

export default function UpdateClassModal() {
    return (
        <div>
            <Modal
                open={open}
                title={'Update Class'}
                okText={'Update'}
                cancelText="Cancel"
                okButtonProps={{
                    autoFocus: true,
                    htmlType: 'submit',

                }}
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
