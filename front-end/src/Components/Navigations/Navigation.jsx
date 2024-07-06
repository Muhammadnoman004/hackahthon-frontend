import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Signup from '../Pages/Signup/Signup';
import Login from '../Pages/Login/Login';
import TeacherHome from '../Pages/Teachers/Home/Home';
import StudentHomePage from '../Pages/Students/StudentHomePage';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/teacher-home",
        element: <TeacherHome />
    },
    {
        path: "/student-home",
        element: <StudentHomePage />
    },
])


export default function Navigation() {
    return (
        <RouterProvider router={router} />
    )
}
