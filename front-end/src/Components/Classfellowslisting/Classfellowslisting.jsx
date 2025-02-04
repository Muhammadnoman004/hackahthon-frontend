import React from 'react'
import UserProIcon from '../../assets/user-profile-icon.png';

export default function Classfellowslisting({ data, classId }) {
    return (
        <div>
            <div className="bg-white rounded-lg border shadow-md w-full max-w-3xl mt-4 p-4">
                {
                    (data && classId) ?
                        data.map((data, i) => {
                            return (
                                <div key={i}>
                                    <div className='border-b-2 pb-3 w-full flex gap-3 mb-3'>
                                        <div className='w-14 h-14 rounded-full bg-stone-200 overflow-hidden'>
                                            <img src={data.profileImg ? data.profileImg : UserProIcon} alt="" />
                                        </div>
                                        <div >
                                            <h2 className='text-xl font-semibold'>{data.username}</h2>
                                            <p className='text-sm'>{data.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) :
                        data.map((data, i) => {
                            return (
                                <div key={i}>
                                    <div className='border-b-2 pb-3 w-full flex gap-3 mb-3'>
                                        <div className='w-14 h-14 rounded-full bg-stone-200 overflow-hidden'>
                                            <img src={data.profileImg ? data.profileImg : UserProIcon} alt="" />
                                        </div>
                                        <div >
                                            <h2 className='text-xl font-semibold'>{data.username}</h2>
                                            <p className='text-sm'>{data.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                }

            </div>
            <div>
            </div>
        </div>
    )
}
