import { BellOutlined, CalendarOutlined, FileTextOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Layout, List, Progress, Row, Statistic, Table, Tabs, Tag, Tooltip, Typography } from 'antd'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import { VscOpenPreview } from 'react-icons/vsc';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const { Content } = Layout;
const { Title, Text } = Typography;


// Mock Data

const trainerInfo = {
    courses: ["JavaScript", "React JS", "Next JS"]
}


function TrainerClassDetailPage() {

    const [activeTab, setActiveTab] = useState("1");


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
            dataIndex: "eamil",
            key: "email",
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <div className='flex gap-4'>
                    <button className='mybtn' title='View Details'>
                        <VscOpenPreview />
                    </button>
                </div>
            ),
        },
    ]


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
                <Card title={<h1 className='flex justify-between items-center'>Student Information (Total: 0)
                    <button title='Add Teacher'>
                        <PlusOutlined className='hover:bg-gray-200 rounded-full p-2' />
                    </button>
                </h1>}>
                    <Table columns={studentColumns} className='min-w-full bg-white shadow-md rounded-lg overflow-x-auto' rowKey={(record) => record._id} />
                    <Title level={4} style={{ marginTop: '24px' }}>Attendance Record</Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart >
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
                        <BarChart>
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
                <Card title={`Assignments Information (Total: 3)`}>
                    <List
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
                        <BarChart>
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

    return (
        <Container>
            <Layout>
                <Content style={{ padding: "24px" }}>
                    <Title level={2}>Batch 10</Title>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={16}>
                            <Card title={"Class Information"}>
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Statistic title={"Class Code"} />
                                    </Col>
                                    <Col span={12}>
                                        <Statistic title={"Schedule"} />
                                    </Col>
                                    <Col span={12}>
                                        <Statistic title={"Start Date"} />
                                    </Col>
                                    <Col span={12}>
                                        <Statistic title={"End Date"} />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card title={"Trainer Information"}>
                                <div className='flex items-center gap-3 mb-3'>
                                    <Avatar size={64} icon={<UserOutlined />} />
                                    <div>
                                        <Text className='font-semibold'>zain Khan 25</Text><br />
                                        <Text type='secondary'>zain@gmail.com</Text>
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
            </Layout>
        </Container>
    )
}

export default TrainerClassDetailPage;