import { HiUserCircle } from "react-icons/hi2";
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SmitLogo from '../../assets/smit.png';
import { Link } from 'react-router-dom';
import PageTitle from "../PageTitle/PageTitle";

export default function Navbars({ title }) {

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
