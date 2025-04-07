import React, { useEffect, useState } from 'react';
import { Button, message, Modal, Progress, Space, Table, Tag, Tooltip, Upload } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, FileOutlined, PlusOutlined, UploadOutlined, WarningOutlined } from '@ant-design/icons';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchProfile from '../../utils/useFetchProfile';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import app from '../../config/Config';

const storage = getStorage(app);

const StudentListingTable = () => {

    const { classId } = useParams();
    const { user } = useFetchProfile();
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [submitModalVisible, setSubmitModalVisible] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [currentAssignment, setCurrentAssignment] = useState(null);
    const [load, setLoad] = useState(true);


    useEffect(() => {
        fetchAssignment();
    }, [classId, user])

    const fetchAssignment = async () => {
        try {
            setLoad(true);
            const response = await api.get(`/api/assignments/student/class/${classId}`);
            const formattedData = response.data?.map((assignment, idx) => ({
                key: assignment._id,
                number: `Assignment ${idx + 1}`,
                title: assignment.title,
                description: assignment.description,
                dueDate: new Date(assignment.dueDate).toLocaleDateString(),
                status: getAssignmentStatus(assignment, user?._id),
                totalMarks: assignment.total_marks,
                fileLink: assignment.fileLink,
                submitted: assignment.submissions.some(sub => sub.student.toString() === user._id.toString()),
                evaluated: assignment.submissions.some(sub => sub.student.toString() === user._id.toString() && sub.marks !== undefined),
            }));
            setAssignments(formattedData.reverse());
        }
        catch (error) {
            console.error('Error fetching assignments:', error);
            message.error('Failed to fetch assignments');
        } finally {
            setLoad(false);
        }
    };

    const getAssignmentStatus = (assignment, userId) => {
        const now = new Date();
        const dueDate = new Date(assignment.dueDate);
        if (assignment.submissions.some(sub => sub.student.toString() === userId.toString())) {
            if (assignment.submissions.some(sub => sub.student.toString() === userId.toString() && sub.marks !== undefined)) {
                return 'evaluated';
            }
            return 'submitted';
        }
        if (now > dueDate) return 'expired';
        return 'todo';
    };


    const handleSubmit = (assignment) => {
        setCurrentAssignment(assignment);
        setSubmitModalVisible(false);
    }

    const uploadFileToFirebase = (file) => {
        return new Promise((resolve, reject) => {
            const fileName = `assignments/${currentAssignment.key}/${user._id}_${file.name}`;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, fileName);

            uploadTask.on('state_changed',
                (snapShot) => {
                    const progress = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error("Upload error:", error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        })
    }

    const handleSubmitOk = async (file) => {
        if (!file) {
            message.error('Please select a file to submit');
            return;
        }

        setSubmitting(true);

        try {
            const fileLink = await uploadFileToFirebase(file);

            await api.post(`/api/assignments/${currentAssignment.key}/submit`, {
                fileLink: fileLink
            });

            message.success('Assignment submitted successfully');
            setSubmitModalVisible(false);
            fetchAssignment();
        } catch (error) {
            console.error('Error submitting assignment:', error);
            message.error('Failed to submit assignment');

        } finally {
            setSubmitting(false);
            setUploadProgress(0);
        }
    };

    const handleRowClick = (record) => {
        navigate(`/student/class/${classId}/${record.key}`);
    }

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    }

    const clearFilters = () => {
        setFilteredInfo({});
    }

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortOrder: sortedInfo.columnKey === "title" && sortedInfo.order,
            width: 130,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 200,
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            width: 130,
            sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
            sortOrder: sortedInfo.columnKey === "dueDate" && sortedInfo.order,
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            width: 150,
            filters: [
                { text: 'Todo', value: 'todo' },
                { text: 'Submitted', value: 'submitted' },
                { text: 'Evaluated', value: 'evaluated' },
                { text: 'Expired', value: 'expired' },
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status.includes(value),
            render: (status) => {
                let color = 'green';
                let icon = <CheckCircleOutlined />;
                if (status === 'expired') {
                    color = 'red';
                    icon = <WarningOutlined />;
                } else if (status === 'todo') {
                    color = 'orange';
                    icon = <ClockCircleOutlined />;
                } else if (status === 'evaluated') {
                    color = 'blue';
                    icon = <CheckCircleOutlined />;
                }
                return (
                    <Tag color={color} icon={icon}>
                        {status.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Total Marks',
            dataIndex: 'totalMarks',
            key: 'totalMarks',
            width: 100,
            sorter: (a, b) => a.totalMarks - b.totalMarks,
            sortOrder: sortedInfo.columnKey === "totalMarks" && sortedInfo.order,
            render: (marks) => <span>{marks} points</span>,
        },
        {
            title: 'Action',
            key: 'action',
            width: 200,
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="View Assignment">
                        <Button
                            type="primary"
                            icon={<FileOutlined />}
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(record.fileLink, '_blank');
                            }}
                            disabled={!record.fileLink}
                            size="small"
                        >
                            View
                        </Button>
                    </Tooltip>
                    <Tooltip title={record.submitted ? "Already Submitted" : record.status === 'expired' ? "Submission Closed" : "Submit Assignment"}>
                        <Button
                            type="default"
                            icon={<UploadOutlined />}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSubmit(record);
                            }}
                            disabled={record.submitted || record.status === 'expired'}
                            size="small"
                        >
                            Submit
                        </Button>
                    </Tooltip>
                </Space>
            ),
        },

    ];

    return (
        <div className='px-2'>
            <div className='flex justify-between items-center mb-3 flex-wrap gap-3'>
                <h2 className='text-2xl font-bold '>Class Assignment</h2>
                <Space className='flex flex-wrap break-words'>
                    <Button onClick={clearFilters}>Clear filters</Button>
                    <Button className='break-words' onClick={clearAll}>Clear filters and sorters</Button>
                </Space>
            </div>
            <Table
                className='min-w-full bg-white shadow-lg rounded-lg overflow-x-auto px-3 mb-5 hover:cursor-pointer'
                columns={columns}
                dataSource={assignments}
                onChange={handleChange}
                loading={load}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                }}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
            />

            <Modal
                title="Submit Assignment"
                open={submitModalVisible}
                onCancel={() => {
                    setSubmitModalVisible(false);
                    setUploadProgress(0);
                }}
                footer={null}
            >
                <Upload
                    beforeUpload={(file) => {
                        handleSubmitOk(file);
                        return false;
                    }}
                    disabled={submitting}
                >

                    <Button icon={<UploadOutlined />} loading={submitting} disabled={submitting}>
                        {submitting ? 'Uploading...' : 'Select File to Submit'}
                    </Button>
                </Upload>
                {uploadProgress > 0 && (
                    <Progress percent={Math.round(uploadProgress)} status='active' />
                )}
            </Modal>

        </div>
    );
};
export default StudentListingTable;