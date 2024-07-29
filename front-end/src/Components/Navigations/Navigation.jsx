import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Signup from '../Pages/Signup/Signup';
import Login from '../Pages/Login/Login';
import StudentHomePage from '../Pages/Students/StudentHomePage';
import StudentAllAssignmentPage from '../Pages/Students/StudentAllAssignmentPage';
import StudentAssignmentTodoPage from '../Pages/Students/StudentAssignmentTodoPage';
import AllClassFellowsPage from '../Pages/Students/AllClassFellowsPage';
import StudentSettingPage from '../Pages/Students/StudendSettingPage';
import Navbars from '../Navbars/Navbars';
import TeacherHomePage from '../Pages/Teachers/TeacherHomePage';

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
        path: "/student/home",
        element: <StudentHomePage />
    },
    {
        path: "/student/assignment/listing",
        element: <StudentAllAssignmentPage />
    },
    {
        path: "/student/assignment/todo",
        element: <StudentAssignmentTodoPage />
    },
    {
        path: "/student/classfellows",
        element: <AllClassFellowsPage />
    },
    {
        path: "/student/setting",
        element: <StudentSettingPage />
    },
    {
        path: "/trainer/dashboard",
        element: <>
            <Navbars />
            < TeacherHomePage />
        </>
    },
])


export default function Navigation() {
    return (
        <RouterProvider router={router} />
    )
}
