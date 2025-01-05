import { Button, Popover } from 'antd';
import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import TeacherClassDetailPage from './TeacherClassDetailPage';

export default function TeacherClassDetailDashboard() {

    const [selectedComponent, setSelectedComponent] = useState('Stream');
    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };


    const renderComponent = () => {
        switch (selectedComponent) {
            case "Stream":
                return <TeacherClassDetailPage />
            default:
                return null;
        }
    }

    return (
        <Container>
            <div className='p-4 ps-6'>
                <header className='bg-teal-600 text-white rounded-lg p-3 font-semibold mb-4'>
                    <h1 className='text-2xl'>A10 6 to 8</h1>
                    <p>Saylani A10 6 to 8</p>
                </header>
                <div className='flex justify-between items-center gap-3 px-1 mb-0'>
                    <div className='flex gap-3 flex-wrap items-center justify-between'>
                        <Button
                            className="custom-button"
                            style={selectedComponent === 'Stream' ? {
                                backgroundColor: 'skyblue',
                                borderColor: 'skyblue',
                                color: 'white',
                            } : {
                                backgroundColor: 'white',
                                borderColor: 'skyblue',
                                color: 'black',
                            }
                            }
                            onClick={() => setSelectedComponent('Stream')}
                        > Stream</Button>
                        <Button
                            className="custom-button"
                            style={selectedComponent === 'Classwork' ? {
                                backgroundColor: 'skyblue',
                                borderColor: 'skyblue',
                                color: 'white',
                            } : {
                                backgroundColor: 'white',
                                borderColor: 'skyblue',
                                color: 'black',
                            }
                            }
                            onClick={() => setSelectedComponent('Classwork')}
                        >Classwork</Button>
                        <Button
                            className="custom-button"
                            style={selectedComponent === 'People' ? {
                                backgroundColor: 'skyblue',
                                borderColor: 'skyblue',
                                color: 'white',
                            } : {
                                backgroundColor: 'white',
                                borderColor: 'skyblue',
                                color: 'black',
                            }
                            }
                            onClick={() => setSelectedComponent("People")}
                        >People</Button>
                    </div>
                    <Popover
                        content={<p className='cursor-pointer'>Setting</p>}
                        trigger="click"
                        placement='bottomRight'
                        open={open}
                        onOpenChange={handleOpenChange}
                    >
                        <div className='cursor-pointer hover:bg-gray-200 rounded-full p-2'>
                            <BsThreeDotsVertical />
                        </div>
                    </Popover>
                </div>
                <div>
                    {renderComponent()}
                </div>
            </div>
        </Container >
    )
}
