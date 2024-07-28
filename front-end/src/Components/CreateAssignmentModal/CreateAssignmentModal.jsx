import React, { useState } from 'react'
import { Button, Input, Modal } from 'antd';
import { MdAssignment, MdEditNote } from "react-icons/md";

export default function CreateAssignmentModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Create Assignment
            </Button>
            <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <div className='p-3'>
                    <div>
                        <h1 className='text-lg font-bold uppercase'>Create New Assignment</h1>
                        <p className='text-xs'>Fill out the form to create a new assignment.</p>
                    </div>

                    <div>
                        <div className='my-4 text-base'>

                            <label className='font-semibold'>Name</label>
                            <Input size="large" placeholder="Enter assignment name" prefix={<MdAssignment />} className='mb-4' />

                            <label className='font-semibold'>Description</label>
                            <Input.TextArea size="large" type='password' placeholder="Enter assignment description" prefix={<MdEditNote />} className='mb-4 ' />

                            <label className='font-semibold'>Due Date</label>
                            <Input size="large" type='date' placeholder="Confirm Password" className='mb-5' />

                        </div>
                    </div>

                    <div>
                        <Button type='primary' danger onClick={handleCancel}>Cancel</Button>
                        <Button type='primary' className='mx-2' onClick={handleOk}>Submit</Button>
                    </div>

                </div>

            </Modal>
        </>
    )
}