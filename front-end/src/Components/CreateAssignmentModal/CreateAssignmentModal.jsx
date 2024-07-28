import React from 'react'
import { Button, Input, Modal } from 'antd';
import { FaUserLock } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";

export default function CreateAssignmentModal() {
    return (
        <>
            <Button type="primary">
                Create Assignment
            </Button>
            <Modal footer={null} open>

                <div className='p-2'>
                    <div>
                        <h1 className='text-lg text-center font-bold uppercase'>User Inforamtion</h1>
                    </div>

                    <div>
                        <div className='my-4 text-base'>

                            <label>Current Password</label>
                            <Input size="large" placeholder="Current Password" prefix={<FaUserLock />} className='mb-5' />

                            <label>New Password</label>
                            <Input size="large" type='password' placeholder="New Password" prefix={<RiLockPasswordFill />} className='mb-5' />

                            <label>Confirm Password</label>
                            <Input size="large" type='password' placeholder="Confirm Password" prefix={<RiLockPasswordFill />} className='mb-5' />

                        </div>
                    </div>

                    <div>
                        <Button type='primary' danger >Cancel</Button>
                        <Button type='primary' className='mx-2'>Edit</Button>
                    </div>

                </div>

            </Modal>
        </>
    )
}