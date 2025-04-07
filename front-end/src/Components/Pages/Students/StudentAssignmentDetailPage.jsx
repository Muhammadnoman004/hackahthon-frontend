import { Alert, Button, Dropdown, Input, Modal, Progress, Space, Spin, Tag, Upload } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { FaArrowLeft, FaPlus } from 'react-icons/fa'
import { FaDownload } from 'react-icons/fa6'
import { IoLink } from 'react-icons/io5'
import { LiaClipboardListSolid } from 'react-icons/lia'
import { MdAttachFile } from 'react-icons/md'
import api from '../../../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchProfile from '../../../utils/useFetchProfile'
import loader from '../../../Context/LoaderContext'
import uploadFileToFirebase from '../../../utils/uploadFileToFirebase'
import { toast } from 'react-toastify'
import Loader from '../../Loader/Loader'

function StudentAssignmentDetailPage() {

    const { user } = useFetchProfile();
    const { classId, assignmentId } = useParams();
    const [loading, setLoading] = useContext(loader);
    const [load, setLoad] = useState(false);
    const [submitModalVisible, setSubmitModalVisible] = useState(false);
    const [report, setReport] = useState(null);
    const [error, setError] = useState(null);
    const [dropDownItem, setDropDownItem] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [file, setFile] = useState(null);
    const [submissionText, setSubmissionText] = useState();
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAssignmentReport();
    }, [assignmentId])

    const fetchAssignmentReport = async () => {
        setLoading(true)
        setLoad(true);
        setError(null);
        try {
            const userId = localStorage.getItem('userId');
            const response = await api.get(`/api/assignments/${assignmentId}/report/${userId}`);
            setLoading(false);
            setLoad(false);
            setReport(response.data);

        } catch (error) {
            setLoading(false);
            setLoad(false);
            if (error.response && error.response.status === 404) {
                setReport(null);
                return;
            }
            setError('Failed to load assignment details. Please try again later.');
        }
    }

    const showSubmitModal = () => setSubmitModalVisible(true);

    const handleSubmitCancel = () => {
        setSubmitModalVisible(false);
        setUploadProgress(0);
        setFile(null);
        setSubmissionText(null);
    }


    const handleSubmitOk = async () => {
        setSubmitting(true);
        try {
            if (dropDownItem === 'file') {
                if (!file) {
                    console.error('No file selected');
                    return;
                }
                // Upload file to Firebase
                const uploadedFileLink = await uploadFileToFirebase(
                    file,
                    `users/student/${user._id}/assignments/${file.name}`,
                    (progress) => {
                        setUploadProgress(progress);
                    }
                );

                // Submit assignment data to your API
                const assignmentData = {
                    student: user._id,
                    description: '', // Add description if needed
                    date: new Date(),
                    fileLink: uploadedFileLink
                };

                const res = await api.post(`/api/assignments/${assignmentId}/submit`, assignmentData);

                toast.success(res.data.message);
            } else {
                const assignmentData = {
                    student: user._id,
                    description: '',
                    date: new Date(),
                    fileLink: submissionText
                }

                const res = await api.post(`/api/assignments/${assignmentId}/submit`, assignmentData);

                toast.success(res.data.message);
            }

            setSubmitModalVisible(false);
            fetchAssignmentReport();

        } catch (error) {
            console.error('Error submitting assignment:', error);
            setError('Failed to submit assignment. Please try again.');

        } finally {
            setSubmitting(false);
            setUploadProgress(0);
            setFile(null);
        }

    };

    const handleUnSubmit = async () => {
        setLoading(true);
        try {
            const res = await api.delete(`/api/assignments/student/${assignmentId}`);
            toast.success(res.data.message);
            fetchAssignmentReport();
            setLoading(false);
        } catch (error) {
            console.error("error --->", error);
            setLoading(false);
        }
    };

    const renderFilePreview = (fileLink) => {
        if (!fileLink) return null;
        if (fileLink.match(/\.(jpeg|jpg|gif|png)$/i)) {
            return <img src={fileLink} alt="Assignment file" className="w-full h-64 object-contain" />;
        } else if (fileLink.match(/\.pdf$/i)) {
            return <iframe src={fileLink} className="w-full h-64 border rounded-md" title='PDF Preview'></iframe>
        } else {
            return (
                <div className='mb-9'>
                    <a className="bg-gray-100 p-4 rounded-md shadow text-center py-2 px-2 font-semibold break-all text-gray-500 hover:text-sky-blue" href={fileLink} target='_blank'>
                        fileLink
                    </a>
                </div>
            );
        }
    };

    if (error) {
        return (
            <div className='p-4'>
                <Alert message="Error" description={error} showIcon type='error' />
            </div>
        );
    }

    const items = [
        {
            key: 'link',
            label: (
                <p>
                    Link
                </p>
            ),
            icon: <IoLink />,
        },
        {
            key: 'file',
            label: (<p>File</p>),
            icon: <MdAttachFile />,
        },
    ];

    const onClick = ({ key }) => {
        setDropDownItem(key);
        showSubmitModal()
    }

    return (
        <div className='p-4'>
            <Container fluid>
                {
                    load ? (
                        <div className='flex justify-center items-center h-screen'>
                            <Spin size='large' />
                        </div>
                    ) : error || !report ?
                        error ? (
                            <div className='p-4'>
                                <Alert message="Error" description={error} type='error' showIcon />
                            </div>
                        ) : (
                            <div className='p-4'>
                                <Alert message="Assignment not found" description="The requested assignment could not be found." type='warning' showIcon />
                            </div>
                        ) : (
                            <div>
                                <header className='bg-teal-600 text-white p-4 rounded-lg mb-4'>
                                    <h1 className='text-2xl font-semibold flex items-center gap-3'>
                                        <button className='border-2 p-2 text-xl rounded-full hover:border-sky-blue transition duration-200' onClick={() => navigate(-1)}>
                                            <FaArrowLeft />
                                        </button>
                                        {report?.assignmentTitle}
                                    </h1>
                                    <p className='text-md ml-14'>{report?.description}</p>
                                </header>

                                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-2'>
                                    <section className='col-span-2'>
                                        <div className=' rounded-lg p-4'>
                                            <div className='mb-4'>
                                                <h2 className='text-3xl flex gap-3 items-center'>
                                                    <LiaClipboardListSolid /> {report?.assignmentTitle}
                                                </h2>
                                                <h3 className='ms-11 mt-2 text-gray-700'>
                                                    Due: {new Date(report?.dueDate).toLocaleDateString()}
                                                </h3>
                                            </div>
                                            <div className='bg-gray-100 p-4 rounded-lg shadow mb-4 mt-3'>
                                                <p>{report?.description}</p>
                                                <div className='border-t-2 mt-4 pt-4'>
                                                    <h2 className='text-xl font-bold mb-3'>Assignment File:</h2>
                                                    {report?.assignmentFile ? (
                                                        <Button
                                                            type='primary'
                                                            icon={<FaDownload />}
                                                            href='#'
                                                            target='_blank'
                                                        >
                                                            Download Assignment
                                                        </Button>
                                                    ) : (
                                                        <p>No file attached to this assignment.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className='bg-gray-100 p-4 rounded-lg shadow h-max'>
                                        <h2 className='text-xl mb-4'>Your Submission</h2>
                                        {
                                            report?.submissionDate ? (
                                                <>
                                                    <div className='mb-4'>
                                                        <p>Submitted on: {new Date(report.submissionDate).toLocaleString()}</p>
                                                        <p>Status <Tag color={report.marks !== undefined ? "green" : "orange"}>
                                                            {report.marks !== undefined ? "Evaluated" : "Submitted"}
                                                        </Tag></p>
                                                        <p>Total Marks: {report.totalMarks}</p>
                                                        {report.marks !== undefined && (
                                                            <>
                                                                <p>Obtained Marks: {report.marks}</p>
                                                                <Progress
                                                                    percent={Math.round((report.marks / report.totalMarks) * 100)}
                                                                    status='active'
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                    {renderFilePreview(report.submittedFileLink)}
                                                    {report.rating && (
                                                        <div className='mt-4'>
                                                            <h3 className='font-bold mb-2'>Rating:</h3>
                                                            <p>{report.rating}</p>
                                                        </div>
                                                    )}
                                                    {report.remark && (
                                                        <div className='mt-4'>
                                                            <h3 className='font-bold mb-2'>Remark:</h3>
                                                            <p>{report.remark}</p>
                                                        </div>
                                                    )}

                                                    <div className='mt-3'>
                                                        <Button className='w-full text-sky-blue' onClick={handleUnSubmit}>Unsubmit</Button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div>
                                                    <Dropdown
                                                        menu={{
                                                            items,
                                                            onClick
                                                        }}
                                                        trigger={['click']}
                                                    >
                                                        <Button className='w-full text-sky-blue'>
                                                            <Space>
                                                                <FaPlus /> Add or create
                                                            </Space>
                                                        </Button>
                                                    </Dropdown>
                                                </div>

                                            )}

                                    </section>
                                </div>
                                {loading && <Loader />}
                            </div>
                        )
                }

                <Modal
                    title="Submit Assignment"
                    open={submitModalVisible}
                    onCancel={handleSubmitCancel}
                    footer={null}
                >
                    {
                        dropDownItem === 'file' ? (
                            <>
                                <Upload
                                    beforeUpload={(file) => {
                                        setFile(file);
                                        return false;
                                    }}
                                    onRemove={() => setFile(null)}
                                    fileList={file ? [file] : []}
                                >
                                    <Button icon={<FaPlus />} loading={submitting} disabled={submitting}>
                                        {submitting ? 'Uploading...' : 'Select File to Submit'}
                                    </Button>
                                </Upload>
                                {uploadProgress > 0 && (
                                    <Progress percent={uploadProgress} status='active' />
                                )}

                                <Button
                                    type='primary'
                                    onClick={handleSubmitOk}
                                    disabled={!file || submitting}
                                    loading={submitting}
                                    style={{ marginTop: 16 }}
                                >
                                    Submit
                                </Button>
                            </>
                        ) : (
                            <>
                                <Input
                                    type='text'
                                    placeholder='Enter your submission here...'
                                    value={submissionText}
                                    onChange={(e) => setSubmissionText(e.target.value)}
                                    disabled={submitting}
                                />
                                <Button
                                    type='primary'
                                    onClick={handleSubmitOk}
                                    disabled={!submissionText || submitting}
                                    loading={submitting}
                                    style={{ marginTop: 16 }}
                                >
                                    Submit
                                </Button>
                            </>
                        )

                    }

                </Modal>

            </Container>
        </div>
    )
}

export default StudentAssignmentDetailPage