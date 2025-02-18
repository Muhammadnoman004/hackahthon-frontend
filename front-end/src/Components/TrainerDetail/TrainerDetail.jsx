import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api/api';
import loader from '../../Context/LoaderContext';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';

function TrainerDetail() {

    const { teacherId } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [loading, setloading] = useContext(loader);
    const navigate = useNavigate();


    useEffect(() => {
        getTrainerDetail()
    }, [])

    const getTrainerDetail = () => {
        setloading(true);
        api.get(`/api/users/trainer/${teacherId}`)
            .then(res => {
                setloading(false);
                console.log(res.data);
                setTeacher(res.data);
            })
            .catch(err => {
                setloading(false);
                toast.error(err.res.data.message, {
                    onClose: () => {
                        navigate(-1);
                    }
                });
            })
    }


    return (
        <div className='ms-3'>
            <div className='max-w-3xl mx-auto px-3 mt-3 mb-3 '>
                <div className='rounded-lg shadow-md overflow-hidden border-2'>
                    <div className='px-3 py-4'>
                        <h1 className='text-2xl font-bold break-words'><ArrowLeftOutlined className='hover:bg-gray-300 p-2 rounded-full cursor-pointer' title='Back to Previous' onClick={() => navigate(-1)} /> Trainer Detail</h1>
                    </div>
                    <div className='px-3 py-5 pt-0'>
                        <div className='flex justify-between gap-4 px-3 flex-wrap'>
                            <div>
                                <p>Name:</p>
                                <h2 className='text-lg font-semibold capitalize'>{teacher?.username}</h2>
                            </div>
                            <div>
                                <p>Trainer Email:</p>
                                <h2 className='text-lg font-semibold'>{teacher?.email}</h2>
                            </div>
                        </div>
                        <div className='border-2 my-6' />
                        <h2 className='text-lg font-semibold mb-3'>Enrolled Classes</h2>
                        <div className='flex flex-col gap-3'>
                            {
                                loading ? <Card loading={loading}></Card> :
                                    teacher?.classes.length > 0 ? teacher.classes.map((cls) => (
                                        <Card key={cls._id} style={{ body: { padding: "10px 15px" } }} className='hover:shadow-lg cursor-pointer hover:-translate-y-1 bg-sky-100'>
                                            <div className='flex justify-between items-center'>
                                                <h1 className='text-2xl font-bold'>{cls.name} <span className='font-light text-md'>({cls.join_code})</span></h1>
                                                <ArrowRightOutlined className='hover:bg-gray-300 p-2 rounded-full h-fit cursor-pointer' title='See Detail!' />
                                            </div>
                                            <div className='mt-1 text-lg'>
                                                <p>{cls.description}</p>
                                                <p>No. of students: {cls.students.length}</p>
                                            </div>
                                        </Card>
                                    )) : (
                                        <h1 className='text-center'>No Class found of this trainer!</h1>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </div>
    )
}

export default TrainerDetail