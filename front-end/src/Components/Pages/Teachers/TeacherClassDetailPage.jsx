import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../api/api'
import { toast } from 'react-toastify';
import loader from '../../../Context/LoaderContext';

export default function TeacherClassDetailPage() {

    const { classId } = useParams();
    const [detail, setDetail] = useState();
    const [assignments, setAssignments] = useState([]);
    const [loading, setloading] = useContext(loader);
    const navigate = useNavigate();

    useEffect(() => {
        getClassDetail()
    }, [])

    const getClassDetail = async () => {
        setloading(true);
        try {
            const response = await api.get(`/api/classes/trainer/class/${classId}`);
            const res = await api.get(`/api/assignments/class/${classId}`);
            setAssignments(res.data);
            setDetail(response.data);
            console.log(detail);
            setloading(false);

        } catch (error) {
            toast.error(error.response.data, {
                onClose: () => {
                    navigate("/trainer/dashboard");
                }
            })
            setloading(false);
        }
    }

    return (
        <Container>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-2 mt-4'>
                <section>
                    <div className='bg-gray-100 rounded-lg p-3 mb-3'>
                        <h2 className='text-xl mb-3'>Class code</h2>
                        <div className='bg-white p-3 rounded-lg shadow mb-3'>
                            <p>{detail?.join_code}</p>
                        </div>
                    </div>

                    <div className='bg-gray-100 rounded-lg p-3'>
                        <h2 className='text-xl mb-3'>Upcoming</h2>
                        <div className='bg-white p-3 rounded-lg shadow mb-3'>
                            <p>Woohoo, no work due soon!</p>
                        </div>
                    </div>
                </section>

                <section className='ms-1 col-span-2'>
                    <div className='bg-gray-100 rounded-lg p-3 mb-3'>
                        <h2 className='text-xl mb-4'>Stream</h2>
                        <div className='bg-white p-4 rounded-lg shadow mb-4'>
                            <div className='flex items-center mb-2'>
                                <div className='bg-gray-300 h-10 w-10 rounded-full flex items-center justify-center mr-2'>
                                    <span className='text-lg font-bold'>M</span>
                                </div>
                                <div>
                                    <h3 className='text-lg font-bold'>Muhammad Noman</h3>
                                    <p className='text-gray-600'>Jan 5</p>
                                </div>
                            </div>
                            <p className='text-sky-600 mb-2 cursor-pointer break-all'>https://drive.google.com/drive/folders/1zTv6xmBOCbkx2JRm8BV-hFXBzdkfPfMU</p>
                            <div className='flex flex-wrap'>
                                <div className='bg-gray-200 rounded-lg p-2 m-1'>
                                    Binary File
                                </div>
                                <div className='bg-gray-200 rounded-lg p-2 m-1'>
                                    Unknown File
                                </div>
                            </div>
                        </div>
                    </div>

                    <section>
                        <div className='bg-gray-100 rounded-lg p-3 mb-3'>
                            <h2 className='text-xl mb-4 ms-1'>Assignemnt</h2>
                            {assignments.length > 0 ? assignments.map((assignment, index) => (

                                <div className='bg-white shadow p-4 rounded-lg mb-4 hover:shadow-md hover:cursor-pointer hover:-translate-y-1 hover:transition-all' key={index}
                                    onClick={() => navigate(`/trainer/${classId}/${assignment._id}`)}
                                >
                                    <h3 className='text-lg font-bold'>{assignment?.title}</h3>
                                    <p className='text-gray-600'>Due date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                                </div>

                            )) : (
                                <div>
                                    <p>No assignments</p>
                                </div>
                            )}
                        </div>
                    </section>

                </section>
            </div>
        </Container>
    )
}
