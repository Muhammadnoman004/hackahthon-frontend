import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Assignment 1', submissions: 4000, graded: 2400 },
    { name: 'Assignment 2', submissions: 3000, graded: 1398 },
    { name: 'Assignment 3', submissions: 2000, graded: 9800 },
    { name: 'Assignment 4', submissions: 2780, graded: 3908 },
    { name: 'Assignment 5', submissions: 1890, graded: 4800 },
    { name: 'Assignment 6', submissions: 2390, graded: 3800 },
    { name: 'Assignment 7', submissions: 3490, graded: 4300 },
];

export default function StudentReportGenerate() {
    return (
        <div className='flex flex-col justify-center items-center my-3'>
            <h2 className='font-bold my-3 text-xl'>Assignment Submission Report</h2>
            <BarChart
                width={600}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="submissions" fill="#8884d8" />
                <Bar dataKey="graded" fill="#82ca9d" />
            </BarChart>
        </div>
    )
}
