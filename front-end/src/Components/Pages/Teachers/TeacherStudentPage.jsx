import React from 'react'
import { BellFilled } from '@ant-design/icons'
import { Container } from 'react-bootstrap'
import { Input } from 'antd'
import { IoSearchSharp } from "react-icons/io5";

export default function TeacherStudentPage() {
    return (
        <div>
            <Container>
                <div className='flex m-4 text-2xl font-mono font-extrabold'>
                    <h1 className='flex-1'>Students</h1>
                    <BellFilled className='flex-2 text-amber-400' />
                </div>
                <div>
                    <Input size="large" placeholder="username" prefix={<IoSearchSharp />} className='mb-5' />
                </div>
            </Container>
        </div>
    )
}
