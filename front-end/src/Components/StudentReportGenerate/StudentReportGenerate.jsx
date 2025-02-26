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
// import smitlogo from './smitlogo.png'; // Assuming you have your logo image imported correctly
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";

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
const { Header, Content, Sider } = Layout;

const StudentReportGenerate = () => {
    // State to manage selected student index
    const [selectedStudentIndex, setSelectedStudentIndex] = useState(0);
    const navigate = useNavigate();

    // Function to calculate and set chart data
    const calculateChartData = (studentIndex) => {
        const student = studentsData[studentIndex];
        const submitted = student.assignments.filter((a) => a.status === "submitted").length;
        const pending = student.assignments.filter((a) => a.status === "pending").length;
        const notSubmitted = student.assignments.filter((a) => a.status === "not_submitted").length;

        return [
            { name: "Submitted", value: submitted },
            { name: "Pending", value: pending },
            { name: "Not Submitted", value: notSubmitted },
        ];
    };

    // Calculate chart data on component mount or student change
    useEffect(() => {
        calculateChartData(selectedStudentIndex);
    }, [selectedStudentIndex]);

    // Function to calculate average grade
    const calculateAverageGrade = (studentIndex) => {
        const student = studentsData[selectedStudentIndex];
        const totalPoints = student.assignments.reduce((total, a) => total + a.points, 0);
        const earnedPoints = student.assignments.reduce(
            (total, a) =>
                a.status === "submitted" || a.status === "pending" ? total + a.points : total,
            0
        );
        return ((earnedPoints / totalPoints) * 100 || 0).toFixed(2);
    };

    // Function to handle student selection
    const handleStudentSelect = (studentIndex) => {
        setSelectedStudentIndex(studentIndex);
    };

    return (
        <>
            <Container>
                {/* <Content style={{ margin: "24px 16px 0", overflow: "initial" }}> */}
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
                                            src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                                        />
                                    </Col>
                                    <Col xs={24} sm={18}>
                                        <h3 className="text-lg font-bold">Student Information</h3>
                                        <div className="flex flex-col gap-3 mt-2 pt-3 border-t-2">
                                            <div className="flex gap-3 flex-col xsm:flex-row">
                                                <p className="text-gray-400">Name:</p>
                                                <p className="capitalize">sheraz</p>
                                            </div>
                                            <div className="flex gap-3 flex-col xsm:flex-row">
                                                <p className="text-gray-400">Roll Number:</p>
                                                <p className="capitalize">669173</p>
                                            </div>
                                            <div className="flex gap-3 flex-col xsm:flex-row">
                                                <p className="text-gray-400">Class ID:</p>
                                                <p className="capitalize">66a7ca</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Card title="Assignment Status">
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={calculateChartData(selectedStudentIndex)}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#8884d8"
                                            label
                                        >
                                            {calculateChartData(selectedStudentIndex).map(
                                                (entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={
                                                            index === 0
                                                                ? "#82ca9d"
                                                                : index === 1
                                                                    ? "#ffc658"
                                                                    : "#ff7300"
                                                        }
                                                    />
                                                )
                                            )}
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
                                    <BarChart data={studentsData[selectedStudentIndex].assignments}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="title" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="points" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card>
                        </Col>
                        <Col xs={24}>
                            <Card title="Overall Grade">
                                <Statistic
                                    title="Grade"
                                    value="F"
                                    precision={2}
                                />
                            </Card>
                        </Col>
                        <Col xs={24}>
                            <Card title="Assignment Details">
                                <Card
                                    type="inner"
                                    title={
                                        <div className="flex justify-between flex-wrap gap-3 py-3">
                                            Assignment 1
                                            <Tag color={'submitted' ? "green" : "red"}>
                                                {"submitted" ? "Submitted" : "Not Submitted"}
                                            </Tag>
                                        </div>
                                    }
                                    className="mb-4 break-words"
                                >
                                    <p>Total Marks : 10</p>
                                </Card>
                                <Card
                                    type="inner"
                                    title={
                                        <div className="flex justify-between flex-wrap gap-3 py-3">
                                            Assignment 2
                                            <Tag color={!'submitted' ? "green" : "red"}>
                                                {!"submitted" ? "Submitted" : "Not Submitted"}
                                            </Tag>
                                        </div>
                                    }
                                    className="mb-4 break-words"
                                >
                                    <p>Total Marks : 10</p>
                                </Card>
                                <Card
                                    type="inner"
                                    title={
                                        <div className="flex justify-between flex-wrap gap-3 py-3">
                                            Assignment 3
                                            <Tag color={'submitted' ? "green" : "red"}>
                                                {"submitted" ? "Submitted" : "Not Submitted"}
                                            </Tag>
                                        </div>
                                    }
                                    className="mb-4 break-words"
                                >
                                    <p>Total Marks : 10</p>
                                </Card>
                            </Card>
                        </Col>
                    </Row>
                </div>
                {/* </Content> */}
            </Container >
        </>
    );
};

export default StudentReportGenerate;