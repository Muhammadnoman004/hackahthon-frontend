import { CheckCircleOutlined, CheckCircleTwoTone, ClockCircleOutlined, FileOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, InputNumber, Modal, Progress, Select, Tabs, Tooltip } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { FaArrowLeft } from 'react-icons/fa6'
import api from '../../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import loader from '../../Context/LoaderContext'

export default function AssignmentSubmissions() {


    const { classId, assignmentId } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useContext(loader);
    const navigate = useNavigate();


    useEffect(() => {
        fetchData()
        console.log("Submissions Data:", submissions);

    }, [assignmentId, classId]);

    const fetchData = async () => {
        setloading(true);
        try {
            const [submissionsResponse, studentsResponse] = await Promise.all([
                api.get(`/api/assignments/${assignmentId}/submissions`),
                api.get(`api/classes/students/${classId}`)
            ]);
            console.log(submissionsResponse);
            console.log(studentsResponse);

            setSubmissions(submissionsResponse.data);
            setStudents(studentsResponse.data);
            setError('');
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.response?.data?.error, 'Failed to fetch data')
        } finally {
            setloading(false);
        }
    };


    const submittedStudentIds = submissions.map(sub => sub.student_id);
    const notSubmittedStudents = students.filter(student => !submittedStudentIds.includes(student._id));

    const renderStudentCard = (student, isSubmission = false, submission = null) => (
        <Card
            key={student._id}
            className='w-full mb-4 hover:shadow-lg transition-shadow duration-300 p-0 h-fit'
            styles={{ body: { padding: "20px 10px", width: "100%", display: "flex", flexWrap: "wrap", gap: "10px" } }}
            actions={isSubmission ? [
                <Tooltip title="Evaluate">
                    <Button type='primary' icon={<CheckCircleOutlined />}>
                        Evaluate
                    </Button>
                </Tooltip>
            ] : [
                <Tooltip title="Not submitted">
                    <ClockCircleOutlined style={{ color: "#faad14" }} />
                </Tooltip>
            ]}
        >

            <Card.Meta
                avatar={<UserOutlined className='text-2xl' />}
                title={student.usrname}
                description={<div className='break-all'>{student.email}</div>}
                className='flex items-center'
            />
            {isSubmission && (

                <div className='mt-4'>
                    <p className='text-sm text-gray-500'>
                        Submitted: {new Date(submission.submissionDate).toLocaleString()}
                    </p>
                    <p className='mt-2'>{submission.description}</p>
                    {submission.file_link && (

                        <a
                            href="#"
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-500 hover:underline mt-2 inline-flex items-center'
                        >
                            <FileOutlined className='mr-1' /> View Submitted File
                        </a>
                    )}
                    {submission.marks !== undefined && (
                        <div className='mt-4'>
                            Obtained marks: {submission.marks}
                            <p className='text-sm mt-2'>Rating: {submission.rating || 'Not rated'}</p>
                            <p className='text-sm mt-1'>Remark: {submission.remark || 'no remark'}</p>
                        </div>
                    )}

                </div>
            )}

        </Card>
    )

    const tabItems = [
        {
            label: (
                <span><CheckCircleTwoTone className='pe-1' />
                    Submitted ({submissions.length})
                </span>
            ),
            key: '1',
            children: (
                submissions.length === 0 ? (
                    < p className='text-center text-gray-500 py-4' > No submissions yet.</p>
                ) : (
                    <div className='!block sm:!grid sm:gap-3 sm:grid-cols-2 md:grid-cols-3'>
                        {submissions.map((submission) => renderStudentCard(submission.student, true, submission))}
                    </div>
                )
            )
        },
        {
            label: (
                <span><CheckCircleTwoTone className='pe-1' />
                    Not Submitted ({notSubmittedStudents.length})
                </span>
            ),
            key: '2',
            children: (
                notSubmittedStudents.length === 0 ? (
                    <p className='text-center text-gray-500 py-4'>All students have submitted.</p>
                ) : (
                    <div className='!block sm:!grid sm:gap-3 sm:grid-cols-2 md:grid-cols-3'>
                        {notSubmittedStudents.map((student) => renderStudentCard(student))}
                    </div>
                )
            )
        }
    ];

    return (
        <Container>
            <div className='pt-3'>
                <div className=''>
                    <h1 className='text-3xl font-bold mb-8 flex items-center gap-4'>
                        <button className='p-2 hover:bg-gray-300 bg-gray-100 rounded-full transition-all '
                            title='Back to previous page'
                            onClick={() => navigate(-1)}
                        >
                            <FaArrowLeft />
                        </button>
                        Assignment Submissions
                    </h1>

                    <Card className='mb-8 bg-gray-50 shadow-md'>
                        <div className='flex justify-between items-center flex-wrap gap-3'>
                            <div>
                                <h2 className='text-xl font-semibold mb-4 break-words'>Submission Overview</h2>
                                <p>Total Students: {students.length}</p>
                                <p>Submissions: {submissions.length}</p>
                                <p>Remaining: {notSubmittedStudents.length}</p>
                            </div>
                            <div className='w-full sm:w-auto flex justify-center'>
                                <Tooltip title={'submitted'}>
                                    <Progress
                                        type='circle'
                                        percent={20}
                                        size={120}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    </Card>


                    <Tabs defaultActiveKey='1' type='card'
                        className='bg-gray-50 p-4 rounded-lg shadow-md w-full'
                        items={tabItems}
                    />


                    <Modal

                        title="Evaluate Submission"
                        footer={null}
                        className='max-w-full'
                    >
                        <Form layout='vertical'>
                            <Form.Item
                                name="marks"
                                label="Marks"
                                rules={[
                                    { required: true, message: 'Please input marks' },
                                    { type: 'number', min: 0, max: 100, message: 'Marks must be between 0 and 100' }
                                ]}
                            >
                                <InputNumber min={0} max={100} className='w-full' />
                            </Form.Item>
                            <Form.Item
                                name="rating"
                                label="Rating"
                                rules={[
                                    { required: true, message: 'Please select a rating' }
                                ]}
                            >
                                <Select>
                                    <Select.Option value="Excellent">Excellent</Select.Option>
                                    <Select.Option value="Good">Good</Select.Option>
                                    <Select.Option value="Fair">Fair</Select.Option>
                                    <Select.Option value="Poor">Poor</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name='remark'
                                label="Remark"
                                rules={[
                                    { required: false }
                                ]}
                            >
                                <Input.TextArea placeholder='Enter any remarks (optional)' />
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary' htmlType='submit' className='w-full'>
                                    Submit Evaluation
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>

                </div>

            </div>
        </Container>
    )
}
