import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Navbars() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" data-bs-theme="dark" style={{ background: "#87CEEB" }}>
                <Container>
                    <Navbar.Brand href="#home" className='font-bold'>SMIT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#assignments">Assignments</Nav.Link>
                            <Nav.Link href="#to-do">To-Do</Nav.Link>
                            <Nav.Link href="#classmates">Classmates</Nav.Link>
                            <Nav.Link href="#setting">Setting</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets"><Button >Login</Button></Nav.Link>
                            <Nav.Link href="#deets"><Button >signup</Button></Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                <UserOutlined />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
