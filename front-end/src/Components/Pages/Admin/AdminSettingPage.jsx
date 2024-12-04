import React from 'react'
import { BellFilled } from '@ant-design/icons'
import { FaUserLock, FaBell } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { Button, Menu } from 'antd';
import { Container } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const items = [
  {
    key: 'sub1',
    icon: <FaBell color='#87CEEB' />,
    label: 'Notifications',
    children: [
      {
        key: '1-1',
        label: 'Item 1',
        type: 'group',
        children: [
          {
            key: '1',
            label: 'Option 1',
          },
          {
            key: '2',
            label: 'Option 2',
          },
        ],
      },
      {
        key: '1-2',
        label: 'Item 2',
        type: 'group',
        children: [
          {
            key: '3',
            label: 'Option 3',
          },
          {
            key: '4',
            label: 'Option 4',
          },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    icon: <Link to={'/admin/profile'}><FaUser color='#87CEEB' /></Link>,
    label: 'Update profile',
  },
  {
    key: 'sub5',
    label: 'Change password',
    icon: <FaUserLock color='#87CEEB' />,
  },
];
const onClick = (e) => {
  console.log('click', e);
};

export default function AdminSettingPage() {
  return (
    <div>
      <Container>
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
          <Button icon={<MdOutlineLogout />} className='text-lg'>Logout</Button>
        </div>
      </Container>
    </div>
  )
}
