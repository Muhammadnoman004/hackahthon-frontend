import React, { useContext, useState } from 'react'
import { BellFilled } from '@ant-design/icons'
import { FaUserLock } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { Button, Form, Input, Menu, Modal } from 'antd';
import { Container } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { RiLockPasswordFill } from 'react-icons/ri';
import api from '../../../api/api';
import loader from '../../../Context/LoaderContext';
import { toast } from 'react-toastify';
import Loader from '../../Loader/Loader';
import useFetchProfile from '../../../utils/useFetchProfile';

const items = [
  {
    key: 'sub2',
    icon: <Link to={'/admin/profile'}><FaUser color='#87CEEB' /></Link>,
    label: 'Update profile',
  },
  {
    key: 'changePassword',
    label: 'Change password',
    icon: <FaUserLock color='#87CEEB' />,
  },
];


export default function AdminSettingPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setloading] = useContext(loader);
  const { user, setUser } = useFetchProfile();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setloading(true);
    try {
      const values = await form.validateFields();
      const response = await api.put("/api/users/profile", {
        password: values.password,
        oldPassword: values.oldPassword
      })
      toast.success('Password updated successfully!', { duration: 3000 });
      setloading(false);
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      setloading(false);
      toast.error(error.response.data.message, { duration: 3000 });
    }

  }

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onClick = (e) => {
    if (e.key === 'changePassword') {
      setIsModalOpen(true)
    }
  };

  const logOut = async () => {
    try {
      setloading(true);
      const res = await api.post("/api/users/logout")
      if (res) {
        setloading(false);
        toast.success(res.data, {
          onClose: () => {
            localStorage.removeItem("token");
            setUser(null);
            navigate('/login');
          }
        });
      }
    }
    catch (err) {
      setloading(false);
      toast.error(err.response?.data || err.message);
    }

  }


  return (
    <div>
      <Container>
        {loading && <Loader />}
        <div className='flex m-4 text-2xl font-mono font-extrabold'>
          <h1 className='flex-1'>Settings</h1>
          <BellFilled className='flex-2 text-amber-400 hover:cursor-pointer' />
        </div>

        <Menu
          onClick={onClick}
          className='my-7 mx-7 sm:w-2/3 rounded-lg bg-stone-100 md:3/4'
          mode="vertical"
          items={items}
        />

        <div className='mx-4'>
          <Button icon={<MdOutlineLogout />} className='text-lg' onClick={logOut}>Logout</Button>
        </div>


        <Modal
          footer={null}
          open={isModalOpen}
          onOk={handleSubmit}
          okButtonProps={{
            autoFocus: true,
            htmlType: 'submit',

          }}
          onCancel={handleCancel}
          destroyOnClose
        >
          <div>
            <h1 className='text-lg text-center font-bold uppercase pb-3'>Update Password</h1>
          </div>

          <Form
            layout="vertical"
            form={form}
            name="update-class-form"
            initialValues={{
              modifier: 'public',
            }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="oldPassword"
              label="Current Password"
              rules={[{
                required: true,
                message: 'Please enter your old password!',
              }]}
            >
              <Input.Password placeholder='Current Password' size='large' prefix={<FaUserLock />} />
            </Form.Item>
            <Form.Item
              name="password"
              label="New Password"
              rules={[{
                required: true,
                message: 'Please enter your updated password!',
              },
              {
                min: 6,
                message: 'Please must be at least 6 characters long'
              }
              ]}
            >
              <Input.Password placeholder='New Password' size='large' prefix={<RiLockPasswordFill />} />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[{
                required: true,
                message: 'Please confirm your password!'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
              ]}
            >
              <Input.Password placeholder='Confirm Password' size='large' prefix={<RiLockPasswordFill />} />
            </Form.Item>
          </Form>

          <div className='flex justify-end'>
            <Button type='primary' danger onClick={handleCancel}>Cancel</Button>
            <Button type='primary' className='mx-2' onClick={handleSubmit}>Update</Button>
          </div>
          {loading && <Loader />}
        </Modal>
      </Container>
    </div>
  )
}
