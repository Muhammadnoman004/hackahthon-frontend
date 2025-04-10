import { Button, Popover } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import TeacherClassDetailPage from './TeacherClassDetailPage';
import AllAssignmentListing from './AllAssignmentListing';
import AllClassFellowsPage from './AllClassFellowsPage';
import api from '../../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import loader from '../../../Context/LoaderContext';
import { toast } from 'react-toastify';
import UpdateClassModal from '../../UpdateClassModal/UpdateClassModal';

export default function TeacherClassDetailDashboard() {

    const [selectedComponent, setSelectedComponent] = useState('Stream');
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { classId } = useParams();
    const [detail, setDetail] = useState();
    const [loading, setloading] = useContext(loader);
    const navigate = useNavigate();

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    useEffect(() => {
        getClassDetail()
    }, [])

    const getClassDetail = async () => {
        setloading(true);
        try {
            const response = await api.get(`/api/classes/trainer/class/${classId}`);
            setDetail(response.data);
            setloading(false);

        } catch (error) {
            toast.error(error.response.data, {
                onClose: () => {
                    navigate('/trainer/dashboard')
                }
            })
            setloading(false);
        }
    }


    const handleOpen = () => {
        setOpen(false)
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const renderComponent = () => {
        switch (selectedComponent) {
            case "Stream":
                return <TeacherClassDetailPage />
            case "Classwork":
                return <AllAssignmentListing />
            case "People":
                return <AllClassFellowsPage />
            default: return null;
        }
    }

    return (
        <Container fluid>
            <div className='p-4 ps-6'>
                <header className='bg-teal-600 text-white rounded-lg p-3 font-semibold mb-4'>
                    <h1 className='text-2xl'>{detail?.name}</h1>
                    <p>{detail?.description}</p>
                </header>
                <div className='flex justify-between items-center gap-3 px-1 mb-0'>
                    <div className='flex gap-3 flex-wrap items-center sm:justify-between'>
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
                    </div>
                    <Popover
                        content={<p className='cursor-pointer' onClick={() => handleOpen()}>Setting</p>}
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
                    {renderComponent()}
                </div>
                <UpdateClassModal open={isModalOpen} closeModal={handleCloseModal} getClassDetail={getClassDetail} detail={detail} />
            </div>
        </Container >
    )
}
