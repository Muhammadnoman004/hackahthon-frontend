import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Card,
    Typography,
    Avatar,
    Statistic,
    Descriptions,
    Layout,
    Tag,
    Alert,
    Spin,
} from "antd";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LineChart,
    Line,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { Container } from "react-bootstrap";
import api from "../../api/api";

// Mock student data
const studentsData = [
    {
        name: "Tayyab Yaqoob",
        rollNumber: "WMA-132511",
        batch: "Batch 10",
        assignments: [
            { title: "Assignment 1", points: 80, status: "submitted" },
            { title: "Assignment 2", points: 70, status: "not_submitted" },
            { title: "Assignment 3", points: 90, status: "submitted" },
            { title: "Assignment 4", points: 85, status: "submitted" },
            { title: "Assignment 5", points: 60, status: "not_submitted" },
        ],
    },
    {
        name: "Huzaifa Khan",
        rollNumber: "WMA-132611",
        batch: "Batch 10",
        assignments: [
            { title: "Assignment 1", points: 75, status: "submitted" },
            { title: "Assignment 2", points: 65, status: "pending" },
            { title: "Assignment 3", points: 85, status: "submitted" },
            { title: "Assignment 4", points: 80, status: "submitted" },
            { title: "Assignment 5", points: 55, status: "submitted" },
        ],
    },
    {
        name: "Muhammad Noman",
        rollNumber: "WMA-132531",
        batch: "Batch 10",
        assignments: [
            { title: "Assignment 1", points: 70, status: "submitted" },
            { title: "Assignment 2", points: 60, status: "pending" },
            { title: "Assignment 3", points: 80, status: "submitted" },
            { title: "Assignment 4", points: 75, status: "not_submitted" },
            { title: "Assignment 5", points: 50, status: "not_submitted" },
        ],
    },
    {
        name: "Jamsheed khan",
        rollNumber: "WMA-131181",
        batch: "Batch 10",
        assignments: [
            { title: "Assignment 1", points: 70, status: "submitted" },
            { title: "Assignment 2", points: 60, status: "pending" },
            { title: "Assignment 3", points: 80, status: "pending" },
            { title: "Assignment 4", points: 75, status: "submitted" },
            { title: "Assignment 5", points: 50, status: "not_submitted" },
        ],
    },
];

const { Title } = Typography;

