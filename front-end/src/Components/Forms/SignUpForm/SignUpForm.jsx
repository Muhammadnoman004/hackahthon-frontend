import React from 'react'
import { Input, Button } from "antd";
import animateSignup from '../../../assets/animateSignup.png'
import { MdMailOutline } from "react-icons/md";
import { FaRegUser } from 'react-icons/fa';
import { LiaUserLockSolid } from 'react-icons/lia';


export default function SignUpForm() {

    return (
        <div className='h-screen absolute w-screen sm:bg-stone-100'>
            <div className="bg-sky-blue m-auto flex justify-center items-center h-screen sm:w-fit sm:h-auto sm:absolute inset-x-0 top-32 rounded-lg">
                <div className="flex flex-col justify-center items-center w-screen sm:w-96 h-auto p-3">
                    <div className='mb-4 mt-5 text-4xl font-bold sm:font-semibold sm:text-3xl'>
                        <h1>Sign up</h1>
                    </div>
                    <div className=" w-screen px-4 sm:w-96">
                        <div className="mb-3">
                            <Input type="text" placeholder="Username" size='large' prefix={<FaRegUser className='text-sm' />} />
                        </div>
                        <div className="mb-3">
                            <Input type="email" placeholder="Enter Email" size='large' prefix={<MdMailOutline />
                            } />
                        </div>
                        <div className="mb-3">
                            <Input.Password placeholder="Enter password" size='large' prefix={<LiaUserLockSolid />} />
                        </div>
                        <div className="mb-3">
                            <Input.Password placeholder="Confirm Password" size='large' prefix={<LiaUserLockSolid />} />
                        </div>

                        <div className='mb-5 mt-4'>
                            <Button type='primary' ghost>Register</Button>
                        </div>

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
