import React from 'react'
import StudentListingTable from '../../StudentListingTable/StudentListingTable'
import useFetchProfile from '../../../utils/useFetchProfile'

export default function StudentAllAssignmentListingPage() {
    const { user } = useFetchProfile();

    return (
        <div>
            <div className='flex m-4 text-2xl font-mono font-extrabold'>
                <h1 className='flex-1'>Assignment</h1>
            </div>
            <div className='m-2 p-3 bg-stone-200 rounded-md'>

                <div className='flex my-3 mx-2'>
                    <div className='flex-1'>
                        <ul className='flex gap-4 items-center flex-wrap'>
                            <li className='text-lg font-bold uppercase'>{user?.username}</li>
                            <li className='text-base text-sky-500 font-semibold'>Roll No. {user?._id.slice(0, 6)}</li>
                        </ul>
                    </div>

                </div>
                <div>
                    <StudentListingTable />
                </div>
            </div>
        </div>
    )
}
