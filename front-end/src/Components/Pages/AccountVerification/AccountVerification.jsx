import React from 'react'
import { Input } from 'antd'
import { Button } from 'react-bootstrap'

export default function AccountVerification() {
  return (
    <div>
      <div className='flex justify-center items-center absolute bottom-0 top-0 w-full'>
        <div className='bg-white shadow-xl w-96 text-center p-4 rounded-xl m-3 sm:p-0'>
          <div className='text-4xl m-3 font-bold font-mono text-sky-blue drop-shadow-md'>
            <h1>Verify</h1>
          </div>

          <div className='m-4'>
            <div className='text-xl font-bold tracking-wider'>
              <h1>Enter Verfication Code</h1>
            </div>
            <div className='my-3 text-gray-500'>
              <h1>Please enter the verification code</h1>
              <h1 className='my-1'>sent to noman@gmail.com</h1>
            </div>
          </div>

          <div className='m-5'>
            <Input.OTP length={4} size='large' />
          </div>
          <div className='text-gray-500'>
            <h1>Did not get the code? <a href="" className='hover:text-sky-blue hover:underline'>Resend</a></h1>
          </div>
          <div className='my-4'>
            <Button variant='info' className='bg-sky-blue text-white w-full border-none hover:bg-sky-400 '>Verify Now</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
