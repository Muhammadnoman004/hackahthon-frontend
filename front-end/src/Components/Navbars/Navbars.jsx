import { HiUserCircle } from "react-icons/hi2";
import React, { memo, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SmitLogo from '../../assets/smit.png';
import { Link, useLocation } from 'react-router-dom';
import PageTitle from "../PageTitle/PageTitle";
// import usefetchProfile from "../../utils/useFetchProfile";
import useFetchProfile from "../../utils/useFetchProfile";

export default memo(function Navbars({ title }) {

    const { user } = useFetchProfile();
    // const { user } = useProfile()
    const location = useLocation();
    const [updatedkey, setUpdatedkey] = useState({ key: '0', label: (<Link to="/student/setting"><HiUserCircle className="text-3xl" /></Link>) });
    const [homekey, setHomekey] = useState({ key: '1', label: (<Link to="/student/dashboard">Home</Link>) });
    const [settingkey, setSettingkey] = useState({ key: '2', label: (<Link to="/student/setting">Setting</Link>) });


    useEffect(() => {
        console.log(user);

        if (user?.role) {
            setUpdatedkey({
                key: '0',
                label:
                    user.role === 'admin' ? (
                        <Link to="/admin/setting">  <HiUserCircle className="text-3xl" /></Link >
                    ) : user.role === 'trainer' ? (
                        <Link to="/trainer/setting">  <HiUserCircle className="text-3xl" /></Link >
                    ) : (
                        <Link to="/student/setting">  <HiUserCircle className="text-3xl" /></Link >
                    ),
            })

            setHomekey({
                key: '1',
                label:
                    user.role === 'admin' ? (
                        <Link to="/admin/dashboard"> Home</Link >
                    ) : user.role === 'trainer' ? (
                        <Link to="/trainer/dashboard"> Home</Link >
                    ) : (
                        <Link to="/student/dashboard"> Home</Link >
                    ),

            })

            setSettingkey({
                key: '2',
                label:
                    user.role === 'admin' ? (
                        <Link to="/admin/setting"> Setting</Link >
                    ) : user.role === 'trainer' ? (
                        <Link to="/trainer/setting"> Setting</Link >
                    ) : (
                        <Link to="/student/setting"> Setting</Link >
                    ),
            })
        }

    }, [user]);

    const AdminNavItems = [
        homekey,
        { key: '3', label: (<Link to="/admin/teacher">Teachers</Link>) },
        { key: '4', label: (<Link to="/admin/student">Students</Link>) },
        settingkey,
        updatedkey,
    ]

    const TrainerNavItems = [
        homekey,
        settingkey,
        updatedkey
    ]

    const StudentNavItems = [
        homekey,
        settingkey,
        updatedkey
    ]

    const getNavItem = () => {
        // Admin Routes
        // if (location.pathname.includes("/admin/dashboard")) return 1;
        // if (location.pathname.includes("/admin/teacher")) return 3;
        // if (location.pathname.includes("/admin/student")) return 4;
        // if (location.pathname.includes("/admin/setting")) return 2;

        // // Trainer Routes
        // if (location.pathname.includes("/trainer/dashboard")) return 1;
        // if (location.pathname.includes("/trainer/setting")) return 2;

        // // Student Routes
        // if (location.pathname.includes("/student/dashboard")) return 1;
        // if (location.pathname.includes("/student/setting")) return 2;

        if (user?.role === 'admin') return AdminNavItems;
        if (user?.role === 'trainer') return TrainerNavItems;
        return StudentNavItems; // Default for students
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" data-bs-theme="dark" className='bg-sky-blue' >
                <Container>
                    <Navbar.Brand href="#home" className='font-bold'><img width={110} src={SmitLogo} alt="#logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto pl-5  sm:gap-4 md:gap-4 lg:gap-10">
                            {/* {navlink.map((navText, index) => {
                                return (
                                    <Link className='text-white px-3 hover:drop-shadow-lg hover:underline' key={navText.key} to={navText.to}>{navText.text}</Link>
                                )
                            })} */}
                            {getNavItem().map((navItem) => (
                                <Nav.Item key={navItem.key}>
                                    {navItem.label}
                                </Nav.Item>
                            ))}
                        </Nav>
                        <Nav>
                            {/* <Nav.Link className='text-white px-3 text-4xl hover:drop-shadow-lg' eventKey={2}>
                                <HiUserCircle />
                            </Nav.Link> */}
                        </Nav>
                        <div>
                            <PageTitle title={title} />
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
})
