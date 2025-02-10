import { Form, Input, Modal, Upload } from 'antd'
import React, { memo, useContext, useEffect, useState } from 'react'
import loader from '../../Context/LoaderContext';
import Loader from '../../Components/Loader/Loader';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import uploadFileToFirebase from "../../utils/uploadFileToFirebase";
import useFetchProfile from "../../utils/useFetchProfile"
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/api';

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

function UpdateClassModal({ open, closeModal, getClassDetail, detail }) {

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useContext(loader);
    const { classId } = useParams();
    const { user } = useFetchProfile();

    useEffect(() => {
        console.log(detail);
        if (detail) {
            form.setFieldsValue({
                name: detail.name,
                description: detail.description,
                classImage: detail.classImage
            });
            if (detail.classImage) {
                setFileList([{ url: detail.classImage }])
            }
        }

    }, [detail, form])


    const handleChange = (info) => {
        let newFileList = [...info.fileList].slice(-1);
        setFileList(newFileList);

        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.originFileObj) {
            const imageUrl = URL.createObjectURL(info.file.originFileObj);
            setLoading(false);
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    const handleSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                setLoading(true);
                const file = fileList[0]?.originFileObj;
                if (file) {
                    try {
                        const fileUrl = await uploadFileToFirebase(file, `classes/${user._id}/${file.name}`);
                        values.classImage = fileUrl
                    }
                    catch (err) {
                        setLoading(false)
                        toast.error('Failed to upload image.')
                        return;
                    }
                }
                console.log("values", values);

                await api.put(`/api/classes/${classId}`, values);

                closeModal();
                getClassDetail();
                setLoading(false);
                toast.success('Class updated successfully!');
                form.resetFields();
                setFileList([]);
            })
            .catch(info => {
                setLoading(false);
                toast.error(info?.message);
            })
    }

    const handleCancel = () => {
        closeModal();
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
                    form={form}
                    name="update-class-form"
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
                    <Form.Item label="Class Image:" name="classImage">
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

export default memo(UpdateClassModal);
