import React, { useContext, useEffect, useState } from 'react'
import userProfileIcon from '../../../assets/user-profile-icon.png'
import { BellFilled } from '@ant-design/icons'
import { Container } from 'react-bootstrap';
import { Button, Card, Modal } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import OTPInput from 'react-otp-input';
import api from '../../../api/api';
import loader from '../../../Context/LoaderContext';
import Loader from '../../Loader/Loader';
import { toast } from 'react-toastify';
import imageNotFound from '../../../assets/noImage.jpg';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;

export default function StudentHomePage() {

    const [open, setOpen] = useState(false);
    const [otp, setOtp] = useState('');
    const [loading, setloading] = useContext(loader);
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getAllClasses()
    }, [])

    const isModalOpen = () => {
        setOpen(true);
    }
    const isModalOff = () => {
        setOpen(false);
    }

    const joinClass = () => {
        setloading(true);
        api.post("/api/classes/enroll", { join_code: otp })
            .then(res => {
                setloading(false);
                setOpen(false);
                getAllClasses();
                toast.success(res.data);

            })
            .catch(err => {
                setloading(false);
                toast.error(err.response?.data || err.message);
            })

    }

    const getAllClasses = () => {
        setloading(true);
        api.get("/api/classes/getClasses")
            .then(res => {
                setloading(false);
                console.log(res.data);
                setClasses(res.data);

            })
            .catch(err => {
                setloading(false);
                console.log(err);

            })
    }


    return (
        <Container>
            <div>
                <Modal
                    open={open}
                    title={'Join Class'}
                    footer={null}
                    okButtonProps={{
                        autoFocus: true,
                        htmlType: 'submit',
                        form: 'studentForm'
                    }}
                    onCancel={() => setOpen(false)}
                    destroyOnClose
                >
                    {loading && <Loader />}

                    <div className='text-center'>
                        <h2 className='text-4xl font-sans font-bold'>Class code</h2>
                        <p className='text-lg pt-6 pb-10'>Ask your teacher for the class code, then enter it here.</p>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={7}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{ border: "1px solid grey", fontSize: "20px", textAlign: "center", width: "72px", height: "72px", borderRadius: "10px", color: "black" }}
                            placeholder='1a2b3cd'
                            containerStyle={{ flexWrap: "wrap", gap: "10px", justifyContent: "center" }}
                        />
                        <div className='mt-4 mb-2 flex justify-center gap-3'>
                            <Button type='text' className='p-[20px] bg-sky-blue font-semibold ' disabled={otp.length !== 7} onClick={joinClass}>Join class</Button>
                            <Button className='p-[20px]' onClick={isModalOff}>Cancel</Button>
                        </div>
                    </div>

                </Modal>

                <div className='flex m-4 text-2xl font-mono font-extrabold'>
                    <h1 className='flex-1'>Student Dashboard</h1>
                    <div className='flex gap-3'>
                        <div className='hover:rounded-full hover:bg-slate-200 cursor-pointer font-bold' onClick={isModalOpen}>
                            <AiOutlinePlus title='Add Trainer' className='text-3xl p-0.5' />
                        </div>
                        <div>
                            <BellFilled className='flex text-amber-400' />
                        </div>
                    </div>
                </div>

                <div className='mx-6'>
                    <h1 className='my-4 text-xl font-sans font-bold text-sky-500'>My Classes</h1>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                        {loading ? <Card loading={loading}></Card> :
                            classes.length === 0 ? (
                                <div className='text-2xl'>You haven't enroll any class yet!</div>
                            ) : classes.map((eachClass, index) => (
                                <div key={index}>
                                    <Card
                                        hoverable
                                        style={{
                                            width: 300,
                                            margin: 'auto',
                                            marginBottom: 30
                                        }}
                                        cover={<img alt="example" className='size-36' style={{ borderRadius: "10px" }} src={!eachClass.classImage ? imageNotFound : eachClass.classImage} />}
                                        onClick={() => navigate(`/student/class/${eachClass._id}`)}
                                    >
                                        <div className='flex relative bottom-12'>
                                            <h1 className='flex-1 relative top-8 right-3 font-semibold'>{eachClass.description}</h1>
                                            <img className='size-12 rounded-full bg-white' src={userProfileIcon} alt="" />
                                        </div>

                                        <div className='flex'>
                                            <Meta title={eachClass.name} className='flex-1 relative right-3' />
                                            <Meta title={eachClass.teacher.username} className='relative left-3' />
                                        </div>
                                    </Card>

                                </div>
                            ))
                        }

                    </div>
                </div>

            </div>
        </Container>
    )
}
