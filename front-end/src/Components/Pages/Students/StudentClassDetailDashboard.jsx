import { Popover, Button } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { BsThreeDotsVertical } from "react-icons/bs";
import StudentClassDetailPage from './StudentClassDetailPage';
import StudentAllAssignmentListingPage from './StudentAllAssignmentListingPage';
import Classfellowslisting from '../../Classfellowslisting/Classfellowslisting';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/api';
import { toast } from 'react-toastify';
import loader from '../../../Context/LoaderContext';
import Loader from '../../Loader/Loader';
import AllClassFellowsPage from './AllClassFellowsPage';

export default function StudentClassDetailDashboard() {

    const [selectedComponent, setSelectedComponent] = useState('Stream');
    const [classDetails, setClassDetails] = useState(null);
    const [loading, setloading] = useContext(loader);
    const studentId = localStorage.getItem('userId');
    const [open, setOpen] = useState(false);
    const { classId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getClassDetail();
    }, [])

    const getClassDetail = () => {
        setloading(true);
        api.get(`/api/classes/student/class/${classId}`)
            .then(res => {
                setloading(false);
                setClassDetails(res.data);
            })
            .catch(err => {
                setloading(false);
                toast.error(err.response.data);
            })
    }
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };


    const unEnrollByClass = async () => {
        setloading(true)
        try {
            const response = await api.delete(`/api/classes/student/class/${classId}`)
            setloading(false);
            toast.success(response.data.message, {
                onClose: () => {
                    navigate('/')
                }
            })
        }
        catch (error) {
            toast.error(error.response.data);
            setloading(false);
        }
    }

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Stream':
                return <StudentClassDetailPage />
            case "Classwork":
                return <StudentAllAssignmentListingPage />
            case "People":
                return <AllClassFellowsPage />
            default:
                return null;
        }
    }

    return (
        <Container className='p-0'>
            <div className='mt-4 mb-4'>
                <header className='bg-teal-600 text-white rounded-lg p-3 font-semibold mb-4'>
                    <h1 className='text-2xl'>{classDetails?.name}</h1>
                    <p>{classDetails?.description}</p>
                </header>
                <div className='flex justify-between items-center gap-3 px-1 mb-0'>
                    <div className='flex gap-3 flex-wrap items-center justify-between'>
                        <Button
                            className="custom-button"
                            style={selectedComponent === 'Stream' ? {
                                backgroundColor: 'skyblue',
                                borderColor: 'skyblue',
                                color: 'white',
                            } : {
                                backgroundColor: 'white',
                                borderColor: 'skyblue',
                                color: 'black',
                            }
                            }
                            onClick={() => setSelectedComponent('Stream')}
                        > Stream</Button>
                        <Button
                            className="custom-button"
                            style={selectedComponent === 'Classwork' ? {
                                backgroundColor: 'skyblue',
                                borderColor: 'skyblue',
                                color: 'white',
                            } : {
                                backgroundColor: 'white',
                                borderColor: 'skyblue',
                                color: 'black',
                            }
                            }
                            onClick={() => setSelectedComponent('Classwork')}
                        >Classwork</Button>
                        <Button
                            className="custom-button"
                            style={selectedComponent === 'People' ? {
                                backgroundColor: 'skyblue',
                                borderColor: 'skyblue',
                                color: 'white',
                            } : {
                                backgroundColor: 'white',
                                borderColor: 'skyblue',
                                color: 'black',
                            }
                            }
                            onClick={() => setSelectedComponent("People")}
                        >People</Button>
                        <Button
                            className="custom-button"
                            style={{
                                backgroundColor: 'white',
                                borderColor: 'skyblue',
                                color: 'black',
                            }}
                            onClick={() => navigate(`/student/${classId}/${studentId}/report`)}
                        >View Report</Button>
                    </div>
                    <Popover
                        content={<p className='cursor-pointer' onClick={() => unEnrollByClass()}>Unenroll</p>}
                        trigger="click"
                        placement='bottomRight'
                        open={open}
                        onOpenChange={handleOpenChange}
                    >
                        <div className='cursor-pointer hover:bg-gray-200 rounded-full p-2'>
                            <BsThreeDotsVertical />
                        </div>
                    </Popover>
                </div>
                <div>
                    {loading && <Loader />}
                </div>
                <div>
                    {renderComponent()}
                </div>
            </div>
        </Container >
    )
}
