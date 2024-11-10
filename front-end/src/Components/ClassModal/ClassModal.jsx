import React, { useContext, useState } from 'react'
import { Form, Input, message, Modal, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import uploadFileToFirebase from '../../utils/uploadFileToFirebase';
import useFetchProfile from '../../utils/useFetchProfile';
import api from '../../api/api';
import loader from '../../Context/LoaderContext';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
        return Upload.LIST_IGNORE; // Prevent the upload
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
        return Upload.LIST_IGNORE; // Prevent the upload
    }
    return false; // Prevent automatic upload
};


export default function ClassModal({ open, closeModal, getAllClasses }) {

    const { user } = useFetchProfile();
    const [loading, setloading] = useContext(loader);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [load, setLoad] = useState(false);

    const handleChange = (info) => {
        let newFileList = [...info.fileList].slice(-1);
        setFileList(newFileList);

        if (info.file.status === 'uploading') {
            setLoad(true);
            return;
        }
        if (info.file.originFileObj) {
            const imageUrl = URL.createObjectURL(info.file.originFileObj);
            setLoad(false);
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                setloading(true);
                const file = fileList[0]?.originFileObj
                if (file) {
                    try {
                        const fileURL = await uploadFileToFirebase(file, `classes/${user._id}/${file.name}`);
                        values.classImage = fileURL;
                        // console.log(values);
                    } catch (error) {
                        setloading(false);
                        toast.error("Failed to upload image.");
                        return;
                    }
                }
                api.post("/api/classes/create", values)
                    .then(res => {
                        closeModal();
                        getAllClasses();
                        setloading(false);
                        toast.success("Class created successfully!");
                        form.resetFields();
                        setFileList([]);
                    })
                    .catch(error => {
                        setloading(false);
                        toast.error("Failed to create class.");
                    });

            }).catch(info => {
                setloading(false);
                toast.error(info?.message);
            });
    }


    const handleCancel = () => {
        closeModal();
        form.resetFields();
        setFileList([]);
    }

    return (
        <div>

            <Modal
                open={open}
                title={'Create Class'}
                okText={'Create'}
                cancelText="Cancel"
                onOk={handleSubmit}
                okButtonProps={{
                    autoFocus: true,
                    htmlType: 'submit',

                }}
                onCancel={handleCancel}
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
                            fileList={fileList}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {fileList.length > 0 ? null : uploadButton}
                        </Upload>
                    </Form.Item>
                </Form>
                {loading && <Loader />}
            </Modal>


        </div>
    )
}
