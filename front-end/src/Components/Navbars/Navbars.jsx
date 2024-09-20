import { HiUserCircle } from "react-icons/hi2";
import { FaUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import React, { memo, useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SmitLogo from '../../assets/smit.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageTitle from "../PageTitle/PageTitle";
// import usefetchProfile from "../../utils/useFetchProfile";
import useFetchProfile from "../../utils/useFetchProfile";
import { Dropdown, Space } from 'antd';
import api from "../../api/api";
import { toast } from "react-toastify";
import loader from "../../Context/LoaderContext";
import Loader from "../Loader/Loader";


// const logOut = async () => {
//     try {
//         const res = await api.post("/api/users/logout")
//         toast.success("Logged Out Successfully", {
//             onClick: () => {
//                 localStorage.removeItem("token");
//             }
//         })
//         localStorage.removeItem('token');
//     }
//     catch (err) {
//         console.log(err);
//     }

// }

// const items = [
//     {
//         key: '1',
//         label: (
//             <Link to="/student/profile">
//                 Profile
//             </Link>
//         ),
//         icon: <FaUser />,

//     },
//     {
//         key: '2',
//         label: (
//             <Link>
//                 Logout
//             </Link>
//         ),
//         icon: <MdLogout />,
//         onClick: logOut,
//     },
// ];


export default memo(function Navbars({ title }) {

    const { user, setUser } = useFetchProfile();
    const [loading, setloading] = useContext(loader);
    const navigate = useNavigate();
    // const { user } = useProfile()
    const location = useLocation();
    const [updatedkey, setUpdatedkey] = useState({ key: '0', label: (<Link to="/student/profile"><HiUserCircle className="text-3xl" /></Link>) });
    const [homekey, setHomekey] = useState({ key: '1', label: (<Link to="/student/dashboard">Home</Link>) });
    const [settingkey, setSettingkey] = useState({ key: '2', label: (<Link to="/student/setting">Setting</Link>) });


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

    const items = [
        {
            key: '1',
            label: (
                <Link to={location.pathname.includes("/admin/dashboard") ? "/admin/profile" : location.pathname.includes("/trainer/dashboard") ? "/trainer/profile" : "/student/profile"} >
                    Profile
                </Link >
            ),
            icon: <FaUser />,

        },
        {
            key: '2',
            label: "Logout",
            icon: <MdLogout />,
            onClick: logOut,
        },
    ];


    useEffect(() => {
        console.log(user);

        if (user?.role) {
            setUpdatedkey({
                key: '0',
                label:
                    user.role === 'admin' ? (
                        <Space direction="vertical">
                            <Space wrap>
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    placement="bottom"
                                    arrow={{
                                        pointAtCenter: true,
                                    }}
                                    overlayClassName="text-center"
                                >
                                    <div><HiUserCircle className="text-3xl hover:scale-125 duration-500 drop-shadow-xl" /></div>
                                </Dropdown>
                            </Space>
                        </Space>
                    ) : user.role === 'trainer' ? (
                        <Space direction="vertical">
                            <Space wrap>
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    placement="bottom"
                                    arrow={{
                                        pointAtCenter: true,
                                    }}
                                    overlayClassName="text-center"
                                >
                                    <div><HiUserCircle className="text-3xl hover:scale-125 duration-500 drop-shadow-xl" /></div>
                                </Dropdown>
                            </Space>
                        </Space>
                    ) : (
                        <Space direction="vertical">
                            <Space wrap>
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    placement="bottom"
                                    arrow={{
                                        pointAtCenter: true,
                                    }}
                                    overlayClassName="text-center"
                                >
                                    <div> <HiUserCircle className="text-3xl hover:scale-125 duration-500 drop-shadow-xl cursor-pointer" /></div>
                                </Dropdown>
                            </Space>
                        </Space>
                    ),
            })

            setHomekey({
                key: '1',
                label:
                    user.role === 'admin' ? (
                        <Link to="/admin/dashboard" className="hover:underline underline-offset-8 decoration-2"> Home</Link >
                    ) : user.role === 'trainer' ? (
                        <Link to="/trainer/dashboard" className="hover:underline underline-offset-8 decoration-2"> Home</Link >
                    ) : (
                        <Link to="/student/dashboard" className="hover:underline underline-offset-8 decoration-2"> Home</Link >
                    ),

            })

            setSettingkey({
                key: '2',
                label:
                    user.role === 'admin' ? (
                        <Link to="/admin/setting" className="hover:underline underline-offset-8 decoration-2"> Setting</Link >
                    ) : user.role === 'trainer' ? (
                        <Link to="/trainer/setting" className="hover:underline underline-offset-8 decoration-2"> Setting</Link >
                    ) : (
                        <Link to="/student/setting" className="hover:underline underline-offset-8 decoration-2"> Setting</Link >
                    ),
            })
        }

    }, [user]);

    const AdminNavItems = [
        homekey,
        { key: '3', label: (<Link to="/admin/teacher" className="hover:underline underline-offset-8 decoration-2">Teachers</Link>) },
        { key: '4', label: (<Link to="/admin/student" className="hover:underline underline-offset-8 decoration-2">Students</Link>) },
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
                        <Nav className="ms-auto mt-2 pl-5 sm:gap-4 md:gap-4 lg:gap-10 text-white">
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
                            {loading && <Loader />}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
})
