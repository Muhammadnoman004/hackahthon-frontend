import React from 'react'
import loader from '../../assets/loader.gif'

export default function Loader() {
    return (
        <div>
            <div className='flex justify-center items-center w-full h-full bg-stone-100 bg-opacity-65 fixed left-0 top-0 z-10'>
                <img className='w-20' src={loader} alt="" />
            </div>
        </div>
    )
}
