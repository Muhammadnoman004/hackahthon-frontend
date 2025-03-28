import React, { useContext, useEffect, useState } from 'react'
import { Button, Input, Modal } from 'antd';
import { MdAssignment } from "react-icons/md";
import loader from '../../Context/LoaderContext';
import Loader from '../Loader/Loader';

export default function CreateAssignmentModal({ isModalOpen, closeModal, onsubmit, assignmentToEdit }) {

    const [error, setError] = useState('');
    const [loading, setloading] = useContext(loader);

    const [formData, setFormdata] = useState({
        title: '',
        description: '',
        totalMarks: '',
        dueDate: '',
        fileLink: ''
    })


    useEffect(() => {
        if (assignmentToEdit) {
            setFormdata({
                title: assignmentToEdit.name,
                description: assignmentToEdit.description,
                totalMarks: assignmentToEdit.marks,
                dueDate: assignmentToEdit.date,
                fileLink: assignmentToEdit.file_link || ''
            })
        }
        else {
            setFormdata({
                title: '',
                description: '',
                totalMarks: '',
                dueDate: '',
                fileLink: ''
            })
        }
    }, [assignmentToEdit])


    const handleCloseModal = () => {
        closeModal()
        setFormdata({
            title: '',
            description: '',
            totalMarks: '',
            dueDate: '',
            fileLink: ''
        })
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormdata(prevData => ({
            ...prevData,
            [id]: id === "totalMarks" ? Number(value) : value
        }))
    };


    const validateForm = () => {
        if (!formData.title || !formData.description || !formData.totalMarks || !formData.dueDate) {
            setError('Please enter all required fields');
            setTimeout(() => {
                setError('');
            }, 3000)
            return false;
        }
        if (typeof formData.totalMarks !== 'number' || formData.totalMarks <= 0) {
            setError('Total marks must be a positive number');
            return false;
        }
        setError('');
        return true;
    }

    const handleSubmit = async () => {
        if (validateForm()) {
            setloading(true);
            try {
                await onsubmit(formData, assignmentToEdit?._id);
                handleCloseModal()
                setFormdata({
                    title: '',
                    description: '',
                    totalMarks: '',
                    dueDate: '',
                    fileLink: ''
                })
                setloading(false);
            } catch (error) {
                setloading(false);
                setError(error.message || 'An error occurred while creating');
            }
        }
    };

    return (
        <>
            <Modal footer={null} open={isModalOpen} onOk={handleSubmit} onCancel={handleCloseModal}>

                <div className='p-3'>
                    <div>
                        <h1 className='text-lg font-bold uppercase'>{assignmentToEdit ? "Edit Assignment" : "Create New Assignment"}</h1>
                        <p className='text-xs'>{assignmentToEdit ? "Update the form to edit the assignment." : "Fill out the form to create a new assignment."}</p>
                    </div>
                    <div className='mt-2 text-red-500'>
                        <p>{error}</p>
                    </div>
                    <div>
                        <div className='my-3 text-base'>
                            <form onSubmit={handleSubmit}>
                                <label className='font-semibold'>Title</label>
                                <Input size="large" placeholder="Enter assignment title" prefix={<MdAssignment />} className='mb-4' id='title' value={formData.title} required onChange={handleChange} />

                                <label className='font-semibold'>Description</label>
                                <Input.TextArea size="large" type='password' placeholder="Enter assignment description" className='mb-4' id='description' value={formData.description} required onChange={handleChange} />

                                <label className='font-semibold'>Total Marks</label>
                                <Input size="large" placeholder="marks" type='number' min={1} className='mb-4' id='totalMarks' value={formData.totalMarks} required onChange={handleChange} />

                                <label className='font-semibold'>Due Date</label>
                                <Input size="large" type='date' className='mb-4' id='dueDate' value={formData.dueDate} required onChange={handleChange} />

                                <label className='font-semibold'>File Link (Optional)</label>
                                <Input size="large" type='' placeholder="file link" className='mb-5' id='fileLink' value={formData.fileLink} onChange={handleChange} />

                            </form>
                        </div>
                    </div>

                    <div>
                        <Button type='primary' danger onClick={handleCloseModal}>Cancel</Button>
                        <Button type='primary' htmlType='submit' className='mx-2' onClick={handleSubmit}>{assignmentToEdit ? "Update" : "Submit"}</Button>
                    </div>

                </div>
                {
                    loading && <Loader />
                }

            </Modal>
        </>
    )
}