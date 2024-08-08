import React, { useState } from 'react'
import { Button } from 'antd';
import { Container } from 'react-bootstrap'
import AllStudentPage from './AllStudentPage';
import AllTeacherPage from './AllTeacherPage';

export default function AdminHomePage() {

    const [selectedPage, setSelectedPage] = useState('AllTeacher')

    const RenderComponent = () => {
        switch (selectedPage) {
            case 'AllTeacher':
                return <AllTeacherPage />;
            case 'AllStudent':
                return <AllStudentPage />;
            default:
                return null;
        }
    }

    return (
        <div>
            <Container>
                <div className='my-4 mx-3 flex gap-3'>
                    <Button onClick={() => setSelectedPage('AllTeacher')}
                        style={{
                            backgroundColor: selectedPage === 'AllTeacher' ? '#87CEEB' : 'transparent',
                        }}
                        type='text'
                        className={` border-sky-blue ${selectedPage === 'AllStudent' ? 'hover:shadow-md' : ''}`}
                    >All Teachers</Button>
                    <Button onClick={() => setSelectedPage('AllStudent')}
                        style={{
                            backgroundColor: selectedPage === 'AllStudent' ? '#87CEEB' : 'transparent',
                        }}
                        type='text'
                        className={` border-sky-blue ${selectedPage === 'AllTeacher' ? 'hover:shadow-md' : ''}`}
                    >All Students</Button>
                </div>
                <div>
                    {RenderComponent()}
                </div>
            </Container>
        </div >
    )
}