const StudentReportGenerate = () => {
    const { studentId, classId } = useParams();
    const [load, setLoad] = useState(true);
    const [studentData, setStudentData] = useState(null);
    const [studentInfo, setStudentInfo] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const reportResponse = await api(`/api/assignments/class/${classId}/student/${studentId}/reports`);
                const infoResponse = await api.get(`/api/users/student/${studentId}`);
                setStudentData(reportResponse.data);
                setStudentInfo(infoResponse.data);
                console.log("studentData --->", reportResponse.data);
                console.log("studentInfo --->", infoResponse.data);
            }
            catch (error) {
                setError("Failed to fetch student data. Please try again later.");
            } finally {
                setLoad(false)
            }
        }
        fetchData();
    }, [studentId, classId]);


    if (load) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50% , -50%)",
                    zIndex: 9999
                }}
            >
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return <Alert message="Error" description={error} type="error" showIcon className="m-5 me-3 p-3" />
    }

    if (studentData?.length == 0) {
        return (
            <div className="p-4">
                <Alert message="No Report" description="No student report data available" type="info" showIcon />
            </div>
        );
    }

    const rollNumber = studentId.substring(0, 6);

    if (!studentData || studentData.length === 0) {
        return (
            <div className="p-6">
                <Title level={2} className="mb-6">
                    <ArrowLeftOutlined
                        className='mr-4 cursor-pointer hover:text-sky-blue' title='Back to Previous'
                        onClick={() => navigate(-1)} />
                    Student Report
                </Title>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card>
                            <Row gutter={[16, 16]} align={"middle"}>
                                <Col xs={24} sm={6} className="flex justify-center">
                                    <Avatar
                                        size={96}
                                        src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                                    />
                                </Col>
                                <Col xs={24} sm={18}>
                                    <h3 className="text-lg font-bold">Student Information</h3>
                                    <div className="flex flex-col gap-3 mt-2 pt-3 border-t-2">
                                        <div className="flex gap-3 flex-col xsm:flex-row">
                                            <p className="text-gray-400">Name:</p>
                                            <p className="capitalize">{studentInfo.username || "N/A"}</p>
                                        </div>
                                        <div className="flex gap-3 flex-col xsm:flex-row">
                                            <p className="text-gray-400">Roll Number:</p>
                                            <p className="capitalize">{rollNumber}</p>
                                        </div>
                                        <div className="flex gap-3 flex-col xsm:flex-row">
                                            <p className="text-gray-400">Class ID:</p>
                                            <p className="capitalize">{classId.substring(0, 6)}</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Alert
                    message="No Submissions"
                    description="No student report data available."
                    type="info"
                    showIcon
                    className="mt-6"
                />
            </div>
        );
    }

    // Function to calculate and set chart data
    const calculateChartData = () => {
        const submitted = studentData.filter((a) => a.submitted).length;
        const notSubmitted = studentData.filter((a) => !a.submitted).length;

        return [
            { name: "Submitted", value: submitted },
            { name: "Not Submitted", value: notSubmitted },
        ];
    };

    // Function to calculate average grade
    const calculateAverageGrade = () => {
        const totalMarks = studentData.reduce((total, a) => total + (a.marks || 0), 0);
        const totalPossibleMarks = studentData.reduce((total, a) => total + a.totalMarks, 0);
        const average = ((totalMarks / totalPossibleMarks) * 100 || 0);

        if (average >= 90) {
            return "A+";
        } else if (average >= 85) {
            return "A";
        } else if (average >= 80) {
            return "A-";
        } else if (average >= 75) {
            return "B+";
        } else if (average >= 70) {
            return "B";
        } else if (average >= 65) {
            return "B-";
        } else if (average >= 60) {
            return "C+";
        } else if (average >= 55) {
            return "C-";
        } else if (average >= 50) {
            return "C-";
        } else {
            return "F";
        }
    };


    return (
        <>
            <Container fluid>
                <div className="p-6 pe-2">
                    <Title level={2} className="mb-6">
                        <ArrowLeftOutlined
                            className='mr-4 cursor-pointer hover:text-sky-blue' title='Back to Previous'
                            onClick={() => navigate(-1)} />
                        Student Report
                    </Title>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Card>
                                <Row gutter={[16, 16]} align={"middle"}>
                                    <Col xs={24} sm={6} className="flex justify-center">
                                        <Avatar
                                            size={96}
                                            src={studentInfo?.profileImg ? studentInfo.profileImg : "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"}
                                        />
                                    </Col>
                                    <Col xs={24} sm={18}>
                                        <h3 className="text-lg font-bold">Student Information</h3>
                                        <div className="flex flex-col gap-3 mt-2 pt-3 border-t-2">
                                            <div className="flex gap-3 flex-col xsm:flex-row">
                                                <p className="text-gray-400">Name:</p>
                                                <p className="capitalize">{studentInfo.username || "N/A"}</p>
                                            </div>
                                            <div className="flex gap-3 flex-col xsm:flex-row">
                                                <p className="text-gray-400">Roll Number:</p>
                                                <p className="capitalize">{rollNumber}</p>
                                            </div>
                                            <div className="flex gap-3 flex-col xsm:flex-row">
                                                <p className="text-gray-400">Class ID:</p>
                                                <p className="capitalize">{classId.substring(0, 6)}</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        {studentData.length > 0 && (
                            <>
                                <Col xs={24} sm={12}>
                                    <Card title="Assignment Status">
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={calculateChartData()}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    label
                                                >

                                                    <Cell key="cell-0" fill="#82ca9d" />
                                                    <Cell key="cell-1" fill="#ff7300" />
                                                </Pie>
                                                <Tooltip />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Card>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Card title="Assignment Grades">
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart data={studentData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="assignmentTitle" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="marks" fill="#8884d8" name="Marks" />
                                                <Bar dataKey="totalMarks" fill="#82ca9d" name="Total Marks" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Card>
                                </Col>
                                <Col xs={24}>
                                    <Card title="Overall Grade">
                                        <Statistic
                                            title="Grade"
                                            value={calculateAverageGrade()}
                                        />
                                    </Card>
                                </Col>
                                <Col span={24}>
                                    <Card title="Assignment Details">
                                        {studentData.map((assignment) => (
                                            <Card
                                                key={assignment.assignmentId}
                                                type="inner"
                                                title={
                                                    <div className="flex justify-between flex-wrap gap-3 py-3">
                                                        {assignment.assignmentTitle}
                                                        <Tag color={assignment.submitted ? "green" : "red"}>
                                                            {assignment.submitted ? "Submitted" : "Not Submitted"}
                                                        </Tag>
                                                    </div>
                                                }
                                                className="mb-4 break-words"
                                            >
                                                <p>Total Marks : {assignment.totalMarks}</p>
                                                {assignment.submitted && (
                                                    <>
                                                        <p>Submission Data: {new Date(assignment.submissionDate).toLocaleDateString()}</p>
                                                        <p>Marks: {assignment.marks}</p>
                                                        <p>Rating: {assignment.rating}</p>
                                                        <p>Remark: {assignment.remark}</p>
                                                    </>
                                                )}
                                            </Card>
                                        ))}
                                    </Card>
                                </Col>
                            </>
                        )}
                    </Row>
                </div>
            </Container >
        </>
    );
};

export default StudentReportGenerate;