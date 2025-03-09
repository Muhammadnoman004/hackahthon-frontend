import { Alert, Spin } from 'antd'
import React from 'react'

function StudentAssignmentDetailPage() {
    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                <Spin size='large' />
            </div>

            <div className='p-4'>
                <Alert message="Error" description={"error"} type='error' showIcon />
            </div>

            <div className='p-4'>
                <Alert message="Assignment not found" description="The requested assignment could not be found." type='warning' showIcon />
            </div>

        </div>
    )
}

export default StudentAssignmentDetailPage