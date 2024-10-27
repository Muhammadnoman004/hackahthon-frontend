import React from 'react'
import { BellFilled } from '@ant-design/icons'
import { Container } from 'react-bootstrap'
import { AiOutlinePlus } from "react-icons/ai";

export default function TeacherHomePage() {
    return (
        <div>
            <Container>
                <div className='flex m-4 text-2xl font-mono font-extrabold'>
                    <h1 className='flex-1'>Trainer Dashboard</h1>
                    <div className='flex gap-3'>
                        <div className='hover:rounded-full hover:bg-slate-200 cursor-pointer font-bold'>
                            <AiOutlinePlus className='text-3xl p-0.5' />
                        </div>
                        <div>
                            <BellFilled className='flex text-amber-400' />
                        </div>
                    </div>
                </div>
                <div className='m-4 text-2xl font-sans font-bold text-sky-blue'>
                    <h2>My Classes</h2>
                </div>
            </Container>
        </div>
    )
}