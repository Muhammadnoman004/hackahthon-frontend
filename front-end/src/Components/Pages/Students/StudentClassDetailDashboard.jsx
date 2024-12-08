import { Button } from 'antd'
import React from 'react'
import { Container } from 'react-bootstrap'
import { BsThreeDotsVertical } from "react-icons/bs";

export default function StudentClassDetailDashboard() {
    return (
        <Container>
            <div className='p-4 '>
                <style>
                    {`
          .custom-button:hover {
            background-color: skyblue !important; 
            color: white !important;
          }
          .custom-button:focus {
            background-color: skyblue !important; 
            color: white !important;
          }
        `}
                </style>
                <header className='bg-lime-500 text-white rounded-lg p-3 font-semibold mb-4'>
                    <h1 className='text-2xl'>Class Details Name</h1>
                    <p>Details Description</p>
                </header>
                <div className='flex justify-between items-center gap-3 px-1 mb-5'>
                    <div className='flex gap-3 flex-wrap items-center justify-between'>
                        <Button
                            className="custom-button"
                            style={{
                                backgroundColor: 'white', // Default button background
                                borderColor: 'skyblue', // Optional border color
                                color: 'black', // Default text color
                            }}> Stream</Button>
                        <Button
                            className="custom-button"
                            style={{
                                backgroundColor: 'white', // Default button background
                                borderColor: 'skyblue', // Optional border color
                                color: 'black', // Default text color
                            }}>Classwork</Button>
                        <Button
                            className="custom-button"
                            style={{
                                backgroundColor: 'white', // Default button background
                                borderColor: 'skyblue', // Optional border color
                                color: 'black', // Default text color
                            }}>People</Button>
                        <Button
                            className="custom-button"
                            style={{
                                backgroundColor: 'white', // Default button background
                                borderColor: 'skyblue', // Optional border color
                                color: 'black', // Default text color
                            }}>View Report</Button>
                    </div>
                    <div className='cursor-pointer hover:bg-gray-200 rounded-full p-2'>
                        <BsThreeDotsVertical />
                    </div>
                </div>
            </div>
        </Container >
    )
}
