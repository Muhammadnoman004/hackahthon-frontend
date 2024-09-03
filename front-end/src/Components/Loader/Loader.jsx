import React from 'react'
import loader from '../../assets/loader.gif'

export default function Loader() {
    return (
        <div>
            <div className='flex justify-center items-center w-full h-full bg-opacity-65 fixed left-0 top-0 z-10' style={{ backgroundColor: 'rgba(128, 128, 128, 0.198)' }}>
                <img className='w-20' src={loader} alt="" />
            </div>
        </div>
    )
}
