import { BellOutlined, BookOutlined, CalendarOutlined, FileTextOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Card, Col, Layout, List, Modal, Progress, Row, Statistic, Table, Tabs, Tag, Tooltip, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { VscOpenPreview } from 'react-icons/vsc';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import api from '../../../api/api';
import { toast } from 'react-toastify';
import loader from '../../../Context/LoaderContext';
import Loader from '../../Loader/Loader';

const { Content } = Layout;
const { Title, Text } = Typography;


// Mock Data

const classInfo = {
    schedule: "Tue, Thur, Sat 4:00 PM - 6:00 PM",
    endDate: "2026-2-15",
};

const trainerInfo = {
    courses: ["JavaScript", "React JS", "Next JS"]
}

const attendanceData = [
    { date: '09/01', attendance: 92 },
    { date: '09/08', attendance: 88 },
    { date: '09/15', attendance: 95 },
    { date: '09/22', attendance: 90 },
    { date: '09/29', attendance: 93 },
]

const performanceData = [
    { assignment: 'A1', avgScore: 85 },
    { assignment: 'B1', avgScore: 75 },
    { assignment: 'C1', avgScore: 65 },
    { assignment: 'B2', avgScore: 70 },
]

const assignmentInfo = [
    { name: "Project 01", dueDate: "2025-05-16", submitted: 22, graded: 20 },
    { name: "Quiz 02", dueDate: "2025-05-22", submitted: 25, graded: 18 },
    { name: "GDB 01", dueDate: "2025-05-28", submitted: 12, graded: 8 },
];

const classResources = [
    { name: "Day 1 Slides", type: "PDF" },
    { name: "React Fundamental", type: "Video" },
    { name: "Node js Tutorial", type: "Link" },
]

function TrainerClassDetailPage() {

    const location = useLocation();
    const { classId } = useParams();
    const [loading, setLoading] = useContext(loader);
    const [load, setLoad] = useState(false);
    const [activeTab, setActiveTab] = useState("1");
    const { classData, teacherData } = location.state;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [studentsData, setStudentsData] = useState(null);
    const [unEnrolledStudents, setUnEnrolledStudents] = useState(null);
    const [unEnrolledStudentsError, setUnEnrolledStudentsError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const getUnEnrolledStudents = async () => {
            try {
                const res = await api.get("/api/users/students/unenrolled");
                setUnEnrolledStudents(res.data);
            }
            catch (error) {
                setUnEnrolledStudentsError(error.response.data.message);
            }
        }
        getStudentOfClass()
        getUnEnrolledStudents()
    }, [])


    const getStudentOfClass = async () => {
        setLoad(true);
        try {
            const res = await api.get(`/api/classes/admin/students/${classId}`)
            setStudentsData(res.data);
            setLoad(false);
        }
        catch (error) {
            setLoad(false);
            console.log("error ==>", error.response.data.error);
        }
    }

    const studentColumns = [
        {
            title: "Name",
            dataIndex: "username",
            key: "username",
            render: (text, record) => (
                <span>
                    <Avatar size='small' icon={<UserOutlined />} /> {text}
                </span>
            )
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <div className='flex gap-4'>
                    <button className='bg-blue-500 text-white p-2 rounded-md' title='View Details' onClick={() => navigate(`/admin/student/${record._id}`)}>
                        <VscOpenPreview />
                    </button>
                </div>
            ),
        },
    ]

    const studentInfo = {
        totalStudents: classData.students.length
    }

    const pagination = {
        pageSize: 10,
    }

    const tabItems = [
        {
            label: "Overview",
            key: '1',
            children: (
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Card title="Class Progress">
                            <Statistic title="Overall Progress" value={75} suffix="%" />
                            <Progress percent={75} status="active" />
                            <Statistic title="Assignments Completed" value={18} suffix="/ 24" style={{ marginTop: '16px' }} />
                            <Progress percent={75} status="active" />
                            <Statistic title="Average Attendance" value={92} suffix="%" style={{ marginTop: '16px' }} />
                            <Progress percent={92} status="active" />
                        </Card>
                    </Col>
                    <Col xs={24} md={12}>
                        <Card title="Recent Activity">
                            <List
                                dataSource={[
                                    { icon: <CalendarOutlined />, text: "New assignment posted: Project 3" },
                                    { icon: <UserOutlined />, text: "2 new students enrolled" },
                                    { icon: <FileTextOutlined />, text: "Grades posted for Quiz 2" },
                                    { icon: <BellOutlined />, text: "Reminder: Project 2 due in 3 days" },
                                ]}
                                renderItem={(item) => (
                                    <List.Item>
                                        {item.icon} {item.text}
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            ),
        },
        {
            label: "Students",
            key: "2",
            children: (
                <Card title={<h1 className='flex justify-between items-center'>Student Information (Total: {studentInfo.totalStudents})
                    <button title='Add Teacher' onClick={() => setIsModalVisible(true)}>
                        <PlusOutlined className='hover:bg-gray-200 rounded-full p-2' />
                    </button>
                </h1>}>
                    <Table dataSource={studentsData} columns={studentColumns} className='min-w-full bg-white shadow-md rounded-lg overflow-x-auto' pagination={pagination} rowKey={(record) => record._id} loading={load} />
                    <Title level={4} style={{ marginTop: '24px' }}>Attendance Record</Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={attendanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="attendance" fill="#1890ff" />
                        </BarChart>
                    </ResponsiveContainer>

                    <Title level={4} style={{ marginTop: '24px' }}>Performance Overview</Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="assignment" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="avgScore" fill="#52c41a" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            )
        },
        {
            label: "Assignments",
            key: "3",
            children: (
                <Card title={`Assignments Information (Total: ${assignmentInfo.length})`}>
                    <List
                        dataSource={assignmentInfo}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.name}
                                    description={`Due Date: ${item.dueDate}`}
                                />
                                <div>
                                    <Badge status="processing" text={`${item.submitted}/${studentInfo.totalStudents} Submitted`} />
                                    <br />
                                    <Badge status="success" text={`${item.graded}/${item.submitted} Graded`} />
                                </div>
                            </List.Item>
                        )}
                    />
                </Card>
            )
        },
        {
            label: "Resources",
            key: "4",
            children: (
                <Card title="Class Resources">
                    <List
                        dataSource={classResources}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<BookOutlined />}
                                    title={item.name}
                                    description={item.type}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            )
        },
        {
            label: "Reports",
            key: "5",
            children: (
                <Card title="Class Progress & Reports">
                    <Title level={4}>Overall Class Performance</Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="assignment" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="avgScore" fill='#722ed1' />
                        </BarChart>
                    </ResponsiveContainer>

                    <Title level={4} style={{ marginTop: '24px' }}>Recent Activity Logs</Title>
                    <List
                        dataSource={[
                            { icon: <CalendarOutlined />, text: "New assignment 'Project 3' added on 2023-10-15" },
                            { icon: <UserOutlined />, text: "2 new students enrolled on 2023-10-12" },
                            { icon: <FileTextOutlined />, text: "Mid-term grades posted on 2023-10-10" },
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                {item.icon} {item.text}
                            </List.Item>
                        )}
                    />
                </Card>
            )
        }
    ]

    const onSelectChange = (newSelectRowKeys) => {
        setSelectedRowKeys(newSelectRowKeys);
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0

    const addUnEnrolledStudents = async () => {
        setLoading(true);
        handleCancel();
        try {
            const data = {
                studentIds: selectedRowKeys,
                classId: classId
            }
            const res = await api.post(`/api/users/students`, data);
            setLoading(false);
            getStudentOfClass();
            toast.success(res.data.message);
        }
        catch (error) {
            setLoading(false);
            toast.error(error.message, "Something went wrong!")
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedRowKeys([]);
    }

    return (
        <Container>
            {loading && <Loader />}
            <Layout className='my-3 border-1 rounded-md shadow-md'>
                <Content className='p-4'>
                    <Title level={2}>Batch 10</Title>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={16}>
                            <Card title={"Class Information"}>
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Statistic title={"Class Code"} value={classData.join_code} />
                                    </Col>
                                    <Col span={12}>
                                        <Statistic title={"Schedule"} value={classInfo.schedule} />
                                    </Col>
                                    <Col span={12}>
                                        <Statistic title={"Start Date"} value={classData.createdAt.slice(0, 10)} />
                                    </Col>
                                    <Col span={12}>
                                        <Statistic title={"End Date"} value={classInfo.endDate} />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card title={"Trainer Information"}>
                                <div className='flex items-center gap-3 mb-3'>
                                    <Avatar size={64} icon={<UserOutlined />} />
                                    <div>
                                        <Text className='font-semibold'>{teacherData.username}</Text><br />
                                        <Text type='secondary'>{teacherData.email}</Text>
                                    </div>
                                </div>
                                <div>
                                    <Text strong className='font-semibold'>Assigned Courses:</Text><br />
                                    <div className='flex flex-wrap gap-1'>
                                        {trainerInfo.courses.map((course, i) => (
                                            <Tag key={i} color='blue' className='ms-0'>{course}</Tag>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Tabs activeKey={activeTab} onChange={setActiveTab} className='mt-3' defaultActiveKey='1' items={tabItems} />

                </Content>

                <Modal
                    title="Add Students"
                    open={isModalVisible}
                    onCancel={handleCancel}
                    footer={<div>
                        <button className='bg-blue-500 text-white p-2 px-4 rounded-md hover:bg-blue-600 transition duration-300' onClick={addUnEnrolledStudents} disabled={unEnrolledStudentsError ? true : false}>
                            Add Students
                        </button>
                    </div>}
                    className='max-w-md'
                >
                    <div className='border-t-2 pt-3'>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
                        {
                            unEnrolledStudentsError ?
                                <Tag color='red'>{unEnrolledStudentsError}</Tag>
                                :
                                <div>
                                    <Table dataSource={unEnrolledStudents} columns={studentColumns} className='min-w-full bg-white shadow-md rounded-lg overflow-x-auto' pagination={pagination} rowKey={(record) => record._id} rowSelection={rowSelection} />
                                </div>
                        }

                    </div>

                </Modal>

            </Layout>
        </Container>
    )
}

export default TrainerClassDetailPage;