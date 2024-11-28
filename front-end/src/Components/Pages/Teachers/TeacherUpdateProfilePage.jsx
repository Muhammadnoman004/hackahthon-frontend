import React, { useContext, useEffect, useState } from 'react'
import { BellFilled, UserOutlined } from '@ant-design/icons'
import { MdOutlineMail, } from "react-icons/md";
import { Button, Form, Input } from 'antd';
import { Container } from 'react-bootstrap';
import UserProfile from '../../../assets/user-profile-icon.png';
import api from '../../../api/api';
import loader from '../../../Context/LoaderContext';
import Loader from '../../Loader/Loader';
import useFetchProfile from '../../../utils/useFetchProfile';
import { toast } from 'react-toastify';
import uploadFileToFirebase from '../../../utils/uploadFileToFirebase';

export default function TeacherUpdateProfilePage() {
    let [ProfileImg, setProfileImg] = useState("");
    let [ImgFiles, setImgFiles] = useState([]);
    let [loading, setloading] = useContext(loader);
    const { user, setUser } = useFetchProfile();
    const [ImageURL, setImageURL] = useState("");
    const [form] = Form.useForm();


    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.username,
                email: user.email,
            })
            if (user) {
                setProfileImg(user.profileImg);
            }
        }
    }, [user])

    const ProfileImgIcon = async (e) => {
        setProfileImg(URL.createObjectURL(e.target.files[0]));
        setImgFiles(e.target.files[0])
        setloading(true);
        const fileURL = await uploadFileToFirebase(e.target.files[0], `TeacherProfileImg/${user._id}/${e.target.files[0].name}`)
        setImageURL(fileURL);
        setloading(false)

    }

    const handleSubmit = async () => {
        setloading(true);
        try {
            const values = await form.validateFields();
            const response = await api.put('/api/users/profile', {
                username: values.name,
                email: values.email,
                profileImg: ImageURL
            })
            console.log(response);

            setloading(false);
            toast.success('Profile updated successfully!')
        }
        catch (error) {
            setloading(false);
            toast.error(error.message || 'Error updated profile')
        }


    }

    return (
        <div>
            <Container>
                <div className='flex m-4 text-2xl font-mono font-extrabold mx-2'>
                    <h1 className='flex-1'>Update Profile</h1>
                    <BellFilled className='flex-2 text-amber-400 hover:text-amber-500 transition delay-100 cursor-pointer' />
                </div>
                <div className='flex justify-center'>
                    <div className='bg-white my-2 p-7 mx-2 rounded-lg shadow-lg shadow-slate-300'>
                        <div>
                            <h1 className='text-lg font-bold uppercase'>User Inforamtion</h1>
                        </div>

                        <div className='flex justify-evenly flex-col-reverse sm:flex-row'>
                            <div className='my-5 text-base'>
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
                                        label="Username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your username!',
                                            },
                                        ]}
                                    >
                                        <Input size="large" placeholder="username" prefix={<UserOutlined />} />
                                    </Form.Item>
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your email!'
                                            }
                                        ]}
                                    >
                                        <Input size="large" type='email' placeholder="email" prefix={<MdOutlineMail />} />
                                    </Form.Item>
                                </Form>
                            </div>
                            <div className='flex flex-col mt-6 sm:my-20 mx-10 items-center'>
                                {ProfileImg ? (
                                    <img className='w-24 h-24 object-contain bg-stone-200 rounded-full mx-5' src={ProfileImg} alt="#" />
                                ) : (
                                    <img className='w-24 h-24 object-contain rounded-full mx-5' src={UserProfile} alt="#" />
                                )}
                                <input type="file" hidden id="changeImg" onChange={(e) => ProfileImgIcon(e)} />
                                <Button className='my-3' type='primary' ghost><label className='cursor-pointer' htmlFor="changeImg">Change image</label></Button>
                            </div>
                        </div>

                        <div className='mx-2 flex flex-col-reverse items-center gap-4 sm:flex-row'>
                            <Button type='primary' className='w-fit' onClick={handleSubmit}>Save Changes</Button>
                        </div>

                    </div>
                </div>
                {loading && <Loader />}
            </Container>
        </div>
    )
}