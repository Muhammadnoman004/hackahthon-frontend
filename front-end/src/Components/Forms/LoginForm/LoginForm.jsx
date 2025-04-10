import React, { useContext, useEffect } from 'react'
import { Button, Form, Input } from "antd";
import animateSignup from '../../../assets/animateSignup.png'
import { MdMailOutline } from "react-icons/md";
import { LiaUserLockSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../api/api';
import Loader from '../../Loader/Loader';
import loader from '../../../Context/LoaderContext';
// import usefetchProfile from '../../../utils/useFetchProfile';
import useFetchProfile from '../../../utils/useFetchProfile';

export default function LoginForm() {

    const [loading, setloading] = useContext(loader);
    const { user, setUser } = useFetchProfile();
    // const { user, setUser } = useProfile();
    const [form] = Form.useForm();
    const navigate = useNavigate()

    useEffect(() => {
        if (user && user.isVerified) {
            if (user?.role === 'trainer') {
                navigate('/trainer/dashboard');
            } else if (user?.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        }
    }, [user])

    const onFinish = async (values) => {
        setloading(true);
        try {
            const res = await api.post('api/users/auth', {
                email: values.email,
                password: values.password,
            })
            toast.success('Logged in Successfully!', {
                onClose: () => {
                    localStorage.setItem('token', res.data.token);
                    setUser(res.data)
                    if (res.data.role === 'trainer') {
                        navigate('/trainer/dashboard');
                    }
                    else if (res.data.role === 'admin') {
                        navigate('/admin/dashboard');
                    }
                    else {
                        navigate('/student/dashboard')
                    }
                }
            })
            setloading(false);
            form.resetFields();
        }
        catch (err) {
            setloading(false)
            if (err.response?.data.message == "Please verify your email first!");
            toast.error(err.response.data.message, {
                onClose: () => {
                    navigate('/account-verification')
                }
            });
            if (err.response?.data)
                toast.error(err.response.data);
            else {
                toast.error("Something went wrong , Please try again!");
            }
        };
    };
    const onFinishFailed = (errorInfo) => {
        toast.error('Please enter all fields!')
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
                <div>
                    {loading && <Loader />}
                </div>
            </div>
        </div>
    )
}