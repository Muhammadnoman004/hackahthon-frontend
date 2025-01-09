import React, { useState } from 'react'
import { Button, Input, Modal } from 'antd';
import { MdAssignment, MdEditNote } from "react-icons/md";

export default function CreateAssignmentModal({ isModalOpen, closeModal }) {


    const handleSubmit = () => {
        console.log("chal raha hai");

    }

    return (
        <>
            <Modal footer={null} open={isModalOpen} onOk={closeModal} onCancel={closeModal}>

                <div className='p-3'>
                    <div>
                        <h1 className='text-lg font-bold uppercase'>Create New Assignment</h1>
                        <p className='text-xs'>Fill out the form to create a new assignment.</p>
                    </div>

                    <div>
                        <div className='my-4 text-base'>
                            <form onSubmit={handleSubmit}>
                                <label className='font-semibold'>Title</label>
                                <Input size="large" placeholder="Enter assignment title" prefix={<MdAssignment />} className='mb-4' required />

                                <label className='font-semibold'>Description</label>
                                <Input.TextArea size="large" type='password' placeholder="Enter assignment description" prefix={<MdEditNote />} className='mb-4 ' required />

                                <label className='font-semibold'>Total Marks</label>
                                <Input size="large" placeholder="marks" type='number' min={1} className='mb-4' required />

                                <label className='font-semibold'>Due Date</label>
                                <Input size="large" type='date' className='mb-4' />

                                <label className='font-semibold'>File Link (Optional)</label>
                                <Input size="large" type='' placeholder="file link" className='mb-5' />

                            </form>
                        </div>
                    </div>

                    <div>
                        <Button type='primary' danger onClick={closeModal}>Cancel</Button>
                        <Button type='primary' htmlType='submit' className='mx-2' onClick={handleSubmit}>Submit</Button>
                    </div>

                </div>

            </Modal>
        </>
    )
}