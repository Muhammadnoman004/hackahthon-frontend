import React, { useContext, useEffect, useState } from 'react'
import { BellFilled } from '@ant-design/icons'
import { AiOutlinePlus } from "react-icons/ai";
import { Container } from 'react-bootstrap';
import { Card } from 'antd';
import ClassModal from '../../ClassModal/ClassModal';
import userProfileIcon from '../../../assets/user-profile-icon.png';
import NotImage from '../../../assets/noImage.jpg'
import api from '../../../api/api';
import loader from '../../../Context/LoaderContext';
import Loader from '../../Loader/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;

export default function TeacherHomePage() {

    const [loading, setloading] = useContext(loader)
    const [load, setload] = useState(true)
    const [classes, setClasses] = useState([])
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setloading(true);
        if (classes.length === 0) {
            setloading(false)
            getAllClasses()
        }
    }, [])


    const getAllClasses = () => {
        setloading(true);
        setload(true);
        api.get("/api/classes")
            .then(res => {
                setClasses(res.data);
                setloading(false);
                setload(false);
            })
            .catch(err => {
                setloading(false);
                setload(false);
                toast.error("Something went wrong!");
            })
    }

    const showModal = () => {
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    }

    return (
        <div>
            <Container>
                <ClassModal open={open} closeModal={closeModal} getAllClasses={getAllClasses} />
                <div className='flex m-4 text-2xl font-mono font-extrabold'>
                    <h1 className='flex-1'>Trainer Dashboard</h1>
                    <div className='flex gap-3'>
                        <div className='hover:rounded-full hover:bg-slate-200 cursor-pointer font-bold' onClick={showModal}>
                            <AiOutlinePlus title='Add Trainer' className='text-3xl p-0.5' />
                        </div>
                        <div>
                            <BellFilled className='flex text-amber-400' />
                        </div>
                    </div>
                </div>
                <div className='m-4 text-2xl font-sans font-bold text-sky-blue'>
                    <h2>My Classes</h2>
                </div>


                <div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                        {loading ?
                            <Card loading={loading}></Card> : classes.length === 0 ? (
                                <div className='text-2xl'>You haven't created any class yet!</div>
                            ) : classes.map((eachClass, index) => (
                                <div key={index}>

                                    <Card
                                        hoverable
                                        style={{
                                            width: 300,
                                            margin: 'auto',
                                            marginBottom: 30
                                        }}
                                        cover={<img alt="example" className='size-36 object-cover' style={{ borderRadius: "10px" }} src={!eachClass.classImage ? NotImage : eachClass.classImage} />}
                                        onClick={() => navigate(`/trainer/class/${eachClass._id}`)}
                                    >
                                        <div className='flex relative bottom-12'>
                                            <h1 className='flex-1 relative top-8 right-3 font-semibold'>{eachClass.description}</h1>
                                            <img className='size-12 rounded-full bg-white object-cover' src={!eachClass.teacher?.profileImg ? userProfileIcon : eachClass.teacher?.profileImg} alt="" />
                                        </div>

                                        <div className='flex'>
                                            <Meta title={eachClass.name} className='flex-1 relative right-3' />
                                            <Meta title={eachClass.teacher?.username} className='relative left-3' />
                                        </div>
                                    </Card>
                                </div>
                            )
                            )}
                    </div>
                </div>

                {loading && <Loader />}
            </Container >
        </div >
    )
}