import { HiUserCircle } from "react-icons/hi2";
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SmitLogo from '../../assets/smit.png';
import { Link, useLocation } from 'react-router-dom';
import PageTitle from "../PageTitle/PageTitle";
import usefetchProfile from "../../utils/useFetchProfile";

export default function Navbars({ title }) {

    const { user, setUser } = usefetchProfile();
    const location = useLocation();
    const [updatedkey, setUpdatedkey] = useState({ key: '0', label: (<Link to="/student/setting">Profile</Link>) });
    const [homekey, setHomekey] = useState({ key: '1', label: (<Link to="/student/dashboard">Home</Link>) });
    const [settingkey, setSettingkey] = useState({ key: '2', label: (<Link to="/student/setting">Setting</Link>) });


    useEffect(() => {
        if (user?.role) {
            setUpdatedkey({
                key: '0',
                label:
                    user.role === 'admin' ? (
                        <Link to="/admin/setting"> Profile</Link >
                    ) : user.role === 'trainer' ? (
                        <Link to="/trainer/setting"> Profile</Link >
                    ) : (
                        <Link to="/student/setting"> Profile</Link >
                    ),
            })
        }
    })

    const navlink = [
        {
            key: 1,
            text: 'Home',
            to: '/admin/dashboard',
        },
        {
            key: 2,
            text: 'Teachers',
            to: '/admin/teacher',
        },
        {
            key: 3,
            text: 'Students',
            to: '/admin/student',
        },
        {
            key: 4,
            text: 'Settings',
            to: '/admin/setting',
        },
    ]

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" data-bs-theme="dark" className='bg-sky-blue' >
                <Container>
                    <Navbar.Brand href="#home" className='font-bold'><img width={110} src={SmitLogo} alt="#logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {navlink.map((navText, index) => {
                                return (
                                    <Link className='text-white px-3 hover:drop-shadow-lg hover:underline' key={navText.key} to={navText.to}>{navText.text}</Link>
                                )
                            })}
                        </Nav>
                        <Nav>
                            <Nav.Link className='text-white px-3 text-4xl hover:drop-shadow-lg' eventKey={2}>
                                <HiUserCircle />
                            </Nav.Link>
                        </Nav>
                        <div>
                            <PageTitle title={title} />
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
