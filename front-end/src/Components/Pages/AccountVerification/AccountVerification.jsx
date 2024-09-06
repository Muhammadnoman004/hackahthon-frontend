import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import api from '../../../api/api';
import Loader from '../../Loader/Loader';
import loader from '../../../Context/LoaderContext';
import { useNavigate } from 'react-router-dom';

export default function AccountVerification({ title }) {

  const [loading, setloading] = useContext(loader);
  const [Otp, setOtp] = useState('');
  const navigate = useNavigate()

  const checkVerification = async () => {
    setloading(true);
    try {
      const res = await api.post('api/users/account-verification', {
        otp: Otp,
      })
      toast.success('OTP verified successfully', {
        onClose: () => {
          if (res.data.role === 'trainer') {
            navigate('/trainer/dashboard');
          }
          else if (res.data.role === 'admin') {
            navigate('/admin/dashboard');
          }
          else {
            navigate('/student/dashboard')
          }
        }
      })
      setloading(false)
      setOtp('')

    }
    catch (error) {
      setloading(false)
      toast.error(error.response.data);
    }
  }

  useEffect(() => {
    document.title = title
  }, [document])

  return (
    <div>
      <div className='flex justify-center items-center absolute bottom-0 top-0 w-full bg-sky-100'>
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

          <div className='m-4'>
            <OtpInput
              value={Otp}
              numInputs={4}
              onChange={setOtp}
              renderInput={(props) => <input {...props} />}
              placeholder='1234'
              inputType='text'
              containerStyle={{ display: "inline", justifyContent: "center", alignItems: "center" }}
              inputStyle={{ margin: '10px', width: '40px', height: "40px", border: '1px solid lightgray', borderRadius: "5px" }}
            />
          </div>
          <div className='text-gray-500'>
            <h1>Did not get the code? <a href="" className='hover:text-sky-blue hover:underline'>Resend</a></h1>
          </div>
          <div className='my-4'>
            <Button disabled={Otp.length !== 4} variant='info' onClick={checkVerification} className='bg-sky-blue text-white w-full border-none hover:bg-sky-400 '>Verify Now</Button>
          </div>
          <div>
            {loading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  )
}
