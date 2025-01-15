import { Space, Table } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import CreateAssignmentModal from '../../CreateAssignmentModal/CreateAssignmentModal';
import api from '../../../api/api'
import { useParams } from 'react-router-dom';
import loader from '../../../Context/LoaderContext';
import Loader from '../../Loader/Loader';
import useFetchProfile from '../../../utils/useFetchProfile';


// const data = [
//     {
//         key: '1',
//         serialNo: 1,
//         name: 'Assignment',
//         date: '10-05-24',
//         marks: 100
//     },
//     {
//         key: '2',
//         serialNo: 2,
//         name: 'Assignment',
//         date: '12-05-24',
//         marks: 10
//     },
//     {
//         key: '3',
//         serialNo: 3,
//         name: 'Assignment',
//         date: '14-05-24',
//         marks: 50
//     },
//     {
//         key: '4',
//         serialNo: 4,
//         name: 'Assignment',
//         date: '16-05-24',
//         marks: 20
//     },
// ];

export default function AllAssignmentListing() {

    const { classId } = useParams();
    const { user, setUser } = useFetchProfile();
    const [loading, setloading] = useContext(loader);
    const [load, setload] = useState(false);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [assignment, setAssignment] = useState([]);


    const fetchAllAssignment = async () => {
        setload(true);
        setloading(true);
        try {
            const response = await api.get(`/api/assignments/class/${classId}`)
            const formattedAssignments = response.data.map((assignment, index) => ({
                key: assignment._id,
                serialNo: index + 1,
                name: assignment.title,
                description: assignment.description || 'no description available',
                date: new Date(assignment.dueDate).toLocaleDateString(),
                marks: assignment.total_marks

            }))
            setAssignment(formattedAssignments)
            console.log(formattedAssignments);
            setError('');
            setload(false);
            setloading(false);

        } catch (error) {
            console.log('Error fetching assignments:', error);
            setError('Failed to fetch assignments. Please try again later.')
            setloading(false);
            setload(false);
        }
    }

    useEffect(() => {
        fetchAllAssignment();
    }, [classId, user])

    const handleCreateAssignment = async (formData) => {
        setloading(true);
        try {
            let res = await api.post("/api/assignments/create", { ...formData, classId })
            fetchAllAssignment()
            setError('');

        } catch (error) {
            console.error('Error creating', error);
            setError(error.response?.data?.error || 'An error occurred while creating/updating the assignment');
        } finally {
            setloading(false);
        }
    }

    const handleDeleteAssignment = async (assignmentId) => {
        setloading(true);
        try {
            const res = await api.delete(`/api/assignments/${assignmentId}`);
            setloading(false)
            fetchAllAssignment();

        } catch (error) {
            setloading(false);
            console.error('Error deleting assignment:', error);
            setError('Failed to delete assignment. Please try again later.');
        }
    }


    const handleEditAssignment = () => {
        console.log("working");
    }

    const columns = [
        {
            title: 'S/No',
            dataIndex: 'serialNo',
            key: 'serialNo',
            width: 50,
            render: (number) => <a>{number}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div>
                    <p className="font-semibold">{record.name}</p>
                    <p className="text-gray-700 text-sm">{record.description}</p>
                </div>
            )
        },
        {
            title: 'Due date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Total Marks',
            key: 'marks',
            dataIndex: 'marks',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="small">
                    <div className='flex justify-between items-center gap-2'>
                        <button className='text-sm text-black border-dashed border-2 border-teal-600 p-2 rounded-md hover:bg-teal-600 duration-500 transition-all'>View Assignment</button>
                        <button className='text-sm text-white bg-teal-600 p-2 rounded-md hover:bg-teal-700'>View Submissions</button>
                        <button className='text-sm text-white bg-green-600 p-2 rounded-md hover:bg-green-700' onClick={() => handleEditAssignment()}>Edit</button>
                        <button className='text-sm text-white bg-red-600 p-2 rounded-md hover:bg-red-700' onClick={() => handleDeleteAssignment(record.key)}>Delete</button>
                    </div>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Container>
                <div className='mt-4 border rounded-lg p-2'>

                    <div className='flex flex-col mb-4 sm:flex-row sm:m-4 justify-between space-y-3.5 border-b pb-3'>
                        <div>
                            <h1 className='font-bold text-lg'>All Assignments</h1>
                            <p className='text-xs'>View and manage all assignments</p>
                        </div>
                        <div>
                            <button className='p-1 px-3 w-auto  bg-sky-blue text-white rounded-md border-none hover:bg-sky-400 focus:shadow-lg' onClick={() => setIsModalOpen(true)}>Create Assignment</button>
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={assignment}
                        className='overflow-x-auto'
                        rowKey={(record) => record.key}
                        loading={load}
                        locale={{ emptyText: <p className="text-center text-gray-500">No assignments available</p> }}
                    />
                </div>

            </Container >
            {
                loading && <Loader />
            }
            <CreateAssignmentModal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} onsubmit={handleCreateAssignment} />
        </div >
    )
}