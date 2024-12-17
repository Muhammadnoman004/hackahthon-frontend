import React from 'react'
import UserProIcon from '../../assets/user-profile-icon.png';

export default function Classfellowslisting() {
    return (
        <div>
            <div className="bg-stone-200 rounded-lg border shadow-md w-full max-w-3xl mt-4">
                <div className='flex p-4 gap-3'>
                    <div className='w-12'>
                        <img src={UserProIcon} alt="" />
                    </div>
                    <div>
                        <h2>Asad Sheikh</h2>
                        <p>asad@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
