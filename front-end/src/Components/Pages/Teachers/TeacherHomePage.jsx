import React, { useContext, useEffect, useState } from 'react'
import { BellFilled } from '@ant-design/icons'
import { AiOutlinePlus } from "react-icons/ai";
import { Row, Col, Container } from 'react-bootstrap';
import { Card } from 'antd';
import ClassModal from '../../ClassModal/ClassModal';
import userProfileIcon from '../../../assets/user-profile-icon.png';
import api from '../../../api/api';
import loader from '../../../Context/LoaderContext';
import Loader from '../../Loader/Loader';
import { toast } from 'react-toastify';
const { Meta } = Card;

export default function TeacherHomePage() {

    const [loading, setloading] = useContext(loader)
    const [load, setload] = useState(true)
    const [classes, setClasses] = useState([])
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setloading(true);
        if (classes.length === 0) {
            getAllClasses()
            setloading(false)
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
                console.log("response ---->", res.data);

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
                <ClassModal open={open} closeModal={closeModal} />
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

                    <Row>
                        <Col xs={12} md={6} lg={4}>
                            {loading ?
                                <Card loading={loading}></Card> : classes.length === 0 ? (
                                    <div>You haven't created any class yet!</div>
                                ) : classes.map((eachClass, index) => (
                                    <div key={index}>

                                        <Card
                                            hoverable
                                            style={{
                                                width: 300,
                                                margin: 'auto',
                                                marginBottom: 30
                                            }}
                                            cover={<img alt="example" className='size-36' style={{ borderRadius: "10px" }} src={eachClass.classImage} />}
                                        >
                                            <div className='flex relative bottom-12'>
                                                <h1 className='flex-1 relative top-8 right-3 font-semibold'>{eachClass.description}</h1>
                                                <img className='size-12 rounded-full bg-white' src={userProfileIcon} alt="" />
                                            </div>

                                            <div className='flex'>
                                                <Meta title={eachClass.name} className='flex-1 relative right-3' />
                                                <Meta title="Sir Saad" className='relative left-3' />
                                            </div>
                                        </Card>
                                    </div>
                                )
                                )}
                        </Col>

                        <Col xs={12} md={6} lg={4}>
                            <Card
                                hoverable
                                style={{
                                    width: 300,
                                    margin: 'auto',
                                    marginBottom: 30
                                }}
                                cover={<img alt="example" className='size-36' style={{ borderRadius: "10px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvPIQRaKMkaQh1KFCfy8Xmz4H_Jy3waZw2mw&s" />}
                            >
                                <div className='flex relative bottom-12'>
                                    <h1 className='flex-1 relative top-8 right-3 font-semibold'>Backend development</h1>
                                    <img className='size-12 rounded-full bg-white' src={userProfileIcon} alt="" />
                                </div>

                                <div className='flex'>
                                    <Meta title="Batch-9" className='flex-1 relative right-3' />
                                    <Meta title="Sir Raja Ehsan" className='relative left-3' />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>

                {loading && <Loader />}
            </Container>
        </div>
    )
}