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
            text: <Link to={'/admin/dashboard'}>Home</Link>,
        },
        {
            key: 2,
            text: <Link to={'/admin/teacher'}>Teachers</Link>
        },
        {
            key: 3,
            text: <Link to={'/admin/student'}>Students</Link>
        },
        {
            key: 4,
            text: <Link to={'/admin/setting'}>Settings</Link>
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
                                    <Nav.Link className='text-white hover:drop-shadow-lg hover:underline' key={index}>{navText.text}</Nav.Link>
                                )
                            })}
                        </Nav>
                        <Nav>
                            <Nav.Link className='text-white text-4xl hover:drop-shadow-lg' eventKey={2}>
                                <HiUserCircle />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <div>
                        <PageTitle title={title} />
                    </div>
                </Container>
            </Navbar>
        </div>
    )
}
