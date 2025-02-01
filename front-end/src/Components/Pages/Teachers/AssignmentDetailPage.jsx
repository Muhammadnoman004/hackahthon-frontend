import { Alert, Button, Spin } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { FaArrowLeft, FaDownload } from 'react-icons/fa6'
import { LiaClipboardListSolid } from 'react-icons/lia'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../../../api/api'
import loader from '../../../Context/LoaderContext'

export default function AssignmentDetailPage() {

    const navigate = useNavigate();
    const { classId, assignmentId } = useParams();
    const [error, setError] = useState(null);
    const [loading, setloading] = useContext(loader);
    const [load, setload] = useState(true);
    const [report, setReport] = useState(null);


    useEffect(() => {
        fetchAssignment();
    }, [assignmentId])

    const fetchAssignment = async () => {
        setloading(true);
        setload(true);
        setError(null);
        try {
            const userId = localStorage.getItem('userId')
            const res = await api.get(`/api/assignments/${assignmentId}/report/${userId}`);
            console.log(res.data);
            setloading(false);
            setload(false);
            setReport(res.data);
        } catch (error) {
            setloading(false);
            setload(false);
            if (error.res && error.res.status == 404) {
                setReport(null);
                return;
            }
            setError('Failed to load assignment details. Please try again later.');
        }
    };

    if (error) {
        return (
            <div className='p-4'>
                <Alert message="Error" description={error} type='error' showIcon />
            </div>
        )
    }

    return (
        <Container>
            <div className='mt-4'>
                {
                    load ? (
                        <div className='flex justify-center items-center h-screen '>
                            <Spin size='large' />
                        </div>
                    ) : error || !report ?
                        error ? (
                            <div className='p-4'>
                                <Alert message="Error" description={error} type='error' showIcon />
                            </div>
                        ) : (
                            <div className='p-4'>
                                <Alert message="Assignment not found" description={'The requested assignment could not be found.'} type='warning' showIcon />
                            </div>
                        ) : (
                            <div>
                                <header className='bg-teal-600 text-white p-4 rounded-lg mb-4'>
                                    <h1 className='text-2xl font-semibold flex items-center gap-3'>
                                        <button className='border-2 p-2 text-xl rounded-full hover:border-sky-blue transition-all' onClick={() => navigate(-1)}>
                                            <FaArrowLeft />
                                        </button>
                                        {report?.assignmentTitle}
                                    </h1>
                                    <p className='text-sm ml-14'>{report?.description}</p>
                                </header>

                                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-2'>
                                    <section className='col-span-2'>
                                        <div className='p-4'>
                                            <div className='mb-4'>
                                                <h2 className='text-3xl flex gap-3 items-center'><LiaClipboardListSolid /> {report?.description}</h2>
                                                <h3 className='ms-11 mt-2 text-gray-700'>Due: {new Date(report?.dueDate).toLocaleDateString()}</h3>
                                            </div>

                                            <div className='bg-gray-100 rounded-lg p-4 shadow mb-4 mt-3'>
                                                <p>{report?.description}</p>
                                                <div className='border-t-2 mt-4 pt-4'>
                                                    <h2 className='text-xl font-bold mb-3'>Assignment File:</h2>
                                                    {report?.assignmentFile ?
                                                        (
                                                            <Button
                                                                type='primary'
                                                                icon={<FaDownload />}
                                                                href={report?.assignmentFile}
                                                                target='_blank'
                                                                className='mb-3'
                                                            >Download Assignment</Button>
                                                        ) : (
                                                            <p>No file attached to this assignment.</p>
                                                        )}
                                                </div>
                                            </div>

                                        </div>
                                    </section>

                                    <section className='bg-gray-100 rounded-lg p-4 shadow h-max'>
                                        <Link to={`/trainer/${classId}/${assignmentId}/submissions`} className='text-xl mb-4 hover:text-sky-blue'>See Submissions</Link>
                                    </section>
                                </div>
                            </div>
                        )
                }
            </div>
        </Container>
    )
}
