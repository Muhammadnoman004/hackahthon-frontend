import React from 'react'
import StudentListingTable from '../../StudentListingTable/StudentListingTable'

export default function StudentAllAssignmentListingPage() {
    return (
        <div>
            <div className='flex m-4 text-2xl font-mono font-extrabold'>
                <h1 className='flex-1'>Assignment</h1>
            </div>
            <div className='m-2 p-1 bg-stone-200 rounded-md'>

                <div className='flex my-3 mx-2'>
                    <div className='flex-1'>
                        <ul className='flex gap-4 items-center flex-wrap'>
                            <li className='text-lg font-bold uppercase'>asad@gmail.com</li>
                            <li className='text-base text-sky-500 font-semibold'>Roll No. sjhj34</li>
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
