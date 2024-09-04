import React from 'react'
import { Button, Form, Input } from "antd";
import animateSignup from '../../../assets/animateSignup.png'
import { MdMailOutline } from "react-icons/md";
import { LiaUserLockSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../api/api';

export default function LoginForm() {

    const [form] = Form.useForm();

    const onFinish = async (values) => {

        try {
            const res = await api.post('api/users/auth', {
                email: values.email,
                password: values.password,
            })
            console.log(res);
        }
        catch (err) {
            if (err.response?.data.message == "Please verify your email first!");
            toast.error(err.response.data.message);
            if (err.response?.data)
                toast.error(err.response.data);
            else {
                toast.error("Something went wrong , Please try again!");
            }
        };
        // toast.success('Logged in Successfully!')
        console.log('Success:', values);
        form.resetFields();
    };
    const onFinishFailed = (errorInfo) => {
        toast.error('Please enter all fields!')
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='h-screen absolute w-screen sm:bg-stone-100'>
            <div className="bg-sky-blue m-auto flex justify-center items-center h-screen sm:w-fit sm:h-auto sm:absolute inset-x-0 top-32 sm:rounded-lg">
                <div className="flex flex-col justify-center items-center w-screen sm:w-96 h-auto p-3">
                    <div className='mb-4 mt-5 text-4xl font-bold sm:font-semibold sm:text-3xl'>
                        <h1>Login</h1>
                    </div>
                    <div className=" w-screen px-4 sm:w-96">
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            form={form}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Email is required',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Enter a valid email address'
                                    }
                                ]}>
                                <div>
                                    <Input type="email" placeholder="Enter Email" size='large' prefix={<MdMailOutline />
                                    } />
                                </div>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Password is required',
                                    },
                                ]}>
                                <div >
                                    <Input.Password placeholder="Enter password" size='large' prefix={<LiaUserLockSolid />} />
                                </div>
                            </Form.Item>
                            <div>
                                <span className='text-gray-600'>Don't have an account ? </span>
                                <Link to={'/signup'}><span className='font-semibold hover:underline hover:font-bold'>Sign up</span></Link>
                            </div>

                            <div className='mb-5 mt-4'>
                                <Button type='text' className='border-black font-bold' htmlType="submit">Login</Button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="sm:visible">
                    <img
                        className='w-96'
                        src={animateSignup}
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}