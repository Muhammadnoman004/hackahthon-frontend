import React, { useContext, useEffect, useState } from 'react'
import api from '../../../api/api';
import { useParams } from 'react-router-dom';
import useFetchProfile from '../../../utils/useFetchProfile';
import { toast } from 'react-toastify';
import loader from '../../../Context/LoaderContext';
import Classfellowslisting from '../../Classfellowslisting/Classfellowslisting';

export default function AllClassFellowsPage() {

    const { classId } = useParams();
    const { user } = useFetchProfile();
    const [trainerData, setTrainerData] = useState([]);
    const [studentsData, setStudentsData] = useState([])
    const [loading, setloading] = useContext(loader);

    useEffect(() => {
        getAllClassFellows()
    }, [user])

    const getAllClassFellows = () => {

        setloading(true);
        api.get(`/api/classes/classmates/${classId}`)
            .then(res => {
                console.log(res);
                setTrainerData([...trainerData, res.data.teacher]);
                setStudentsData([...studentsData, ...res.data.students]);
                setloading(false);
            })
            .catch(err => {
                toast.error(err?.response.data.error);
                setloading(false);
            })
    }

    return (
        <div>
            <div className='flex text-2xl font-extrabold mb-4 mt-4'>
                <div className='flex-1'>
                    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight mb-1">Teacher</h3>
                </div>
            </div>

            <div className='mb-4'>
                {
                    trainerData && <Classfellowslisting data={trainerData} />
                }
            </div>

            <div className='flex text-2xl font-extrabold mb-4'>
                <div className='flex-1'>
                    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight mb-1">Classmates</h3>
                    <p className='text-sm font-normal'>Get to know your fellow students!</p>
                </div>
            </div>

            <div className='mb-4'>
                <Classfellowslisting data={studentsData} classId={classId} />
            </div>

        </div>
    )
}
