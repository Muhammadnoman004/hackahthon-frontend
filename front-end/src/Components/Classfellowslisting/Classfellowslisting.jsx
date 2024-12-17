import React from 'react'
import UserProIcon from '../../assets/user-profile-icon.png';

export default function Classfellowslisting() {
    return (
        <div>
            <div className="bg-white rounded-lg border shadow-md w-full max-w-3xl mt-4 p-4">
                <div className='border-b-2 pb-3 w-full flex gap-3'>
                    <div className='w-14 h-14 rounded-full bg-stone-200'>
                        <img src={UserProIcon} alt="" />
                    </div>
                    <div >
                        <h2 className='text-xl font-semibold'>Asad Sheikh</h2>
                        <p className='text-sm'>asad@gmail.com</p>
                    </div>
                </div>
            </div>

            <div>

                <div className="bg-white rounded-lg border shadow-md w-full max-w-3xl mt-4 p-4">
                    <div className='border-b-2 pb-3 w-full flex gap-3 mb-3'>
                        <div className='w-14 h-14 rounded-full bg-stone-200'>
                            <img src={UserProIcon} alt="" />
                        </div>
                        <div >
                            <h2 className='text-xl font-semibold'>Asad Sheikh</h2>
                            <p className='text-sm'>asad@gmail.com</p>
                        </div>
                    </div>

                    <div className='border-b-2 pb-3 w-full flex gap-3 mb-3'>
                        <div className='w-14 h-14 rounded-full bg-stone-200'>
                            <img src={UserProIcon} alt="" />
                        </div>
                        <div >
                            <h2 className='text-xl font-semibold'>Jamsheed</h2>
                            <p className='text-sm'>Jamsheed@gmail.com</p>
                        </div>
                    </div>

                    <div className='border-b-2 pb-3 w-full flex gap-3 mb-3'>
                        <div className='w-14 h-14 rounded-full bg-stone-200'>
                            <img src={UserProIcon} alt="" />
                        </div>
                        <div >
                            <h2 className='text-xl font-semibold'>Bilal</h2>
                            <p className='text-sm'>Bilal@gmail.com</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
