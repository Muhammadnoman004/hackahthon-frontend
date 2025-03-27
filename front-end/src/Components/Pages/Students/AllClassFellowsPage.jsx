import { BellFilled } from '@ant-design/icons'
import React from 'react'
import { Container } from 'react-bootstrap'
import Classfellowslisting from '../../Classfellowslisting/Classfellowslisting'

export default function AllClassFellowsPage() {
    return (
        <div>
            <div className='flex text-2xl font-extrabold mb-4 mt-4'>
                <div className='flex-1'>
                    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight mb-1">Teacher</h3>
                </div>
            </div>

            <div className='mb-4'>
                {
                    trainerData && <Classfellowslisting data={"sss"} />
                }
            </div>

            <div className='flex text-2xl font-extrabold mb-4'>
                <div className='flex-1'>
                    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight mb-1">Classmates</h3>
                    <p className='text-sm font-normal'>Get to know your fellow students!</p>
                </div>
            </div>

            <div className='mb-4'>
                <Classfellowslisting data={'sss'} />
            </div>

        </div>
    )
}
